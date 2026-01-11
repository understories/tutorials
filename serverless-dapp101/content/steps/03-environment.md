# Set Environment Variables

## Learning Objectives

By the end of this step, you'll:
- Understand what environment variables are needed
- Have created your `.env` file with the correct values
- Know how to securely manage your private key

## Content

### What Are Environment Variables?

Environment variables are configuration values that your app needs to run. They're stored in a `.env` file (which is gitignored for security).

For this tutorial, you need:
- **SPACE_ID**: The space where your data lives (we'll use "ns" for the workshop)
- **ARKIV_PRIVATE_KEY**: Your wallet's private key (for signing transactions)

### Why Keep Them Secret?

Your private key is like a password - if someone has it, they can sign transactions as you. That's why `.env` files are never committed to git.

## Vibe Path (AI-Assisted)

```prompt
I'm at step 3: Set Environment Variables.

Help me:
1. Copy the .env.example file to .env
2. Fill in my ARKIV_PRIVATE_KEY (I have it from step 2)
3. Set SPACE_ID to "ns" for the workshop
4. Understand why we keep these values secret

Provide clear instructions and explain security best practices.
```

## Manual Path

### Step 3.1: Copy the Example File

The repository includes a `.env.example` file with all the required variables. Copy it to create your own `.env` file:

```bash
cp .env.example .env
```

### Step 3.2: Open and Edit `.env`

Open the `.env` file in your code editor. You'll see:

```bash
SPACE_ID=ns
ARKIV_PRIVATE_KEY=0x
```

### Step 3.3: Fill in Your Values

1. **SPACE_ID**: Set to `ns` (this is the shared workshop space)
   ```bash
   SPACE_ID=ns
   ```

2. **ARKIV_PRIVATE_KEY**: Paste your private key from step 2
   ```bash
   ARKIV_PRIVATE_KEY=0x1234567890abcdef...  # Your actual private key
   ```
   
   **Where to find your private key:**
   - If you used the [Arkiv Getting Started guide](https://arkiv.network/getting-started/typescript) in step 2, copy the private key that was generated there
   - Make sure it's the full key starting with `0x`
   - If you need to generate a new account, go back to [step 2](../02-fork-setup) or visit the [Getting Started guide](https://arkiv.network/getting-started/typescript)
   
   **Important**: 
   - Make sure it starts with `0x`
   - Don't share this key with anyone
   - This is for testnet only
   - The `.env` file is automatically gitignored (it's in `.gitignore`) - this is a security feature

### Step 3.4: Verify Your `.env` File

Your `.env` file should look like this (with your actual private key):

```bash
# Arkiv Network Configuration
SPACE_ID=ns
ARKIV_PRIVATE_KEY=0xYOUR_ACTUAL_PRIVATE_KEY_HERE
```

**Security Check:**
- ✅ `.env` is in `.gitignore` (won't be committed)
- ✅ You never share your private key
- ✅ This is testnet only (not real money)

## Checkpoint

Before moving to the next step, verify:

- [ ] I've copied `.env.example` to `.env`
- [ ] I've set `SPACE_ID=ns`
- [ ] I've added my `ARKIV_PRIVATE_KEY` (starts with 0x)
- [ ] My `.env` file is not committed to git (it's in `.gitignore`)
- [ ] I understand why we keep the private key secret

## Troubleshooting

**Q: I don't see a `.env.example` file.**
A: Make sure you're in the root directory of the project. If it's missing, create a `.env` file manually with the variables above.

**Q: How do I know if my private key is correct?**
A: It should:
- Start with `0x`
- Be 66 characters long (including the `0x` prefix)
- Be the same key you generated in step 2 using the [Arkiv Getting Started guide](https://arkiv.network/getting-started/typescript)

**Q: I lost my private key from step 2.**
A: You'll need to generate a new account. Go back to [step 2](../02-fork-setup) and use the [Arkiv Getting Started guide](https://arkiv.network/getting-started/typescript) to generate a new account. You'll also need to get new testnet tokens for the new wallet address from the [Mendoza Testnet Faucet](https://mendoza.hoodi.arkiv.network/faucet/).

**Q: Can I use the same private key for multiple projects?**
A: Yes, but for testnet only. Never reuse testnet keys for mainnet, and never share keys between projects in production.
