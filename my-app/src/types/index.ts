export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  points?: number;
  level?: number;
  streak?: number;
  avatar_url?: string;
  student_no?: string;
  course?: string;
  department?: string;
  bio?: string;
  [key: string]: any;
}

export interface NotificationItem {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earned?: boolean;
  points_required?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  target: number;
  progress?: number;
  completed?: boolean;
  reward: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: any;
  cost: number;
  category?: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  subject: string;
  type: string;
  file_url?: string;
  uploaded_by?: string;
  download_count?: number;
}

export interface Message {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  time: string;
  sender_name?: string;
  sender_avatar?: string;
  is_read?: boolean;
}

export interface ClassItem {
  id: string;
  title: string;
  subject: string;
  code: string;
  schedule: string;
  description?: string;
  student_count?: number;
  room?: string;
  teacher_id?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  due_date: string;
  description?: string;
  points?: number;
  course_id?: string;
  teacher_id?: string;
  submitted?: number;
  total?: number;
}