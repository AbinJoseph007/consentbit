const base_url = "https://cb-server.web-8fb.workers.dev";
import { ScriptCategory, SaveCategoriesResponse } from '../types/types';
import { scriptCategorizationService } from './script-categorization-service';
import { ClientEncryption } from '../util/Secure-Data';
// import { ClientSecurity } from '../util/Security';

// const base_url = "https://consent-bit-server.web-8fb.workers.dev"

import { ScriptRegistrationRequest, CodeApplication } from "../types/types";
import {FetchAnalyticsScript} from '../util/Script-Fetch'


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
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in registerAnalyticsBlockingScript:', error);
      throw error;
    }
  },
/////////////////////for the custom toggle
  registerCustomToggle: async (token: string, siteId: string) => {
    try {
      console.log('Starting API call for custom toggle with:', { siteId });

      const response = await fetch(
        `${base_url}/api/custom-code/customtoggle?siteId=${encodeURIComponent(siteId)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in registerAnalyticsBlockingScript:', error);
      throw error;
    }
  },
///////////////for the page scroll
  registerScrollScript: async (token: string, siteId: string) => {
    try {
      console.log('Starting API call for custom toggle with:', { siteId });

      const response = await fetch(
        `${base_url}/api/custom-code/pagescroll?siteId=${encodeURIComponent(siteId)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in registerAnalyticsBlockingScript:', error);
      throw error;
    }
  },



//save categorized script

saveScriptCategorizations:  async ( token: string, categorizations: ScriptCategory[]) => {
  return scriptCategorizationService.saveScriptCategorizations( token, categorizations);
},


updateScriptCategorizations: async (siteId: string, token: string, newCategorizations: ScriptCategory[]) => {
  return scriptCategorizationService.updateScriptCategorizations( token, newCategorizations);
},


  // Get list of registered scripts
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
    console.log(params);
    return response.json();
  },




// src/services/api.ts
analyticsScript: async (token: string) => {
  try {
    // Validate token
    if (!token) {
      throw new Error("Token is required");
    }

    const url = `${base_url}/api/analytics`;
    console.log("Requesting URL:", url);

    // Call the API endpoint with authentication
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
    console.log("Analytics Response:", data);

    // Validate response structure
    if (!data.success) {
      throw new Error(data.error || "Invalid response from server");
    }

    // /// Process and decrypt scripts
    // const { scripts, error } = ClientSecurity.processAnalyticsResponse(data);
    
    // if (error) {
    //   console.error("Error processing scripts:", error);
    //   return {
    //     success: false,
    //     error: error,
    //     data: null
    //   };
    // }

    // Return the processed data with decrypted scripts
    return {
      success: Boolean(data.success),
      data: {
        ...data,
        analyticsScripts: Array.isArray(data.analyticsScripts) ? data.analyticsScripts : []
      }
    };
    
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