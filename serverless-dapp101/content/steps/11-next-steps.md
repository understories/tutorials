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

## Resources

### Visual Learning

- **[Visual Lesson](/learn)**: Comprehensive visual guide with diagrams and explanations
  - Architecture comparisons
  - Data flow diagrams
  - Entity structure
  - Verification flow
  - And more!

### Official Documentation

- **Arkiv Network**: [arkiv.network](https://arkiv.network)
- **Dev Portal**: [arkiv.network/dev](https://arkiv.network/dev)
- **TypeScript SDK Docs**: [arkiv.network/getting-started/typescript](https://arkiv.network/getting-started/typescript)
- **Explorer**: [explorer.mendoza.hoodi.arkiv.network](https://explorer.mendoza.hoodi.arkiv.network) (Mendoza testnet)
- **Arkiv Litepaper**: [Download PDF](https://arkiv.network/pdf/ARKIV_Litepaper_blue.pdf) - Deep dive into Arkiv's architecture and philosophy
  > 📄 *Source for concepts used throughout this tutorial*

### SDK & Tools

- **@arkiv-network/sdk**: [npmjs.com/package/@arkiv-network/sdk](https://www.npmjs.com/package/@arkiv-network/sdk)
- **GitHub**: [github.com/arkiv-network](https://github.com/arkiv-network)
- **Examples**: Check the Arkiv GitHub for example projects

### Development Tools

- **Arkiv AI Agent Kit**: Drop-in LLM context for building Arkiv integrations correctly
  - Provides prompts and patterns for AI coding assistants
  - Prevents common mistakes (indexer lag assumptions, wallet casing issues, etc.)
  - Enforces best practices automatically
  - **Location**: Available in the tutorial repository's `extractions/arkiv-ai-agent-kit/` folder
  - See the [Visual Lesson](/learn#building-with-arkiv) for more details

### Community

- **Discord**: Join the [Arkiv Discord](https://discord.gg/arkiv) for help and discussions
- **Twitter/X**: Follow [@arkiv_network](https://twitter.com/arkiv_network) for updates
- **GitHub Discussions**: Ask questions and share projects

### Learning More

1. **Read the SDK Documentation**
   - Understand all query methods
   - Learn about advanced features
   - See code examples

2. **Explore the Explorer**
   - Look at different transactions
   - Understand transaction structure
   - See how data is stored on-chain

3. **Join the Community**
   - Ask questions
   - Share your projects
   - Learn from others

4. **Experiment**
   - Try different data structures
   - Test query patterns
   - Build something unique

## Key Concepts to Remember

### Data Independence

Your data lives on-chain, independent of:
- Your hosting provider
- Your server infrastructure
- Any single service

### Public by Default

Arkiv data is public on-chain. For privacy:
- Use unique space IDs
- Encrypt sensitive payloads
- Don't store secrets in attributes

### Query Patterns

- Use attributes for filtering (fast)
- Store complex data in payload (JSON)
- Create companion entities for relationships

### Best Practices

1. **Always handle errors gracefully**
2. **Account for indexer lag**
3. **Use meaningful attribute names**
4. **Store txHash separately for reliability**
5. **Test on testnet before mainnet**

## Getting Help

### Common Issues

**Transaction timeouts**: Normal on testnet. Wait and retry.

**Indexer lag**: Messages may take 5-30 seconds to appear. This is expected.

**Query returns empty**: Check your space ID and attribute names.

**Build errors**: Check TypeScript types and dependencies.

### Where to Ask

1. **Discord**: Best for quick questions
2. **GitHub Issues**: For bugs and feature requests
3. **Documentation**: Check the official docs first
4. **Community**: Other developers may have solved similar problems

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
