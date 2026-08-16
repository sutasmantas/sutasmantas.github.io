# Central portfolio visual lab — Batch 3 manifest

Date: 2026-08-16
Combined control: `/design-lab/21/`
Review routes: `/design-lab/22/` through `/design-lab/31/`
Status: **PASS_READY_FOR_OWNER_SELECTION**

## Owner-selected base composition

The owner exported `BATCH_02_DECISIONS.json` and selected five mechanisms:

- 11 — signal perimeter;
- 13 — screenshot inspection lens;
- 16 — selected-row shimmer;
- 17 — spectral canonical headline;
- 19 — route-direction project reveal.

Route 21 combines those mechanisms without changing canonical content,
information architecture, links, or project count. Rejected mechanisms 12,
14, 15, 18, and 20 do not enter the new base.

## Frozen acceptance contract

- Route 21 exposes every selected mechanism and all 13 complete project
  records exactly once.
- Routes 22–31 are derivatives of 21 and change one additional named system.
- Every derivative identifies where to look, what action triggers it, what
  visible result to expect, and whether its design impact is small, medium, or
  large.
- All routes preserve exact canonical headline, positioning, descriptions,
  evidence notes, client routes, case links, live links and site contact.
- All 13 project names remain visible from the start in the grouped index.
- Pointer-only decoration has an equivalent keyboard/tap selection path.
- Decorative and transition motion stops under system and forced reduced
  motion.
- 1440px and 390px render without clipped copy, unreadable actions, or
  horizontal overflow.
- No project-specific email action and no new runtime dependency.

## Inspected source basis

- React Bits, 45,607 GitHub stars observed 2026-08-16, pinned commit
  [`4e0e030`](https://github.com/DavidHDev/react-bits/commit/4e0e030193b563be6be33d928f77d0d01cefe237),
  MIT + Commons Clause. Inspected `Magnet`, `GlareHover`, `PixelTransition`,
  `Dock`, `DecryptedText`, `ClickSpark`, and `FlowingMenu` JS/CSS registry
  sources. The restriction permits use inside an application but forbids
  reselling the components themselves.
- Magic UI, 21,978 stars observed 2026-08-16, MIT, pinned commit
  [`2d671cc`](https://github.com/magicuidesign/magicui/commit/2d671cc6c0e0f40e28682c9cbddd16694dcfe627).
  Inspected `number-ticker.tsx` and `line-shadow-text.tsx`.
- Codrops ImageExpansionTypography, MIT, pinned commit
  [`0d61479`](https://github.com/codrops/ImageExpansionTypography/commit/0d614791f94198bcab655762b26a3cb85da851f4).
  Inspected its image-expansion effect structure.

Only small framework-neutral mechanisms are adapted; React/GSAP components
are not imported and no source library replaces the portfolio architecture.

## Variant matrix

| # | Impact | One additional changed system | Adapted source mechanism | Intended visible difference |
| ---: | --- | --- | --- | --- |
| 22 | Small | Project actions | React Bits `Magnet` | Case/live actions pull toward the pointer and settle back |
| 23 | Medium | Screenshot surface | React Bits `GlareHover` | A hard diagonal glare scans across the product screenshot |
| 24 | Medium | Project-change transition | React Bits `PixelTransition` | Selected proof resolves through a grid of disappearing pixels |
| 25 | Medium | Directory proximity | React Bits `Dock` | Nearby project rows magnify around the pointer without hiding titles |
| 26 | Medium | Selected project title | React Bits `DecryptedText` | The exact title unscrambles when a project is selected |
| 27 | Small | Proof figures | Magic UI `NumberTicker` | The 13, 10, and 100% figures count on explicit hover/focus |
| 28 | Small | Selection feedback | React Bits `ClickSpark` | A short palette-matched spark confirms project selection |
| 29 | Medium | Proof-card title material | Magic UI `LineShadowText` | The selected title receives a moving hard-line shadow |
| 30 | Large | Screenshot crop | Codrops `ImageExpansionTypography` | The screenshot expands from a typographic proof strip on interaction |
| 31 | Large | Directory hover | React Bits `FlowingMenu` | A repeated title/evidence marquee runs inside the focused row |

The impact labels describe immediate visual prominence, not implementation
quality. Routes 22, 27, and 28 are intentionally microinteractions. They should
be rejected if the owner wants only changes that materially alter the first
impression.

## Decision table

| # | Decision | Revision request or reason |
| ---: | --- | --- |
| 22 |  |  |
| 23 |  |  |
| 24 |  |  |
| 25 |  |  |
| 26 |  |  |
| 27 |  |  |
| 28 |  |  |
| 29 |  |  |
| 30 |  |  |
| 31 |  |  |

## Verification closure

- `npm run build`: **PASS** — 47 static pages.
- `node scripts/verify-content-parity.mjs`: **PASS** — 512 canonical-content
  and equal-scope checks across combined base 21 and derivatives 22–31.
- `node scripts/verify-design-lab.mjs`: **PASS** — 468 route, mechanism,
  interaction, console, clipping, responsive and reduced-motion checks.
- `node scripts/verify-review-dashboard.mjs`: **PASS** — 30 dashboard,
  persistence, comparison, export, responsive and error checks.
- `node scripts/capture-design-lab.mjs`: **PASS** — 22 full-page renders and
  two ordered base-plus-derivative contact sheets.
- `npm run gate:evidence`: **PASS** — 13 projects and 26 immutable links.
- `npm run test:evidence`: **PASS** — all four evidence-contract mutants
  rejected and the clean control accepted.
- `git diff --check`: **PASS**.

Manual visual review covered the complete desktop/mobile portfolio, the live
review dashboard, and representative interaction-heavy routes. It also caught
and corrected the mobile route-bar discoverability issue: all eleven Batch 03
routes now appear without horizontal scrolling. The later owner-clarity pass
made every description an exact test instruction, added candid impact labels,
and caught a parsing defect that prevented the `100%` figure in route 27 from
animating. All three route-27 proof values now animate and resolve exactly.

The verified lab was merged into `main` at `5fa6b22`. No derivative has replaced
the production homepage; the next action is owner selection in the live Batch
03 dashboard.
