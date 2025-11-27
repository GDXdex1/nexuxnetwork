// app/marketplace/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ConnectButton, useWalletKit, useCurrentWallet } from '@mysten/wallet-kit';
import { SuiClient } from '@mysten/sui.js/client';

// Tipos
interface ListedNFT {
  id: string;
  name: string;
  imageUrl: string;
  game: string;
  price: number; // en DXC
  seller: string;
}

export default function MarketplacePage() {
  const { isConnected } = useCurrentWallet();
  const { currentAccount } = useWalletKit();
  const [nfts, setNfts] = useState<ListedNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(false);
  const [nftId, setNftId] = useState('');
  const [price, setPrice] = useState('');

  // Constantes
  const SUI_TESTNET_URL = 'https://fullnode.testnet.sui.io/';
  const MARKETPLACE_PACKAGE_ID = '0x...'; // ⚠️ ¡Reemplaza con tu package ID real!

  // Simular carga de NFTs (reemplaza con lógica real)
  const loadListedNFTs = async () => {
    setLoading(true);
    try {
      // TODO: Aquí irá la lógica real para obtener NFTs del contrato
      // Ejemplo:
      // const client = new SuiClient({ url: SUI_TESTNET_URL });
      // const result = await client.queryEvents({ ... });
      // setNfts(parseEvents(result));

      // Por ahora, devolvemos una lista vacía
      setNfts([]);
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setNfts([]);
    } finally {
      setLoading(false);
    }
  };

  // Simular listado de NFT
  const listItemForSale = async (nftObjectId: string, priceDxc: number) => {
    if (!currentAccount) return;

    // TODO: Aquí irá la lógica real de transacción
    // Ejemplo:
    // const tx = new TransactionBlock();
    // tx.moveCall({
    //   target: `${MARKETPLACE_PACKAGE_ID}::marketplace::list_item`,
    //   arguments: [tx.object(nftObjectId), tx.pure.u64(priceDxc * 1e9)], // 9 decimales
    // });
    // const result = await currentAccount.signAndExecuteTransactionBlock({
    //   transactionBlock: tx,
    // });

    // Simulación
    console.log(`Listing NFT ${nftObjectId} for ${priceDxc} DXC`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { digest: 'SIMULATED_TX_DIGEST' };
  };

  const handleListNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !nftId || !price) return;

    setListing(true);
    try {
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        alert('Price must be a positive number');
        return;
      }

      await listItemForSale(nftId, parsedPrice);
      alert('NFT listed successfully!');
      setNftId('');
      setPrice('');
      loadListedNFTs(); // Refrescar lista
    } catch (error: any) {
      console.error('Failed to list NFT:', error);
      alert(`Error: ${error.message || 'Unknown error'}`);
    } finally {
      setListing(false);
    }
  };

  useEffect(() => {
    loadListedNFTs();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="marketplace-container grid grid-cols-1 gap-8 md:grid-cols-[350px_1fr]">
        {/* Sidebar: Formulario para listar NFT */}
        <aside className="list-nft-sidebar bg-[#1a1a1a] rounded-xl border border-[#333] p-6 sticky top-24 self-start">
          <h3 className="text-xl font-semibold font-headline mb-6">List Your NFT</h3>
          <form onSubmit={handleListNFT}>
            <div className="form-group mb-6">
              <label htmlFor="nft-id" className="block font-medium mb-2">
                NFT Object ID
              </label>
              <input
                id="nft-id"
                type="text"
                value={nftId}
                onChange={(e) => setNftId(e.target.value)}
                placeholder="0x..."
                className="w-full p-3 rounded-lg border border-[#333] bg-[#0a0a0a] text-white"
                required
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="nft-price" className="block font-medium mb-2">
                Price (DXC)
              </label>
              <input
                id="nft-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
                className="w-full p-3 rounded-lg border border-[#333] bg-[#0a0a0a] text-white"
                required
                min="0"
                step="any"
              />
            </div>
            <button
              type="submit"
              disabled={!isConnected || listing}
              className={`w-full p-3 rounded-lg font-semibold transition-colors ${
                !isConnected || listing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#3b82f6] hover:bg-[#2563eb]'
              } text-white`}
            >
              {listing ? 'Listing...' : 'List for Sale'}
            </button>
          </form>
        </aside>

        {/* Contenido principal: Lista de NFTs */}
        <section className="nft-grid-content">
          <div className="nft-grid-header text-center mb-12">
            <h1 className="text-4xl font-bold font-headline mb-2">NFT Marketplace</h1>
            <p className="text-lg text-[#a1a1aa]">
              Discover, collect, and trade extraordinary in-game assets.
            </p>
          </div>

          <div className="nft-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center py-12 text-[#a1a1aa]">
                Loading listed NFTs...
              </div>
            ) : nfts.length === 0 ? (
              <div className="col-span-full empty-state text-center py-16 text-[#a1a1aa]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto opacity-50 mb-4"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <h3 className="text-xl font-semibold mb-2">No NFTs for sale yet</h3>
                <p>Be the first to list an asset from your collection!</p>
              </div>
            ) : (
              nfts.map((nft) => (
                <div
                  key={nft.id}
                  className="nft-card bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden flex flex-col transition-transform hover:translate-y-[-8px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="nft-card-image-wrapper aspect-square overflow-hidden">
                    <img
                      src={nft.imageUrl}
                      alt={nft.name}
                      className="nft-card-image w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="nft-card-content p-4 flex flex-col flex-grow">
                    <h3 className="nft-card-title text-lg font-semibold font-headline mb-1">
                      {nft.name}
                    </h3>
                    <p className="nft-card-game text-sm text-[#a1a1aa] mb-4">{nft.game}</p>
                    <div className="nft-card-footer mt-auto flex justify-between items-center">
                      <div className="nft-card-price">
                        <p className="text-sm text-[#a1a1aa]">Price</p>
                        <span className="text-lg font-bold">{nft.price} DXC</span>
                      </div>
                      <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}