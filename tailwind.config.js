/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        city: {
          50: "#eff8f7",
          100: "#d9f0ec",
          500: "#178679",
          600: "#116d63",
          700: "#10594f",
          900: "#143d38",
        },
      },
    },
  },
  plugins: [],
};
