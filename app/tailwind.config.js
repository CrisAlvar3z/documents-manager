/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xl': '1280px', // min-width
      'lg': '1024px', // min-width
      'md': '768px', // min-width
      'sm': '640px', // min-width
      'xs': '460px', // min-width
    },
    extend: {},
  },
  plugins: [],
}

