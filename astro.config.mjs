import { defineConfig } from 'astro/config';

// Static output only. The hub deploys onto the same free GitHub Pages setup the
// thirteen project workspaces already use, so nothing here may depend on a
// server runtime.
//
// Published as the GitHub user site, so it sits at the domain root and needs no
// `base`. Every internal link still goes through src/lib/paths.js and every asset
// through the Vite pipeline, so setting `base` later — for a project page or a
// custom domain — is a one-line change; that was verified by building against
// `base: '/hub'` and running both gates on the result.
export default defineConfig({
  site: 'https://sutasmantas.github.io',
  output: 'static',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
