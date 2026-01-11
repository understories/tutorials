'use client';

import { useState } from 'react';

const LEVELS = {
  eli5: { emoji: '🧒', name: 'ELI5', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-900' },
  builder: { emoji: '🔨', name: 'Curious Builder', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-900' },
  engineer: { emoji: '⚙️', name: 'Practicing Engineer', color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-900' },
  developer: { emoji: '🚀', name: 'Full-Stack Web3 Developer', color: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-900' },
  questions: { emoji: '❓', name: 'Discussion Questions', color: 'gray', bgColor: 'bg-gray-50', textColor: 'text-gray-900' },
};

interface Concept {
  id: string;
  title: string;
  subtitle?: string;
  eli5: React.ReactNode;
  builder: React.ReactNode;
  engineer: React.ReactNode;
  developer: React.ReactNode;
  questions: React.ReactNode;
}

const concepts: Concept[] = [
  {
    id: 'data-sovereignty',
    title: 'Data Sovereignty',
    eli5: (
      <>
        <p>Your data is like a notebook.</p>
        <p>
          Data sovereignty means <strong>you decide where the notebook lives, who can read it, and who can write in it</strong>. Not a company. Not a platform. You.
        </p>
        <p>If the app disappears, your notebook still exists.</p>
      </>
    ),
    builder: (
      <>
        <p>Most apps store your data in <em>their</em> database.</p>
        <p>If they shut down, change rules, or get blocked, your data is trapped or gone.</p>
        <p>Data sovereignty means:</p>
        <ul>
          <li>Data is <strong>independent from the app</strong></li>
          <li>Access rules are explicit, not implied</li>
          <li>You can switch apps without losing your history</li>
        </ul>
      </>
    ),
    engineer: (
      <>
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
      </>
    ),
    developer: (
      <>
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
          This is less "where is my database?" and more "what are the rules of reality for this data?"
        </p>
        <p className="mt-4">In "trustless" terms: data sovereignty is part of <strong>self-sovereignty + walkaway</strong>:</p>
        <ul>
          <li>write access must be user-authorized</li>
          <li>reads shouldn&apos;t require a single vendor</li>
          <li>the data model should support migration (content addressing, standard schemas, or at least stable export formats)</li>
          <li>integrity should be checkable (hashes, signatures, receipts)</li>
        </ul>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Think about a service you use every day. What would actually happen to <em>you</em> if it disappeared tomorrow?</li>
        <li>When is it acceptable for someone else to control your data on your behalf? When is it not?</li>
        <li>Is "convenience" a fair trade for losing long-term control? Where is the line?</li>
        <li>What personal data would you most want to be portable?</li>
        <li>Is "I can download a CSV" enough, or can portability be deeper?</li>
        <li>Who should be able to delete data, and when?</li>
        <li>Should data ownership feel more like owning a house, renting an apartment, or borrowing a library book? Why?</li>
        <li>If you could move your data freely between apps today, which relationships or institutions would change most?</li>
      </ul>
    ),
  },
  {
    id: 'decentralized-databases',
    title: 'Decentralized Databases',
    eli5: (
      <>
        <p>
          Instead of one big computer holding everyone&apos;s stuff, <strong>many computers keep copies</strong>, and they agree on what&apos;s real.
        </p>
        <p>No single off switch.</p>
      </>
    ),
    builder: (
      <>
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
      </>
    ),
    engineer: (
      <>
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
          "Decentralized" rarely means "no infrastructure."<br />
          It means <strong>replaceable infrastructure</strong>.
        </p>
        <p className="mt-4">"Decentralized DB" can mean different things:</p>
        <ul>
          <li>decentralized <em>availability</em> (data replicated across many nodes)</li>
          <li>decentralized <em>authorization</em> (who can write)</li>
          <li>decentralized <em>verification</em> (others can verify correctness)</li>
          <li>decentralized <em>indexing/querying</em> (harder than it sounds)</li>
        </ul>
      </>
    ),
    developer: (
      <>
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
        <p className="mt-4">Key engineering questions:</p>
        <ul>
          <li>consistency model (eventual? strong? CRDTs?)</li>
          <li>indexing and query costs (who runs indexers, and can users verify?)</li>
          <li>access control patterns (public data vs encrypted private data)</li>
          <li>performance and UX tradeoffs</li>
        </ul>
        <p className="mt-4">Practical rule: don&apos;t call it "trustless" unless it passes the manifesto tests (replaceability + verifiability + walkaway).</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Why do you think so many systems are built with a single owner or administrator in the first place?</li>
        <li>What kinds of things should <em>never</em> depend on one company or government to keep working?</li>
        <li>When is it okay for a system to be slower, messier, or harder to use in exchange for resilience?</li>
        <li>Who should be responsible for maintaining shared digital infrastructure: companies, governments, communities, or no one?</li>
        <li>Can you think of a real-world system that already works like a decentralized database?</li>
        <li>What do you think you gain by decentralizing a database—what do you lose?</li>
        <li>Where is "eventual consistency" acceptable (or not)?</li>
        <li>Should everyone be able to read public records by default?</li>
      </ul>
    ),
  },
  {
    id: 'walkaway-test',
    title: 'Full Stack Web3 Apps & the "Walkaway Test"',
    eli5: (
      <>
        <p>If the people who made the app disappear, <strong>can users still use it?</strong></p>
        <p>If yes, it passes the walkaway test.</p>
      </>
    ),
    builder: (
      <>
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
      </>
    ),
    engineer: (
      <>
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
      </>
    ),
    developer: (
      <>
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
        <p className="mt-4">Define it per layer:</p>
        <ul>
          <li>UI: alternative frontends (mirrors, IPFS/Swarm-hosted, downloadable builds)</li>
          <li>Data: exportable, portable, verifiable state</li>
          <li>Execution: permissionless transaction inclusion / no single sequencer gate</li>
          <li>Keys: self-custody + recovery that doesn&apos;t introduce "critical secrets"</li>
        </ul>
        <p className="mt-4">Treat "walkaway" as a <strong>system integration test</strong>, not a slogan.</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>If the creators of an app vanished, what parts of it should still exist?</li>
        <li>Should users be able to rebuild tools they depend on without asking permission?</li>
        <li>Is it reasonable to expect non-technical people to care about where their app&apos;s data lives?</li>
        <li>What&apos;s the difference between an app that is "open source" and one that is truly forkable in practice?</li>
        <li>In the physical world, what systems pass the "walkaway test"? Which ones fail it?</li>
        <li>If your main app vanished tomorrow, what would you lose?</li>
        <li>Which matters more: "can I leave?" or "can I verify?" Why?</li>
        <li>What&apos;s the difference between "I can leave in theory" vs "I can leave in practice"?</li>
      </ul>
    ),
  },
  {
    id: 'arkiv',
    title: 'Using Arkiv Instead of Traditional App Servers',
    eli5: (
      <>
        <p>Normally, apps have a server that decides what&apos;s allowed.</p>
        <p>
          Arkiv replaces that with <strong>shared records and rules</strong>, so the app doesn&apos;t have to babysit everything.
        </p>
      </>
    ),
    builder: (
      <>
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
      </>
    ),
    engineer: (
      <>
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
      </>
    ),
    developer: (
      <>
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
        <p className="mt-4">A practical mental model:</p>
        <ul>
          <li>Replace: centralized DB + "app server as source of truth"</li>
          <li>With: signed user actions + shared data layer + thin APIs for convenience (never required)</li>
          <li>Keep: optional caches/indexers, but ensure they&apos;re replaceable and results are checkable</li>
        </ul>
        <p className="mt-4">The manifesto&apos;s warning applies directly: "hosted defaults" quietly become gatekeepers unless you ship alternatives and make them usable.</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Why do most apps today need a central server at all?</li>
        <li>What risks come from putting too much logic or power on the server side?</li>
        <li>If users could verify actions themselves, what kinds of intermediaries disappear?</li>
        <li>What new responsibilities fall on users when systems stop "protecting" them by default?</li>
        <li>Should digital systems prioritize preventing mistakes, or making recovery possible?</li>
        <li>What parts of an app should be "public infrastructure" vs "private service"?</li>
        <li>When is it okay to have a centralized component?</li>
        <li>How do you explain "walkaway" to someone who just wants the app to work?</li>
      </ul>
    ),
  },
  {
    id: 'trustlessness',
    title: 'Trustlessness: Verification Over Blind Trust',
    eli5: (
      <>
        <p>A trustless system is like a game where <strong>anyone can check the rules</strong> and <strong>no one gets a special "because I said so" button</strong>.</p>
      </>
    ),
    builder: (
      <>
        <p>You shouldn&apos;t have to trust a company, admin, or "team wallet" to be fair.</p>
        <p>You should be able to independently verify what happened.</p>
      </>
    ),
    engineer: (
      <>
        <p>"Trustless" means a participant can <strong>join, verify, and act without permission</strong>, and system correctness depends on <strong>publicly verifiable rules</strong> (not operator promises).</p>
      </>
    ),
    developer: (
      <>
        <p>Design goal: minimize trusted components across the whole stack (UI, RPC, storage, sequencing, upgrades).</p>
        <p className="mt-4">Practically: ship <strong>fallbacks</strong>, <strong>open clients</strong>, <strong>reproducible state transitions</strong>, and remove "hidden chokepoints" that can censor or alter outcomes.</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Where do you rely on "trust me" systems in daily life—and when is that fine vs dangerous?</li>
        <li>If a system is convenient but unverifiable, what&apos;s the real cost?</li>
        <li>What&apos;s the smallest "trust hook" you&apos;d refuse to accept in a public system?</li>
      </ul>
    ),
  },
  {
    id: 'protocol-platform-drift',
    title: 'Protocol → Platform Drift (The "Convenience Trap")',
    eli5: (
      <>
        <p>A little shortcut becomes a habit. Soon the shortcut is the only way, and someone controls it.</p>
      </>
    ),
    builder: (
      <>
        <p>It often starts with harmless choices ("use the hosted service, it&apos;s easier"), but those become default control points.</p>
      </>
    ),
    engineer: (
      <>
        <p>Reliance on hosted RPCs, whitelisted relayers, upgrade keys, centralized sequencers, etc. creates <strong>gatekeepers</strong> and makes neutrality fragile.</p>
      </>
    ),
    developer: (
      <>
        <p>"Default dependency" = de facto platform power.</p>
        <p className="mt-4">You fight this with <strong>redundancy + permissionless alternatives</strong>: multiple RPC options, local/light clients, multiple gateways, content addressing, portable identities, and "escape hatches" for every critical function.</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>What&apos;s a real-world example of "convenience drift" (tech or non-tech)?</li>
        <li>When do defaults become coercion?</li>
        <li>What would "escape hatches everywhere" look like in schools, banks, or social media?</li>
      </ul>
    ),
  },
  {
    id: 'six-requirements',
    title: 'The Six Requirements of a Trustless System',
    eli5: (
      <>
        <p>You control your moves, anyone can check the scoreboard, nobody can block valid moves, and regular people can actually play.</p>
      </>
    ),
    builder: (
      <>
        <p>The checklist is: self-control, proof, anti-censorship, walkaway, usable access, and clear incentives.</p>
      </>
    ),
    engineer: (
      <>
        <p>Requirements: <strong>self-sovereignty, verifiability, censorship resistance, walkaway, accessibility, transparency of incentives</strong>.</p>
      </>
    ),
    developer: (
      <>
        <p>Make each requirement measurable:</p>
        <ul>
          <li>self-sovereignty → user-signed actions; no "operator signs for you"</li>
          <li>verifiability → deterministic state updates, public data availability</li>
          <li>censorship resistance → multiple inclusion paths; reasonable cost/time bounds</li>
          <li>walkaway → replaceable operators; no permissioned handoff</li>
          <li>accessibility → low hardware/ops burden; sane UX</li>
          <li>incentive transparency → rules in protocol, not private contracts/APIs</li>
        </ul>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Which requirement is easiest to fake?</li>
        <li>Which requirement do "normal users" notice first?</li>
        <li>What trade-offs are acceptable between accessibility and maximum decentralization?</li>
      </ul>
    ),
  },
  {
    id: 'three-laws',
    title: 'The "Three Laws" of Trustless Design',
    eli5: (
      <>
        <ol className="list-decimal list-inside space-y-2">
          <li>No secret boss keys.</li>
          <li>No irreplaceable middlemen.</li>
          <li>No magic results you can&apos;t double-check.</li>
        </ol>
      </>
    ),
    builder: (
      <>
        <p>Don&apos;t build systems where one party&apos;s private info, special role, or unverifiable actions can decide outcomes.</p>
      </>
    ),
    engineer: (
      <>
        <p>Laws:</p>
        <ul>
          <li><strong>No critical secrets</strong> (except the user&apos;s own)</li>
          <li><strong>No indispensable intermediaries</strong> (replaceable; <em>practically</em> open)</li>
          <li><strong>No unverifiable outcomes</strong> (state changes reproducible from public data)</li>
        </ul>
      </>
    ),
    developer: (
      <>
        <p>This is a brutal lens for architecture reviews:</p>
        <ul>
          <li>"Critical secrets" often hides in admin keys, centralized recovery, proprietary fraud scoring, private allowlists.</li>
          <li>"Indispensable intermediaries" hides in single RPC defaults, single sequencer/relayer, single gateway/CDN, closed validators.</li>
          <li>"Unverifiable outcomes" hides in off-chain matching/auctions, opaque bridging, private orderflow, black-box AI decisions.</li>
        </ul>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Where do you see "secret boss keys" in society today?</li>
        <li>What intermediaries feel optional but aren&apos;t?</li>
        <li>What outcomes do you accept on trust today that maybe you shouldn&apos;t?</li>
      </ul>
    ),
  },
  {
    id: 'ethereum-shared-hard-drive',
    title: '"Ethereum as a Shared Hard Drive" (The Cypherpunk Stack Idea)',
    eli5: (
      <>
        <p>Imagine a shared notebook nobody owns, where everyone can read and (if allowed) write.</p>
      </>
    ),
    builder: (
      <>
        <p>The "web3" pitch here is broader than money: a base layer for shared state + messaging + files, so apps aren&apos;t secretly controlled by one server.</p>
      </>
    ),
    engineer: (
      <>
        <p>The essay frames Ethereum + p2p messaging + decentralized file storage as a kind of "public shared hard drive" for modern collaborative apps.</p>
      </>
    ),
    developer: (
      <>
        <p>Treat it as a composable stack:</p>
        <ul>
          <li><strong>consensus/state</strong> (Ethereum/L2s)</li>
          <li><strong>messaging</strong> (p2p)</li>
          <li><strong>storage</strong> (Swarm/IPFS/etc.)</li>
          <li><strong>identity/keys</strong></li>
        </ul>
        <p className="mt-4">The hard part is the seams: key management, UX, censorship resistance, and making the "decentralized path" the default (not the hobbyist path).</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>If the internet were rebuilt for user control, what would change first?</li>
        <li>What should be public infrastructure vs private product?</li>
        <li>What does "open source" mean if your data still lives on someone else&apos;s server?</li>
      </ul>
    ),
  },
  {
    id: 'ipfs-swarm-storage',
    title: 'IPFS, Swarm, and Other "Walkaway-Friendly" Storage Options',
    eli5: (
      <>
        <p>You store files by "what they are" (their fingerprint), not "where they live" (one website).</p>
      </>
    ),
    builder: (
      <>
        <p>Content-addressed storage means: if you have the content&apos;s ID, you can fetch it from many places. That helps with resilience.</p>
      </>
    ),
    engineer: (
      <>
        <p>IPFS and Swarm are decentralized/content-addressed storage networks frequently used to publish frontends or assets so they aren&apos;t tied to one host.</p>
        <p className="mt-4">"Walkaway" depends on <em>availability guarantees</em> (pinning, incentives, replication), not just the tech name.</p>
      </>
    ),
    developer: (
      <>
        <p>Architect for failure:</p>
        <ul>
          <li>publish UI to IPFS/Swarm + multiple gateways + optional local-first caching</li>
          <li>ensure deterministic builds (so others can reproduce the same content hash)</li>
          <li>decide how persistence is paid for (pinning services, community pinning, incentive layers)</li>
        </ul>
        <p className="mt-4">Also: make sure critical flows don&apos;t die if a gateway does—gateways are a common "platform drift" trap.</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>What&apos;s the difference between "decentralized in theory" and "available in practice"?</li>
        <li>Should permanent storage be a right, a paid service, or a community job?</li>
        <li>Would you trade a little speed for a lot more resilience?</li>
      </ul>
    ),
  },
  {
    id: 'incentives-social-layer',
    title: "Incentives Aren't Enough (You Need a \"Social Layer\")",
    eli5: (
      <>
        <p>Paying people helps, but it doesn&apos;t automatically make them play fair.</p>
      </>
    ),
    builder: (
      <>
        <p>Money can fund security and participation, but values like neutrality and openness often need community norms and public support.</p>
      </>
    ),
    engineer: (
      <>
        <p>The essay argues incentives help (economic security, funding) but don&apos;t reliably produce decentralization; some "decentralized stack" parts lack good business models.</p>
      </>
    ),
    developer: (
      <>
        <p>Implication: budget time for governance, open tooling, public goods funding, and "unsexy" infrastructure.</p>
        <p className="mt-4">Design systems so "doing the right thing" is the easiest path—because relying on permanent virtue is not an architecture.</p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>What public goods do you rely on that have no obvious business model?</li>
        <li>When do markets fail to produce the outcome we want?</li>
        <li>What norms should a "trustless" community enforce, and how?</li>
      </ul>
    ),
  },
];

const crossCuttingQuestions = (
  <ul className="space-y-2 list-disc list-inside">
    <li>Which part of these ideas feels empowering, and which part feels scary?</li>
    <li>Who benefits most if these systems succeed? Who loses power?</li>
    <li>Are these technologies solving technical problems, social problems, or governance problems?</li>
    <li>What would have to be true for these systems to be widely adopted by people who never think about technology?</li>
    <li>What does "ownership" mean in a digital world where copying is free?</li>
  </ul>
);

export default function DictionaryPage() {
  const [openConcept, setOpenConcept] = useState<string | null>(null);
  const [openLevel, setOpenLevel] = useState<string | null>(null);
  const [openCrossCutting, setOpenCrossCutting] = useState(false);

  const handleEmojiClick = (conceptId: string, level: string) => {
    const levelKey = `${conceptId}-${level}`;
    if (openLevel === levelKey) {
      // If clicking the same level, close it
      setOpenLevel(null);
      setOpenConcept(null);
    } else {
      // Open the new level (only one at a time)
      setOpenLevel(levelKey);
      setOpenConcept(conceptId);
    }
  };

  const isLevelOpen = (conceptId: string, level: string) => {
    return openLevel === `${conceptId}-${level}`;
  };

  const isConceptOpen = (conceptId: string) => {
    return openConcept === conceptId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Web3 Concepts Dictionary</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore key concepts at four levels of understanding, from simple explanations to deep technical insights.
        </p>

        {/* Legend */}
        <div className="bg-white bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Understanding Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.eli5.emoji}</span>
              <div>
                <div className="font-semibold text-gray-900">{LEVELS.eli5.name}</div>
                <div className="text-sm text-gray-600">Simple explanation</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.builder.emoji}</span>
              <div>
                <div className="font-semibold text-gray-900">{LEVELS.builder.name}</div>
                <div className="text-sm text-gray-600">Practical overview</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.engineer.emoji}</span>
              <div>
                <div className="font-semibold text-gray-900">{LEVELS.engineer.name}</div>
                <div className="text-sm text-gray-600">Technical details</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.developer.emoji}</span>
              <div>
                <div className="font-semibold text-gray-900">{LEVELS.developer.name}</div>
                <div className="text-sm text-gray-600">Deep dive</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.questions.emoji}</span>
              <div>
                <div className="font-semibold text-gray-900">{LEVELS.questions.name}</div>
                <div className="text-sm text-gray-600">Reflection prompts</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {/* Concepts */}
        {concepts.map((concept) => {
          const isOpen = isConceptOpen(concept.id);
          
          return (
            <div
              key={concept.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Concept Header */}
              <div className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{concept.title}</h2>
                  {concept.subtitle && (
                    <p className="text-sm text-gray-500 mt-1 italic">{concept.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEmojiClick(concept.id, 'eli5')}
                    className={`text-lg hover:scale-125 transition-transform ${
                      isLevelOpen(concept.id, 'eli5') ? 'scale-125' : ''
                    }`}
                    aria-label="ELI5"
                  >
                    {LEVELS.eli5.emoji}
                  </button>
                  <button
                    onClick={() => handleEmojiClick(concept.id, 'builder')}
                    className={`text-lg hover:scale-125 transition-transform ${
                      isLevelOpen(concept.id, 'builder') ? 'scale-125' : ''
                    }`}
                    aria-label="Curious Builder"
                  >
                    {LEVELS.builder.emoji}
                  </button>
                  <button
                    onClick={() => handleEmojiClick(concept.id, 'engineer')}
                    className={`text-lg hover:scale-125 transition-transform ${
                      isLevelOpen(concept.id, 'engineer') ? 'scale-125' : ''
                    }`}
                    aria-label="Practicing Engineer"
                  >
                    {LEVELS.engineer.emoji}
                  </button>
                  <button
                    onClick={() => handleEmojiClick(concept.id, 'developer')}
                    className={`text-lg hover:scale-125 transition-transform ${
                      isLevelOpen(concept.id, 'developer') ? 'scale-125' : ''
                    }`}
                    aria-label="Full-Stack Web3 Developer"
                  >
                    {LEVELS.developer.emoji}
                  </button>
                  <button
                    onClick={() => handleEmojiClick(concept.id, 'questions')}
                    className={`text-lg hover:scale-125 transition-transform ${
                      isLevelOpen(concept.id, 'questions') ? 'scale-125' : ''
                    }`}
                    aria-label="Discussion Questions"
                  >
                    {LEVELS.questions.emoji}
                  </button>
                </div>
              </div>

              {/* Concept Content */}
              {isOpen && (
                <div className="p-6 space-y-4 transition-all duration-200">
                  {/* Level Content */}
                  <div className="space-y-4">
                    {isLevelOpen(concept.id, 'eli5') && (
                      <div className={`${LEVELS.eli5.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.eli5.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.eli5.emoji}</span>
                          <span>{LEVELS.eli5.name}</span>
                        </h3>
                        <div className="prose prose-lg text-gray-900">{concept.eli5}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'builder') && (
                      <div className={`${LEVELS.builder.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.builder.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.builder.emoji}</span>
                          <span>{LEVELS.builder.name}</span>
                        </h3>
                        <div className="prose prose-lg text-gray-900">{concept.builder}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'engineer') && (
                      <div className={`${LEVELS.engineer.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.engineer.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.engineer.emoji}</span>
                          <span>{LEVELS.engineer.name}</span>
                        </h3>
                        <div className="prose prose-lg text-gray-900">{concept.engineer}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'developer') && (
                      <div className={`${LEVELS.developer.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.developer.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.developer.emoji}</span>
                          <span>{LEVELS.developer.name}</span>
                        </h3>
                        <div className="prose prose-lg text-gray-900">{concept.developer}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'questions') && (
                      <div className={`${LEVELS.questions.bgColor} p-6 rounded-lg border-l-4 border-gray-400 transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-4 ${LEVELS.questions.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.questions.emoji}</span>
                          <span>{LEVELS.questions.name}</span>
                        </h3>
                        <div className="prose prose-lg text-gray-900">{concept.questions}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Cross-Cutting Questions */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenCrossCutting(!openCrossCutting)}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Cross-Cutting Questions</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{LEVELS.questions.emoji}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${openCrossCutting ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {openCrossCutting && (
            <div className="p-6 transition-all duration-200">
              <div className={`${LEVELS.questions.bgColor} p-6 rounded-lg border-l-4 border-gray-400`}>
                <div className="prose prose-lg text-gray-900">{crossCuttingQuestions}</div>
              </div>
            </div>
          )}
        </div>

        {/* The Big Picture */}
        <section className="bg-white bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg border-2 border-indigo-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">The Big Picture (Compression Layer)</h2>
          <div className="prose prose-lg max-w-none text-gray-900">
            <p className="text-lg font-semibold mb-4">Traditional stack:</p>
            <blockquote className="border-l-4 border-indigo-400 pl-4 italic mb-6 text-gray-700">
              App owns users → server owns data → company owns reality
            </blockquote>
            <p className="text-lg font-semibold mb-4">This stack:</p>
            <blockquote className="border-l-4 border-purple-400 pl-4 italic mb-6 text-gray-700">
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

        {/* Sources */}
        <section className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Sources</h2>
          <div className="prose prose-lg max-w-none text-gray-900">
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <a href="https://etherscan.io/address/0x32aa964746ba2be65c71fe4a5cb3c4a023ca3e20" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                  The Trustless Manifesto
                </a>
                {' '}
                (Ethereum contract source)
              </li>
              <li>
                <a href="https://vitalik.eth.limo/general/2023/12/28/cypherpunk.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                  Make Ethereum Cypherpunk Again
                </a>
                {' '}
                by Vitalik Buterin
              </li>
              <li>
                <a href="https://arkiv.network/pdf/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                  Arkiv Litepaper
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
