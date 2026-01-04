import { useState } from 'react'; // FIX: Added missing import
import { AiService } from '../services/ai.service';

export const useFaceRecognition = () => {
  const [isVerified, setIsVerified] = useState(false);

  const verifyFace = async (imageBlob: Blob) => {
    try {
      const result = await AiService.verifyIdentity(imageBlob);
      // Assuming result returns { match: boolean }
      setIsVerified(result.match);
      return result.match;
    } catch (error) {
      console.error("Verification failed:", error);
      return false;
    }
  };

  return { isVerified, verifyFace };
};