'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4">
      {filename && (
        <div className="text-sm text-gray-500 mb-1 px-2">{filename}</div>
      )}
      <div className="relative group">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

