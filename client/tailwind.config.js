/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#C9C78B",
        secondary: "#5F741D",
        tertiary: {
          dark: "#800080",
          light: "#FFC0CB",
        },
        quaternary: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
