#!/usr/bin/env node
/**
 * Design-system drift guard.
 * ------------------------------------------------------------------
 * Pins the canonical ATOM + Nirmata Holdings token contract (release v2.2.2,
 * schema 1.0.0, upstream commit 4dc80b9) and asserts that every local consumer
 * stays in parity:
 *   - public/design-tokens.json  (machine-readable mirror)
 *   - lib/design-system.ts       (typed source of truth)
 *   - app/globals.css            (CSS custom properties)
 *   - tailwind.config.ts         (Tailwind theme)
 *
 * Run: `npm run test:tokens`. Exits non-zero on any drift.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");

/** Canonical contract — the pinned upstream truth. Any change here is a
 *  deliberate version bump, not incidental drift. */
const CANON = {
  release: "2.2.2",
  schema: "1.0.0",
  sourceCommit: "4dc80b9",
  color: {
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
  },
  ink: {
    0: "#050607", 1: "#0a0c0e", 2: "#0f1214", 3: "#151a1d",
    4: "#1c2226", 5: "#252d32", 6: "#323b41",
  },
  paper: {
    0: "#ffffff", 1: "#fbfcfc", 2: "#f4f6f6", 3: "#eceff0",
    4: "#e1e6e7", 5: "#cfd6d8", 6: "#b4bdc0",
  },
  aiState: {
    idle: "#7c898c", thinking: "#74c0fc", streaming: "#00f0df",
    awaitingApproval: "#f5c842", executing: "#c084fc", complete: "#3fd18b",
    error: "#f0596b", offline: "#5c686b",
  },
  productAccents: {
    "atom-core": "#00f0df", "nirmata-holdings": "#74c0fc", "nirmata-os": "#00f0df",
    "human-os": "#ff7b6b", "evidence-os": "#f5c842", "sales-os": "#c084fc",
    "agri-os": "#3fd18b", console: "#74c0fc", "physio-ps": "#4cb7f0",
    "thingk-tangk": "#f5c842",
  },
  space: {
    0: "0", px: "1px", 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px",
    6: "24px", 8: "32px", 10: "40px", 12: "48px", 16: "64px", 20: "80px",
    24: "96px", 32: "128px",
  },
  radius: {
    xs: "4px", sm: "6px", md: "10px", lg: "14px", xl: "20px",
    "2xl": "28px", pill: "999px",
  },
  motion: { durationBaseMs: 180, easingAtom: "cubic-bezier(0.16, 1, 0.3, 1)" },
  breakpoint: {
    xs: "320px", sm: "480px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px",
  },
};

const errors = [];
const fail = (msg) => errors.push(msg);

// 1) public/design-tokens.json must match the canonical contract exactly.
let json;
try {
  json = JSON.parse(read("public/design-tokens.json"));
} catch (e) {
  fail(`public/design-tokens.json is not valid JSON: ${e.message}`);
}

if (json) {
  const eq = (label, actual, expected) => {
    if (actual !== expected) fail(`${label}: expected ${expected}, got ${actual}`);
  };
  eq("json.meta.version", json.meta?.version, CANON.schema);
  eq("json.meta.release", json.meta?.release, CANON.release);
  eq("json.meta.sourceCommit", json.meta?.sourceCommit, CANON.sourceCommit);

  for (const [k, v] of Object.entries(CANON.color)) eq(`json.color.${k}`, json.color?.[k], v);
  for (const [k, v] of Object.entries(CANON.ink)) eq(`json.color.ink.${k}`, json.color?.ink?.[k], v);
  for (const [k, v] of Object.entries(CANON.paper)) eq(`json.color.paper.${k}`, json.color?.paper?.[k], v);
  for (const [k, v] of Object.entries(CANON.aiState)) eq(`json.aiState.${k}`, json.aiState?.[k], v);
  for (const [k, v] of Object.entries(CANON.productAccents)) eq(`json.productAccents.${k}`, json.productAccents?.[k], v);
  for (const [k, v] of Object.entries(CANON.space)) eq(`json.space.${k}`, json.space?.[k], v);
  for (const [k, v] of Object.entries(CANON.radius)) eq(`json.radius.${k}`, json.radius?.[k], v);
  for (const [k, v] of Object.entries(CANON.breakpoint)) eq(`json.breakpoint.${k}`, json.breakpoint?.[k], v);
  eq("json.motion.durationBaseMs", json.motion?.durationBaseMs, CANON.motion.durationBaseMs);
  eq("json.motion.easingAtom", json.motion?.easingAtom, CANON.motion.easingAtom);
}

// Helper: assert every listed literal appears in a file's text.
const mustContain = (label, text, needles) => {
  for (const n of needles) {
    if (!text.includes(n)) fail(`${label}: missing required token literal "${n}"`);
  }
};

const allHexes = [
  ...Object.values(CANON.color),
  ...Object.values(CANON.ink),
  ...Object.values(CANON.aiState),
];

// 2) lib/design-system.ts — typed source must carry canonical values + provenance.
const lib = read("lib/design-system.ts");
mustContain("lib/design-system.ts", lib, [
  `version: "${CANON.release}"`,
  `tokensSchema: "${CANON.schema}"`,
  `sourceCommit: "${CANON.sourceCommit}"`,
  ...new Set(allHexes),
]);

// 3) app/globals.css — CSS custom properties must carry canonical hexes.
const css = read("app/globals.css");
mustContain("app/globals.css", css, [
  "--ds-version",
  "--teal-primary: #00f0df",
  "--teal-strong: #00c9bb",
  "--teal-deep: #00766e",
  "--ink-0: #050607",
  "--ink-6: #323b41",
  "--success: #3fd18b",
  "--warning: #f5b23a",
  "--error: #f0596b",
  "--info: #4cb7f0",
  "--ai-idle: #7c898c",
  "--ai-streaming: #00f0df",
  "cubic-bezier(0.16, 1, 0.3, 1)",
]);

// 4) tailwind.config.ts — accent + ai-state hexes must be present.
const tw = read("tailwind.config.ts");
mustContain("tailwind.config.ts", tw, [
  ...new Set(Object.values(CANON.color)),
  CANON.aiState.idle,
  CANON.aiState.offline,
]);

if (errors.length) {
  console.error(`\n✗ Design-system drift detected (${errors.length}):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(
    `\nCanonical release v${CANON.release} (schema ${CANON.schema}, commit ${CANON.sourceCommit}).` +
      `\nReconcile the offending file with lib/design-system.ts, or bump the contract` +
      `\nin scripts/check-tokens.mjs if this is a deliberate version change.\n`
  );
  process.exit(1);
}

console.log(
  `✓ Design tokens in parity — canonical ATOM/Nirmata v${CANON.release} ` +
    `(schema ${CANON.schema}, commit ${CANON.sourceCommit}).`
);
