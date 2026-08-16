import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { identity, contact, proof, routes, ordered } from '../src/data/portfolio.js';

const origin = process.argv[2] ?? 'http://127.0.0.1:8912';
const variants = Array.from({ length: 11 }, (_, index) => String(index + 10).padStart(2, '0'));
const checks = [];
const failures = [];
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const check = (name, pass, detail = '') => {
  checks.push({ name, pass, detail });
  if (!pass) failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

for (const variant of variants) {
  const response = await page.goto(`${origin}/design-lab/${variant}/`, { waitUntil: 'networkidle' });
  check(`${variant} returns 200`, response?.status() === 200, `HTTP ${response?.status() ?? 'none'}`);

  const pageText = normalize(await page.locator('body').innerText());
  check(`${variant} preserves the canonical headline`, pageText.includes(`${identity.headline[0]} ${identity.headline[1]}.`));
  check(`${variant} preserves the canonical positioning copy`, pageText.includes(normalize(identity.sub)));
  check(`${variant} has no opaque Run Relay action`, !pageText.includes('Run Relay'));
  check(`${variant} never uses Relay as a standalone heading`, await page.getByRole('heading', { name: 'Relay', exact: true }).count() === 0);

  const records = page.locator('[data-project-record]');
  check(`${variant} exposes exactly thirteen canonical project records`, await records.count() === ordered.length, `found ${await records.count()}`);
  const slugs = await records.evaluateAll((elements) => elements.map((element) => element.dataset.projectSlug));
  check(`${variant} exposes every project once`, new Set(slugs).size === ordered.length && ordered.every((project) => slugs.filter((slug) => slug === project.slug).length === 1), slugs.join(','));

  for (const project of ordered) {
    const target = page.locator(`[data-project-record][data-project-slug="${project.slug}"]`);
    const text = normalize(await target.innerText());
    check(`${variant}/${project.slug} preserves title, description and evidence note`, text.includes(normalize(project.title)) && text.includes(normalize(project.blurb)) && text.includes(normalize(project.note)));
    check(`${variant}/${project.slug} preserves case and live actions`, await target.locator(`a[href$="/work/${project.slug}/"]`).count() === 1 && await target.locator(`a[href="${project.live}"]`).count() === 1);
  }

  for (const fact of proof) {
    const factText = `${fact.value}${fact.unit ?? ''} ${fact.label} ${fact.sub}`;
    check(`${variant} preserves proof fact ${fact.value}`, pageText.includes(normalize(factText)));
  }

  const routeRecords = page.locator('[data-client-route]');
  check(`${variant} preserves all three client routes`, await routeRecords.count() === routes.length);
  for (const route of routes) {
    const routeText = normalize(await page.locator(`[data-client-route="${route.id}"]`).innerText());
    check(`${variant}/${route.id} preserves route copy and deliverables`, routeText.includes(normalize(route.title)) && routeText.includes(normalize(route.blurb)) && route.does.every((item) => routeText.includes(normalize(item))));
  }
  check(`${variant} preserves the contact path`, await page.locator(`a[href="mailto:${contact.email}"]`).count() >= 1);
}

for (const project of ordered) {
  await page.goto(`${origin}/work/${project.slug}/`, { waitUntil: 'networkidle' });
  check(`${project.slug} removes project-specific email actions`, await page.locator('a[href^="mailto:"][href*="subject="]').count() === 0);
  check(`${project.slug} removes the Talk about project button`, await page.getByRole('link', { name: /^Talk about / }).count() === 0);
  check(`${project.slug} retains the site-level contact path`, await page.locator(`a[href="mailto:${contact.email}"]`).count() >= 1);
}

await page.goto(`${origin}/design-lab/`, { waitUntil: 'networkidle' });
check('11 is the explicitly selected initial experiment', await page.locator('[data-review-variant="11"]').getAttribute('aria-pressed') === 'true');
check('dashboard initially loads experiment 11', await page.locator('[data-review-frame="current"]').getAttribute('src') === '/design-lab/11/');
for (const id of variants.slice(1)) {
  await page.locator(`[data-review-variant="${id}"]`).click();
  check(`${id} compares directly against unchanged base 10`, await page.locator('[data-review-frame="baseline"]').getAttribute('src') === '/design-lab/10/');
  check(`${id} labels the equal-scope comparison`, await page.locator('[data-baseline-label]').textContent() === 'Control · selected base 10');
}

await context.close();
await browser.close();

const report = {
  verifiedAt: new Date().toISOString(),
  result: failures.length ? 'FAIL' : 'PASS',
  summary: { checks: checks.length, passed: checks.filter((item) => item.pass).length, failed: failures.length },
  checks,
};
await writeFile('design-lab/CONTENT_PARITY_VERIFICATION.json', `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error(`FAIL ${failures.length} content-parity check(s):\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}
console.log(`PASS ${checks.length} canonical-content and equal-scope comparison checks`);
