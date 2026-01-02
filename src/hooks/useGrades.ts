// useGrades.ts
export const useGrades = () => {
  const [grades, setGrades] = useState([]);
  
  const getGWA = () => {
    const totalPoints = grades.reduce((sum, g) => sum + (g.grade * g.units), 0);
    const totalUnits = grades.reduce((sum, g) => sum + g.units, 0);
    return totalUnits === 0 ? 0 : (totalPoints / totalUnits).toFixed(2);
  };

  return { grades, setGrades, gwa: getGWA() };
};

