# Adopting the canonical ATOM / Nirmata design system

This app adopts the canonical **ATOM + Nirmata Holdings Brand & Design Standard
v2.2.2** as its token layer, while preserving the existing cinematic flagship
experience (film, particle field, ethical decision chamber, worker simulation,
portfolio worlds). The design system was integrated as a **token substrate**, not
a re-skin — no routes, content, or production behavior changed.

## What the design system provides here

| Layer | Source of truth | Consumed by |
| --- | --- | --- |
| Typed tokens + provenance | `lib/design-system.ts` | app code, drift guard |
| Machine-readable mirror | `public/design-tokens.json` | external tools, drift guard |
| CSS custom properties | `app/globals.css` (`:root`) | all components |
| Tailwind theme | `tailwind.config.ts` | utility classes |

Token layers now present: primitive color (teal ramp, product channels), the
canonical near-black **ink** surface stack, warm-neutral **paper** stack (for
light surfaces), semantic status, **AI-state**, 4px spacing, radius, motion
(180ms · `cubic-bezier(0.16,1,0.3,1)`), breakpoints, data-viz, and the governed
**product-accent** registry.

## Using tokens

**CSS / component styles** — reference the custom properties:

```css
.panel {
  background: var(--surface);      /* canonical ink-2 */
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: transform var(--t);  /* 180ms atom easing */
}
.status-live { color: var(--ai-streaming); }   /* agent state, not decoration */
```

**Tailwind** — the theme exposes canonical colors:

```tsx
<div className="bg-surface text-ink-text border-ink-4">…</div>
<span className="text-ai-awaiting-approval">Needs approval</span>
```

**TypeScript** — import typed values when you need them in logic:

```ts
import { color, aiState, productAccents } from "@/lib/design-system";
```

## Rules that are enforced, not just documented

- **No grid background.** No generic blue-purple gradient wallpaper, floating
  neon blobs, or glassmorphism-everywhere.
- **One accent per surface.** A product theme swaps the accent token only —
  never tone, type, motion, or the surface stack.
- **Glows encode state** (active / live / agent), never decoration.
- **Dark surfaces are layered near-black**, never flat `#000`.
- **Reduced motion is honest**: every looping/animated affordance collapses under
  `prefers-reduced-motion: reduce` (see `app/globals.css`).

## Intentional divergences (preservation-first)

To honor "preserve existing cinematic strengths and production behavior," a few
Tailwind scales were **not** overridden even though the canonical scale differs:

- **`sm` breakpoint stays at Tailwind's 640px.** Components use `sm:` for their
  responsive grid contracts; the canonical `sm` = 480px is available as a CSS
  token (`--bp-sm`) and in `lib/design-system.ts`, and `xs` (320px) was added.
- **Tailwind's default radius scale (`rounded-md/lg/xl/2xl`) is preserved.** The
  canonical radius scale lives in CSS vars (`--radius-*`) and tokens; only the
  non-colliding `xs` and `pill` radii were added to Tailwind.

These are documented so a future maintainer can migrate deliberately (a visual
QA pass) rather than absorbing a silent regression.

## See also

- [SYNC.md](./SYNC.md) — how to pull a newer upstream release.
- [ROLLBACK.md](./ROLLBACK.md) — how to safely revert.
- [VERSION.md](./VERSION.md) — current version + brand hierarchy.
