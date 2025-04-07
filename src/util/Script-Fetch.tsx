// src/util/Script-Fetch.tsx
interface AnalyticsScript {
  src: string;
  type: string;
  async: boolean;
  defer: boolean;
}

interface AnalyticsResult {
  analyticsScripts: AnalyticsScript[];
  totalScripts: number;
  totalAnalyticsScripts: number;
}

export const FetchAnalyticsScript = async (siteUrl: string): Promise<AnalyticsResult> => {
  try {
    // Fetch the page content
    const response = await fetch(siteUrl);
    const html = await response.text();

    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Get all script tags
    const scripts = doc.getElementsByTagName('script');
    const analyticsScripts: AnalyticsScript[] = [];

    // Common analytics script patterns
    const analyticsPatterns = [
      'google-analytics.com',
      'gtag.js',
      'hotjar.com',
      'mixpanel.com',
      'segment.io',
      'amplitude.com',
      'heap.io',
      'intercom.io',
      'drift.com',
      'crisp.chat',
      'zendesk.com',
      'hubspot.com',
      'mailchimp.com',
      'facebook.com/tr',
      'linkedin.com/insight',
      'twitter.com/analytics',
      'pinterest.com/tag',
      'tiktok.com/analytics',
      'snap.com/analytics',
      'reddit.com/analytics'
    ];

    // Process each script
    Array.from(scripts).forEach(script => {
      const src = script.getAttribute('src') || '';
      const type = script.getAttribute('type') || '';
      const async = script.hasAttribute('async');
      const defer = script.hasAttribute('defer');

      // Check if it's an analytics script
      const isAnalytics = analyticsPatterns.some(pattern => 
        src.toLowerCase().includes(pattern.toLowerCase())
      );

      if (isAnalytics) {
        analyticsScripts.push({
          src,
          type,
          async,
          defer
        });
      }
    });

    return {
      analyticsScripts,
      totalScripts: scripts.length,
      totalAnalyticsScripts: analyticsScripts.length
    };
  } catch (error) {
    console.error('Error fetching analytics scripts:', error);
    throw error;
  }
};