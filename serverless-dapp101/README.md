# Serverless DApp 101

A 1-hour hands-on workshop to build your first decentralized app with Arkiv.

## What You'll Build

- A simple micro-app that uses Arkiv (decentralized database)
- Read and write data to Arkiv
- Verify your data on the blockchain explorer
- Experience the "walkaway test" - data persists independently

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   Create `.env.local`:
   ```bash
   SPACE_ID=ns
   ARKIV_PRIVATE_KEY=0x...  # Your testnet wallet private key
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Visit:**
   - Tutorial: `http://localhost:3000/01-quick-start`
   - Hello World Demo: `http://localhost:3000/hello-world`
   - Learn: `http://localhost:3000/learn`
   - Dictionary: `http://localhost:3000/dict`
   - Security: `http://localhost:3000/security`

## Structure

```
serverless-dapp101/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx             # Layout with progress provider and navigation
│   ├── [step]/                # Individual step pages
│   ├── hello-world/           # Hello world demo app
│   ├── learn/                 # Visual learning aids and tutorials
│   ├── dict/                  # Web3 concepts dictionary
│   ├── security/              # Web3 security guide
│   ├── visuals/               # Visual aids page
│   └── api/                   # API routes
├── components/                 # Reusable UI components
│   ├── HomeLink.tsx           # Navigation components
│   ├── LearnLink.tsx
│   ├── DictLink.tsx
│   ├── SecurityLink.tsx
│   ├── TryLink.tsx
│   ├── GitHubLink.tsx
│   └── ...                    # Tutorial UI components
├── content/                   # Step content and config
├── lib/                       # Arkiv client utilities
└── README.md                  # This file
```

## Sections

**Learn** (`/learn`): Visual learning aids and step-by-step tutorials explaining Arkiv concepts, data flows, and architecture patterns.

**Dict** (`/dict`): Web3 concepts dictionary with explanations at multiple levels (ELI5, Builder, Engineer, Developer) covering data sovereignty, decentralized databases, walkaway tests, and trustless design principles.

**Security** (`/security`): Comprehensive guide to Web3 software supply chain security, including threat vectors, mitigation strategies, and questions for developers and AI agents.

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository
2. Set environment variables:
   - `SPACE_ID=ns`
   - `ARKIV_PRIVATE_KEY=0x...`
3. Deploy

## Resources

- [Arkiv Network](https://arkiv.network)
- [Arkiv Dev Portal](https://arkiv.network/dev)
- [Arkiv TypeScript Getting Started](https://arkiv.network/getting-started/typescript)

## Status

✅ Tutorial app complete
✅ Hello world app complete
✅ All engineering guidelines followed
✅ Ready for deployment
