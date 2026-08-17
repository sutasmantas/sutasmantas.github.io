import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = process.argv[2] ?? 'http://127.0.0.1:8912';
const root = path.resolve('design-lab/renders');
const variants = Array.from({ length: 11 }, (_, index) => String(index + 32).padStart(2, '0'));
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};
const report = { capturedAt: new Date().toISOString(), origin, routes: {} };
const browser = await chromium.launch();

for (const variant of variants) {
  report.routes[variant] = {};
  await mkdir(path.join(root, variant), { recursive: true });

  for (const [name, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    const response = await page.goto(`${origin}/design-lab/${variant}/`, { waitUntil: 'load' });
    await page.evaluate(() => Promise.race([
      Promise.all(Array.from(document.images, (image) => image.decode().catch(() => null))),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]));
    const metrics = await page.evaluate(() => {
      const images = Array.from(document.images);
      const visibleImages = images.filter((image) => image.getClientRects().length > 0);
      return {
        title: document.title,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        images: images.length,
        visibleImages: visibleImages.length,
        brokenVisibleImages: visibleImages.filter((image) => !image.complete || image.naturalWidth === 0).length,
        unloadedHiddenImages: images.filter((image) => image.getClientRects().length === 0 && (!image.complete || image.naturalWidth === 0)).length,
      };
    });
    const screenshot = path.join(root, variant, `${name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
    await page.screenshot({ path: path.join(root, variant, `${name}-fold.png`), animations: 'disabled' });
    report.routes[variant][name] = {
      status: response?.status() ?? null,
      screenshot: path.relative(process.cwd(), screenshot).replaceAll('\\', '/'),
      ...metrics,
      consoleErrors,
      pageErrors,
    };
    await context.close();
  }
}

const fileToDataUrl = async (filename) => `data:image/png;base64,${(await readFile(filename)).toString('base64')}`;
const contactTitles = {
  '32': 'Selected base', '33': 'Bento proof figures', '34': 'Stage spotlight',
  '35': 'Proof-stage tilt', '36': 'Chroma directory', '37': 'Active-row backplate',
  '38': 'Measured systems grid', '39': 'Progress spine', '40': 'Stacked client routes',
  '41': 'Positioning highlight', '42': 'Action border trail',
};

for (const [name, viewport] of Object.entries(viewports)) {
  const items = [];
  for (const id of variants) {
    const filename = path.join(root, id, `${name}-fold.png`);
    items.push({ id, title: contactTitles[id], image: await fileToDataUrl(filename) });
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.setContent(`<!doctype html><html><head><style>
    *{box-sizing:border-box}body{margin:0;padding:30px;background:#10100f;color:#f3f0e7;font:14px Arial,sans-serif}
    header{display:flex;justify-content:space-between;align-items:end;margin-bottom:24px;border-bottom:1px solid #555;padding-bottom:16px}
    h1{margin:0;font-size:30px}header p{margin:0;color:#aaa}.grid{display:grid;grid-template-columns:repeat(${name === 'desktop' ? 3 : 5},1fr);gap:20px}
    figure{margin:0;padding:10px;border:1px solid #464641;background:#1c1c1a}figure:first-child{border-color:#e8ff4f}
    .frame{height:${name === 'desktop' ? 215 : 500}px;overflow:hidden;background:#fff;border:1px solid #333}
    img{display:block;width:100%;height:auto}figcaption{display:flex;gap:9px;padding-top:9px}b{color:#e8ff4f}span{color:#d4d0c8}
  </style></head><body><header><div><h1>Central portfolio · Batch 04</h1><p>${name} contact sheet · base 32 plus ten live derivatives · full-size files preserved</p></div><p>32 control + 33–42 single-aspect experiments</p></header><div class="grid">
  ${items.map((item) => `<figure><div class="frame"><img src="${item.image}" alt=""></div><figcaption><b>${item.id}</b><span>${item.title}</span></figcaption></figure>`).join('')}
  </div></body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => Promise.all(Array.from(document.images, (image) => image.decode())));
  await page.screenshot({ path: path.join(root, `${name}-contact-sheet.png`), fullPage: true });
  await page.close();
}

await browser.close();
await writeFile(path.join(root, 'CAPTURE_REPORT.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Captured ${variants.length * 2} full-page renders and two contact sheets in ${root}`);
