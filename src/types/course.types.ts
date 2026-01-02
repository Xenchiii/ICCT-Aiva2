// src/types/index.ts

// 1. SUBJECT (Formerly 'Course')
// This represents "CS101", "Math 1", etc.
export interface Subject {
  id: string;
  code: string;        // e.g. "IT 302"
  title: string;       // e.g. "Web Development"
  description: string;
  professorId: string;
  professorName: string;
  semester: string;    // e.g. "1st Sem 2025-2026"
  credits: number;     // e.g. 3.0 units
  schedule?: string;   // e.g. "MWF 10:00 - 11:00 AM"
  room?: string;       // e.g. "Lab 4"
  enrollmentCount?: number;
  maxEnrollment?: number;
  coverImage?: string;
  createdAt: string;
}

// 2. SUBJECT MODULES (Learning Materials)
export interface SubjectModule {
  id: string;
  subjectId: string;   // Linked to Subject, not Course
  title: string;       // e.g. "Week 1: Introduction"
  description: string;
  order: number;
  isPublished: boolean;
  materials: SubjectMaterial[];
}

export interface SubjectMaterial {
  id: string;
  moduleId: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document' | 'quiz';
  url?: string;
  fileSize?: number;
  duration?: number;
  createdAt: string;
}

// 3. ANNOUNCEMENTS
export interface Announcement {
  id: string;
  subjectId: string;   // Linked to Subject
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

// 4. ASSIGNMENTS
export interface Assignment {
  id: string;
  subjectId: string;   // Linked to Subject
  title: string;
  description: string;
  type: 'assignment' | 'quiz' | 'exam' | 'project';
  dueDate: string;
  totalPoints: number;
  allowLateSubmission: boolean;
  autoGrading: boolean;
  createdAt: string;
}

// 5. DEGREE PROGRAM (What you typically call "Course" in PH)
// e.g. "Bachelor of Science in Information Technology"
export interface DegreeProgram {
  id: string;
  code: string;       // e.g. "BSIT"
  title: string;      // e.g. "Bachelor of Science in Information Technology"
  department: string; // e.g. "College of Computer Studies"
  yearsToComplete: number; // e.g. 4
}