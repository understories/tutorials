# Arkiv Hello World

A minimal "hello world" app demonstrating Arkiv basics.

## What It Does

- **Reads messages** from Arkiv (decentralized database)
- **Writes messages** to Arkiv
- **No central database** - all data is on-chain
- **Shared space** - uses SPACE_ID="ns" so all participants can see each other's messages

## How to Run

1. **Set environment variables:**
   ```bash
   SPACE_ID=ns
   ARKIV_TARGET=mendoza
   ARKIV_PRIVATE_KEY=0x...  # Your wallet private key
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Visit:**
   ```
   http://localhost:3000/hello-world
   ```

## What You'll See

- A simple message board
- Post messages that get stored on Arkiv
- See messages from other participants (same SPACE_ID)
- Each message is a blockchain transaction

## Key Concepts Demonstrated

1. **Decentralized Storage** - Data lives on Arkiv, not in a database
2. **Shared Space** - All participants use SPACE_ID="ns"
3. **Read/Write Operations** - Basic CRUD on Arkiv
4. **Indexer Lag** - Messages may take a moment to appear (normal!)

## Next Steps

After running this, you can:
- Customize the message format
- Add more fields
- Deploy to Vercel (optional)
- Explore the explorer to see your transactions

## Files

- `page.tsx` - Frontend UI
- `app/api/serverless-dapp101/messages/route.ts` - API routes for read/write

## Environment Variables

- `SPACE_ID` - Set to "ns" for workshop
- `ARKIV_TARGET` - "mendoza" for testnet
- `ARKIV_PRIVATE_KEY` - Your wallet private key (generate one for the workshop)


## Shared Space and Message Visibility

This hello-world demo uses a shared space (`SPACE_ID=ns`) so all participants can see each other's messages. This works because Arkiv queries return all entities matching a space ID, regardless of which wallet created them.

### How Messages Appear Across Deployments

When users go through the tutorial and create messages locally:

1. **Local Development**: Users set `SPACE_ID=ns` in their `.env` file. When they post messages, each entity is created with the `spaceId='ns'` attribute.

2. **Deployed Application**: The deployed hello-world page queries for all entities with `spaceId='ns'`. Since Arkiv queries are space-scoped, all messages written with the same space ID will appear together.

3. **Cross-Wallet Visibility**: Messages from different wallets appear in the same list because they share the same `spaceId` attribute. The query filters by space ID, not by wallet address.

### Configuration Requirements

For messages to appear on the deployed hello-world page:

- **Tutorial users** must set `SPACE_ID=ns` in their local `.env` file (as instructed in step 3)
- **Deployed application** must have `SPACE_ID=ns` configured in Vercel environment variables (or use the default value of `'ns'`)

The API route uses this logic to determine the space ID:

```typescript
const querySpaceId = process.env.BETA_SPACE_ID || SPACE_ID;
```

Where `SPACE_ID` defaults to `'ns'` if not set in the environment.

### Verification

To verify your messages will appear on the deployed page:

1. Check that your local `.env` has `SPACE_ID=ns`
2. Post a message locally and wait for indexer lag (a few seconds)
3. Visit the deployed hello-world page
4. Your message should appear alongside messages from other tutorial participants

If messages don't appear, verify that both environments are using the same `SPACE_ID` value.
