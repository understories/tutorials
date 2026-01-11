# Understanding Arkiv (Optional)

## Learning Objectives

By the end of this step, you'll:
- Understand key Arkiv concepts (entities, spaces, attributes)
- Know how queries work
- Understand the difference between reads and writes
- See how Arkiv differs from traditional databases

## Content

> 💡 **Visual Aid:** For a comprehensive visual explanation of these concepts, check out the 
> [Visual Lesson](/learn) page. It includes detailed diagrams and explanations that complement this step.

### What is Arkiv?

Arkiv is a decentralized database built on blockchain. It provides:
- **On-chain storage**: Data is stored on the blockchain
- **Query interface**: Read data using familiar query patterns
- **EVM compatibility**: Works with Ethereum wallets and tools
- **No vendor lock-in**: Your data is independent of any service

> 📄 **Source:** These concepts are explained in detail in the [Arkiv Litepaper](/ARKIV_Litepaper_blue.pdf). 
> The litepaper provides deeper context on Arkiv's architecture and philosophy.

### Key Concepts

#### Entities

An **entity** is a piece of data stored on Arkiv. Think of it like a row in a database table.

Each entity has:
- **Key**: Unique identifier (generated automatically)
- **Payload**: The actual data (can be JSON, text, binary, etc.)
- **Attributes**: Key-value pairs for querying (like indexed columns)
- **Content Type**: MIME type of the payload (e.g., `application/json`)

Example entity:
```typescript
{
  key: "0xabc123...",
  payload: JSON.stringify({ text: "Hello", createdAt: "2024-01-01" }),
  attributes: [
    { key: "type", value: "message" },
    { key: "spaceId", value: "ns" },
    { key: "wallet", value: "0x742d35..." }
  ],
  contentType: "application/json"
}
```

#### Spaces

A **space** is like a namespace or database. It isolates your data from other apps.

- Use `SPACE_ID` to organize data
- All entities in the same space can query each other
- Different spaces are isolated from each other
- In this workshop, we use `SPACE_ID=ns` (shared space)

#### Attributes

**Attributes** are key-value pairs that you can query on. Think of them like indexed columns.

Common attributes:
- `type`: What kind of entity this is (e.g., "message", "user", "post")
- `spaceId`: Which space this entity belongs to
- `wallet`: The wallet address that created it
- Custom attributes: Anything you want to query on

#### Queries

You query Arkiv using a builder pattern:

```typescript
const result = await publicClient
  .buildQuery()
  .where(eq('type', 'message'))
  .where(eq('spaceId', 'ns'))
  .withAttributes(true)
  .withPayload(true)
  .limit(100)
  .fetch();
```

This reads: "Find entities where type='message' AND spaceId='ns', return up to 100 results, include attributes and payload."

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

### How It Differs from Traditional Databases

| Traditional Database | Arkiv |
|---------------------|-------|
| Centralized server | Decentralized (blockchain) |
| Vendor lock-in | Independent data |
| Private by default | Public by default |
| Fast writes | Slower writes (blockchain) |
| Requires infrastructure | No infrastructure needed |
| Data can be lost | Data persists on-chain |

### Indexer Lag

**Indexer lag** is the delay between when a transaction is confirmed and when it appears in queries.

- Transactions are confirmed immediately (on-chain)
- But indexers need time to process and index them
- Usually 5-30 seconds on testnet
- This is why you might need to refresh to see new data

### Best Practices

1. **Use meaningful attributes**: Make queries efficient
2. **Store structured data in payload**: Use JSON for complex data
3. **Use unique space IDs in production**: Don't use "ns" for real apps
4. **Handle indexer lag**: Refresh or poll for new data
5. **Store txHash separately**: Create companion entities for reliable querying

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

> 🤖 **Learn More:** See the [AI Agent Kit section](/learn#building-with-arkiv) in the Visual Lesson, 
> or check out the [Next Steps](/11-next-steps) section for links to the kit.

## Vibe Path (AI-Assisted)

```prompt
I'm at step 8: Understanding Arkiv (Optional).

Help me understand:
1. What entities, spaces, and attributes are
2. How queries work in Arkiv
3. The difference between reads and writes
4. How Arkiv differs from traditional databases
5. Why indexer lag happens

Provide clear explanations with examples from the code we've been using.
```

## Manual Path

### Step 8.1: Review Your Code

Look at the API route you've been using (`app/api/serverless-dapp101/messages/route.ts`):

**Reading (GET):**
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

This queries for entities with:
- `type = 'workshop_message'`
- `spaceId = 'ns'` (or your SPACE_ID)

**Writing (POST):**
```typescript
const result = await walletClient.createEntity({
  payload: enc.encode(JSON.stringify({ text, createdAt })),
  attributes: [
    { key: 'type', value: 'workshop_message' },
    { key: 'wallet', value: walletAddress },
    { key: 'spaceId', value: SPACE_ID },
  ],
  contentType: 'application/json',
  expiresIn: 15768000, // 6 months
});
```

This creates an entity with:
- Payload: Your message data (encoded as JSON)
- Attributes: Metadata for querying
- Content type: Tells Arkiv how to interpret the payload

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

> 💡 **Visual Aid:** See the [Data Flow - Write](/learn#data-flow-write) diagram in the Visual Lesson 
> for a detailed visual explanation of this process.

### Step 8.4: Explore the Explorer

Go back to the explorer and look at a transaction:
- See the raw transaction data
- Understand how your payload is encoded
- See the attributes in the transaction logs
- Notice that everything is public and verifiable

> 💡 **Visual Aid:** The [Verification Flow](/learn#verification-flow) diagram in the Visual Lesson 
> shows how blockchain verification works step-by-step.

## Checkpoint

Before moving to the next step, verify:

- [ ] I understand what entities, spaces, and attributes are
- [ ] I know how to build queries
- [ ] I understand the difference between reads and writes
- [ ] I know why indexer lag happens
- [ ] I can see how Arkiv differs from traditional databases

## Troubleshooting

**Q: Can I update or delete entities?**
A: Arkiv is append-only. You can't update or delete entities, but you can create new ones that reference old ones (like marking a message as "deleted" with an attribute).

**Q: How do I make data private?**
A: Use a unique `SPACE_ID` that only you know. While technically public on-chain, it's only discoverable if someone knows your space ID. For truly private data, encrypt the payload before storing.

**Q: What's the cost of storing data?**
A: On testnet, it's free. On mainnet, you pay gas fees (similar to Ethereum). The cost depends on the size of your payload and current gas prices.

**Q: How much data can I store?**
A: There are practical limits based on gas costs. For large files, consider storing a hash on-chain and the actual file elsewhere (IPFS, Arweave, etc.).

**Q: Can I query across multiple spaces?**
A: No, queries are scoped to a single space. If you need data from multiple spaces, make separate queries and combine the results.

**Q: How do shared spaces work?**
A: When multiple users use the same `SPACE_ID`, all entities with that space ID are queryable by anyone. Queries filter by `spaceId` attribute, not by wallet address. This means messages from different wallets appear together if they share the same space ID. In this tutorial, we use `SPACE_ID=ns` as a shared space so all participants can see each other's messages on the deployed hello-world page.
