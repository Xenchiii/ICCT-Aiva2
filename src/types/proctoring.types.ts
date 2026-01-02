export interface ProctoringSession {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  startTime: string;
  endTime?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FLAGGED' | 'TERMINATED';
  violations: ProctoringViolation[];
  screenRecording?: string;
  faceImages: string[];
  overallScore: number;
}

export interface ProctoringViolation {
  id: string;
  sessionId: string;
  type: ViolationType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  description: string;
  evidence?: string; // screenshot or video clip
  autoDetected: boolean;
}

export type ViolationType =
  | 'MULTIPLE_FACES'
  | 'NO_FACE_DETECTED'
  | 'TAB_SWITCH'
  | 'WINDOW_BLUR'
  | 'COPY_PASTE'
  | 'AUDIO_DETECTED'
  | 'MOBILE_DEVICE'
  | 'SUSPICIOUS_MOVEMENT'
  | 'UNAUTHORIZED_PERSON';

export interface ProctoringSettings {
  examId: string;
  enableFaceDetection: boolean;
  enableScreenRecording: boolean;
  enableAudioMonitoring: boolean;
  enableTabSwitchDetection: boolean;
  allowedTabSwitches: number;
  randomVerificationInterval: number; // minutes
  lockdownBrowser: boolean;
  terminateOnViolation: boolean;
}

export interface FaceRecognitionData {
  studentId: string;
  faceDescriptor: number[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}