import type { Config } from "tailwindcss";

/**
 * Tailwind theme mirrors the canonical ATOM + Nirmata Holdings tokens
 * (release v2.2.2 · schema 1.0.0 · commit 4dc80b9). Single source of truth:
 * lib/design-system.ts. Kept in parity by scripts/check-tokens.mjs.
 *
 * Changes are additive on purpose: existing components rely on Tailwind's
 * default responsive (`sm` = 640px) and radius scales, so those are preserved.
 * The full canonical spacing/radius/breakpoint scales live as CSS custom
 * properties in app/globals.css and in lib/design-system.ts. Any divergence
 * here from the canonical scale is intentional preservation, documented in
 * docs/design-system/ADOPTION.md.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // Canonical compact floor. `sm`..`2xl` keep Tailwind defaults to
        // preserve the current responsive layout contracts.
        xs: "320px",
      },
      colors: {
        bg: "#050607",
        surface: {
          DEFAULT: "#0f1214",
          2: "#151a1d",
          3: "#1c2226",
          4: "#252d32",
        },
        ink: {
          text: "#f4fbfb",
          muted: "#9aa8ad",
          faint: "#56646b",
          0: "#050607",
          1: "#0a0c0e",
          2: "#0f1214",
          3: "#151a1d",
          4: "#1c2226",
          5: "#252d32",
          6: "#323b41",
        },
        paper: {
          0: "#ffffff",
          1: "#fbfcfc",
          2: "#f4f6f6",
          3: "#eceff0",
          4: "#e1e6e7",
          5: "#cfd6d8",
          6: "#b4bdc0",
        },
        primary: {
          DEFAULT: "#00f0df",
          dim: "#00c9bb",
          deep: "#00766e",
        },
        iris: { DEFAULT: "#c084fc", dim: "#9333ea" },
        coral: "#ff7b6b",
        gold: "#f5c842",
        azure: "#74c0fc",
        success: "#3fd18b",
        warning: "#f5b23a",
        error: "#f0596b",
        info: "#4cb7f0",
        ai: {
          idle: "#7c898c",
          thinking: "#74c0fc",
          streaming: "#00f0df",
          "awaiting-approval": "#f5c842",
          executing: "#c084fc",
          complete: "#3fd18b",
          error: "#f0596b",
          offline: "#5c686b",
        },
      },
      borderRadius: {
        // Non-colliding canonical additions; Tailwind's default sm/md/lg/xl/2xl
        // are preserved for existing components.
        xs: "4px",
        pill: "999px",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: {
        atom: "cubic-bezier(0.16,1,0.3,1)",
      },
      transitionDuration: {
        base: "180ms",
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
