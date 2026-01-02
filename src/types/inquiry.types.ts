export type InquiryCategory = 
  | 'ACADEMIC'
  | 'TECHNICAL'
  | 'ADMINISTRATIVE'
  | 'BEHAVIORAL'
  | 'GENERAL';

export type InquiryPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';

export type InquiryStatus = 
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED'
  | 'REOPENED';

export interface Inquiry {
  id: string;
  ticketNumber: string;
  studentId: string;
  studentName: string;
  category: InquiryCategory;
  subcategory?: string;
  priority: InquiryPriority;
  status: InquiryStatus;
  subject: string;
  description: string;
  attachments?: string[];
  isAnonymous: boolean;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  estimatedResponseTime: string;
}

export interface InquiryMessage {
  id: string;
  inquiryId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  attachments?: string[];
  isInternal: boolean;
  createdAt: string;
}

export interface InquirySLA {
  priority: InquiryPriority;
  responseTime: number; // in hours
  resolutionTime: number; // in hours
}