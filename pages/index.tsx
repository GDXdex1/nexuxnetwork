import React, { useEffect, useState } from "react";
import { SuiService, ParsedNFT } from "../lib/sui";
import dynamic from "next/dynamic";
import NFTCard from "../components/NFTCard";
// Wallet adapter imports
import {
  WalletProvider,
  useWallet,
  ConnectionProvider,
  WalletAdaptersContext,
} from "@mysten/wallet-adapter-react";
import { getPhantomWallet, getSuiWallet } from "@mysten/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@mysten/wallet-adapter-base";

const suiService = new SuiService(process.env.NEXT_PUBLIC_SUI_RPC || "https://fullnode.testnet.sui.io:443");

function WalletButtons() {
  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <div>
        <button onClick={() => wallet.select("suiet")}>Connect Wallet</button>
      </div>
    );
  }
  return (
    <div>
      <span>Connected: {wallet.account?.address}</span>
      <button onClick={() => wallet.disconnect()}>Disconnect</button>
    </div>
  );
}

export default function HomePage() {
  const [listings, setListings] = useState<{ listingId: string; metadata?: ParsedNFT; raw: any }[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadListings() {
    setLoading(true);
    const moveStruct = process.env.NEXT_PUBLIC_MARKETPLACE_MOVE_STRUCT || "0xMARKETPLACE::marketplace::Listing";
    const data = await suiService.fetchListings(moveStruct);
    setListings(data);
    setLoading(false);
  }

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SUI_RPC || "https://fullnode.testnet.sui.io:443"}>
      <WalletProvider apps={[getSuiWallet()]} autoConnect={false}>
        <div style={{ padding: 24 }}>
          <h1>Nexux Network — Marketplace (Testnet)</h1>
          <WalletButtons />
          <div style={{ marginTop: 16 }}>
            <button onClick={loadListings}>Refresh Listings</button>
          </div>

          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {loading ? (
              <div>Loading...</div>
            ) : listings.length ? (
              listings.map(listing => (
                <NFTCard
                  key={listing.listingId}
                  id={listing.listingId}
                  name={listing.metadata?.name}
                  description={listing.metadata?.description}
                  image={listing.metadata?.image}
                  onBuy={async () => {
                    // TODO: using wallet to sign and execute the buy tx
                    // You may need to import useWallet and call wallet.signAndExecuteTransactionBlock(...)
                    alert("Buy functionality example — integrate wallet sign/execution");
                  }}
                  onList={async () => {
                    alert("List NFT via TransactionBlock — implement UI form to set price");
                  }}
                />
              ))
            ) : (
              <div>No listings yet</div>
            )}
          </div>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}
