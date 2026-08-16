import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.argv[2] ?? 'http://127.0.0.1:8912';
const failures = [];
const checks = [];
const check = (name, pass, detail = '') => {
  checks.push({ name, pass, detail });
  if (!pass) failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
};
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => pageErrors.push(error.message));

const response = await page.goto(`${origin}/design-lab/`, { waitUntil: 'networkidle' });
check('dashboard route returns 200', response?.status() === 200, `HTTP ${response?.status() ?? 'none'}`);
check('base 10 plus ten live derivatives are listed', await page.locator('[data-review-variant]').count() === 11);
check('first derivative 11 starts selected', await page.locator('[data-review-variant="11"]').getAttribute('aria-pressed') === 'true');
check('first derivative 11 is the initial live route', await page.locator('[data-review-frame="current"]').getAttribute('src') === '/design-lab/11/');
check('derivative opens against unchanged base 10', await page.locator('[data-review-frame="baseline"]').getAttribute('src') === '/design-lab/10/');

await page.locator('[data-review-variant="13"]').click();
await page.waitForFunction(() => document.querySelector('[data-review-frame="current"]')?.contentWindow?.location.pathname === '/design-lab/13/');
check('variant switch loads the real route', await page.locator('[data-current-id]').textContent() === '13');
check('variant switch updates full-size link', (await page.locator('[data-open-full]').getAttribute('href'))?.endsWith('/design-lab/13/'));
const frameBounds = await page.locator('[data-current-preview]').evaluate((panel) => {
  const holder = panel.querySelector('[data-frame-holder]').getBoundingClientRect();
  const shell = panel.querySelector('[data-frame-shell]').getBoundingClientRect();
  return { holderLeft: holder.left, holderRight: holder.right, shellLeft: shell.left, shellRight: shell.right };
});
check('scaled desktop frame stays fully inside its review canvas', frameBounds.shellLeft >= frameBounds.holderLeft && frameBounds.shellRight <= frameBounds.holderRight + 1, JSON.stringify(frameBounds));

const liveFrame = page.frameLocator('[data-review-frame="current"]');
await liveFrame.locator('[data-proof-button="relay"]').click();
check('embedded experiment remains interactive', await liveFrame.locator('[data-proof-button="relay"]').getAttribute('aria-pressed') === 'true');

await page.locator('[data-viewport="mobile"]').click();
check('mobile control sets a 390px live canvas', await page.locator('[data-current-preview] [data-frame-shell]').evaluate((element) => element.style.width) === '390px');
await page.locator('[data-compare]').click();
check('baseline comparison becomes visible', await page.locator('[data-baseline-preview]').isVisible());
check('comparison keeps independent iframes', await page.locator('[data-review-frame]').count() === 2);

await page.locator('[data-reduce]').click();
check('reduced-motion mode reaches the experiment document', await liveFrame.locator('html').getAttribute('data-review-reduce') === 'true');

await page.locator('input[name="decision"][value="KEEP"]').check();
await page.locator('[data-review-notes]').fill('Keep the inspection lens, reduce the badge weight.');
await page.waitForTimeout(350);
const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('central-portfolio-design-lab-batch-02')));
check('decision persists to local storage', saved?.['13']?.decision === 'KEEP');
check('notes persist to local storage', saved?.['13']?.notes === 'Keep the inspection lens, reduce the badge weight.');
check('progress count updates', await page.locator('[data-reviewed-count]').textContent() === '1');

await page.reload({ waitUntil: 'networkidle' });
await page.locator('[data-review-variant="13"]').click();
check('saved decision survives reload', await page.locator('input[name="decision"][value="KEEP"]').isChecked());
check('saved notes survive reload', await page.locator('[data-review-notes]').inputValue() === 'Keep the inspection lens, reduce the badge weight.');

const downloadPromise = page.waitForEvent('download');
await page.locator('[data-export]').click();
const download = await downloadPromise;
check('export produces the expected review artifact', download.suggestedFilename() === 'central-portfolio-batch-02-decisions.json');

await page.locator('[data-review-variant="10"]').click();
check('baseline selection hides decision controls', await page.locator('[data-review-form]').isHidden());
check('baseline selection exposes its explanation', await page.locator('[data-baseline-message]').isVisible());

page.once('dialog', (dialog) => dialog.accept());
await page.locator('[data-clear]').click();
check('clear action removes saved review after confirmation', await page.evaluate(() => localStorage.getItem('central-portfolio-design-lab-batch-02')) === null);

const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
check('desktop dashboard has no horizontal overflow', dimensions.client === dimensions.scroll, JSON.stringify(dimensions));
check('dashboard has no console errors', consoleErrors.length === 0, consoleErrors.join(' | '));
check('dashboard has no page errors', pageErrors.length === 0, pageErrors.join(' | '));

await mkdir('design-lab/renders', { recursive: true });
await page.goto(`${origin}/design-lab/`, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'design-lab/renders/review-dashboard-desktop.png', fullPage: true, animations: 'disabled' });

const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(`${origin}/design-lab/`, { waitUntil: 'networkidle' });
const mobileDimensions = await mobile.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
check('mobile dashboard has no horizontal overflow', mobileDimensions.client === mobileDimensions.scroll, JSON.stringify(mobileDimensions));
await mobile.screenshot({ path: 'design-lab/renders/review-dashboard-mobile.png', fullPage: true, animations: 'disabled' });

await context.close();
await browser.close();
const report = { verifiedAt: new Date().toISOString(), result: failures.length ? 'FAIL' : 'PASS', summary: { checks: checks.length, passed: checks.filter((item) => item.pass).length, failed: failures.length }, checks };
await writeFile('design-lab/REVIEW_DASHBOARD_VERIFICATION.json', `${JSON.stringify(report, null, 2)}\n`);
if (failures.length) {
  console.error(`FAIL ${failures.length} review-dashboard check(s):\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}
console.log(`PASS ${checks.length} live dashboard, persistence, export, responsive and error checks`);
