'use client';

import Link from 'next/link';

export default function WorkshopTutorialHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Exit AWS: Building Serverless Apps
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Hands-on workshop on building a serverless app with a decentralized database so your app is never hit with a Cloudflare outage again.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              What You'll Build
            </h2>
            <p className="text-blue-800 mb-3">
              Deploy a simple micro-app that uses Arkiv, a decentralized database. Learn about data sovereignty, walkaway tests, and building applications that survive their creators.
            </p>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Read and write data to Arkiv</li>
              <li>Verify your data on the blockchain explorer</li>
              <li>Experience the walkaway test. Data persists independently</li>
              <li>Build an app that passes the walkaway test</li>
            </ul>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-indigo-900 mb-3">
              Topics Covered
            </h2>
            <ul className="list-disc list-inside text-indigo-800 space-y-1">
              <li>Data sovereignty and user-controlled data</li>
              <li>Decentralized databases and their tradeoffs</li>
              <li>Full stack Web3 applications that pass the walkaway test</li>
              <li>Using Arkiv to replace traditional app servers for many use cases</li>
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
            <p className="text-sm text-yellow-800 mb-2">
              No technical experience required. You can "vibe" or do it by hand. We provide materials for you and your agents to deploy your own application within the hour.
            </p>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✅ Node.js (v18+)</li>
              <li>✅ Git</li>
              <li>✅ Code editor</li>
              <li>✅ AI agent (optional. We recommend Cursor)</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Outcome:</strong> Each participant deploys a simple micro-app. Learn about decentralized data by building your own dapp.
            </p>
            <p className="text-sm text-green-800 mt-2">
              Please bring your own tools and experience with building Web3 applications to share as well. Go far, go together.
            </p>
          </div>

          <div className="border-t pt-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              This tutorial website was built for the{' '}
              <a 
                href="https://luma.com/y5gjkz18" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Exit AWS: Building Serverless Apps workshop
              </a>
              . However, we hope that it passes the walkaway test itself.
            </p>
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

