'use client';

import { useState } from 'react';

interface VisualAidProps {
  type?: 'diagram' | 'flow' | 'comparison' | 'structure';
  src: string;
  alt: string;
  detailed?: boolean;
  interactive?: boolean;
  className?: string;
}

export function VisualAid({ 
  type = 'diagram',
  src, 
  alt, 
  detailed = false,
  interactive = false,
  className = ''
}: VisualAidProps) {
  const [showDetailed, setShowDetailed] = useState(detailed);
  
  // Determine if there's a detailed version available
  const baseSrc = src.replace('-detailed.svg', '.svg').replace('-detailed', '');
  const detailedSrc = baseSrc.replace('.svg', '-detailed.svg');
  
  // Check if detailed version exists (this would need to be handled server-side or via API)
  // For now, we'll assume detailed versions follow the naming convention
  const hasDetailedVersion = interactive && baseSrc !== detailedSrc;

  return (
    <div className={`my-8 ${className}`}>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm overflow-visible">
          <div className="relative w-full overflow-visible" style={{ minHeight: '200px' }}>
            <img
              src={showDetailed && hasDetailedVersion ? detailedSrc : baseSrc}
              alt={alt}
              className="w-full h-auto"
              style={{ objectFit: 'contain', maxWidth: '100%' }}
            />
          </div>
          
          {hasDetailedVersion && interactive && (
            <button
              onClick={() => setShowDetailed(!showDetailed)}
              className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
              aria-label={showDetailed ? 'Show basic view' : 'Show detailed view'}
            >
              {showDetailed ? '← Show Basic View' : 'Show Detailed View →'}
            </button>
          )}
        </div>
        
        {/* Accessibility: Hidden description for screen readers */}
        <div className="sr-only">
          <p>{alt}</p>
        </div>
      </div>
    </div>
  );
}
