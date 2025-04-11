// src/services/scriptCategorization.ts
import { ScriptCategory } from '../types/types';
import { EncryptionUtils } from '../util/Encryption-Utils';

const BASE_URL = "https://cb-server.web-8fb.workers.dev";

export const scriptCategorizationService = {
  

  saveScriptCategorizations : async (token: string, categorizations: ScriptCategory[]) => {
      try {
        // Generate encryption key and IV
        const { key, iv } = await EncryptionUtils.generateKey();
    
        // Encrypt the categorizations data
        const encryptedData = await EncryptionUtils.encrypt(
          JSON.stringify({ scripts: categorizations }),
          key,
          iv
        );
    
        // Export the key for transmission
        const exportedKey = await crypto.subtle.exportKey('raw', key);
    
        const response = await fetch(`${BASE_URL}/api/save-categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            scripts:encryptedData,
            key: Array.from(new Uint8Array(exportedKey)),
            iv: Array.from(iv)
          })
        });
        const result = await response.json();
        return result;
        
    
      
      } catch (error) {
        console.error('Error saving script categorizations:', error);
        return {
          data: null,
          error: {
            message: error instanceof Error ? error.message : 'Failed to save script categorizations'
          }
        };
      }
    },


    updateScriptCategorizations: async ( token: string, newCategorizations: ScriptCategory[]) => {
        try {
            // Save new categorizations
            await scriptCategorizationService.saveScriptCategorizations( token, newCategorizations);
            
            // Return success response
            return {
                success: true,
                message: 'Script categorizations updated successfully'
            };
        } catch (error) {
            console.error('Error updating script categorizations:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to update script categorizations'
            };
        }
    }
};