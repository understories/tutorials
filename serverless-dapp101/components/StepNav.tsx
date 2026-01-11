'use client';

import Link from 'next/link';
import { steps } from '../content/config';
import { useProgress } from './ProgressProvider';

export function StepNav({ currentStepId }: { currentStepId: string }) {
  const currentIndex = steps.findIndex(s => s.id === currentStepId);
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
      {prevStep ? (
        <Link
          href={`/${prevStep.id}`}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Previous: {prevStep.title}
        </Link>
      ) : (
        <div />
      )}
      {nextStep && (
        <Link
          href={`/${nextStep.id}`}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Next: {nextStep.title} →
        </Link>
      )}
    </div>
  );
}

