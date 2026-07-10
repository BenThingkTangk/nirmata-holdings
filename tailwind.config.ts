import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050609",
          900: "#080a0c",
          800: "#0a0d12",
          700: "#0f131a",
          600: "#151a24",
        },
        teal: {
          DEFAULT: "#00e6d3",
          400: "#4ff2e2",
          500: "#00e6d3",
          600: "#00a89e",
          700: "#016d67",
        },
        violet: {
          DEFAULT: "#b987ff",
          400: "#c9a1ff",
          500: "#b987ff",
          600: "#8f5ee0",
        },
        gold: "#e8c66b",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "teal-glow": "0 0 40px -8px rgba(0, 230, 211, 0.55)",
        "violet-glow": "0 0 40px -8px rgba(185, 135, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
