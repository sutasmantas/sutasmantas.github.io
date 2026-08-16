# Central portfolio visual lab — Batch 1 handoff

Date: 2026-08-16
Status: **PASS_BATCH_01_INTERACTIVE_REVIEW_READY_NOT_SELECTED**
Implementation checkpoint: `f919efa9c849eb44ec254aa91172985415d55e6d`
Initial experiment checkpoint: `26ab9ea726e07c32e6a3fcd17ecc19b0941fc326`
Baseline: `origin/main@4f0f32d`
Branch: `agent/central-portfolio-visual-lab`
Worktree: `C:\Users\masuta\Desktop\Coding\cv\portfolio_demos\worktrees\central_portfolio_visual_lab`

## Decision

Batch 1 is complete. It does not authorize production integration. The ten
routes are substantial, independently adoptable mechanisms—not ten palettes—and
the live production homepage remains unchanged.

The most defensible eventual direction is **01 as the broad compositional
grammar**, selectively combined with **02, 05, 07 and 09**. That combination
improves authored identity, human trust, project discovery and evidence
legibility while preserving the five-second message and direct access. It must
be integrated as a new bounded slice, not by copying every experiment wholesale.

## Open the interactive review artifact

From this worktree, double-click `OPEN_DESIGN_LAB.cmd`. It builds the pinned
site, starts a private local preview at `http://127.0.0.1:8912/design-lab/`,
and opens the review dashboard in the default browser. Keep the launcher window
open while reviewing; press Enter in that window to stop the local server.

The dashboard embeds the real routes rather than screenshots. It supports live
scrolling and controls, 1440/390 viewport switching, a second independent
production-baseline preview, reduced-motion review, full-size opening,
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
| 05 | **REVISE** | Desktop evidence lens is high-value; mobile needs the preview adjacent to the selected group rather than after the full index. |
| 06 | **REVISE** | Keep per-product accents and image mats; do not ship the registry itself as a main discovery surface. |
| 07 | **KEEP** | Best conversion of invisible reliability work into inspectable proof; make receipt language project-specific. |
| 08 | **REVISE** | Strong case orientation, but thirteen fully bespoke spines are expensive; reserve for featured cases or define 3–4 artifact families. |
| 09 | **KEEP** | Adds defensible human judgement without fake social proof; avoid duplicating the full portrait if 02 is selected. |
| 10 | **REVISE** | Motion is purposeful and accessible; use one proof comparison, keep it user-triggered, and retain the immediate reduced-motion path. |

The owner-facing decision cells remain blank in `VARIANT_MANIFEST.md`.

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
- `../OPEN_DESIGN_LAB.cmd` — one-click Windows launcher.

## Verification

All checks were run against the static build served at
`http://127.0.0.1:8912`.

| Gate | Result |
| --- | --- |
| `npm run build` | **PASS** — 26 static pages |
| Existing UI gate with the dashboard and all ten lab routes | **PASS** — gutter, overflow, focus, targets, alt, contrast and reduced motion at 11 routes × 2 viewports |
| `node scripts/verify-design-lab.mjs` | **PASS** — 68 route, keyboard interaction, console, overflow and reduced-motion checks |
| `node scripts/verify-review-dashboard.mjs` | **PASS** — 24 live route, interaction, comparison, persistence, export, responsive and error checks |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/open-design-lab.ps1 -NoBrowser -NoWait` | **PASS** — clean build, start, readiness and shutdown; port 8912 released |
| `node scripts/capture-design-lab.mjs` | **PASS** — 20 full-page renders and two ordered contact sheets |
| `npm run gate:evidence` | **PASS** — 13 projects, 26 immutable links |
| `npm run test:evidence` | **PASS** — 4/4 evidence-contract mutants killed |
| Production `npm run gate:ui` | **PASS** — 5 routes × 2 viewports |
| Authenticated `npm run gate:links` | **PASS** — 26 pages, 643 anchors, 79 external and 27 internal targets |

The unauthenticated link run hit GitHub API HTTP 403 for six repository roots,
matching the baseline environment limitation. Re-running with the existing
`gh` credential supplied as `GITHUB_TOKEN` passed every link and action; no
credential is stored in the repository or report.

## Exact restart point

1. Double-click `OPEN_DESIGN_LAB.cmd` and review all ten live experiments at
   1440 and 390, using the baseline comparison where needed.
2. Record `KEEP`, `REVISE` or `REJECT` plus revision notes in the dashboard,
   then use **Export decisions** and preserve the resulting JSON for handoff.
3. Identify conflicts before combining choices: 01/03 compete for global type
   voice; 02/09 compete for portrait prominence; 05/06 compete for the primary
   project index; 04/08 compete for detail-page staging.
4. Authorize one new integration branch with explicit selected mechanisms and
   acceptance criteria. Do not merge this branch merely to begin integration.

No second visual batch, production edit, merge, push or publication has been
performed.
