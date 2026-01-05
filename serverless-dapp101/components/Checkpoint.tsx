'use client';

import { useState } from 'react';
import { useProgress } from './ProgressProvider';

interface CheckpointProps {
  stepId: string;
  items: string[];
}

export function Checkpoint({ stepId, items }: CheckpointProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const { markStepComplete } = useProgress();

  const handleCheck = (index: number) => {
    const newChecked = { ...checked, [index]: !checked[index] };
    setChecked(newChecked);
    
    // Mark step complete if all items checked
    const allChecked = items.every((_, i) => newChecked[i]);
    if (allChecked) {
      markStepComplete(stepId);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
      <h3 className="font-semibold text-blue-900 mb-4">✓ Checkpoint</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <input
              type="checkbox"
              checked={checked[index] || false}
              onChange={() => handleCheck(index)}
              className="mt-1 mr-3 w-5 h-5 text-blue-600"
            />
            <span className="text-blue-800">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

