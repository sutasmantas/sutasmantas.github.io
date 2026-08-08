// Single source of truth for the hub's content.
//
// COPY RULES, derived from the reference scoring in
// central_portfolio_research/REFERENCE_MATRIX.csv. The two references that beat
// everything else on client-service framing did three things this file must do:
//
//   1. State the bought outcome, not the implementation. jase.me scores 20/20
//      by quantifying what a client got, never what the engineer measured.
//      "0 duplicate effects across 7 injected faults" is a lab note. "Never
//      charges the customer twice" is the same fact, addressed to the buyer.
//   2. Put concrete deliverables under each service pillar
//      (valentinthouron.com, 19/20), so a visitor can self-select rather than
//      read a capability list.
//   3. Use specific credibility anchors instead of adjectives (hamel.dev).
//
// And the rule those references imply by omission: never explain the site's own
// methodology to the visitor. Nobody buying an inbound-call system cares how the
// taxonomy behind the filter labels was derived.
//
// SCOPE, NOT DISCLAIMER. Every project states how far the public demo goes,
// because a demo that hides its boundary is not evidence and buyers of AI work
// have been burned by exactly that. But it is stated as what the thing IS —
// "runs in your browser with a simulated line, so you can try it without a phone
// number" — not as what it fails to prove. Same fact, no apology. Gauge's
// rejected model is framed as judgement, which is what
// INFORMATION_ARCHITECTURE.md specified and what it actually is: evidence that
// this person does not ship things that fail.
//
// Routes and family names come from
// upwork_research/BOTTOM_UP_AI_JOB_TAXONOMY_2026-07-31.md — 647,272 postings
// gated, 997 manually labelled by reviewers shown no category list. They are the
// words clients write. Internal capability ids (reliable-effects, api-adapters)
// are deliberately absent: they are how the code is organised, not how a buyer
// describes a problem. That reasoning stays in this comment and never reaches
// the page.
//
// Every `live` and `source` URL below was checked with an HTTP request and
// returned 200. Nothing here is a placeholder — a card that cannot be opened has
// no business on this page. `scripts/check-links.mjs` re-checks them.

const GH = 'https://github.com/sutasmantas';
const GP = 'https://sutasmantas.github.io';

export const identity = {
  name: 'Mantas Šutas',
  role: 'Independent AI engineer',
  locale: 'remote',
  headline: ['AI systems that keep working', 'after the demo'],
  // Capability plus delivery plus the differentiator against an agency — the
  // shape valentinthouron.com scores highest on. "Idempotent" is gone: it is the
  // right word for a colleague and the wrong word for a buyer.
  sub:
    'I build the AI features companies actually ask for — agent workflows, ' +
    'voice intake, document and retrieval pipelines — and I build them to ' +
    'survive retries, outages and the input nobody planned for. One engineer, ' +
    'start to finish, no handoff.',
};

// The one address on the page. Personal, not the company mailbox — this site is
// independent work and must not route enquiries through an employer's domain.
export const contact = {
  email: 'sutasmantas@gmail.com',
  github: GH,
};

// The slot both closest references fill with client logos and institutional
// standing. This portfolio has neither and must not imitate that, so it uses
// owned facts — but chosen for what they tell a buyer, not for what they cost to
// measure. "9 of 11 market families covered" was a diagnostic from the research
// and meant nothing to anyone reading the page.
export const proof = [
  {
    value: '13',
    unit: null,
    label: 'Systems you can open now',
    sub: 'no login, no sales call first',
  },
  {
    value: '10',
    unit: null,
    label: 'Kinds of AI work',
    sub: 'voice, documents, retrieval, vision, pipelines',
  },
  {
    value: 'All',
    unit: null,
    label: 'Shipped with source and tests',
    sub: 'check the work, not the claim',
  },
  {
    value: '1',
    unit: null,
    label: 'Engineer on your project',
    sub: 'the one who writes the code',
  },
];

export const routes = [
  {
    id: 'build',
    title: 'Build an AI workflow that does the work',
    chip: 'Do the work',
    blurb:
      'Something repetitive gets done end to end, by software, without a person ' +
      'driving each step.',
    // Concrete deliverables, so a visitor recognises their own job in the list.
    does: [
      'A phone line that answers and books',
      'Leads qualified and pushed into your CRM',
      'An agent that executes multi-step tasks',
      'Generative media on a repeatable pipeline',
    ],
  },
  {
    id: 'answer',
    title: 'Make my documents and knowledge answerable',
    chip: 'Answer my documents',
    blurb:
      'Your own material becomes something people can ask questions of, with ' +
      'answers you can check.',
    does: [
      'Answers with the source passage attached',
      'Fields pulled out of real PDFs and scans',
      'A site assistant that stays on topic',
      'Photos inspected and graded',
    ],
  },
  {
    id: 'fix',
    title: "Fix an AI feature that isn't reliable",
    chip: 'Make it reliable',
    blurb:
      'It works in the demo and fails in production. Usually retries, silent ' +
      'failures, or an evaluation that never says no.',
    does: [
      'Retries that cannot double-charge',
      'Failures that surface instead of vanishing',
      'Integrations proven before go-live',
      'Evaluation that is able to come back negative',
    ],
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
    asks: 'A phone line that books appointments',
    note: 'Books once, even if the call drops',
    noteTone: 'amber',
    featured: 1,
    shot: 'firstring',
    alt: 'FirstRing call console scoring a live call and confirming a booking',
    blurb:
      'Answers every call, works out what the caller needs, and books them into ' +
      'a real slot. If the line drops halfway through, the booking still lands — ' +
      'once, not twice.',
    scope:
      'Runs in the browser on a simulated line, so you can try the whole call ' +
      'without a phone number.',
    repo: 'ai-voice-receptionist',
  },
  {
    slug: 'relay',
    name: 'Relay',
    route: 'build',
    family: 'Agents & workflow automation',
    asks: 'Automation I can still control',
    note: 'Approved once, applied once',
    noteTone: 'amber',
    featured: 2,
    shot: 'relay',
    alt: 'Relay support workspace with a consequential action held for approval',
    blurb:
      'Reads the case, drafts the reply, and does the work — but stops and asks ' +
      'a person before anything irreversible. Refunds and cancellations wait for ' +
      'a human.',
    scope:
      'Actions are counted at the system they hit, not at the sender, so "it ' +
      'only ran once" means it only ran once.',
    repo: 'human-gated-support-automation',
  },
  {
    slug: 'gauge',
    name: 'Gauge',
    route: 'answer',
    family: 'Computer vision',
    asks: 'Parts checked from photos',
    note: 'Rejected a model that scored better',
    noteTone: 'amber',
    featured: 3,
    shot: 'gauge',
    alt: 'Gauge inspection station rejecting a defective part with the defect boxed',
    blurb:
      'Passes and rejects parts on its own where that is safe, and sends ' +
      'everything borderline to a person. The judgement about which is which is ' +
      'the product.',
    scope:
      'I benchmarked a stronger model and turned it down: on one run in three it ' +
      'waved real defects through. The shipped one handles what it can decide ' +
      'confidently and routes the rest.',
    repo: 'computer-vision-inspection',
  },
  {
    slug: 'leaddock',
    name: 'LeadDock',
    route: 'build',
    family: 'CRM & sales automation',
    asks: 'Leads answered before they go cold',
    note: 'Double bookings are impossible',
    noteTone: 'amber',
    featured: 4,
    shot: 'leaddock',
    alt: 'LeadDock routing a qualified lead into an open appointment slot',
    blurb:
      'New enquiry in, qualified, booked into a free slot, handed to your CRM — ' +
      'while they are still interested. Two enquiries from the same person do ' +
      'not become two bookings.',
    scope:
      'Ships with a stand-in CRM and calendar so you can click the whole flow ' +
      'today; yours plugs in behind the same interface.',
    repo: 'ai-lead-intake-automation',
  },
  {
    slug: 'ledger-lens',
    name: 'Ledger Lens',
    route: 'answer',
    family: 'Document intelligence',
    asks: 'Fields pulled out of invoices',
    note: 'Handles the bad files too',
    noteTone: null,
    featured: 5,
    shot: 'ledger',
    alt: 'Ledger Lens extracting named fields from a real invoice PDF',
    blurb:
      'Pulls the numbers you need out of real PDFs and scans — including the ' +
      'crooked, the half-empty and the ones that break other parsers.',
    scope:
      'Benchmarked on a bundled document set. Point it at yours and the numbers ' +
      'become yours.',
    repo: 'invoice-extraction-pipeline',
  },
  {
    slug: 'deliveryguard',
    name: 'DeliveryGuard',
    route: 'fix',
    family: 'AI operations',
    asks: 'Integrations that stop failing silently',
    note: 'Five other systems here run on it',
    noteTone: 'amber',
    featured: 6,
    shot: 'deliveryguard',
    alt: 'DeliveryGuard recovery console showing every attempt for one request',
    blurb:
      'The reason a retry never charges a customer twice. Every attempt is on ' +
      'the record, retries stop instead of hammering, and anything that dies ' +
      'lands somewhere you can see it and replay it.',
    scope:
      'Five other systems on this site consume it as a pinned package rather ' +
      'than reimplementing it, which is the strongest thing I can say about it.',
    repo: 'reliable-webhook-delivery',
  },
  {
    slug: 'adapterproof',
    name: 'AdapterProof',
    route: 'fix',
    family: 'AI operations',
    asks: 'Proof it works before go-live',
    note: '20 of 20 cases, zero credentials',
    noteTone: 'amber',
    featured: 7,
    shot: 'adapterproof',
    alt: 'AdapterProof conformance report over twenty generated integration cases',
    blurb:
      'Finds out whether an integration actually works before anyone hands over ' +
      'live credentials. Twenty generated cases, real HTTP traffic, no access to ' +
      'anything that matters.',
    scope:
      'Works for any HTTP provider you can describe in a manifest, which is most ' +
      'of them.',
    repo: 'api-adapter-conformance-harness',
  },
  {
    slug: 'proofgrid',
    name: 'ProofGrid',
    route: 'fix',
    family: 'LLM product engineering',
    asks: 'Did that prompt change help?',
    note: 'An evaluation that can say no',
    noteTone: null,
    featured: 8,
    shot: 'proofgrid',
    alt: 'ProofGrid comparing baseline, structured and repair outputs case by case',
    blurb:
      'Tells you whether a change to a prompt, model or schema actually helped, ' +
      'against cases frozen before the run — so the answer is allowed to be no.',
    scope:
      'The public run uses a deterministic profile, so you can see the whole ' +
      'comparison without supplying an API key.',
    repo: 'llm-evaluation-workbench',
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    route: 'answer',
    family: 'Knowledge & retrieval',
    asks: 'Answers from our own documents',
    note: 'Cites, or declines',
    noteTone: null,
    featured: null,
    shot: 'atlas',
    alt: 'Atlas answering a policy question with the source passage beside it',
    blurb:
      'Answers questions about your own material and shows the passage it used, ' +
      'so anyone can check it. When the documents do not support an answer, it ' +
      'says so instead of inventing one.',
    scope:
      'The public build is the base system; newer authentication work sits ' +
      'behind it and is not in this demo.',
    repo: 'grounded-knowledge-assistant',
  },
  {
    slug: 'switchback',
    name: 'Switchback',
    route: 'answer',
    family: 'LLM product engineering',
    asks: 'An assistant on our website',
    note: 'One script tag',
    noteTone: null,
    featured: null,
    shot: 'website-assistant',
    alt: 'Switchback storefront answering a delivery question with a cited source',
    blurb:
      'Answers visitors from your own pages, knows what page they are on, and ' +
      'declines what your site does not cover instead of guessing. Interested ' +
      'visitors get handed to you once.',
    scope: 'Demonstrated on a sample storefront you can click through.',
    repo: 'website-ai-assistant',
  },
  {
    slug: 'pipelineforge',
    name: 'PipelineForge',
    route: 'fix',
    family: 'AI operations',
    asks: 'Data that arrives complete',
    note: 'Reconciles, or fails loudly',
    noteTone: null,
    featured: null,
    shot: 'pipelineforge',
    alt: 'PipelineForge source and destination registers agreeing row for row',
    blurb:
      'Moves data between systems and refuses to call the job done until source ' +
      'and destination agree row for row. Bad records are quarantined, not ' +
      'quietly dropped.',
    scope:
      'Handles SQL, REST, CSV, JSONL and Parquet into DuckDB or Postgres; the ' +
      'demo runs the whole path on bundled fixtures.',
    repo: 'data-pipeline-reconciliation',
  },
  {
    slug: 'signalroom',
    name: 'SignalRoom',
    route: 'answer',
    family: 'Applied predictive ML',
    asks: 'Which customers to spend money on',
    note: 'Told the client no, with numbers',
    noteTone: 'amber',
    featured: null,
    shot: 'signalroom',
    alt: 'SignalRoom showing where an intervention is expected to pay back',
    blurb:
      'Works out where a retention offer pays for itself and where it just gives ' +
      'away margin. The estimate and the decision stay separate, so a weak ' +
      'signal cannot quietly become an expensive campaign.',
    scope:
      'On the public benchmark the average effect held up and per-customer ' +
      'targeting did not, so the shipped policy acts on the average. That is the ' +
      'finding, not a shortcut.',
    repo: 'retention-decisioning',
  },
  {
    slug: 'printline',
    name: 'Printline',
    route: 'build',
    family: 'Generative media',
    asks: 'Image generation we can repeat',
    note: 'Same inputs, same frame',
    noteTone: null,
    featured: null,
    shot: 'printline',
    alt: 'Printline render workstation with a finished frame and its provenance',
    blurb:
      'Generated images on a production footing: same inputs give the same ' +
      'frame, every render records how it was made, and a failed provider is a ' +
      'retry rather than a lost afternoon.',
    scope:
      'The public demo runs the full workflow with a prepared renderer, so you ' +
      'can click through it without a GPU.',
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

// The "kinds of AI work" figure on the proof strip is the number of distinct
// market families represented, stated in plain words rather than as a fraction
// of a taxonomy nobody on the page has heard of.
if (proof[1].value !== String(families.length)) {
  throw new Error(
    `Proof strip claims ${proof[1].value} kinds of work but ${families.length} families are represented.`,
  );
}
