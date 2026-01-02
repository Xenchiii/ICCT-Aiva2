// useProctoring.ts
export const useProctoring = () => {
  const [violations, setViolations] = useState(0);

  const startMonitoring = () => {
    window.addEventListener('blur', () => {
      setViolations(v => v + 1);
      // Log tab switching to backend
    });
  };

  return { violations, startMonitoring };
};