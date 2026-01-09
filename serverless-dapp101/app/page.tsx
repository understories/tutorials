'use client';

import Link from 'next/link';

export default function WorkshopTutorialHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your First Arkiv App
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            A 1-hour hands-on workshop to deploy a decentralized app
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              What You'll Build
            </h2>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Deploy a simple micro-app that uses Arkiv (decentralized database)</li>
              <li>Read and write data to Arkiv</li>
              <li>Verify your data on the blockchain explorer</li>
              <li>Experience the "walkaway test" - data persists independently</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🤖 Vibe Path</h3>
              <p className="text-sm text-gray-600">
                Use AI coding assistants (Cursor, Copilot, Claude) to help you build. Copy-paste prompts provided.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">✋ Manual Path</h3>
              <p className="text-sm text-gray-600">
                Follow step-by-step instructions. No AI needed.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Prerequisites</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✅ Node.js (v18+)</li>
              <li>✅ Git</li>
              <li>✅ Code editor</li>
              <li>✅ AI agent (optional - we recommend Cursor)</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link
              href="/01-quick-start"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Tutorial →
            </Link>
            <Link
              href="/hello-world"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              See Hello World Demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

