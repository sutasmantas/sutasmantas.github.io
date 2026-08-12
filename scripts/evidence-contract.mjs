const SHA = /^[0-9a-f]{40}$/;

export function validateEvidence(records, projects) {
  const errors = [];
  const projectSlugs = projects.map((project) => project.slug).sort();
  const recordSlugs = records.map((record) => record.slug).sort();

  if (JSON.stringify(recordSlugs) !== JSON.stringify(projectSlugs)) {
    errors.push(`project coverage differs: expected ${projectSlugs.join(', ')}, got ${recordSlugs.join(', ')}`);
  }
  if (new Set(recordSlugs).size !== recordSlugs.length) errors.push('duplicate project slug');

  for (const item of records) {
    const at = item.slug || '<missing slug>';
    if (!SHA.test(item.publicHead ?? '')) errors.push(`${at}: publicHead is not a full SHA`);
    if (!item.claim || item.claim.length < 40) errors.push(`${at}: claim is missing or vague`);
    if (!item.boundary || item.boundary.length < 50) errors.push(`${at}: boundary is missing or vague`);
    if (!item.rerun || item.rerun.length < 10) errors.push(`${at}: rerun command is missing`);
    if (!item.receiptBasis?.length) errors.push(`${at}: receipt basis is missing`);

    for (const field of ['artifact', 'test']) {
      const evidence = item[field];
      if (!evidence?.path || !evidence?.label) errors.push(`${at}: ${field} path or label is missing`);
      const pinned = `/blob/${item.publicHead}/${evidence?.path}`;
      if (!evidence?.url?.includes(pinned)) errors.push(`${at}: ${field} URL is not pinned to publicHead`);
      if (evidence?.url?.includes('/blob/main/')) errors.push(`${at}: ${field} URL uses mutable main`);
    }

    if (!item.hosted?.url?.endsWith(`/actions/runs/${item.hosted?.run}`)) {
      errors.push(`${at}: hosted run URL and run ID disagree`);
    }
  }

  if (errors.length) throw new Error(errors.join('\n'));
  return { projects: records.length, immutableLinks: records.length * 2 };
}
