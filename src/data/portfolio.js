// Single source of truth for the hub's content.
//
// Routes and family names come from
// upwork_research/BOTTOM_UP_AI_JOB_TAXONOMY_2026-07-31.md — 647,272 postings
// gated, 997 manually labelled by reviewers who were shown no category list.
// They are the words clients write. Internal capability ids (reliable-effects,
// api-adapters) are deliberately absent: they are how the code is organised,
// not how a buyer describes a problem.
//
// Every `live` and `source` URL below was checked with an HTTP request on
// 2026-08-07 and returned 200. Nothing here is a placeholder — a card that
// cannot be opened has no business being on this page. `scripts/check-links.mjs`
// re-checks them.
//
// Proof figures trace to portfolio_demos/PORTFOLIO_EVIDENCE_INDEX.md and the
// per-project evidence boundaries in UPWORK_EVIDENCE_SOURCES.md. Where a
// boundary limits what a project proves, the blurb states the limit rather
// than omitting it.

const GH = 'https://github.com/sutasmantas';
const GP = 'https://sutasmantas.github.io';

export const identity = {
  name: 'Mantas Šutas',
  role: 'Independent AI engineer',
  locale: 'remote',
  headline: ['AI systems that keep working', 'after the demo'],
  sub:
    'Agent workflows, voice intake, retrieval and document pipelines — plus the ' +
    'unglamorous part: making effects idempotent, retries bounded, and failures ' +
    'recoverable.',
};

// The one address on the page. Personal, not the company mailbox — this site is
// independent work and must not route enquiries through an employer's domain.
export const contact = {
  email: 'sutasmantas@gmail.com',
  github: GH,
};

// Owned figures only. Both closest references fill this slot with client logos
// and institutional standing; this portfolio has neither, so it must not imitate
// that. Every number below is verifiable from a receipt.
export const proof = [
  { value: '13', unit: null, label: 'Open in a browser', sub: 'no login, no sales call' },
  { value: '9', unit: '/ 11', label: 'Market families covered', sub: 'of a 647k-posting taxonomy' },
  { value: '5', unit: null, label: 'Projects, one component', sub: 'shared delivery core' },
  { value: '0', unit: null, label: 'Duplicate effects', sub: 'across 7 injected faults' },
];

export const routes = [
  {
    id: 'build',
    title: 'Build an AI workflow that does the work',
    // Short form for the filter chips. Slicing the verb off the long title
    // produced fragments like "an AI workflow that does the work".
    chip: 'Do the work',
    blurb:
      'Agent task execution, an inbound line that books appointments, lead and ' +
      'CRM flow, generative media pipelines.',
    demand: 'Largest demand segment',
  },
  {
    id: 'answer',
    title: 'Make my documents and knowledge answerable',
    chip: 'Answer my documents',
    blurb:
      'Retrieval backends, field extraction from real documents, grounded ' +
      'product and support assistants.',
    demand: 'RAG is the most-requested 2026 skill',
  },
  {
    id: 'fix',
    title: "Fix an AI feature or integration that isn't reliable",
    chip: 'Make it reliable',
    blurb:
      'Idempotency, bounded retries, dead letters, replay, durable receipts — ' +
      'and evaluation that is able to fail.',
    demand: 'Where my evidence is strongest',
  },
];

export const routeLabel = Object.fromEntries(
  routes.map((r) => [r.id, r.title]),
);

export const projects = [
  {
    slug: 'firstring',
    name: 'FirstRing',
    route: 'build',
    family: 'Voice & telephony',
    asks: 'Inbound receptionist and booking',
    note: 'Highest median value in the taxonomy',
    noteTone: 'amber',
    featured: 1,
    shot: 'firstring',
    alt: 'FirstRing call console scoring a live call and confirming a booking',
    blurb:
      'An inbound line that answers, qualifies and books. If the call drops ' +
      'mid-write, the booking still lands exactly once.',
    limit: 'Browser speech and a simulated line — no real telephony carrier.',
    repo: 'ai-voice-receptionist',
  },
  {
    slug: 'relay',
    name: 'Relay',
    route: 'build',
    family: 'Agents & workflow automation',
    asks: 'Human-gated task execution',
    note: '7 fault cases, 0 duplicate effects',
    noteTone: 'amber',
    featured: 2,
    shot: 'relay',
    alt: 'Relay support workspace with a consequential action held for approval',
    blurb:
      'Support automation that drafts and acts, but never fires an irreversible ' +
      'action without a person approving it first.',
    limit: 'Effect counting is measured at the target, not at the sender.',
    repo: 'human-gated-support-automation',
  },
  {
    slug: 'gauge',
    name: 'Gauge',
    route: 'answer',
    family: 'Computer vision',
    asks: 'Visual inspection with review',
    note: 'Includes a rejected model',
    noteTone: 'amber',
    featured: 3,
    shot: 'gauge',
    alt: 'Gauge inspection station rejecting a defective part with the defect boxed',
    blurb:
      'Auto-passes and auto-rejects only where it is safe, and routes the rest ' +
      'to a person. I tested a stronger model and rejected it — on one run in ' +
      'three it waved real defects through.',
    limit: '29.8% automatic coverage on a fixed 47-image public split.',
    repo: 'computer-vision-inspection',
  },
  {
    slug: 'leaddock',
    name: 'LeadDock',
    route: 'build',
    family: 'Agents & workflow automation',
    asks: 'Lead intake, CRM and booking',
    note: 'End-to-end, one flow',
    noteTone: null,
    featured: 4,
    shot: 'leaddock',
    alt: 'LeadDock routing a qualified lead into an open appointment slot',
    blurb:
      'Lead in, qualified, booked into a real slot, handed off. Duplicate leads ' +
      'and double bookings are structurally impossible, not merely unlikely.',
    limit: 'A local CRM and calendar stand in for the client’s own systems.',
    repo: 'ai-lead-intake-automation',
  },
  {
    slug: 'ledger-lens',
    name: 'Ledger Lens',
    route: 'answer',
    family: 'Document intelligence',
    asks: 'Structured field extraction',
    note: 'The most frequent small job',
    noteTone: null,
    featured: 5,
    shot: 'ledger',
    alt: 'Ledger Lens extracting named fields from a real invoice PDF',
    blurb:
      'Field extraction from real PDFs and scans, with the malformed and empty ' +
      'cases handled rather than crashed on.',
    limit: 'Benchmarked on the bundled document set, not a client corpus.',
    repo: 'invoice-extraction-pipeline',
  },
  {
    slug: 'deliveryguard',
    name: 'DeliveryGuard',
    route: 'fix',
    family: 'AI operations',
    asks: 'Deliveries that stop silently failing',
    note: 'The shared component 5 projects use',
    noteTone: 'amber',
    featured: 6,
    shot: 'deliveryguard',
    alt: 'DeliveryGuard recovery console showing every attempt for one request',
    blurb:
      'Stable idempotency keys, bounded retries, append-only attempt receipts, ' +
      'dead letters and explicit replay. Five other projects here consume it as ' +
      'a pinned package rather than reimplementing it.',
    limit: 'Redaction covers the fields declared in the policy, not free text.',
    repo: 'reliable-webhook-delivery',
  },
  {
    slug: 'adapterproof',
    name: 'AdapterProof',
    route: 'fix',
    family: 'AI operations',
    asks: 'Prove an integration before go-live',
    note: '20/20 cases, 0 credentials needed',
    noteTone: 'amber',
    featured: 7,
    shot: 'adapterproof',
    alt: 'AdapterProof conformance report over twenty generated integration cases',
    blurb:
      'Maps a canonical event onto a provider payload, then fires real HTTP at ' +
      'a local sink to check auth, idempotency and correlation headers before ' +
      'anyone touches live credentials.',
    limit: 'Bounded to generic HTTP providers described by a manifest.',
    repo: 'api-adapter-conformance-harness',
  },
  {
    slug: 'proofgrid',
    name: 'ProofGrid',
    route: 'fix',
    family: 'LLM product engineering',
    asks: 'Evaluation that can actually fail',
    note: 'Cases frozen before the run',
    noteTone: null,
    featured: 8,
    shot: 'proofgrid',
    alt: 'ProofGrid comparing baseline, structured and repair outputs case by case',
    blurb:
      'Compares prompts, schemas and repair strategies against the same frozen ' +
      'cases, and reports latency, cost, retries and human corrections beside ' +
      'the pass rate.',
    limit: 'The public run uses a deterministic no-key profile.',
    repo: 'llm-evaluation-workbench',
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    route: 'answer',
    family: 'Knowledge & retrieval',
    asks: 'RAG with citations you can check',
    note: null,
    noteTone: null,
    featured: null,
    shot: 'atlas',
    alt: 'Atlas answering a policy question with the source passage beside it',
    blurb:
      'Answers company questions and shows the passage it used. When the ' +
      'documents do not support an answer, it says so instead of composing one.',
    limit: 'The public build is the base item; newer auth work is not in it.',
    repo: 'grounded-knowledge-assistant',
  },
  {
    slug: 'switchback',
    name: 'Switchback',
    route: 'answer',
    family: 'LLM product engineering',
    asks: 'A site assistant that stays on-topic',
    note: 'One script tag',
    noteTone: null,
    featured: null,
    shot: 'website-assistant',
    alt: 'Switchback storefront answering a delivery question with a cited source',
    blurb:
      'Embeds with one script, passes bounded current-page context, streams ' +
      'cited answers, declines what the site does not cover, and hands consented ' +
      'leads off once.',
    limit: 'Demonstrated on a sample storefront.',
    repo: 'website-ai-assistant',
  },
  {
    slug: 'pipelineforge',
    name: 'PipelineForge',
    route: 'fix',
    family: 'AI operations',
    asks: 'Loads that reconcile instead of drift',
    note: null,
    noteTone: null,
    featured: null,
    shot: 'pipelineforge',
    alt: 'PipelineForge source and destination registers agreeing row for row',
    blurb:
      'Moves changing SQL, REST, CSV, JSONL and Parquet data into DuckDB or ' +
      'Postgres, then gates the load on a reconciliation that has to balance.',
    limit: 'Quarantine and replay are exercised on the bundled fixtures.',
    repo: 'data-pipeline-reconciliation',
  },
  {
    slug: 'signalroom',
    name: 'SignalRoom',
    route: 'answer',
    family: 'Applied predictive ML',
    asks: 'Churn and retention decisions',
    note: 'Individual targeting rejected',
    noteTone: 'amber',
    featured: null,
    shot: 'signalroom',
    alt: 'SignalRoom showing where an intervention is expected to pay back',
    blurb:
      'Keeps the uplift estimate and the policy that acts on it separate, so a ' +
      'weak estimate cannot quietly become an action. On the public benchmark ' +
      'the average effect held and per-customer targeting did not.',
    limit: 'Measured on the Hillstrom public dataset.',
    repo: 'retention-decisioning',
  },
  {
    slug: 'printline',
    name: 'Printline',
    route: 'build',
    family: 'Generative media',
    asks: 'A repeatable image workflow',
    note: null,
    noteTone: null,
    featured: null,
    shot: 'printline',
    alt: 'Printline render workstation with a finished frame and its provenance',
    blurb:
      'A parameterised image workflow with queue state, seed and graph digest ' +
      'recorded per frame, provider-failure handling and retry lineage.',
    limit: 'Orchestration only — the public demo does not run a GPU model.',
    repo: 'comfyui-image-workflow',
  },
];

// Derived, so a project can never disagree with its own links.
for (const p of projects) {
  p.live = `${GP}/${p.repo}/`;
  p.source = `${GH}/${p.repo}`;
}

export const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured - b.featured);

export const families = [...new Set(projects.map((p) => p.family))].sort();

// A fourteenth project — the realtime English/Lithuanian context assistant — is
// built but has no reconciled public repository, so it gets no card and is not
// counted as openable. `open` is derived, so the headline figure and the number
// of cards can never disagree.
export const counts = {
  open: projects.length,
  built: projects.length + 1,
};

if (proof[0].value !== String(counts.open)) {
  throw new Error(
    `Proof strip claims ${proof[0].value} openable systems but ${counts.open} are listed.`,
  );
}
