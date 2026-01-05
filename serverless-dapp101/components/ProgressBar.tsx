'use client';

import { steps } from '../content/config';
import { useProgress } from './ProgressProvider';

export function ProgressBar({ currentStepId }: { currentStepId: string }) {
  const { completedSteps } = useProgress();
  const currentIndex = steps.findIndex(s => s.id === currentStepId);
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / steps.length) * 100 : 0;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Step {currentIndex + 1} of {steps.length}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

