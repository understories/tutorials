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
    title: '1. Data Sovereignty',
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
          This is less &quot;where is my database?&quot; and more &quot;what are the rules of reality for this data?&quot;
        </p>
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Think about a service you use every day. What would actually happen to <em>you</em> if it disappeared tomorrow?</li>
        <li>When is it acceptable for someone else to control your data on your behalf? When is it not?</li>
        <li>Is &quot;convenience&quot; a fair trade for losing long-term control? Where is the line?</li>
        <li>Should data ownership feel more like owning a house, renting an apartment, or borrowing a library book? Why?</li>
        <li>If you could move your data freely between apps today, which relationships or institutions would change most?</li>
      </ul>
    ),
  },
  {
    id: 'decentralized-databases',
    title: '2. Decentralized Databases',
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
          &quot;Decentralized&quot; rarely means &quot;no infrastructure.&quot;<br />
          It means <strong>replaceable infrastructure</strong>.
        </p>
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
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Why do you think so many systems are built with a single owner or administrator in the first place?</li>
        <li>What kinds of things should <em>never</em> depend on one company or government to keep working?</li>
        <li>When is it okay for a system to be slower, messier, or harder to use in exchange for resilience?</li>
        <li>Who should be responsible for maintaining shared digital infrastructure: companies, governments, communities, or no one?</li>
        <li>Can you think of a real-world system that already works like a decentralized database?</li>
      </ul>
    ),
  },
  {
    id: 'walkaway-test',
    title: '3. Full Stack Web3 Apps & the &quot;Walkaway Test&quot;',
    subtitle: '(including IPFS, Swarm, and other options)',
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
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>If the creators of an app vanished, what parts of it should still exist?</li>
        <li>Should users be able to rebuild tools they depend on without asking permission?</li>
        <li>Is it reasonable to expect non-technical people to care about where their app&apos;s data lives?</li>
        <li>What&apos;s the difference between an app that is &quot;open source&quot; and one that is truly forkable in practice?</li>
        <li>In the physical world, what systems pass the &quot;walkaway test&quot;? Which ones fail it?</li>
      </ul>
    ),
  },
  {
    id: 'arkiv',
    title: '4. Using Arkiv Instead of Traditional App Servers',
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
      </>
    ),
    questions: (
      <ul className="space-y-2 list-disc list-inside">
        <li>Why do most apps today need a central server at all?</li>
        <li>What risks come from putting too much logic or power on the server side?</li>
        <li>If users could verify actions themselves, what kinds of intermediaries disappear?</li>
        <li>What new responsibilities fall on users when systems stop &quot;protecting&quot; them by default?</li>
        <li>Should digital systems prioritize preventing mistakes, or making recovery possible?</li>
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
    <li>What does &quot;ownership&quot; mean in a digital world where copying is free?</li>
  </ul>
);

export default function DictionaryPage() {
  const [openConcepts, setOpenConcepts] = useState<Set<string>>(new Set());
  const [openLevels, setOpenLevels] = useState<Map<string, Set<string>>>(new Map());
  const [openCrossCutting, setOpenCrossCutting] = useState(false);

  const toggleConcept = (conceptId: string) => {
    setOpenConcepts((prev) => {
      const next = new Set(prev);
      if (next.has(conceptId)) {
        next.delete(conceptId);
      } else {
        next.add(conceptId);
      }
      return next;
    });
  };

  const toggleLevel = (conceptId: string, level: string) => {
    setOpenLevels((prev) => {
      const next = new Map(prev);
      const conceptLevels = next.get(conceptId) || new Set();
      const updated = new Set(conceptLevels);
      
      if (updated.has(level)) {
        updated.delete(level);
      } else {
        updated.add(level);
      }
      
      next.set(conceptId, updated);
      return next;
    });
  };

  const isLevelOpen = (conceptId: string, level: string) => {
    return openLevels.get(conceptId)?.has(level) || false;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Web3 Concepts Dictionary</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore key concepts at four levels of understanding, from simple explanations to deep technical insights.
        </p>

        {/* Legend */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">Understanding Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.eli5.emoji}</span>
              <div>
                <div className="font-semibold">{LEVELS.eli5.name}</div>
                <div className="text-sm text-gray-600">Simple explanation</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.builder.emoji}</span>
              <div>
                <div className="font-semibold">{LEVELS.builder.name}</div>
                <div className="text-sm text-gray-600">Practical overview</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.engineer.emoji}</span>
              <div>
                <div className="font-semibold">{LEVELS.engineer.name}</div>
                <div className="text-sm text-gray-600">Technical details</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.developer.emoji}</span>
              <div>
                <div className="font-semibold">{LEVELS.developer.name}</div>
                <div className="text-sm text-gray-600">Deep dive</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{LEVELS.questions.emoji}</span>
              <div>
                <div className="font-semibold">{LEVELS.questions.name}</div>
                <div className="text-sm text-gray-600">Reflection prompts</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {/* Concepts */}
        {concepts.map((concept) => {
          const isOpen = openConcepts.has(concept.id);
          
          return (
            <div
              key={concept.id}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Concept Header */}
              <button
                onClick={() => toggleConcept(concept.id)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
              >
                <div>
                  <h2 className="text-2xl font-bold">{concept.title}</h2>
                  {concept.subtitle && (
                    <p className="text-sm text-gray-500 mt-1 italic">{concept.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="text-lg">{LEVELS.eli5.emoji}</span>
                    <span className="text-lg">{LEVELS.builder.emoji}</span>
                    <span className="text-lg">{LEVELS.engineer.emoji}</span>
                    <span className="text-lg">{LEVELS.developer.emoji}</span>
                    <span className="text-lg">{LEVELS.questions.emoji}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Concept Content */}
              {isOpen && (
                <div className="p-6 space-y-4 transition-all duration-200">
                  {/* Level Buttons */}
                  <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
                    <button
                      onClick={() => toggleLevel(concept.id, 'eli5')}
                      className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isLevelOpen(concept.id, 'eli5')
                          ? `${LEVELS.eli5.bgColor} ${LEVELS.eli5.textColor} font-semibold`
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-xl">{LEVELS.eli5.emoji}</span>
                      <span>{LEVELS.eli5.name}</span>
                    </button>
                    <button
                      onClick={() => toggleLevel(concept.id, 'builder')}
                      className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isLevelOpen(concept.id, 'builder')
                          ? `${LEVELS.builder.bgColor} ${LEVELS.builder.textColor} font-semibold`
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-xl">{LEVELS.builder.emoji}</span>
                      <span>{LEVELS.builder.name}</span>
                    </button>
                    <button
                      onClick={() => toggleLevel(concept.id, 'engineer')}
                      className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isLevelOpen(concept.id, 'engineer')
                          ? `${LEVELS.engineer.bgColor} ${LEVELS.engineer.textColor} font-semibold`
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-xl">{LEVELS.engineer.emoji}</span>
                      <span>{LEVELS.engineer.name}</span>
                    </button>
                    <button
                      onClick={() => toggleLevel(concept.id, 'developer')}
                      className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isLevelOpen(concept.id, 'developer')
                          ? `${LEVELS.developer.bgColor} ${LEVELS.developer.textColor} font-semibold`
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-xl">{LEVELS.developer.emoji}</span>
                      <span>{LEVELS.developer.name}</span>
                    </button>
                    <button
                      onClick={() => toggleLevel(concept.id, 'questions')}
                      className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isLevelOpen(concept.id, 'questions')
                          ? `${LEVELS.questions.bgColor} ${LEVELS.questions.textColor} font-semibold`
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-xl">{LEVELS.questions.emoji}</span>
                      <span>{LEVELS.questions.name}</span>
                    </button>
                  </div>

                  {/* Level Content */}
                  <div className="space-y-4">
                    {isLevelOpen(concept.id, 'eli5') && (
                      <div className={`${LEVELS.eli5.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.eli5.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.eli5.emoji}</span>
                          <span>{LEVELS.eli5.name}</span>
                        </h3>
                        <div className="prose prose-lg">{concept.eli5}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'builder') && (
                      <div className={`${LEVELS.builder.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.builder.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.builder.emoji}</span>
                          <span>{LEVELS.builder.name}</span>
                        </h3>
                        <div className="prose prose-lg">{concept.builder}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'engineer') && (
                      <div className={`${LEVELS.engineer.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.engineer.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.engineer.emoji}</span>
                          <span>{LEVELS.engineer.name}</span>
                        </h3>
                        <div className="prose prose-lg">{concept.engineer}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'developer') && (
                      <div className={`${LEVELS.developer.bgColor} p-6 rounded-lg transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-3 ${LEVELS.developer.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.developer.emoji}</span>
                          <span>{LEVELS.developer.name}</span>
                        </h3>
                        <div className="prose prose-lg">{concept.developer}</div>
                      </div>
                    )}
                    {isLevelOpen(concept.id, 'questions') && (
                      <div className={`${LEVELS.questions.bgColor} p-6 rounded-lg border-l-4 border-gray-400 transition-all duration-200`}>
                        <h3 className={`text-xl font-semibold mb-4 ${LEVELS.questions.textColor} flex items-center gap-2`}>
                          <span>{LEVELS.questions.emoji}</span>
                          <span>{LEVELS.questions.name}</span>
                        </h3>
                        <div className="prose prose-lg">{concept.questions}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Cross-Cutting Questions */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenCrossCutting(!openCrossCutting)}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
          >
            <div>
              <h2 className="text-2xl font-bold">Cross-Cutting Questions</h2>
              <p className="text-sm text-gray-500 mt-1 italic">These work after any concept.</p>
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
                <div className="prose prose-lg">{crossCuttingQuestions}</div>
              </div>
            </div>
          )}
        </div>

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
