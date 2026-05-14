# Understanding Arkiv (Optional)

## Learning Objectives

By the end of this step, you'll:
- Understand key Arkiv concepts (entities, spaces, attributes)
- Know how queries work
- Understand the difference between reads and writes
- See how Arkiv differs from traditional databases

## Content

### What is Arkiv?

Arkiv is a decentralized database built on blockchain. It provides:
- **On-chain storage**: Data is stored on the blockchain
- **Query interface**: Read data using familiar query patterns
- **EVM compatibility**: Works with Ethereum wallets and tools
- **No vendor lock-in**: Your data is independent of any service

> 📄 **Source:** These concepts are explained in detail in the [Arkiv Litepaper](/ARKIV_Litepaper_blue.pdf). 
> The litepaper provides deeper context on Arkiv's architecture and philosophy.

![Architecture Comparison](/visuals/architecture-comparison.svg)

This comparison shows how serverless dapps with Arkiv differ from traditional apps. The most fundamental difference is where and who owns the data. With Arkiv, data lives on-chain, owned by users.

### Key Concepts

#### Entities

An **entity** is a piece of data stored on Arkiv. Think of it like a row in a database table.

Each entity has:
- **Key**: Unique identifier (generated automatically)
- **Payload**: The actual data (can be JSON, text, binary, etc.)
- **Attributes**: Key-value pairs for querying (like indexed columns)
- **Content Type**: MIME type of the payload (e.g., `application/json`)

![Entity Structure](/visuals/entity-structure.svg)

This diagram shows the structure of an Arkiv entity: unique ID, queryable attributes, content payload, and transaction hash for verification. Use attributes for anything you want to query on (they're indexed and fast), and store complex data in the payload as JSON.

Example entity (as returned by `buildQuery`):

```typescript
{
  key: "0xabc123...",                   // unique entity key
  owner: "0x742d35...",                 // current $owner (mutable, can be transferred)
  creator: "0x742d35...",               // original $creator (immutable, set at creation)
  createdAtBlock: 12345n,               // bigint
  expiresAtBlock: 12345n + 86400n,
  contentType: "application/json",
  payload: Uint8Array,                  // raw bytes; use e.toJson() to decode JSON
  attributes: [
    { key: "project",     value: "serverless-dapp101" },
    { key: "type",        value: "workshop_message" },
    { key: "createdAtMs", value: 1715652800000 },   // numeric, enables range queries
  ],
}
```

Call `entity.toJson()` to decode the payload when `contentType` is `application/json`.

#### PROJECT_ATTRIBUTE: the canonical multi-tenant pattern

Braga is a **shared, public testnet**: every Arkiv app reads and writes against the same global store. The single most important pattern is to define a unique `PROJECT_ATTRIBUTE` and stamp it on every entity and every query. Look at `lib/config.ts`:

```typescript
export const PROJECT_ATTRIBUTE = {
  key: 'project',
  value: 'serverless-dapp101',
} as const;
```

Every Arkiv project you build will start this way. Pick a value globally unique to your project. Without it, your queries return everyone else's data.

#### Attributes

**Attributes** are key-value pairs you can filter on. They come in two flavors:

- **String attributes** support equality (`eq`, `neq`) and glob matching (`~`, `!~`). Use for tags, statuses, names, identifiers.
- **Numeric attributes** support equality plus range (`gt`, `gte`, `lt`, `lte`). Use for any value you want to sort or filter by range: timestamps, scores, counts, priorities.

If you store `priority` as the string `"5"`, you lose range queries forever. Always store numerics as numbers.

#### Two synthetic attributes you always get for free

Every Arkiv entity has two metadata attributes set by the protocol itself, not by you:

- **`$owner`** — the wallet that currently controls the entity. It is **mutable**: the owner can transfer ownership with `changeOwnership`. Only the current `$owner` can `updateEntity`, `deleteEntity`, or `extendEntity`.
- **`$creator`** — the wallet that originally created the entity. It is **immutable**: set at creation, never changes, cannot be spoofed. Useful when you need tamper-proof attribution.

You can filter on either with `.ownedBy(addr)` or `.createdBy(addr)`:

```typescript
publicClient.buildQuery()
  .where(eq('project', 'serverless-dapp101'))
  .ownedBy('0xabc...')   // entities currently owned by this wallet
  .fetch();

publicClient.buildQuery()
  .where(eq('project', 'serverless-dapp101'))
  .createdBy('0xabc...') // entities originally created by this wallet
  .fetch();
```

#### Queries

You query Arkiv using a builder pattern. Two ways to AND predicates:

```typescript
// Implicit AND (pass an array)
const result = await publicClient
  .buildQuery()
  .where([eq('project', 'serverless-dapp101'), eq('type', 'workshop_message')])
  .withAttributes(true)
  .withPayload(true)
  .withMetadata(true)
  .limit(100)
  .fetch();

// Explicit AND
.where(and([eq('project', 'serverless-dapp101'), eq('type', 'workshop_message')]))
```

The `@arkiv-network/sdk/query` module exports nine predicates:

| Operator | Use |
| --- | --- |
| `eq`, `neq` | String or number equality |
| `gt`, `gte`, `lt`, `lte` | Numeric range (string attributes only support equality) |
| `and`, `or` | Compose predicates |
| `not` | Negate a predicate |

Plus `asc(field)` and `desc(field)` for ordering. Range query example, find messages from the last 24 hours by `createdAtMs`:

```typescript
import { eq, gte, desc } from '@arkiv-network/sdk/query';

const recent = await publicClient.buildQuery()
  .where([
    eq('project', 'serverless-dapp101'),
    gte('createdAtMs', Date.now() - 24 * 60 * 60 * 1000),
  ])
  .orderBy(desc('createdAtMs'))
  .withPayload(true)
  .limit(50)
  .fetch();
```

For `gte` to work, `createdAtMs` must be stored as a **number**, not a string.

![Data Flow - Read](/visuals/data-flow-read.svg)

This diagram shows how queries work: your app makes a query request, which goes to Arkiv indexers. Indexers filter entities by your criteria and return matching results. Reads are public (anyone can query), free (no gas fees), and fast (served by indexers).

### Reads vs Writes

#### Reads (Public Client)

- **No authentication needed**: Anyone can read public data
- **Free**: Reading doesn't cost gas
- **Fast**: Queries are served by indexers
- **Use case**: Displaying data, searching, filtering

```typescript
const publicClient = getPublicClient();
const result = await publicClient.buildQuery()...fetch();
```

#### Writes (Wallet Client)

- **Authentication required**: Must sign with a private key
- **Costs gas**: Each write is a blockchain transaction
- **Slower**: Must wait for blockchain confirmation
- **Use case**: Creating, updating, deleting data

```typescript
const walletClient = getWalletClientFromPrivateKey(privateKey);
const result = await walletClient.createEntity({...});
```

#### Mutations: more than just create

The wallet client exposes a full set of write operations. You are not limited to `createEntity`:

```typescript
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';

// Create returns both the entity key and the transaction hash
const { entityKey, txHash } = await walletClient.createEntity({
  payload: jsonToPayload({ text: 'Hello' }),
  contentType: 'application/json',
  attributes: [PROJECT_ATTRIBUTE, { key: 'type', value: 'workshop_message' }],
  expiresIn: ExpirationTime.fromDays(180),
});

// Full replace of payload and attributes (any attribute you omit is dropped)
await walletClient.updateEntity({
  entityKey,
  payload: jsonToPayload({ text: 'edited' }),
  contentType: 'application/json',
  attributes: [PROJECT_ATTRIBUTE, { key: 'type', value: 'workshop_message' }],
  expiresIn: ExpirationTime.fromDays(180),
});

// Delete removes the entity entirely
await walletClient.deleteEntity({ entityKey });

// Extend pushes back the expiration
await walletClient.extendEntity({ entityKey, expiresIn: ExpirationTime.fromDays(365) });

// Batch creates in one transaction
await walletClient.mutateEntities({ creates: [/* ... */] });
```

Two rules to remember:

1. **Only the current `$owner` can `updateEntity`, `deleteEntity`, `extendEntity`, or `changeOwnership`.** `$creator` is for attribution only; it gives no write rights.
2. **`updateEntity` is a full replace.** It is not a patch. Any attribute you do not include is dropped. Read the current entity first if you only want to change one field.

### How It Differs from Traditional Databases

| Traditional Database | Arkiv |
|---------------------|-------|
| Centralized server | Decentralized (blockchain) |
| Vendor lock-in | Independent data |
| Private by default | Public by default |
| Fast writes | Slower writes (blockchain) |
| Requires infrastructure | No infrastructure needed |
| Data can be lost | Data persists on-chain |

This comparison highlights the fundamental differences between traditional databases and Arkiv. The key tradeoff is speed for independence: Arkiv writes are slower (blockchain confirmation), but your data is truly independent and verifiable.

### Indexer Lag

**Indexer lag** is the delay between when a transaction is confirmed and when it appears in queries.

- Transactions are confirmed immediately (on-chain)
- But indexers need time to process and index them
- Usually 5-30 seconds on testnet
- This is why you might need to refresh to see new data

### Best Practices

1. **Stamp `PROJECT_ATTRIBUTE` on every entity and every query.** Always. This is the canonical multi-tenant pattern on a shared testnet.
2. **Pick the right attribute type.** Numerics for any value you will range-query (timestamps, counts, scores); strings for tags and identifiers.
3. **Use `$creator` for tamper-proof attribution.** When you need to prove a write came from a specific wallet, filter with `.createdBy(addr)` instead of trusting a custom attribute.
4. **Differentiate `expiresIn` per entity type.** Use `ExpirationTime.fromDays/fromHours/fromMinutes`. Ephemeral types live shorter; durable types live longer.
5. **Catch named SDK error classes.** `EntityMutationError`, `NoMoreResultsError`, `NoCursorOrLimitError`, `NoEntityFoundError`. String-matching error messages breaks on every SDK upgrade.
6. **Handle indexer lag.** Confirmations are immediate; query visibility takes 5 to 30 seconds. Refresh or subscribe with `subscribeEntityEvents`.

### Building with AI Assistants: Arkiv AI Agent Kit

If you're using AI coding assistants (Cursor, Copilot, Claude, etc.) to build Arkiv apps, 
check out the **Arkiv AI Agent Kit**. It provides:

- **Drop-in LLM context** for building Arkiv integrations correctly from day one
- **Patterns and prompts** that prevent common mistakes
- **Best practices** enforced automatically (wallet normalization, query shapes, timeout handling)
- **Engineering guidelines** and checklists

The kit helps AI assistants understand Arkiv's unique characteristics:
- Indexer lag is normal (not an error)
- Immutable history design patterns
- Query shape standardization (type + spaceId + limit)
- Wallet normalization everywhere

![Concept Bridges](/visuals/concept-bridges.svg)

If you've taken the **Vibes to App** workshop, this visual shows how those concepts extend into the decentralized world. The progression from app ideas to traditional apps to serverless dapps demonstrates how Arkiv builds on familiar development patterns.

> 🤖 **Learn More:** See the [AI Agent Kit section](/learn#building-with-arkiv) in the Visual Lesson, 
> or check out the [Next Steps](/11-next-steps) section for links to the kit.

## AI-Assisted Path

```prompt
I'm at step 8: Understanding Arkiv (Optional).

Help me understand:
1. What entities, spaces, and attributes are
2. How queries work in Arkiv
3. The difference between reads and writes
4. How Arkiv differs from traditional databases
5. Why indexer lag happens

Provide clear explanations with examples from the code we've been using.

Update the internal implementation plan with notes and show me the plan so I can track your progress.
```

## Manual Path

### Step 8.1: Review Your Code

Look at **your app's API route** (`app/api/serverless-dapp101/messages/route.ts`):

**Note:** This is your own API route in your forked app. When your frontend calls `/api/serverless-dapp101/messages`, it's making a relative request to this route handler in your own Next.js app. The path name (`serverless-dapp101`) is just a naming convention - it doesn't connect to any external service. Your app is completely standalone and communicates with other apps only through Arkiv.

**Reading (GET):**

```typescript
const result = await publicClient
  .buildQuery()
  .where([eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value), eq('type', 'workshop_message')])
  .withAttributes(true)
  .withPayload(true)
  .withMetadata(true)
  .limit(100)
  .fetch();
```

This queries for entities with:
- `project = 'serverless-dapp101'` (PROJECT_ATTRIBUTE, isolates this app from other Braga users)
- `type = 'workshop_message'`

**Writing (POST):**

```typescript
const { entityKey, txHash } = await walletClient.createEntity({
  payload: jsonToPayload({ text: text.trim(), createdAt: new Date().toISOString() }),
  contentType: 'application/json',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'workshop_message' },
    { key: 'createdAtMs', value: Date.now() },     // numeric, indexable for range queries
  ],
  expiresIn: ExpirationTime.fromDays(180),
});
```

This creates an entity with:
- **Payload:** encoded by `jsonToPayload` (the SDK helper, no manual `TextEncoder`)
- **Attributes:** `PROJECT_ATTRIBUTE`, a `type` discriminator, and a numeric timestamp for range queries
- **`expiresIn`:** uses the `ExpirationTime` helper instead of raw seconds
- **`createEntity` returns both `entityKey` and `txHash`**, so you can deep-link to either explorer view

### Step 8.2: Experiment with Queries

Try modifying the query in your code to:
- Filter by wallet address
- Sort by creation time
- Limit to fewer results
- Add more attributes

### Step 8.3: Understand the Transaction Flow

When you submit a message:

1. **Client** → Sends POST request to your API
2. **API** → Creates entity with wallet client
3. **Wallet Client** → Signs transaction with private key
4. **Blockchain** → Confirms transaction
5. **Indexer** → Processes and indexes the transaction (this takes time!)
6. **Query** → Returns the new entity

![Data Flow - Write](/visuals/data-flow-write.svg)

This diagram shows the complete write flow from user action through to blockchain confirmation. Notice that indexer lag is normal. Your transaction is confirmed on-chain immediately, but it takes a few seconds for indexers to process it.

### Step 8.4: Explore the Explorer - Entities vs Transactions

Go back to the hello-world page and click both the **Entity** and **Transaction** links for a message:

**Entity View:**
- See your entity data structure (payload, attributes)
- Understand how entities are organized
- See the entity key (unique identifier for your data)
- Notice how attributes are indexed for querying

**Transaction View:**
- See the raw transaction data
- Understand how your payload is encoded in the transaction
- See the attributes in the transaction logs
- Notice the transaction hash (unique identifier for the blockchain operation)

**Key Insight:** Creating an entity IS a transaction. The entity is the data structure, the transaction is the blockchain operation that creates it. Both are linked - you can view your data from either perspective on the explorer!

![Verification Flow](/visuals/verification-flow.svg)

This step-by-step flow shows how to use a transaction hash to verify data on the blockchain. Every write operation returns both an entity key and a transaction hash, which you can use to look up and verify your data on the Arkiv explorer.

## Checkpoint

Before moving to the next step, verify:

- [ ] I understand what entities and attributes are, and the role of `PROJECT_ATTRIBUTE`
- [ ] I understand the difference between `$owner` (mutable) and `$creator` (immutable)
- [ ] I can name the string operators (`eq`, `neq`, glob) and numeric operators (`gt`, `gte`, `lt`, `lte`)
- [ ] I know the four mutation operations: `createEntity`, `updateEntity`, `deleteEntity`, `extendEntity` (plus `mutateEntities` for batch)
- [ ] I understand the relationship between entities (data) and transactions (blockchain operations)
- [ ] I know why indexer lag happens
- [ ] I have explored both entity and transaction views on the Braga explorer

## Troubleshooting

**Q: Can I update or delete entities?**
A: Yes. The wallet client exposes `createEntity`, `updateEntity` (full replace of payload and attributes), `deleteEntity`, `extendEntity` (push back expiration), `changeOwnership`, and `mutateEntities` (batch creates). Only the current `$owner` can update, delete, extend, or transfer. A common pattern is still to model history as separate entities (audit trail, immutable ledger), but it is no longer a hard constraint.

**Q: How do I make data private?**
A: Arkiv is public by default. Two options for confidentiality: (1) encrypt the payload bytes client-side before calling `createEntity`, so only key-holders can decrypt; (2) combine encryption with `expiresIn` for auto-revoking access. There is no public/private toggle at the protocol level; the encryption layer is yours to design.

**Q: What does storing data cost?**
A: On Braga testnet you pay gas in test GLM, which you get free from the faucet, so for learning purposes it is effectively free. There is no Arkiv mainnet yet, so workshop content stays on Braga. Gas scales with payload size and current network conditions.

**Q: How much data can I store?**
A: There are practical limits based on gas costs. For large files, store a hash on Arkiv and the file on IPFS or similar.

**Q: How do I keep my queries from picking up other Arkiv apps' data?**
A: Use the `PROJECT_ATTRIBUTE` pattern. Define a unique constant in `lib/config.ts` and stamp it on every entity and every query. Without it, your queries return everyone else's data on Braga.

**Q: What is the difference between `$owner` and `$creator`?**
A: `$owner` is the wallet that currently controls the entity (mutable, can be transferred, controls writes). `$creator` is the wallet that originally created the entity (immutable, never changes, useful for tamper-proof attribution). Filter on either with `.ownedBy(addr)` or `.createdBy(addr)`.
