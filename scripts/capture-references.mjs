import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const output = resolve(
  process.cwd(),
  '..',
  '..',
  'central_portfolio_research',
  'screenshots',
);

const references = [
  ['jase', 'https://www.jase.me/'],
  ['valentin', 'https://valentinthouron.com/'],
  ['linear', 'https://linear.app/'],
  ['raycast', 'https://www.raycast.com/'],
  ['brittany-chiang', 'https://brittanychiang.com/'],
  ['thavlik', 'https://thavlik.dev/'],
  ['eugene-yan', 'https://eugeneyan.com/'],
  ['hamel', 'https://hamel.dev/'],
  ['huyen-chip', 'https://huyenchip.com/'],
  ['rauno', 'https://rauno.me/'],
  ['emil-kowalski', 'https://emilkowal.ski/'],
  ['app-and-flow', 'https://appandflow.com/'],
  ['josh-comeau', 'https://www.joshwcomeau.com/'],
  ['bruno-simon', 'https://bruno-simon.com/'],
  ['posthog', 'https://posthog.com/'],
  ['vercel', 'https://vercel.com/'],
  ['stripe', 'https://stripe.com/'],
  ['thoughtbot', 'https://thoughtbot.com/'],
  ['ustwo', 'https://ustwo.com/work/'],
  ['instrument', 'https://www.instrument.com/'],
];

const viewports = [
  ['desktop-1440', { width: 1440, height: 900, isMobile: false }],
  ['mobile-390', { width: 390, height: 844, isMobile: true }],
];

await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const audit = [];

const captureReference = async ([slug, url]) => {
  const rows = [];
  for (const [label, viewport] of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      reducedMotion: 'no-preference',
      colorScheme: 'light',
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    const row = { slug, url, viewport: label, requested: url };
    try {
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 20_000,
      });
      await page.waitForTimeout(2_000);
      await page.keyboard.press('Escape').catch(() => {});
      row.status = response?.status() ?? null;
      row.finalUrl = page.url();
      row.metrics = await page.evaluate(() => {
        const bodyStyle = getComputedStyle(document.body);
        const candidates = Array.from(document.querySelectorAll('body *'));
        const rendered = candidates.filter((element) => element.getClientRects().length > 0);
        const moving = rendered.filter((element) => {
          const style = getComputedStyle(element);
          const seconds = (value) =>
            value
              .split(',')
              .map((item) => Number.parseFloat(item) || 0)
              .some((item) => item > 0);
          return seconds(style.animationDuration) || seconds(style.transitionDuration);
        });
        const colors = new Map();
        for (const element of rendered.slice(0, 1500)) {
          const style = getComputedStyle(element);
          for (const value of [style.color, style.backgroundColor]) {
            if (value && value !== 'rgba(0, 0, 0, 0)') colors.set(value, (colors.get(value) ?? 0) + 1);
          }
        }
        return {
          title: document.title,
          h1: Array.from(document.querySelectorAll('h1')).map((item) => item.innerText.trim()).filter(Boolean).slice(0, 4),
          headings: Array.from(document.querySelectorAll('h2, h3')).map((item) => item.innerText.trim()).filter(Boolean).slice(0, 24),
          links: document.querySelectorAll('a[href]').length,
          buttons: document.querySelectorAll('button').length,
          images: document.querySelectorAll('img, picture, video, canvas').length,
          renderedElements: rendered.length,
          motionCandidates: moving.length,
          bodyBackground: bodyStyle.backgroundColor,
          bodyFont: bodyStyle.fontFamily,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          pageHeight: document.documentElement.scrollHeight,
          dominantColors: [...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10),
          bodyText: document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 1800),
        };
      });
      row.consoleErrors = [...new Set(consoleErrors)].slice(0, 12);
      await page.screenshot({
        path: resolve(output, `${slug}-${label}.png`),
        animations: 'disabled',
      });
      row.capture = 'PASS';
    } catch (error) {
      row.capture = 'FAIL';
      row.error = String(error);
    }
    rows.push(row);
    await context.close();
    console.log(`${row.capture} ${slug} ${label} ${row.status ?? ''}`);
  }
  return rows;
};

const queue = [...references];
const workers = Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const reference = queue.shift();
    if (reference) audit.push(...(await captureReference(reference)));
  }
});
await Promise.all(workers);

await browser.close();
await writeFile(
  resolve(output, 'REFERENCE_CAPTURE_AUDIT.json'),
  `${JSON.stringify({ capturedAt: new Date().toISOString(), audit }, null, 2)}\n`,
  'utf8',
);

if (audit.some((row) => row.capture !== 'PASS')) process.exitCode = 1;
