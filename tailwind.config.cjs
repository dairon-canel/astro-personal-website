/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{astro,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,astro}',
    './src/components/**/*.{js,ts,jsx,tsx,astro}',
  ],
  theme: {
    extend: {},
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
