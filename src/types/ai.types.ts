export interface AivaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  context?: string;
}

export interface PlagiarismReport {
  id: string;
  submissionId: string;
  studentId: string;
  similarityScore: number;
  matches: PlagiarismMatch[];
  originalityScore: number;
  flagged: boolean;
  analyzedAt: string;
}

export interface PlagiarismMatch {
  source: string;
  url?: string;
  matchPercentage: number;
  matchedText: string;
}

export interface AutoGradingResult {
  submissionId: string;
  score: number;
  maxScore: number;
  confidence: number;
  feedback: string;
  requiresManualReview: boolean;
  gradedAt: string;
}

export interface StudentPerformanceAnalytics {
  studentId: string;
  courseId: string;
  averageScore: number;
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  predictedFinalGrade: number;
  atRisk: boolean;
  engagementScore: number;
  recommendations: string[];
}

export interface PredictiveInsight {
  type: 'AT_RISK' | 'IMPROVEMENT' | 'EXCELLENCE' | 'ENGAGEMENT';
  confidence: number;
  message: string;
  actionItems: string[];
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}