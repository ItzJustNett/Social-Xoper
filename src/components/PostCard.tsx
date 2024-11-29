import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react';
import { Post } from '../types';
import { useStore } from '../store/useStore';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const votePost = useStore((state) => state.votePost);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="flex flex-col items-center mr-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              votePost(post.id, 1);
            }}
            className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowBigUp size={24} />
          </button>
          <span className="font-bold my-1 dark:text-gray-200">{post.votes}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              votePost(post.id, -1);
            }}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowBigDown size={24} />
          </button>
        </div>
        
        <div className="flex-1 cursor-pointer" onClick={onClick}>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h2>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="max-h-96 rounded-lg mb-2 object-cover"
            />
          )}
          <p className="text-gray-600 dark:text-gray-300 mb-2">{post.content}</p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Posted by {post.author}</span>
            <span className="mx-2">•</span>
            <span>{formatDistanceToNow(post.createdAt)} ago</span>
            <div className="flex items-center ml-4">
              <MessageSquare size={16} className="mr-1" />
              <span>{post.commentCount} comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};