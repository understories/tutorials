'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressContextType {
  completedSteps: string[];
  checkpointStates: Record<string, boolean>; // stepId -> all checkboxes checked
  startTime: number | null;
  markStepComplete: (stepId: string) => void;
  setCheckpointState: (stepId: string, allChecked: boolean) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [checkpointStates, setCheckpointStates] = useState<Record<string, boolean>>({});
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('workshop-progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedSteps(data.completedSteps || []);
        setCheckpointStates(data.checkpointStates || {});
        setStartTime(data.startTime || null);
      } catch (e) {
        // Invalid data, start fresh
        setStartTime(Date.now());
      }
    } else {
      // Start timer
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    if (startTime !== null) {
      localStorage.setItem('workshop-progress', JSON.stringify({
        completedSteps,
        checkpointStates,
        startTime,
      }));
    }
  }, [completedSteps, checkpointStates, startTime]);

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      if (prev.includes(stepId)) return prev;
      return [...prev, stepId];
    });
  };

  const setCheckpointState = (stepId: string, allChecked: boolean) => {
    setCheckpointStates(prev => ({
      ...prev,
      [stepId]: allChecked,
    }));
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    setCheckpointStates({});
    setStartTime(Date.now());
    localStorage.removeItem('workshop-progress');
  };

  return (
    <ProgressContext.Provider
      value={{ 
        completedSteps, 
        checkpointStates,
        startTime, 
        markStepComplete, 
        setCheckpointState,
        resetProgress 
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}

