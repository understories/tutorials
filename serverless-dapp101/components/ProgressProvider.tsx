'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface ProgressContextType {
  completedSteps: string[];
  checkpointStates: Record<string, boolean>; // stepId -> all checkboxes checked
  checkboxStates: Record<string, Record<number, boolean>>; // stepId -> { index: checked }
  startTime: number | null;
  markStepComplete: (stepId: string) => void;
  setCheckpointState: (stepId: string, allChecked: boolean) => void;
  setCheckboxState: (stepId: string, index: number, checked: boolean) => void;
  getCheckboxState: (stepId: string, index: number) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

// Debounce function for localStorage writes
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [checkpointStates, setCheckpointStates] = useState<Record<string, boolean>>({});
  const [checkboxStates, setCheckboxStates] = useState<Record<string, Record<number, boolean>>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('workshop-progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedSteps(data.completedSteps || []);
        setCheckpointStates(data.checkpointStates || {});
        setCheckboxStates(data.checkboxStates || {});
        setStartTime(data.startTime || null);
      } catch (e) {
        // Invalid data, start fresh
        setStartTime(Date.now());
      }
    } else {
      // Start timer
      setStartTime(Date.now());
    }
    isInitialized.current = true;
  }, []);

  // Debounced save function
  const saveToLocalStorage = useRef(
    debounce((data: {
      completedSteps: string[];
      checkpointStates: Record<string, boolean>;
      checkboxStates: Record<string, Record<number, boolean>>;
      startTime: number | null;
    }) => {
      if (isInitialized.current && data.startTime !== null) {
        localStorage.setItem('workshop-progress', JSON.stringify(data));
      }
    }, 300) // 300ms debounce
  ).current;

  useEffect(() => {
    // Save to localStorage with debouncing
    if (isInitialized.current && startTime !== null) {
      saveToLocalStorage({
        completedSteps,
        checkpointStates,
        checkboxStates,
        startTime,
      });
    }
  }, [completedSteps, checkpointStates, checkboxStates, startTime, saveToLocalStorage]);

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

  const setCheckboxState = (stepId: string, index: number, checked: boolean) => {
    setCheckboxStates(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [index]: checked,
      },
    }));
  };

  const getCheckboxState = (stepId: string, index: number): boolean => {
    return checkboxStates[stepId]?.[index] || false;
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    setCheckpointStates({});
    setCheckboxStates({});
    setStartTime(Date.now());
    localStorage.removeItem('workshop-progress');
  };

  return (
    <ProgressContext.Provider
      value={{ 
        completedSteps, 
        checkpointStates,
        checkboxStates,
        startTime, 
        markStepComplete, 
        setCheckpointState,
        setCheckboxState,
        getCheckboxState,
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

