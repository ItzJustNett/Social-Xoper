import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post, Comment, User, Theme } from '../types';

interface Store {
  posts: Post[];
  comments: Comment[];
  theme: Theme;
  currentUser: User | null;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'votes' | 'commentCount'>) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'votes'>) => void;
  votePost: (postId: string, value: 1 | -1) => void;
  voteComment: (commentId: string, value: 1 | -1) => void;
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      posts: [],
      comments: [],
      theme: { isDark: false },
      currentUser: null,

      toggleTheme: () =>
        set((state) => ({
          theme: { isDark: !state.theme.isDark },
        })),

      updateProfile: (updates) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updates }
            : null,
        })),

      login: async (email: string, password: string) => {
        // Simulate API call
        const mockUser = {
          id: '1',
          username: email.split('@')[0],
          email,
          bio: 'Hello, I am new here!',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        set({ currentUser: mockUser });
      },

      signup: async (username: string, email: string, password: string) => {
        // Simulate API call
        const mockUser = {
          id: Math.random().toString(36).substring(7),
          username,
          email,
          bio: 'Hello, I am new here!',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        set({ currentUser: mockUser });
      },

      logout: () => set({ currentUser: null }),

      addPost: (postData) =>
        set((state) => ({
          posts: [
            {
              ...postData,
              id: Math.random().toString(36).substring(7),
              createdAt: new Date(),
              votes: 0,
              commentCount: 0,
            },
            ...state.posts,
          ],
        })),

      addComment: (commentData) =>
        set((state) => ({
          comments: [
            {
              ...commentData,
              id: Math.random().toString(36).substring(7),
              createdAt: new Date(),
              votes: 0,
            },
            ...state.comments,
          ],
          posts: state.posts.map((post) =>
            post.id === commentData.postId
              ? { ...post, commentCount: post.commentCount + 1 }
              : post
          ),
        })),

      votePost: (postId, value) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, votes: post.votes + value } : post
          ),
        })),

      voteComment: (commentId, value) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, votes: comment.votes + value }
              : comment
          ),
        })),
    }),
    {
      name: 'xoper-storage',
    }
  )
);