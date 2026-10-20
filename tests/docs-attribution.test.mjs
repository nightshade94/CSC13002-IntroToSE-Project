import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AttributionService,
  makeProposal,
  eligibleReviews,
  parseCommand,
  marker,
  handleEvent,
} from '../scripts/docs-attribution.mjs';
import { reportResult } from '../scripts/docs-attribution-ci.mjs';
import { githubApi } from '../scripts/github-api.mjs';
import { parseMetadata } from '../scripts/docs-metadata.mjs';

const HEAD = 'a'.repeat(40);
const BASE = 'b'.repeat(40);
const NEXT = 'c'.repeat(40);
const repository = 'team/planner';
const route = `/repos/${repository}`;
const file = 'docs/academic/design.md';
const other = 'docs/academic/with spaces.md';
const context = {
  config: { include: ['docs/academic'], exclude: [] },
  users: new Map([
    ['alice', 'Ngô Huỳnh Thắm'],
    ['bob', 'Cao Tiến Thiên'],
    ['carol', 'Dư Hoài Phúc'],
  ]),
  names: new Set(['Ngô Huỳnh Thắm', 'Cao Tiến Thiên', 'Dư Hoài Phúc']),
};
const metadata =
  '**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** None yet · **Edited by:** None';
const pr = () => ({
  number: 7,
  state: 'open',
  changed_files: 1,
  user: { login: 'alice' },
  head: { sha: HEAD, ref: 'docs/SFP-25-design', repo: { full_name: repository } },
  base: { sha: BASE, ref: 'main' },
});
const document = (overrides = {}) => ({
  path: file,
  status: 'added',
  content: '# Tiêu đề\r\n\r\nNội dung\r\n',
  mode: '100644',
  ...overrides,
});
const approval = (overrides = {}) => ({
  id: 10,
  state: 'APPROVED',
  commit_id: HEAD,
  user: { login: 'bob', type: 'User' },
  ...overrides,
});

function fixture(options = {}) {
  const state = {
    pr: pr(),
    permission: 'write',
    comments: [],
    reviews: [],
    calls: [],
    docs: [document()],
    ref: HEAD,
    ...options,
  };
  state.pr.changed_files = state.docs.length;
  let staged;
  const api = async (url, request = {}) => {
    const method = request.method || 'GET';
    state.calls.push({ url, method, body: request.body });
    const endpoint = url.split('?')[0];
    if (endpoint === route) return { default_branch: 'main', node_id: 'repository-node' };
    if (endpoint === `${route}/pulls/7`) return structuredClone(state.pr);
    if (endpoint.includes('/collaborators/')) return { permission: state.permission };
    if (endpoint === `${route}/pulls/7/files`)
      return state.docs.map((doc) => ({ filename: doc.path, status: doc.status }));
    if (endpoint === `${route}/pulls/7/reviews`) return structuredClone(state.reviews);
    if (endpoint === `${route}/issues/7/comments` && method === 'GET')
      return structuredClone(state.comments);
    if (endpoint === `${route}/issues/7/comments` && method === 'POST') {
      const comment = {
        id: 99,
        user: { login: 'github-actions[bot]', type: 'Bot' },
        updated_at: '2026-10-20T00:00:00Z',
        ...request.body,
      };
      state.comments.push(comment);
      return comment;
    }
    if (endpoint === `${route}/issues/comments/99` && method === 'PATCH') {
      Object.assign(
        state.comments.find((comment) => comment.id === 99),
        request.body,
      );
      return {};
    }
    if (endpoint === `${route}/issues/comments/123`) return state.command;
    if (endpoint.startsWith(`${route}/git/commits/`) && method === 'GET')
      return { tree: { sha: 'tree' } };
    if (endpoint === `${route}/git/trees/tree`)
      return {
        truncated: state.truncated || false,
        tree: state.docs.map((doc, index) => ({
          path: doc.path,
          type: 'blob',
          mode: doc.mode,
          sha: `blob${index}`,
        })),
      };
    if (endpoint.startsWith(`${route}/git/blobs/blob`)) {
      const doc = state.docs[Number(endpoint.split('blob').at(-1))];
      return {
        content: Buffer.from(doc.content).toString('base64'),
        encoding: 'base64',
        size: Buffer.byteLength(doc.content),
      };
    }
    if (endpoint.startsWith(`${route}/contents/`)) {
      const doc = state.docs.find(
        (doc) => doc.path === decodeURIComponent(endpoint.slice(`${route}/contents/`.length)),
      );
      return {
        type: 'file',
        content: Buffer.from(doc.baseContent ?? metadata).toString('base64'),
        encoding: 'base64',
      };
    }
    if (endpoint.includes('/git/ref/heads/')) return { object: { sha: state.ref } };
    if (endpoint === `${route}/git/trees` && method === 'POST') {
      staged = request.body.tree;
      return { sha: 'newtree' };
    }
    if (endpoint === `${route}/git/commits` && method === 'POST') {
      if (state.dismissDuringApply) state.reviews[0].state = 'DISMISSED';
      return { sha: NEXT };
    }
    if (endpoint === '/graphql' && method === 'POST') {
      if (state.rejectRefUpdate) throw new Error('Non-fast-forward update rejected.');
      const update = request.body.variables.input.refUpdates[0];
      assert.equal(update.force, false);
      assert.equal(update.beforeOid, HEAD);
      assert.equal(update.afterOid, NEXT);
      assert.equal(request.body.variables.input.repositoryId, 'repository-node');
      if (state.rewindDuringApply) state.ref = BASE;
      if (state.ref !== update.beforeOid) throw new Error('Atomic head comparison rejected.');
      state.pr.head.sha = NEXT;
      state.ref = NEXT;
      for (const entry of staged)
        state.docs.find((doc) => doc.path === entry.path).content = entry.content;
      return { data: { updateRefs: { clientMutationId: null } } };
    }
    if (endpoint.endsWith('/actions/workflows/ci.yml/dispatches')) {
      if (state.dispatchFailure) throw new Error('Dispatch denied.');
      return;
    }
    throw new Error(`Unexpected mocked API call: ${method} ${url}`);
  };
  return { state, service: new AttributionService(api, repository, context), api };
}

test('new document proposal initializes the mapped author and preserves BOM, CRLF and surrounding Markdown', () => {
  const content = '\uFEFF# Thiết kế\r\n\r\nNội dung\r\n';
  const proposal = makeProposal(context, pr(), [document({ content })], []);
  assert.equal(proposal.entries[0].metadata.performer, context.users.get('alice'));
  assert.deepEqual(proposal.entries[0].metadata.editors, []);
  assert.equal(
    proposal.entries[0].after,
    `\uFEFF# Thiết kế\r\n\r\n${metadata}\r\n\r\nNội dung\r\n`,
  );
});

test('multiple documents: preserve performer, previous editors/reviewers; ignore unmanaged and removed files', () => {
  const existing = metadata
    .replace('None yet', context.users.get('bob'))
    .replace('**Edited by:** None', `**Edited by:** ${context.users.get('bob')}`);
  const existingPr = pr();
  existingPr.user.login = 'carol';
  const proposal = makeProposal(
    context,
    existingPr,
    [
      document(),
      document({ path: other, status: 'modified', content: existing, baseContent: existing }),
      document({ path: 'README.md' }),
      document({ status: 'removed' }),
    ],
    [],
  );
  assert.equal(proposal.entries.length, 2);
  const result = proposal.entries[1].metadata;
  assert.equal(result.performer, context.users.get('alice'));
  assert.deepEqual(result.reviewers, [context.users.get('bob')]);
  assert.deepEqual(result.editors, [context.users.get('bob'), context.users.get('carol')]);
});

test('unmapped authors, malformed metadata and ambiguous legacy attribution require manual correction', () => {
  const unknown = pr();
  unknown.user.login = 'unknown';
  assert.match(makeProposal(context, unknown, [document()], []).entries[0].error, /unmapped/);
  for (const content of [
    `${metadata}\n${metadata}`,
    metadata.replace('**Edited by:** None', '**Edited by:** [None]'),
  ]) {
    assert.ok(makeProposal(context, pr(), [document({ content })], []).entries[0].error);
  }
  assert.ok(
    makeProposal(
      context,
      pr(),
      [document({ status: 'modified', content: '# Legacy', baseContent: '# Legacy' })],
      [],
    ).entries[0].error,
  );
});

test('base attribution cannot be silently replaced or lost, and existing valid new-document attribution stays intact', () => {
  const content = metadata.replace(context.users.get('alice'), context.users.get('bob'));
  assert.match(
    makeProposal(
      context,
      pr(),
      [document({ status: 'modified', content, baseContent: metadata })],
      [],
    ).entries[0].error,
    /history differs/,
  );
  const result = makeProposal(context, pr(), [document({ content })], []).entries[0];
  assert.equal(result.after, content);
});

test('corrections only use mapped identities on exact affected paths', () => {
  assert.equal(
    makeProposal(context, pr(), [document()], [], { [file]: 'carol' }).entries[0].metadata
      .performer,
    context.users.get('carol'),
  );
  assert.throws(
    () => makeProposal(context, pr(), [document()], [], { '../outside.md': 'bob' }),
    /Unsafe path/,
  );
  assert.throws(
    () => makeProposal(context, pr(), [document()], [], { 'README.md': 'bob' }),
    /affected academic/,
  );
});

test('approval policy excludes dismissed, outdated, self, unmapped and requested/comment-only reviews', () => {
  assert.equal(eligibleReviews([approval()], pr(), context).length, 1);
  for (const reviews of [
    [approval({ commit_id: BASE })],
    [approval({ state: 'COMMENTED' })],
    [approval({ user: { login: 'alice', type: 'User' } })],
    [approval({ user: { login: 'unknown', type: 'User' } })],
    [approval(), approval({ id: 11, state: 'DISMISSED' })],
    [approval(), approval({ id: 11, state: 'CHANGES_REQUESTED' })],
  ])
    assert.deepEqual(eligibleReviews(reviews, pr(), context), []);
  assert.equal(
    eligibleReviews([approval(), approval({ id: 11, state: 'COMMENTED' })], pr(), context).length,
    1,
  );
});

test('bot proposal is updated, human marker spoofing is ignored, and review events never commit', async () => {
  const { service, state } = fixture({
    comments: [{ id: 1, user: { login: 'alice', type: 'User' }, body: marker }],
  });
  await service.propose(7);
  state.reviews = [approval()];
  await handleEvent(
    service,
    'workflow_run',
    {
      workflow_run: {
        event: 'pull_request_review',
        conclusion: 'success',
        pull_requests: [{ number: 7 }],
      },
    },
    'propose',
  );
  assert.equal(state.comments.length, 2);
  assert.match(state.comments[1].body, /Eligible approvals/);
  assert.match(state.comments[1].body, /Cao Tiến Thiên/);
  assert.equal(state.calls.filter((call) => call.url.endsWith('/git/commits')).length, 0);
});

test('unauthorized confirmations cannot write a tree, commit, ref or CI dispatch', async () => {
  const { service, state } = fixture({ permission: 'read' });
  await service.propose(7);
  await assert.rejects(
    service.apply(7, 'alice', parseCommand('/apply-attribution')),
    /Only collaborators/,
  );
  assert.equal(
    state.calls.some((call) => call.url.includes('/git/') && call.method !== 'GET'),
    false,
  );
});

test('comment handling verifies actual API commenter permissions rather than event claims', async () => {
  const { service, state } = fixture({
    permission: 'read',
    command: { user: { login: 'bob', type: 'User' }, body: '/apply-attribution' },
  });
  await service.propose(7);
  await handleEvent(
    service,
    'issue_comment',
    {
      issue: { number: 7, pull_request: {} },
      comment: { id: 123, user: { login: 'admin' }, author_association: 'OWNER' },
    },
    'apply',
  );
  assert.ok(state.calls.some((call) => call.url.includes('/collaborators/bob/permission')));
  assert.equal(
    state.calls.some((call) => call.url === '/graphql'),
    false,
  );
  assert.match(state.comments[0].body, /Only collaborators/);
});

test('corrected new-document proposal must be separately confirmed before a branch update', async () => {
  const { service, state } = fixture();
  await service.propose(7, { [file]: 'carol' });
  assert.equal(state.pr.head.sha, HEAD);
  await service.apply(7, 'alice', parseCommand('/apply-attribution'));
  assert.equal(
    parseMetadata(state.docs[0].content, context.names).performer,
    context.users.get('carol'),
  );
});

test('fork PRs and main/default/base branches reject automatic writes', async () => {
  for (const head of [
    { ...pr().head, repo: { full_name: 'fork/planner' } },
    { ...pr().head, ref: 'main' },
  ]) {
    const { service } = fixture({ pr: { ...pr(), head } });
    await assert.rejects(
      service.apply(7, 'alice', parseCommand('/apply-attribution')),
      /Fork PR|Refusing/,
    );
  }
});

test('stale head, changed review state, changed mapping and commands predating the proposal require fresh confirmation', async () => {
  for (const cause of ['head', 'review', 'time', 'mapping']) {
    const { service, state } = fixture();
    await service.propose(7);
    if (cause === 'head') {
      state.pr.head.sha = NEXT;
      state.ref = NEXT;
    }
    if (cause === 'review') state.reviews = [approval()];
    if (cause === 'mapping')
      service.context = {
        ...context,
        users: new Map([...context.users, ['dave', 'Fourth Member']]),
      };
    const result = await service.apply(
      7,
      'alice',
      parseCommand('/apply-attribution'),
      cause === 'time' ? '2026-10-19T00:00:00Z' : undefined,
    );
    assert.equal(result.stale, true);
    assert.equal(
      state.calls.some((call) => call.method === 'POST' && call.url.endsWith('/git/commits')),
      false,
    );
  }
});

test('authorized apply changes only metadata, fast-forwards one bot commit and dispatches trusted CI', async () => {
  const { service, state } = fixture();
  await service.propose(7);
  const proposed = makeProposal(context, state.pr, state.docs, []).entries[0].after;
  const result = await service.apply(7, 'alice', parseCommand('/apply-attribution'));
  assert.equal(result.sha, NEXT);
  assert.equal(state.docs[0].content, proposed);
  const tree = state.calls.find((call) => call.url.endsWith('/git/trees') && call.method === 'POST')
    .body.tree;
  assert.deepEqual(
    tree.map((entry) => entry.path),
    [file],
  );
  const commit = state.calls.find(
    (call) => call.url.endsWith('/git/commits') && call.method === 'POST',
  ).body;
  assert.deepEqual(commit.parents, [HEAD]);
  assert.match(commit.message, /docs\(attribution\)/);
  const dispatch = state.calls.find((call) => call.url.endsWith('/dispatches')).body;
  assert.deepEqual(dispatch, {
    ref: 'main',
    inputs: { head_sha: NEXT, base_sha: BASE, pr_number: '7' },
  });
  assert.match(state.comments[0].body, /verify and approve|Verify and approve/);
});

test('duplicate commands never create duplicate commits; already synchronized attribution is idempotent', async () => {
  const { service, state } = fixture();
  await service.propose(7);
  await service.apply(7, 'alice', parseCommand('/apply-attribution'));
  assert.equal((await service.apply(7, 'alice', parseCommand('/apply-attribution'))).stale, true);
  assert.equal(
    (await service.apply(7, 'alice', parseCommand('/apply-attribution'))).unchanged,
    true,
  );
  assert.equal(
    state.calls.filter((call) => call.url.endsWith('/git/commits') && call.method === 'POST')
      .length,
    1,
  );
});

test('review attribution requires explicit file selection and only updates selected documents', async () => {
  const docs = [document({ content: metadata }), document({ path: other, content: metadata })];
  const { service, state } = fixture({ docs, reviews: [approval()] });
  await service.propose(7);
  await assert.rejects(
    service.apply(
      7,
      'alice',
      parseCommand('/apply-review-attribution {"reviewer":"bob","files":[]}'),
    ),
    /nonempty/,
  );
  await service.apply(
    7,
    'alice',
    parseCommand(`/apply-review-attribution ${JSON.stringify({ reviewer: 'bob', files: [file] })}`),
  );
  assert.deepEqual(parseMetadata(state.docs[0].content, context.names).reviewers, [
    context.users.get('bob'),
  ]);
  assert.equal(state.docs[1].content, metadata);
});

test('performer cannot receive reviewer attribution even if another PR author opened the PR', async () => {
  const p = pr();
  p.user.login = 'carol';
  const { service } = fixture({
    pr: p,
    docs: [document({ content: metadata })],
    reviews: [approval({ user: { login: 'alice', type: 'User' } })],
  });
  await service.propose(7);
  await assert.rejects(
    service.apply(
      7,
      'carol',
      parseCommand(
        `/apply-review-attribution ${JSON.stringify({ reviewer: 'alice', files: [file] })}`,
      ),
    ),
    /own document/,
  );
});

test('already recorded reviewers do not generate another metadata commit', async () => {
  const { service, state } = fixture({
    docs: [document({ content: metadata.replace('None yet', context.users.get('bob')) })],
    reviews: [approval()],
  });
  await service.propose(7);
  assert.equal(
    (
      await service.apply(
        7,
        'alice',
        parseCommand(
          `/apply-review-attribution ${JSON.stringify({ reviewer: 'bob', files: [file] })}`,
        ),
      )
    ).unchanged,
    true,
  );
  assert.equal(
    state.calls.some((call) => call.url.endsWith('/git/commits') && call.method === 'POST'),
    false,
  );
});

test('concurrent pushes and non-fast-forward responses never dispatch CI or force overwrite', async () => {
  for (const options of [{ ref: NEXT }, { rejectRefUpdate: true }, { rewindDuringApply: true }]) {
    const { service, state } = fixture(options);
    await service.propose(7);
    await assert.rejects(
      service.apply(7, 'alice', parseCommand('/apply-attribution')),
      /head changed|Non-fast-forward|Atomic head/,
    );
    assert.equal(
      state.calls.some((call) => call.url.endsWith('/dispatches')),
      false,
    );
    assert.equal(
      state.calls.some((call) => call.body?.force === true),
      false,
    );
  }
});

test('CI dispatch failure leaves an actionable warning and no claim of successful CI', async () => {
  const { service, state } = fixture({ dispatchFailure: true });
  await service.propose(7);
  await service.apply(7, 'alice', parseCommand('/apply-attribution'));
  assert.equal(state.pr.head.sha, NEXT);
  assert.match(state.comments[0].body, /Do not merge until CI passes/);
});

test('truncated trees and non-regular blobs cannot be applied', async () => {
  const f = fixture({ truncated: true });
  await f.service.propose(7);
  assert.match(f.state.comments[0].body, /Incomplete Git tree/);
  const linked = fixture({ docs: [document({ mode: '120000' })] });
  await linked.service.propose(7);
  await assert.rejects(
    linked.service.apply(7, 'alice', parseCommand('/apply-attribution')),
    /manual correction/,
  );
});

test('approval dismissed during application cannot update the branch', async () => {
  const { service, state } = fixture({
    docs: [document({ content: metadata })],
    reviews: [approval()],
    dismissDuringApply: true,
  });
  await service.propose(7);
  await assert.rejects(
    service.apply(
      7,
      'alice',
      parseCommand(
        `/apply-review-attribution ${JSON.stringify({ reviewer: 'bob', files: [file] })}`,
      ),
    ),
    /Review state changed/,
  );
  assert.equal(state.pr.head.sha, HEAD);
  assert.equal(
    state.calls.some((call) => call.url === '/graphql'),
    false,
  );
});

test('commands parse JSON paths with spaces and reject arbitrary commands/options', () => {
  assert.deepEqual(
    parseCommand(`/apply-review-attribution {"reviewer":"bob","files":["${other}"]}`).options.files,
    [other],
  );
  for (const command of [
    '/apply-attribution; echo bad',
    '/apply-attribution\nother',
    '/apply-attribution {"force":true}',
    '/propose-attribution []',
  ])
    assert.throws(() => parseCommand(command));
});

test('trusted CI reporter attaches success only to the validated current PR head', async () => {
  const calls = [];
  const api = async (url, options) => {
    calls.push({ url, ...options });
    return pr();
  };
  const inputs = { head_sha: HEAD, base_sha: BASE, pr_number: '7' };
  await reportResult(api, repository, inputs, 'success', '123');
  assert.equal(calls[1].body.head_sha, HEAD);
  assert.equal(calls[1].body.conclusion, 'success');
  await reportResult(api, repository, inputs, 'skipped', '123');
  assert.equal(calls.at(-1).body.conclusion, 'failure');
  await assert.rejects(
    reportResult(api, repository, { ...inputs, head_sha: NEXT }, 'success', '123'),
    /PR changed/,
  );
});

test('REST client refuses redirects and never exposes response bodies or token in errors', async () => {
  const api = githubApi('secret', async (url, options) => {
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers.Authorization, 'Bearer secret');
    return { ok: false, status: 403, text: () => 'secret' };
  });
  await assert.rejects(
    api('/repos/team/planner'),
    (error) => /403/.test(error.message) && !error.message.includes('secret'),
  );
});

test('GraphQL errors cannot be mistaken for successful atomic updates', async () => {
  const api = githubApi('secret', async () => ({
    ok: true,
    status: 200,
    json: async () => ({ errors: [{ message: 'rejected' }], data: { updateRefs: null } }),
  }));
  await assert.rejects(
    api('/graphql', { method: 'POST', body: {} }),
    /atomic branch update was rejected/,
  );
});
