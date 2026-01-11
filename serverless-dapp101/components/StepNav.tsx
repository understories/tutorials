'use client';

import { useState } from 'react';
import Link from 'next/link';
import { steps } from '../content/config';

export function StepNav({ currentStepId }: { currentStepId: string }) {
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const currentIndex = steps.findIndex(s => s.id === currentStepId);
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  const handleClick = (stepId: string) => {
    setNavigatingTo(stepId);
    // Reset after a delay (navigation will complete and component will re-render)
    setTimeout(() => setNavigatingTo(null), 2000);
  };

  return (
    <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
      {prevStep ? (
        <Link
          href={`/${prevStep.id}`}
          onClick={() => handleClick(prevStep.id)}
          className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
            navigatingTo === prevStep.id ? 'opacity-50 cursor-wait' : ''
          }`}
          prefetch={true}
        >
          {navigatingTo === prevStep.id ? 'Loading...' : `← Previous: ${prevStep.title}`}
        </Link>
      ) : (
        <div />
      )}
      {nextStep && (
        <Link
          href={`/${nextStep.id}`}
          onClick={() => handleClick(nextStep.id)}
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold ${
            navigatingTo === nextStep.id ? 'opacity-50 cursor-wait' : ''
          }`}
          prefetch={true}
        >
          {navigatingTo === nextStep.id ? 'Loading...' : `Next: ${nextStep.title} →`}
        </Link>
      )}
    </div>
  );
}

