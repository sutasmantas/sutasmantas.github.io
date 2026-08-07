# Deploying

Published as the GitHub **user site**: `https://sutasmantas.github.io/`. It sits
at the domain root, so `astro.config.mjs` sets `site` and no `base`.

`.github/workflows/pages.yml` builds on every push to `main`, runs both gates,
and only then uploads the artifact and deploys. A build that ships a dead link or
loses the page gutter does not reach the live site.

## Moving it later

The build is destination-agnostic, and that was verified rather than assumed: it
was built with `base: '/hub'`, checked that no emitted path escaped the prefix,
served under that subpath, and passed both gates unchanged.

Internal links go through `src/lib/paths.js`, which prefixes
`import.meta.env.BASE_URL`. Fonts and screenshots live in `src/assets`, so Vite
resolves, hashes and base-prefixes them. Nothing writes a leading-slash path by
hand.

| Destination | `astro.config.mjs` |
| --- | --- |
| User site (current) | `site: 'https://sutasmantas.github.io'` |
| Project page | add `base: '/<repo>/'` |
| Custom domain | change `site`, add a `CNAME` file in `public/` |

For a project page, pass the base to the link gate too:
`node scripts/check-links.mjs dist /<repo>`.

## Running the gates locally

```bash
npm ci
npm run build
npm run gate:links
npx astro preview --port 8912 &
npm run gate:ui
```

`gate:ui` takes its routes from `GATE_ROUTES` if you need to point it at a
subpath build.

## What the gates cover

`scripts/check-links.mjs` — every anchor in the built HTML. Fails on a
placeholder action (`href="#"`, an empty `mailto:`), a fragment with no matching
`id` on that page, an internal route missing from `dist`, or an external URL that
does not answer. Currently 15 pages, 393 anchors, 27 external URLs.

`scripts/gate.mjs` — four routes at 375px and 1440px. Gutter (no text within 8px
of a viewport edge), horizontal overflow, keyboard reachability with a visible
focus ring on every stop, WCAG 2.5.8 target size, alt text, 4.5:1 contrast
measured against each element's resolved background, and a
`prefers-reduced-motion` pass that fails anything still carrying a non-zero
transition or animation.

The gutter check exists because a `padding: N 0 N` shorthand on an element that
also carried `.wrap` silently cancelled the horizontal gutter, and the result —
body copy flush against the edge of a phone screen — survived several rounds of
looking at screenshots. It was invisible on a desktop because `max-width` was
already holding content off the edge.
