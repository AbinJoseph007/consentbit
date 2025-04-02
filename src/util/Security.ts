// src/util/Security.ts
import CryptoJS from 'crypto-js';
import { config } from '../config';

export interface AnalyticsScript {
  src: string | null;
  type: string | null;
  async: boolean;
  defer: boolean;
  content: string | null;
  crossorigin: string | null;
  category: string;
}

export class ClientSecurity {
  private static readonly CLIENT_KEY = config.SCRIPT_ENCRYPTION_KEY;

  /**
   * Decrypts a single encrypted string
   */
  static decryptString(encryptedData: string): string {
    if (!this.CLIENT_KEY) {
      throw new Error('Client encryption key not configured');
    }
    try {
      // Convert base64 to WordArray
      const wordArray = CryptoJS.enc.Base64.parse(encryptedData);
      
      // Extract IV (first 16 bytes)
      const iv = wordArray.clone();
      iv.sigBytes = 16;
      iv.clamp();
      
      // Extract encrypted data (remaining bytes)
      const encrypted = wordArray.clone();
      encrypted.sigBytes = wordArray.sigBytes - 16;
      encrypted.clamp();
      
      // Convert key to WordArray (using SHA-256 hash)
      const key = CryptoJS.SHA256(this.CLIENT_KEY);
      
      // Decrypt using CryptoJS.AES.decrypt
      const decrypted = CryptoJS.AES.decrypt(
        encrypted.toString(CryptoJS.enc.Hex),
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );
      
      // Convert to string
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting string:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Processes analytics response and decrypts scripts
   */
  static processAnalyticsResponse(response: any): { 
    scripts: AnalyticsScript[], 
    error?: string 
  } {
    try {
      if (!response.success || !response.data?.analyticsScripts) {
        return { 
          scripts: [], 
          error: response.error || 'Invalid response format' 
        };
      }

      // Decrypt each script's src and content
      const decryptedScripts = response.data.analyticsScripts.map((script: any) => {
        try {
          return {
            ...script,
            src: script.src ? this.decryptString(script.src) : null,
            content: script.content ? this.decryptString(script.content) : null
          };
        } catch (error) {
          console.error('Error decrypting script:', error);
          // Return the script without decryption if it fails
          return {
            ...script,
            src: script.src,
            content: script.content
          };
        }
      });

      return { scripts: decryptedScripts };
    } catch (error) {
      console.error('Error processing analytics response:', error);
      return { 
        scripts: [], 
        error: error instanceof Error ? error.message : 'Failed to process scripts' 
      };
    }
  }
}