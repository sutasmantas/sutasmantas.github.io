import { evidence } from '../src/data/evidence.js';
import { projects } from '../src/data/portfolio.js';
import { validateEvidence } from './evidence-contract.mjs';

const result = validateEvidence(evidence, projects);
console.log(`PASS ${result.projects} projects · ${result.immutableLinks} immutable artifact/test links`);
