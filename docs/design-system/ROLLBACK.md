# Rolling back the design-system adoption

The adoption is intentionally low-blast-radius: it is additive token work plus a
reconciliation of the near-black surface stack to canonical values. Nothing in
the routing, content, or interactive behavior changed. Rollback is therefore
safe and mechanical.

## Full rollback (revert the whole adoption)

The change ships as a single feature branch / PR. To revert:

```bash
# Revert the merge (preferred once merged)
git revert -m 1 <merge-commit-sha>

# …or revert the squashed commit
git revert <commit-sha>
```

Then verify the baseline still builds:

```bash
npm ci
npm run build
npm run test:e2e
```

Because the design-system files are self-contained, the revert cannot leave
dangling references — the token consumers (`globals.css`, `tailwind.config.ts`)
return to their prior values in the same revert.

## Partial rollback (keep tokens, revert only the surface reconciliation)

If only the surface-stack deepening is undesired, restore the previous surface
values in `app/globals.css` while keeping the new token layers:

```css
--surface: #0d1012;   /* previous */
--surface-2: #12171b;
--surface-3: #182026;
--surface-4: #202a31;
```

and the matching `surface` entries in `tailwind.config.ts`. Then update the
`CANON.ink` mapping expectations in `scripts/check-tokens.mjs` only if you also
change the ink scale (you normally would not — the ink scale stays canonical;
the semantic `--surface` alias is what you are repositioning).

Run `npm run verify` afterwards.

## What rollback does NOT touch

- Routes, page content, and copy — unchanged by the adoption.
- The public portfolio boundary (no RRG Bio / ClinixAI / AntimatterAI).
- Cinematic experiences (film, particles, chamber, worker sim, worlds).

## Production safety

This branch opens as a **DRAFT** PR and is **not** merged or deployed to
production by the adoption task. Promotion to production is a separate, human
decision after visual QA on a Vercel preview.
