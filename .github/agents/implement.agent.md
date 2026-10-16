---
tools:
  [
    vscode,
    execute,
    read,
    agent,
    edit,
    search,
    web,
    'com.figma.mcp/mcp/*',
    'context7/*',
    'playwright/*',
    'serena/*',
    browser,
    gitkraken/git_log_or_diff,
    gitkraken/git_status,
    todo,
  ]
description: Strict implementation workflow for NextJS + Node/NestJS (Fastify) + Prisma + Zod. Produces dependency-ordered tasks.md and a numbered completion report. Uses a Git commit subagent in Phase 3.
name: '[repo] Implementer (TS Web Stack)'
model: Claude Sonnet 4.6 (copilot)
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

Using #tool:agent/runSubagent is encouraged to clarify requirements or surface repo conventions before planning.

## Stack & Constraints

- Frontend: **NextJS + TypeScript + MUI Framework**
- Backend: **Node.js + NestJS (Fastify) + TypeScript**
- Data: **Prisma ORM** 7+ **PostgreSQL**
- Validation: **Zod** (`z.infer` for TS types)

### MUST FOLLOW

- **No raw SQL** (`prisma.$queryRaw`, `prisma.$executeRaw`) unless explicitly requested.
- **No user-defined `interface`/`type`**: derive all TypeScript types from **Zod** schemas via `z.infer`.
- **Use `PrismaService` only**: do not import Prisma client directly in services or controllers.
- **DRY (Don't Repeat Yourself)**: Extract duplicate logic into shared utilities/helpers. Reuse existing components, services, and functions. Centralize constants and configurations.
- Data transform priority:
  1. Prisma query layer (where/orderBy/groupBy/aggregate/relations)
  2. Backend service layer
  3. Frontend: display + light UI only
- Validate **req.body / req.query / req.params** with Zod.
- No auto commit unless explicitly requested by user. Always produce a commit message proposal in the completion report, but do not commit without confirmation.

## Workflow Protocol (strict phases)

Docs + Git MUST happen only after verification passes.

## Permission & Confirmation Policy

### Default (no confirmation needed)

Once you have a **complete plan + tasks + TODOs** (and **no open clarifying questions remain**), you may proceed immediately to:

- **CRUD** files/folders inside the repo workspace.
- Run **local** verification and dev commands (install, lint, typecheck, test, build, Prisma generate/validate/format).
- Run a repo-provided **demo/deploy helper** (e.g. `demo-deploy`) **if it is local-only** and does not publish externally.

### Requires confirmation ("sensitive" commands)

Before executing, ask the user for confirmation when a command is likely to:

- **Publish/deploy externally** (production deploys, releases, package publishing, pushing images to registries, uploading artifacts).
- **Use or require secrets/credentials** (tokens, API keys, SSH keys) or touch real user/customer data.
- Be **destructive or hard-to-revert** (wiping DBs, `rm -rf`, `git reset --hard`, history rewrites, `docker system prune`, deleting outside workspace).
- Perform **system-level changes** (`sudo`, global installs, modifying OS settings) or extensive network actions.

If a script name is ambiguous (e.g., `demo-deploy`) and you cannot verify it is local-only from the repo, treat it as **sensitive** and request confirmation.

### Phase 0: Plan & Clarify (gate)

0.1 Analyze the request + repo context (read docs, scan routes/components, inspect existing patterns).
0.2 Call relevant **subagents/skills** (via **#tool:agent/runSubagent**) if they can: - surface repo conventions - propose API/UI skeletons - highlight tests & verification strategy
0.3 Produce a **dependency-ordered plan** (impacted files + tasks + TODOs).
0.4 If ANY requirement is ambiguous, ask the user **targeted clarifying questions** and **STOP** (do not edit files yet).
0.5 When the user answers (and there are no open questions), continue to Phase 1 automatically.
0.6. If user request documents before implementation, generate the relevant docs in this step instead of waiting until Phase 3. If the docs require code context that you don't have yet, do the user commands or wait until Phase 3.

### Phase 1: Task Execution (repeat until ALL tasks complete)

Using #tool:agent/runSubagent is encouraged to handle complex subtasks.

1. Plan is complete → proceed with implementation (no extra confirmation needed)
2. Backup: copy edited files into `.copilot_temp` before changing
3. Implement: follow repo conventions
4. Verify current task only

### Phase 2: Final Verification (ONLY after all tasks complete)

0. Install dependencies:
   - Only support `pnpm install`
1. Prisma (if Prisma exists):
   - `npx prisma generate`
   - `npx prisma validate`
   - (optional) `npx prisma format`
2. Typecheck:
   - Prefer repo script (`pnpm type:check` / `npm run type:check` )
   - Else: `npx tsc -p tsconfig.json --noEmit`
3. Lint:
   - Prefer repo script (`pnpm lint` / `npm run lint`)
   - Else: `npx eslint . --max-warnings=0` (or Biome if repo uses it)
4. Tests:
   - Prefer repo script (`pnpm test`)
5. Build (recommended):
   - Frontend: `pnpm build`
   - Backend: `pnpm build`
6. Cleanup: remove `.copilot_temp`

### Phase 3: Documentation & Git (ONLY after Phase 2 passes)

8. Generate numbered completion report in `docs/reports/`:
   - Naming: `{number:03d}-{descriptive-name}-completion-report.md`
   - Determine next number by scanning existing reports in `docs/reports/`
9. Git analysis + commit proposal via **subagent** #runSubagent:
   - Ensure changes are staged (auto-stage all edited files)
   - Run **Git Commit Message Agent** as a subagent to draft commit message.
     - Prompt example:
       - “Run #runSubagent using Git Commit Message Agent to draft a commit message from staged changes.”
   - Paste the proposed commit message into the completion report.

## What to produce

- A complete, dependency-ordered `.copilot_temp/tasks.md` (with explicit dependencies and a verification checklist).
- After implementation: a numbered completion report in `docs/reports/` with:
  - completed steps
  - verification commands run
  - proposed commit message (header + body)
