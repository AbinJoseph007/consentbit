// components/CookieBanner.tsx
import React, { useState } from 'react';
import { useWebflow } from '../hooks/useWebflow';

export const CookieBanner: React.FC = () => {
  const { webflow, isLoading, error } = useWebflow();
  const [status, setStatus] = useState<string>('');

  const handleAddBanner = async () => {
    try {
      if (!webflow) {
        throw new Error('Webflow API not available');
      }

      setStatus('Getting selected element...');
      const selectedElement = await webflow.getSelectedElement();

      if (!selectedElement) {
        throw new Error('Please select an element in the Webflow Designer first.');
      }

      setStatus('Creating banner...');
      const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);

      if (!newDiv) {
        throw new Error('Failed to create new div element');
      }

      setStatus('Adding banner content...');
      await newDiv.setInnerHTML(`
        <div class="cookie-banner" style="
          transition: transform 0.5s ease, opacity 0.5s ease;
          position: fixed;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: white;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
          text-align: center;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        ">
          <div style="margin-bottom: 15px;">
            <h4 style="margin: 0 0 10px 0; color: white;">Cookie Setting</h4>
            <p style="margin: 0; font-size: 14px;">
              We use cookies to provide you with the best possible experience. 
              They also allow us to analyze user behavior in order to constantly improve the website for you.
            </p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button onclick="event.preventDefault();" style="
              padding: 8px 16px;
              border: none;
              border-radius: 4px;
              background: #666;
              color: white;
              cursor: pointer;
              font-size: 14px;
              transition: background 0.3s;
            ">Preferences</button>
            <button onclick="event.preventDefault();" style="
              padding: 8px 16px;
              border: none;
              border-radius: 4px;
              background: #666;
              color: white;
              cursor: pointer;
              font-size: 14px;
              transition: background 0.3s;
            ">Reject</button>
            <button onclick="event.preventDefault();" style="
              padding: 8px 16px;
              border: none;
              border-radius: 4px;
              background: #4CAF50;
              color: white;
              cursor: pointer;
              font-size: 14px;
              transition: background 0.3s;
            ">Accept All</button>
          </div>
        </div>
      `);

      setStatus('Banner added successfully!');
    } catch (err) {
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
    }
  };

  if (isLoading) {
    return <div>Loading Webflow API...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cookie-banner-controls">
      <button 
        onClick={handleAddBanner}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add Cookie Banner
      </button>
      {status && <div style={{ marginTop: '10px' }}>{status}</div>}
    </div>
  );
};