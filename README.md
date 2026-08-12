# sutasmantas.github.io

The hub for thirteen AI systems that are each open in a browser — no login, no
sales call first. Live at <https://sutasmantas.github.io/>.

Astro, static output, no server runtime. Deployed by GitHub Actions to GitHub
Pages, and the deploy is gated: a build that ships a dead link or loses the page
gutter does not reach the live site.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Everything: a running interface in the fold, three owned proof figures, the three problems clients arrive with, and all thirteen systems with a filter. Deep-linkable via `?route=`. |
| `/work/<slug>/` | One system: what it does, what you get, and what you can check today. |
| `/evidence/` | Public claim-to-artifact ledger: immutable evidence and test links, rerun commands, hosted gates and explicit limits for all thirteen systems. |
| `/evidence/receipt.json` | Machine-readable form of the same thirteen-project receipt. |

There is deliberately no separate index page. It existed, listed the same
thirteen cards in the same order as the home page, and split one job across two
competing pages.

## Content

`src/data/portfolio.js` is the single source of truth. Every `live` and `source`
URL in it was checked with a real HTTP request and answered 200. Routes and
market family names come from a bottom-up taxonomy of 647,272 job postings, 997
of them labelled by reviewers who were shown no category list — they are the
words clients write, not internal capability names.

Each project states its own limit. A demo that hides its boundary is not
evidence, so the boundary is on the page rather than left to be discovered.

## Develop

```bash
npm ci
npm run dev
```

## Gates

Both run in CI on every push, and are worth running before any publish.

The UI gate asserts each route returns 200 before anything else, because a 404
renders a nearly empty page that passes every other check silently.

```bash
npm run build
npm run gate:links          # pass the base as a second argument if one is set
npx astro preview --port 8912 &
npm run gate:ui
```

`scripts/check-links.mjs` — every anchor in the built HTML. Fails on a
placeholder action (`href="#"`, an empty `mailto:`), a fragment with no matching
`id` on that page, an internal route missing from `dist`, or an external URL that
does not answer.

`scripts/gate.mjs` — four routes at 375px and 1440px: the route answers 200, no text within 8px of a
viewport edge, no horizontal overflow, every control reachable by Tab with a
visible focus ring, WCAG 2.5.8 target size, alt text on every image, 4.5:1
contrast measured against each element's resolved background, and nothing
animating under `prefers-reduced-motion`.

The gutter check exists because a `padding: N 0 N` shorthand on an element that
also carried `.wrap` silently cancelled the horizontal gutter, and the result —
body copy flush against the edge of a phone screen — survived several rounds of
looking at screenshots.

## Type

IBM Plex Sans and IBM Plex Mono, self-hosted from `src/assets/fonts`, 148 kB for
two Latin subsets per face. A font CDN is a third party on the critical path and
a privacy leak on every visit. Licensed under OFL 1.1; licence text ships beside
the files.

## Screenshots

`src/assets/shots` holds one 1440×900 capture per system, all taken through the
same viewport in a single pass so the set reads as one system rather than
thirteen. They go through `astro:assets`, so intrinsic dimensions come from the
file, webp is offered, and a missing file is a build error rather than a
production 404.
