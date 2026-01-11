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

![Stack Comparison](/visuals/stack-comparison.svg)

This visual shows how Arkiv fits into the familiar development stack. Instead of PostgreSQL, MongoDB, or Firebase, you use **Arkiv**, a decentralized database that stores data on the blockchain. The query interface feels familiar, but the data lives on-chain.

## Vibe Path (AI-Assisted)

```prompt
I'm at step 2: Fork Template & Generate Wallet.

Help me:
1. Fork the arkiv-nextjs-starter repository on GitHub
2. Clone it locally
3. Generate a new wallet for Arkiv testnet (Mendoza) using the official Arkiv Getting Started guide at https://arkiv.network/getting-started/typescript
4. Copy my wallet address and private key from the interactive account generator
5. Get testnet tokens from the Mendoza faucet at https://mendoza.hoodi.arkiv.network/faucet/ (complete CAPTCHA and wait for tokens)
6. Verify I received the testnet tokens
7. Understand what the starter template includes

Provide clear, step-by-step instructions and emphasize using the official Arkiv Getting Started guide for account generation.
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

You'll need a wallet to sign transactions on Arkiv. The easiest way is to use the official Arkiv getting started guide, which includes an interactive account generator.

**Recommended: Using Arkiv Getting Started Guide**

1. **Visit the Arkiv Getting Started page:**
   - Go to [https://arkiv.network/getting-started/typescript](https://arkiv.network/getting-started/typescript)
   - Scroll to the "1) Arkiv 'Hello, World!'" section
   - You'll see an interactive account generator

2. **Generate your test account:**
   - Click the "Create your account" button in the interactive playground
   - This will generate a new wallet address and private key
   - **Important:** This account is for Arkiv Testnet/sandbox use only - never use it on Mainnet

3. **Copy your credentials:**
   - Copy your **wallet address** (public key) - e.g., `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
   - Copy your **private key** - e.g., `0x1234567890abcdef...` (keep this secret!)
   - Save both securely - you'll need the private key in the next step

4. **Get testnet tokens from the Mendoza faucet:**
   - Visit the [Mendoza Testnet Faucet](https://mendoza.hoodi.arkiv.network/faucet/)
   - Paste your **wallet address** into the "Wallet Address" field
   - Complete the Proof of Work CAPTCHA (this prevents abuse)
   - Click to request tokens
   - You'll receive 0.001 ETH test tokens (these have no real value)
   - Tokens will be sent through an Optimism Bridge and should appear in your wallet within a few seconds
   - **Important:** You need these testnet tokens to pay for gas fees when writing to Arkiv

**Alternative Options:**

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
- Save your private key securely - you'll need it for the next step where we'll add it to your `.env` file
- This wallet will be used on Mendoza testnet only
- Never share your private key - treat it like a password
- The `.env` file (where you'll store the private key) is automatically gitignored for security

## Checkpoint

Before moving to the next step, verify:

- [ ] I've forked the starter template
- [ ] I've cloned it locally
- [ ] I've generated a wallet using the [Arkiv Getting Started guide](https://arkiv.network/getting-started/typescript)
- [ ] I've copied my wallet address and private key
- [ ] I've visited the [Mendoza Testnet Faucet](https://mendoza.hoodi.arkiv.network/faucet/) and requested testnet tokens
- [ ] I've completed the CAPTCHA and received 0.001 ETH test tokens
- [ ] I've verified my wallet has a balance (check the faucet page or explorer)
- [ ] I've saved my private key securely (we'll add it to `.env` in the next step)
- [ ] I understand that `.env` files are gitignored for security

## Troubleshooting

**Q: I don't have a GitHub account.**
A: Create one at [github.com](https://github.com) - it's free and takes 2 minutes.

**Q: How do I get testnet tokens for my wallet?**
A: 
1. Visit the [Mendoza Testnet Faucet](https://mendoza.hoodi.arkiv.network/faucet/)
2. Paste your wallet address (the one you generated in step 2.3)
3. Complete the Proof of Work CAPTCHA
4. Click to request tokens
5. Wait a few seconds for the tokens to arrive via the Optimism Bridge
6. You'll receive 0.001 ETH test tokens (no real value, just for testing)

**Q: The faucet says "Enter valid address and complete CAPTCHA" but I did both.**
A: Make sure:
- Your wallet address starts with `0x` and is 42 characters long
- You've completed the CAPTCHA (it may take a moment to process)
- Wait a few seconds and check your wallet balance
- If it still doesn't work, try refreshing the page and trying again

**Q: How do I check if I received the testnet tokens?**
A: You can check your balance on the faucet page itself (it shows "Address Balance" at the top), or use the [Mendoza Explorer](https://explorer.mendoza.hoodi.arkiv.network) to view your wallet address.

**Q: Can I use MetaMask?**
A: Yes! MetaMask works perfectly with Arkiv. Just make sure to add Mendoza testnet to MetaMask (the Dev Portal has a link to add it automatically). However, we recommend using the [Arkiv Getting Started guide](https://arkiv.network/getting-started/typescript) for the simplest experience.

**Q: Is my private key safe in the .env file?**
A: Yes! The `.env` file is automatically gitignored (it's in `.gitignore`), so it will never be committed to git. This is a standard security practice. Never commit your private key to version control.

