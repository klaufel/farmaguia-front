/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
