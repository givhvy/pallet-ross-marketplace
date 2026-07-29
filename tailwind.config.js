/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Inter Tight"', 'sans-serif'],
        body: ['"Inter Tight"', 'sans-serif'],
        sans: ['"Inter Tight"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
