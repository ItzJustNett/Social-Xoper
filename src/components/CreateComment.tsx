import React, { useState } from 'react';
import { useStore } from '../store/useStore';

interface CreateCommentProps {
  postId: string;
}

export const CreateComment: React.FC<CreateCommentProps> = ({ postId }) => {
  const [content, setContent] = useState('');
  const addComment = useStore((state) => state.addComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment({
      postId,
      content,
      author: 'Anonymous User', // In a real app, this would come from auth
    });

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What are your thoughts?"
        className="w-full p-3 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Comment
      </button>
    </form>
  );
};