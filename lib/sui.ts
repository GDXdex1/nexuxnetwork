import { SuiClient, TransactionBlock, JsonRpcProvider } from "@mysten/sui.js";

const SUI_RPC_TESTNET = "https://fullnode.testnet.sui.io:443";

export type ParsedNFT = {
  id: string;
  name?: string;
  description?: string;
  image?: string;
  owner?: string;
  raw?: any;
};

export class SuiService {
  provider: JsonRpcProvider;

  constructor(rpcUrl = SUI_RPC_TESTNET) {
    this.provider = new SuiClient({ url: rpcUrl });
  }

  // Fetch objects with a Move struct (e.g. marketplace listing)
  async fetchMoveObjects(moveStruct: string) {
    // queries for objects by Move struct type
    const res = await (this.provider as any).fullNodeRequest(
      `sui_getObjectsOwnedByObject`, // fallback; we will use provider.query
      []
    ).catch(() => null);

    // Primary implementation: provider.queryMoveStructInstances (v2)
    try {
      // NOTE: using JS SDK query move objects (some SDKs have `queryEvents` etc.)
      // Here we attempt to query all objects of a move struct type:
      // Because SDK method names differ with versions, fallback to the type query
      const objects = await (this.provider as any).queryObjects({
        filter: { StructType: moveStruct },
        options: { showType: true, showContent: true, showOwner: true },
      });
      return objects.data || [];
    } catch (err) {
      console.warn("Unable to query move struct via provider.queryObjects", err);
      // fallback: return empty
      return [];
    }
  }

  // Parse NFT metadata from Sui object contents
  parseNftFromObject(suiObject: any): ParsedNFT | null {
    if (!suiObject) return null;

    const obj = suiObject.content ?? suiObject;
    const parsed: ParsedNFT = {
      id: suiObject.objectId ?? obj.objectId ?? suiObject.object_id,
      raw: obj,
      owner: suiObject.owner?.AddressOwner ?? obj.owner ?? null,
    };

    // Attempt to extract common fields
    // common NFT/published move struct may hold: name, description, url/uri/image, metadata
    try {
      // v1: content.data.fields
      const dataFields = obj?.data?.fields ?? obj?.content?.data?.fields ?? obj?.fields ?? obj?.data;
      if (dataFields) {
        parsed.name = dataFields.name ?? dataFields.title ?? parsed.name;
        parsed.description = dataFields.description ?? dataFields.about ?? parsed.description;
        parsed.image = dataFields.url ?? dataFields.image ?? dataFields.uri ?? dataFields.media?.[0]?.url ?? parsed.image;
      }

      // v2: content.fields
      const contentFields = obj?.content?.fields ?? obj?.fields ?? {};
      parsed.name = parsed.name ?? contentFields.name ?? contentFields.title;
      parsed.description = parsed.description ?? contentFields.description;
      parsed.image = parsed.image ?? contentFields.url ?? contentFields.uri ?? contentFields.image;
    } catch (e) {
      // ignore
    }

    // Normalize http(s) IPFS URIs
    if (parsed.image && parsed.image.startsWith("ipfs://")) {
      parsed.image = parsed.image.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    return parsed;
  }

  // High-level fetch: get listings for marketplace (move struct) and parse metadata
  async fetchListings(
    moveStruct: string
  ): Promise<{ listingId: string; metadata?: ParsedNFT; raw: any }[]> {
    const objects = await this.fetchMoveObjects(moveStruct);
    // Each object is a listing; we need to parse token id from fields (depends on your contract)
    const results = await Promise.all(
      objects.map(async (o: any) => {
        const listingId = o.objectId ?? o.object_id ?? o.id ?? (o?.fields?.id ?? null);
        // attempt to find associated token object id inside fields
        const tokenId = o?.content?.data?.fields?.token_id ?? o?.content?.fields?.token_id ?? o?.fields?.token ?? null;

        let metadata = null;
        if (tokenId) {
          // fetch token object
          try {
            // Use provider.getObject with showContent
            const tokenObject = await (this.provider as any).getObject({
              id: tokenId,
              options: { showContent: true, showOwner: true },
            });
            metadata = this.parseNftFromObject(tokenObject);
          } catch (err) {
            console.warn("Failed to fetch token object", tokenId, err);
          }
        }

        return { listingId, metadata, raw: o };
      })
    );

    return results;
  }

  // Build a listing TransactionBlock. Replace the moveCall target with your marketplace's `list` function.
  buildListTransactionBlock({ seller, tokenId, price, priceCoinType = "0x2::sui::SUI" }: { seller?: string; tokenId: string; price: bigint | number | string; priceCoinType?: string }) {
    const tx = new TransactionBlock();

    // Transfer the NFT to the marketplace - depends on how your marketplace expects NFTs
    // Replace the moveCall target with your `marketplace::list` function and correct argument ordering
    // Example:
    // tx.transferObjects([tx.object(tokenId)], tx.pure("0xMARKETPLACE_ADDRESS"));
    // Or a call like:
    // tx.moveCall({ target: "0xMARKETPLACE::market::list_nft", arguments: [tx.object(tokenId), tx.pure(price)] });

    // Basic generic placeholder:
    tx.moveCall({
      target: process.env.NEXT_PUBLIC_MARKETPLACE_LIST_MOVECALL || "0xMARKETPLACE::marketplace::list",
      arguments: [tx.object(tokenId), tx.pure(price.toString())],
    });

    return tx;
  }

  // Build Buy TransactionBlock. Replace the moveCall target accordingly.
  buildBuyTransactionBlock({ buyer, listingId, price, priceCoinType = "0x2::sui::SUI" }: { buyer?: string; listingId: string; price: bigint | number | string; priceCoinType?: string }) {
    const tx = new TransactionBlock();

    // Example: wallet must provide SUI coins; we split coins and call buy.
    const coin = tx.splitCoins(tx.gas, [tx.pure(price.toString())]);
    tx.moveCall({
      target: process.env.NEXT_PUBLIC_MARKETPLACE_BUY_MOVECALL || "0xMARKETPLACE::marketplace::buy",
      arguments: [tx.object(listingId), coin],
    });

    return tx;
  }
}
