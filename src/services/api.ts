const base_url = "https://cb-server.web-8fb.workers.dev";
import { ScriptCategory, SaveCategoriesResponse, AppData } from '../types/types';
import { scriptCategorizationService } from './script-categorization-service';
import { ClientEncryption } from '../util/Secure-Data';

import { ScriptRegistrationRequest, CodeApplication } from "../types/types";

export const customCodeApi = {
  // Register a new script
  registerScript: async (params: ScriptRegistrationRequest, token: string) => {
    const response = await fetch(`${base_url}/api/custom-code/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return response.json();
  },


  //blocking script registration
  registerAnalyticsBlockingScript: async (token: string) => {
    try {
      const response = await fetch(`${base_url}/api/custom-code/apply-custom-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in registerAnalyticsBlockingScript:', error);
      throw error;
    }
  },


  exportCSV: async (token: string) => {
    try {
      const response = await fetch(`${base_url}/api/export-consent-csv`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/csv',
        },
      });
      const fullResponse = response; 
      if (!response.ok) {
        let errorDetails = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetails += ` - ${errorData.error || 'Unknown API error'}`;
        } catch (e) {
          errorDetails += ` - ${await response.text()}`;
        }
        console.error('Error response details:', errorDetails);
        throw new Error(errorDetails);
      }
      const csvData = await response.text();
      return { csvData, response: fullResponse };
    } catch (error) {
      console.error('Error in exportCSV API call:', error);
      throw error; 
    }
  },

  saveBannerStyles: async (token: string, appData: AppData) => {
    try {
      const response = await fetch(`${base_url}/api/app-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appData: appData,
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in  saving app data', error);
      throw error;
    }
  },

  getBannerStyles: async (token: string) => {
    try {
      const response = await fetch(`${base_url}/api/app-details`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getting app data', error);
      throw error;
    }
  },


  //save categorized script
  saveScriptCategorizations: async (token: string, categorizations: ScriptCategory[]) => {
    return scriptCategorizationService.saveScriptCategorizations(token, categorizations);
  },

  updateScriptCategorizations: async (siteId: string, token: string, newCategorizations: ScriptCategory[]) => {
    return scriptCategorizationService.updateScriptCategorizations(token, newCategorizations);
  },

  getScripts: async (siteId: string, token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/register?siteId=${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Apply script to site or page
  applyScript: async (params: CodeApplication, token: string) => {
    const response = await fetch(`${base_url}/api/custom-code/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    // console.log(params);
    return response.json();
  },

  // src/services/api.ts
  analyticsScript: async (token: string) => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      const url = `${base_url}/api/analytics`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch analytics");
      }

      const data = await response.json();
      return {
        success: true,
        ...data
      }

    } catch (error) {
      console.error("Error in analyticsScript:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        data: null
      };
    }
  }
};