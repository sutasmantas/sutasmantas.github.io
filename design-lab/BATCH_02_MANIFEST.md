# Central portfolio visual lab — Batch 2 manifest

Date: 2026-08-16
Base: `/design-lab/10/` — selected complete motion proof deck
Review routes: `/design-lab/11/` through `/design-lab/20/`
Status: **PASS_READY_FOR_OWNER_SELECTION**

## Frozen acceptance contract

Every Batch 2 route is a derivative of base 10, not a new portfolio concept.
Each route must:

- retain the base-10 hero, proof figures, three client-route groups and one
  responsive proof deck;
- expose all 13 canonical project records exactly once, with unchanged title,
  description, evidence note, case link and live link;
- change one named visual or interaction system only;
- support hover, keyboard focus and tap selection;
- render without horizontal overflow, clipped copy or unreadable actions at
  1440px and 390px;
- stop decorative and transition motion under `prefers-reduced-motion` and the
  lab's forced reduced-motion control;
- add no project-specific email action and no new runtime dependency.

## Inspected source basis

The mechanisms below were inspected in their upstream source before adaptation.
They are copied as small framework-neutral mechanisms, not imported as React
components or treated as replacement design systems.

- Magic UI, MIT, 21,978 GitHub stars observed 2026-08-16, pinned source commit
  [`2d671cc`](https://github.com/magicuidesign/magicui/commit/2d671cc6c0e0f40e28682c9cbddd16694dcfe627).
- Codrops HoverGrid, MIT, pinned source commit
  [`0a59474`](https://github.com/codrops/HoverGrid/commit/0a59474715182c0d0bc2219c48f9cdd4f570cf9b).
- Codrops 3DStackMotion, MIT, pinned source commit
  [`75cbda9`](https://github.com/codrops/3DStackMotion/commit/75cbda91ed26d31aeeb5a5b9887848e5a7005c7f).

## Variant matrix

| # | One changed system | Adapted source mechanism | Intended drastic difference | Base-10 invariants |
| ---: | --- | --- | --- | --- |
| 11 | Proof-deck perimeter | Magic UI `border-beam.tsx`: offset-path beam around a masked border | Two high-energy signal beams orbit the evidence object | Layout, content and selection unchanged |
| 12 | Pointer lighting | Magic UI `magic-card.tsx`: pointer-relative radial gradient | The proof deck becomes a cursor-lit inspection surface | No movement on load; keyboard state remains complete |
| 13 | Screenshot inspection | Magic UI `lens.tsx`: radial mask plus scaled duplicate | A large circular loupe exposes product-detail pixels | Original image remains visible; lens is optional decoration |
| 14 | Project-field background | Magic UI `interactive-grid-pattern.tsx`: hover-reactive SVG cells | A live technical grid responds behind the directory | Grid is non-blocking and absent from accessibility flow |
| 15 | Surface texture | Magic UI `noise-texture.tsx`: SVG turbulence texture | The project field becomes a tactile printed/noise surface | Text contrast and controls remain unchanged |
| 16 | Active-row signal | Magic UI `shimmer-button.tsx`: conic sweep masked inside a control | The chosen project emits a hard luminous scan sweep | All 13 rows remain visible and usable |
| 17 | Hero typography material | Magic UI `animated-gradient-text.tsx`: animated background-position clipping | The base headline becomes a moving spectral object | Exact headline wording and hierarchy remain |
| 18 | Project-change transition | Magic UI `blur-fade.tsx`: blur, offset and opacity transition | Each chosen proof resolves sharply from a directional blur | Reduced motion swaps instantly |
| 19 | Screenshot reveal | Codrops HoverGrid `getClipPath` + inner-image scale | Selected screenshots cut in from a route-specific edge | One selected card; no hidden project index |
| 20 | Evidence-object depth | Codrops 3DStackMotion rotated 3D content and layered Z movement | The proof deck becomes a deep, tilted stack that settles on selection | No scroll hijack; user-triggered and reduced-motion safe |

## Decision table

| # | Decision | Revision request or reason |
| ---: | --- | --- |
| 11 |  |  |
| 12 |  |  |
| 13 |  |  |
| 14 |  |  |
| 15 |  |  |
| 16 |  |  |
| 17 |  |  |
| 18 |  |  |
| 19 |  |  |
| 20 |  |  |

## Verification closure

- `npm run build`: **PASS** — 36 static pages.
- `node scripts/verify-content-parity.mjs`: **PASS** — 512 canonical-content
  and equal-scope checks across base 10 and derivatives 11–20.
- `node scripts/verify-design-lab.mjs`: **PASS** — 262 route, interaction,
  console, clipping, responsive and reduced-motion checks.
- `node scripts/verify-review-dashboard.mjs`: **PASS** — 26 dashboard,
  persistence, comparison, export, responsive and error checks.
- `node scripts/capture-design-lab.mjs`: **PASS** — 22 full-page renders and
  two ordered base-plus-derivative contact sheets.
- Manual visual review caught and corrected the variant-17 mobile headline
  material clipping that the document-width gate did not expose.

No merge, push, publication or production-site change is authorized by this
batch. The next action is owner selection in the live dashboard.
