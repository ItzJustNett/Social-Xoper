import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { Comment as CommentType } from '../types';
import { useStore } from '../store/useStore';

interface CommentProps {
  comment: CommentType;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const voteComment = useStore((state) => state.voteComment);

  return (
    <div className="flex gap-4 p-4 border-b last:border-b-0">
      <div className="flex flex-col items-center">
        <button
          onClick={() => voteComment(comment.id, 1)}
          className="text-gray-500 hover:text-orange-500 transition-colors"
        >
          <ArrowBigUp size={20} />
        </button>
        <span className="text-sm font-bold my-1">{comment.votes}</span>
        <button
          onClick={() => voteComment(comment.id, -1)}
          className="text-gray-500 hover:text-blue-500 transition-colors"
        >
          <ArrowBigDown size={20} />
        </button>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">{comment.author}</span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(comment.createdAt)} ago
          </span>
        </div>
        <p className="text-gray-700">{comment.content}</p>
      </div>
    </div>
  );
};