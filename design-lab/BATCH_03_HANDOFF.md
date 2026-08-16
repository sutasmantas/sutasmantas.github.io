# Central portfolio visual lab — Batch 3 handoff

Date: 2026-08-16
Status: **PASS_MERGED_TO_MAIN_READY_FOR_OWNER_SELECTION**
Implementation checkpoint: `6972343eba0c9814202e83e800c4cd4d71756482`
Merge checkpoint: `5fa6b225c2724ab4d4418db3468dc3d7b7daf873`
Combined control: `/design-lab/21/`
Branch: `main`
Worktree: `C:\Users\masuta\Desktop\Coding\cv\portfolio_demos\central_portfolio_site`

## Decision

The exported Batch 2 decisions were unambiguous, so no explanation was needed
before integration. Route 21 is the new equal-scope control and combines the
five `KEEP` mechanisms: signal perimeter (11), screenshot inspection lens
(13), selected-row shimmer (16), spectral canonical headline (17), and
route-direction project reveal (19). Rejected mechanisms were not carried
forward.

Routes 22–31 each add one mechanism to route 21. Every route retains all 13
canonical projects, complete descriptions and evidence notes, case/live links,
three client routes, site contact, and keyboard/tap project selection. There
are no project-specific email actions and no added runtime dependency.

## Open the artifact

Double-click `OPEN_DESIGN_LAB.cmd` in the worktree. It builds the static site,
starts the private preview at `http://127.0.0.1:8912/design-lab/`, and opens the
Batch 3 dashboard. Keep the launcher window open during review.

The dashboard starts on route 22, compares against base 21, stores
`KEEP`/`REVISE`/`REJECT` decisions plus notes locally, and exports
`central-portfolio-batch-03-decisions.json`. The mobile route header exposes
all eleven routes without requiring horizontal scrolling.

## Variant inventory

| Route | One additional changed system | Source mechanism |
| ---: | --- | --- |
| 22 | magnetic case/live actions | React Bits Magnet |
| 23 | keyboard/pointer screenshot glare | React Bits GlareHover |
| 24 | pixel-resolve project transition | React Bits PixelTransition |
| 25 | proximity-magnified project rows | React Bits Dock |
| 26 | decrypting selected project title | React Bits DecryptedText |
| 27 | interactive canonical proof figures | Magic UI NumberTicker |
| 28 | palette-matched selection sparks | React Bits ClickSpark |
| 29 | moving hard-line project-title shadow | Magic UI LineShadowText |
| 30 | expanding proof screenshot | Codrops ImageExpansionTypography |
| 31 | flowing focused-row marquee | React Bits FlowingMenu |

Pinned commits, licenses, inspected upstream sources, the acceptance contract,
and the empty Batch 3 decision table are in `BATCH_03_MANIFEST.md`.

## Verification

| Gate | Result |
| --- | --- |
| `npm run build` | **PASS** — 47 static pages |
| `node scripts/verify-content-parity.mjs` | **PASS** — 512 checks |
| `node scripts/verify-design-lab.mjs` | **PASS** — 464 checks |
| `node scripts/verify-review-dashboard.mjs` | **PASS** — 27 checks |
| `node scripts/capture-design-lab.mjs` | **PASS** — 22 full-page renders plus two contact sheets |
| `npm run gate:evidence` | **PASS** — 13 projects, 26 immutable links |
| `npm run test:evidence` | **PASS** — 4/4 mutants killed |
| `git diff --check` | **PASS** |

### Main integration verification

- `main` first fast-forwarded cleanly to `origin/main@4f0f32d`, preserving the
  newer live project-detail work.
- `agent/central-portfolio-visual-lab` merged without conflicts at `5fa6b22`.
- The merged tree passed the 47-page build, both evidence gates, all 512 content
  checks, all 464 lab interaction checks, all 27 dashboard checks, and the
  site-wide browser gate over five routes at 1440px and 390px.

Manual visual review covered the complete desktop/mobile page, review
dashboard, and representative interaction-heavy routes. The final pass fixed
mobile route discoverability, corrected the combined-base motion note, and
made screenshot glare keyboard-focusable.

## Exact restart point

1. Open the dashboard with `OPEN_DESIGN_LAB.cmd`.
2. Test routes 22–31 against base 21 at both widths and with reduced motion.
3. Record decisions and explanations where a choice is `REVISE`, then export
   the Batch 3 JSON.
4. Do not change canonical copy or remove a project to accommodate a visual
   choice.
5. Do not promote one of routes 22–31 into the production homepage until the
   owner selects the next mechanisms and explicitly authorizes that change.

Batch 03 is integrated into `main` as a private-review design lab. No derivative
has replaced the production homepage.
