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
  record('06 exposes all thirteen project selectors', await state.page.locator('[data-registry-row]').count() === 13);
  record('06 selectors do not clip their project text', await state.page.locator('[data-registry-row]').evaluateAll((elements) => elements.every((element) => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1)));
  await gauge.hover();
  record('06 product registry selects on hover', await gauge.getAttribute('aria-pressed') === 'true');
  record('06 product surface switches', await state.page.locator('[data-registry-card="gauge"]').isVisible());
  const relay = state.page.locator('[data-registry-row="relay"]');
  await relay.focus();
  record('06 product registry selects on keyboard focus', await relay.getAttribute('aria-pressed') === 'true');
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
  record('10 exposes all thirteen project selectors', await state.page.locator('[data-proof-button]').count() === 13);
  record('10 has no duplicate canonical directory', await state.page.locator('[data-canonical-directory]').count() === 0);
  record('10 selectors do not clip their project text', await state.page.locator('[data-proof-button]').evaluateAll((elements) => elements.every((element) => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1)));
  await relay.hover();
  await state.page.waitForTimeout(400);
  record('10 proof deck selects on hover', await relay.getAttribute('aria-pressed') === 'true');
  record('10 proof deck promotes selected card', await state.page.locator('[data-proof-card="relay"]').getAttribute('data-active') === 'true');
  record('10 shows exactly one complete project card', await state.page.locator('[data-proof-card]:visible').count() === 1);
  record('10 selected project card does not clip copy', await state.page.locator('[data-proof-card="relay"]').evaluate((element) => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1));
  const gauge = state.page.locator('[data-proof-button="gauge"]');
  await gauge.focus();
  record('10 proof deck selects on keyboard focus', await gauge.getAttribute('aria-pressed') === 'true');
  await closeChecked('/design-lab/10/', state);
}

for (const id of Array.from({ length: 10 }, (_, index) => String(index + 11))) {
  const route = `/design-lab/${id}/`;
  const state = await open(desktop, route);
  record(`${id} exposes all thirteen project selectors`, await state.page.locator('[data-proof-button]').count() === 13);
  record(`${id} keeps a single project surface`, await state.page.locator('[data-proof-card]:visible').count() === 1);
  record(`${id} identifies its isolated effect`, Boolean(await state.page.locator('[data-proof-deck]').getAttribute('data-proof-effect')));
  const relay = state.page.locator('[data-proof-button="relay"]');
  await relay.hover();
  await state.page.waitForTimeout(700);
  record(`${id} selects projects on hover`, await relay.getAttribute('aria-pressed') === 'true');
  record(`${id} exposes the complete selected project`, await state.page.locator('[data-proof-card="relay"]').getAttribute('data-active') === 'true');
  record(`${id} keeps project copy unclipped`, await state.page.locator('[data-proof-card="relay"]').evaluate((element) => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1));
  if (id === '11') record('11 runs the perimeter treatment', (await state.page.locator('.v10-stage').evaluate((element) => getComputedStyle(element, '::before').animationName)).includes('batchBeam'));
  if (id === '12') {
    await state.page.locator('.v10-stage').hover({ position: { x: 120, y: 120 } });
    record('12 updates pointer-relative lighting', await state.page.locator('.v10-stage').getAttribute('data-pointer') === 'true');
  }
  if (id === '13') {
    await state.page.locator('[data-lens-surface]:visible').hover({ position: { x: 150, y: 120 } });
    record('13 activates the screenshot lens', await state.page.locator('[data-lens-surface]:visible').getAttribute('data-lens-active') === 'true');
  }
  if (id === '14') {
    await state.page.locator('[data-proof-deck]').hover({ position: { x: 200, y: 240 } });
    record('14 activates exactly one grid cell', await state.page.locator('[data-grid-cell][data-active]').count() === 1);
  }
  if (id === '15') record('15 renders its SVG noise field', await state.page.locator('.v10-noise').count() === 1);
  if (id === '16') record('16 runs shimmer only on the selected row', (await state.page.locator('[data-proof-button][aria-pressed="true"]').evaluate((element) => getComputedStyle(element, '::before').animationName)).includes('batchShimmer'));
  if (id === '17') record('17 applies gradient material to the canonical headline', (await state.page.locator('.continuity-hero h2 span').evaluate((element) => getComputedStyle(element).backgroundImage)) !== 'none');
  if (id === '20') record('20 establishes a perspective evidence stack', (await state.page.locator('.v10-stage').evaluate((element) => getComputedStyle(element).perspective)) !== 'none');
  await closeChecked(route, state);
}

for (const id of Array.from({ length: 11 }, (_, index) => String(index + 21))) {
  const route = `/design-lab/${id}/`;
  const state = await open(desktop, route);
  const deck = state.page.locator('[data-proof-deck]');
  record(`${id} exposes all thirteen project selectors`, await state.page.locator('[data-proof-button]').count() === 13);
  record(`${id} keeps a single project surface`, await state.page.locator('[data-proof-card]:visible').count() === 1);
  record(`${id} derives from combined base 21`, await deck.getAttribute('data-combined-base') === 'true');
  record(`${id} includes the selected screenshot lenses`, await state.page.locator('[data-lens-surface]').count() === 13);
  record(`${id} runs the selected perimeter treatment`, (await state.page.locator('.v10-stage').evaluate((element) => getComputedStyle(element, '::before').animationName)).includes('batchBeam'));
  record(`${id} runs the selected active-row shimmer`, (await state.page.locator('[data-proof-button][aria-pressed="true"]').evaluate((element) => getComputedStyle(element, '::before').animationName)).includes('batchShimmer'));
  record(`${id} applies the selected spectral headline`, (await state.page.locator('.continuity-hero h2 span').evaluate((element) => getComputedStyle(element).backgroundImage)) !== 'none');

  const relay = state.page.locator('[data-proof-button="relay"]');
  await relay.hover();
  await state.page.waitForTimeout(700);
  record(`${id} selects projects on hover`, await relay.getAttribute('aria-pressed') === 'true');
  record(`${id} exposes the complete selected project`, await state.page.locator('[data-proof-card="relay"]').getAttribute('data-active') === 'true');
  record(`${id} keeps project copy unclipped`, await state.page.locator('[data-proof-card="relay"]').evaluate((element) => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1));

  if (id === '22') {
    const action = state.page.locator('[data-proof-card="relay"] [data-magnet-actions] a').first();
    const bounds = await action.boundingBox();
    if (bounds) await action.dispatchEvent('pointermove', { clientX: bounds.x + 12, clientY: bounds.y + 12 });
    record('22 moves its magnetic project action', await action.evaluate((element) => element.style.getPropertyValue('--magnet-x') !== '0px'));
  }
  if (id === '23') {
    const image = state.page.locator('[data-lens-surface]:visible');
    await image.focus();
    await state.page.waitForTimeout(100);
    record('23 exposes its screenshot glare by keyboard focus', Number(await image.evaluate((element) => getComputedStyle(element, '::before').opacity)) > 0);
  }
  if (id === '24') {
    await state.page.locator('[data-proof-button="gauge"]').click();
    record('24 launches a pixel transition on selection', await state.page.locator('[data-proof-card="gauge"] .v10-pixels i').evaluateAll((pixels) => pixels.some((pixel) => pixel.getAnimations().length > 0)));
  }
  if (id === '25') {
    const index = state.page.locator('.v10-index');
    const bounds = await index.boundingBox();
    if (bounds) await index.hover({ position: { x: 20, y: Math.min(120, bounds.height / 2) } });
    record('25 magnifies nearby directory rows', await state.page.locator('[data-proof-button]').evaluateAll((buttons) => buttons.some((button) => Number(button.style.getPropertyValue('--dock-scale')) > 1)));
  }
  if (id === '26') {
    await state.page.locator('[data-proof-button="gauge"]').click();
    const title = state.page.locator('[data-proof-card="gauge"] [data-project-title]');
    await state.page.waitForTimeout(40);
    record('26 visibly decrypts the selected title', await title.textContent() !== await title.getAttribute('data-title'));
    await state.page.waitForTimeout(2500);
    record('26 resolves to the exact canonical title', await title.textContent() === await title.getAttribute('data-title'));
  }
  if (id === '27') {
    const facts = state.page.locator('.continuity-proof [data-proof-fact]');
    for (let index = 0; index < await facts.count(); index += 1) {
      const fact = facts.nth(index);
      const value = fact.locator('[data-proof-value]');
      const targetText = await value.getAttribute('data-proof-value');
      const target = Number.parseInt(targetText, 10);
      await fact.focus();
      await state.page.waitForTimeout(120);
      const during = Number.parseInt(await value.textContent(), 10);
      record(`27 animates proof number ${targetText} on focus`, during >= 0 && during < target, `${during} vs ${target}`);
      await state.page.waitForTimeout(800);
      record(`27 resolves to exact proof value ${targetText}`, await value.textContent() === targetText);
    }
  }
  if (id === '28') {
    await state.page.locator('[data-proof-button="gauge"]').click();
    record('28 emits a click spark burst', await state.page.locator('[data-spark-field] i').count() === 8);
    await state.page.waitForTimeout(600);
    record('28 removes completed spark nodes', await state.page.locator('[data-spark-field] i').count() === 0);
  }
  if (id === '29') record('29 animates the selected title shadow', (await state.page.locator('[data-project-title]:visible').evaluate((element) => getComputedStyle(element).animationName)).includes('lineShadow'));
  if (id === '30') {
    const image = state.page.locator('[data-proof-card="relay"] .v10-image');
    await image.click();
    record('30 expands the screenshot on click', await image.getAttribute('data-expanded') === 'true');
  }
  if (id === '31') {
    await relay.focus();
    const marquee = relay.locator('.v10-flowing-text');
    record('31 replaces a focused row with its flowing marquee', await marquee.isVisible());
    record('31 animates its flowing row marquee', (await marquee.evaluate((element) => getComputedStyle(element).animationName)).includes('flowingRow'));
  }
  await closeChecked(route, state);
}

for (const id of Array.from({ length: 11 }, (_, index) => String(index + 32))) {
  const route = `/design-lab/${id}/`;
  const state = await open(desktop, route);
  const deck = state.page.locator('[data-proof-deck]');
  record(`${id} exposes all thirteen project selectors`, await state.page.locator('[data-proof-button]').count() === 13);
  record(`${id} keeps a single project surface`, await state.page.locator('[data-proof-card]:visible').count() === 1);
  record(`${id} derives from selected base 32`, await deck.getAttribute('data-batch-four') === 'true');
  record(`${id} retains every approved Batch 3 behavior flag`, await deck.evaluate((element) => ['hasMagnet', 'hasDock', 'hasTicker', 'hasSparks'].every((key) => element.dataset[key] === 'true')));
  record(`${id} includes all screenshot lenses`, await state.page.locator('[data-lens-surface]').count() === 13);
  record(`${id} includes all flowing-row labels`, await state.page.locator('.v10-flowing-text').count() === 13);

  const relay = state.page.locator('[data-proof-button="relay"]');
  await relay.hover();
  const relayCard = state.page.locator('[data-proof-card="relay"]');
  record(`${id} selects projects on hover`, await relay.getAttribute('aria-pressed') === 'true');
  record(`${id} exposes the complete selected project`, await relayCard.getAttribute('data-active') === 'true');
  record(`${id} keeps project copy unclipped`, await relayCard.evaluate((element) => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1));
  const transitionDurations = await relayCard.evaluate((element) => element.getAnimations().map((animation) => Number(animation.effect?.getTiming().duration) || 0));
  record(`${id} replaces the intrusive wipe with a restrained transition`, transitionDurations.length === 0 || Math.max(...transitionDurations) <= 180, transitionDurations.join(','));
  await state.page.waitForTimeout(220);

  if (id === '32') {
    const action = relayCard.locator('[data-magnet-actions] a').first();
    const actionBounds = await action.boundingBox();
    if (actionBounds) await action.dispatchEvent('pointermove', { clientX: actionBounds.x + 12, clientY: actionBounds.y + 12 });
    record('32 retains magnetic project actions', await action.evaluate((element) => element.style.getPropertyValue('--magnet-x') !== '0px'));
    const image = relayCard.locator('[data-lens-surface]');
    await image.focus();
    await state.page.waitForTimeout(180);
    record('32 retains keyboard-triggered screenshot glare', Number(await image.evaluate((element) => getComputedStyle(element, '::before').opacity)) > 0);
    const index = state.page.locator('.v10-index');
    const indexBounds = await index.boundingBox();
    if (indexBounds) await index.hover({ position: { x: 20, y: Math.min(120, indexBounds.height / 2) } });
    record('32 retains directory magnification', await state.page.locator('[data-proof-button]').evaluateAll((buttons) => buttons.some((button) => Number(button.style.getPropertyValue('--dock-scale')) > 1)));
    const openSourceFact = state.page.locator('.continuity-proof [data-proof-fact]').last();
    const openSourceValue = openSourceFact.locator('[data-proof-value]');
    const openSourceTarget = await openSourceValue.textContent();
    await openSourceFact.focus();
    await state.page.waitForTimeout(800);
    record('32 fixes the revised open-source ticker without NaN', !(await openSourceValue.textContent()).includes('NaN') && await openSourceValue.textContent() === openSourceTarget, `${await openSourceValue.textContent()} vs ${openSourceTarget}`);
    await state.page.locator('[data-proof-button="gauge"]').click();
    record('32 retains click-spark feedback', await state.page.locator('[data-spark-field] i').count() === 8);
    await relay.focus();
    record('32 retains the flowing focused row', await relay.locator('.v10-flowing-text').isVisible());
  }
  if (id === '33') record('33 creates an asymmetric proof bento', (await state.page.locator('.continuity-proof').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)) === 2);
  if (id === '34') {
    const stage = state.page.locator('.v10-stage');
    await stage.hover({ position: { x: 180, y: 160 } });
    await state.page.waitForTimeout(260);
    record('34 activates the bounded stage spotlight', await stage.getAttribute('data-spotlight') === 'true' && Number(await stage.evaluate((element) => getComputedStyle(element, '::after').opacity)) > 0);
  }
  if (id === '35') {
    const stage = state.page.locator('.v10-stage');
    await stage.hover({ position: { x: 35, y: 35 } });
    record('35 tilts the proof stage within a bounded range', (await stage.evaluate((element) => getComputedStyle(element).transform)) !== 'none');
  }
  if (id === '36') {
    const before = await deck.evaluate((element) => element.style.getPropertyValue('--active-project'));
    await state.page.locator('[data-proof-button="gauge"]').hover();
    const after = await deck.evaluate((element) => element.style.getPropertyValue('--active-project'));
    record('36 changes the directory wash with project identity', Boolean(before && after && before !== after), `${before} -> ${after}`);
  }
  if (id === '37') {
    const backplate = state.page.locator('[data-active-backplate]');
    const before = await backplate.evaluate((element) => element.style.getPropertyValue('--backplate-y'));
    await state.page.locator('[data-proof-button="gauge"]').click();
    const after = await backplate.evaluate((element) => element.style.getPropertyValue('--backplate-y'));
    record('37 moves one shared active-row backplate', Boolean(before && after && before !== after), `${before} -> ${after}`);
  }
  if (id === '38') record('38 renders the measured systems grid', (await state.page.locator('.v10-canvas').evaluate((element) => getComputedStyle(element).backgroundImage.match(/linear-gradient/g)?.length || 0)) >= 4);
  if (id === '39') {
    await state.page.locator('.v10-canvas').scrollIntoViewIfNeeded();
    await state.page.evaluate(() => window.scrollBy(0, 650));
    await state.page.waitForTimeout(80);
    record('39 advances the page progress spine', (await state.page.locator('[data-scroll-progress]').evaluate((element) => getComputedStyle(element).transform)) !== 'none');
  }
  if (id === '40') record('40 stacks complete client routes with native sticky positioning', await state.page.locator('[data-client-route]').first().evaluate((element) => getComputedStyle(element).position) === 'sticky');
  if (id === '41') {
    const positioning = state.page.locator('[data-canonical-positioning]');
    await positioning.scrollIntoViewIfNeeded();
    await state.page.waitForTimeout(100);
    record('41 highlights the unchanged positioning copy in view', await positioning.getAttribute('data-highlighted') !== null);
  }
  if (id === '42') {
    const action = relayCard.locator('.v10-actions a').first();
    await action.focus();
    record('42 runs one action-border trail on keyboard focus', (await action.evaluate((element) => getComputedStyle(element, '::before').animationName)).includes('actionBorderTrail'));
  }
  await closeChecked(route, state);
}

await desktop.close();

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
for (const [route, selector, value] of [
  ['/design-lab/04/', '[data-inspection-point="review"]', 'true'],
  ['/design-lab/06/', '[data-registry-row="relay"]', 'true'],
  ['/design-lab/08/', '[data-case-tab="adapt"]', 'true'],
  ['/design-lab/10/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/13/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/20/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/21/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/24/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/30/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/31/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/32/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/33/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/36/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/40/', '[data-proof-button="gauge"]', 'true'],
  ['/design-lab/42/', '[data-proof-button="gauge"]', 'true'],
]) {
  const state = await open(mobile, route);
  if (route === '/design-lab/06/') record('06 mobile exposes all thirteen selectors', await state.page.locator('[data-registry-row]').count() === 13);
  if (['/design-lab/10/', '/design-lab/13/', '/design-lab/20/', '/design-lab/21/', '/design-lab/24/', '/design-lab/30/', '/design-lab/31/', '/design-lab/32/', '/design-lab/33/', '/design-lab/36/', '/design-lab/40/', '/design-lab/42/'].includes(route)) record(`${route} mobile exposes all thirteen selectors`, await state.page.locator('[data-proof-button]').count() === 13);
  await state.page.locator(selector).click();
  record(`${route} mobile control responds`, await state.page.locator(selector).getAttribute('aria-pressed') === value);
  await closeChecked(route, state);
}
await mobile.close();

const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
for (const id of Array.from({ length: 11 }, (_, index) => String(index + 21))) {
  const route = `/design-lab/${id}/`;
  const state = await open(reduced, route);
  await state.page.locator('[data-proof-button="gauge"]').click();
  const motion = await state.page.locator('[data-proof-card="gauge"]').evaluate((element) => {
    const style = getComputedStyle(element);
    return { transition: style.transitionDuration, animation: style.animationDuration, active: element.dataset.active };
  });
  record(`${id} reduced motion swaps state immediately`, motion.active === 'true', JSON.stringify(motion));
  record(`${id} reduced motion has no card animation`, motion.transition === '0s' && motion.animation === '0s', JSON.stringify(motion));
  const perimeter = await state.page.locator('.v10-stage').evaluate((element) => getComputedStyle(element, '::before').animationName);
  const shimmer = await state.page.locator('[data-proof-button][aria-pressed="true"]').evaluate((element) => getComputedStyle(element, '::before').animationName);
  const spectral = await state.page.locator('.continuity-hero h2 span').evaluate((element) => getComputedStyle(element).animationName);
  record(`${id} disables combined-base decoration under reduced motion`, perimeter === 'none' && shimmer === 'none' && spectral === 'none', JSON.stringify({ perimeter, shimmer, spectral }));
  if (id === '29') record('29 disables title-shadow animation under reduced motion', await state.page.locator('[data-project-title]:visible').evaluate((element) => getComputedStyle(element).animationName) === 'none');
  if (id === '31') {
    await state.page.locator('[data-proof-button="relay"]').focus();
    record('31 disables marquee animation under reduced motion', await state.page.locator('[data-proof-button="relay"] .v10-flowing-text').evaluate((element) => getComputedStyle(element).animationName) === 'none');
  }
  await closeChecked(`${route} reduced-motion`, state);
}
for (const id of Array.from({ length: 11 }, (_, index) => String(index + 32))) {
  const route = `/design-lab/${id}/`;
  const state = await open(reduced, route);
  await state.page.locator('[data-proof-button="gauge"]').click();
  const motion = await state.page.locator('[data-proof-card="gauge"]').evaluate((element) => {
    const style = getComputedStyle(element);
    return { transition: style.transitionDuration, animation: style.animationDuration, active: element.dataset.active };
  });
  record(`${id} reduced motion swaps selected-base state immediately`, motion.active === 'true', JSON.stringify(motion));
  record(`${id} reduced motion has no project-card animation`, motion.transition === '0s' && motion.animation === '0s', JSON.stringify(motion));
  const perimeter = await state.page.locator('.v10-stage').evaluate((element) => getComputedStyle(element, '::before').animationName);
  const shimmer = await state.page.locator('[data-proof-button][aria-pressed="true"]').evaluate((element) => getComputedStyle(element, '::before').animationName);
  const spectral = await state.page.locator('.continuity-hero h2 span').evaluate((element) => getComputedStyle(element).animationName);
  record(`${id} disables selected-base ambient motion`, perimeter === 'none' && shimmer === 'none' && spectral === 'none', JSON.stringify({ perimeter, shimmer, spectral }));
  await state.page.locator('[data-proof-button="relay"]').focus();
  record(`${id} disables retained flowing-row motion`, await state.page.locator('[data-proof-button="relay"] .v10-flowing-text').evaluate((element) => getComputedStyle(element).animationName) === 'none');
  await closeChecked(`${route} reduced-motion`, state);
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
