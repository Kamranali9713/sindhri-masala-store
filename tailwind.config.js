/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#B0201E',
          dark: '#7A1512',
          gold: '#C89B3C',
          cream: '#FBF6EE',
        },
      },
    },
  },
  plugins: [],
};
