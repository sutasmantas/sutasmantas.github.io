# Central portfolio visual lab — Batch 2 handoff

Date: 2026-08-16
Status: **PASS_READY_FOR_OWNER_SELECTION**
Implementation checkpoint: `385663535c8b0b464f895b133baafe539a3b0aa6`
Selected control: `/design-lab/10/`
Branch: `agent/central-portfolio-visual-lab`
Worktree: `C:\Users\masuta\Desktop\Coding\cv\portfolio_demos\worktrees\central_portfolio_visual_lab`

## Decision

Batch 2 is a live selection artifact, not a production integration. Base 10 is
frozen as the equal-scope control. Routes 11–20 each alter one named visual or
interaction system while retaining the complete base composition, all 13
canonical project records, full descriptions and evidence notes, real case and
live links, three client-route groups, keyboard/tap selection and site contact.

The dashboard at `/design-lab/` starts on 11 and can compare every derivative
directly against base 10 in an independent iframe. It records
`KEEP`/`REVISE`/`REJECT` plus notes in browser local storage and exports
`central-portfolio-batch-02-decisions.json`.

## Open the artifact

Double-click `OPEN_DESIGN_LAB.cmd` in the worktree. It builds the static site,
starts the private preview at `http://127.0.0.1:8912/design-lab/`, and opens the
Batch 2 dashboard. Keep the launcher window open while reviewing and press
Enter there when finished.

Review each route at both 1440 and 390, use **Compare base 10**, and test the
actual pointer/focus behavior. Static captures intentionally do not replace
the live review.

## Variant inventory

| Route | One changed system | Source mechanism |
| ---: | --- | --- |
| 11 | animated signal perimeter | Magic UI Border Beam |
| 12 | pointer-relative proof-card light | Magic UI Magic Card |
| 13 | screenshot inspection loupe | Magic UI Lens |
| 14 | pointer-reactive technical grid | Magic UI Interactive Grid Pattern |
| 15 | warm SVG turbulence surface | Magic UI Noise Texture |
| 16 | selected-row conic shimmer | Magic UI Shimmer Button |
| 17 | spectral canonical headline | Magic UI Animated Gradient Text |
| 18 | blur-resolve project transition | Magic UI Blur Fade |
| 19 | route-direction clip reveal | Codrops HoverGrid |
| 20 | layered perspective proof object | Codrops 3DStackMotion |

Pinned commits, licenses, inspected source links and the empty owner decision
table are in `BATCH_02_MANIFEST.md`. No new runtime dependency was added.

## Verification

| Gate | Result |
| --- | --- |
| `npm run build` | **PASS** — 36 static pages |
| `node scripts/verify-content-parity.mjs` | **PASS** — 512 checks |
| `node scripts/verify-design-lab.mjs` | **PASS** — 262 checks |
| `node scripts/verify-review-dashboard.mjs` | **PASS** — 26 checks |
| `node scripts/capture-design-lab.mjs` | **PASS** — 22 full-page renders plus two contact sheets |
| `npm run gate:evidence` | **PASS** — 13 projects, 26 immutable links |
| `npm run test:evidence` | **PASS** — 4/4 mutants killed |

The final visual pass found variant 17's gradient headline clipped on mobile;
the width rule was corrected, the 390px render regenerated, and the full
interaction/overflow gate rerun successfully.

## Exact restart point

1. Open the dashboard with `OPEN_DESIGN_LAB.cmd`.
2. Record decisions for 11–20 and export the JSON.
3. Select mechanisms, not whole routes: compatible `KEEP` choices can be
   combined later, but their combined contrast, motion and hierarchy must be
   re-gated as a new bounded integration slice.
4. Do not change canonical copy or remove any project to accommodate a visual
   choice.
5. Do not merge, push, publish or deploy this branch until the owner has made
   the selection and explicitly authorizes integration.

No merge, push, publication or live-site deployment has been performed.
