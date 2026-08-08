// Release gates for the hub, run against the built output over HTTP.
//
//   node scripts/gate.mjs http://127.0.0.1:8912
//
// These are the checks I got wrong by eye and want a machine to catch:
//
//   gutter    Text touching the screen edge. Caused by `padding: N 0 N` on an
//             element that also carries .wrap — the shorthand resets the
//             horizontal gutter to zero and Astro's scoped style wins. It looked
//             fine on a desktop because max-width was already keeping content
//             off the edge, and only showed up at phone widths.
//   overflow  Anything sticking out horizontally that is not deliberately
//             clipped by an ancestor (the mobile screenshot crops are).
//   focus     Every interactive element must take focus and show a visible ring.
//   target    WCAG 2.5.8: standalone controls at least 24x24 CSS px. Links that
//             compute to display:inline are exempt by the criterion itself,
//             because they are sized by the sentence they sit in.
//   alt       Every content image needs alt text; decorative ones need alt="".
//   contrast  Body and label text against its real background, at 4.5:1.
//             Screen-reader-only text is exempt — it is never shown.
//   route     The page answers 200 at all. Without this every other check
//             silently passes on a 404.
//
// Exits non-zero listing every failure, not just the first.
import { chromium } from 'playwright';

const origin = process.argv[2] ?? 'http://127.0.0.1:8912';
const ROUTES = (process.env.GATE_ROUTES ?? '/,/work/relay/,/work/gauge/,/work/signalroom/').split(',');
const VIEWPORTS = [
  { name: 'phone', width: 375, height: 812 },
  { name: 'desktop', width: 1440, height: 1000 },
];

const failures = [];
const fail = (route, vp, gate, detail) =>
  failures.push(`${gate.padEnd(9)} ${route} @${vp} — ${detail}`);

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  for (const route of ROUTES) {
    // A route that 404s renders an almost empty page, which sails through every
    // check below. The gate reported PASS on a page that had just been deleted,
    // so status is now asserted before anything else runs.
    const res = await page.goto(origin + route, { waitUntil: 'load' });
    if (!res || !res.ok()) {
      fail(route, vp.name, 'route', `HTTP ${res ? res.status() : 'no response'}`);
      continue;
    }

    const report = await page.evaluate((isPhone) => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const clipped = (el) => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          if (getComputedStyle(p).overflow !== 'visible') return true;
        }
        return false;
      };
      const offscreen = (r) => r.width === 0 && r.height === 0;

      const overflow = [];
      const gutter = [];
      const targets = [];
      const alts = [];

      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (offscreen(r)) continue;
        const cs = getComputedStyle(el);
        if (cs.position === 'absolute' && r.right < 0) continue; // .skip, .sr

        const label = `${el.tagName.toLowerCase()}.${String(el.className || '').trim().split(/\s+/)[0] || '-'}`;

        if (!clipped(el) && (r.right > vw + 1 || r.left < -1)) {
          overflow.push(`${label} [${Math.round(r.left)}→${Math.round(r.right)}] vw=${vw}`);
        }

        // A text-bearing leaf sitting within 8px of either edge means the page
        // gutter was lost somewhere up the tree.
        const ownText = Array.from(el.childNodes)
          .filter((n) => n.nodeType === 3)
          .map((n) => n.textContent.trim())
          .join('');
        if (ownText.length > 12 && cs.position !== 'fixed' && !clipped(el)) {
          if (r.left < 8 || r.right > vw - 8) {
            gutter.push(`${label} left=${Math.round(r.left)} right=${Math.round(vw - r.right)} "${ownText.slice(0, 34)}"`);
          }
        }
      }

      for (const el of document.querySelectorAll('a[href], button')) {
        const r = el.getBoundingClientRect();
        if (offscreen(r) || el.hidden || el.getClientRects().length === 0) continue;
        if (el.getAttribute('aria-hidden') === 'true' || el.tabIndex < 0) continue;
        if (getComputedStyle(el).display === 'inline') continue; // 2.5.8 inline exception
        if (isPhone && (r.height < 24 || r.width < 24)) {
          targets.push(`${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 26)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
      }

      for (const img of document.querySelectorAll('img')) {
        if (img.getAttribute('alt') === null) alts.push(img.currentSrc || img.src);
      }

      // Contrast, measured against the nearest opaque ancestor background.
      const lum = (c) => {
        const [r, g, b] = c.map((v) => {
          const s = v / 255;
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      // Chromium serialises color-mix() as `color(srgb 0.04 0.1 0.08 / 0.16)` —
      // components in 0..1, alpha after a slash. Read as rgb() those floats
      // become near-black and the alpha is missed entirely, so a translucent
      // chip was scored as an opaque background and reported a false failure.
      const parse = (str) => {
        const srgb = str.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);
        if (srgb) return srgb.slice(1, 4).map((v) => Number(v) * 255);
        return (str.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
      };
      const alphaOf = (str) => {
        if (str === 'transparent') return 0;
        const slash = str.match(/\/\s*([\d.]+%?)\s*\)/);
        if (slash) return slash[1].endsWith('%') ? parseFloat(slash[1]) / 100 : Number(slash[1]);
        if (str.startsWith('rgba')) return Number((str.match(/[\d.]+/g) || [])[3] ?? 1);
        return 1;
      };
      const bgOf = (el) => {
        for (let p = el; p; p = p.parentElement) {
          const c = getComputedStyle(p).backgroundColor;
          if (alphaOf(c) > 0.85) return parse(c);
        }
        return [0, 0, 0];
      };
      const ratio = (a, b) => {
        const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
        return (hi + 0.05) / (lo + 0.05);
      };

      // Text clipped to a 1px box is screen-reader-only: it is never presented
      // visually, so the contrast criterion does not apply to it. Without this
      // the gate reports on .sr labels, which is noise that trains you to skim
      // its output.
      const srOnly = (el) => {
        const r = el.getBoundingClientRect();
        if (r.width <= 1 || r.height <= 1) return true;
        const cs = getComputedStyle(el);
        return cs.clipPath === 'inset(50%)' || cs.clip === 'rect(0px, 0px, 0px, 0px)';
      };

      const contrast = [];
      const seen = new Set();
      for (const el of document.querySelectorAll('p, span, dd, dt, li, h1, h2, h3, b, a, button, figcaption, legend')) {
        const r = el.getBoundingClientRect();
        if (offscreen(r) || srOnly(el)) continue;
        const cs = getComputedStyle(el);
        const own = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
        if (own.length < 2) continue;
        const key = `${cs.color}|${cs.fontSize}|${el.tagName}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const px = parseFloat(cs.fontSize);
        const bold = Number(cs.fontWeight) >= 700;
        const large = px >= 24 || (px >= 18.66 && bold);
        const need = large ? 3 : 4.5;
        const got = ratio(parse(cs.color), bgOf(el));
        if (got < need) {
          contrast.push(`${el.tagName.toLowerCase()} ${cs.color} on rgb(${bgOf(el)}) ${got.toFixed(2)}:1 need ${need} @${px}px "${own.slice(0, 26)}"`);
        }
      }

      return { overflow, gutter, targets, alts, contrast, scrollW: de.scrollWidth, vw };
    }, vp.name === 'phone');

    if (report.scrollW > report.vw) fail(route, vp.name, 'overflow', `page scrolls sideways ${report.scrollW} > ${report.vw}`);
    for (const o of report.overflow) fail(route, vp.name, 'overflow', o);
    for (const g of report.gutter) fail(route, vp.name, 'gutter', g);
    for (const t of report.targets) fail(route, vp.name, 'target', t);
    for (const a of report.alts) fail(route, vp.name, 'alt', `img without alt attribute: ${a}`);
    for (const c of report.contrast) fail(route, vp.name, 'contrast', c);

    // Keyboard: walk the whole page and require a visible focus indicator.
    if (vp.name === 'desktop') {
      const stops = await page.evaluate(() => {
        const els = Array.from(
          document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'),
        ).filter(
          (el) =>
            !el.hidden &&
            el.tabIndex >= 0 &&
            el.getAttribute('aria-hidden') !== 'true' &&
            // Actually rendered. The header carries two designs — a nav for wide
            // screens and a hamburger panel for narrow ones — and the inactive
            // one is display:none, so it cannot take focus and must not be
            // counted as an expected stop.
            el.getClientRects().length > 0,
        );
        return els.length;
      });
      let reached = 0;
      let ringless = [];
      await page.evaluate(() => document.body.focus());
      for (let i = 0; i < stops + 6; i += 1) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const cs = getComputedStyle(el);
          // A focused <iframe> cannot be styled by :focus in Chromium, so its
          // indicator legitimately lives on the wrapping element.
          const wrap = el.tagName === 'IFRAME' ? getComputedStyle(el.parentElement) : null;
          const ring = (s) =>
            (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) ||
            s.boxShadow !== 'none' ||
            s.textDecorationLine !== 'none';
          const hasRing = ring(cs) || (wrap ? ring(wrap) : false);
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || '').trim().slice(0, 24),
            hasRing,
          };
        });
        if (!info) break;
        reached += 1;
        if (!info.hasRing) ringless.push(`${info.tag} "${info.text}"`);
        if (reached >= stops) break;
      }
      if (reached < stops) fail(route, vp.name, 'focus', `only ${reached} of ${stops} controls reachable by Tab`);
      for (const r of [...new Set(ringless)]) fail(route, vp.name, 'focus', `no visible focus ring on ${r}`);
    }
  }
  await context.close();
}

// Reduced motion: nothing may animate when the user has asked it not to.
const rm = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const rmPage = await rm.newPage();
for (const route of ROUTES) {
  await rmPage.goto(origin + route, { waitUntil: 'load' });
  const moving = await rmPage.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      const dur = [cs.transitionDuration, cs.animationDuration]
        .flatMap((v) => v.split(',').map((x) => parseFloat(x) || 0));
      if (dur.some((d) => d > 0)) {
        out.push(`${el.tagName.toLowerCase()}.${String(el.className || '').trim().split(/\s+/)[0]}`);
      }
    }
    if (getComputedStyle(document.documentElement).scrollBehavior === 'smooth') out.push('html scroll-behavior:smooth');
    return [...new Set(out)];
  });
  for (const m of moving) fail(route, 'reduce', 'motion', `still animates under prefers-reduced-motion: ${m}`);
}
await rm.close();
await browser.close();

if (failures.length) {
  console.error(`FAIL ${failures.length} gate violation(s):`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(`PASS gutter, overflow, focus, target, alt, contrast and reduced-motion on ${ROUTES.length} routes × ${VIEWPORTS.length} viewports`);
