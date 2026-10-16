---
tools:
  [
    'read',
    'search',
    'edit',
    'execute',
    'web',
    'github-semantic-search-server/*',
    'context7/*',
    'serena/*',
    'oraios/serena/*',
    'todo',
    'agent/runSubagent',
    'gitkraken/git_status',
    'gitkraken/git_log_or_diff',
  ]
description: Wrapper prompt — generate dependency-ordered tasks.md using Implementer (TS Web Stack) workflow (NextJS + Node/NestJS + Prisma + Zod). Allowed to call subagents and skills.
---

## User Input

```text
$ARGUMENTS
```

## Primary instruction

Use **Implementer (TS Web Stack)** to:

1. Analyze the request.
2. During **planning**, call any relevant **subagents/skills** and then ask the user targeted
   **clarifying questions** if requirements are ambiguous.
   - If clarifying questions are needed: **STOP after the questions** (do not proceed to edits).
3. If requirements are clear: propose a dependency-ordered plan (with impacted file list).
4. Output a complete `.copilot_temp/tasks.md` (explicit dependencies + verification checklist).

## Execution permissions (when you move from plan → implement)

After you have a **complete plan + tasks + TODOs** (and there are **no open questions**), you may proceed to
CRUD files/folders in the workspace and run local demo/deploy scripts **without additional user confirmation**.

However, if a command is **sensitive** (external publish/deploy, uses credentials, destructive/hard-to-revert,
system-level changes), you must ask the user to confirm before executing.

You are allowed to automatically stage all changes incrementally as you work by `git add <paths>`

## Assistance allowed (subagents + skills)

You are allowed (and encouraged when helpful) to call:

- **Subagents** via **#runSubagent** (e.g., “Git Commit Message Agent”, "context7", "Expert React Frontend Engineer", "Expert Next.js Engineer", ... or any repo-defined subagent for testing, refactor, docs, etc.).
- **Skills** (repo-defined skill prompts/instructions) for specialized work like:
  - reading diffs / review checklist
  - generating API route skeletons (NestJS + Zod)
  - Prisma schema/query patterns
  - component patterns (NextJS, TS, MUI)
  - test scaffolding (Jest/Supertest)
    When a relevant skill exists, prefer invoking it rather than reinventing a process.

## Completion behavior (after work is done)

When ALL tasks are complete and Phase 2 verification passes:

- Use **#runSubagent** with **Git Commit Message Agent** to draft a commit message from **staged** changes.
- Include the proposed commit message (header + detailed description body from **Git Commit Message Agent**) inside the numbered completion report in `docs/reports`.

## Extra constraints

Treat `$ARGUMENTS` as constraints (module boundaries, preferred patterns, folder scopes, naming, etc.).
Do not define user-defined `interface`/`type` aliases; derive TypeScript types from Zod schemas via `z.infer`.
