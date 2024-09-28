/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "#23c49d",
      },
      brightness: {
        25: '.25',
        80:'0.8',
        85:'0.85',
        130:'1.30',
        140: '1.45',
      },
      scale: {
        102: '1.02',
      }
    },
  },
  plugins: [],
}