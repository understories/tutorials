# Fork Template & Generate Wallet

## Learning Objectives

By the end of this step, you'll:
- Have forked the starter template
- Generated your own wallet for the Arkiv testnet
- Be ready to set up your environment

## Content

### What is the Starter Template?

The starter template is a minimal Next.js app that demonstrates:
- Reading data from Arkiv
- Writing data to Arkiv
- Handling transactions and errors

Think of it as your "hello world" for decentralized apps.

## Vibe Path (AI-Assisted)

```prompt
I'm at step 2: Fork Template & Generate Wallet.

Help me:
1. Fork the arkiv-nextjs-starter repository on GitHub
2. Clone it locally
3. Generate a new wallet for Arkiv testnet (Mendoza)
4. Understand what the starter template includes

Provide clear, step-by-step instructions.
```

## Manual Path

### Step 2.1: Fork the Starter Template

1. Go to the starter template repository
2. Click "Fork" in the top right
3. Choose your GitHub account
4. Wait for the fork to complete

### Step 2.2: Clone Locally

```bash
git clone https://github.com/YOUR_USERNAME/arkiv-nextjs-starter.git
cd arkiv-nextjs-starter
```

### Step 2.3: Generate Your Wallet

You'll need a wallet to sign transactions on Arkiv. Since Arkiv uses EVM-compatible wallets, you can generate one using standard Ethereum tools.

**Option 1: Using Arkiv Dev Portal (Recommended)**
1. Visit the [Arkiv Dev Portal](https://arkiv.network/dev)
2. Use the wallet generation tool (if available)
3. Copy your private key and wallet address
4. **Important:** Save your private key securely - you'll need it for the next step

**Option 2: Using MetaMask**
1. Install [MetaMask](https://metamask.io) browser extension
2. Create a new account
3. Export the private key (Settings → Security & Privacy → Show Private Key)
4. **Important:** This is for testnet only - never use your main wallet's private key!

**Option 3: Using Node.js (if you prefer command line)**
```bash
# Install dependencies first
npm install

# Generate wallet using ethers (or viem)
node -e "const { ethers } = require('ethers'); const wallet = ethers.Wallet.createRandom(); console.log('Address:', wallet.address); console.log('Private Key:', wallet.privateKey);"
```

**What you'll get:**
- Wallet address (public key) - e.g., `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
- Private key - e.g., `0x...` (keep this secret!)

**Important:** 
- Save your private key securely - you'll need it for the next step
- This wallet will be used on Mendoza testnet only
- You'll need testnet tokens (get them from the Arkiv Dev Portal faucet)

## Checkpoint

Before moving to the next step, verify:

- [ ] I've forked the starter template
- [ ] I've cloned it locally
- [ ] I've generated a wallet
- [ ] I've saved my private key securely
- [ ] I'm ready to set environment variables

## Troubleshooting

**Q: I don't have a GitHub account.**
A: Create one at [github.com](https://github.com) - it's free and takes 2 minutes.

**Q: How do I get testnet tokens for my wallet?**
A: Visit the [Arkiv Dev Portal](https://arkiv.network/dev) and use the "Get Test Tokens" feature (faucet). Enter your wallet address to receive testnet tokens.

**Q: Can I use MetaMask?**
A: Yes! MetaMask works perfectly with Arkiv. Just make sure to add Mendoza testnet to MetaMask (the Dev Portal has a link to add it automatically).

