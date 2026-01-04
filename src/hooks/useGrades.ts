import { useState } from 'react';

// 1. DEFINE GRADE TYPE (Merging Dashboard & GradesPage needs)
export interface Grade {
  id?: string;
  courseCode: string;
  courseName?: string; // Used in Dashboard
  finalScore?: number; // Used in GradesPage (e.g. 95)
  grade: number;       // Used in Dashboard (e.g. 1.25)
  units: number;
  semester?: string;
  academicYear?: string;
}

export const useGrades = () => {
  // FIX: Removed 'setGwa' from here since we aren't using it yet.
  // This removes the "declared but never read" warning.
  const [gwa] = useState(1.25);
  
  // Mock Data
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', courseCode: 'IT 302', courseName: 'Web Development', grade: 1.25, finalScore: 95, units: 3 },
    { id: '2', courseCode: 'CS 201', courseName: 'Data Structures', grade: 1.50, finalScore: 92, units: 3 },
    { id: '3', courseCode: 'MATH 101', courseName: 'Calculus', grade: 1.75, finalScore: 88, units: 3 },
  ]);

  return { gwa, grades, setGrades };
};