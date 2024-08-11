/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [ 
    "./components/**/*.js",
    "./contexts/**/*.js",
    "./app/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#007BFF",
        "blue-secondary": "#85C1E9",
      }
    },
  },
  plugins: [],
}
