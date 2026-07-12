/**
 * ATOM / Nirmata Holdings — canonical design-system token source.
 * ------------------------------------------------------------------
 * This module is the single source of truth for design tokens inside this
 * repository. It mirrors the canonical ATOM + Nirmata Holdings Brand & Design
 * Standard (release v2.2.2, token schema 1.0.0, source commit 4dc80b9).
 *
 * The values here are consumed by:
 *   - app/globals.css        (CSS custom properties)
 *   - tailwind.config.ts     (Tailwind theme scales)
 *   - public/design-tokens.json (machine-readable export for external tools)
 *
 * The drift guard (scripts/check-tokens.mjs) asserts that all three consumers
 * stay in parity with the values declared here. Change a token in ONE place
 * (here), regenerate the JSON, then let the guard catch anything out of sync.
 *
 * Non-negotiable rules encoded by these tokens:
 *   - No grid background anywhere.
 *   - Dark surfaces are layered near-black (never flat pure black).
 *   - One accent per surface — a product theme swaps the accent token only.
 *   - Glows encode active / live / agent state, never decoration.
 */

export const DESIGN_SYSTEM = {
  /** Human-facing release of the brand & design standard. */
  version: "2.2.2",
  /** Token schema version (parity with the standard's tokens.json meta). */
  tokensSchema: "1.0.0",
  /** Upstream standard commit these tokens were synced from. */
  sourceCommit: "4dc80b9",
  source:
    "ATOM-Nirmata-Holdings-Brand-Design-Standard (canonical reference application)",
} as const;

/** ATOM signature teal ramp + product-channel accents. */
export const color = {
  tealPrimary: "#00f0df",
  tealStrong: "#00c9bb",
  tealDeep: "#00766e",
  iris: "#c084fc",
  coral: "#ff7b6b",
  gold: "#f5c842",
  azure: "#74c0fc",
  success: "#3fd18b",
  warning: "#f5b23a",
  error: "#f0596b",
  info: "#4cb7f0",
} as const;

/** Layered near-black surface stack (dark, deep-space). Never flat black. */
export const ink = {
  0: "#050607",
  1: "#0a0c0e",
  2: "#0f1214",
  3: "#151a1d",
  4: "#1c2226",
  5: "#252d32",
  6: "#323b41",
} as const;

/** Warm-neutral off-white paper stack (light mode). */
export const paper = {
  0: "#ffffff",
  1: "#fbfcfc",
  2: "#f4f6f6",
  3: "#eceff0",
  4: "#e1e6e7",
  5: "#cfd6d8",
  6: "#b4bdc0",
} as const;

/** 4px base spacing scale. */
export const space = {
  0: "0",
  px: "1px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
} as const;

/** Radius scale — softens without novelty. */
export const radius = {
  xs: "4px",
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "20px",
  "2xl": "28px",
  pill: "999px",
} as const;

export const font = {
  display: "Cabinet Grotesk",
  body: "Satoshi",
  mono: "JetBrains Mono",
  weight: { regular: 400, medium: 500, bold: 700, black: 900 },
} as const;

export const motion = {
  durationBaseMs: 180,
  easingAtom: "cubic-bezier(0.16, 1, 0.3, 1)",
  motifs: ["orbit", "scan", "breathe"] as const,
} as const;

export const breakpoint = {
  xs: "320px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * AI-state tokens — encode the state of an agent/tool/response so the UI
 * communicates system status honestly and consistently.
 */
export const aiState = {
  idle: "#7c898c",
  thinking: "#74c0fc",
  streaming: "#00f0df",
  awaitingApproval: "#f5c842",
  executing: "#c084fc",
  complete: "#3fd18b",
  error: "#f0596b",
  offline: "#5c686b",
} as const;

/** Ordered data-visualization palette (reads on near-black and paper). */
export const dataViz = [
  "#00f0df",
  "#c084fc",
  "#f5c842",
  "#74c0fc",
  "#ff7b6b",
  "#3fd18b",
  "#a3afb2",
  "#f0596b",
] as const;

/**
 * Governed product-accent registry. One accent per surface. A product theme
 * swaps the accent token only — never tone, type, motion, or surface stack.
 */
export const productAccents = {
  "atom-core": "#00f0df",
  "nirmata-holdings": "#74c0fc",
  "nirmata-os": "#00f0df",
  "human-os": "#ff7b6b",
  "evidence-os": "#f5c842",
  "sales-os": "#c084fc",
  "agri-os": "#3fd18b",
  console: "#74c0fc",
  "physio-ps": "#4cb7f0",
  "thingk-tangk": "#f5c842",
} as const;

export type ProductAccentId = keyof typeof productAccents;

/** Flat, serializable token tree — mirrored to public/design-tokens.json. */
export const tokens = {
  $schema: "https://design-tokens.org/format",
  meta: {
    name: "ATOM + Nirmata Holdings Design Tokens",
    version: DESIGN_SYSTEM.tokensSchema,
    release: DESIGN_SYSTEM.version,
    sourceCommit: DESIGN_SYSTEM.sourceCommit,
    note: "Mirror of lib/design-system.ts. NO GRID BACKGROUND. One accent per surface.",
  },
  color: { ...color, ink, paper },
  space,
  radius,
  font,
  motion: {
    durationBaseMs: motion.durationBaseMs,
    easingAtom: motion.easingAtom,
    motifs: [...motion.motifs],
  },
  breakpoint,
  aiState,
  dataViz: [...dataViz],
  productAccents,
} as const;
