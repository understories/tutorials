# Verify on Explorer

## Learning Objectives

By the end of this step, you'll:
- Know how to use the Arkiv blockchain explorer
- Understand how to verify your transactions on-chain
- See the data stored in your transactions

## Content

### What is the Explorer?

The Arkiv Explorer is a blockchain browser - like Etherscan for Ethereum, but for Arkiv. It lets you:
- View all transactions on Arkiv
- See transaction details (hash, block, gas, etc.)
- Verify data stored in transactions
- Check wallet addresses and balances

### Why Verify?

Verifying on the explorer proves that:
- Your data is actually on-chain (not just in a database)
- Your transaction was confirmed by the network
- Anyone can independently verify your data
- Your app is truly decentralized

## Vibe Path (AI-Assisted)

```prompt
I'm at step 6: Verify on Explorer.

Help me:
1. Find the "View on Explorer" link for my message
2. Understand what I'm seeing on the explorer page
3. Locate my transaction data in the explorer
4. Explain what makes this verification important

Explain blockchain transparency and on-chain verification.
```

## Manual Path

### Step 6.1: Find Your Transaction Link

1. Go to the hello-world demo page (`http://localhost:3000/hello-world`)
2. Find one of your messages in the list
3. Look for the "View on Explorer →" link at the bottom right of the message card
4. Click the link

### Step 6.2: Explore the Transaction Page

You'll be taken to the Mendoza testnet explorer. On this page, you'll see:

**Transaction Overview:**
- **Transaction Hash**: Unique identifier for your transaction
- **Status**: Confirmed (or Pending)
- **Block Number**: Which block your transaction is in
- **Timestamp**: When the transaction was confirmed

**Transaction Details:**
- **From**: Your wallet address
- **To**: The Arkiv contract address
- **Gas Used**: How much gas the transaction consumed
- **Transaction Fee**: Cost of the transaction (in testnet tokens)

### Step 6.3: View Transaction Data

Scroll down to see the transaction data. You'll find:
- **Input Data**: The encoded data you sent (your message)
- **Logs**: Events emitted by the transaction
- **Entity Information**: Details about the entity you created

### Step 6.4: Verify Your Message Data

Look for your message content in the transaction data. You should be able to see:
- The text of your message
- The timestamp when it was created
- Your wallet address
- The space ID ("ns")

### Step 6.5: Explore Other Transactions

1. Click on your wallet address in the explorer
2. You'll see all transactions from your wallet
3. Try clicking on other wallet addresses to see their messages
4. Notice how all data is publicly visible and verifiable

## Checkpoint

Before moving to the next step, verify:

- [ ] I've clicked "View on Explorer" for at least one message
- [ ] I can see my transaction on the explorer
- [ ] I can see my message data in the transaction
- [ ] I understand that this data is on-chain and verifiable
- [ ] I've explored other transactions to see the public nature of the data

## Troubleshooting

**Q: The "View on Explorer" link doesn't appear.**
A: The link only appears after the transaction is indexed. Wait a moment and refresh the page. If it still doesn't appear, check the browser console for errors.

**Q: The explorer page shows "Transaction Not Found".**
A: The transaction may still be pending. Wait a moment and try again. If it persists, check that you're on the correct testnet (Mendoza).

**Q: I can't find my message data in the transaction.**
A: The data is encoded in the transaction. Look in the "Input Data" or "Logs" section. The explorer may have a decoder that shows the decoded data.

**Q: Can I share the explorer link with others?**
A: Yes! That's the beauty of blockchain - anyone can verify your data by visiting the explorer link. Share it to show your message is on-chain!

**Q: What if I want to see all messages from the workshop?**
A: You can query the explorer for all transactions to the Arkiv contract, or use the API to query all messages with `spaceId='ns'`.
