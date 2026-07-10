import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050607",
        surface: {
          DEFAULT: "#0d1012",
          2: "#12171b",
          3: "#182026",
          4: "#202a31",
        },
        primary: {
          DEFAULT: "#00f0df",
          dim: "#00b8ae",
        },
        iris: { DEFAULT: "#c084fc", dim: "#9333ea" },
        coral: "#ff7b6b",
        gold: "#f5c842",
        azure: "#74c0fc",
        ink: {
          text: "#f4fbfb",
          muted: "#9aa8ad",
          faint: "#56646b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: {
        atom: "cubic-bezier(0.16,1,0.3,1)",
      },
      maxWidth: {
        content: "1180px",
        wide: "1400px",
      },
    },
  },
  plugins: [],
};
export default config;
