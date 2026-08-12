import assert from 'node:assert/strict';
import { evidence } from '../src/data/evidence.js';
import { projects } from '../src/data/portfolio.js';
import { validateEvidence } from './evidence-contract.mjs';

const clone = () => structuredClone(evidence);
const mutants = [
  (rows) => rows.pop(),
  (rows) => rows.push(structuredClone(rows[0])),
  (rows) => { rows[0].artifact.url = rows[0].artifact.url.replace(rows[0].publicHead, 'main'); },
  (rows) => { rows[0].boundary = ''; },
];

for (const mutate of mutants) {
  const rows = clone();
  mutate(rows);
  assert.throws(() => validateEvidence(rows, projects));
}

validateEvidence(evidence, projects);
console.log(`PASS ${mutants.length}/${mutants.length} evidence-contract mutants killed and clean control accepted`);
