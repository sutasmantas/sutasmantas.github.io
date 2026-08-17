# Central portfolio visual lab — Batch 5 handoff

Date: 2026-08-17
Status: **PASS_LOCAL_READY_TO_PUBLISH**
Implementation checkpoint: **pending**
GitHub Pages run: **pending**
Selected control: `/design-lab/43/`
Production route: `/`
Homepage review routes: `/design-lab/44/` through `/design-lab/48/`
Shared case review routes: `/design-lab/case/49/<slug>/` through `/design-lab/case/53/<slug>/`
Branch: `main`
Worktree: `C:\Users\masuta\Desktop\Coding\cv\portfolio_demos\central_portfolio_site`

## Decision

The Batch 04 export is integrated directly on `main`. Production uses base 43:
accepted 33–36 and 42 compose with base 32; rejected 37–41 do not. The
redundant project-directory instruction is removed.

Screenshot delivery is now interaction-aware. The selected image is requested
immediately on selection, focus, or hover, and the rest warm sequentially at
idle time as the project deck approaches. A visible `aria-busy` loading state
prevents the selected card from looking blank on slower connections.

Batch 05 deliberately moves beyond the “All thirteen” directory section. It
contains three opening experiments, two ending/contact experiments, and five
shared case-template experiments. Every case experiment can be switched among
all 13 real projects.

## Open the artifact

Double-click `OPEN_DESIGN_LAB.cmd`. It builds the current 129-page site, starts
the private preview at `http://127.0.0.1:8912/design-lab/`, and opens the Batch
05 dashboard. It starts at route 44, compares homepage options with base 43 and
case options with the current Atlas case, saves decisions locally, and exports
`central-portfolio-batch-05-decisions.json`.

## Verification

| Gate | Result |
| --- | --- |
| `npm run build` | **PASS** — 129 static pages |
| `node scripts/verify-content-parity.mjs` | **PASS** — 605 checks |
| `node scripts/verify-design-lab.mjs` | **PASS** — 1,003 checks |
| `node scripts/verify-review-dashboard.mjs` | **PASS** — 32 checks |
| `node scripts/capture-design-lab.mjs` | **PASS** — 22 full-page renders plus two contact sheets |
| `node scripts/gate.mjs` | **PASS** — 5 production routes × 2 viewports |
| `npm run gate:evidence` | **PASS** — 13 projects and 26 immutable links |
| `npm run test:evidence` | **PASS** — 4/4 evidence mutants killed |
| `npm run gate:links` | **PASS** — 129 pages and 5,123 anchors |
| `git diff --check` | **PASS** |

## Exact restart point

1. Treat `/` and `/design-lab/43/` as the same selected production base.
2. Review 44–46 for the opening and 47–48 for the final contact section.
3. Review 49–53 on Atlas, then use the project switcher to spot-check other
   projects on the same shared template.
4. Export the completed Batch 05 JSON. Explain `REVISE` decisions precisely.
5. Do not change canonical project copy or promote any Batch 05 derivative
   until the owner explicitly selects it.
