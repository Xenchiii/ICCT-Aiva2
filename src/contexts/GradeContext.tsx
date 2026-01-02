'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

// Standard PH Transmutation
const convertToGrade = (percentage: number): number => {
  if (percentage >= 97) return 1.00;
  if (percentage >= 94) return 1.25;
  if (percentage >= 91) return 1.50;
  if (percentage >= 88) return 1.75;
  if (percentage >= 85) return 2.00;
  if (percentage >= 82) return 2.25;
  if (percentage >= 79) return 2.50;
  if (percentage >= 76) return 2.75;
  if (percentage >= 75) return 3.00; // Passing
  if (percentage >= 70) return 4.00; // Conditional
  return 5.00; // Failed
};

interface GradeItem {
  courseCode: string;
  units: number;
  finalScore: number; // Raw score (e.g., 88.5)
}

interface GradeContextType {
  grades: GradeItem[];
  gwa: string; // String for display (e.g., "1.75")
  addGrade: (item: GradeItem) => void;
  predictGWA: (hypotheticalGrades: GradeItem[]) => string;
}

const GradeContext = createContext<GradeContextType | undefined>(undefined);

export const GradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [grades, setGrades] = useState<GradeItem[]>([]);

  const calculateGWA = (items: GradeItem[]) => {
    if (items.length === 0) return '0.00';
    
    let totalUnits = 0;
    let totalWeightedGrades = 0;

    items.forEach(item => {
      const numericGrade = convertToGrade(item.finalScore);
      totalWeightedGrades += numericGrade * item.units;
      totalUnits += item.units;
    });

    return (totalWeightedGrades / totalUnits).toFixed(2);
  };

  const gwa = useMemo(() => calculateGWA(grades), [grades]);

  return (
    <GradeContext.Provider value={{ 
      grades, 
      gwa, 
      addGrade: (g) => setGrades(prev => [...prev, g]),
      predictGWA: calculateGWA 
    }}>
      {children}
    </GradeContext.Provider>
  );
};