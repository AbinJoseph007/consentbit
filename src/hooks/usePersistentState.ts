import { useState, useEffect } from 'react';

function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const savedState = localStorage.getItem(key);
      if (!savedState || savedState === "undefined") return defaultValue;
      return JSON.parse(savedState);
    } catch (e) {
      console.warn(`Failed to parse localStorage key "${key}":`, e);
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
