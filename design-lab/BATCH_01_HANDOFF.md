# Central portfolio visual lab — Batch 1 handoff

Date: 2026-08-16
Status: **PASS_BASE_10_SELECTED_READY_FOR_IMPROVEMENT_SLICE**
Implementation checkpoint: `23a91bde7d033408f02567fd65f7db6bb83316ba`
Initial experiment checkpoint: `26ab9ea726e07c32e6a3fcd17ecc19b0941fc326`
Baseline: `origin/main@4f0f32d`
Branch: `agent/central-portfolio-visual-lab`
Worktree: `C:\Users\masuta\Desktop\Coding\cv\portfolio_demos\worktrees\central_portfolio_visual_lab`

## Decision

Batch 1 is complete, and the owner selected **10 / complete motion proof deck**
as the base for the next bounded improvement slice. Variant 06 remains an
equal-content comparison reference, not a parallel candidate. This decision
does not authorize production integration, and the live production homepage
remains unchanged.

The original `f919efa` artifact was not a valid whole-portfolio comparison:
most experiment routes rendered only the mechanism under study, omitted much of
the 13-project directory, and sometimes replaced canonical descriptions with
shorter experiment copy. That made the alternatives look cleaner by weakening
the content. The corrected artifact treats every experiment as a complete page
with equal information scope. Each route now preserves the exact canonical
headline, positioning copy, proof figures, all 13 project titles, descriptions,
evidence notes and actions, all three client routes, and contact path.

Selected base 10 exposes all 13 full project titles from the start in three
client-oriented groups. Hover, keyboard focus or tap updates one bounded proof
deck with user-triggered motion and an immediate reduced-motion path. It
preserves the exact canonical project descriptions, evidence notes, case links
and live links without a three-project prelude or second generic directory.

The dashboard now opens directly on 10. Its **Compare reference** action opens
06's calmer flat registry beside it when scan density needs checking. Project
detail pages no longer include subject-prefilled **Talk about [project]** email
buttons; their real evidence/source actions and the single site-wide contact
path remain.

## Open the interactive review artifact

From this worktree, double-click `OPEN_DESIGN_LAB.cmd`. It builds the pinned
site, starts a private local preview at `http://127.0.0.1:8912/design-lab/`,
and opens the review dashboard in the default browser. Keep the launcher window
open while reviewing; press Enter in that window to stop the local server.

The dashboard embeds the real routes rather than screenshots. It supports live
scrolling and controls, 1440/390 viewport switching, a second independent
comparison preview, reduced-motion review, full-size opening,
previous/next navigation, and per-experiment `KEEP`/`REVISE`/`REJECT` decisions
with notes. Review state survives reloads in that browser's local storage. Use
**Export decisions** to create `central-portfolio-batch-01-decisions.json` for
the integration handoff.

## What changed

- Added private, `noindex` routes `/design-lab/01/` through
  `/design-lab/10/`, with a lab-only route switcher.
- Added ten real-content interactions covering overall art direction, hero,
  typography, live-system staging, discovery, product identity, evidence,
  project detail, human authorship and explicit motion.
- Rebuilt every experiment as an additive layer around the complete canonical
  portfolio. Variants 05 and 06 retain their specialized selectors while making
  every canonical project record available through those interfaces.
- Recorded 10 as the selected base and retained 06 only as its equal-content
  comparison reference. The dashboard now opens directly on 10.
- Reused 05's low-friction hover-preview mechanism in both complete comparison
  routes, with equivalent keyboard-focus and tap behavior.
- Rebuilt 10's three-project motion demo as a complete grouped directory with
  one readable, auto-height proof deck. Removed clipped text, fixed-height card
  overflow, unreadable actions and the duplicate secondary directory.
- Made the dashboard's comparison action pair 06 with 10 in either direction;
  the other routes retain their appropriate production/detail baselines.
- Removed all thirteen project-specific **Talk about** mail actions while
  retaining evidence, source, live-project and site-level contact paths.
- Replaced unexplained Relay-led headings with the descriptive product title;
  `Relay` now appears only as the secondary product identity.
- Made experiment 08 compare against the existing Atlas project-detail page;
  06 and 10 compare against each other, and the remaining seven experiments
  compare against the homepage.
- Added an exact content-parity gate so missing or shortened portfolio copy is a
  release failure rather than a matter of visual review.
- Added narrow third-party reuse: Floating UI loads only for experiment 05;
  Motion loads only for experiment 10. Production routes import neither.
- Added reproducible capture and interaction-verification scripts.
- Preserved full-page baseline and experiment renders at 1440×900 and 390×844,
  plus ordered contact sheets that begin with the production baseline.

## Research closure

The parent workspace research corpus now contains twenty consistently scored
references and fresh desktop/mobile captures of all twenty. The original twelve
were completed and eight focused additions were admitted: Josh Comeau, Bruno
Simon, PostHog, Vercel, Stripe, thoughtbot, ustwo and Instrument.

Popular implementation research was used as a constraint, not decoration:

- **Adopt narrowly:** Floating UI for collision-safe discovery placement;
  Motion for interruptible, user-triggered proof-deck state changes.
- **Refit mechanisms only:** Codrops interaction principles and selected Magic
  UI ideas, stripped of autoplay, scroll reveal, cursor effects and particles.
- **Reject for this batch:** Embla carousel and Shoelace; neither solves a hard
  problem that justifies its additional system or interaction model.

The research artifacts live outside this nested site repository at
`portfolio_demos/central_portfolio_research/`; they are intentionally not part
of the public site branch.

## Experiment decision table

These are engineering/design recommendations for owner review, not adoption
decisions.

| # | Recommendation | Reason / required revision |
| ---: | --- | --- |
| 01 | **KEEP** | Strongest whole-site identity and thumbnail distinction; retain familiar actions and moderate the acidic field in integration. |
| 02 | **KEEP** | Clearest person-to-working-product relationship; test a less dominant portrait crop when combined with 01. |
| 03 | **REVISE** | Excellent low-payload identity device; use as a chapter or campaign moment, not the entire homepage voice. |
| 04 | **KEEP** | Makes dense product screens legible; apply only to featured products whose important state can be maintained. |
| 05 | **REVISE** | Its hover/focus discovery mechanism has been reused in both finalists; the standalone route still leaves the mobile preview after the full index. |
| 06 | **REFERENCE** | Retained only for direct scan-density comparison with selected base 10. |
| 07 | **KEEP** | Best conversion of invisible reliability work into inspectable proof; make receipt language project-specific. |
| 08 | **REVISE** | Strong case orientation, but thirteen fully bespoke spines are expensive; reserve for featured cases or define 3–4 artifact families. |
| 09 | **KEEP** | Adds defensible human judgement without fake social proof; avoid duplicating the full portrait if 02 is selected. |
| 10 | **SELECTED BASE** | Owner-selected foundation for the next bounded improvement slice; retain the grouped all-project index, readable proof deck and reduced-motion-safe transition. |

The owner decision and comparison-reference disposition are recorded in
`VARIANT_MANIFEST.md`.

## Artifacts

- `CURRENT_DESIGN_AUDIT.md` — baseline diagnosis and non-regression rules.
- `VARIANT_MANIFEST.md` — hypothesis, references, change, benefit, risk,
  effort and owner decision field for all ten experiments.
- `renders/desktop-contact-sheet.png` — ordered desktop comparison.
- `renders/mobile-contact-sheet.png` — ordered mobile comparison.
- `renders/review-dashboard-desktop.png` — verified desktop dashboard state.
- `renders/review-dashboard-mobile.png` — verified 390px dashboard state.
- `renders/baseline/{desktop,mobile}.png` — full-page production baseline.
- `renders/{01..10}/{desktop,mobile}.png` — twenty full-page final renders.
- `renders/CAPTURE_REPORT.json` — route status, width, height, visible-image,
  console and page-error evidence.
- `VERIFICATION_REPORT.json` — machine-readable interaction verification.
- `REVIEW_DASHBOARD_VERIFICATION.json` — machine-readable live-dashboard,
  persistence, export and responsive verification.
- `CONTENT_PARITY_VERIFICATION.json` — machine-readable equal-scope checks for
  canonical positioning, all 13 projects, client routes and comparison targets.
- `../OPEN_DESIGN_LAB.cmd` — one-click Windows launcher.

## Verification

All checks were run against the static build served at
`http://127.0.0.1:8912`.

| Gate | Result |
| --- | --- |
| `npm run build` | **PASS** — 26 static pages |
| `npm run gate:lab-content` | **PASS** — 458 canonical-content, selected-base and project-mail-action checks |
| Existing UI gate with the dashboard and all ten lab routes | **PASS** — gutter, overflow, focus, targets, alt, contrast and reduced motion at 11 routes × 2 viewports |
| `node scripts/verify-design-lab.mjs` | **PASS** — 79 route, hover/focus interaction, console, clipping, overflow and reduced-motion checks |
| `node scripts/verify-review-dashboard.mjs` | **PASS** — 26 live route, selected-base default, interaction, comparison, persistence, export, responsive and error checks |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/open-design-lab.ps1 -NoBrowser -NoWait` | **PASS** — clean build, start, readiness and shutdown; port 8912 released |
| `node scripts/capture-design-lab.mjs` | **PASS** — 20 full-page renders and two ordered contact sheets |
| `npm run gate:evidence` | **PASS** — 13 projects, 26 immutable links |
| `npm run test:evidence` | **PASS** — 4/4 evidence-contract mutants killed |
| Production `npm run gate:ui` | **PASS** — 5 routes × 2 viewports |
| Authenticated `npm run gate:links` | **PASS** — 26 pages, 904 anchors, 79 external and 27 internal targets |

The unauthenticated link run hit GitHub API HTTP 403 after exhausting the API
rate limit. Re-running with the existing `gh` credential supplied as
`GITHUB_TOKEN` passed every link and action; no credential is stored in the
repository or report.

## Exact restart point

1. Double-click `OPEN_DESIGN_LAB.cmd`; the dashboard opens directly on selected
   base 10 at 1440. Check it again at 390 and in reduced-motion mode.
2. Use **Compare reference** only when a proposed change needs a scan-density
   check against 06. Do not reopen the base selection without new evidence.
3. Define the next improvement as one bounded behavior/visual slice against 10
   with explicit desktop, mobile, reduced-motion and canonical-content gates.
4. Do not merge this branch merely to begin improvement work. Production
   integration still requires a separately authorized branch and gate.

The project-page action removal exists only on this lab branch. No merge, push,
publication or live-site deployment has been performed.
