/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{html,ts}",
    "./libs/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E7D1BB",
          200: "#c8b39e",
          300: "#84725e"
        },
        accent: {
          100: "#A096A5",
          200: "#463e4b"
        },
        text: {
          100: "#A096A2",
          200: "#847a86"
        },
        bg: {
          100: "#151931",
          200: "#252841",
          300: "#3d3f5b"
        }
      }
    }
  },
  plugins: [],
};
