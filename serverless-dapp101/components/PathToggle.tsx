'use client';

import { useState } from 'react';

type Path = 'vibe' | 'manual';

interface PathToggleProps {
  defaultPath: Path;
  onPathChange?: (path: Path) => void;
}

export function PathToggle({ defaultPath, onPathChange }: PathToggleProps) {
  const [path, setPath] = useState<Path>(defaultPath);

  const handleChange = (newPath: Path) => {
    setPath(newPath);
    onPathChange?.(newPath);
  };

  return (
    <div className="flex gap-2 mb-6 p-2 bg-gray-100 rounded-lg">
      <button
        onClick={() => handleChange('vibe')}
        className={`flex-1 px-4 py-2 rounded transition-colors ${
          path === 'vibe'
            ? 'bg-blue-500 text-white font-semibold'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        🤖 AI-Assisted Path
      </button>
      <button
        onClick={() => handleChange('manual')}
        className={`flex-1 px-4 py-2 rounded transition-colors ${
          path === 'manual'
            ? 'bg-blue-500 text-white font-semibold'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        ✋ Manual Path
      </button>
    </div>
  );
}

