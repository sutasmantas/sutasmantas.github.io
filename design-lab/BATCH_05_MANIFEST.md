# Central portfolio visual lab — Batch 5 manifest

Date: 2026-08-17
Selected control: `/design-lab/43/`
Homepage review routes: `/design-lab/44/` through `/design-lab/48/`
Shared case review routes: `/design-lab/case/49/<slug>/` through `/design-lab/case/53/<slug>/`
Production route: `/`
Status: **PASS_READY_FOR_OWNER_SELECTION**

## Integrated Batch 4 decision

The exact owner export is preserved in `BATCH_04_DECISIONS.json`. Base 43
combines accepted routes 33, 34, 35, 36, and 42 with the previous base 32.
Rejected routes 37–41 are excluded. The production home page now renders base
43 and removes the redundant instruction beginning “Choose a system above”.

All 13 project records, complete descriptions, evidence notes, case links, and
live links remain canonical. The large selected screenshot stays lazy on the
initial critical path; selecting, hovering, or focusing a project explicitly
warms its screenshot. Once the directory approaches the viewport, the
remaining screenshots warm sequentially during idle time. A selected image
shows an accessible loading state until it resolves.

## Research and source basis

- React Bits, pinned commit
  [`4e0e030`](https://github.com/DavidHDev/react-bits/commit/4e0e030193b563be6be33d928f77d0d01cefe237):
  inspected `TextPressure` and `AccordionGallery` source and styles.
- Magic UI, pinned commit
  [`2d671cc`](https://github.com/magicuidesign/magicui/commit/2d671cc6c0e0f40e28682c9cbddd16694dcfe627):
  inspected its terminal and bento implementations.
- Motion Primitives, pinned commit
  [`92586e6`](https://github.com/ibelick/motion-primitives/commit/92586e62a951eb9b6bfd1cc7c8a4e6e2ab6ba17d):
  inspected its accordion and text-effect implementations.

The repository remains Astro with native browser APIs and its existing Motion
dependency. No React, GSAP, animation framework, or new runtime dependency was
added.

## Variant matrix

| # | Scope | Impact | What to test |
| ---: | --- | --- | --- |
| 44 | Opening headline | Large | Move across the headline; nearby letters widen and gain weight, then return without clipping on mobile |
| 45 | Opening composition | Large | The opening becomes a split evidence stage, with the proof block kept clear of the headline |
| 46 | Opening background | Medium | Move across the opening; a restrained dot field brightens around the pointer without covering copy |
| 47 | Final contact actions | Large | Hover or keyboard-focus Email or GitHub; the active route expands and remains readable |
| 48 | Final contact boundary | Large | A single oversized contact rail moves across the ending and pauses on hover or keyboard focus |
| 49 | Shared case navigation | Large | Use the sticky four-stop spine to move between overview, product, evidence, and related work |
| 50 | Shared case evidence layout | Large | Compare the same facts and evidence in a three-column bento hierarchy |
| 51 | Shared case rerun proof | Large | Use the verification terminal and copy the exact rerun command |
| 52 | Shared case reading density | Large | Open the collapsed evidence record; no canonical evidence is removed from the page |
| 53 | Shared case opening hierarchy | Large | Compare the evidence-first opening, where artifact, test, and hosted gate links appear immediately |

Case variants use Atlas in the dashboard comparison, and each variant exposes
a 13-project switcher so the same shared template can be checked with every
project’s actual title, copy, screenshot, links, and evidence.

## Frozen acceptance contract

- Production is base 43 and contains only the accepted Batch 4 mechanisms.
- The redundant directory instruction is absent.
- All 13 canonical projects remain present exactly once on the home page.
- Project screenshots expose visible loading feedback, resolve without broken
  images, and warm before or when the user selects them.
- Routes 44–46 change the opening; 47–48 change the ending; 49–53 change the
  shared case template. They do not weaken or replace canonical project copy.
- All 65 case experiment routes are `noindex`; production work routes remain
  indexable.
- Desktop and 390px mobile have no clipping or horizontal overflow. All
  interactions have keyboard behavior and reduced-motion handling.
- No project-specific mail action and no new runtime dependency.

## Verification closure

- `npm run build`: **PASS** — 129 static pages.
- `node scripts/verify-content-parity.mjs`: **PASS** — 605 checks.
- `node scripts/verify-design-lab.mjs`: **PASS** — 1,003 interaction, console,
  overflow, responsive, screenshot-loading, and reduced-motion checks.
- `node scripts/verify-review-dashboard.mjs`: **PASS** — 32 dashboard,
  persistence, export, responsive, and error checks.
- `node scripts/capture-design-lab.mjs`: **PASS** — 22 full-page renders plus
  two Batch 5 contact sheets.
- `node scripts/gate.mjs`: **PASS** — 5 production routes × 2 viewports.
- `npm run gate:evidence`: **PASS** — 13 projects and 26 immutable links.
- `npm run test:evidence`: **PASS** — 4/4 evidence-contract mutants killed.
- `npm run gate:links`: **PASS** — 129 pages and 5,123 anchors.
- `git diff --check`: **PASS**.

## Decision table

| # | Decision | Revision request or reason |
| ---: | --- | --- |
| 44 |  |  |
| 45 |  |  |
| 46 |  |  |
| 47 |  |  |
| 48 |  |  |
| 49 |  |  |
| 50 |  |  |
| 51 |  |  |
| 52 |  |  |
| 53 |  |  |
