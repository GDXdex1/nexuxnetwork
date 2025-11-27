// app/wallet/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ConnectButton, useCurrentWallet, useWalletKit } from '@mysten/wallet-kit';
import { SuiClient } from '@mysten/sui.js/client';

// Tipos
interface TokenInfo {
  symbol: string;
  name: string;
  usdValue: number;
}

interface TokenBalance {
  type: string;
  balance: number;
  info: TokenInfo;
}

interface NftItem {
  id: string;
  name: string;
  collection: string;
  imageUrl: string;
}

// Definiciones de tokens
const TOKENS: Record<string, TokenInfo> = {
  '0x2::sui::SUI': { symbol: 'SUI', name: 'Sui', usdValue: 0.0 }, // Precio real a implementar
  '0x976e8abf48c9c96f87be7d886cde85c7948744decbdcd087635d286da24342a1::draxiuxdollar::DRAXIUXDOLLAR': {
    symbol: 'DRAXIUX',
    name: 'Draxiux Dollar',
    usdValue: 1,
  },
  '0xa40fba56ddd678dae5e9c82e36ca128f6016711992a55c2f5aa2a8186424eb64::jfx::JFX': {
    symbol: 'JFX',
    name: 'JaxFood',
    usdValue: 0.5,
  },
  '0x3313b60ec8d1e203baf2f9a6627543f62c6e68a494fcfe8ccadbe63d45ed963a::slx::SLX': {
    symbol: 'SLX',
    name: 'Silvex Coin',
    usdValue: 0.1,
  },
  '0x7b3d3d482a502f088f796c1e435ec8923b7762761322b38b46254b2f35618c72::drx::DRX': {
    symbol: 'DRX',
    name: 'Drariux Coin',
    usdValue: 2.5,
  },
};

// Definiciones de colecciones
const getCollectionName = (type: string): string | null => {
  if (type.includes('gaudix')) return 'Gaudix';
  if (type.includes('jablix')) return 'Jablix';
  if (type.includes('altriux')) return 'Altriux';
  return null;
};

export default function WalletPage() {
  const { isConnected } = useCurrentWallet();
  const { currentAccount } = useWalletKit();
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [nfts, setNfts] = useState<NftItem[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  const SUI_TESTNET_URL = 'https://fullnode.testnet.sui.io/';
  const client = new SuiClient({ url: SUI_TESTNET_URL });

  // Cargar assets cuando se conecta la wallet
  const loadAssets = async () => {
    if (!currentAccount?.address) return;

    setLoading(true);
    try {
      const { data: objects } = await client.getOwnedObjects({
        owner: currentAccount.address,
        options: { showType: true, showContent: true },
      });

      const tokenBalances: Record<string, number> = {};
      const foundNfts: NftItem[] = [];

      // Procesar objetos
      for (const obj of objects) {
        if (!obj.data) continue;

        const type = obj.data.type;

        // Procesar tokens
        if (type && type.includes('Coin')) {
          const match = type.match(/<(.*)>/);
          const coinType = match?.[1];
          if (coinType && TOKENS[coinType]) {
            const balance = parseInt(obj.data.content?.fields.balance || '0', 10);
            tokenBalances[coinType] = (tokenBalances[coinType] || 0) + balance;
          }
        }
        // Procesar NFTs
        else if (type) {
          const collection = getCollectionName(type);
          if (collection && obj.data.content?.fields) {
            foundNfts.push({
              id: obj.data.content.fields.id?.id || obj.data.objectId,
              name: obj.data.content.fields.name || 'Unknown NFT',
              collection,
              imageUrl: `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(
                obj.data.content.fields.name || 'NFT'
              )}`,
            });
          }
        }
      }

      // Formatear tokens
      const formattedTokens: TokenBalance[] = [];
      let totalUsd = 0;

      for (const coinType in tokenBalances) {
        const info = TOKENS[coinType];
        if (!info) continue;

        const rawBalance = tokenBalances[coinType];
        const decimals = coinType === '0x2::sui::SUI' ? 9 : 9; // Ajusta según tus tokens
        const formattedBalance = rawBalance / Math.pow(10, decimals);
        const usdValue = formattedBalance * info.usdValue;
        totalUsd += usdValue;

        formattedTokens.push({
          type: coinType,
          balance: formattedBalance,
          info,
        });
      }

      setTokens(formattedTokens);
      setNfts(foundNfts);
      setTotalBalance(totalUsd);
    } catch (error) {
      console.error('Error loading assets:', error);
      alert('Failed to load assets. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar assets al conectar
  useEffect(() => {
    if (isConnected && currentAccount) {
      loadAssets();
    } else {
      setTokens([]);
      setNfts([]);
      setTotalBalance(0);
    }
  }, [isConnected, currentAccount]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Wallet Overview */}
      <div className="wallet-overview bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 text-center mb-8">
        <h1 className="text-3xl font-bold font-headline mb-2">Draxiux Wallet</h1>
        <p className="total-balance-label text-[#a1a1aa] mb-2">Total Balance</p>
        <div className="total-balance text-4xl font-bold text-[#3b82f6] mb-4">
          {loading ? 'Loading...' : `$${totalBalance.toFixed(2)} USD`}
        </div>

        {isConnected && currentAccount ? (
          <div className="wallet-address font-mono text-[#a1a1aa] bg-[#0a0a0a] inline-block px-4 py-2 rounded-lg mt-2">
            {`${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(-4)}`}
          </div>
        ) : (
          <div className="mt-4">
            <ConnectButton>
              <div className="connect-prompt-btn bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
                Connect Wallet to Get Started
              </div>
            </ConnectButton>
          </div>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Tokens Section */}
        <section className="section-card bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
          <h2 className="text-2xl font-semibold font-headline mb-6 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v5a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 12z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            Tokens
          </h2>

          {loading ? (
            <div className="text-center py-8 text-[#a1a1aa]">Loading tokens...</div>
          ) : tokens.length > 0 ? (
            <div className="token-list space-y-4">
              {tokens.map((token, i) => (
                <div key={i} className="token-item bg-[#0a0a0a] rounded-xl p-4 flex justify-between items-center">
                  <div className="token-info flex items-center gap-4">
                    <div className="token-icon w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center font-bold font-headline">
                      {token.info.symbol.charAt(0)}
                    </div>
                    <div className="token-details">
                      <p className="font-semibold">{token.info.name}</p>
                      <span className="text-sm text-[#a1a1aa]">{token.info.symbol}</span>
                    </div>
                  </div>
                  <div className="token-balance text-right">
                    <div className="token-balance-amount text-lg font-bold">
                      {token.balance.toLocaleString()}
                    </div>
                    <div className="token-balance-usd text-sm text-[#a1a1aa]">
                      ≈ ${(token.balance * token.info.usdValue).toFixed(2)} USD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state text-center py-8 text-[#a1a1aa]">
              <p>Connect a wallet to see your tokens.</p>
            </div>
          )}
        </section>

        {/* NFTs Section */}
        <section className="section-card bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
          <h2 className="text-2xl font-semibold font-headline mb-6 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            NFT Collection
          </h2>

          {loading ? (
            <div className="text-center py-8 text-[#a1a1aa]">Loading NFTs...</div>
          ) : nfts.length > 0 ? (
            <div className="nft-grid grid grid-cols-2 gap-4 sm:grid-cols-3">
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  className="nft-card bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#333] transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="nft-card-image w-full aspect-square object-cover"
                  />
                  <div className="nft-card-content p-3">
                    <div className="nft-card-name font-semibold truncate">{nft.name}</div>
                    <div className="nft-card-collection text-sm text-[#a1a1aa]">{nft.collection}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state text-center py-8 text-[#a1a1aa]">
              <p>Connect a wallet to see your NFTs.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}