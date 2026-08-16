# Current design audit

Baseline: `origin/main` at `4f0f32d`  
Inspected: live 1440×900 and 390×844 full-page renders on 2026-08-16

## Decision

The current site is credible, fast and unusually honest. It is not visually
weak. Its remaining problem is that almost every surface uses the same solution:
dark or pale neutral field, Archivo headline, Plex metadata, green state colour,
one-pixel rule, and a left-to-right row. The system is coherent enough that the
thirteen products begin to look like content inserted into one portfolio skin.

That suppresses the most valuable hiring signal: these are thirteen different
working products, built by a person who made specific design and engineering
judgements in each one.

## What already works and must not regress

- Five-second message is strong: independent AI engineer, thirteen systems,
  open now.
- The first product runs in the desktop fold and degrades honestly to a still
  plus direct link on mobile.
- The complete project list is visible without JavaScript or carousel paging.
- Every system carries a concrete bought outcome and a specific hard part.
- Filters, live/source/contact actions, keyboard focus, reduced motion, gutter,
  overflow and contrast already have executable gates.
- No fake clients, awards, testimonials or commercial metrics are used.

## Concrete causes of the generic / insufficiently crafted impression

### 1. The page has one visual voice, while the work has thirteen

The hero stage changes products, but the surrounding chrome remains green,
black and grey. The index then removes imagery entirely. A visitor remembers
the hub palette rather than Atlas violet, Relay coral, Gauge yellow or LeadDock
purple. This makes breadth look like repetition.

### 2. Section rhythm is disciplined but too predictable

Hero, stage, ruled index, three ruled service rows, and ruled footer all use the
same max-width, horizontal rule and restrained density. Nothing after the live
stage creates a second visual peak. On the 5448px desktop page the eye learns
the grammar once and then coasts.

### 3. The live stage proves operation but not a story

The iframe is honest evidence, yet the surrounding treatment is generic browser
chrome and a thirteen-tab rail. It does not point to the important interaction,
state, result or decision inside each system. At contact-sheet size most dense
operator interfaces become white rectangles.

### 4. Project discovery is efficient but visually recessive

The numbered list is better than thirteen identical cards, but every row has
the same weight. The title, blurb, taxonomy and hard-part note compete in a
repeated four-line pattern. There is no spatial grouping by client problem and
no product preview on the part of the page where comparison happens.

### 5. Evidence looks like documentation, not a result

The evidence routes are strong engineering work. Visually, they use the same
definition-list and rule language as the rest of the site. A pass, a killed
fault, a negative benchmark decision and a rerun command should not all look
like ordinary metadata.

### 6. Display typography is selected but not art-directed

Archivo is a thoughtful, self-hosted choice with a width axis. The site uses it
mostly as a conventional bold sans at familiar sizes. The width axis, cropping,
contrast between condensed and expanded forms, and typographic composition are
not used to create identity.

### 7. Human presence is technically present and emotionally minor

The small circular portrait and duplicated name establish authorship, but they
read like account chrome. The strongest human material—the decisions to reject
a stronger-scoring Gauge model, preserve a negative SignalRoom result, or make
Relay fail exactly once—is expressed in system copy, not visibly owned as
Mantas's judgement.

### 8. The detail page is a strong template, repeated thirteen times

Running stage, four facts, evidence, rerun, limitation, CTA and related rows is
a sound information architecture. Because every project gets the same sequence
and visual treatment, the page does not amplify what is unique about that
project: a call timeline, a document, an inspection image or a crash receipt.

### 9. Interaction is functional but rarely expressive

Filter chips and product tabs work. Their feedback is a conventional colour
toggle. There is no interaction that helps compare before/after, reveal a test
receipt, focus one project family, or make a product-specific state legible.

### 10. Mobile is correct but becomes a very long catalogue

The 7032px mobile page has excellent gutters and no clipping. It also repeats
thirteen near-identical rows before the client routes. Correct stacking alone
does not create mobile rhythm; grouping, selective visual anchors or clearer
chaptering is needed.

## Hiring outcome implication

The next improvement is not more decoration and not another global token pass.
It is selective differentiation: make products, evidence and the person visibly
distinct while preserving the existing message and access path. Batch 1 isolates
ten ways to do that so the owner can select mechanisms rather than accept or
reject an inseparable redesign.

