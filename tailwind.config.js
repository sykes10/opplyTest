const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        peralta: ['Peralta', ...defaultTheme.fontFamily.sans],
        sans: ['Monserrat', ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
};
