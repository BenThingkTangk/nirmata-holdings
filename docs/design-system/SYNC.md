# Syncing a newer design-system release

The token contract is pinned to a specific upstream release. Upgrading is a
deliberate, reviewable step — never an incidental drift.

## Source of truth

Upstream: **ATOM + Nirmata Holdings Brand & Design Standard**
(`ATOM-Nirmata-Holdings-Brand-Design-Standard`), token file `public/tokens.json`
and `src/tokens/*.ts`. Currently pinned to release **v2.2.2**, commit `4dc80b9`.

## Steps to sync to release `vX.Y.Z`

1. **Read the upstream diff.** Compare the upstream `public/tokens.json` and
   `src/tokens/*.ts` between the pinned commit and the target. Note any changed
   hex values, new token layers, or renamed keys.

2. **Update the local source of truth** in `lib/design-system.ts`:
   - Update `DESIGN_SYSTEM.version`, `.tokensSchema`, `.sourceCommit`.
   - Apply changed/added token values.

3. **Regenerate the mirror** `public/design-tokens.json` to match
   `lib/design-system.ts` exactly (same keys, same values, updated `meta`).

4. **Propagate to consumers**:
   - `app/globals.css` — update the affected `:root` custom properties and
     `--ds-version`.
   - `tailwind.config.ts` — update affected theme colors (keep additive-only
     unless a breakpoint/radius migration is explicitly intended; see
     [ADOPTION.md](./ADOPTION.md) divergences).
   - `package.json` — update the `designSystem` block.

5. **Update the pinned contract** in `scripts/check-tokens.mjs` (`CANON`) to the
   new release/schema/commit and any changed values.

6. **Verify**:

   ```bash
   npm run verify   # typecheck + lint + test:tokens + build
   npm run test:e2e # cinematic QA + no-overflow guarantees
   ```

7. **Visual QA.** Re-run the visual pass in [QA](../../docs) at 320 / 390 / 768 /
   1024 / 1440, dark, and `prefers-reduced-motion: reduce`. Confirm the masterbrand
   hierarchy and ATOM teal usage are intact.

## Guardrail

If any consumer falls out of parity, `npm run test:tokens` fails with the exact
offending token path. Fix the file it names, or — if the change is intentional —
bump `CANON` in the guard as part of the same PR.
