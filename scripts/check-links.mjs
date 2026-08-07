// Release gate: every action on the built site must resolve.
//
// This exists because the first slice of the hub shipped `href="#"` on eleven
// buttons and an empty `mailto:`. A card that cannot be opened is worse than no
// card, since the whole claim of the page is that the systems are inspectable.
//
//   node scripts/check-links.mjs [dist-dir]
//
// Internal links are resolved against the built output on disk, so a broken
// route fails here rather than in production. External links get a real request.
// Exits non-zero on the first category with failures.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, posix, resolve } from 'node:path';

const dist = resolve(process.argv[2] ?? 'dist');

// When the site is published under a subpath, every internal href is prefixed
// with `base` but the files still sit at the root of dist, so the prefix has to
// come off before a path can be resolved on disk. Pass it as the second argument
// or in BASE, matching `base` in astro.config.mjs.
const base = (process.argv[3] ?? process.env.BASE ?? '/').replace(/\/*$/, '/');
const unbase = (p) =>
  base !== '/' && p.startsWith(base) ? `/${p.slice(base.length)}` : p;

async function html(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await html(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = await html(dist);
if (pages.length === 0) {
  console.error(`FAIL no html found under ${dist} — build first`);
process.exit(1);
}

const internal = new Map(); // href -> pages referencing it
const external = new Map();
const fragments = new Map();
let anchors = 0;

const note = (map, key, value) => {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(value);
};

for (const page of pages) {
  const body = await readFile(page, 'utf8');
  const route =
    '/' +
    posix
      .normalize(page.slice(dist.length + 1).replaceAll('\\', '/'))
      .replace(/index\.html$/, '');
  const ids = new Set([...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  for (const m of body.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    const href = m[1];
    anchors += 1;
    if (href === '' || href === '#') {
      note(internal, `DEAD(${href || 'empty'})`, route);
    } else if (href.startsWith('http')) {
      note(external, href, route);
    } else if (href.startsWith('mailto:')) {
      if (!href.slice(7).includes('@')) note(internal, href, route);
    } else if (href.startsWith('#')) {
      if (!ids.has(href.slice(1))) note(fragments, `${route}${href}`, route);
    } else {
      note(internal, href.split('?')[0].split('#')[0], route);
    }
  }
}

const failures = [];

for (const [href, from] of internal) {
  if (href.startsWith('DEAD(') || href.startsWith('mailto:')) {
    failures.push(`${href} placeholder action on ${[...new Set(from)].join(', ')}`);
    continue;
  }
  const clean = unbase(href).replace(/^\//, '');
  const candidates = [
    join(dist, clean),
    join(dist, clean, 'index.html'),
    join(dist, clean.replace(/\/$/, '') + '.html'),
  ];
  let ok = false;
  for (const c of candidates) {
    try {
      await stat(c);
      ok = true;
      break;
    } catch {
      /* try next */
    }
  }
  if (!ok) failures.push(`${href} missing in build, linked from ${[...new Set(from)].join(', ')}`);
}

for (const [key, from] of fragments) {
  failures.push(`${key} fragment has no matching id on ${[...new Set(from)].join(', ')}`);
}

const results = await Promise.all(
  [...external.keys()].map(async (url) => {
    for (const method of ['HEAD', 'GET']) {
      try {
        const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(25000) });
        if (res.ok) return null;
        if (method === 'GET') return `${url} → HTTP ${res.status}`;
      } catch (err) {
        if (method === 'GET') return `${url} → ${err.name}`;
      }
    }
    return null;
  }),
);
failures.push(...results.filter(Boolean).map((r) => `${r}, linked from ${[...new Set(external.get(r.split(' → ')[0]))].join(', ')}`));

console.log(`pages ${pages.length} · anchors ${anchors} · external ${external.size} · internal ${internal.size}`);
if (failures.length) {
  for (const f of failures) console.error(`FAIL ${f}`);
  process.exit(1);
}
console.log('PASS every link and action resolves');
