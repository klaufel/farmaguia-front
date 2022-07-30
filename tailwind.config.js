/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3bbb8c',
        map: '#f7f8f9',
      },
      maxWidth: {
        content: '56rem',
      },
      boxShadow: {
        card: '0 8px 16px rgb(0 0 0 / 8%)',
      },
    },
  },
  plugins: [],
};
