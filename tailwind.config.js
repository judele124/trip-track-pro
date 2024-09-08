/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Corrected path
  ],
  theme: {
    extend: {
      colors: {
        purple: '#2b293d',
        light: '#EBE2D4',
        orange: '#ce5737',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
