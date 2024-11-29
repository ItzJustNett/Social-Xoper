import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
    >
      {theme.isDark ? (
        <Sun className="text-yellow-400" size={20} />
      ) : (
        <Moon className="text-blue-600" size={20} />
      )}
    </button>
  );
};