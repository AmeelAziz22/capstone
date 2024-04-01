/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chatbotLightBlue: "#1e5a9a",
        chatbotDarkBlue: "#1e3a8a",
      }
    },
  },
  plugins: [],
};
