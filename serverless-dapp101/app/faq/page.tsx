import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-sm text-gray-700">
              Answers to questions that came up during the workshop and from the community.
              Where Arkiv documentation backs an answer, links go directly to the relevant page.
            </p>
          </div>

          {/* Where is the data stored? */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Where is the data stored?</h2>
            <p className="mb-4">
              Arkiv data lives on{' '}
              <strong>Layer 3 DB-Chains</strong>. A DB-Chain is an application-specific
              blockchain tailored for structured and unstructured data storage and retrieval. Users
              manage and access entities through familiar CRUD operations (create, read, update,
              delete) exposed via RPC.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="font-semibold mb-2">The three layers:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <strong>L1 (Ethereum Mainnet):</strong> proof verification, commitments, the
                  ultimate source of truth.
                </li>
                <li>
                  <strong>L2 (Arkiv Coordination Layer):</strong> DB-chain registry and
                  deterministic query resolution.
                </li>
                <li>
                  <strong>L3 (DB-Chains):</strong> high-performance CRUD, indexed queries,
                  programmable expiration. This is where your entities physically live.
                </li>
              </ul>
            </div>

            <p className="mb-4">
              Storage is priced in GLM and calculated from data size, expiry time, and current
              storage load. Once an entity's expiration passes, it is removed from the active,
              queryable state of the DB-Chain.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Reference:</strong>{' '}
                <a
                  href="https://docs.arkiv.network/start-here/fundamentals/#architecture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Arkiv Docs &mdash; Fundamentals: Architecture
                </a>
                . Deeper detail on storage economics and DB-Chain configuration is in the{' '}
                <a
                  href="https://arkiv.network/pdf/ARKIV_Litepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Arkiv Litepaper
                </a>
                .
              </p>
            </div>
          </section>

          <hr className="my-8" />

          <h2 className="text-3xl font-bold mb-6 text-gray-900">Community Q&amp;A</h2>

          {/* Compute */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Where is the compute coming from?
            </h3>
            <p className="mb-3">
              Arkiv runs on a 3-layer stack. The actual compute happens at L3, which is a modified
              version of op-geth (the OP Stack execution client). Today the network runs on OVH
              Europe.
            </p>
          </section>

          {/* to: address */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              What is the <code className="bg-gray-100 px-1 rounded">to:</code> address on the tx confirmations?
            </h3>
            <p className="mb-3">
              The <code className="bg-gray-100 px-1 rounded">to:</code> address on transaction
              confirmations is the L3 system contract that processes entity operations. When you
              submit a transaction through the SDK, it gets sent to a system contract on the L3
              chain that handles parsing and executing the typed operations (
              <code className="bg-gray-100 px-1 rounded">createEntity</code>,{' '}
              <code className="bg-gray-100 px-1 rounded">updateEntity</code>, etc.). The address is
              a system-level entry point owned by the protocol. Think of it as the entry point for
              all Arkiv operations on the DB-Chain.
            </p>
          </section>

          {/* Self-hosted nodes */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              What is the roadmap for self-hosted nodes?
            </h3>
            <p className="mb-3">
              This is something we care about deeply because it directly touches web3
              self-sovereignty and permissionlessness. The principle is: reads are free via public
              RPC, and if you need more, you can always run your own node.
            </p>
            <p className="mb-3">
              Right now we are still in testnet. The plan is to allow self-hosted nodes and
              DB-chains as soon as we can. Bear with us on exact timelines here. We don&apos;t want
              to promise dates we can&apos;t hit.
            </p>
          </section>

          {/* Tokenomics */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">What are the tokenomics?</h3>
            <p className="mb-3">
              This was a big discussion. Here&apos;s where we landed: GLM (Golem Network Token) is
              the payment token. We are using GLM instead of launching a new token.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
              <p className="font-semibold mb-2">The current flow:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Acquire GLM on L1 (exchanges, DEXes).</li>
                <li>Bridge GLM to L2 via the standard OP bridge.</li>
                <li>Bridge from L2 to L3, where GLM converts 1:1 to native gas.</li>
                <li>Use that gas for entity operations.</li>
                <li>Withdraw back through the same path (L3 to L2 to L1), converting back to GLM.</li>
              </ol>
            </div>

            <p className="mb-3">
              At some point we&apos;ll enable AA and smart accounts to make this seamless.
            </p>
            <p>
              The foundational pricing model is gas-based. You pay for what you use:
              storage (size x duration) plus compute (per operation).
            </p>
          </section>

          {/* Alternatives */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              What alternatives are there and how do they stack up against Arkiv?
            </h3>
            <p className="mb-3">
              This is a question we&apos;ve spent a lot of time on. The honest answer is: the
              landscape has shifted significantly. Tableland and Ceramic merged into Recall Labs
              and pivoted to AI agent infrastructure. Here is how the field looks right now.
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-3 py-2 text-left">Competitor</th>
                    <th className="border border-gray-200 px-3 py-2 text-left">What they do</th>
                    <th className="border border-gray-200 px-3 py-2 text-left">How they compare</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2 font-semibold">Space and Time</td>
                    <td className="border border-gray-200 px-3 py-2">ZK-verified SQL database, $50M funding, Microsoft backing</td>
                    <td className="border border-gray-200 px-3 py-2">Clearest competitor. They use ZK proofs, we use L2/L3 anchoring. They are enterprise-focused, which may leave the developer/dApp segment underserved.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 font-semibold">Subsquid (SQD)</td>
                    <td className="border border-gray-200 px-3 py-2">Decentralized data lake, 190+ chains, SQL coming</td>
                    <td className="border border-gray-200 px-3 py-2">Mostly an indexer today, expanding into more. Strong in Polkadot.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2 font-semibold">WeaveDB</td>
                    <td className="border border-gray-200 px-3 py-2">NoSQL on Arweave with zkJSON</td>
                    <td className="border border-gray-200 px-3 py-2">Different data model (NoSQL vs structured entities) and different storage philosophy (permanent vs time-scoped).</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 font-semibold">Kwil</td>
                    <td className="border border-gray-200 px-3 py-2">SQL for web3</td>
                    <td className="border border-gray-200 px-3 py-2">Was acquired by TRUF.NETWORK, now focused on financial data only.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="font-semibold mb-2">What makes Arkiv different:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Time-scoped storage economics.</strong> You pay bytes x duration. Nobody
                else does this. Most charge perpetual storage or per-query. For anything with
                ephemeral data (gaming sessions, marketplace listings, social posts), this is a
                fundamentally better model.
              </li>
              <li>
                <strong>Ethereum-native alignment.</strong> Built on OP Stack, anchored to
                Ethereum. Space and Time has their own L1.
              </li>
              <li>
                <strong>Data ownership as a primitive.</strong> Every entity has an on-chain owner.
              </li>
            </ul>
          </section>

          {/* Editing / deletion */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              How does editing / deletion work?
            </h3>
            <p className="mb-3">Pretty straightforward, actually.</p>
            <p className="mb-3">
              <strong>Editing:</strong>{' '}
              <code className="bg-gray-100 px-1 rounded">updateEntity</code> takes an entity key
              and replaces the entire entity atomically. It is a full replacement that preserves
              the entity key.
            </p>
            <p className="mb-3">
              <strong>Deletion:</strong>{' '}
              <code className="bg-gray-100 px-1 rounded">deleteEntity</code> removes the entity
              from the SQLite DB and query index. After deletion, the entity returns 404 when
              queried.
            </p>
            <p className="mb-3">
              The nuance: data stored in the DB-Chain also remains in the transaction history
              (including the fact that the entity existed, what it contained, and when it was
              deleted). You can prove &quot;entity E existed at block N&quot; even after deletion,
              though you would need to rebuild the state up to that point. Deletion removes an
              entity from the active, queryable state while leaving the historical record intact.
            </p>
            <p>Only the owner can edit or delete. This is protocol-enforced.</p>
          </section>

          {/* Non-relational */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Is this like a non-relational database?
            </h3>
            <p className="mb-3">Sort of, though we wouldn&apos;t call it that exactly. It&apos;s its own thing.</p>
            <p className="mb-3">
              Arkiv has a fixed entity schema (rather than user-defined tables). Every entity has
              the same structure: key, owner, payload, attributes, expiration. The payload is a
              blob, and the attributes are indexed key-value pairs you can query against.
            </p>
            <p className="mb-3">
              Arkiv sits between relational and traditional NoSQL. There are no tables, joins,
              foreign keys, or SQL for writes, and no document store semantics either. The closest
              model is a structured key-value store with queryable indexes and ownership semantics.
            </p>
            <p>
              The mental model we&apos;d suggest: think of it as owned database rows with built-in
              expiration. The &quot;rows&quot; here are structured, queryable data units with a
              fixed shape that you don&apos;t define yourself.
            </p>
          </section>

          {/* Privacy / encrypted data */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              How could privacy / encrypted data work on Arkiv?
            </h3>
            <p className="mb-3">
              This is something we&apos;re still thinking through. Here is the honest current state.
            </p>
            <p className="mb-3">
              All entity data is public. Nothing stops you from encrypting the payload before
              storing it. The protocol treats the payload as a bytes blob. Some options:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
              <li>
                <strong>Client-side encryption:</strong> encrypt your payload before calling{' '}
                <code className="bg-gray-100 px-1 rounded">createEntity</code>. Store the encrypted
                blob. Only people with the decryption key can read the actual content. The entity
                metadata (owner, timestamps, attributes) remains visible, while the payload itself
                is opaque.
              </li>
              <li>
                <strong>Attribute-level encryption:</strong> encrypt sensitive string attributes
                while keeping non-sensitive ones in plaintext for querying. You lose the ability to
                query on encrypted attributes (unless querying for exact match).
              </li>
              <li>
                <strong>Integration with access control protocols:</strong> something like Lit
                Protocol (we haven&apos;t tried it ourselves) could manage decryption conditions.
              </li>
            </ul>
            <p className="mb-3">
              The tradeoff is clear: the more you encrypt, the less you can query. Encrypted
              payloads are just blobs. You can&apos;t filter on content you can&apos;t read.
            </p>
            <p>
              A proper privacy layer (something like ZK-based access control) would be significant
              research. We haven&apos;t specced this out. If there is enough demand, it&apos;s
              worth exploring.
            </p>
          </section>

          {/* Shared space ID */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              If we all share a space ID, couldn&apos;t this be an easy attack vector?
            </h3>
            <p className="mb-3">
              Good question. The short answer is: no. A{' '}
              <code className="bg-gray-100 px-1 rounded">spaceId</code> is an application-level
              convention rather than a protocol-level trust boundary. It is a string attribute that
              apps use to isolate their data when querying. It acts as a filter. The actual
              security lives at the entity ownership level.
            </p>
            <p className="font-semibold mb-2">Why sharing a spaceId doesn&apos;t create a meaningful attack surface:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
              <li>
                <strong>Write access is owner-only.</strong> Even if someone knows your spaceId,
                they can&apos;t modify or delete your entities. Only the entity owner can do that.
                Protocol-enforced.
              </li>
              <li>
                <strong>Read access is public anyway.</strong> All data on Arkiv is publicly
                readable regardless of spaceId. Knowing the spaceId doesn&apos;t give you access to
                anything you couldn&apos;t find otherwise.
              </li>
              <li>
                <strong>Spam within a space.</strong> Could someone flood a shared spaceId with
                garbage entities? Technically yes, though they&apos;re paying gas for each entity
                they create. The economic cost of spam makes it impractical at scale.
              </li>
            </ul>
            <p>
              The thing to watch for is at the application layer: if your app naively trusts all
              entities in a spaceId without verifying ownership, that is an app-level bug. The
              protocol itself remains sound. Your app should always verify{' '}
              <code className="bg-gray-100 px-1 rounded">entity.owner</code> matches expected
              addresses.
            </p>
          </section>

          {/* Max payload */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              What is the max size of payload that Arkiv can handle?
            </h3>
            <p className="mb-3">
              Straightforward, with a caveat: the formal size limit as of now is{' '}
              <strong>116KB</strong>.
            </p>
            <p className="mb-3">
              In practice, Arkiv is designed for structured data. Think user profiles, marketplace
              listings, social posts, credentials. Large media (videos, images, documents) should
              live elsewhere.
            </p>
            <p>
              The recommended pattern for large files: store the file on IPFS or Arweave, and store
              the CID / reference as an entity attribute on Arkiv. Nothing prevents you from
              chunking files and rebuilding them at the application layer, though this is outside
              the intended use case.
            </p>
          </section>

          {/* Max TTL */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              What is the max TTL allowed? Is there a limit?
            </h3>
            <p className="mb-3">
              Every entity has a mandatory expiration (
              <code className="bg-gray-100 px-1 rounded">expiresAt</code>), expressed in block
              numbers. You set it via <code className="bg-gray-100 px-1 rounded">expiresIn</code>{' '}
              (in seconds) when creating or extending an entity.
            </p>
            <p className="mb-3">
              Is there a max? Not formally specified yet. You could theoretically set a very long
              TTL (years), though there are economic implications: you are paying{' '}
              <code className="bg-gray-100 px-1 rounded">size_KB x duration_days x STORAGE_RATE</code>{' '}
              upfront. Longer TTL means proportionally higher cost. The pricing model naturally
              disincentivizes extremely long durations without needing a hard cap.
            </p>
            <p className="mb-3">
              That said, there should probably be a protocol-level max TTL to prevent edge cases.
              We will think about this one before going to mainnet.
            </p>
            <p>
              One important nuance: after expiry, entities are removed from the queryable
              database, while the historical data remains on the transaction history. So expiry
              doesn&apos;t mean the data is &quot;gone gone&quot; from the universe, only from the
              active queryable state. Reactivation is unavailable: once an entity is gone, if you
              want it back, you need to re-create it.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-blue-900">
                See{' '}
                <a
                  href="https://docs.arkiv.network/start-here/fundamentals/#expiresin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Arkiv Docs &mdash; expiresIn
                </a>{' '}
                for the canonical reference.
              </p>
            </div>
          </section>

          {/* Costs */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              What are the costs? What will they be when on mainnet?
            </h3>
            <p className="mb-3">
              We&apos;re still actively working on this, so here is the formula and where our heads
              are at, instead of final numbers.
            </p>
            <p className="mb-3">
              The goal is to be competitive while staying realistic about the product category.
              Arkiv is different from a traditional database. You are paying for storage and
              compute, and also for ownership guarantees, tamper-proofing, and cryptographic
              verifiability. The pricing reflects that. We don&apos;t think it&apos;s fair to
              compare us dollar-for-dollar against Firebase or Supabase, because those don&apos;t
              give you any of the web3 guarantees. At the same time, we&apos;re not trying to
              charge &quot;blockchain premium&quot; for the sake of it.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-2">The formula:</p>
              <p className="font-mono text-sm text-gray-800">
                Transaction Cost (GLM) = (Base Fee + Storage Fee + Compute Fee) x Utilization Multiplier
              </p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.arkiv.network/start-here/fundamentals/#architecture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Arkiv Docs: Fundamentals (Architecture)
                </a>
              </li>
              <li>
                <a
                  href="https://arkiv.network/pdf/ARKIV_Litepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Arkiv Litepaper (PDF)
                </a>
              </li>
              <li>
                <Link href="/learn" className="text-blue-600 hover:underline">
                  Back to Learning Resources
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
