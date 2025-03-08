// hooks/useWebflow.ts
import { useState, useEffect } from 'react';

interface WebflowAPI {
  push: (callback: () => void) => void;
  getSelectedElement: () => Promise<any>;
  elementPresets: {
    DivBlock: any;
  };
}

declare global {
  interface Window {
    Webflow?: WebflowAPI;
  }
}

export const useWebflow = () => {
  const [webflow, setWebflow] = useState<WebflowAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeWebflow = async () => {
      try {
        // Check if we're in Webflow context
        const isWebflowContext = 
          window.location.href.includes('webflow.com') || 
          window.location.href.includes('localhost') ||
          window.parent?.location.href.includes('webflow.com');

        if (!isWebflowContext) {
          throw new Error('This app must be run within the Webflow Designer.');
        }

        // Wait for Webflow API
        let attempts = 0;
        const maxAttempts = 50;

        while (attempts < maxAttempts) {
          const webflowAPI = window.Webflow || window.parent?.Webflow;
          if (webflowAPI) {
            window.Webflow = webflowAPI;
            setWebflow(webflowAPI);
            setIsLoading(false);
            return;
          }
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        throw new Error('Failed to initialize Webflow API after 5 seconds');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setIsLoading(false);
      }
    };

    initializeWebflow();
  }, []);

  return { webflow, isLoading, error };
};