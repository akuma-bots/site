import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#050506",
        surface: "#0d0d10",
        card: "#131317",
        border: "#232329",
        nemesis: {
          red: "#ff0033",
          redDark: "#8a001d",
          neon: "#ff2a4d"
        }
      },
      boxShadow: {
        neon: "0 0 5px #ff0033, 0 0 20px #ff003366, 0 0 60px #ff003322",
        neonSoft: "0 0 10px #ff003344"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      backgroundImage: {
        "nemesis-grid":
          "linear-gradient(rgba(255,0,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
