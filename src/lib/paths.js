// Base-aware internal links.
//
// Astro rewrites URLs it owns — imported assets, the output of astro:assets —
// but it does not touch a string you hand-wrote into an href. A site published
// at https://user.github.io/hub/ therefore renders every hand-written `/work/`
// as a link to the domain root, which 404s. That failure is silent at build
// time and total at runtime, which is the worst combination.
//
// So no page writes a leading-slash path directly; they all go through here.
// `BASE_URL` is '/' until astro.config.mjs sets `base`, so this is a no-op today
// and correct the moment the publish destination is decided.
const BASE = import.meta.env.BASE_URL;

export function href(path = '/') {
  if (/^([a-z]+:|\/\/|#|\?)/i.test(path)) return path; // external, fragment, query
  const clean = path.replace(/^\/+/, '');
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return `${base}${clean}`;
}

// Fragment links that must survive being followed from a project page: a bare
// "#help" scrolls nowhere there, because #help only exists on the home page.
export function homeAnchor(id) {
  return `${href('/')}#${id}`;
}

// The filtered view of the system list. Query first, fragment last — the other
// way round the browser reads "?route=fix" as part of the fragment and the
// filter silently never applies.
export function homeFiltered(route) {
  return `${href('/')}?route=${route}#work`;
}
