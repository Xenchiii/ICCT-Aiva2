export type ForumCategory = 
  | 'HOMEWORK_HELP'
  | 'CLASS_DISCUSSIONS'
  | 'STUDY_GROUPS'
  | 'ANNOUNCEMENTS'
  | 'EXTRACURRICULAR'
  | 'CAREER_GUIDANCE'
  | 'RESOURCES'
  | 'TECHNICAL_SUPPORT'
  | 'FEEDBACK'
  | 'RULES'
  | 'MODERATION';

export interface ForumThread {
  id: string;
  categoryId: string;
  categoryName: ForumCategory;
  authorId: string;
  authorName: string;
  authorRole: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  replyCount: number;
  upvotes: number;
  downvotes: number;
  hasAcceptedAnswer: boolean;
  acceptedAnswerId?: string;
  createdAt: string;
  updatedAt: string;
  lastReplyAt?: string;
}

export interface ForumPost {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  attachments?: string[];
  upvotes: number;
  downvotes: number;
  isAcceptedAnswer: boolean;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ForumVote {
  id: string;
  userId: string;
  targetId: string; // thread or post id
  targetType: 'THREAD' | 'POST';
  voteType: 'UPVOTE' | 'DOWNVOTE';
  createdAt: string;
}

export interface UserReputation {
  userId: string;
  totalPoints: number;
  threadsCreated: number;
  postsCreated: number;
  acceptedAnswers: number;
  upvotesReceived: number;
  badges: Badge[];
  rank: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}