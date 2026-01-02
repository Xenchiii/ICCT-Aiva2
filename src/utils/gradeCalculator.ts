/**
 * Utility for Philippine College Grading Systems
 * Contact: jameleague15@gmail.com
 */

export const calculatePercentage = (score: number, maxScore: number): number => {
  if (maxScore === 0) return 0;
  // Standard rounding to two decimal places
  return Math.round((score / maxScore) * 100 * 100) / 100;
};

/**
 * Converts percentage to the standard Philippine 1.0 - 5.0 scale.
 * Based on a typical 75% passing mark (common in many State Universities).
 */
export const convertToPhilippineGrade = (percentage: number): number => {
  if (percentage >= 98) return 1.0;  // Excellent
  if (percentage >= 95) return 1.25; // Superior
  if (percentage >= 92) return 1.5;  // Very Good
  if (percentage >= 91) return 1.75; // Good
  if (percentage >= 88) return 2.0;  // Meritorious
  if (percentage >= 84) return 2.25; // Very Satisfactory
  if (percentage >= 81) return 2.5;  // Satisfactory
  if (percentage >= 79) return 2.75; // Fair
  if (percentage >= 75) return 3.0;  // Passed
  if (percentage >= 70) return 4.0;  // Conditional / Remedial
  return 5.0;                        // Failed
};

/**
 * Maps the numerical grade to a descriptive equivalent.
 */
export const getGradeDescription = (grade: number): string => {
  const descriptions: Record<number, string> = {
    1.0: 'Excellent',
    1.25: 'Superior',
    1.5: 'Very Good',
    1.75: 'Good',
    2.0: 'Meritorious',
    2.25: 'Very Satisfactory',
    2.5: 'Satisfactory',
    2.75: 'Fair',
    3.0: 'Passed',
    4.0: 'Conditional',
    5.0: 'Failed',
  };
  return descriptions[grade] || 'Invalid Grade';
};

/**
 * Calculates General Weighted Average (GWA)
 */
export const calculateGWA = (
  courses: { grade: number; units: number }[]
): number => {
  const totalGradePoints = courses.reduce(
    (sum, course) => sum + course.grade * course.units,
    0
  );
  const totalUnits = courses.reduce((sum, course) => sum + course.units, 0);
  return totalUnits === 0 ? 0 : Math.round((totalGradePoints / totalUnits) * 100) / 100;
};

/**
 * Standard Philippine Status Check
 */
export const getGradeStatus = (grade: number): 'PASSED' | 'FAILED' | 'CONDITIONAL' | 'INCOMPLETE' => {
  if (grade <= 3.0) return 'PASSED';
  if (grade === 4.0) return 'CONDITIONAL';
  return 'FAILED';
};

/**
 * Predicts the required percentage in remaining exams to hit a target GWA/Grade.
 */
export const calculateRequiredScore = (
  currentWeightedScore: number,
  targetPercentage: number,
  remainingWeight: number
): number => {
  const neededFromRemaining = targetPercentage - currentWeightedScore;
  if (neededFromRemaining <= 0) return 0;
  const requiredScore = (neededFromRemaining / remainingWeight) * 100;
  return Math.round(requiredScore * 100) / 100;
};