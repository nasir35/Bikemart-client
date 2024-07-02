/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        qsand: ["Quicksand", "sans-serif"],
      },
      colors: {
        stromboli: "#315048",
        "green-custom": "#1CAE4B",
        coral: "#FF7F47",
        yellow: "#ff0",
      },
    },
  },
  plugins: [],
};
