import { ApiService } from './api.service';

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  category: 'Academic' | 'General' | 'Events';
  likes: number;
  createdAt: string;
}

export const ForumService = {
  getPosts: (category?: string) => 
    ApiService.request<ForumPost[]>(`/forum/posts${category ? `?cat=${category}` : ''}`),

  createPost: (data: Partial<ForumPost>) => 
    ApiService.request<ForumPost>('/forum/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  addComment: (postId: string, comment: string) => 
    ApiService.request(`/forum/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text: comment }),
    }),

  likePost: (postId: string) => 
    ApiService.request(`/forum/posts/${postId}/like`, { method: 'POST' }),
};