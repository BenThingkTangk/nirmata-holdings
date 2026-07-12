# Design-system version

| Field | Value |
| --- | --- |
| Standard | ATOM + Nirmata Holdings Brand & Design Standard |
| Release | **v2.2.2** |
| Token schema | 1.0.0 |
| Upstream source commit | `4dc80b9` |
| Adopted in | `feat/atom-design-system-v1` |

## Where the version lives

The version is declared once in machine-readable form and mirrored everywhere a
consumer needs it:

- `lib/design-system.ts` → `DESIGN_SYSTEM` (`version`, `tokensSchema`, `sourceCommit`)
- `public/design-tokens.json` → `meta.release`, `meta.version`, `meta.sourceCommit`
- `package.json` → `designSystem` block
- `app/globals.css` → `--ds-version` custom property

The drift guard (`npm run test:tokens`) asserts these stay in agreement with the
pinned canonical contract in `scripts/check-tokens.mjs`.

## Brand hierarchy (must be preserved)

```
Nirmata Holdings            masterbrand (ethics-first, human-benefit-first AI)
        ▼
NirmataOS / ΔTOM substrate  governed agent operating layer
        ▼
ATOM workers & products     ATOM SalesOS, ATOM Console, ATOM Red Team, …
```

ATOM teal (`#00f0df`) is reserved for ATOM-owned moments. The masterbrand keeps
its own distinction (azure `#74c0fc` channel and the sculptural winged-N lockup).

## Public portfolio boundary

Do **not** surface **RRG Bio**, **ClinixAI**, or **AntimatterAI** anywhere in
public copy, portfolio data, or metadata. This boundary predates the design-system
adoption and is unchanged by it.
