'use client';

import { useEffect } from 'react';
import { useProgress } from './ProgressProvider';

interface CheckpointProps {
  stepId: string;
  items: string[];
}

export function Checkpoint({ stepId, items }: CheckpointProps) {
  const { markStepComplete, setCheckpointState, setCheckboxState, getCheckboxState } = useProgress();

  const handleCheck = (index: number) => {
    const currentChecked = getCheckboxState(stepId, index);
    const newChecked = !currentChecked;
    
    // Update individual checkbox state
    setCheckboxState(stepId, index, newChecked);
    
    // Check if all items are checked (after this update)
    // We need to check all items including the one we just toggled
    const allChecked = items.every((_, i) => {
      if (i === index) {
        return newChecked;
      }
      return getCheckboxState(stepId, i);
    });
    
    // Update checkpoint state (for Next button enable/disable)
    setCheckpointState(stepId, allChecked);
    
    // Mark step complete if all items checked
    if (allChecked) {
      markStepComplete(stepId);
    }
  };

  // Initialize checkpoint state on mount
  useEffect(() => {
    const allChecked = items.every((_, i) => getCheckboxState(stepId, i));
    setCheckpointState(stepId, allChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId, items.length]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
      <h3 className="font-semibold text-blue-900 mb-4">✓ Checkpoint</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={getCheckboxState(stepId, index)}
                onChange={() => handleCheck(index)}
                className="mt-1 mr-3 w-5 h-5 text-blue-600 cursor-pointer flex-shrink-0"
              />
              <span className="text-blue-800 group-hover:text-blue-900">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

