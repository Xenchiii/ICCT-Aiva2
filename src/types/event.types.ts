export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'seminar' | 'competition' | 'meeting' | 'social';
  organizer: string;
  organizerId: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  meetingLink?: string;
  maxParticipants?: number;
  currentParticipants: number;
  registrationDeadline: string;
  coverImage?: string;
  tags: string[];
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  studentId: string;
  studentName: string;
  email: string;
  phone?: string;
  registeredAt: string;
  attended: boolean;
  attendedAt?: string;
  qrCode: string;
}

export interface EventAttendance {
  eventId: string;
  totalRegistered: number;
  totalAttended: number;
  attendanceRate: number;
  attendees: EventRegistration[];
}