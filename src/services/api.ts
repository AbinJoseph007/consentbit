const base_url = "http://localhost:3000";


// const base_url = "https://consent-bit-server.web-8fb.workers.dev"

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
  registerAnalyticsBlockingScript: async (token: string, siteId: string) => {
    try {
      console.log('Starting API call with:', { siteId });

      const response = await fetch(
        `${base_url}/api/custom-code/buttonregister?siteId=${encodeURIComponent(siteId)}`,
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

  //custom code fetching from site head
  analyticsScript: async (token: string) => {
    try {
      // const siteUrl = "https://consentbits-stunning-site.webflow.io/";

      const site = await webflow.getSiteInfo();
      if (!site) {
        throw new Error("site not found")
      }

      // Get the site URL
      const siteUrl = site.shortName ? `https://${site.shortName}.webflow.io` : null;
      if (!siteUrl) {

      }
      const response = await fetch(`${base_url}/api/analytics?siteUrl=${encodeURIComponent(siteUrl)}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from API");
      }
      return JSON.parse(text);
    } catch (error) {
      console.error("Error in analyticsScript:", error);
      return { error: error.message };
    }
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

  // Get status for site
  getSiteStatus: async (siteId: string, token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=site&targetId=${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  ///get custom code
  getcustomcode: async (siteId: string, token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/getcustomcode?siteId=${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Get status for pages
  getPagesStatus: async (pageIds: string[], token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=page&targetIds=${pageIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Get batch status request
  getBatchStatus: async (
    siteId: string,
    pageIds: string[] = [],
    token: string
  ) => {
    try {
      // Validate siteId
      if (!siteId || siteId === "page") {
        console.warn("Invalid siteId provided to getBatchStatus:", siteId);
        return {};
      }

      // If no pageIds provided, just get site status
      if (!pageIds || pageIds.length === 0) {
        const siteStatus = await customCodeApi.getSiteStatus(siteId, token);
        return siteStatus.result || {};
      }

      const batchSize = 5;
      const pagesBatches = [];

      for (let i = 0; i < pageIds.length; i += batchSize) {
        pagesBatches.push(pageIds.slice(i, i + batchSize));
      }

      // Get site status
      const siteStatus = await customCodeApi.getSiteStatus(siteId, token);

      // Get pages status in batches
      const pagesStatus = { result: {} };
      for (const batch of pagesBatches) {
        const batchStatus = await customCodeApi.getPagesStatus(batch, token);
        pagesStatus.result = { ...pagesStatus.result, ...batchStatus.result };
      }

      return {
        ...siteStatus.result,
        ...pagesStatus.result,
      };
    } catch (error) {
      console.error(
        "Error in getBatchStatus:",
        { siteId, pageIdsLength: pageIds?.length },
        error
      );
      return {};
    }
  },
};
