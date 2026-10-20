import { readFile, writeFile, readdir, realpath, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const labels = /(?:Performed|Reviewed|Edited)\s+by\b/i;
const canonical =
  /^\*\*Performed by:\*\* (.+) · \*\*Reviewed by:\*\* (.+) · \*\*Edited by:\*\* (.+)$/;

export const help = `Academic documentation attribution

Run from the repository root; paths are repository-relative:
  pnpm docs:meta init <file.md> --user <github-username>
  pnpm docs:meta edit <file.md> --user <github-username>
  pnpm docs:meta review <file.md> --user <github-username> --confirm-review
  pnpm docs:meta check [file.md ...]
  pnpm docs:meta check --changed <base-commit>
  pnpm docs:meta --help

First confirm the GitHub username -> full name mapping in config/members.json.
init inserts after the first H1 title, or at the start when no H1 exists.
edit/review append names once, preserving the performer and other fields.
--confirm-review declares a completed human review; no GitHub approval is verified.
check is read-only. --changed checks managed files changed since a base commit.
Legacy section attribution must be reconciled manually before using this tool.
`;

function fail(message) {
  throw new Error(message);
}

export function safeRelative(value) {
  if (
    typeof value !== 'string' ||
    !value ||
    value.includes('\\') ||
    value.includes(':') ||
    /[\x00-\x1f]/.test(value) ||
    path.posix.isAbsolute(value) ||
    value.split('/').some((part) => !part || part === '.' || part === '..')
  ) {
    fail(
      `Unsafe path: ${JSON.stringify(value)}. Use a repository-relative path with / separators.`,
    );
  }
  return value;
}

function within(root, target) {
  const relative = path.relative(root, target);
  return (
    relative === '' ||
    (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
  );
}

function matches(file, entry) {
  return file === entry || file.startsWith(`${entry}/`);
}

export async function loadContext(root = repositoryRoot) {
  root = await realpath(root);
  const config = JSON.parse(await readFile(path.join(root, 'config/docs-metadata.json'), 'utf8'));
  if (!config || Array.isArray(config) || typeof config !== 'object') {
    fail('config/docs-metadata.json must be an object with include and exclude arrays.');
  }
  for (const key of ['include', 'exclude']) {
    if (!Array.isArray(config[key]) || config[key].some((entry) => typeof entry !== 'string')) {
      fail(`config/docs-metadata.json: ${key} must be an array of relative files/directories.`);
    }
    for (const entry of config[key]) {
      safeRelative(entry);
      if (/[*?\[\]{}]/.test(entry)) fail('Use explicit files/directories, not glob patterns.');
    }
  }
  const members = JSON.parse(await readFile(path.join(root, 'config/members.json'), 'utf8'));
  if (!members || Array.isArray(members) || typeof members !== 'object') {
    fail('config/members.json must be an object mapping GitHub usernames to confirmed full names.');
  }
  const users = new Map();
  const names = new Set();
  for (const [username, name] of Object.entries(members)) {
    if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username) || username.includes('--')) {
      fail(`Invalid GitHub username in config/members.json: ${username}`);
    }
    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name !== name.trim() ||
      /[,·*\[\]\x00-\x1f\x7f]/.test(name) ||
      ['None', 'None yet'].includes(name)
    ) {
      fail(`Invalid full name for ${username}; use a nonempty name without metadata delimiters.`);
    }
    const key = username.toLowerCase();
    if (users.has(key)) fail(`Duplicate GitHub username: ${username}`);
    users.set(key, name);
    // Multiple usernames with the exact same agreed name share one attribution identity.
    names.add(name);
  }
  return { root, config, users, names };
}

export function isManaged(context, file) {
  return (
    file.endsWith('.md') &&
    !['README.md', 'CONTRIBUTING.md'].includes(file) &&
    !matches(file, 'docs/development') &&
    context.config.include.some((entry) => matches(file, entry)) &&
    !context.config.exclude.some((entry) => matches(file, entry))
  );
}

async function safeTarget(context, file) {
  safeRelative(file);
  const target = path.resolve(context.root, file);
  if (!within(context.root, target)) fail(`${file}: path is outside the repository.`);
  // Refuse symlinks/junctions in every component, including links pointing inside the repo.
  let current = context.root;
  for (const part of file.split('/')) {
    current = path.join(current, part);
    if ((await lstat(current)).isSymbolicLink()) fail(`${file}: symbolic links are not supported.`);
  }
  if (!within(context.root, await realpath(target))) fail(`${file}: resolved outside repository.`);
  return target;
}

async function documentPath(context, file) {
  safeRelative(file);
  if (!file.endsWith('.md')) fail(`${file}: only .md files are supported.`);
  if (!isManaged(context, file)) fail(`${file}: not a configured academic document.`);
  const target = await safeTarget(context, file);
  if (!(await lstat(target)).isFile()) fail(`${file}: expected a regular file.`);
  return target;
}

export function attributionLines(content) {
  // Fenced examples are content, not attribution. Other attribution-like lines are
  // deliberately rejected rather than guessing whether old section metadata is valid.
  let fence;
  return content.split(/\r?\n/).flatMap((line, index) => {
    const marker = /^(?:\uFEFF)? {0,3}(`{3,}|~{3,})/.exec(line);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length &&
        /^ {0,3}(?:`+|~+)\s*$/.test(line)
      )
        fence = undefined;
      return [];
    }
    return !fence && labels.test(line) ? [{ line, index }] : [];
  });
}

export function parseMetadata(content, names) {
  const lines = attributionLines(content);
  if (lines.length !== 1) {
    fail(
      `Expected exactly one attribution line; found ${lines.length}. Initialize missing metadata or manually reconcile legacy section attribution.`,
    );
  }
  const match = canonical.exec(lines[0].line.replace(/^\uFEFF/, ''));
  if (!match)
    fail(
      'Malformed attribution. Expected: **Performed by:** Name · **Reviewed by:** None yet · **Edited by:** None',
    );
  const [, performer, reviewed, edited] = match;
  if (!names.has(performer))
    fail(`Unknown or missing performer: ${performer}. Confirm config/members.json.`);
  function list(value, sentinel, field) {
    if (value === sentinel) return [];
    const entries = value.split(', ');
    if (new Set(entries).size !== entries.length) fail(`${field}: duplicate names.`);
    for (const name of entries) {
      if (!names.has(name))
        fail(
          `${field}: unknown name or malformed delimiter: ${name}. Use exact mapped names separated by comma + space.`,
        );
    }
    return entries;
  }
  const reviewers = list(reviewed, 'None yet', 'Reviewed by');
  const editors = list(edited, 'None', 'Edited by');
  if (reviewers.includes(performer)) fail('Performed by cannot review their own document.');
  return { performer, reviewers, editors, ...lines[0] };
}

function formatMetadata({ performer, reviewers, editors }) {
  return `**Performed by:** ${performer} · **Reviewed by:** ${reviewers.join(', ') || 'None yet'} · **Edited by:** ${editors.join(', ') || 'None'}`;
}

export async function updateDocument(context, command, file, username, confirmReview = false) {
  const target = await documentPath(context, file);
  const content = await readFile(target, 'utf8');
  const next = transformDocument(context, command, content, username, confirmReview);
  if (next === content) return false;
  await writeFile(target, next, 'utf8');
  return true;
}

// Shared by the local CLI and trusted PR automation; this function never writes files.
export function transformDocument(context, command, content, username, confirmReview = false) {
  const name = context.users.get(username?.toLowerCase());
  if (!name)
    fail(
      `Unknown username: ${username || '(missing)'}. Supply --user and confirm config/members.json.`,
    );
  if (!['init', 'edit', 'review'].includes(command)) fail(`Unknown write command: ${command}`);
  if (command === 'review' && !confirmReview)
    fail('Review requires --confirm-review after the human review has actually occurred.');
  let next;
  if (command === 'init') {
    if (attributionLines(content).length)
      fail('existing attribution detected; refusing to overwrite it.');
    const eol = content.includes('\r\n') ? '\r\n' : '\n';
    const metadata = formatMetadata({ performer: name, reviewers: [], editors: [] });
    // Match a real H1 outside fenced examples, preserving every existing byte.
    let fence;
    let offset = 0;
    let insertion;
    for (const line of content.split(/(?<=\n)/)) {
      const marker = /^(?:\uFEFF)? {0,3}(`{3,}|~{3,})/.exec(line);
      if (marker) {
        if (!fence) fence = marker[1];
        else if (
          marker[1][0] === fence[0] &&
          marker[1].length >= fence.length &&
          /^ {0,3}(?:`+|~+)\s*$/.test(line)
        )
          fence = undefined;
      } else if (!fence && /^(?:\uFEFF)? {0,3}#\s+\S/.test(line)) {
        insertion = offset + line.length;
        break;
      }
      offset += line.length;
    }
    if (insertion === undefined) {
      const bom = content.startsWith('\uFEFF') ? 1 : 0;
      next = `${content.slice(0, bom)}${metadata}${eol}${eol}${content.slice(bom)}`;
    } else {
      const prefix = content.slice(0, insertion);
      const suffix = content.slice(insertion);
      next = `${prefix}${prefix.endsWith('\n') ? '' : eol}${eol}${metadata}${eol}${suffix.startsWith(eol) ? '' : eol}${suffix}`;
    }
  } else {
    const metadata = parseMetadata(content, context.names);
    if (command === 'review' && metadata.performer === name)
      fail('Performed by cannot review their own document.');
    const entries = command === 'edit' ? metadata.editors : metadata.reviewers;
    if (entries.includes(name)) return content;
    entries.push(name);
    // Replace exactly the validated line, keeping surrounding content and line endings.
    const lines = content.split(/(?<=\n)/);
    const original = lines[metadata.index];
    lines[metadata.index] =
      (original.startsWith('\uFEFF') ? '\uFEFF' : '') +
      formatMetadata(metadata) +
      (original.endsWith('\r\n') ? '\r\n' : original.endsWith('\n') ? '\n' : '');
    next = lines.join('');
  }
  return next;
}

async function allDocuments(context) {
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(path.join(context.root, directory), {
      withFileTypes: true,
    })) {
      const file = `${directory}/${entry.name}`;
      if (
        context.config.exclude.some((excluded) => matches(file, excluded)) ||
        matches(file, 'docs/development')
      )
        continue;
      if (entry.isSymbolicLink()) fail(`${file}: symbolic links are not supported.`);
      if (entry.isDirectory()) await walk(file);
      else if (isManaged(context, file)) files.push(file);
    }
  }
  for (const entry of context.config.include) {
    if (
      context.config.exclude.some((excluded) => matches(entry, excluded)) ||
      matches(entry, 'docs/development')
    )
      continue;
    let stat;
    try {
      stat = await lstat(await safeTarget(context, entry));
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    if (stat.isSymbolicLink()) fail(`${entry}: symbolic links are not supported.`);
    if (stat.isDirectory()) await walk(entry);
    else if (isManaged(context, entry)) files.push(entry);
  }
  return [...new Set(files)].sort();
}

function changedDocuments(context, base) {
  // No shell and no interpolated workflow expressions; NUL delimiters support spaces.
  const commit = execFileSync(
    'git',
    ['rev-parse', '--verify', '--end-of-options', `${base}^{commit}`],
    { cwd: context.root, encoding: 'utf8' },
  ).trim();
  return execFileSync(
    'git',
    ['diff', '--name-only', '-z', '--diff-filter=ACMRT', commit, 'HEAD', '--'],
    { cwd: context.root, encoding: 'utf8' },
  )
    .split('\0')
    .filter((file) => file && isManaged(context, file));
}

export async function run(args, root = repositoryRoot, log = console.log) {
  if (args.length === 1 && ['--help', '-h'].includes(args[0])) {
    log(help);
    return 0;
  }
  const [command, ...rest] = args;
  if (!['init', 'edit', 'review', 'check'].includes(command))
    fail('Choose init, edit, review or check. Run pnpm docs:meta --help.');
  const files = [];
  const options = new Map();
  for (let index = 0; index < rest.length; index++) {
    const value = rest[index];
    if (!value.startsWith('--')) {
      files.push(value);
      continue;
    }
    if (!['--user', '--confirm-review', '--changed'].includes(value) || options.has(value))
      fail(`Unknown or duplicate option: ${value}`);
    if (value === '--confirm-review') options.set(value, true);
    else {
      const argument = rest[++index];
      if (!argument || argument.startsWith('--')) fail(`${value} requires a value.`);
      options.set(value, argument);
    }
  }
  if (command === 'check') {
    if (
      options.has('--user') ||
      options.has('--confirm-review') ||
      (files.length && options.has('--changed'))
    )
      fail('check accepts file paths OR --changed <base-commit>.');
  } else {
    if (
      files.length !== 1 ||
      !options.has('--user') ||
      options.has('--changed') ||
      (command !== 'review' && options.has('--confirm-review'))
    )
      fail(`${command} requires one file and --user; only review accepts --confirm-review.`);
  }
  const context = await loadContext(root);
  if (command !== 'check') {
    const changed = await updateDocument(
      context,
      command,
      files[0],
      options.get('--user'),
      options.has('--confirm-review'),
    );
    log(`${files[0]}: ${changed ? 'attribution updated' : 'already recorded; unchanged'}.`);
    return 0;
  }
  const selected = files.length
    ? files
    : options.has('--changed')
      ? changedDocuments(context, options.get('--changed'))
      : await allDocuments(context);
  let errors = 0;
  for (const file of selected) {
    try {
      const target = await documentPath(context, file);
      parseMetadata(await readFile(target, 'utf8'), context.names);
    } catch (error) {
      log(`${file}: ${error.message}`);
      errors++;
    }
  }
  log(`Checked ${selected.length} academic document(s); ${errors} error(s).`);
  if (!context.users.size)
    log(
      'Member mapping is empty. The team must confirm config/members.json before attribution can be used.',
    );
  return errors ? 1 : 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = await run(process.argv.slice(2));
  } catch (error) {
    console.error(`docs:meta: ${error.message}`);
    process.exitCode = 1;
  }
}
