// GaudixStrategyMultiverse.tsx
import React from 'react';
import { ConnectButton } from '@mysten/wallet-kit';

// --- Estilos embebidos (puedes moverlos a CSS si lo prefieres) ---
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
      max-width: 900px;
      margin: 0 auto;
      padding: 0 20px;
    }

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
    .mobile-menu-btn { 
      display: block; 
      background: none; 
      border: none; 
      color: var(--text-primary); 
      cursor: pointer; 
    }
    .mobile-menu-btn svg { width: 24px; height: 24px; }

    main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4rem 0;
    }

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

    .coming-soon-container {
      position: relative;
      width: 100%;
      max-width: 800px;
      background-color: rgba(26, 26, 26, 0.8);
      backdrop-filter: blur(15px);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 4rem 3rem;
      text-align: center;
      z-index: 1;
    }

    .coming-soon-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
      opacity: 0.3;
      z-index: -1;
    }

    .game-title {
      font-size: 3.5rem;
      font-weight: 700;
      font-family: var(--font-heading);
      margin-bottom: 1rem;
      position: relative;
      z-index: 2;
    }
    
    .coming-soon-text {
      font-size: 1.5rem;
      color: var(--text-secondary);
      margin-bottom: 3rem;
      position: relative;
      z-index: 2;
    }

    .marketplace-btn {
      background-color: var(--primary-color);
      color: white;
      padding: 1rem 3rem;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      position: relative;
      z-index: 2;
    }
    .marketplace-btn:hover {
      background-color: var(--primary-hover);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
    }
    .marketplace-btn svg {
      width: 24px;
      height: 24px;
    }

    @media (max-width: 768px) {
      .header-content nav { display: none; }
      .coming-soon-container {
        padding: 2rem 1.5rem;
        margin: 1rem;
      }
      .game-title { font-size: 2.5rem; }
      .coming-soon-text { font-size: 1.2rem; }
      .marketplace-btn { padding: 0.8rem 2rem; font-size: 1rem; }
    }
  `}</style>
);

const GaudixStrategyMultiverse: React.FC = () => {
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
              {/* ✅ Usa el botón oficial de Wallet Kit */}
              <ConnectButton />
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
            <div className="coming-soon-container">
              <img
                src="https://images.unsplash.com/photo-1749835155322-fb5f17e4fb50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNoZXNzfGVufDB8fHx8MTc2MDk5MDY0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Strategic multiverse background"
                className="coming-soon-bg"
              />
              <h1 className="game-title">Gaudix Strategy Multiverse</h1>
              <p className="coming-soon-text">This universe is still under construction.</p>
              <a
                href="https://nexuxgamenetwork.vercel.app/marketplace.html"
                className="marketplace-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Get Gaudix NFTs on the Marketplace
              </a>
            </div>
          </div>
        </main>

        <footer>
          <div className="container footer-content">
            <div className="footer-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 8.5l-9 7"></path>
                <path d="M7.5 8.5l9 7"></path>
                <path d="M12 2L2 8v8l10 6 10-6V8L12 2z"></path>
              </svg>
              <p>© {new Date().getFullYear()} NexusPlay Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GaudixStrategyMultiverse;