// src/services/scriptCategorization.ts
import { ScriptCategory } from '../types/types';
const BASE_URL = "https://cb-server.web-8fb.workers.dev";

export const scriptCategorizationService = {
    saveScriptCategorizations: async ( token: string, categorizations: ScriptCategory[]) => {
        try {
            const response = await fetch(`${BASE_URL}/api/save-categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    
                    scripts: categorizations
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save script categorizations');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error saving script categorizations:', error);
            throw error;
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