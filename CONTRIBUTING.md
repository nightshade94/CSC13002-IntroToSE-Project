# Contribution Guidelines

This document provides guidelines for team members to follow a consistent collaboration workflow.

The team uses:

- **Jira:** Task management, assignment, and progress tracking.
- **GitHub:** Source code management, branches, Pull Requests, and Code Reviews.
- **GitHub Actions:** Automated checks when Pull Requests are created or updated.

The goal is to maintain a clear, straightforward workflow suitable for a team new to Software Engineering.

## 1. Getting Started

1. Install the required tools by following the instructions in the [README](README.md).
2. Run `pnpm install` to install dependencies.
3. Run `pnpm format:check` to verify formatting.
4. Open the team's Jira Project to view available tasks.
5. Select or take ownership of a Jira Issue with clearly defined requirements and acceptance criteria.

Each Jira Issue should include:

- **Summary:** A concise task title.
- **Description:** A description of the objectives and scope.
- **Issue Type:** Story, Task, or Bug.
- **Priority:** The task's priority level.
- **Assignee:** One person primarily responsible for the task.
- **Acceptance Criteria:** Conditions that must be met for the task to be considered complete.

Multiple team members may collaborate on a task, but one person should remain primarily responsible for tracking its progress.

Before making significant changes to the architecture, APIs, or technology stack, discuss them in the relevant Jira Issue or with the team.

## 2. Jira Workflow

The team uses a Jira Kanban Board with the following statuses:

```text
Backlog → Ready → In Progress → In Review → Done
```

| Status      | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| Backlog     | Tasks have been recorded but are not yet ready for development |
| Ready       | Requirements are clear, and work can begin                     |
| In Progress | A team member is actively working on the task                  |
| In Review   | Implementation is complete, and the PR is awaiting review      |
| Done        | The PR has been merged, and the Acceptance Criteria are met    |

### Jira Issue Workflow

1. Select an Issue with the `Ready` status.
2. Assign an Assignee and move the Issue to `In Progress`.
3. Create a Git branch associated with the Jira Issue Key.
4. Implement the changes and commit the code.
5. Open a Pull Request on GitHub.
6. Move the Issue to `In Review` when the PR is ready for review.
7. Once the PR is approved, CI checks have passed, and the PR has been merged, move the Jira Issue to `Done`.

If Jira is integrated with GitHub, branch, commit, and PR information may appear in the Development section of the Jira Issue.

Automatic Jira status transitions after merging only work if the team has configured the corresponding automation. Otherwise, the Assignee must update the status manually.

## 3. Branches and Commits

### Branch Naming

Create branches from the latest `main` branch.

Use the following naming convention:

```text
<type>/<JIRA-KEY>-<description>
```

For example, with `SFP` as the Jira Project Key:

```text
feat/SFP-12-fridge-inventory
fix/SFP-18-expiry-validation
docs/SFP-25-update-readme
chore/SFP-40-update-dependencies
```

Conventions:

- Use lowercase for `type`: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, or `ci`.
- Preserve the Jira Issue Key format, such as `SFP-12`.
- Use lowercase kebab-case for the description.
- Each branch should focus on one primary Jira Issue.
- Do not push code directly to `main`.

### Commit Convention

Use **Conventional Commits with a scope**:

```text
<type>(<scope>): <description>
```

Examples:

```text
feat(web): add fridge inventory page SFP-12
feat(api): implement ingredient endpoint SFP-15
fix(api): handle invalid expiry date SFP-18
docs(repo): update contribution guide SFP-25
chore(deps): update prettier SFP-40
```

Suggested scopes:

| Scope    | Area                     |
| -------- | ------------------------ |
| `web`    | Frontend                 |
| `api`    | Backend                  |
| `shared` | Shared code              |
| `repo`   | Repository configuration |
| `deps`   | Dependencies             |
| `ci`     | CI workflows             |

Each commit should focus on a single meaningful change.

The team does not currently enforce automated validation of branch names or commit messages.

For more details, see [Git Workflow](docs/development/git-workflow.md).

## 4. Pull Requests and Code Reviews

Once the work is complete, open a Pull Request targeting the `main` branch.

### PR Title

Use Conventional Commits and include the Jira Issue Key:

```text
feat(web): implement fridge inventory page [SFP-12]
```

### PR Description

Use the Pull Request Template provided in the repository.

Each PR should include:

- The objective and a summary of the main changes.
- The related Jira Issue, such as `SFP-12`, including a link to the Jira Issue.
- Instructions for testing or verifying the changes.
- Screenshots for user interface changes.
- Any areas requiring special attention from reviewers.

**Note:** Do not use `Closes #12` to link a Jira Issue. This syntax is intended for GitHub Issues.

Including the Jira Issue Key in branch names, commit messages, and PRs helps establish links with Jira when the GitHub integration is configured.

### Before Requesting a Review

- Review your changes using `git diff`.
- Avoid including unrelated changes in the PR.
- Do not commit credentials, API keys, or secrets.
- Run `pnpm format:check`.
- If formatting changes are needed, run `pnpm format` and review the diff again.
- Once the applications have been initialized, also run lint, typecheck, test, and build commands according to the actual configuration.
- Add or update tests when modifying business logic, API behavior, or fixing bugs.

Documentation-only PRs do not require new tests.

You may open a **Draft Pull Request** to receive early feedback. Mark it as `Ready for review` only when the changes are ready to be evaluated.

### Code Review

Regular PRs should receive at least **1 approval from another team member**.

Significant changes should receive **2 approvals whenever feasible**, including changes involving:

- Authentication and Authorization.
- Database schema.
- Shared API contracts.
- CI configuration.
- Security-sensitive changes.

Reviewers should focus on:

- Functional correctness.
- Compliance with Acceptance Criteria.
- Code readability and maintainability.
- Error handling and input validation.
- Test quality.
- Consistency with the current architecture.

Provide clear and respectful feedback, distinguishing issues that must be fixed from optional improvement suggestions.

## 5. Merging and Completing Tasks

The PR author may perform a **Squash and merge** when:

- The PR has been reviewed according to team guidelines.
- All required CI checks have passed.
- All review conversations requiring resolution have been addressed.
- No significant unresolved issues remain.

The Squash Commit message should follow Conventional Commits and include the Jira Issue Key.

After merging:

1. Delete the feature branch on GitHub.
2. Check the Jira Issue and its associated PR.
3. Confirm that all Acceptance Criteria have been met.
4. Move the Jira Issue to `Done` if no automation is configured.
5. Update any relevant documentation if necessary.

Do not push directly to `main`.

Branch Protection and Merge Strategy settings are managed by maintainers according to the [GitHub Setup Guide](docs/development/github-setup.md).

## 6. Complete Workflow Example

Suppose the team needs to implement the food inventory interface.

**Step 1 — Jira**

Create or take ownership of the following Issue:

```text
SFP-12: Implement fridge inventory page
```

Move the Issue to `In Progress`.

**Step 2 — Git**

```bash
git switch main
git pull origin main
git switch -c feat/SFP-12-fridge-inventory
```

**Step 3 — Development**

Implement the feature, perform the necessary checks, and commit the changes:

```bash
git add .
git commit -m "feat(web): add fridge inventory page SFP-12"
git push -u origin feat/SFP-12-fridge-inventory
```

**Step 4 — Pull Request**

Open a PR with the following title:

```text
feat(web): implement fridge inventory page [SFP-12]
```

Include a link to the Jira Issue in the PR description.

Move the Issue to `In Review` when the PR is ready for review.

**Step 5 — Review & Merge**

Once the PR has received the required approvals and CI checks have passed, perform a Squash Merge.

**Step 6 — Jira**

Verify that the implementation meets the Acceptance Criteria and move the Issue to `Done`.

---

## Academic Documentation Attribution

### Scope and member setup

The metadata helper manages `.md` files recursively under the directories listed in
[`config/docs-metadata.json`](config/docs-metadata.json): `docs/analysis-and-design/`,
`docs/discussion/`, `docs/management/`, and future `docs/requirements/` and
`docs/architecture/` directories. These last two directories need not exist yet.
Configuration entries are explicit repository-relative files or directories, without
glob patterns. Directory entries include all descendants; exclusions take precedence.
`README.md`, `CONTRIBUTING.md`, and `docs/development/` are always excluded.

Before using the CLI, the team must confirm each GitHub username and agreed full name
in [`config/members.json`](config/members.json). The file currently contains five
account/name entries; each member must confirm their own entry and consent to publication
before use. The helper does not verify these associations. For example, the following
is an illustration only, **not a verified member identity**:

```json
{
  "example-account": "Tên đầy đủ đã được thành viên xác nhận"
}
```

Replace the example with actual confirmed accounts, preserving the exact Vietnamese
spelling and diacritics. Publish only names members agree to share. Never infer a name
from an email, Git configuration, or commit history. Unknown usernames and empty names
are rejected. Usernames are case-insensitive; names retain their exact spelling.
If two mapped usernames share the exact same full name, the helper treats them as one
attribution identity; resolve genuine name collisions with an agreed distinguishable
published name. This mapping is a team convention, not identity verification.

### PR-driven attribution (normal workflow)

Once the workflows and scripts are merged into the default branch, opening, updating,
or reopening a PR targeting `main` creates or updates one **Document Attribution Proposal**
bot comment. It uses the member mapping and managed paths from the **default branch**,
not configuration supplied by the PR. Confirm the five mapping entries before rollout;
merge mapping/scope changes separately before relying on them in another PR.

The bot proposes the mapped PR author as performer for a new document without metadata,
or as an editor for an existing valid document. Existing valid performers are never
overwritten. Existing reviewers/editors are preserved, including the history in the PR
base. Missing, malformed, repeated, or conflicting legacy attribution requires manual
correction; the eight-document migration inventory below still applies.

Inspect the paths and names in the bot comment. A human collaborator with actual
repository **write**, **maintain**, or **admin** permission can post this exact command
as a normal PR conversation comment:

```text
/apply-attribution
```

The bot rechecks permissions, head SHA, base SHA, current reviews, mapping and proposal
contents. A missing/stale proposal is refreshed without writing: inspect it and send
a new command. Only same-repository PR branches are writable. The bot never writes to
`main`, the default branch or the PR base branch. One fast-forward-only bot commit changes
only confirmed attribution lines. The final reference update compares the old SHA
atomically using GitHub's `updateRefs` API with `beforeOid` and `force: false`, so a
concurrent push or rewind is rejected. Repeated confirmations do not append duplicate names
or create redundant commits. Review the diff before final approval.

To refresh a proposal, or correct the proposed creator/editor before applying it:

```text
/propose-attribution
/propose-attribution {"users":{"docs/analysis-and-design/new-design.md":"actual-mapped-user"}}
```

The correction command only proposes a mapped user on an affected document; inspect
the updated bot comment, then post `/apply-attribution`. For new documents this corrects
the default creator before initialization. For existing documents it changes the proposed
editor and preserves the performer. Correct an already recorded inaccurate performer or
other historical attribution manually with team agreement and normal PR review; the bot
will refuse to silently replace history. Fix legacy documents manually rather than
removing attribution merely to make automation pass. A mixed PR containing blocked
documents is not partially applied.

### Confirming individual document reviews

Submitted, edited and dismissed review events notify a separate trusted default-branch
workflow, which fetches the current reviews from GitHub. It only **proposes eligible
reviewers**; review events never push commits. If GitHub cannot associate the notification
with one PR, use `/propose-attribution` to refresh after review.

The policy is deliberately strict: the review must be a submitted `APPROVED` review of
the **exact current head SHA**, from a mapped human other than the PR author. Dismissed,
outdated, requested, pending and comment-only reviews do not qualify. A later
`CHANGES_REQUESTED` or `DISMISSED` review invalidates the earlier candidate. A document's
performer cannot be their own reviewer, even when someone else opened the PR.

A PR approval alone does not establish that every document was reviewed. After confirming
with the reviewer which documents they actually reviewed, an authorized collaborator posts
a separate command naming **one reviewer and the exact documents**:

```text
/apply-review-attribution {"reviewer":"mapped-reviewer","files":["docs/analysis-and-design/new-design.md","docs/discussion/P01/TA-consultation-prep/Function & actors.md"]}
```

JSON supports paths containing spaces. Commands must be a single line with no extra
text. Only selected affected documents receive the reviewer name; existing metadata is
preserved. Apply the author/editor proposal first. Use separate explicit confirmations
for additional reviewers, with a fresh approval of the current head when necessary.
After the metadata commit, earlier approvals are outdated under this tool's policy:
reviewers must verify the final version and approve again. If their names are already
recorded, no additional confirmation/metadata commit is needed. This avoids an endless
approval/update loop. Recorded names remain a historical contribution summary, not a
claim that an earlier approval covers a newer document version. GitHub PR review history
remains authoritative for actual approvals and Branch Protection requirements.

### Permissions, CI and safe fallback

The proposal job uses `contents: read` and `pull-requests: write`. The confirmation job
additionally uses `contents: write` and `actions: write`; only this job can update PR refs
and request CI. Privileged jobs check out **only the trusted default branch**, install no
project dependencies and never execute PR scripts. PR titles, comments, paths and Markdown
are API data, not shell commands. The review notification has `permissions: {}`, checks out
no code, and passes no artifacts to the privileged workflow. The trusted handler fetches
reviews afresh instead of trusting notification output. Workflow runs are serialized to
avoid duplicate bot comments; GitHub may replace a pending run during a burst of events,
so resend a confirmation if it did not run.

Commits made using `GITHUB_TOKEN` do not reliably start normal push/PR CI. The bot explicitly
dispatches `ci.yml` on the **default branch**, passing the new head SHA, base SHA and PR number.
The quality job checks out that exact commit with a read-only token and runs the existing
formatting, tests and changed-document check. CI compares from the merge base so changes
made only on the base branch are not mistaken for PR document edits. A separate trusted reporter with
`contents: read`, `pull-requests: read`, and `checks: write` attaches the actual job result
as **Repository quality** to the validated PR head. Skipped/cancelled/failed quality jobs
cannot produce a successful check. The reporter refuses a closed, forked or changed PR.
No Branch Protection setting is changed or bypassed. This preserves the existing required
check name; verify it on a real PR before relying on the automation.

If branch protection, repository/organization Actions policy, or token permissions prevent
writing, dispatching, or reporting, follow the bot warning and use the CLI fallback.
Do not weaken protection or add a broad personal access token. If metadata was committed
but CI dispatch failed, a maintainer may run `CI` **from the default branch**, with
`head_sha`, `base_sha`, and `pr_number` from the current PR, or push a normal follow-up
commit to trigger PR CI. Do not merge until the final head passes all required checks.
Fork PRs always use the manual CLI; the bot never writes to them. Documents over 1 MiB,
incomplete API file/tree results, non-regular blobs, or oversized proposals also require
manual handling. No external database, app, token secret or Jira integration is required.

The workflows must exist on the default branch and be allowed by repository policies.
To smoke-test after maintainer rollout, open a same-repository `docs/SFP-25-...` branch
adding a small academic document without metadata: CI should fail and the bot should
propose its creator. Confirm, inspect the bot-only diff and CI on the new SHA, obtain a
peer approval, confirm that peer on that specific document, then verify CI and final
approval again. Also try a stale proposal, an unauthorized account and a fork PR; none
should update a branch. Do not use the eight legacy documents as disposable test fixtures.

### Fields and manual CLI fallback

Each managed document must have exactly one canonical attribution line:

```markdown
**Performed by:** Tên đầy đủ đã xác nhận · **Reviewed by:** None yet · **Edited by:** None
```

- **Performed by:** The main creator. Editing or reviewing never changes this field.
  An inaccurate original attribution may be corrected manually in a reviewed PR.
- **Reviewed by:** Confirmed human reviewers, initially `None yet`. The performer
  cannot review their own document. Requests for review, comments, and pending reviews
  do not establish approval.
- **Edited by:** Contributors who modify an existing document, initially `None`.
  Initialization does not add the performer as an editor. Later edits may record them.

Multiple reviewers/editors use comma + space (`Name One, Name Two`), preserving the
order first recorded. Repeated mapped identities are not appended again. This is a
summary of contributions, not a complete version history.

Run these commands from the repository root with Node.js 24 LTS and pnpm 10.32.1.
Replace `confirmed-account` with a confirmed mapping key and use the actual file path:

```bash
pnpm docs:meta --help
pnpm docs:meta init docs/analysis-and-design/new-design.md --user confirmed-account
pnpm docs:meta edit docs/analysis-and-design/new-design.md --user confirmed-account
pnpm docs:meta review docs/analysis-and-design/new-design.md --user confirmed-reviewer --confirm-review
pnpm docs:meta check docs/analysis-and-design/new-design.md
pnpm docs:meta:check
pnpm docs:meta:test
```

Create the document before `init`. Initialization inserts after the first H1 (`# Title`)
outside fenced code blocks, or at the start if there is no H1. Existing content, Unicode,
and line endings are preserved. Existing attribution is never overwritten. Paths use `/`
separators; quote paths containing spaces. Symlink paths, traversal, unmanaged documents,
unsupported file types, and ambiguous attribution are rejected.

`review --confirm-review` records a declaration that the human review has occurred.
The CLI does not contact GitHub or verify a PR approval. All write commands require an
explicit `--user`; they never commit or push. Inspect the diff yourself. `check` validates
the structure, exact mapped names, delimiters, duplicates, and self-review without writing.
No metadata automation is added to Husky: contributors deliberately invoke this CLI,
while CI only validates.

### Existing documents and migration

The repository currently uses per-section attribution, sometimes multiple performers,
`[None]` for editors, and `None` for unreviewed documents. The draft team contract also
describes attribution on every section. This helper adopts **one summary line per document**;
the team must reconcile that draft convention before migrating affected documents.
No existing academic document has been automatically rewritten.

The initial migration inventory is:

- `docs/analysis-and-design/overview.md`: missing attribution.
- `docs/management/team-contract.md`: repeated section attribution, multiple performers,
  and a separate draft review-status line.
- `docs/discussion/P01/TA-consultation-prep/Function & actors.md`: repeated section
  attribution and `[None]`; preserve the already recorded reviewer after team confirmation.
- `docs/discussion/P01/TA-consultation-prep/member-roles-and-scope.md`: repeated section
  attribution and `[None]`.
- `docs/discussion/P01/TA-consultation-prep/meeting-document.md`: repeated attribution
  and `[None]`.
- `docs/discussion/P01/TA-consultation-prep/overview.md` and `test.md` in the same
  directory: `[None]`.
- `docs/discussion/P01/TA-consultation-prep/app-survey.md`: `Reviewed by: None`.

For each migration, confirm the main performer and all prior reviewers/editors with the
team. Keep verified names; do not discard distinct section contributions just to satisfy
the checker. Agree how they are represented in the summary and preserve any detailed
section history in ordinary prose or a contribution table without metadata field labels.
If a single main performer cannot be agreed, leave the document pending migration.
Manually reconcile extra attribution lines and the contract's separate review-status
line; the checker intentionally rejects attribution-like lines outside fenced examples.
Use `None yet` and `None` only when those fields truly have no confirmed contributors.
Then run `check` on that file and have the migration reviewed.

During bootstrap, CI runs tests and validates only managed files added, edited, or renamed
between the PR base and its checked-out result (and the previous commit range on pushes
to `main`). Deleted documents are skipped. General documentation is excluded. Thus this
tooling PR does not require invented attribution for untouched legacy documents.
Changing a legacy academic file requires migrating that file first. Locally, the same
read-only selection is available with `pnpm docs:meta check --changed <base-commit>`;
it compares committed snapshots, so use an explicit path to check uncommitted edits.
Changing the mapping or scope alone does not revalidate untouched files during bootstrap;
run the full checker to assess those changes. Once migration is complete, maintainers
should switch CI to `pnpm docs:meta:check`. Until then, a full check is expected to fail
and reports the outstanding files. No legacy exceptions are silently accepted.

### Jira and GitHub workflow

```text
Jira Issue
    ↓
Create Branch
    ↓
Write / Edit Academic Markdown
    ↓
Open GitHub PR
    ↓
Bot proposes document attribution
    ↓
Developer confirms
    ↓
Bot updates PR branch
    ↓
CI Validation
    ↓
Peer Review
    ↓
Confirm Reviewer Attribution
    ↓
CI on updated commit
    ↓
Final Approval
    ↓
Squash Merge
```

Use the current branch convention, for example `docs/SFP-25-update-requirements`,
and include the Jira Issue Key and link in the PR description (and key in the title).
After the peer confirms the document review, record their attribution and commit the
change **before the final approval**. A new metadata commit may make a previous GitHub
approval stale depending on Branch Protection settings. Request a fresh final approval
when required; keep existing Branch Protection requirements. GitHub's PR review history
remains the authoritative record of actual PR approvals. CI validates attribution metadata,
not whether a real review occurred. Complete the usual Squash Merge and Jira transition
to `Done` after all checks and approvals pass.

Before contributing, each member should confirm their published mapping and identify
whether the document needs migration. Normally, open the PR, inspect and confirm the bot
proposal, then check the resulting diff and CI. Use the manual CLI when automation is
unavailable or the document requires migration. Reviewers should confirm which documents
they reviewed before their names are recorded.

## 7. Team Collaboration Principles

- Each task should be tracked through a Jira Issue.
- Each Issue should have one primary Assignee.
- Communicate proactively when encountering difficulties or changes in scope.
- Prefer small, focused Pull Requests that are easy to review.
- Do not merge code that has not passed the required checks.
- Avoid introducing unnecessary process complexity.
- Respect feedback from team members and share responsibility for product quality.

**Goal:** Establish organized, traceable, and quality-focused team collaboration practices while keeping the workflow simple enough for every team member to participate effectively.
