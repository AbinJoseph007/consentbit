import { EncryptionUtils } from "./Encryption-Utils";

interface EncryptedResponse {
  success: boolean;
  encryptedData: string;
  key: number[];
  iv: number[];
}

interface DecryptedData {
  analyticsScripts: any[];
  totalScripts: number;
  totalAnalyticsScripts: number;
}

export const ClientEncryption = {
  /**
   * Decrypts the response data from the server
   * @param response The encrypted response from the server
   * @returns The decrypted data or error
   */
  async decryptResponse(response: EncryptedResponse): Promise<{ data: DecryptedData | null; error: string | null }> {
    try {
      if (!response.encryptedData || !response.key || !response.iv) {
        return {
          data: null,
          error: 'Missing encryption parameters'
        };
      }

      // Import the key from the raw bytes
      const key = await EncryptionUtils.importKey(new Uint8Array(response.key));
      
      // Decrypt the data
      const decryptedData = await EncryptionUtils.decrypt(
        response.encryptedData,
        key,
        new Uint8Array(response.iv)
      );

      // Parse the decrypted JSON data
      const parsedData = JSON.parse(decryptedData);

      return {
        data: parsedData,
        error: null
      };
    } catch (error) {
      console.error('Error decrypting response:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to decrypt response'
      };
    }
  }
};