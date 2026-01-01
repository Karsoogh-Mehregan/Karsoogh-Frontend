/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     keyframes: {
        floatUp: {
          "0%": {
            transform: "translateY(0) rotate(0deg) scale(0.8)",
            opacity: "0",
          },
          "10%": { opacity: "0.4" }, 
          "90%": { opacity: "0.4" },
          "100%": {
            transform: "translateY(-140vh) rotate(360deg) scale(1.2)",
            opacity: "0",
          },
        },
      },
      animation: {
        "float-slow": "floatUp 25s linear infinite",
        "float-medium": "floatUp 20s linear infinite",
        "float-fast": "floatUp 15s linear infinite",
      }
    },
  },
  plugins: [],
}

