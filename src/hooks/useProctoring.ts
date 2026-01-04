import { useState } from 'react';

export const useProctoring = () => {
  const [violations, setViolations] = useState<number>(0);

  const startMonitoring = () => {
    const handleBlur = () => {
      setViolations((v) => v + 1);
    };

    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('blur', handleBlur);
    };
  };

  return { violations, startMonitoring };
};