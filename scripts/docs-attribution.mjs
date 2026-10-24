import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  loadContext,
  safeRelative,
  isManaged,
  attributionLines,
  parseMetadata,
  transformDocument,
} from './docs-metadata.mjs';
import { githubApi, paginate } from './github-api.mjs';

export const marker = '<!-- docs-attribution:v1 -->';
const statePattern = /<!-- docs-attribution-state:([A-Za-z0-9+/=]+) -->/;
const botLogin = 'github-actions[bot]';
const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const sameRepo = (a, b) =>
  typeof a === 'string' && typeof b === 'string' && a.toLowerCase() === b.toLowerCase();
const quote = (value) =>
  JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('@', '\\u0040')
    .replaceAll('`', '\\u0060');

export function parseCommand(body) {
  const match =
    /^\/(propose-attribution|apply-attribution|apply-review-attribution)(?: ([^\r\n]+))?$/.exec(
      body.trim(),
    );
  if (!match)
    throw new Error(
      'Use one exact attribution command, optionally followed by a single-line JSON object. See CONTRIBUTING.md.',
    );
  let options = {};
  if (match[2]) {
    options = JSON.parse(match[2]);
    if (!options || Array.isArray(options) || typeof options !== 'object')
      throw new Error('Command options must be a JSON object.');
  }
  const allowed =
    match[1] === 'propose-attribution'
      ? ['users']
      : match[1] === 'apply-review-attribution'
        ? ['reviewer', 'files']
        : [];
  if (Object.keys(options).some((key) => !allowed.includes(key)))
    throw new Error('Unsupported attribution command option.');
  return { name: match[1], options };
}

export function eligibleReviews(reviews, pr, context) {
  const latest = new Map();
  // A later COMMENTED review does not revoke an earlier approval. A later
  // CHANGES_REQUESTED/DISMISSED review does. Only approvals of this exact head qualify.
  for (const review of [...reviews].sort((a, b) => a.id - b.id)) {
    if (!['APPROVED', 'CHANGES_REQUESTED', 'DISMISSED'].includes(review.state)) continue;
    if (review.user?.login) latest.set(review.user.login.toLowerCase(), review);
  }
  return [...latest.values()]
    .filter(
      (review) =>
        review.state === 'APPROVED' &&
        review.commit_id === pr.head.sha &&
        review.user.type === 'User' &&
        review.user.login.toLowerCase() !== pr.user.login.toLowerCase() &&
        context.users.has(review.user.login.toLowerCase()) &&
        context.users.get(review.user.login.toLowerCase()) !==
          context.users.get(pr.user.login.toLowerCase()),
    )
    .map((review) => ({
      user: review.user.login,
      name: context.users.get(review.user.login.toLowerCase()),
      reviewId: review.id,
    }));
}

export function makeProposal(context, pr, documents, reviews, users = {}) {
  if (!users || Array.isArray(users) || typeof users !== 'object')
    throw new Error('users must map exact document paths to mapped usernames.');
  const managed = documents.filter(
    (document) => document.status !== 'removed' && isManaged(context, document.path),
  );
  for (const file of Object.keys(users)) {
    safeRelative(file);
    if (!managed.some((document) => document.path === file))
      throw new Error('Correction must name an affected academic document.');
  }
  const entries = managed.map((document) => {
    const entry = {
      path: document.path,
      status: document.status,
      before: document.content,
      mode: document.mode,
    };
    try {
      safeRelative(document.path);
      if (document.error) throw new Error(document.error);
      const username = Object.hasOwn(users, document.path) ? users[document.path] : pr.user.login;
      if (typeof username !== 'string' || !context.users.has(username.toLowerCase()))
        throw new Error(
          'PR author/corrected user is unmapped. Confirm config/members.json on the default branch.',
        );
      let after;
      if (document.status === 'added' && attributionLines(document.content).length === 0) {
        after = transformDocument(context, 'init', document.content, username);
      } else {
        const current = parseMetadata(document.content, context.names);
        // Never silently erase manually verified history from the base document.
        if (document.baseContent !== undefined) {
          const base = parseMetadata(document.baseContent, context.names);
          if (
            base.performer !== current.performer ||
            base.editors.some((name) => !current.editors.includes(name)) ||
            base.reviewers.some((name) => !current.reviewers.includes(name))
          ) {
            throw new Error(
              'Attribution history differs from the base. Resolve explicitly with the team using a manually reviewed change; automation will not overwrite it.',
            );
          }
        }
        after =
          document.status === 'added'
            ? document.content
            : transformDocument(context, 'edit', document.content, username);
      }
      return { ...entry, after, metadata: parseMetadata(after, context.names) };
    } catch (error) {
      return { ...entry, error: error.message };
    }
  });
  const approvals = eligibleReviews(reviews, pr, context);
  const fingerprint = digest({
    head: pr.head.sha,
    base: pr.base.sha,
    entries,
    approvals,
    users,
    members: [...context.users],
    config: context.config,
  });
  return { head: pr.head.sha, base: pr.base.sha, entries, approvals, users, fingerprint };
}

function stateOf(comment) {
  const encoded = statePattern.exec(comment?.body || '')?.[1];
  if (!encoded) return;
  try {
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  } catch {
    return;
  }
}

export function renderProposal(pr, proposal, message = '', appliedHead) {
  const lines = [
    marker,
    '## Document Attribution Proposal',
    '',
    `PR author: ${quote(pr.user.login)}`,
    `Head: \`${proposal.head}\``,
    '',
    message,
    '',
  ];
  for (const entry of proposal.entries) {
    lines.push(`File: ${quote(entry.path)}`);
    if (entry.error) lines.push(`Manual correction required: ${quote(entry.error)}`);
    else
      lines.push(
        `Performed by: ${quote(entry.metadata.performer)}`,
        `Reviewed by: ${quote(entry.metadata.reviewers.join(', ') || 'None yet')}`,
        `Edited by: ${quote(entry.metadata.editors.join(', ') || 'None')}`,
        entry.after === entry.before
          ? 'Already synchronized.'
          : 'Proposed change awaiting confirmation.',
      );
    lines.push('');
  }
  if (!proposal.entries.length) lines.push('No affected academic Markdown documents.');
  lines.push('Eligible approvals for this exact head (not confirmation of individual documents):');
  for (const approval of proposal.approvals)
    lines.push(`- ${quote(approval.user)} → ${quote(approval.name)} (review ${approval.reviewId})`);
  lines.push(
    '',
    'Authorized collaborators: `/apply-attribution` applies the displayed author/editor proposal.',
    'For a reviewer, explicitly confirm the documents: `/apply-review-attribution {"reviewer":"username","files":["docs/path.md"]}`.',
    'Corrections: `/propose-attribution {"users":{"docs/path.md":"actual-creator-or-editor"}}`, inspect the new proposal, then confirm.',
    'Fork writes are disabled. For per-section attribution, edit the relevant section lines manually and run docs:meta check. Missing/malformed metadata also needs manual correction.',
    'After a metadata commit, verify the final version and approve again. Final approvals never trigger commits.',
  );
  const state = {
    head: proposal.head,
    base: proposal.base,
    fingerprint: proposal.fingerprint,
    users: proposal.users,
    appliedHead,
  };
  lines.push(
    `<!-- docs-attribution-state:${Buffer.from(JSON.stringify(state)).toString('base64')} -->`,
  );
  const body = lines.join('\n');
  if (body.length > 60000)
    throw new Error('Proposal is too large to comment safely; split the PR or use the CLI.');
  return body;
}

export class AttributionService {
  constructor(api, repository, context) {
    if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('Invalid repository.');
    this.api = api;
    this.repository = repository;
    this.route = `/repos/${repository}`;
    this.context = context;
  }
  async pr(number) {
    return this.api(`${this.route}/pulls/${number}`);
  }
  async comments(number) {
    return (await paginate(this.api, `${this.route}/issues/${number}/comments`)).filter(
      (comment) =>
        comment.user?.login === botLogin &&
        comment.user.type === 'Bot' &&
        comment.body?.startsWith(marker),
    );
  }
  async publish(number, pr, proposal, message, appliedHead) {
    const existing = await this.comments(number);
    const body = renderProposal(pr, proposal, message, appliedHead);
    if (existing[0]) {
      await this.api(`${this.route}/issues/comments/${existing[0].id}`, {
        method: 'PATCH',
        body: { body },
      });
    } else {
      await this.api(`${this.route}/issues/${number}/comments`, { method: 'POST', body: { body } });
    }
  }
  async snapshot(pr, users = {}) {
    const files = await paginate(this.api, `${this.route}/pulls/${pr.number}/files`);
    // The REST files endpoint is capped at 3000, so never process a partial PR.
    if (files.length !== pr.changed_files || files.length >= 3000)
      throw new Error('Incomplete or oversized PR file list; use the CLI.');
    const managed = files.filter(
      (file) => file.status !== 'removed' && isManaged(this.context, file.filename),
    );
    const commit = await this.api(`${this.route}/git/commits/${pr.head.sha}`);
    const tree = await this.api(`${this.route}/git/trees/${commit.tree.sha}?recursive=1`);
    if (tree.truncated) throw new Error('Incomplete Git tree; use the CLI.');
    const entries = new Map(tree.tree.map((entry) => [entry.path, entry]));
    const documents = [];
    for (const file of managed) {
      const document = { path: file.filename, status: file.status };
      try {
        safeRelative(file.filename);
        const entry = entries.get(file.filename);
        if (!entry || entry.type !== 'blob' || !['100644', '100755'].includes(entry.mode))
          throw new Error('Only regular Markdown blobs are supported; no symlinks/submodules.');
        const blob = await this.api(`${this.route}/git/blobs/${entry.sha}`);
        if (blob.encoding !== 'base64' || blob.size > 1024 * 1024)
          throw new Error('Unsupported or oversized document; use the CLI.');
        document.content = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(
          Buffer.from(blob.content, 'base64'),
        );
        document.mode = entry.mode;
        if (file.status !== 'added') {
          const oldPath = file.previous_filename || file.filename;
          safeRelative(oldPath);
          const base = await this.api(
            `${this.route}/contents/${oldPath.split('/').map(encodeURIComponent).join('/')}?ref=${pr.base.sha}`,
          );
          if (base.type !== 'file' || base.encoding !== 'base64')
            throw new Error('Cannot verify base attribution.');
          document.baseContent = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(
            Buffer.from(base.content, 'base64'),
          );
        }
      } catch (error) {
        document.error = error.message;
      }
      documents.push(document);
    }
    const reviews = await paginate(this.api, `${this.route}/pulls/${pr.number}/reviews`);
    const proposal = makeProposal(this.context, pr, documents, reviews, users);
    return { proposal, tree: commit.tree.sha };
  }
  async notice(number, message) {
    const existing = await this.comments(number);
    // Drop stale proposal state on failure. A future apply must refresh and be
    // explicitly confirmed again; no incomplete proposal can authorize writes.
    const body = `${marker}\n## Document Attribution Proposal\n\nAutomation warning: ${quote(message)}\n\nUse the CLI fallback or ask a maintainer to inspect the workflow run. No proposal is currently applicable.`;
    if (existing[0]) {
      await this.api(`${this.route}/issues/comments/${existing[0].id}`, {
        method: 'PATCH',
        body: { body },
      });
    } else {
      await this.api(`${this.route}/issues/${number}/comments`, { method: 'POST', body: { body } });
    }
  }
  async authorize(login) {
    if (typeof login !== 'string' || !/^[a-z\d-]+$/i.test(login))
      throw new Error('Invalid commenter.');
    const permission = await this.api(
      `${this.route}/collaborators/${encodeURIComponent(login)}/permission`,
    );
    if (!['write', 'maintain', 'admin'].includes(permission.permission))
      throw new Error(
        'Only collaborators with write, maintain or admin permission can confirm attribution.',
      );
  }
  async propose(number, users = {}, message = '') {
    const pr = await this.pr(number);
    if (pr.state !== 'open') return;
    let proposal;
    try {
      ({ proposal } = await this.snapshot(pr, users));
    } catch (error) {
      await this.notice(number, error.message);
      return;
    }
    if (!sameRepo(pr.head.repo?.full_name, this.repository))
      message += '\nFork PR: automatic writes are disabled; use the CLI.';
    await this.publish(number, pr, proposal, message);
    return proposal;
  }
  async apply(number, actor, command, commentCreatedAt) {
    await this.authorize(actor);
    const pr = await this.pr(number);
    if (pr.state !== 'open') throw new Error('PR must be open.');
    const repo = await this.api(this.route);
    if (!sameRepo(pr.head.repo?.full_name, this.repository))
      throw new Error('Fork PR: automatic writes are disabled. Use the CLI on the fork.');
    if (
      pr.head.ref === repo.default_branch ||
      pr.head.ref === 'main' ||
      pr.head.ref === pr.base.ref
    )
      throw new Error('Refusing to write to main, the default branch or the PR base branch.');
    const comment = (await this.comments(number))[0];
    const state = stateOf(comment);
    const { proposal, tree } = await this.snapshot(pr, state?.users || {});
    if (
      !state ||
      state.head !== pr.head.sha ||
      state.base !== pr.base.sha ||
      state.fingerprint !== proposal.fingerprint ||
      (commentCreatedAt && Date.parse(commentCreatedAt) < Date.parse(comment.updated_at))
    ) {
      await this.publish(
        number,
        pr,
        proposal,
        'Proposal changed or was missing/stale. Inspect this refreshed proposal and submit a new confirmation command.',
      );
      return { stale: true };
    }
    if (proposal.entries.some((entry) => entry.error))
      throw new Error(
        'Some documents require manual correction. No files were changed; use the CLI and push the corrections.',
      );
    let changes;
    if (command.name === 'apply-attribution') {
      changes = proposal.entries.filter((entry) => entry.before !== entry.after);
    } else if (command.name === 'apply-review-attribution') {
      const { reviewer, files } = command.options;
      if (
        typeof reviewer !== 'string' ||
        !Array.isArray(files) ||
        !files.length ||
        new Set(files).size !== files.length
      )
        throw new Error(
          'Confirm one eligible reviewer and a nonempty list of distinct document paths.',
        );
      const approval = proposal.approvals.find(
        (entry) => entry.user.toLowerCase() === reviewer.toLowerCase(),
      );
      if (!approval)
        throw new Error(
          'Reviewer has no eligible submitted approval for this exact PR head. Requested, dismissed, outdated and self reviews are excluded.',
        );
      changes = files
        .map((file) => {
          safeRelative(file);
          const entry = proposal.entries.find((entry) => entry.path === file);
          if (!entry) throw new Error('Review confirmation must name affected academic documents.');
          // Reviewer confirmation does not implicitly apply author/editor changes.
          const after = transformDocument(this.context, 'review', entry.before, reviewer, true);
          return { ...entry, after };
        })
        .filter((entry) => entry.before !== entry.after);
    } else throw new Error('Unsupported apply command.');
    if (!changes.length) return { unchanged: true };
    // Recheck both the PR and the actual branch. The final API mutation also
    // compares the old SHA atomically, including protection against a concurrent rewind.
    const refRoute = `${this.route}/git/refs/heads/${pr.head.ref.split('/').map(encodeURIComponent).join('/')}`;
    if (
      (await this.pr(number)).head.sha !== pr.head.sha ||
      (await this.api(refRoute.replace('/refs/', '/ref/'))).object.sha !== pr.head.sha
    )
      throw new Error('PR head changed. Request a new proposal before confirming.');
    const newTree = await this.api(`${this.route}/git/trees`, {
      method: 'POST',
      body: {
        base_tree: tree,
        tree: changes.map((entry) => ({
          path: entry.path,
          mode: entry.mode,
          type: 'blob',
          content: entry.after,
        })),
      },
    });
    const commit = await this.api(`${this.route}/git/commits`, {
      method: 'POST',
      body: {
        message: `docs(attribution): synchronize confirmed metadata for PR #${number}`,
        tree: newTree.sha,
        parents: [pr.head.sha],
      },
    });
    const finalPr = await this.pr(number);
    if (
      finalPr.state !== 'open' ||
      finalPr.head.sha !== pr.head.sha ||
      finalPr.base.sha !== pr.base.sha
    )
      throw new Error('PR changed during application; no branch update was made.');
    if (command.name === 'apply-review-attribution') {
      const reviews = await paginate(this.api, `${this.route}/pulls/${number}/reviews`);
      if (digest(eligibleReviews(reviews, finalPr, this.context)) !== digest(proposal.approvals))
        throw new Error(
          'Review state changed during application; no branch update was made. Confirm a fresh proposal.',
        );
    }
    await this.api('/graphql', {
      method: 'POST',
      body: {
        query:
          'mutation UpdateAttributionRef($input: UpdateRefsInput!) { updateRefs(input: $input) { clientMutationId } }',
        variables: {
          input: {
            repositoryId: repo.node_id,
            refUpdates: [
              {
                name: `refs/heads/${pr.head.ref}`,
                beforeOid: pr.head.sha,
                afterOid: commit.sha,
                force: false,
              },
            ],
          },
        },
      },
    });
    try {
      // Dispatch trusted default-branch CI, which checks out this SHA with a separate
      // read-only job and reports its result on this exact commit.
      await this.api(`${this.route}/actions/workflows/ci.yml/dispatches`, {
        method: 'POST',
        body: {
          ref: repo.default_branch,
          inputs: { head_sha: commit.sha, base_sha: pr.base.sha, pr_number: String(number) },
        },
      });
      await this.publish(
        number,
        pr,
        proposal,
        `Applied at ${commit.sha}. CI requested for that commit. Earlier approvals are now outdated under this tool's policy. Verify and approve the final version; no further commit occurs automatically.`,
        commit.sha,
      );
    } catch {
      await this.publish(
        number,
        pr,
        proposal,
        `Metadata was applied at ${commit.sha}, but CI dispatch or status reporting failed. Do not merge until CI passes on this head. A maintainer can dispatch CI manually using this SHA/base/PR number, or push a normal follow-up commit.`,
        commit.sha,
      );
    }
    return { sha: commit.sha };
  }
}

export async function handleEvent(service, eventName, event, mode) {
  let number;
  if (eventName === 'workflow_run') {
    if (
      event.workflow_run.event !== 'pull_request_review' ||
      event.workflow_run.conclusion !== 'success'
    )
      return;
    const prs = event.workflow_run.pull_requests || [];
    if (prs.length !== 1) return;
    number = prs[0].number;
  } else number = event.pull_request?.number || (event.issue?.pull_request && event.issue.number);
  if (!Number.isSafeInteger(number) || number <= 0) return;
  if (eventName === 'issue_comment') {
    // Fetch the actual comment; don't trust the event text or author association.
    const comment = await service.api(`${service.route}/issues/comments/${event.comment.id}`);
    if (comment.user?.type !== 'User' || !comment.body?.trim().startsWith('/')) return;
    let command;
    try {
      command = parseCommand(comment.body);
    } catch {
      return;
    }
    if (command.name === 'propose-attribution' && mode === 'propose') {
      await service.authorize(comment.user.login);
      return service.propose(number, command.options.users || {});
    }
    if (command.name !== 'propose-attribution' && mode === 'apply') {
      try {
        return await service.apply(number, comment.user.login, command, comment.created_at);
      } catch (error) {
        return service.propose(
          number,
          {},
          `Not applied: ${quote(error.message)}. Correct the problem and confirm a fresh proposal, or use the manual CLI.`,
        );
      }
    }
    return;
  }
  if (mode === 'propose') return service.propose(number);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
    const service = new AttributionService(
      githubApi(process.env.GITHUB_TOKEN),
      process.env.GITHUB_REPOSITORY,
      await loadContext(),
    );
    await handleEvent(service, process.env.GITHUB_EVENT_NAME, event, process.argv[2]);
  } catch (error) {
    console.error(`Attribution automation failed: ${error.message}`);
    process.exitCode = 1;
  }
}
