import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { currentUser, logout } = useStore();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Layout className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Xoper<span className="text-yellow-500">💙💛</span>
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {currentUser ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/settings"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <Settings size={20} />
                </Link>
                <span className="text-gray-600 dark:text-gray-300">
                  {currentUser.username}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};