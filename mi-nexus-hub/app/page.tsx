// Home.tsx (o Index.tsx)
import React from 'react';
import { ConnectButton } from '@mysten/wallet-kit';

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

    .logo svg {
      width: 28px;
      height: 28px;
    }

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

    nav a:hover {
      color: var(--text-primary);
    }

    .mobile-menu-btn {
      display: block;
      background: none;
      border: none;
      color: var(--text-primary);
      cursor: pointer;
    }
    
    .mobile-menu-btn svg {
      width: 24px;
      height: 24px;
    }

    main {
      flex: 1;
    }

    .hero {
      text-align: center;
      padding: 100px 0;
      border-bottom: 1px solid var(--border-color);
    }

    .hero h1 {
      font-size: 3.5rem;
      font-weight: 700;
      font-family: var(--font-heading);
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }

    .hero p {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 800px;
      margin: 0 auto 3rem auto;
    }

    .hero-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background-color: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
    }

    .btn-secondary {
      border: 1px solid var(--border-color);
      color: var(--text-primary);
    }

    .btn-secondary:hover {
      background-color: var(--surface-color);
      transform: translateY(-2px);
    }

    .games {
      padding: 80px 0;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      font-family: var(--font-heading);
      margin-bottom: 3rem;
    }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .game-card {
      background-color: var(--surface-color);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border-color);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .game-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .game-card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .game-card-content {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .game-card-title {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: var(--font-heading);
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .game-card-title svg {
      width: 28px;
      height: 28px;
      color: var(--primary-color);
    }

    .game-card p {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .game-card .btn {
      align-self: flex-start;
    }

    footer {
      border-top: 1px solid var(--border-color);
      padding: 2rem 0;
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
    
    .footer-content a:hover {
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .header-content nav {
        display: none;
      }
      .hero h1 {
        font-size: 2.5rem;
      }
      .hero p {
        font-size: 1.1rem;
      }
    }
  `}</style>
);

const Home: React.FC = () => {
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
          {/* Hero Section */}
          <section className="hero">
            <div className="container">
              <h1>Welcome to NexusPlay Hub</h1>
              <p>The ultimate destination for play-to-earn gaming. Discover unique games, trade assets on our exchange, and own your victories in the NFT marketplace.</p>
              <div className="hero-buttons">
                <a href="/marketplace.html" className="btn btn-primary">Explore Marketplace</a>
                <a href="/exchange.html" className="btn btn-secondary">Go to Exchange</a>
              </div>
            </div>
          </section>

          {/* Games Section */}
          <section className="games">
            <div className="container">
              <h2 className="section-title">Our Games</h2>
              <div className="games-grid">
                {/* Game 1 */}
                <div className="game-card">
                  <img
                    src="https://images.unsplash.com/photo-1749835155322-fb5f17e4fb50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNoZXNzfGVufDB8fHx8MTc2MDk5MDY0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Gaudix Strategy Multiverse"
                    className="game-card-image"
                  />
                  <div className="game-card-content">
                    <h3 className="game-card-title">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth="2">
                        <path d="M12 2a10 10 0 1 0 10 10"></path>
                        <path d="M12 2a10 10 0 0 0-10 10"></path>
                        <path d="M2 12a10 10 0 0 0 10 10"></path>
                        <path d="M22 12a10 10 0 0 1-10 10"></path>
                        <path d="M12 2v20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      Gaudix Strategy Multiverse
                    </h3>
                    <p>Engage in a universe of strategic battles where every decision shapes your destiny. Outsmart your opponents in this complex multiverse.</p>
                    <a href="/games/gaudix-strategy-multiverse" className="btn btn-primary">Play Now</a>
                  </div>
                </div>

                {/* Game 2 */}
                <div className="game-card">
                  <img
                    src="https://images.unsplash.com/photo-1680445530435-100993db6c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmFudGFzeSUyMGFyZW5hfGVufDB8fHx8MTc2MDg4NDgzNHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Jablix Arena"
                    className="game-card-image"
                  />
                  <div className="game-card-content">
                    <h3 className="game-card-title">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth="2">
                        <path d="M14.5 17.5l-5-5"></path>
                        <path d="M9.5 17.5l5-5"></path>
                        <path d="M2 12l5.2 5.2"></path>
                        <path d="M16.8 6.8L22 12"></path>
                        <path d="M2 12h20"></path>
                        <path d="M6.8 17.2L12 22"></path>
                        <path d="M12 2l5.2 5.2"></path>
                      </svg>
                      Jablix Arena
                    </h3>
                    <p>Step into the arena and prove your might. A fast-paced combat game where only the strongest survive and reap the rewards.</p>
                    <a href="/games/jablix-arena" className="btn btn-primary">Play Now</a>
                  </div>
                </div>

                {/* Game 3 */}
                <div className="game-card">
                  <img
                    src="https://images.unsplash.com/photo-1744324480866-1794a1bf193c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxnbG93aW5nJTIwYnJhaW58ZW58MHx8fHwxNzYwODY4NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Altriux Tribal War"
                    className="game-card-image"
                  />
                  <div className="game-card-content">
                    <h3 className="game-card-title">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth="2">
                        <path d="M12 2L9 5h6L12 2z"></path>
                        <path d="M12 22v-3"></path>
                        <path d="M12 19a7 7 0 1 0-7-7"></path>
                        <path d="M12 19a7 7 0 0 1 7-7"></path>
                        <path d="M5 12a7 7 0 0 0 7 7"></path>
                        <path d="M19 12a7 7 0 0 1-7 7"></path>
                      </svg>
                      Altriux Tribal War
                    </h3>
                    <p>Conquer the world in this open-world strategy game. Build your tribe and lead them to victory.</p>
                    <a href="/games/altriux-tribal-war" className="btn btn-primary">Play Now</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
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

export default Home;