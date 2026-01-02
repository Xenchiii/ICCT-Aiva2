export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  sessionId: string;
  sessionDate: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED';
  checkInTime?: string;
  checkOutTime?: string;
  duration?: number; // in minutes
  verificationMethod: 'FACE_RECOGNITION' | 'QR_CODE' | 'MANUAL';
  confidence?: number; // for face recognition
  createdAt: string;
}

export interface ClassSession {
  id: string;
  courseId: string;
  title: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  meetingLink?: string;
  totalStudents: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  attendanceRate: number;
}

export interface AttendanceAnalytics {
  studentId: string;
  courseId: string;
  totalSessions: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  attendanceRate: number;
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  consecutiveAbsences: number;
  warning: boolean;
}