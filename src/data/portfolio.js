// Single source of truth for the hub's content.
//
// The copy on this site is written against three empirical results, not against
// taste or blog advice.
//
// 1. DETAILED PUBLIC EVIDENCE IS WHAT MOVES HIRING.
//    Pallais, "Inefficient Hiring in Entry-Level Labor Markets", American
//    Economic Review 104(11), 2014 — a field experiment on oDesk (now Upwork)
//    that hired 952 randomly selected workers and gave them either detailed or
//    coarse public evaluations. Both being hired and receiving the *detailed*
//    evaluation substantially improved later employment. The binding constraint
//    on getting hired is public, specific, checkable information about ability.
//    This portfolio has no third-party evaluations, so the substitute is the
//    strongest owned equivalent: thirteen running systems with their source and
//    tests open, which a client can verify instead of taking on trust. It also
//    means detail per project is an asset, not clutter — so all thirteen are
//    listed with specifics rather than a curated handful with adjectives.
//
// 2. HALF OF A CREDIBILITY JUDGEMENT IS MADE ON APPEARANCE, AND ONLY ON WHAT IS
//    NOTICED. Fogg et al., "How do users evaluate the credibility of Web
//    sites?", Stanford Web Credibility Project, n=2,684: "design look" was cited
//    in 46.1% of credibility comments, information design and structure in
//    28.5%, information focus in 25.1%. Prominence-Interpretation Theory adds
//    that an element cannot affect credibility until it is noticed. So the
//    strongest signals — the count, the fact that everything is open and live —
//    sit above the fold at large size, and the visual execution is not
//    decoration but roughly half the argument.
//
// 3. NOBODY READS THIS. Nielsen Norman Group eye-tracking, 232 participants:
//    users read at most 28% of the words on a page, 20% is likelier, and they
//    scan in an F — two horizontal sweeps and a vertical run down the left edge.
//    So every card leads with the outcome in its first few words, blurbs are one
//    or two lines, and the detail that rewards a committed reader lives on the
//    project page rather than in the grid.
//
// What follows from all three: never explain the site's own methodology to the
// visitor. Nobody deciding whether to hire an engineer cares how the taxonomy
// behind the filter labels was derived.
//
// SCOPE, NOT DISCLAIMER. Every project states how far the public build goes,
// because buyers of AI work have been burned by things that only ever ran once,
// on a laptop. But it is stated as what the thing IS — "runs in your browser on
// a simulated line, so you can take the whole call yourself" — not as what it
// fails to prove. Same fact, no apology. Gauge's rejected model is framed as
// judgement, which is what INFORMATION_ARCHITECTURE.md specified and what it
// actually is: evidence that this person does not ship things that fail.
//
// And never call this work a demo. Thirteen of these are running systems a
// client can open; the word tells them they are toys.
//
// Project titles and their order are the owner's, matching the Upwork portfolio.
// The descriptive title is what a buyer searches for and is the card heading;
// the short product name is a wordmark, not the label.
//
// Routes and family names come from
// upwork_research/BOTTOM_UP_AI_JOB_TAXONOMY_2026-07-31.md — 647,272 postings
// gated, 997 manually labelled by reviewers shown no category list. They are the
// words clients write.
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
  // The headline is the credibility signal, stated as a specific number rather
  // than an adjective — the shape that Upwork profile research finds converts
  // ("47 completed contracts", not "experienced"). It also stops calling the
  // work a demo. Every one of these is a running system a client can open, and
  // naming them demos told the buyer they were toys.
  headline: ['Thirteen AI systems', 'you can open right now'],
  // Client-first, not "I am a…". The visitor is deciding whether to hire; the
  // sentence tells them what they get and how to check it themselves.
  sub:
    'Agent workflows, voice intake, document and retrieval pipelines, computer ' +
    'vision and the reliability engineering that keeps them running. Every one ' +
    'is live, open source and shipped with its tests — so you can judge the ' +
    'work before you ever talk to me.',
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
    label: 'Systems shipped and running',
    sub: 'built end to end, not prototyped',
  },
  {
    value: '10',
    unit: null,
    label: 'Areas of AI work',
    sub: 'voice, documents, retrieval, vision, data',
  },
  {
    value: '100%',
    unit: null,
    label: 'Open source, with tests',
    sub: 'read the code, not the claim',
  },
  {
    value: '0',
    unit: null,
    label: 'Logins, forms or calls',
    sub: 'to try any of them',
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
      'It works on your machine and falls over in production. Usually retries, ' +
      'silent failures, or an evaluation that never says no.',
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
    slug: 'atlas',
    title: 'RAG Knowledge Assistant with Cited Answers and Document Search',
    name: 'Atlas',
    route: 'answer',
    family: 'Knowledge & retrieval',
    asks: 'Answers from our own documents',
    note: 'Cites, or declines',
    noteTone: null,
    order: 1,
    shot: 'atlas',
    alt: 'Atlas answering a policy question with the source passage beside it',
    blurb:
      'Answers questions about your own material and shows the passage it used, ' +
      'so anyone can check it. When the documents do not support an answer, it ' +
      'says so instead of inventing one.',
    scope:
      'The public build is the base system. Newer authentication and external ' +
      'vector-store work sits behind it.',
    repo: 'grounded-knowledge-assistant',
  },
  {
    slug: 'relay',
    title: 'AI Support Operations with Grounded Replies and Human Approval',
    name: 'Relay',
    route: 'build',
    family: 'Agents & workflow automation',
    asks: 'Automation I can still control',
    note: 'Approved once, applied once',
    noteTone: 'amber',
    order: 2,
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
    slug: 'leaddock',
    title: 'AI Lead Intake, CRM and Appointment Booking Automation',
    name: 'LeadDock',
    route: 'build',
    family: 'CRM & sales automation',
    asks: 'Leads answered before they go cold',
    note: 'Double bookings are impossible',
    noteTone: 'amber',
    order: 3,
    shot: 'leaddock',
    alt: 'LeadDock routing a qualified lead into an open appointment slot',
    blurb:
      'New enquiry in, qualified, booked into a free slot, handed to your CRM — ' +
      'while they are still interested. Two enquiries from the same person do ' +
      'not become two bookings.',
    scope:
      'Ships with a stand-in CRM and calendar so you can walk the whole flow ' +
      'today. Yours plugs in behind the same interface.',
    repo: 'ai-lead-intake-automation',
  },
  {
    slug: 'firstring',
    title: 'AI Voice Receptionist with FAQ, Booking and Human Transfer',
    name: 'FirstRing',
    route: 'build',
    family: 'Voice & telephony',
    asks: 'A phone line that books appointments',
    note: 'Books once, even if the call drops',
    noteTone: 'amber',
    order: 4,
    shot: 'firstring',
    alt: 'FirstRing call console scoring a live call and confirming a booking',
    blurb:
      'Answers every call, works out what the caller needs, and books them into ' +
      'a real slot. If the line drops halfway through, the booking still lands — ' +
      'once, not twice.',
    scope:
      'Runs in the browser on a simulated line, so you can take the whole call ' +
      'yourself without a phone number.',
    repo: 'ai-voice-receptionist',
  },
  {
    slug: 'ledger-lens',
    title: 'AI Document Extraction with Human Review and Structured Export',
    name: 'Ledger Lens',
    route: 'answer',
    family: 'Document intelligence',
    asks: 'Fields pulled out of invoices',
    note: 'Handles the bad files too',
    noteTone: null,
    order: 5,
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
    slug: 'proofgrid',
    title: 'LLM Evaluation Workbench for Prompts and Structured Outputs',
    name: 'ProofGrid',
    route: 'fix',
    family: 'LLM product engineering',
    asks: 'Did that prompt change help?',
    note: 'An evaluation that can say no',
    noteTone: null,
    order: 6,
    shot: 'proofgrid',
    alt: 'ProofGrid comparing baseline, structured and repair outputs case by case',
    blurb:
      'Tells you whether a change to a prompt, model or schema actually helped, ' +
      'against cases frozen before the run — so the answer is allowed to be no.',
    scope:
      'The public run uses a deterministic profile, so the whole comparison works ' +
      'without an API key of your own.',
    repo: 'llm-evaluation-workbench',
  },
  {
    slug: 'switchback',
    title: 'Website AI Assistant with Cited Answers and Human Handoff',
    name: 'Switchback',
    route: 'answer',
    family: 'LLM product engineering',
    asks: 'An assistant on our website',
    note: 'One script tag',
    noteTone: null,
    order: 7,
    shot: 'website-assistant',
    alt: 'Switchback storefront answering a delivery question with a cited source',
    blurb:
      'Answers visitors from your own pages, knows what page they are on, and ' +
      'declines what your site does not cover instead of guessing. Interested ' +
      'visitors get handed to you once.',
    scope: 'Shown on a sample storefront you can click through end to end.',
    repo: 'website-ai-assistant',
  },
  {
    slug: 'pipelineforge',
    title: 'Data Pipeline and API Integration with Reconciliation and Recovery',
    name: 'PipelineForge',
    route: 'fix',
    family: 'AI operations',
    asks: 'Data that arrives complete',
    note: 'Reconciles, or fails loudly',
    noteTone: null,
    order: 8,
    shot: 'pipelineforge',
    alt: 'PipelineForge source and destination registers agreeing row for row',
    blurb:
      'Moves data between systems and refuses to call the job done until source ' +
      'and destination agree row for row. Bad records are quarantined, not ' +
      'quietly dropped.',
    scope:
      'Handles SQL, REST, CSV, JSONL and Parquet into DuckDB or Postgres, and the ' +
      'public build runs the whole path end to end.',
    repo: 'data-pipeline-reconciliation',
  },
  {
    slug: 'deliveryguard',
    title: 'Reliable Webhook Delivery with Idempotency, Retries and Replay',
    name: 'DeliveryGuard',
    route: 'fix',
    family: 'AI operations',
    asks: 'Integrations that stop failing silently',
    note: 'Five other systems here run on it',
    noteTone: 'amber',
    order: 9,
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
    title: 'API Adapter Test Harness for Webhooks and Failure Handling',
    name: 'AdapterProof',
    route: 'fix',
    family: 'AI operations',
    asks: 'Proof it works before go-live',
    note: '20 of 20 cases, zero credentials',
    noteTone: 'amber',
    order: 10,
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
    slug: 'printline',
    title: 'ComfyUI Image Workflow with Queue, Provenance and Retry',
    name: 'Printline',
    route: 'build',
    family: 'Generative media',
    asks: 'Image generation we can repeat',
    note: 'Same inputs, same frame',
    noteTone: null,
    order: 11,
    shot: 'printline',
    alt: 'Printline render workstation with a finished frame and its provenance',
    blurb:
      'Generated images on a production footing: same inputs give the same ' +
      'frame, every render records how it was made, and a failed provider is a ' +
      'retry rather than a lost afternoon.',
    scope:
      'The public build runs the full workflow with a prepared renderer, so it ' +
      'works in your browser without a GPU.',
    repo: 'comfyui-image-workflow',
  },
  {
    slug: 'gauge',
    title: 'Computer Vision Inspection with Defect Localization and Review',
    name: 'Gauge',
    route: 'answer',
    family: 'Computer vision',
    asks: 'Parts checked from photos',
    note: 'Rejected a model that scored better',
    noteTone: 'amber',
    order: 12,
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
    slug: 'signalroom',
    title: 'Uplift Modeling and Experiment Evaluation for Retention',
    name: 'SignalRoom',
    route: 'answer',
    family: 'Applied predictive ML',
    asks: 'Which customers to spend money on',
    note: 'Told the client no, with numbers',
    noteTone: 'amber',
    order: 13,
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
];

// Derived, so a project can never disagree with its own links.
for (const p of projects) {
  p.live = `${GP}/${p.repo}/`;
  p.source = `${GH}/${p.repo}`;
}

// The home page shows every system, in the owner's order. An earlier version
// showed five "featured" and hid the rest behind a filter, which buried the
// single strongest fact the page has — that there are thirteen of them. Pallais
// (2014) is about the value of *more* public evidence, not a curated sample.
export const ordered = [...projects].sort((a, b) => a.order - b.order);

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
