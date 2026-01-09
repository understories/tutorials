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

