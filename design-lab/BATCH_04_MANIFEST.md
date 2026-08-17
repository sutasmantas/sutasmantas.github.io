# Central portfolio visual lab — Batch 4 manifest

Date: 2026-08-17
Selected control: `/design-lab/32/`
Review routes: `/design-lab/33/` through `/design-lab/42/`
Production route: `/`
Status: **PASS_READY_FOR_OWNER_SELECTION**

## Owner-selected base composition

The owner export in `BATCH_03_DECISIONS.json` selected:

- 22 — magnetic case/live actions;
- 23 — keyboard/pointer screenshot glare;
- 25 — proximity-magnified project rows;
- 27 — proof-number ticker, after the `100% → NaN` defect was fixed;
- 28 — palette-matched click sparks;
- 31 — flowing focused-row marquee.

Routes 24, 26, 29, and 30 were rejected as overly playful, harder to read, or
obstructive to the screenshot. The owner's route-24 note also rejected the
existing directional project wipe. Base 32 therefore replaces the 0.62-second
full-card wipe with a restrained 0.18-second opacity/8px settle. It retains all
13 complete project records and the previously selected perimeter, lens,
active-row signal, and spectral headline.

`/` now reuses base 32 with production metadata and public wording. Old lab
routes 21–31 remain available as historical comparisons but are not the
current dashboard.

## Inspected source basis

- React Bits, 45,639 GitHub stars observed 2026-08-17, pinned commit
  [`4e0e030`](https://github.com/DavidHDev/react-bits/commit/4e0e030193b563be6be33d928f77d0d01cefe237),
  MIT + Commons Clause. Inspected `SpotlightCard`, `TiltedCard`, `ChromaGrid`,
  and `ScrollStack` JSX/CSS sources.
- Magic UI, 21,980 stars observed 2026-08-17, MIT, pinned commit
  [`2d671cc`](https://github.com/magicuidesign/magicui/commit/2d671cc6c0e0f40e28682c9cbddd16694dcfe627).
  Inspected `bento-grid.tsx`, `grid-pattern.tsx`, `magic-card.tsx`, and
  `shine-border.tsx`.
- Motion Primitives, 5,995 stars observed 2026-08-17, MIT, pinned commit
  [`92586e6`](https://github.com/ibelick/motion-primitives/commit/92586e62a951eb9b6bfd1cc7c8a4e6e2ab6ba17d).
  Inspected `animated-background.tsx`, `scroll-progress.tsx`, and
  `border-trail.tsx`.
- Codrops OnScrollTextHighlight, 96 stars observed 2026-08-17, MIT, pinned
  commit [`362914e`](https://github.com/codrops/OnScrollTextHighlight/commit/362914e60aa5284cf2d0a3c25a344a2513a059b0).
  Inspected its intersection-triggered highlight implementations and adapted
  the trigger while keeping the portfolio sentence continuously readable.

Only framework-neutral interaction and layout mechanisms were adapted. No
React, GSAP, or Lenis runtime was added; the existing Motion dependency and
native browser APIs implement the lab.

## Variant matrix

| # | Impact | One changed surface | Adapted source | Visible difference |
| ---: | --- | --- | --- | --- |
| 33 | Large | Opening proof figures | Magic UI `BentoGrid` | The same three facts become an asymmetric 13-dominant evidence bento |
| 34 | Medium | Selected proof-card border | React Bits `SpotlightCard` + Magic UI `MagicCard` | A bounded project-colour spotlight follows the pointer around the card edge |
| 35 | Medium | Selected proof-card depth | React Bits `TiltedCard` | The complete evidence card tilts no more than 2.4° and settles flat |
| 36 | Large | Project-directory field | React Bits `ChromaGrid` | The directory receives a broad active-project colour wash without copy changes |
| 37 | Medium | Active-row state | Motion Primitives `AnimatedBackground` | One shared backplate slides between selected rows |
| 38 | Large | Proof-deck framing | Magic UI `GridPattern` | A labelled architectural grid turns the deck into one measured systems field |
| 39 | Medium | Page orientation | Motion Primitives `ScrollProgress` | A 00–100 right-edge spine reports native page progress |
| 40 | Large | Client-route section | React Bits `ScrollStack` | The three complete route rows form a restrained sticky stack |
| 41 | Medium | Opening positioning copy | Codrops `OnScrollTextHighlight` | An ink band travels behind the unchanged, continuously readable sentence |
| 42 | Medium | Case/live actions | Motion Primitives `BorderTrail` + Magic UI `ShineBorder` | A short project-colour trail runs once around a hovered/focused action |

## Frozen acceptance contract

- Base 32 and routes 33–42 expose all 13 canonical projects exactly once with
  complete descriptions, evidence notes, case links, and live links.
- Each derivative changes only its named surface relative to base 32.
- `100%` never becomes `NaN`; all proof tickers resolve to their exact text.
- The rejected pixel wipe, title decrypt, line-shadow title, and screenshot
  crop do not enter base 32.
- Project changes in base 32 use no clip wipe and settle in at most 0.18 seconds.
- Pointer effects have keyboard/tap paths where the underlying action is
  interactive; reduced motion disables decorative and transition motion.
- Desktop and 390px mobile retain complete copy, readable actions, native
  scrolling, and no horizontal overflow.
- No project-specific email action and no new runtime dependency.

## Verification closure

- `npm run build`: **PASS** — 58 static pages.
- `node scripts/verify-content-parity.mjs`: **PASS** — 549 content and
  equal-scope checks.
- `node scripts/verify-design-lab.mjs`: **PASS** — 756 route, interaction,
  console, clipping, responsive, ticker, transition, and reduced-motion checks.
- `node scripts/verify-review-dashboard.mjs`: **PASS** — 30 dashboard,
  persistence, export, responsive, and error checks.
- `node scripts/capture-design-lab.mjs`: **PASS** — 22 full-page renders plus
  two ordered Batch 4 contact sheets.
- `node scripts/gate.mjs`: **PASS** — gutter, overflow, focus, target size,
  contrast, and reduced motion on 5 production routes × 2 viewports.
- `npm run gate:evidence`: **PASS** — 13 projects and 26 immutable links.
- `npm run test:evidence`: **PASS** — 4/4 evidence-contract mutants killed.
- `npm run gate:links`: **PASS** — all links and actions across 58 pages and
  2,279 anchors resolve.
- `git diff --check`: **PASS**.

## Decision table

| # | Decision | Revision request or reason |
| ---: | --- | --- |
| 33 |  |  |
| 34 |  |  |
| 35 |  |  |
| 36 |  |  |
| 37 |  |  |
| 38 |  |  |
| 39 |  |  |
| 40 |  |  |
| 41 |  |  |
| 42 |  |  |
