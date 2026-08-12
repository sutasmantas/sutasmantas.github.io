import { evidence } from '../../data/evidence.js';

export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify(
      {
        schemaVersion: 1,
        purpose: 'Public claim-to-artifact navigation for the thirteen portfolio systems',
        projects: evidence,
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}
