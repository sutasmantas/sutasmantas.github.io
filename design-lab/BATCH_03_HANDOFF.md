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

Each route now gives an exact test instruction: where the changed surface is,
which pointer/keyboard/click action triggers it, and what should visibly
happen. The dashboard also labels each option by immediate design impact:
`SMALL`, `MEDIUM`, or `LARGE`. These labels are deliberately candid; route 27
is a proof-number microinteraction, not a drastic redesign.

## Open the artifact

Double-click `OPEN_DESIGN_LAB.cmd` in the worktree. It builds the static site,
starts the private preview at `http://127.0.0.1:8912/design-lab/`, and opens the
Batch 3 dashboard. Keep the launcher window open during review.

The dashboard starts on route 22, compares against base 21, stores
`KEEP`/`REVISE`/`REJECT` decisions plus notes locally, and exports
`central-portfolio-batch-03-decisions.json`. The mobile route header exposes
all eleven routes without requiring horizontal scrolling.

## Variant inventory

| Route | Impact | One additional changed system | Source mechanism |
| ---: | --- | --- | --- |
| 22 | Small | magnetic case/live actions | React Bits Magnet |
| 23 | Medium | keyboard/pointer screenshot glare | React Bits GlareHover |
| 24 | Medium | pixel-resolve project transition | React Bits PixelTransition |
| 25 | Medium | proximity-magnified project rows | React Bits Dock |
| 26 | Medium | decrypting selected project title | React Bits DecryptedText |
| 27 | Small | 13, 10, and 100% proof-number ticker | Magic UI NumberTicker |
| 28 | Small | palette-matched selection sparks | React Bits ClickSpark |
| 29 | Medium | moving hard-line project-title shadow | Magic UI LineShadowText |
| 30 | Large | expanding proof screenshot | Codrops ImageExpansionTypography |
| 31 | Large | flowing focused-row marquee | React Bits FlowingMenu |

Pinned commits, licenses, inspected upstream sources, the acceptance contract,
and the empty Batch 3 decision table are in `BATCH_03_MANIFEST.md`.

## Verification

| Gate | Result |
| --- | --- |
| `npm run build` | **PASS** — 47 static pages |
| `node scripts/verify-content-parity.mjs` | **PASS** — 512 checks |
| `node scripts/verify-design-lab.mjs` | **PASS** — 468 checks |
| `node scripts/verify-review-dashboard.mjs` | **PASS** — 30 checks |
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
made screenshot glare keyboard-focusable. The owner-clarity pass then replaced
vague mechanism summaries with exact test instructions and exposed impact size
in both the dashboard and route header. It also fixed route 27 so its `100%`
proof value—along with `13` and `10`—animates and resolves exactly.

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
