/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: '#02040A',
        customBlue: "rgb(0, 136, 255)",
      },
    },
  },
  plugins: [],
}