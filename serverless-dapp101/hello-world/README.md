# Arkiv Hello World

A minimal hello-world app demonstrating Arkiv basics on the Braga testnet.

## What It Does

- **Reads messages** from Arkiv (decentralized database)
- **Writes messages** to Arkiv
- **No central database** - all data is on-chain
- **Project-namespaced** - every entity is stamped with `PROJECT_ATTRIBUTE` so this app's queries are isolated from other Arkiv apps on shared Braga

## How to Run

1. **Set environment variables:**

   ```bash
   ARKIV_PRIVATE_KEY=0x...    # your wallet private key, funded on Braga
   # SPACE_ID=ns              # optional secondary grouping inside the project namespace
   ```

2. **Start the dev server:**

   ```bash
   npm run dev
   ```

3. **Visit:** `http://localhost:3000/hello-world`

## What You'll See

- A simple message board
- Post messages that get stored on Arkiv (Braga testnet)
- See messages from anyone else running this app with the same `PROJECT_ATTRIBUTE`
- Each message is a blockchain transaction; click Entity or Transaction to verify on the explorer

## Key Concepts Demonstrated

1. **Decentralized storage** - data lives on Arkiv, not in a database
2. **Project namespacing** - `PROJECT_ATTRIBUTE = { key: 'project', value: 'serverless-dapp101' }` stamped on every write and filtered on every read
3. **Read/write operations** - `buildQuery` for reads, `createEntity` for writes, both via `@arkiv-network/sdk`
4. **Indexer lag** - new entities take 5 to 30 seconds to become queryable (normal)

## Next Steps

After running this, you can:

- Add a second entity type (reactions, comments, tags) linked via a shared FK attribute
- Differentiate `expiresIn` per entity type with `ExpirationTime.fromDays/fromHours`
- Replace the Refresh button with `subscribeEntityEvents` for real-time updates
- Move to a browser-wallet (EIP-1193) signing path
- Deploy to Vercel and share with others

## Files

- `lib/config.ts` - defines `PROJECT_ATTRIBUTE` and reads the private key from env
- `lib/arkiv/client.ts` - public and wallet client factories (Braga chain)
- `app/api/serverless-dapp101/messages/route.ts` - GET/POST handlers
- `app/hello-world/page.tsx` - frontend UI with last-write banner

## Environment Variables

- `ARKIV_PRIVATE_KEY` - your wallet private key, funded on Braga via the faucet
- `SPACE_ID` *(optional)* - secondary grouping inside the project namespace, defaults to `'ns'`

## Project Namespacing and Message Visibility

This demo uses `PROJECT_ATTRIBUTE = { key: 'project', value: 'serverless-dapp101' }` (see `lib/config.ts`). Every entity is stamped with it on creation and every query filters on it. This works because Arkiv queries return only entities whose attributes match the predicates you pass.

### How Messages Appear Across Deployments

When users go through the tutorial and create messages locally:

1. **Local development.** Users post messages from their fork. Each entity is created with `project = 'serverless-dapp101'` plus other attributes.
2. **Deployed application.** The deployed hello-world page queries for every entity with `project = 'serverless-dapp101'`. Since both environments use the same project value, all messages appear together.
3. **Cross-wallet visibility.** Messages from different wallets appear in the same list because the query filters by project attribute, not by wallet address.

### Configuration Requirements

For messages to appear on the deployed hello-world page:

- **Tutorial users** keep the default `PROJECT_ATTRIBUTE` value in `lib/config.ts` unchanged (which is the case if they fork without editing).
- **Deployed application** uses the same `PROJECT_ATTRIBUTE` value (which lives in source, so Vercel does not need an env var for it).

The API route reads the project namespace directly from `lib/config.ts`:

```typescript
import { PROJECT_ATTRIBUTE } from '../../../../lib/config';

const result = await publicClient
  .buildQuery()
  .where([eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value), eq('type', 'workshop_message')])
  .withPayload(true)
  .limit(100)
  .fetch();
```

### Verification

To verify your messages will appear on the deployed page:

1. Confirm your fork's `lib/config.ts` still has `value: 'serverless-dapp101'`
2. Post a message locally and wait 5 to 30 seconds for indexer lag
3. Visit the deployed hello-world page
4. Your message should appear alongside messages from other tutorial participants

If messages do not appear, check that you have not changed `PROJECT_ATTRIBUTE.value`, that your wallet is funded on Braga, and that you allowed enough time for indexer lag.
