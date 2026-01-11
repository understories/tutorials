import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Web3 Software Supply Chain Security</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-sm text-gray-700">
            This guide is based on research from{' '}
            <a 
              href="https://arxiv.org/pdf/2511.12274" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Software Supply Chain Security of Web3
            </a>
            {' '}by Martin Monperrus (KTH Royal Institute of Technology).
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Why Web3 Supply Chain Security Matters</h2>
          <p className="mb-4">
            Web3 applications manage billions of dollars through decentralized applications and smart contracts. 
            Unlike traditional web applications where security failures result in data breaches, vulnerabilities 
            in Web3 systems directly translate to <strong>irreversible financial losses</strong>. The unique 
            properties of blockchain technology amplify the consequences of supply chain attacks.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="font-semibold text-red-800 mb-2">Real-World Impact:</p>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              <li>$625 million lost in the Ronin Network bridge hack</li>
              <li>2025 Bybit attack leveraged compromised frontend JavaScript dependencies</li>
              <li>Attacks can result in permanent, irreversible fund transfers</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Unique Properties of Web3 Systems</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Immutability</h3>
              <p className="text-sm text-yellow-700">
                Deployed smart contracts cannot be patched or updated without complex upgrade mechanisms. 
                Vulnerabilities become permanent without careful planning.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Transparency</h3>
              <p className="text-sm text-blue-700">
                All contract code and state are publicly visible. Attackers can study systems before 
                exploiting them, eliminating "security through obscurity."
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Finality</h3>
              <p className="text-sm text-red-700">
                Once a transaction is confirmed, it cannot be undone. Any exploit leading to fund 
                transfers is permanent with no recourse.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Threat Vectors Across the Stack</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">1. Blockchain Node Infrastructure</h3>
              <p className="text-gray-700 mb-2">
                Compromised RPC endpoints can manipulate blockchain state visible to applications, 
                returning false data or censoring transactions.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">2. Smart Contract Dependencies</h3>
              <p className="text-gray-700 mb-2">
                Malicious smart contract library upgrades simultaneously affect all dependent contracts. 
                Proxy patterns and upgradeable contracts introduce additional attack surfaces.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">3. Frontend Libraries</h3>
              <p className="text-gray-700 mb-2">
                Frontend dependency poisoning enables transaction parameter modification that bypasses 
                user review. Compromised npm packages can modify wallet interactions.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">4. Wallet Software</h3>
              <p className="text-gray-700 mb-2">
                Compromised wallet extensions or applications can exfiltrate private keys or modify 
                transactions before signing.
              </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">5. Development Tools</h3>
              <p className="text-gray-700 mb-2">
                Malicious VS Code extensions, build tools, or compiler backdoors can introduce 
                vulnerabilities during development or deployment.
              </p>
            </div>
            
            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">6. Hosting Infrastructure</h3>
              <p className="text-gray-700 mb-2">
                Compromised CDNs, IPFS gateways, or deployment pipelines can serve malicious frontend 
                code to users.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Questions for Developers</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Dependency Management</h3>
            <ul className="space-y-3 list-none">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Have I audited all direct dependencies, especially those handling wallet interactions or transaction construction?</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Do I understand the transitive dependencies in my dependency tree?</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Are my dependency versions pinned to specific commits or hashes?</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Have I verified the integrity of downloaded packages using checksums or signatures?</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Do I monitor for security advisories and updates to my dependencies?</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Smart Contract Security</h3>
            <ul className="space-y-3 list-none">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Have I reviewed all smart contract libraries I'm using, especially upgradeable ones?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Do I understand the upgrade mechanism for any proxy contracts I'm deploying?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Have I implemented multi-signature controls for contract deployments and upgrades?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Can I verify that my deployed bytecode matches my source code (reproducible builds)?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Have I conducted specialized smart contract security audits before mainnet deployment?</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Frontend Security</h3>
            <ul className="space-y-3 list-none">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Are my frontend dependencies, especially wallet connection libraries, from trusted sources?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Do I validate transaction parameters before presenting them to users for signing?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Am I using Content Security Policy (CSP) headers to prevent XSS attacks?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Have I implemented transaction simulation to show users the actual effects before signing?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Is my frontend code served from a trusted CDN or IPFS gateway?</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">RPC and Infrastructure</h3>
            <ul className="space-y-3 list-none">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Am I using trusted RPC endpoints, or do I operate my own nodes?</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Do I validate RPC responses or do I trust them implicitly?</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Have I secured my deployment keys and private keys used for contract deployment?</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Is my CI/CD pipeline secured against unauthorized access or tampering?</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Do I have monitoring in place to detect anomalous on-chain activity?</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Questions for AI Agents</h2>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <p className="mb-4 text-gray-700">
              When working with AI coding assistants, ensure they consider Web3 security implications:
            </p>
            
            <ul className="space-y-3 list-none">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Have you verified the security of all dependencies you're suggesting I add?"</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Are you using the latest, audited versions of Web3 libraries?"</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Does this code handle transaction parameter validation before user signing?"</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Have you considered the implications of immutability for this smart contract design?"</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Is this code vulnerable to frontend dependency poisoning attacks?"</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Are you suggesting any code that could be exploited if a dependency is compromised?"</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Does this implementation follow defense-in-depth principles for Web3?"</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span><strong>"Have you considered how this code would behave if an RPC endpoint is compromised?"</strong></span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Mitigation Strategies</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Technical Controls</h3>
              <ul className="list-disc list-inside text-green-700 space-y-1">
                <li>Dependency verification using checksums and signatures</li>
                <li>Reproducible builds for smart contracts</li>
                <li>Multi-signature deployment controls</li>
                <li>Transaction simulation before user signing</li>
                <li>Content Security Policy (CSP) headers</li>
                <li>Diverse double-compiling for critical software</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Process Improvements</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Specialized smart contract security audits</li>
                <li>Incident response plans for supply chain compromises</li>
                <li>Regular dependency audits and updates</li>
                <li>Code review processes focused on supply chain risks</li>
                <li>Secure key management practices</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Continuous Monitoring</h3>
              <ul className="list-disc list-inside text-purple-700 space-y-1">
                <li>Frontend dependency monitoring for known vulnerabilities</li>
                <li>On-chain runtime surveillance (Tenderly, Forta)</li>
                <li>Automated alerts for unexpected contract upgrades</li>
                <li>Transaction pattern analysis</li>
                <li>Monitoring for anomalous deployment address activity</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Key Takeaways</h2>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <ul className="space-y-2 list-none">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">→</span>
                <span><strong>Web3 supply chain attacks have catastrophic, irreversible consequences</strong> - unlike Web2, there's no rollback mechanism</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">→</span>
                <span><strong>Every layer of the stack is vulnerable</strong> - from RPC endpoints to frontend dependencies</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">→</span>
                <span><strong>Transparency doesn't mean security</strong> - public code makes systems easier to study and exploit</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">→</span>
                <span><strong>Defense-in-depth is essential</strong> - combine technical controls, audits, and monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">→</span>
                <span><strong>Verify, don't trust</strong> - validate dependencies, RPC responses, and transaction parameters</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://arxiv.org/pdf/2511.12274" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Software Supply Chain Security of Web3 (Full Paper)
              </a>
              {' '}- Martin Monperrus, KTH Royal Institute of Technology
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
