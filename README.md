# Nexux Network — Sui Marketplace (Testnet)

- Set values in a `.env.local` based on `.env.example`.
- Install dependencies: npm install
- Dev: npm run dev
- Build: npm run build
- For Vercel: push to GitHub, connect to Vercel; Vercel will run `npm run build` automatically.

Notes:
- Replace Move call targets and Move struct names with your actual marketplace contract details.
- Remove legacy `old_html` or `legacy` folders in your repo to clean it for deployment.
- Add wallets to the WalletProvider if needed (suiet, suimobile, etc.).
