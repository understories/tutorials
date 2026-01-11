# Arkiv Hello World - Quick Start

This is the simplest possible Arkiv app - a message board where messages are stored on Arkiv instead of a database.

## What Makes This Special?

- ✅ **No database** - Messages are stored on Arkiv (decentralized)
- ✅ **Shared space** - Uses SPACE_ID="ns" so everyone can see all messages
- ✅ **On-chain** - Each message is a blockchain transaction
- ✅ **Verifiable** - You can check messages on the explorer (both entity and transaction views)

## Setup (2 minutes)

1. **Set environment variables:**
   ```bash
   SPACE_ID=ns
   ARKIV_PRIVATE_KEY=0x...  # Your wallet private key
   ```

2. **Start the server:**
   ```bash
   npm run dev
   ```

3. **Visit:**
   ```
   http://localhost:3000/hello-world
   ```

## How It Works

### Reading Messages
- Queries Arkiv for entities with `type='workshop_message'` and `spaceId='ns'`
- Displays them in a simple list

### Writing Messages
- Creates a new entity on Arkiv
- Each message is a transaction
- Returns a transaction hash

### Key Code

**Read (GET /api/serverless-dapp101/messages):**
```typescript
const result = await publicClient
  .buildQuery()
  .where(eq('type', 'workshop_message'))
  .where(eq('spaceId', SPACE_ID))
  .withAttributes(true)
  .withPayload(true)
  .limit(100)
  .fetch();
```

**Write (POST /api/serverless-dapp101/messages):**
```typescript
const result = await walletClient.createEntity({
  payload: new TextEncoder().encode(JSON.stringify({ text, createdAt })),
  attributes: [
    { key: 'type', value: 'workshop_message' },
    { key: 'wallet', value: walletAddress },
    { key: 'spaceId', value: SPACE_ID },
  ],
  contentType: 'application/json',
  expiresIn: 15768000, // 6 months
});
```

## Next Steps

1. **Customize it:**
   - Change the message format
   - Add more fields
   - Style it differently

2. **Deploy it:**
   - Deploy to Vercel (optional)
   - Share with others

3. **Explore:**
   - Check your transactions on the explorer
   - See other participants' messages

## Shared Space Behavior

This demo uses `SPACE_ID=ns` as a shared space. This means:

- All messages written with `spaceId='ns'` appear together
- Messages from different wallets are visible to everyone using the same space ID
- The deployed hello-world page shows messages from all tutorial participants who use `SPACE_ID=ns`

This works because Arkiv queries filter by `spaceId` attribute, not by wallet address. Any entity with `spaceId='ns'` will be returned by the query, regardless of which wallet created it.

## Files

- `app/hello-world/page.tsx` - Frontend UI
- `app/api/serverless-dapp101/messages/route.ts` - API routes

This is your "hello world" for decentralized apps! 🚀

