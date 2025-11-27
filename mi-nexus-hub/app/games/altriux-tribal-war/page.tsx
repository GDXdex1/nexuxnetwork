// AltriuxTribalWar.tsx
import React, { useEffect, useState } from 'react';
import { getWalletKitButton } from '@mysten/wallet-kit';

// --- Estilos globales (puedes moverlos a un .css si prefieres) ---
const GlobalStyles = () => (
  <style>{`
    :root {
      --bg-color: #0a0a0a;
      --surface-color: #1a1a1a;
      --border-color: #333;
      --primary-color: #3b82f6;
      --primary-hover: #2563eb;
      --text-primary: #ffffff;
      --text-secondary: #a1a1aa;
      --font-heading: 'Space Grotesk', sans-serif;
      --font-body: 'Inter', sans-serif;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-color);
      color: var(--text-primary);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Header */
    header {
      position: sticky;
      top: 0;
      z-index: 50;
      width: 100%;
      border-bottom: 1px solid var(--border-color);
      background-color: rgba(10, 10, 10, 0.8);
      backdrop-filter: blur(8px);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 65px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5rem;
      font-weight: 700;
      font-family: var(--font-heading);
      text-decoration: none;
      color: var(--text-primary);
    }
    .logo svg { width: 28px; height: 28px; }
    nav {
      display: none;
      gap: 2rem;
      font-weight: 500;
    }
    nav a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s ease-in-out;
    }
    nav a:hover, nav a.active { color: var(--text-primary); }
    .connect-wallet-btn {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .connect-wallet-btn:hover { background-color: var(--primary-hover); }
    .mobile-menu-btn { 
      display: block; 
      background: none; 
      border: none; 
      color: var(--text-primary); 
      cursor: pointer; 
    }
    .mobile-menu-btn svg { width: 24px; height: 24px; }

    main { flex: 1; }

    footer {
      border-top: 1px solid var(--border-color);
      padding: 2rem 0;
      margin-top: auto;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    .footer-content a { 
      color: var(--text-secondary); 
      text-decoration: none; 
    }
    .footer-content a:hover { color: var(--text-primary); }

    /* Game Specific */
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .game-title {
      font-size: 3rem;
      font-weight: 700;
      font-family: var(--font-heading);
    }
    .game-stats {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background-color: rgba(26, 26, 26, 0.8);
      padding: 0.5rem 1rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      flex-wrap: wrap;
    }
    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .stat-item svg { width: 20px; height: 20px; }
    .stat-value { font-weight: 700; }
    .stat-label { font-size: 0.9rem; color: var(--text-secondary); }
    .game-date-time { 
      display: flex; 
      align-items: center; 
      gap: 0.5rem; 
      border-left: 1px solid var(--border-color); 
      padding-left: 1.5rem; 
    }
    .game-date-time svg { 
      width: 20px; 
      height: 20px; 
      color: var(--primary-color); 
    }
    
    .main-menu-container {
      position: relative;
      width: 100%;
      height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .main-menu-content {
      background-color: rgba(26, 26, 26, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 3rem;
      text-align: center;
      max-width: 800px;
      width: 100%;
    }
    .main-menu-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      font-family: var(--font-heading);
      margin-bottom: 2rem;
    }
    .main-menu-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .menu-btn {
      padding: 1.5rem 1rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      text-align: center;
      background-color: var(--surface-color);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      height: 100%;
    }
    .menu-btn svg { width: 32px; height: 32px; }
    .menu-btn:hover:not(:disabled) {
      background-color: #2a2a2a;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    .menu-btn:disabled {
      background-color: #222;
      color: #666;
      cursor: not-allowed;
      opacity: 0.6;
    }
    .menu-btn span {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .connection-prompt {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(10, 10, 10, 0.9);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      z-index: 10;
      border-radius: 16px;
    }
    .connection-prompt h3 {
      font-size: 1.5rem;
      font-family: var(--font-heading);
    }
    .connection-prompt p {
      color: var(--text-secondary);
    }
    .connect-prompt-btn {
      margin-top: 1rem;
      padding: 0.8rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: var(--primary-color);
      color: white;
      border: none;
    }
    .connect-prompt-btn:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .header-content nav { display: none; }
      .game-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .game-title { font-size: 2.5rem; }
      .game-stats { flex-wrap: wrap; }
      .game-date-time { border-left: none; padding-left: 0; }
      .main-menu-content { padding: 2rem; margin: 1rem; }
      .main-menu-content h2 { font-size: 2rem; }
      .main-menu-actions { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
    }
  `}</style>
);

// --- Tipos ---
interface WalletAccount {
  address: string;
}

interface ConnectedWallet {
  account: WalletAccount;
  name: string;
  disconnect: () => void;
}

// --- Componente principal ---
const AltriuxTribalWar: React.FC = () => {
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
  const [showConnectionPrompt, setShowConnectionPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inicializar WalletKit
    const walletKit = getWalletKitButton({
      container: document.getElementById('wallet-connect-button')!,
      onConnect: (wallet) => {
        const walletObj: ConnectedWallet = {
          account: wallet.account,
          name: wallet.name,
          disconnect: wallet.disconnect,
        };
        setConnectedWallet(walletObj);
        setShowConnectionPrompt(false);
      },
      onDisconnect: () => {
        setConnectedWallet(null);
      },
    });

    return () => {
      // Limpiar si es necesario
    };
  }, []);

  const handleActionClick = (action: string) => {
    if (!connectedWallet) {
      setShowConnectionPrompt(true);
      return;
    }
    alert(`Action: ${action} (not implemented yet)`);
  };

  const handleDisconnect = () => {
    if (connectedWallet) {
      connectedWallet.disconnect();
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header>
          <div className="container header-content">
            <a href="/index.html" className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 8.5l-9 7"></path>
                <path d="M7.5 8.5l9 7"></path>
                <path d="M12 2L2 8v8l10 6 10-6V8L12 2z"></path>
              </svg>
              <span>NexusPlay Hub</span>
            </a>

            <nav>
              <a href="/index.html">Home</a>
              <a href="/exchange.html">Exchange</a>
              <a href="/marketplace.html">Marketplace</a>
              <a href="/wallet.html">Draxiux Wallet</a>
            </nav>

            <div className="header-actions">
              <div id="wallet-connect-button"></div>
              <button className="mobile-menu-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="container">
            {/* Game Header */}
            <div className="game-header">
              <h1 className="game-title">Altriux Tribal War</h1>
              <div className="game-stats">
                <div className="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="6"></circle>
                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                    <path d="M7 6h1v4"></path>
                    <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                  </svg>
                  <span className="stat-value">1</span>
                  <span className="stat-label">Silver Coin</span>
                </div>
                <div className="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="6"></circle>
                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                    <path d="M7 6h1v4"></path>
                    <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                  </svg>
                  <span className="stat-value">0</span>
                  <span className="stat-label">Gold Coin</span>
                </div>
                <div className="game-date-time">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                  <span className="font-mono text-sm">Y1, M1, D1</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                  <span className="font-mono text-sm">08:00</span>
                </div>
              </div>
            </div>

            {/* Main Menu */}
            <div className="main-menu-container">
              <div className="main-menu-content">
                <h2>North Tribe Village</h2>
                <div className="main-menu-actions">
                  <button
                    className="menu-btn"
                    onClick={() => handleActionClick('Work in Mine')}
                    disabled={!connectedWallet}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* SVG simplificado; puedes reemplazar con el real */}
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    Work in Mine
                    <span>Earn Silver Coins</span>
                  </button>
                  <button
                    className="menu-btn"
                    onClick={() => handleActionClick('Train Warriors')}
                    disabled={!connectedWallet}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    </svg>
                    Train Warriors
                    <span>Build your army</span>
                  </button>
                  <button
                    className="menu-btn"
                    onClick={() => handleActionClick('Explore')}
                    disabled={!connectedWallet}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Explore
                    <span>Discover new lands</span>
                  </button>
                </div>
              </div>

              {/* Overlay de conexión */}
              {showConnectionPrompt && (
                <div className="connection-prompt">
                  <h3>Connect Your Wallet</h3>
                  <p>To access the village, connect your Sui wallet.</p>
                  <button
                    className="connect-prompt-btn"
                    onClick={() => {
                      // WalletKit ya está inicializado; solo debes abrir modal
                      // Pero como no controlamos eso directamente, cerramos el prompt
                      // y el usuario ya ve el botón de conexión
                      setShowConnectionPrompt(false);
                    }}
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer>
          <div className="container footer-content">
            <div>© {new Date().getFullYear()} NexusPlay Hub</div>
            <div>
              <a href="/terms.html">Terms</a> • <a href="/privacy.html">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AltriuxTribalWar;