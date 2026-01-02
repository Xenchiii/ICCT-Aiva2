// useFaceRecognition.ts
export const useFaceRecognition = () => {
  const [isVerified, setIsVerified] = useState(false);

  const verifyFace = async (imageBlob: Blob) => {
    // Logic to send blob to backend/AI service
    const result = await AiService.verifyIdentity(imageBlob);
    setIsVerified(result.match);
    return result.match;
  };

  return { isVerified, verifyFace };
};