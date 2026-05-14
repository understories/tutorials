# Arkiv Hello World - Quick Start

This is the simplest possible Arkiv app, a message board where messages are stored on Arkiv (Braga testnet) instead of a database.

## What Makes This Special?

- ✅ **No database** - messages are stored on Arkiv (decentralized)
- ✅ **Project-namespaced** - every entity is stamped with `PROJECT_ATTRIBUTE` so this app reads only its own data on the shared Braga testnet
- ✅ **On-chain** - each message is a blockchain transaction
- ✅ **Verifiable** - inspect any message on the Braga explorer (both entity and transaction views)

## Setup (2 minutes)

1. **Set environment variables:**

   ```bash
   ARKIV_PRIVATE_KEY=0x...   # your wallet private key, funded on Braga via the faucet
   # SPACE_ID=ns             # optional secondary grouping inside the project namespace
   ```

2. **Start the server:**

   ```bash
   npm run dev
   ```

3. **Visit:** `http://localhost:3000/hello-world`

## How It Works

### Project namespacing

Every Arkiv app on Braga shares the same global store, so every project defines a unique `PROJECT_ATTRIBUTE` and stamps it on every write and every read. From `lib/config.ts`:

```typescript
export const PROJECT_ATTRIBUTE = {
  key: 'project',
  value: 'serverless-dapp101',
} as const;
```

### Reading messages

Filters by the project attribute and the `workshop_message` type:

```typescript
import { eq } from '@arkiv-network/sdk/query';

const result = await publicClient
  .buildQuery()
  .where([eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value), eq('type', 'workshop_message')])
  .withPayload(true)
  .withAttributes(true)
  .withMetadata(true)
  .limit(100)
  .fetch();
```

Each `result.entities[i]` has `.key`, `.owner` (current `$owner`), `.creator` (immutable `$creator`), `.createdAtBlock` (bigint), and `.toJson()` to decode the payload.

### Writing messages

Uses `jsonToPayload` and `ExpirationTime` helpers, stamps the project attribute, and returns both `entityKey` and `txHash`:

```typescript
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';

const { entityKey, txHash } = await walletClient.createEntity({
  payload: jsonToPayload({ text: text.trim(), createdAt: new Date().toISOString() }),
  contentType: 'application/json',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'workshop_message' },
    { key: 'createdAtMs', value: Date.now() },   // numeric, enables range queries
  ],
  expiresIn: ExpirationTime.fromDays(180),
});
```

## Next Steps

1. **Customize it:**
   - Add a second entity type (reactions, comments, tags) linked via a shared FK attribute
   - Differentiate `expiresIn` per type (reactions 30 days, messages 180 days)
   - Add range queries using the numeric `createdAtMs`

2. **Deploy it:** push to Vercel, share with others, then watch messages appear from anyone running the same workshop

3. **Explore:** click the Entity and Transaction links after posting to see both views on the Braga explorer

## Project Namespace Behaviour

Every Arkiv entity in this app carries `project = 'serverless-dapp101'`. Two consequences:

- **Cross-wallet visibility within the project.** Messages from different wallets appear in the same list because the query filters by project attribute, not by wallet address.
- **Isolation from other Arkiv apps.** Other apps on Braga share the same global store, but they use different project values, so they do not appear in this app's queries and vice versa.

If you fork this template for your own project, change the `value` in `lib/config.ts` to something globally unique (your project name plus a short random suffix is fine).

## Files

- `lib/config.ts` - defines `PROJECT_ATTRIBUTE` and reads the private key from env
- `lib/arkiv/client.ts` - public and wallet client factories (Braga chain)
- `app/api/serverless-dapp101/messages/route.ts` - GET/POST handlers
- `app/hello-world/page.tsx` - frontend UI with last-write banner

This is your hello world for decentralized apps. 🚀
