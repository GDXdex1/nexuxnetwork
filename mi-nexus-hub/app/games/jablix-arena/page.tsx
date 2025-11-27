// JablixArena.tsx
import React, { useEffect, useState } from 'react';
import { SuiClient } from '@mysten/sui.js/client';
import { getWalletKitButton } from '@mysten/wallet-kit';

// Estilos globales (puedes moverlos a un archivo .css si lo prefieres)
// Pero por simplicidad los dejamos aquí como <style> en el componente raíz.
const GlobalStyles = () => (
  <style>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    body {
      background: linear-gradient(135deg, #1a120b, #4a2f1d, #2c1e14);
      color: #fff;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    .container {
      width: 100%;
      max-width: 1000px;
      background: rgba(15, 10, 8, 0.85);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      border: 2px solid #8b4513;
    }
    
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    h1 {
      font-size: 3.2rem;
      margin-bottom: 10px;
      background: linear-gradient(45deg, #d4af37, #ffd700);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
      letter-spacing: 2px;
    }
    
    .subtitle {
      color: #d2b48c;
      font-size: 1.3rem;
      text-shadow: 0 0 10px rgba(210, 180, 140, 0.5);
    }
    
    .connect-section, .lobby-section {
      text-align: center;
      padding: 30px;
      background: rgba(25, 18, 12, 0.7);
      border-radius: 15px;
      margin-bottom: 25px;
      border: 1px solid #8b4513;
    }

    #wallet-connect-button button {
      padding: 15px 40px;
      font-size: 1.3rem;
      background: linear-gradient(45deg, #8b4513, #d2691e);
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(139, 69, 19, 0.4);
      letter-spacing: 1px;
    }

    #wallet-connect-button button:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(139, 69, 19, 0.6);
      background: linear-gradient(45deg, #a0522d, #da7b2f);
    }
    
    .wallet-info {
      margin-top: 20px;
      font-size: 1.1rem;
      color: #d4af37;
      text-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
    }
    
    .monsters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 25px;
      margin-top: 20px;
    }
    
    .monster-card {
      background: rgba(35, 25, 18, 0.8);
      border-radius: 15px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
    }
    
    .monster-card:hover {
      transform: translateY(-5px);
      border-color: #d4af37;
      box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    }
    
    .monster-card.selected {
      border-color: #ff6347;
      background: rgba(45, 25, 18, 0.9);
      box-shadow: 0 0 20px rgba(255, 99, 71, 0.5);
    }
    
    .monster-icon {
      font-size: 4rem;
      margin-bottom: 15px;
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }
    
    .monster-name {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: #d4af37;
      text-shadow: 0 0 5px rgba(212, 175, 55, 0.3);
    }
    
    .monster-stats {
      display: flex;
      justify-content: space-around;
      font-size: 0.9rem;
      color: #d2b48c;
    }
    
    .battle-btn {
      margin-top: 30px;
      padding: 15px 40px;
      font-size: 1.2rem;
      background: linear-gradient(45deg, #8b0000, #b22222);
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(139, 0, 0, 0.4);
      display: none;
      letter-spacing: 1px;
    }
    
    .battle-btn.active {
      display: inline-block;
    }
    
    .battle-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(139, 0, 0, 0.6);
      background: linear-gradient(45deg, #a50000, #c83232);
    }
    
    .status {
      margin-top: 20px;
      padding: 15px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.5);
      color: #ffd700;
      font-weight: bold;
      border-left: 4px solid #d4af37;
    }
    
    .back-btn {
      margin-top: 20px;
      padding: 10px 20px;
      background: rgba(139, 69, 19, 0.3);
      color: #d4af37;
      border: 1px solid #8b4513;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .back-btn:hover {
      background: rgba(139, 69, 19, 0.5);
      transform: translateY(-2px);
    }
    
    .loading {
      margin: 20px auto;
      font-size: 1.2rem;
      color: #d4af37;
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
      display: none;
    }
    
    .arena-shield {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 40px;
      height: 40px;
      background: linear-gradient(45deg, #8b4513, #d4af37);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    @media (max-width: 768px) {
      .monsters-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }
      
      h1 {
        font-size: 2.5rem;
      }
      
      .subtitle {
        font-size: 1.1rem;
      }
    }
  `}</style>
);

// Tipos
interface Monster {
  id: string;
  name: string;
  icon: string;
  hp: number;
  attack: number;
  energy: number;
  level: number;
}

interface WalletAccount {
  address: string;
}

interface ConnectedWallet {
  account: WalletAccount;
  name: string;
  disconnect: () => void;
}

const SUI_TESTNET_URL = 'https://fullnode.testnet.sui.io/';

const JablixArena: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState<WalletAccount | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [status, setStatus] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLobby, setShowLobby] = useState(false);

  // Inicializar WalletKit
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initWalletKit = () => {
      try {
        const walletKitButton = getWalletKitButton({
          container: document.getElementById('wallet-connect-button')!,
          onConnect: async (wallet) => {
            console.log('Wallet connected:', wallet);
            const walletObj: ConnectedWallet = {
              account: wallet.account,
              name: wallet.name,
              disconnect: wallet.disconnect,
            };
            setCurrentAccount(wallet.account);
            setConnectedWallet(walletObj);
            setStatus(null);
            setShowLobby(true);

            await loadNFTs(wallet.account);
          },
          onDisconnect: () => {
            console.log('Wallet disconnected');
            setCurrentAccount(null);
            setConnectedWallet(null);
            setShowLobby(false);
            setSelectedMonster(null);
            setMonsters([]);
            setStatus(null);
          },
        });
        return () => {
          // Limpiar si es necesario
        };
      } catch (err) {
        console.error('Failed to initialize WalletKit:', err);
        setStatus({ message: 'Wallet Kit failed to load', type: 'error' });
      }
    };

    initWalletKit();
  }, []);

  const loadNFTs = async (account: WalletAccount) => {
    setIsLoading(true);
    try {
      // En producción, usar SuiClient con los objetos reales
      const suiClient = new SuiClient({ url: SUI_TESTNET_URL });
      const objects = await suiClient.getOwnedObjects({
        owner: account.address,
        options: { showType: true, showContent: true },
      });
      console.log('Owned objects:', objects);

      // Por ahora, usamos datos mock
      const mockMonsters: Monster[] = [
        { id: '1', name: 'Inferno Dragon', icon: '🐉', hp: 120, attack: 25, energy: 100, level: 5 },
        { id: '2', name: 'Frost Wolf', icon: '🐺', hp: 100, attack: 30, energy: 90, level: 4 },
        { id: '3', name: 'Storm Phoenix', icon: '🦅', hp: 90, attack: 35, energy: 110, level: 6 },
        { id: '4', name: 'Stone Colossus', icon: '🗿', hp: 150, attack: 20, energy: 80, level: 7 },
        { id: '5', name: 'Shadow Panther', icon: '🐆', hp: 95, attack: 28, energy: 105, level: 5 },
        { id: '6', name: 'Crystal Serpent', icon: '🐍', hp: 110, attack: 26, energy: 95, level: 5 },
      ];
      setMonsters(mockMonsters);
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setStatus({ message: 'Failed to summon champions', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const selectMonster = (monster: Monster) => {
    setSelectedMonster(monster);
    setStatus(null);
  };

  const startBattle = () => {
    if (!selectedMonster) {
      setStatus({ message: 'Select a champion to enter the arena', type: 'error' });
      return;
    }

    setStatus({ message: `Entering arena with ${selectedMonster.name}...`, type: 'success' });

    setTimeout(() => {
      alert(`⚔️ ${selectedMonster.name} enters the Jablix Arena!\n\nIn a real implementation, this would create an on-chain battle transaction and lock your NFT for the duration of the battle.`);
      setStatus({ message: 'Battle transaction would be sent to Sui Testnet', type: 'success' });
    }, 1000);
  };

  const handleDisconnect = () => {
    if (connectedWallet) {
      connectedWallet.disconnect();
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="container">
        <header>
          <h1>⚔️ JABLIX ARENA</h1>
          <p className="subtitle">Battle with your NFT Champions on the Sui Testnet</p>
        </header>

        {!showLobby ? (
          <div className="connect-section" id="connectSection">
            <h2>Connect Your Sui Wallet</h2>
            <p style={{ margin: '15px 0', color: '#d2b48c' }}>
              Enter the Arena with your NFT Champions
            </p>
            <div id="wallet-connect-button"></div>
            {currentAccount && (
              <div className="wallet-info">
                Connected: {currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}{' '}
                with {connectedWallet?.name}
              </div>
            )}
            {isLoading && (
              <div className="loading">Summoning your champions...</div>
            )}
            {status && (
              <div className="status" style={{ color: status.type === 'error' ? '#ff6347' : '#d4af37' }}>
                {status.message}
              </div>
            )}
          </div>
        ) : (
          <div className="lobby-section" id="lobbySection">
            <h2>Your NFT Champions</h2>
            <p style={{ margin: '15px 0', color: '#d2b48c' }}>
              Select a champion to enter the Arena
            </p>
            <div className="monsters-grid">
              {monsters.length === 0 ? (
                <p
                  style={{
                    color: '#ff6347',
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    textShadow: '0 0 10px rgba(255, 99, 71, 0.5)',
                  }}
                >
                  No champions found in your arena
                </p>
              ) : (
                monsters.map((monster) => (
                  <div
                    key={monster.id}
                    className={`monster-card ${selectedMonster?.id === monster.id ? 'selected' : ''}`}
                    onClick={() => selectMonster(monster)}
                  >
                    <div className="arena-shield">Lv.{monster.level}</div>
                    <div className="monster-icon">{monster.icon}</div>
                    <div className="monster-name">{monster.name}</div>
                    <div className="monster-stats">
                      <span>HP: {monster.hp}</span>
                      <span>ATK: {monster.attack}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              className={`battle-btn ${selectedMonster ? 'active' : ''}`}
              onClick={startBattle}
            >
              ENTER ARENA
            </button>
            {status && (
              <div className="status" style={{ color: status.type === 'error' ? '#ff6347' : '#d4af37' }}>
                {status.message}
              </div>
            )}
            <button className="back-btn" onClick={handleDisconnect}>
              DISCONNECT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default JablixArena;