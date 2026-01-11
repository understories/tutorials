export default function DictionaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Web3 Concepts Dictionary</h1>
        <p className="text-lg text-gray-600">
          Explore key concepts at four levels of understanding, from simple explanations to deep technical insights.
        </p>
      </header>

      <div className="space-y-16">
        {/* Concept 1: Data Sovereignty */}
        <section className="border-b border-gray-200 pb-12">
          <h2 className="text-3xl font-bold mb-8">1. Data Sovereignty</h2>

          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-900">ELI5</h3>
              <div className="prose prose-lg">
                <p>Your data is like a notebook.</p>
                <p>
                  Data sovereignty means <strong>you decide where the notebook lives, who can read it, and who can write in it</strong>. Not a company. Not a platform. You.
                </p>
                <p>If the app disappears, your notebook still exists.</p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-900">Curious Builder</h3>
              <div className="prose prose-lg">
                <p>Most apps store your data in <em>their</em> database.</p>
                <p>If they shut down, change rules, or get blocked, your data is trapped or gone.</p>
                <p>Data sovereignty means:</p>
                <ul>
                  <li>Data is <strong>independent from the app</strong></li>
                  <li>Access rules are explicit, not implied</li>
                  <li>You can switch apps without losing your history</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-900">Practicing Engineer</h3>
              <div className="prose prose-lg">
                <p>Data sovereignty implies:</p>
                <ul>
                  <li><strong>Separation of concerns</strong>: UI ≠ backend ≠ data</li>
                  <li>Cryptographic identity controls access (keys, not accounts)</li>
                  <li>Data is stored on infrastructure <strong>outside a single vendor&apos;s control</strong></li>
                  <li>Authorization rules travel <em>with</em> the data (or are enforceable at read time)</li>
                </ul>
                <p className="mt-4">
                  <strong>Key shift:</strong><br />
                  You don&apos;t authenticate <em>to a server</em>.<br />
                  You authenticate <em>as an identity</em>.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Full-Stack Web3 Developer</h3>
              <div className="prose prose-lg">
                <p>Formally, data sovereignty means:</p>
                <ul>
                  <li>Data is addressed by <strong>content or identity</strong>, not location</li>
                  <li>Write authority is enforced cryptographically</li>
                  <li>Reads can be permissioned, public, or selectively revealed</li>
                  <li>No single operator can revoke access retroactively</li>
                </ul>
                <p className="mt-4">Failure modes you now design for:</p>
                <ul>
                  <li>Key loss</li>
                  <li>Versioning conflicts</li>
                  <li>Indexing latency</li>
                  <li>Governance of shared schemas</li>
                </ul>
                <p className="mt-4 italic">
                  This is less &quot;where is my database?&quot; and more &quot;what are the rules of reality for this data?&quot;
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
              <h3 className="text-xl font-semibold mb-4">Discussion Questions</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Think about a service you use every day. What would actually happen to <em>you</em> if it disappeared tomorrow?</li>
                <li>When is it acceptable for someone else to control your data on your behalf? When is it not?</li>
                <li>Is &quot;convenience&quot; a fair trade for losing long-term control? Where is the line?</li>
                <li>Should data ownership feel more like owning a house, renting an apartment, or borrowing a library book? Why?</li>
                <li>If you could move your data freely between apps today, which relationships or institutions would change most?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Concept 2: Decentralized Databases */}
        <section className="border-b border-gray-200 pb-12">
          <h2 className="text-3xl font-bold mb-8">2. Decentralized Databases</h2>

          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-900">ELI5</h3>
              <div className="prose prose-lg">
                <p>
                  Instead of one big computer holding everyone&apos;s stuff, <strong>many computers keep copies</strong>, and they agree on what&apos;s real.
                </p>
                <p>No single off switch.</p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-900">Curious Builder</h3>
              <div className="prose prose-lg">
                <p>A decentralized database:</p>
                <ul>
                  <li>Doesn&apos;t live on one server</li>
                  <li>Is readable by many clients</li>
                  <li>Survives app shutdowns</li>
                  <li>Often trades speed for resilience</li>
                </ul>
                <p className="mt-4">Different kinds exist:</p>
                <ul>
                  <li>File-based</li>
                  <li>Append-only logs</li>
                  <li>Structured records</li>
                  <li>Content-addressed blobs</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-900">Practicing Engineer</h3>
              <div className="prose prose-lg">
                <p>Decentralized databases differ along axes:</p>
                <ul>
                  <li><strong>Who can write</strong></li>
                  <li><strong>How conflicts resolve</strong></li>
                  <li><strong>How data is indexed</strong></li>
                  <li><strong>How reads are accelerated</strong></li>
                </ul>
                <p className="mt-4">Common primitives:</p>
                <ul>
                  <li>Append-only logs</li>
                  <li>Merkle trees</li>
                  <li>Content hashes</li>
                  <li>Indexers as optional performance layers</li>
                </ul>
                <p className="mt-4">
                  <strong>Important realization:</strong><br />
                  &quot;Decentralized&quot; rarely means &quot;no infrastructure.&quot;<br />
                  It means <strong>replaceable infrastructure</strong>.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Full-Stack Web3 Developer</h3>
              <div className="prose prose-lg">
                <p>At depth, you choose tradeoffs:</p>
                <ul>
                  <li>Strong consistency vs eventual consistency</li>
                  <li>Global ordering vs local autonomy</li>
                  <li>On-chain vs off-chain data</li>
                  <li>Deterministic writes vs human workflows</li>
                </ul>
                <p className="mt-4">You design:</p>
                <ul>
                  <li>Schema evolution without migrations</li>
                  <li>Query patterns that tolerate lag</li>
                  <li>Client-side caching + verification</li>
                  <li>Failure recovery without admin access</li>
                </ul>
                <p className="mt-4">
                  A decentralized database is not a drop-in Postgres replacement.<br />
                  It is a <strong>different contract with time, trust, and failure</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
              <h3 className="text-xl font-semibold mb-4">Discussion Questions</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Why do you think so many systems are built with a single owner or administrator in the first place?</li>
                <li>What kinds of things should <em>never</em> depend on one company or government to keep working?</li>
                <li>When is it okay for a system to be slower, messier, or harder to use in exchange for resilience?</li>
                <li>Who should be responsible for maintaining shared digital infrastructure: companies, governments, communities, or no one?</li>
                <li>Can you think of a real-world system that already works like a decentralized database?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Concept 3: Full Stack Web3 Apps & the "Walkaway Test" */}
        <section className="border-b border-gray-200 pb-12">
          <h2 className="text-3xl font-bold mb-8">3. Full Stack Web3 Apps & the &quot;Walkaway Test&quot;</h2>
          <p className="text-sm text-gray-500 mb-6 italic">(including IPFS, Swarm, and other options)</p>

          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-900">ELI5</h3>
              <div className="prose prose-lg">
                <p>If the people who made the app disappear, <strong>can users still use it?</strong></p>
                <p>If yes, it passes the walkaway test.</p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-900">Curious Builder</h3>
              <div className="prose prose-lg">
                <p>A walkaway-safe app means:</p>
                <ul>
                  <li>Frontend can be hosted anywhere</li>
                  <li>Data exists independently</li>
                  <li>No secret server keys required to keep things running</li>
                  <li>Users can build a new interface if needed</li>
                </ul>
                <p className="mt-4">Storage options:</p>
                <ul>
                  <li>File networks for static assets</li>
                  <li>Distributed storage for user content</li>
                  <li>Public networks for shared state</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-900">Practicing Engineer</h3>
              <div className="prose prose-lg">
                <p>The stack typically splits into:</p>
                <ul>
                  <li><strong>Frontend</strong>: static site (any host, any mirror)</li>
                  <li><strong>Data layer</strong>: decentralized storage or logs</li>
                  <li><strong>Identity</strong>: cryptographic keys</li>
                  <li><strong>Indexing</strong>: optional, replaceable services</li>
                </ul>
                <p className="mt-4">IPFS-like systems:</p>
                <ul>
                  <li>Content-addressed files</li>
                  <li>Great for assets, snapshots, documents</li>
                </ul>
                <p className="mt-4">Swarm-like systems:</p>
                <ul>
                  <li>Incentivized persistence</li>
                  <li>Better guarantees around availability</li>
                </ul>
                <p className="mt-4 italic">
                  Neither is a database by itself.<br />
                  They are <strong>substrates</strong>, not application logic.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Full-Stack Web3 Developer</h3>
              <div className="prose prose-lg">
                <p>Passing the walkaway test requires:</p>
                <ul>
                  <li>No privileged write keys held by the team</li>
                  <li>Deterministic client behavior</li>
                  <li>Public schemas or discoverable formats</li>
                  <li>Replaceable indexers and gateways</li>
                </ul>
                <p className="mt-4">You design for:</p>
                <ul>
                  <li>Cold-start recovery</li>
                  <li>Community-run infrastructure</li>
                  <li>Forkability at every layer</li>
                </ul>
                <p className="mt-4">The app becomes:</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 italic">
                  A convention + data + tools<br />
                  not<br />
                  A company + servers + permissions
                </blockquote>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
              <h3 className="text-xl font-semibold mb-4">Discussion Questions</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>If the creators of an app vanished, what parts of it should still exist?</li>
                <li>Should users be able to rebuild tools they depend on without asking permission?</li>
                <li>Is it reasonable to expect non-technical people to care about where their app&apos;s data lives?</li>
                <li>What&apos;s the difference between an app that is &quot;open source&quot; and one that is truly forkable in practice?</li>
                <li>In the physical world, what systems pass the &quot;walkaway test&quot;? Which ones fail it?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Concept 4: Using Arkiv Instead of Traditional App Servers */}
        <section className="border-b border-gray-200 pb-12">
          <h2 className="text-3xl font-bold mb-8">4. Using Arkiv Instead of Traditional App Servers</h2>

          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-900">ELI5</h3>
              <div className="prose prose-lg">
                <p>Normally, apps have a server that decides what&apos;s allowed.</p>
                <p>
                  Arkiv replaces that with <strong>shared records and rules</strong>, so the app doesn&apos;t have to babysit everything.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-900">Curious Builder</h3>
              <div className="prose prose-lg">
                <p>Instead of:</p>
                <ul>
                  <li>Server receives request</li>
                  <li>Server checks permissions</li>
                  <li>Server updates database</li>
                </ul>
                <p className="mt-4">You get:</p>
                <ul>
                  <li>Client signs an action</li>
                  <li>Network verifies it</li>
                  <li>Data updates are public and durable</li>
                </ul>
                <p className="mt-4">Your app becomes thinner and simpler.</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-900">Practicing Engineer</h3>
              <div className="prose prose-lg">
                <p>Arkiv replaces many server responsibilities:</p>
                <ul>
                  <li>Identity verification → cryptographic signatures</li>
                  <li>Authorization → explicit write rules</li>
                  <li>Persistence → append-only records</li>
                  <li>Audit logs → built-in provenance</li>
                </ul>
                <p className="mt-4">What remains server-side:</p>
                <ul>
                  <li>Caching</li>
                  <li>Indexing</li>
                  <li>UX conveniences</li>
                  <li>Temporary compute</li>
                </ul>
                <p className="mt-4">
                  <strong>Your server is no longer the source of truth.</strong>
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Full-Stack Web3 Developer</h3>
              <div className="prose prose-lg">
                <p>Architecturally, Arkiv enables:</p>
                <ul>
                  <li>Serverless-by-default apps</li>
                  <li>Multiple frontends over the same data</li>
                  <li>Offline-first or async workflows</li>
                  <li>Transparent history and replayability</li>
                </ul>
                <p className="mt-4">You stop building:</p>
                <ul>
                  <li>Custom auth systems</li>
                  <li>Admin override paths</li>
                  <li>Data recovery scripts</li>
                </ul>
                <p className="mt-4">You start designing:</p>
                <ul>
                  <li>Data schemas as public APIs</li>
                  <li>Permission models as first-class objects</li>
                  <li>User escape hatches</li>
                </ul>
                <p className="mt-4 italic">
                  Arkiv doesn&apos;t eliminate complexity.<br />
                  It <strong>moves complexity into places users can see, reason about, and fork</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
              <h3 className="text-xl font-semibold mb-4">Discussion Questions</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Why do most apps today need a central server at all?</li>
                <li>What risks come from putting too much logic or power on the server side?</li>
                <li>If users could verify actions themselves, what kinds of intermediaries disappear?</li>
                <li>What new responsibilities fall on users when systems stop &quot;protecting&quot; them by default?</li>
                <li>Should digital systems prioritize preventing mistakes, or making recovery possible?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-Cutting Questions */}
        <section className="border-b border-gray-200 pb-12">
          <h2 className="text-3xl font-bold mb-8">Cross-Cutting Questions</h2>
          <p className="text-sm text-gray-500 mb-6 italic">These work after any concept.</p>
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
            <ul className="space-y-2 list-disc list-inside">
              <li>Which part of these ideas feels empowering, and which part feels scary?</li>
              <li>Who benefits most if these systems succeed? Who loses power?</li>
              <li>Are these technologies solving technical problems, social problems, or governance problems?</li>
              <li>What would have to be true for these systems to be widely adopted by people who never think about technology?</li>
              <li>What does &quot;ownership&quot; mean in a digital world where copying is free?</li>
            </ul>
          </div>
        </section>

        {/* The Big Picture */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg border-2 border-indigo-200">
          <h2 className="text-3xl font-bold mb-6">The Big Picture (Compression Layer)</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg font-semibold mb-4">Traditional stack:</p>
            <blockquote className="border-l-4 border-indigo-400 pl-4 italic mb-6">
              App owns users → server owns data → company owns reality
            </blockquote>
            <p className="text-lg font-semibold mb-4">This stack:</p>
            <blockquote className="border-l-4 border-purple-400 pl-4 italic mb-6">
              Users own keys → data owns history → apps are replaceable views
            </blockquote>
            <p className="mt-6">
              The technical shift is real.<br />
              The philosophical shift is bigger.
            </p>
            <p className="mt-4 font-semibold">
              The reward is not decentralization for its own sake.<br />
              It&apos;s <strong>systems that survive their creators</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
