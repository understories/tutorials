# Create Your First Record

## Learning Objectives

By the end of this step, you'll:
- Understand how to write data to Arkiv
- Have created your first message/record
- Know how to verify your transaction was successful

## Content

### What We're Doing

You're about to write your first piece of data to Arkiv! This is a blockchain transaction - your message will be stored on-chain and be independently verifiable.

### How It Works

When you submit a message:
1. Your app creates a transaction with your message data
2. The transaction is signed with your private key
3. The transaction is submitted to Arkiv (Mendoza testnet)
4. The transaction is confirmed on-chain
5. Your message becomes queryable (may take a few seconds due to indexer lag)

![Data Flow - Write](/visuals/data-flow-write.svg)

This diagram shows the complete write flow: from user action through API route, wallet signing, Arkiv transaction, to final blockchain confirmation. Notice that the transaction is confirmed on-chain immediately, but indexers need time to process it (5-30 seconds delay. This is normal!).

![Data Flow - Read](/visuals/data-flow-read.svg)

Reading data from Arkiv is simpler than writing. No authentication is needed, and it's free! Queries go to Arkiv indexers, which filter entities by your criteria and return matching results.

![Entity Structure](/visuals/entity-structure.svg)

Every piece of data in Arkiv is stored as an **entity**. Understanding entity structure is key to building effective queries. Use attributes for anything you want to query on (they're indexed and fast), and store complex data in the payload as JSON.

## Vibe Path (AI-Assisted)

```prompt
I'm at step 5: Create Your First Record.

Help me:
1. Navigate to the hello-world demo page
2. Submit my first message to Arkiv
3. Understand what happens when I submit (transaction flow)
4. Verify my message appears in the list

Explain the transaction flow and indexer lag.

Update the internal implementation plan with notes and show me the plan so I can track your progress.
```

## Manual Path

### Step 5.1: Understand Your App Architecture

**Important:** Your `arkiv-hello-world` app is **completely standalone** and runs independently.

**How it works:**
- When you forked `arkiv-hello-world`, you got your own complete Next.js app
- Your app has its own API route at `/app/api/serverless-dapp101/messages/route.ts`
- When the frontend calls `/api/serverless-dapp101/messages`, it's calling **your own API route** (relative path), not an external service
- The API route path name (`serverless-dapp101`) is just a naming convention - it doesn't connect to the tutorial site

**How apps communicate:**
- Your app and the tutorial demo site (`serverlessdapp101.vercel.app`) are **independent**
- Both apps read and write directly to **Arkiv** (the blockchain)
- Both use `SPACE_ID=ns`, so they see the same messages by querying Arkiv
- **No HTTP calls between apps** - all communication happens through Arkiv

**What this means:**
- Your app can run completely on its own
- Messages you create appear on the tutorial demo site (and vice versa) because you're both querying the same Arkiv space
- You're building a truly decentralized app - no central server needed!

### Step 5.2: Navigate to Hello World Demo

1. Make sure your dev server is running (`npm run dev`)
2. Open `http://localhost:3000/hello-world` in your browser
3. You should see the message board interface

### Step 5.3: Write Your First Message

1. In the text input field, type a message (e.g., "Hello from Arkiv!")
2. Click the "Post" button
3. Wait for the submission to complete

**What's happening:**
- Your message is being sent to **your app's API route** (`/api/serverless-dapp101/messages`)
- The API route creates an **entity** on Arkiv with your message (an entity is the data structure stored on-chain)
- Creating an entity is also a **transaction** (the blockchain operation that records it)
- The transaction is signed with your private key
- The transaction is submitted to Arkiv (Mendoza testnet)
- Your message becomes queryable by anyone using the same `SPACE_ID`

**Note:** Entities and transactions are two aspects of the same operation:
- **Entity** = the data (your message, attributes like `type`, `wallet`, `spaceId`)
- **Transaction** = the blockchain operation that creates/records that entity
- When you call `createEntity()`, you get back both: `entityKey` (identifier for the data) and `txHash` (identifier for the transaction)

### Step 5.5: Wait for Confirmation

After clicking "Post", you may see:
- "Submitting..." while the transaction is being processed
- The message field clears when successful

**Important**: Due to indexer lag, your message may not appear immediately. This is normal!

### Step 5.6: Refresh to See Your Message

1. Click the "Refresh" button (or wait a few seconds)
2. Your message should appear in the list
3. You'll see:
   - Your message text
   - Your wallet address (shortened)
   - Timestamp
   - **Entity link** (view the entity/data on explorer)
   - **Transaction link** (view the transaction on explorer, once indexed)

### Step 5.7: Verify Entity and Transaction Details

Each message displays two clickable links:
- **Entity link**: Shows the entity details (the data structure with your message)
- **Transaction link**: Shows the transaction details (the blockchain operation that created the entity)

Click either link to explore on the blockchain explorer. You'll see:

**Entity View:**
- Entity key (unique identifier for your data)
- Payload (your message content)
- Attributes (metadata like wallet, spaceId, type)
- Creation timestamp

**Transaction View:**
- Transaction hash (unique identifier for the blockchain operation)
- Block number
- Gas used
- Your wallet address
- The transaction data

**Key Insight:** Creating an entity IS a transaction. The entity is the data, the transaction is how it gets recorded on-chain. Both are linked - you can view either perspective on the explorer!

## Checkpoint

Before moving to the next step, verify:

- [ ] I've navigated to the hello-world demo page
- [ ] I've submitted at least one message
- [ ] My message appears in the list (after refreshing)
- [ ] I can see both the Entity and Transaction links
- [ ] I understand the difference between entities (data) and transactions (blockchain operations)
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
