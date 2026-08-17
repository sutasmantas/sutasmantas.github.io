# Central portfolio visual lab — Batch 4 handoff

Date: 2026-08-17
Status: **PASS_DEPLOYED_READY_FOR_OWNER_REVIEW**
Implementation checkpoint: **10da51bcd11fecb13dbf5328e0a60fac6efefcc8**
Production deployment checkpoint: **c44f7ba7cab5c6b90c326598fe55b31aaf8579e7**
GitHub Pages run: **32001514455 — PASS**
Selected control: `/design-lab/32/`
Production route: `/`
Review routes: `/design-lab/33/` through `/design-lab/42/`
Branch: `main`
Worktree: `C:\Users\masuta\Desktop\Coding\cv\portfolio_demos\central_portfolio_site`

## Decision

The Batch 03 owner export is integrated. Production now uses base 32: retained
22, 23, 25, fixed 27, 28, and 31 on the prior selected composition, with the
intrusive directional project wipe replaced by a restrained 0.18-second
settle. Rejected routes 24, 26, 29, and 30 were not promoted.

The next ten equal-scope, source-derived experiments are live in the Batch 04
dashboard. They emphasize obvious but professional changes to evidence layout,
card material, directory identity, navigation feedback, page orientation, and
client-route composition. Each route preserves the full portfolio content.

## Open the artifact

Double-click `OPEN_DESIGN_LAB.cmd`. It builds the current 58-page site, starts
the private preview at `http://127.0.0.1:8912/design-lab/`, and opens the Batch
04 dashboard. The dashboard starts at route 33, compares against base 32,
persists `KEEP`/`REVISE`/`REJECT` decisions locally, and exports
`central-portfolio-batch-04-decisions.json`.

## Verification

| Gate | Result |
| --- | --- |
| `npm run build` | **PASS** — 58 static pages |
| `node scripts/verify-content-parity.mjs` | **PASS** — 549 checks |
| `node scripts/verify-design-lab.mjs` | **PASS** — 756 checks |
| `node scripts/verify-review-dashboard.mjs` | **PASS** — 30 checks |
| `node scripts/capture-design-lab.mjs` | **PASS** — 22 full-page renders plus two contact sheets |
| `node scripts/gate.mjs` | **PASS** — 5 production routes × 2 viewports |
| `npm run gate:evidence` | **PASS** — 13 projects and 26 immutable links |
| `npm run test:evidence` | **PASS** — 4/4 evidence mutants killed |
| `npm run gate:links` | **PASS** — 58 pages and 2,279 anchors |
| `git diff --check` | **PASS** |

The browser pass specifically verifies the corrected `100%` ticker, the
replacement of the directional wipe, every retained Batch 03 mechanism, every
new Batch 04 mechanism, desktop/mobile overflow, complete content, console
errors, and reduced motion. Full source/license provenance and the decision
table are in `BATCH_04_MANIFEST.md`.

## Exact restart point

1. Treat `/` and `/design-lab/32/` as the same selected base; only the lab route
   carries review chrome.
2. Open the dashboard with `OPEN_DESIGN_LAB.cmd` and test 33–42 against 32 at
   1440px and 390px, with reduced motion as a separate check.
3. Export the completed Batch 04 JSON; explain `REVISE` decisions precisely.
4. Do not change canonical project copy or project count for a visual choice.
5. Do not promote any derivative until the owner explicitly selects it.

Base 32 is production. Routes 33–42 are private-review derivatives.

The public smoke test returned HTTP 200 for `/`, `/design-lab/`,
`/design-lab/32/`, and `/design-lab/33/`. Production exposes the selected Base
32 marker and all 13 project records without review chrome or `noindex`; review
routes remain `noindex`.
