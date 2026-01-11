'use client';

import Link from 'next/link';
import { VisualAid } from '../../components/VisualAid';

export default function VisualsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Understanding Serverless DApps with Arkiv
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            A visual journey through decentralized application concepts
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">Learning Objectives</h2>
            <p className="text-blue-800 mb-4">
              By the end of this lesson, you'll understand:
            </p>
            <ul className="list-disc list-inside text-blue-800 space-y-2">
              <li>How serverless dapps differ from traditional applications</li>
              <li>The architecture and data flow of decentralized applications</li>
              <li>How Arkiv provides a decentralized database layer</li>
              <li>How to verify and interact with on-chain data</li>
              <li>Why data independence matters for users and developers</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Estimated time:</strong> 15-20 minutes • 
              <strong> Use with:</strong> <Link href="/01-quick-start" className="underline">Tutorial Steps</Link> or standalone
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">
              This lesson builds on concepts from the <strong>Vibes to App</strong> workshop, 
              extending traditional app development into the decentralized world. 
              We'll use visual aids to explain how Arkiv, a decentralized database, enables 
              true data ownership and independence.
            </p>
            <p>
              <em>Content adapted from the Arkiv Litepaper with permission. 
              See <a href="/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">full litepaper</a> for complete details.</em>
            </p>
          </div>
        </div>

        {/* Section 1: The Big Picture */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Section 1: The Big Picture</h2>
            <p className="text-lg text-gray-700 mb-6">
              Let's understand the fundamental shift from traditional apps to serverless dapps. 
              These concepts form the foundation for everything you'll build.
            </p>
          </div>

          {/* Architecture Comparison */}
          <div id="architecture-comparison" className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Architecture Comparison</h3>
              <p className="text-gray-700 mb-4">
                The most fundamental difference between traditional apps and serverless dapps is 
                <strong> where and who owns the data</strong>.
              </p>
              <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Traditional Apps:</strong> Data lives in company databases. When you use 
                  a service, your data belongs to that company. If the service shuts down, your 
                  data may be lost. You're locked into their infrastructure.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Serverless DApps with Arkiv:</strong> Data lives on-chain, owned by users. 
                  Your data persists independently of any service. Multiple apps can read the same 
                  data. No vendor lock-in. <em>(Source: Arkiv Litepaper)</em>
                </p>
              </div>
            </div>
            <VisualAid
              src="/visuals/architecture-comparison.svg"
              alt="Side-by-side comparison of a traditional app where data is stored in a company database versus a serverless dapp where data is stored on the Arkiv network and owned by the user."
              className="mb-0"
            />
          </div>

          {/* Stack Comparison */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Development Stack Comparison</h3>
              <p className="text-gray-700 mb-4">
                If you've taken the <strong>Vibes to App</strong> workshop, you're already familiar 
                with building apps using React, Next.js, and a database. The good news? 
                <strong> Most of your stack stays the same</strong>. We're just replacing the database layer.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>What stays:</strong> React for UI, Next.js for framework, TypeScript for types, 
                  Vercel for deployment. All your frontend skills transfer directly.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>What changes:</strong> Instead of PostgreSQL, MongoDB, or Firebase, you use 
                  <strong> Arkiv</strong>, a decentralized database that stores data on the blockchain. 
                  The query interface feels familiar, but the data lives on-chain.
                </p>
              </div>
            </div>
            <VisualAid
              src="/visuals/stack-comparison.svg"
              alt="Comparison of the Vibes to App development stack with the Serverless DApp stack, highlighting Arkiv as the new decentralized data layer."
              className="mb-0"
            />
          </div>

          {/* Two Paths */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Two Paths, One Destination</h3>
              <p className="text-gray-700 mb-4">
                This tutorial offers two paths to build your first Arkiv app. Both lead to the same 
                result: a working decentralized application.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">🤖 AI-Assisted Path</h4>
                  <p className="text-sm text-purple-800">
                    Use AI coding assistants (Cursor, Copilot, Claude) with provided prompts. 
                    Faster if you're comfortable with AI tools.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✋ Manual Path</h4>
                  <p className="text-sm text-green-800">
                    Follow step-by-step instructions. No AI needed. Great for learning every detail.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Concept Bridges */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Concept Bridges: From Vibes to App to Serverless</h3>
              <p className="text-gray-700 mb-4">
                If you've taken the <strong>Vibes to App - Class 1</strong> workshop, you've learned 
                how to turn app ideas into working applications. This tutorial extends those concepts 
                into the decentralized world.
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Vibes to App taught you:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>How to structure an app idea</li>
                  <li>Building with React and Next.js</li>
                  <li>Using databases to store data</li>
                  <li>Deploying to production</li>
                </ul>
                <p className="text-sm text-gray-700 mt-3 mb-2">
                  <strong>Serverless DApp 101 extends this to:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>Decentralized data storage (Arkiv instead of traditional DB)</li>
                  <li>User-owned data (not company-owned)</li>
                  <li>Blockchain verification (transparent and verifiable)</li>
                  <li>True data independence (walkaway test)</li>
                </ul>
              </div>
            </div>
            <VisualAid
              src="/visuals/concept-bridges.svg"
              alt="Conceptual progression showing how ideas from the Vibes to App workshop extend into serverless and decentralized application concepts."
              className="mb-0"
            />
          </div>
        </div>

        {/* Section 2: Hands-On Experience */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Section 2: Hands-On Experience</h2>
            <p className="text-lg text-gray-700 mb-6">
              Now let's see how data actually flows through a serverless dapp. These visuals 
              show the mechanics of reading and writing to Arkiv, and how to verify your data 
              on the blockchain.
            </p>
          </div>

          {/* Data Flow - Write */}
          <div id="data-flow-write" className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Data Flow: Writing to Arkiv</h3>
              <p className="text-gray-700 mb-4">
                When you create a record in your app, here's what happens behind the scenes:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>User Action:</strong> You submit a form or trigger an action in your app</li>
                <li><strong>API Route:</strong> Your Next.js API route receives the request</li>
                <li><strong>Transaction Creation:</strong> The API creates an Arkiv entity with your data</li>
                <li><strong>Signing:</strong> The transaction is signed with your private key (wallet)</li>
                <li><strong>Blockchain Submission:</strong> The signed transaction is submitted to Arkiv (Mendoza testnet)</li>
                <li><strong>Confirmation:</strong> The transaction is confirmed on-chain (usually within seconds)</li>
                <li><strong>Indexing:</strong> Indexers process the transaction (5-30 seconds delay. This is normal!)</li>
                <li><strong>Queryable:</strong> Your data becomes queryable and appears in your app</li>
              </ol>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> Indexer lag is normal! Your transaction is confirmed on-chain 
                  immediately, but it takes a few seconds for indexers to process it. This is why you might 
                  need to refresh to see new data. <em>(Source: Arkiv Litepaper - Indexer Architecture)</em>
                </p>
              </div>
            </div>
            <VisualAid
              src="/visuals/data-flow-write.svg"
              alt="Write flow showing how a user action becomes a signed Arkiv transaction recorded on the blockchain and visible in the explorer."
              className="mb-0"
            />
          </div>

          {/* Data Flow - Read */}
          <div id="data-flow-read" className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Data Flow: Reading from Arkiv</h3>
              <p className="text-gray-700 mb-4">
                Reading data from Arkiv is simpler than writing. No authentication is needed, and it's free!
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Query Request:</strong> Your app makes a query request (e.g., "get all messages")</li>
                <li><strong>Indexer Query:</strong> The query goes to Arkiv indexers (not the blockchain directly)</li>
                <li><strong>Filtering:</strong> Indexers filter entities by your query criteria (type, spaceId, etc.)</li>
                <li><strong>Response:</strong> Indexers return matching entities with attributes and payload</li>
                <li><strong>Display:</strong> Your app displays the data in the UI</li>
              </ol>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Key Points:</strong> Reads are public (anyone can query), free (no gas fees), 
                  and fast (served by indexers). Queries use attributes for filtering. Think of them 
                  like indexed database columns. <em>(Source: Arkiv Litepaper - Query Interface)</em>
                </p>
              </div>
            </div>
            <VisualAid
              src="/visuals/data-flow-read.svg"
              alt="Read flow showing how application data is queried from Arkiv and displayed in the user interface."
              className="mb-0"
            />
          </div>

          {/* Entity Structure */}
          <div id="entity-structure" className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Arkiv Entity Structure</h3>
              <p className="text-gray-700 mb-4">
                Every piece of data in Arkiv is stored as an <strong>entity</strong>. Understanding 
                entity structure is key to building effective queries.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Entity Components:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li><strong>Entity Key:</strong> Unique identifier (generated automatically)</li>
                  <li><strong>Attributes:</strong> Key-value pairs for querying (like indexed columns)
                    <ul className="list-circle list-inside ml-4 mt-1">
                      <li>Required: <code className="bg-gray-100 px-1 rounded">type</code>, <code className="bg-gray-100 px-1 rounded">spaceId</code></li>
                      <li>Common: <code className="bg-gray-100 px-1 rounded">wallet</code>, <code className="bg-gray-100 px-1 rounded">created_at</code></li>
                      <li>Custom: Any fields you want to query on</li>
                    </ul>
                  </li>
                  <li><strong>Payload:</strong> The actual data (JSON, text, binary, etc.)</li>
                  <li><strong>Content Type:</strong> MIME type (e.g., <code className="bg-gray-100 px-1 rounded">application/json</code>)</li>
                  <li><strong>Transaction Hash:</strong> Links to the blockchain transaction (for verification)</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Pro Tip:</strong> Use attributes for anything you want to query on. Store complex 
                  data in the payload as JSON. Attributes are indexed and fast; payloads are for richer content. 
                  <em>(Source: Arkiv Litepaper - Entity Model)</em>
                </p>
              </div>
            </div>
            <VisualAid
              src="/visuals/entity-structure.svg"
              alt="Diagram of an Arkiv entity showing its unique ID, queryable attributes, content payload, and transaction hash used for verification."
              className="mb-0"
            />
          </div>

          {/* Walkaway Test */}
          <div id="walkaway-test" className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">The Walkaway Test: Data Independence</h3>
              <p className="text-gray-700 mb-4">
                The "walkaway test" is a simple but powerful concept: <strong>Can your app and data 
                survive if you shut down your server?</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Traditional Apps</h4>
                  <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                    <li>Data in company database</li>
                    <li>Lost if server shuts down</li>
                    <li>Vendor lock-in</li>
                    <li>Can't migrate easily</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✅ Serverless DApps</h4>
                  <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                    <li>Data on-chain (blockchain)</li>
                    <li>Persists independently</li>
                    <li>No vendor lock-in</li>
                    <li>Rebuild app, same data</li>
                  </ul>
                </div>
              </div>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Why This Matters:</strong> With Arkiv, your data lives on the blockchain, 
                  not in a company database. This means you can shut down your server, rebuild your 
                  app from scratch, or switch hosting providers. Your data remains accessible. This is 
                  true decentralization. <em>(Source: Arkiv Litepaper - Data Persistence)</em>
                </p>
              </div>
            </div>
            <VisualAid
              src="/visuals/walkaway-test.svg"
              alt="Comparison showing that data stored in a traditional app is lost when the app shuts down, while data stored on Arkiv remains accessible to new applications."
              className="mb-0"
            />
          </div>

          {/* Verification Flow */}
          <div id="verification-flow" className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Verification Flow: Blockchain Transparency</h3>
              <p className="text-gray-700 mb-4">
                One of the most powerful features of blockchain-based data is <strong>verifiability</strong>. 
                Anyone can verify that your data is actually on-chain.
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Transaction Hash:</strong> Every write operation returns a transaction hash</li>
                <li><strong>Explorer Lookup:</strong> Use the hash to look up the transaction on the Arkiv Explorer</li>
                <li><strong>On-Chain Verification:</strong> The explorer shows the transaction details, block number, and data</li>
                <li><strong>Public Verification:</strong> Anyone can verify your data is on-chain (transparency!)</li>
                <li><strong>Immutable Record:</strong> Once confirmed, the transaction is permanent and unchangeable</li>
              </ol>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Blockchain Transparency:</strong> All Arkiv data is public on-chain. This means 
                  anyone can verify your data, see transaction history, and trust that the data hasn't 
                  been tampered with. For privacy, use unique space IDs or encrypt payloads. 
                  <em>(Source: Arkiv Litepaper - Blockchain Verification)</em>
                </p>
              </div>
            </div>
            <VisualAid
              src="/visuals/verification-flow.svg"
              alt="Step-by-step flow showing how a transaction hash is used to verify data on the blockchain using the Arkiv explorer."
              className="mb-0"
            />
          </div>
        </div>

        {/* Section 3: Building with Arkiv */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Section 3: Building with Arkiv</h2>
            <p className="text-lg text-gray-700 mb-6">
              Now that you understand the concepts, here are tools and patterns to help you build 
              Arkiv apps correctly from day one.
            </p>
          </div>

          {/* AI Agent Kit */}
          <div id="building-with-arkiv" className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Arkiv AI Agent Kit</h3>
            <p className="text-gray-700 mb-4">
              The <strong>Arkiv AI Agent Kit</strong> is a drop-in LLM context designed to help AI 
              coding assistants (Cursor, Copilot, Claude, etc.) build Arkiv integrations correctly 
              from day one.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">What It Does:</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                <li>Provides prompts and patterns for AI agents working with Arkiv</li>
                <li>Prevents common mistakes (like assuming immediate read-your-writes)</li>
                <li>Enforces best practices (wallet normalization, query shapes, timeout handling)</li>
                <li>Includes engineering guidelines and checklists</li>
              </ul>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">How to Use:</p>
              <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-4">
                <li>Copy the kit into your AI coding tool's context</li>
                <li>Reference the prompts when building Arkiv features</li>
                <li>Let the AI agent follow the patterns automatically</li>
                <li>Use the precommit checks to ensure compliance</li>
              </ol>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Key Principles from the Kit:</strong> Indexer lag is normal (not an error), 
                wallet normalization everywhere, query shape standardization (type + spaceId + limit), 
                immutable history design, and timeout handling for all writes.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/understories/tutorials/tree/main/extractions/arkiv-ai-agent-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                View on GitHub →
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <em>The AI Agent Kit is available in the tutorial repository's extractions folder. 
              See the <Link href="/11-next-steps" className="text-blue-600 hover:underline">Next Steps</Link> section for more details.</em>
            </p>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices & Patterns</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">✅ Do This</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>Always include <code className="bg-gray-100 px-1 rounded">type</code>, <code className="bg-gray-100 px-1 rounded">spaceId</code>, and <code className="bg-gray-100 px-1 rounded">limit</code> in queries</li>
                  <li>Normalize wallet addresses to lowercase in writes and queries</li>
                  <li>Handle indexer lag gracefully (show "submitted" state, poll for updates)</li>
                  <li>Use stable entity keys for mutable state (Pattern B)</li>
                  <li>Create companion txHash entities for observability</li>
                  <li>Wrap all writes in timeout handlers</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">❌ Avoid This</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>Query-first upserts for mutable entities (races under indexer lag)</li>
                  <li>Assuming immediate read-your-writes (indexer lag is normal!)</li>
                  <li>Treating indexer lag as an exceptional error</li>
                  <li>Querying without type/spaceId/limit</li>
                  <li>Wallet casing inconsistencies</li>
                  <li>Putting queryable fields only in payload</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <em>These patterns come from arkiv-app-kit and arkiv-ai-agent-kit. 
              See the <Link href="/11-next-steps" className="text-blue-600 hover:underline">Next Steps</Link> section for more resources.</em>
            </p>
          </div>
        </div>

        {/* Section 4: Resources & Next Steps */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resources & Next Steps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Official Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      📄 Arkiv Litepaper
                    </a>
                    <span className="text-gray-500 ml-2">(Source for concepts in this lesson)</span>
                  </li>
                  <li>
                    <a href="https://arkiv.network" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      🌐 Arkiv Network
                    </a>
                  </li>
                  <li>
                    <a href="https://explorer.mendoza.hoodi.arkiv.network" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      🔍 Arkiv Explorer (Mendoza Testnet)
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Development Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://github.com/understories/tutorials/tree/main/extractions/arkiv-ai-agent-kit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      🤖 Arkiv AI Agent Kit
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/arkiv-network" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      📦 Arkiv SDK & Examples
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continue Learning</h3>
              <div className="flex gap-4">
                <Link
                  href="/01-quick-start"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Tutorial →
                </Link>
                <Link
                  href="/hello-world"
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Try Hello World Demo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
