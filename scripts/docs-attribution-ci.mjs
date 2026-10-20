import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { githubApi } from './github-api.mjs';

export async function reportResult(api, repository, inputs, result, runId) {
  if (
    !/^[\w.-]+\/[\w.-]+$/.test(repository) ||
    !/^[a-f\d]{40}$/.test(inputs.head_sha || '') ||
    !/^[a-f\d]{40}$/.test(inputs.base_sha || '') ||
    !/^[1-9]\d*$/.test(inputs.pr_number || '')
  )
    throw new Error('Invalid dispatched CI inputs.');
  const route = `/repos/${repository}`;
  const pr = await api(`${route}/pulls/${inputs.pr_number}`);
  if (
    pr.state !== 'open' ||
    pr.head.repo?.full_name.toLowerCase() !== repository.toLowerCase() ||
    pr.head.sha !== inputs.head_sha ||
    pr.base.sha !== inputs.base_sha
  )
    throw new Error('PR changed or is not an open same-repository PR. No CI result was attached.');
  if (!['success', 'failure', 'cancelled', 'skipped'].includes(result))
    throw new Error('Invalid quality job result.');
  await api(`${route}/check-runs`, {
    method: 'POST',
    body: {
      name: 'Repository quality',
      head_sha: inputs.head_sha,
      status: 'completed',
      // Never turn a skipped/cancelled quality job into a passing required check.
      conclusion: result === 'success' ? 'success' : 'failure',
      details_url: `https://github.com/${repository}/actions/runs/${encodeURIComponent(runId)}`,
      output: {
        title: `Repository quality: ${result}`,
        summary:
          'Result of the read-only quality job checking out this exact commit. Formatting, attribution tests and changed-document validation must all pass. Review the final version before merging.',
      },
    },
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
    if (process.env.GITHUB_EVENT_NAME !== 'workflow_dispatch')
      throw new Error('Only dispatched CI may report bot commit results.');
    await reportResult(
      githubApi(process.env.GITHUB_TOKEN),
      process.env.GITHUB_REPOSITORY,
      event.inputs,
      process.env.QUALITY_RESULT,
      process.env.GITHUB_RUN_ID,
    );
  } catch (error) {
    console.error(`CI reporting failed: ${error.message}`);
    process.exitCode = 1;
  }
}
