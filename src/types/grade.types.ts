export type GradeScale = '1.0-5.0' | 'A-F' | 'PERCENTAGE' | 'PASS-FAIL';

export interface GradeComponent {
  id: string;
  courseId: string;
  name: string;
  weight: number; // percentage
  totalItems: number;
  passingScore: number;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  componentId: string;
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade?: string;
  numericGrade?: number;
  feedback?: string;
  submittedAt?: string;
  gradedAt: string;
  gradedBy: string;
}

export interface StudentGradebook {
  courseId: string;
  courseName: string;
  components: GradeComponent[];
  grades: Grade[];
  currentGrade: number;
  letterGrade: string;
  classAverage: number;
  rank?: number;
}

export interface GWA {
  semester: string;
  year: string;
  gwa: number;
  totalUnits: number;
  courses: {
    courseId: string;
    courseName: string;
    grade: number;
    units: number;
  }[];
}

export interface GradeDispute {
  id: string;
  gradeId: string;
  studentId: string;
  reason: string;
  evidence?: string[];
  status: 'PENDING' | 'APPROVED' | 'DENIED';
  response?: string;
  createdAt: string;
  resolvedAt?: string;
}