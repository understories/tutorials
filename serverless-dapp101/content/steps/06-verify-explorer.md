# Verify on Explorer

## Learning Objectives

By the end of this step, you'll:
- Know how to use the Arkiv blockchain explorer
- Understand the difference between viewing entities and transactions
- Verify both your entity (data) and transaction (blockchain operation) on-chain
- See the data stored in your entities and transactions

## Content

### What is the Explorer?

The Arkiv Explorer is a blockchain browser - like Etherscan for Ethereum, but for Arkiv. It lets you:
- View all entities (data structures) on Arkiv
- View all transactions (blockchain operations) on Arkiv
- See entity details (key, payload, attributes)
- See transaction details (hash, block, gas, etc.)
- Verify data stored in entities and transactions
- Check wallet addresses and balances

**Key Concept:** You can view your data from two perspectives:
- **Entity view**: Shows the data structure (your message, attributes, payload)
- **Transaction view**: Shows the blockchain operation that created that entity

### Why Verify?

Verifying on the explorer proves that:
- Your data is actually on-chain (not just in a database)
- Your transaction was confirmed by the network
- Anyone can independently verify your data
- Your app is truly decentralized

![Data Flow - Write](/visuals/data-flow-write.svg)

This shows how your write operation flows through to blockchain confirmation. Once confirmed, your transaction hash can be used to verify the data on-chain.

![Verification Flow](/visuals/verification-flow.svg)

This step-by-step flow shows how to use a transaction hash to verify data on the blockchain using the Arkiv explorer. Every write operation returns a transaction hash, which you can use to look up and verify the transaction on the explorer.

## AI-Assisted Path

```prompt
I'm at step 6: Verify on Explorer.

Help me:
1. Find the "View on Explorer" link for my message
2. Understand what I'm seeing on the explorer page
3. Locate my transaction data in the explorer
4. Explain what makes this verification important

Explain blockchain transparency and on-chain verification.

Update the internal implementation plan with notes and show me the plan so I can track your progress.
```

## Manual Path

### Step 6.1: Find Your Entity and Transaction Links

1. Go to the hello-world demo page (`http://localhost:3000/hello-world`)
2. Find one of your messages in the list
3. Look for two links at the bottom of the message card:
   - **Entity link**: Shows the entity key (identifier for your data)
   - **Transaction link**: Shows the transaction hash (identifier for the blockchain operation)
4. Click either link to explore on the blockchain explorer

### Step 6.2: Explore the Entity Page

If you clicked the **Entity link**, you'll see the entity view:

**Entity Overview:**
- **Entity Key**: Unique identifier for your data
- **Created**: When the entity was created
- **Space ID**: Which space the entity belongs to ("ns" for shared space)

**Entity Details:**
- **Payload**: Your message content (decoded JSON)
- **Attributes**: Metadata like `type`, `wallet`, `spaceId`, `created_at`
- **Content Type**: How the payload is encoded (application/json)

**What you'll see:**
- The text of your message
- The timestamp when it was created
- Your wallet address
- The space ID ("ns")
- All queryable attributes

### Step 6.3: Explore the Transaction Page

If you clicked the **Transaction link**, you'll see the transaction view:

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

**Transaction Data:**
- **Input Data**: The encoded data you sent (your message)
- **Logs**: Events emitted by the transaction
- **Entity Information**: Details about the entity that was created

### Step 6.4: Compare Entity vs Transaction Views

**Key Insight:** Both views show the same data, but from different perspectives:
- **Entity view** focuses on the data structure (what was stored)
- **Transaction view** focuses on the blockchain operation (how it was stored)

Try clicking both links for the same message to see the difference! The entity view is optimized for understanding your data, while the transaction view is optimized for understanding the blockchain operation.

### Step 6.5: Explore Other Entities and Transactions

1. Click on your wallet address in the explorer
2. You'll see all transactions from your wallet
3. Try clicking on other wallet addresses to see their messages
4. Notice how all data is publicly visible and verifiable

## Checkpoint

Before moving to the next step, verify:

- [ ] I've clicked both the Entity and Transaction links for at least one message
- [ ] I can see my entity on the explorer (entity view)
- [ ] I can see my transaction on the explorer (transaction view)
- [ ] I understand the difference between entity view (data) and transaction view (blockchain operation)
- [ ] I can see my message data in both views
- [ ] I understand that this data is on-chain and verifiable
- [ ] I've explored other entities and transactions to see the public nature of the data

## Troubleshooting

**Q: The Entity or Transaction links don't appear.**
A: The Entity link should appear immediately. The Transaction link only appears after the transaction is indexed. Wait a moment and refresh the page. If it still doesn't appear, check the browser console for errors.

**Q: The explorer page shows "Transaction Not Found".**
A: The transaction may still be pending. Wait a moment and try again. If it persists, check that you're on the correct testnet (Braga).

**Q: I can't find my message data in the transaction.**
A: The data is encoded in the transaction. Look in the "Input Data" or "Logs" section. The explorer may have a decoder that shows the decoded data.

**Q: Can I share the explorer link with others?**
A: Yes! That's the beauty of blockchain - anyone can verify your data by visiting the explorer link. Share it to show your message is on-chain!

**Q: What if I want to see all messages from the workshop?**
A: You can query the explorer for all transactions to the Arkiv contract, or use the API to query all messages with `spaceId='ns'`.
