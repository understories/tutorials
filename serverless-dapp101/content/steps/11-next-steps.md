# Next Steps & Resources

## Learning Objectives

By the end of this step, you'll:
- Know where to find more resources
- Have ideas for what to build next
- Understand the Arkiv ecosystem
- Know how to get help

## Content

### Congratulations! 🎉

You've completed the tutorial! You now know how to:
- ✅ Set up an Arkiv app
- ✅ Read and write data to Arkiv
- ✅ Verify transactions on the explorer
- ✅ Deploy a decentralized app
- ✅ Understand key Arkiv concepts

### What You've Built

You've created a fully functional decentralized app that:
- Stores data on-chain (not in a database)
- Works independently of any server
- Can be verified on the blockchain explorer
- Demonstrates true decentralization

### What's Next?

Here are some ideas for what to build next:

#### Beginner Projects

1. **Personal Blog on Arkiv**
   - Store blog posts as entities
   - Add tags and categories
   - Query by date, author, topic

2. **Decentralized Todo App**
   - Each todo is an entity
   - Mark todos as complete (new entity with status)
   - Filter by status, date, priority

3. **Public Guestbook**
   - Visitors can leave messages
   - Add moderation (approve/reject entities)
   - Display recent messages

#### Intermediate Projects

4. **Decentralized Social Feed**
   - Posts, comments, likes (all as entities)
   - User profiles stored on Arkiv
   - Timeline queries

5. **On-Chain Voting App**
   - Create polls as entities
   - Votes as separate entities
   - Real-time results via queries

6. **Decentralized Marketplace**
   - Listings as entities
   - Orders as entities
   - Payment integration (separate from Arkiv)

#### Advanced Projects

7. **Multi-Space App**
   - Different spaces for different users/teams
   - Cross-space queries
   - Space management UI

8. **Encrypted Private Data**
   - Encrypt payloads before storing
   - Share decryption keys securely
   - Private spaces with access control

9. **Arkiv + IPFS Integration**
   - Store large files on IPFS
   - Store IPFS hashes on Arkiv
   - Hybrid storage solution

## Production Patterns to Explore Next

You now have one app working end to end. Below are the patterns to learn next, any one of which turns a workshop project into something that could ship. The optional **[step 12](/12-production-patterns)** in this tutorial walks through five of them with working code snippets you can copy.

- **Bring your own wallet.** Replace server-side signing with wagmi or RainbowKit and EIP-1193. Users pay their own gas, the wallet on the entity is theirs, you do not manage a hot wallet on your server.
- **Real-time updates.** Replace the Refresh button with `subscribeEntityEvents`. Six event types: created, updated, deleted, expired, expires-in-extended, owner-changed.
- **Encrypt sensitive payloads.** Arkiv stores bytes. If you encrypt them client-side, only key-holders can read them. Combine with `expiresIn` and you get auto-revoking access.
- **Lifecycle tiers.** When you ingest a lot of data over time (sensor readings, telemetry, prices), the idiomatic pattern is raw entities with short `expiresIn`, aggregated entities with longer `expiresIn`. Use `mutateEntities` to batch creates.
- **Memory layer for an LLM.** Store each agent thought or document as an entity, tag with the agent's wallet via `$creator`, retrieve by tag or time window. Memory survives the model, the chat session, and the tool that wrote it.

Then go build something with at least two entity types, parent and child relationships, differentiated expiration, and one of the patterns above. That is the shape of every real Arkiv app.

## Resources

### Visual Learning

- **[Visual Lesson](/learn)**: comprehensive visual guide with diagrams and explanations

### Official documentation

- [Arkiv Docs](https://docs.arkiv.network/): Starlight site, kept in sync with the SDK
- [Networks / Braga](https://docs.arkiv.network/networks/braga/): chain id, RPC, faucet
- [TS SDK / Querying Data](https://docs.arkiv.network/typescript-sdk/querying-data/)
- [TS SDK / Mutating Data](https://docs.arkiv.network/typescript-sdk/mutating-data/)
- [TS SDK / Live Events](https://docs.arkiv.network/typescript-sdk/live-events/)
- [TS SDK / React integration](https://docs.arkiv.network/typescript-sdk/react-integration/)
- [TS SDK / Best Practices](https://docs.arkiv.network/typescript-sdk/best-practices/): the 15-item checklist this tutorial is built around
- [Braga Explorer](https://explorer.braga.hoodi.arkiv.network): verify on-chain
- [Braga Faucet](https://braga.hoodi.arkiv.network/faucet/): free test GLM
- [Arkiv Litepaper](https://arkiv.network/pdf/ARKIV_Litepaper.pdf): architecture and philosophy

### Code references

- [`@arkiv-network/sdk` on npm](https://www.npmjs.com/package/@arkiv-network/sdk): the TypeScript client library
- [`Arkiv-Network/arkiv-sdk-js`](https://github.com/Arkiv-Network/arkiv-sdk-js): SDK source and `sample/` directory with canonical patterns (current Braga build)
- [`Arkiv-Network/dashboard-demo`](https://github.com/Arkiv-Network/dashboard-demo): Bun/Hono streaming-ingestion pattern
- [`Arkiv-Network/builders-challenge-online-forum-example`](https://github.com/Arkiv-Network/builders-challenge-online-forum-example): full Next.js + RainbowKit + wagmi reference. Pre-Braga, still imports the deprecated `kaolin` chain. Use it for the wagmi + EIP-1193 patterns, but swap the chain import to `braga` and bump the SDK to `^0.6.8` locally before running

### Official Learn tutorials

- [MetaMask Sketch App](https://docs.arkiv.network/learn/metamask-sketch-app/): p5.js drawing app, EIP-1193 wallet path
- [Fullstack Dashboard](https://docs.arkiv.network/learn/fullstack-dashboard/): Node.js backend writing prices into Arkiv every 60s

### Give your AI assistant Arkiv context

Install Arkiv's official agent skill once and your AI assistant (Claude Code, Cursor, Copilot, Cline, Windsurf) stops inventing SDK calls:

```bash
npx skills add https://github.com/arkiv-network/skills --skill arkiv-best-practices
```

Pair it with the feedback skill so you can file issues directly from your AI agent when something does not match the docs:

```bash
npx skills add https://github.com/arkiv-network/skills --skill arkiv-feedback
```

Then invoke `/arkiv-feedback` in your agent.

### Community

- [Arkiv Discord](https://discord.gg/arkiv): help, discussions, and project showcases
- [@arkiv_network on X](https://twitter.com/arkiv_network): release announcements
- [Arkiv-Network/reported-issues](https://github.com/Arkiv-Network/reported-issues): public issue intake

## Key Concepts to Remember

### Data Independence

Your data lives on-chain, independent of your hosting provider, your server infrastructure, and any single service.

### Public by Default

Arkiv data is public on-chain by default. For confidentiality, encrypt payload bytes client-side before calling `createEntity` and combine with `expiresIn` for auto-revoking access. There is no public/private toggle at the protocol level.

### Query and Mutation Patterns

- Use the right attribute type: numeric for range queries, string for tags and equality
- Stamp `PROJECT_ATTRIBUTE` on every entity and every query
- Use shared attribute keys as foreign keys to link parent and child entity types
- `createEntity`, `updateEntity` (full replace), `deleteEntity`, `extendEntity`, `mutateEntities` (batch)
- `$owner` controls writes (mutable); `$creator` proves attribution (immutable)

### Production Checklist (short version)

1. Pin the SDK exactly in production
2. Stamp `PROJECT_ATTRIBUTE` on every entity and every query
3. Right-size `expiresIn` per entity type with `ExpirationTime.fromDays/fromHours`
4. Catch named SDK error classes (`EntityMutationError`, `NoMoreResultsError`)
5. Subscribe with `subscribeEntityEvents` instead of polling
6. Validate input at the API edge
7. Rotate environment variables when Arkiv announces a new testnet

## Getting Help

### Common Issues

- **Transaction timeouts.** Normal on testnet. Wait a few seconds and retry.
- **Indexer lag.** New entities take 5 to 30 seconds to become queryable. This is expected.
- **Query returns empty.** Check that you are filtering on `PROJECT_ATTRIBUTE` and that the value matches what you write.
- **Build errors.** Run `npm run typecheck`. The SDK ships typed; if your call does not match the signature, the typechecker will tell you why.

### Where to Ask

1. **Discord**: best for quick questions
2. **`arkiv-feedback` skill**: best for reporting something broken
3. **Documentation**: check the official docs first
4. **Community**: other developers may have solved similar problems

## Final Checkpoint

Before you go, make sure you:

- [ ] Understand how Arkiv works
- [ ] Know how to read and write data
- [ ] Can verify transactions on the explorer
- [ ] Have ideas for what to build next
- [ ] Know where to find help and resources

## Thank You!

Thank you for completing the Serverless DApp 101 tutorial! 

You've taken your first steps into decentralized app development. The concepts you've learned apply to:
- Other blockchain databases
- Decentralized storage solutions
- Web3 development in general

**Keep building!** The best way to learn is by building. Start with a simple project and iterate.

### Share Your Work

- Share your projects in the Discord
- Post on Twitter/X with #ArkivNetwork
- Contribute to the community
- Help others learn

Happy building! 🚀
