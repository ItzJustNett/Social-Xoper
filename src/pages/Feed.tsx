import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
import { CreatePost } from '../components/CreatePost';
import { Comment } from '../components/Comment';
import { CreateComment } from '../components/CreateComment';

export const Feed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { posts, comments, currentUser } = useStore();

  const postComments = comments.filter(
    (comment) => comment.postId === selectedPost?.id
  );

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Xoper💙💛
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          Join our community to share your thoughts and connect with others.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login to continue
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {selectedPost ? (
        <div>
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Posts
          </button>
          <PostCard post={selectedPost} />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mt-4 p-4">
            <CreateComment postId={selectedPost.id} />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {postComments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <CreatePost />
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};