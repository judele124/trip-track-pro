/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#19181e',
        light: '#EBE2D4',
        primary: '#ce5737',
        secondary: '#383644',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
