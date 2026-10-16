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

## 7. Team Collaboration Principles

- Each task should be tracked through a Jira Issue.
- Each Issue should have one primary Assignee.
- Communicate proactively when encountering difficulties or changes in scope.
- Prefer small, focused Pull Requests that are easy to review.
- Do not merge code that has not passed the required checks.
- Avoid introducing unnecessary process complexity.
- Respect feedback from team members and share responsibility for product quality.

**Goal:** Establish organized, traceable, and quality-focused team collaboration practices while keeping the workflow simple enough for every team member to participate effectively.
