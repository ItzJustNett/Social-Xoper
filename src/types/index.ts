export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  votes: number;
  commentCount: number;
  image?: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: Date;
  votes: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface Theme {
  isDark: boolean;
}