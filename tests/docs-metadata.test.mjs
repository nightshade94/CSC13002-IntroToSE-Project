import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, stat, symlink } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { loadContext, parseMetadata, updateDocument, run } from '../scripts/docs-metadata.mjs';
import { fileURLToPath } from 'node:url';

const members = {
  alice: 'Ngô Huỳnh Thắm',
  bob: 'Cao Tiến Thiên',
  carol: 'Dư Hoài Phúc',
  'bob-alt': 'Cao Tiến Thiên',
};
const names = new Set(Object.values(members));
const metadata =
  '**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** None yet · **Edited by:** None';
const file = 'docs/academic/document.md';

async function fixture(t, content = '# Tiêu đề\n\nNội dung.\n') {
  const root = await mkdtemp(path.join(os.tmpdir(), 'docs-metadata-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'config'));
  await mkdir(path.join(root, 'docs/academic'), { recursive: true });
  await writeFile(path.join(root, 'config/members.json'), JSON.stringify(members));
  await writeFile(
    path.join(root, 'config/docs-metadata.json'),
    JSON.stringify({ include: ['docs/academic'], exclude: ['docs/academic/excluded.md'] }),
  );
  await writeFile(path.join(root, file), content);
  return {
    root,
    context: await loadContext(root),
    read: () => readFile(path.join(root, file), 'utf8'),
  };
}

test('init preserves Unicode content and inserts after title; existing attribution is never overwritten', async (t) => {
  const f = await fixture(t);
  await updateDocument(f.context, 'init', file, 'alice');
  assert.equal(await f.read(), `# Tiêu đề\n\n${metadata}\n\nNội dung.\n`);
  await assert.rejects(updateDocument(f.context, 'init', file, 'bob'), /existing attribution/);
});

test('init without title prepends deterministically; fenced titles/examples stay content', async (t) => {
  const content = '```md\n# Example\n' + metadata + '\n```\nNội dung';
  const f = await fixture(t, content);
  await updateDocument(f.context, 'init', file, 'alice');
  assert.equal(await f.read(), `${metadata}\n\n${content}`);
  assert.equal(parseMetadata(await f.read(), names).performer, members.alice);
});

test('CRLF, BOM, title without trailing newline, and surrounding content survive updates', async (t) => {
  for (const content of ['# Title', '# Title\r\n\r\nBody\r\n', '\uFEFFNo title\r\n']) {
    const f = await fixture(t, content);
    await updateDocument(f.context, 'init', file, 'alice');
    const initialized = await f.read();
    await updateDocument(f.context, 'edit', file, 'carol');
    assert.equal(
      await f.read(),
      initialized.replace('**Edited by:** None', `**Edited by:** ${members.carol}`),
    );
    if (content.includes('\r\n'))
      assert.equal((await f.read()).replaceAll('\r\n', '').includes('\n'), false);
  }
});

test('a BOM before a fenced example does not confuse example attribution with the real performer', async (t) => {
  const example = `\uFEFF\`\`\`md\r\n${metadata}\r\n\`\`\`\r\n\r\n`;
  const actual = metadata.replace(members.alice, members.bob);
  const f = await fixture(t, example + actual);
  assert.equal(parseMetadata(await f.read(), names).performer, members.bob);
  await updateDocument(f.context, 'edit', file, 'carol');
  assert.equal(
    await f.read(),
    example + actual.replace('**Edited by:** None', `**Edited by:** ${members.carol}`),
  );

  const fresh = await fixture(t, example);
  await updateDocument(fresh.context, 'init', file, 'carol');
  assert.equal(parseMetadata(await fresh.read(), names).performer, members.carol);
  assert.ok((await fresh.read()).endsWith(example.slice(1)));
});

test('unknown users, missing users, unmanaged/excluded paths and unsupported types are rejected', async (t) => {
  const f = await fixture(t);
  await assert.rejects(updateDocument(f.context, 'init', file, 'unknown'), /Unknown username/);
  await assert.rejects(updateDocument(f.context, 'init', file), /Unknown username/);
  for (const target of [
    'README.md',
    'CONTRIBUTING.md',
    'docs/academic/excluded.md',
    'docs/development/guide.md',
    'other.md',
  ]) {
    await assert.rejects(updateDocument(f.context, 'init', target, 'alice'), /not a configured/);
  }
  await assert.rejects(
    updateDocument(f.context, 'init', 'docs/academic/a.txt', 'alice'),
    /only .md/,
  );
  assert.equal(await f.read(), '# Tiêu đề\n\nNội dung.\n');
});

test('path traversal and absolute paths are refused', async (t) => {
  const f = await fixture(t);
  for (const target of [
    '../outside.md',
    'docs/academic/../../README.md',
    '/tmp/file.md',
    'C:/file.md',
    'docs\\academic\\document.md',
  ]) {
    await assert.rejects(updateDocument(f.context, 'init', target, 'alice'), /Unsafe path/);
  }
});

test('symlink files and symlink directories are refused', async (t) => {
  const f = await fixture(t);
  const link = path.join(f.root, 'docs/academic/link.md');
  try {
    await symlink(path.join(f.root, file), link);
  } catch (error) {
    if (error.code === 'EPERM') {
      t.skip('Creating symlinks requires Windows privilege.');
      return;
    }
    throw error;
  }
  await assert.rejects(
    updateDocument(f.context, 'init', 'docs/academic/link.md', 'alice'),
    /symbolic links/,
  );
  await symlink(
    path.join(f.root, 'docs/academic'),
    path.join(f.root, 'docs/academic/linked'),
    'junction',
  );
  await assert.rejects(
    updateDocument(f.context, 'init', 'docs/academic/linked/document.md', 'alice'),
    /symbolic links/,
  );
});

test('edit preserves performer and reviewers, appends in order and deduplicates mapped identity', async (t) => {
  const existing = metadata.replace('None yet', members.bob);
  const f = await fixture(t, `# Title\n\n${existing}\n\nBody\n`);
  await updateDocument(f.context, 'edit', file, 'bob');
  await updateDocument(f.context, 'edit', file, 'carol');
  const before = await f.read();
  const beforeStat = await stat(path.join(f.root, file));
  assert.equal(await updateDocument(f.context, 'edit', file, 'BOB-alt'), false);
  assert.equal(await f.read(), before);
  assert.equal((await stat(path.join(f.root, file))).mtimeMs, beforeStat.mtimeMs);
  assert.deepEqual(parseMetadata(before, names).editors, [members.bob, members.carol]);
  assert.deepEqual(parseMetadata(before, names).reviewers, [members.bob]);
  assert.equal(parseMetadata(before, names).performer, members.alice);
});

test('review requires confirmation, rejects self-review and unknown users, preserves editors', async (t) => {
  const f = await fixture(
    t,
    metadata.replace('**Edited by:** None', `**Edited by:** ${members.carol}`),
  );
  await assert.rejects(updateDocument(f.context, 'review', file, 'bob'), /--confirm-review/);
  await assert.rejects(updateDocument(f.context, 'review', file, 'alice', true), /own document/);
  await assert.rejects(
    updateDocument(f.context, 'review', file, 'unknown', true),
    /Unknown username/,
  );
  await updateDocument(f.context, 'review', file, 'bob', true);
  await updateDocument(f.context, 'review', file, 'carol', true);
  const before = await f.read();
  assert.equal(await updateDocument(f.context, 'review', file, 'bob-alt', true), false);
  assert.equal(await f.read(), before);
  assert.deepEqual(parseMetadata(before, names).reviewers, [members.bob, members.carol]);
  assert.deepEqual(parseMetadata(before, names).editors, [members.carol]);
});

test('valid initial metadata accepts both sentinel values', () => {
  assert.deepEqual(parseMetadata(metadata, names).editors, []);
  assert.deepEqual(parseMetadata(metadata, names).reviewers, []);
});

test('validation rejects missing/unknown names, malformed delimiters, duplicates and legacy sections', () => {
  for (const content of [
    '# No metadata',
    metadata.replace(members.alice, ''),
    metadata.replace(members.alice, 'Unknown'),
    metadata.replace(' · ', ' | '),
    `${metadata}\n${metadata}`,
    metadata.replace('**Edited by:** None', '**Edited by:** [None]'),
    metadata.replace('None yet', 'None'),
    metadata.replace('None yet', members.alice),
    metadata.replace('None yet', `${members.bob}, ${members.bob}`),
    metadata.replace('**Edited by:** None', `**Edited by:** ${members.bob}, ${members.bob}`),
    metadata.replace('None yet', `${members.bob},${members.carol}`),
    metadata.replace('**Edited by:** None', '**Edited by:** Unknown'),
    metadata.replace('**Performed by:**', '**Performed by**:'),
  ])
    assert.throws(() => parseMetadata(content, names));
});

test('edit and review refuse malformed or multiple attribution without modifying files', async (t) => {
  for (const content of [
    '# No metadata',
    `${metadata}\n${metadata}`,
    metadata.replace('**Edited by:** None', '**Edited by:** [None]'),
  ]) {
    const f = await fixture(t, content);
    for (const command of ['edit', 'review'])
      await assert.rejects(updateDocument(f.context, command, file, 'bob', true));
    assert.equal(await f.read(), content);
  }
});

test('init rejects malformed existing attribution rather than adding another line', async (t) => {
  const content = metadata.replaceAll('by:**', 'by**:');
  const f = await fixture(t, content);
  await assert.rejects(updateDocument(f.context, 'init', file, 'alice'), /existing attribution/);
  assert.equal(await f.read(), content);
});

test('directory junctions are refused for writes and repository scans', async (t) => {
  const f = await fixture(t);
  await symlink(
    path.join(f.root, 'docs/academic'),
    path.join(f.root, 'docs/academic/linked'),
    'junction',
  );
  await assert.rejects(
    updateDocument(f.context, 'init', 'docs/academic/linked/document.md', 'alice'),
    /symbolic links/,
  );
  await assert.rejects(run(['check'], f.root), /symbolic links/);
  await writeFile(
    path.join(f.root, 'config/docs-metadata.json'),
    JSON.stringify({ include: ['docs/academic/linked/nested'], exclude: [] }),
  );
  await assert.rejects(run(['check'], f.root), /symbolic links/);
});

test('check reports failures, scans managed documents only and never writes', async (t) => {
  const f = await fixture(t, metadata);
  await writeFile(path.join(f.root, 'docs/academic/excluded.md'), '# Excluded');
  await writeFile(path.join(f.root, 'README.md'), '# Readme');
  const messages = [];
  assert.equal(await run(['check'], f.root, (value) => messages.push(value)), 0);
  assert.match(messages.at(-1), /Checked 1 academic document/);
  assert.equal(await f.read(), metadata);
  await writeFile(path.join(f.root, file), '# Missing');
  assert.equal(await run(['check', file], f.root, () => {}), 1);
  assert.equal(await f.read(), '# Missing');
  assert.equal(await run(['check', 'README.md'], f.root, () => {}), 1);
});

test('mapping validates empty names and malformed config; empty starter rejects all users', async (t) => {
  const f = await fixture(t);
  for (const mapping of [
    { alice: '' },
    { alice: '  ' },
    { alice: 'Name, Other' },
    { alice: 'Name', ALICE: 'Other' },
    [],
  ]) {
    await writeFile(path.join(f.root, 'config/members.json'), JSON.stringify(mapping));
    await assert.rejects(loadContext(f.root));
  }
  await writeFile(path.join(f.root, 'config/members.json'), '{}');
  await assert.rejects(
    updateDocument(await loadContext(f.root), 'init', file, 'alice'),
    /Unknown username/,
  );
  await writeFile(
    path.join(f.root, 'config/docs-metadata.json'),
    JSON.stringify({ include: ['../outside'], exclude: [] }),
  );
  await assert.rejects(loadContext(f.root), /Unsafe path/);
});

test('help and argument errors are understandable', async (t) => {
  const f = await fixture(t);
  const messages = [];
  assert.equal(await run(['--help'], f.root, (value) => messages.push(value)), 0);
  assert.match(messages[0], /--confirm-review/);
  for (const args of [
    [],
    ['init', file],
    ['check', '--user', 'alice'],
    ['edit', file, '--user'],
    ['check', '--wat'],
    ['check', file, '--changed', 'HEAD'],
    ['init', file, '--user', 'alice', '--user', 'bob'],
  ])
    await assert.rejects(run(args, f.root));
});

test('changed-file check handles spaces, additions, renames, deletion and unrelated files', async (t) => {
  const f = await fixture(t, '# Legacy document awaiting migration');
  const git = (...args) => execFileSync('git', args, { cwd: f.root, encoding: 'utf8' });
  git('init', '--quiet');
  git('config', 'user.email', 'fixture@example.invalid');
  git('config', 'user.name', 'Test fixture');
  git('config', 'commit.gpgsign', 'false');
  git('add', '.');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-m', 'fixture');
  const base = git('rev-parse', 'HEAD').trim();
  await writeFile(path.join(f.root, 'README.md'), '# General documentation');
  git('add', '.');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-m', 'general docs');
  assert.equal(await run(['check', '--changed', base], f.root, () => {}), 0);
  await writeFile(path.join(f.root, 'docs/academic/with spaces.md'), '# Missing attribution');
  git('add', '.');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-m', 'new academic document');
  assert.equal(await run(['check', '--changed', base], f.root, () => {}), 1);
  // Exercise the real entry point and exit status, using the isolated repository.
  await mkdir(path.join(f.root, 'scripts'));
  await writeFile(
    path.join(f.root, 'scripts/docs-metadata.mjs'),
    await readFile(fileURLToPath(new URL('../scripts/docs-metadata.mjs', import.meta.url))),
  );
  assert.throws(
    () =>
      execFileSync(process.execPath, ['scripts/docs-metadata.mjs', 'check', '--changed', base], {
        cwd: f.root,
        stdio: 'pipe',
      }),
    (error) =>
      error.status === 1 &&
      /with spaces\.md: Expected exactly one attribution line/.test(error.stdout.toString()),
  );
  await writeFile(path.join(f.root, 'docs/academic/with spaces.md'), metadata);
  git('add', 'docs/academic/with spaces.md');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-m', 'add attribution');
  assert.equal(await run(['check', '--changed', base], f.root, () => {}), 0);
  git('mv', file, 'docs/academic/renamed.md');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-am', 'rename legacy');
  assert.equal(await run(['check', '--changed', base], f.root, () => {}), 1);
  git('rm', '--quiet', 'docs/academic/renamed.md');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-m', 'delete legacy');
  assert.equal(await run(['check', '--changed', base], f.root, () => {}), 0);
});

test('CI merge-base comparison excludes base-only legacy edits for an unmerged bot head', async (t) => {
  const f = await fixture(t, '# Legacy document');
  const git = (...args) => execFileSync('git', args, { cwd: f.root, encoding: 'utf8' });
  git('init', '--quiet', '--initial-branch=main');
  git('config', 'user.email', 'fixture@example.invalid');
  git('config', 'user.name', 'Test fixture');
  git('config', 'commit.gpgsign', 'false');
  git('add', '.');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-m', 'fixture');
  const common = git('rev-parse', 'HEAD').trim();
  await writeFile(path.join(f.root, file), '# Legacy edited only on main');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-am', 'base-only edit');
  const base = git('rev-parse', 'HEAD').trim();
  git('checkout', '--quiet', '-b', 'docs/SFP-25-test', common);
  await writeFile(path.join(f.root, 'docs/academic/new.md'), metadata);
  git('add', '.');
  git('-c', 'core.hooksPath=/dev/null', 'commit', '--quiet', '-m', 'PR document');
  assert.equal(await run(['check', '--changed', base], f.root, () => {}), 1);
  const comparisonBase = git('merge-base', base, 'HEAD').trim();
  assert.equal(await run(['check', '--changed', comparisonBase], f.root, () => {}), 0);
});
