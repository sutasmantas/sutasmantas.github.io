import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.argv[2] ?? 'http://127.0.0.1:8912';
const browser = await chromium.launch();
const checks = [];
const failures = [];
const record = (name, pass, detail = '') => {
  checks.push({ name, pass, detail });
  if (!pass) failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

const open = async (context, route) => {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  const response = await page.goto(`${origin}${route}`, { waitUntil: 'load' });
  record(`${route} returns 200`, response?.status() === 200, `HTTP ${response?.status() ?? 'none'}`);
  return { page, consoleErrors, pageErrors };
};

const closeChecked = async (route, state) => {
  const { page, consoleErrors, pageErrors } = state;
  const widths = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  record(`${route} has no horizontal overflow`, widths.scroll === widths.client, `${widths.scroll}px vs ${widths.client}px`);
  record(`${route} has no console errors`, consoleErrors.length === 0, consoleErrors.join(' | '));
  record(`${route} has no page errors`, pageErrors.length === 0, pageErrors.join(' | '));
  await page.close();
};

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });

{
  const state = await open(desktop, '/design-lab/03/');
  await state.page.locator('[data-type-width]').fill('120');
  record('03 width control updates specimen', await state.page.locator('[data-width-output]').textContent() === '120%');
  record('03 width control updates CSS axis', await state.page.locator('.v03-canvas').evaluate((element) => element.style.getPropertyValue('--specimen-width')) === '120%');
  await closeChecked('/design-lab/03/', state);
}

{
  const state = await open(desktop, '/design-lab/04/');
  const decision = state.page.locator('[data-inspection-point="decision"]');
  await decision.focus();
  await state.page.keyboard.press('Enter');
  record('04 inspection point selects by keyboard', await decision.getAttribute('aria-pressed') === 'true');
  record('04 inspection note switches', await state.page.locator('[data-inspection-note="decision"]').isVisible());
  await closeChecked('/design-lab/04/', state);
}

{
  const state = await open(desktop, '/design-lab/05/');
  const row = state.page.locator('[data-discovery-row="gauge"]');
  await row.focus();
  await state.page.waitForTimeout(100);
  record('05 focus switches evidence preview', await state.page.locator('[data-discovery-card="gauge"]').isVisible());
  record('05 selected row is exposed', await row.getAttribute('data-active') === 'true');
  const preview = await state.page.locator('[data-discovery-preview]').boundingBox();
  record('05 preview remains within viewport horizontally', Boolean(preview && preview.x >= 0 && preview.x + preview.width <= 1440), JSON.stringify(preview));
  await closeChecked('/design-lab/05/', state);
}

{
  const state = await open(desktop, '/design-lab/06/');
  const gauge = state.page.locator('[data-registry-row="gauge"]');
  await gauge.focus();
  await state.page.keyboard.press('Enter');
  record('06 product registry selects by keyboard', await gauge.getAttribute('aria-pressed') === 'true');
  record('06 product surface switches', await state.page.locator('[data-registry-card="gauge"]').isVisible());
  await closeChecked('/design-lab/06/', state);
}

{
  const state = await open(desktop, '/design-lab/07/');
  await state.page.locator('[data-replay]').click();
  record('07 receipt replay is user-triggered', await state.page.locator('[data-receipt]').evaluate((element) => element.classList.contains('playing')));
  await closeChecked('/design-lab/07/', state);
}

{
  const state = await open(desktop, '/design-lab/08/');
  const receipt = state.page.locator('[data-case-tab="receipt"]');
  await receipt.focus();
  await state.page.keyboard.press('Enter');
  record('08 case chapter selects by keyboard', await receipt.getAttribute('aria-pressed') === 'true');
  record('08 case chapter panel switches', await state.page.locator('[data-case-panel="receipt"]').isVisible());
  await closeChecked('/design-lab/08/', state);
}

{
  const state = await open(desktop, '/design-lab/10/');
  const relay = state.page.locator('[data-proof-button="relay"]');
  await relay.focus();
  await state.page.keyboard.press('Enter');
  await state.page.waitForTimeout(400);
  record('10 proof deck selects by keyboard', await relay.getAttribute('aria-pressed') === 'true');
  record('10 proof deck promotes selected card', await state.page.locator('[data-proof-card="relay"]').getAttribute('data-active') === 'true');
  await closeChecked('/design-lab/10/', state);
}

await desktop.close();

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
for (const [route, selector, value] of [
  ['/design-lab/04/', '[data-inspection-point="review"]', 'true'],
  ['/design-lab/06/', '[data-registry-row="relay"]', 'true'],
  ['/design-lab/08/', '[data-case-tab="adapt"]', 'true'],
  ['/design-lab/10/', '[data-proof-button="gauge"]', 'true'],
]) {
  const state = await open(mobile, route);
  await state.page.locator(selector).click();
  record(`${route} mobile control responds`, await state.page.locator(selector).getAttribute('aria-pressed') === value);
  await closeChecked(route, state);
}
await mobile.close();

const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
{
  const state = await open(reduced, '/design-lab/10/');
  await state.page.locator('[data-proof-button="gauge"]').click();
  const motion = await state.page.locator('[data-proof-card="gauge"]').evaluate((element) => {
    const style = getComputedStyle(element);
    return { transition: style.transitionDuration, animation: style.animationDuration, active: element.dataset.active };
  });
  record('10 reduced motion swaps state immediately', motion.active === 'true', JSON.stringify(motion));
  record('10 reduced motion has no CSS animation', motion.transition === '0s' && motion.animation === '0s', JSON.stringify(motion));
  await closeChecked('/design-lab/10/ reduced-motion', state);
}
await reduced.close();
await browser.close();

const report = {
  verifiedAt: new Date().toISOString(),
  origin,
  result: failures.length === 0 ? 'PASS' : 'FAIL',
  summary: { checks: checks.length, passed: checks.filter((check) => check.pass).length, failed: failures.length },
  checks,
};
await mkdir('design-lab', { recursive: true });
await writeFile('design-lab/VERIFICATION_REPORT.json', `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error(`FAIL ${failures.length} design-lab interaction check(s):\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}
console.log(`PASS ${checks.length} route, interaction, console, overflow and reduced-motion checks`);
