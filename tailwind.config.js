/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0066FF',
          yellow: '#FFD700',
        },
      },
    },
  },
  plugins: [],
};