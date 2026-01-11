# Create Your First Record

## Learning Objectives

By the end of this step, you'll:
- Understand how to write data to Arkiv
- Have created your first message/record
- Know how to verify your transaction was successful

## Content

> 💡 **Visual Aid:** For a detailed visual explanation of the write flow, check out the 
> [Data Flow - Write](/visuals#data-flow-write) diagram in the Visual Lesson.

### What We're Doing

You're about to write your first piece of data to Arkiv! This is a blockchain transaction - your message will be stored on-chain and be independently verifiable.

### How It Works

When you submit a message:
1. Your app creates a transaction with your message data
2. The transaction is signed with your private key
3. The transaction is submitted to Arkiv (Mendoza testnet)
4. The transaction is confirmed on-chain
5. Your message becomes queryable (may take a few seconds due to indexer lag)

## Vibe Path (AI-Assisted)

```prompt
I'm at step 5: Create Your First Record.

Help me:
1. Navigate to the hello-world demo page
2. Submit my first message to Arkiv
3. Understand what happens when I submit (transaction flow)
4. Verify my message appears in the list

Explain the transaction flow and indexer lag.
```

## Manual Path

### Step 5.1: Navigate to Hello World Demo

1. Make sure your dev server is running (`npm run dev`)
2. Open `http://localhost:3000/hello-world` in your browser
3. You should see the message board interface

### Step 5.2: Write Your First Message

1. In the text input field, type a message (e.g., "Hello from Arkiv!")
2. Click the "Post" button
3. Wait for the submission to complete

**What's happening:**
- Your message is being sent to the API route (`/api/serverless-dapp101/messages`)
- The API creates an entity on Arkiv with your message
- The transaction is signed with your private key
- The transaction is submitted to the blockchain

### Step 5.3: Wait for Confirmation

After clicking "Post", you may see:
- "Submitting..." while the transaction is being processed
- The message field clears when successful

**Important**: Due to indexer lag, your message may not appear immediately. This is normal!

### Step 5.4: Refresh to See Your Message

1. Click the "Refresh" button (or wait a few seconds)
2. Your message should appear in the list
3. You'll see:
   - Your message text
   - Your wallet address (shortened)
   - Timestamp
   - "View on Explorer" link (once the transaction is indexed)

### Step 5.5: Verify Transaction Details

Click "View on Explorer" to see your transaction on the blockchain explorer. You'll see:
- Transaction hash
- Block number
- Gas used
- Your wallet address
- The transaction data

## Checkpoint

Before moving to the next step, verify:

- [ ] I've navigated to the hello-world demo page
- [ ] I've submitted at least one message
- [ ] My message appears in the list (after refreshing)
- [ ] I can see the "View on Explorer" link
- [ ] I understand that indexer lag is normal

## Troubleshooting

**Q: I get an error "ARKIV_PRIVATE_KEY environment variable is required".**
A: Make sure you've completed step 3 (Set Environment Variables) and your `.env` file has `ARKIV_PRIVATE_KEY` set. Restart the dev server after updating `.env`.

**Q: My message doesn't appear after submitting.**
A: This is normal! Due to indexer lag, it can take 5-30 seconds for messages to appear. Click "Refresh" after waiting a moment.

**Q: I get a transaction timeout error.**
A: The testnet can be slow. Your transaction may still be processing. Wait 30 seconds and refresh. If it persists, check that you have testnet tokens in your wallet. If you need more tokens, visit the [Mendoza Testnet Faucet](https://mendoza.hoodi.arkiv.network/faucet/).

**Q: I get an "insufficient funds" error.**
A: You need testnet tokens to pay for gas fees. Visit the [Mendoza Testnet Faucet](https://mendoza.hoodi.arkiv.network/faucet/) to get 0.001 ETH test tokens. Make sure you're using the wallet address that matches your `ARKIV_PRIVATE_KEY` in your `.env` file.

**Q: How do I know if my transaction succeeded?**
A: Check the browser console for any errors. If you see a success message or the form clears, the transaction was submitted. Use "View on Explorer" to verify on-chain.

**Q: Can I submit multiple messages?**
A: Yes! Try submitting a few messages to see them all appear in the list.
