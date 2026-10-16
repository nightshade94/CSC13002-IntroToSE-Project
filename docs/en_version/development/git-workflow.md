# GitHub Flow

The team follows this workflow:

```text
Issue → Branch → Development → Pull Request → CI + Review → Squash Merge
```

After merging, close the Issue and delete the feature branch. See [CONTRIBUTING](../../CONTRIBUTING.md)
to get started with contributions; [GitHub setup](github-setup.md) is intended for maintainers.

## Issues and GitHub Projects

Each Issue should have one primary assignee, a clearly defined objective, and verifiable acceptance criteria.
Use the Feature, Bug, or Task template; apply type, priority, and area labels where appropriate.
PRs should link to the corresponding Issue, for example, `Closes #25`.

If using GitHub Projects, agree on the following statuses:

| Status      | Meaning                                                   |
| ----------- | --------------------------------------------------------- |
| Backlog     | Ideas or tasks that are not yet ready                     |
| Ready       | Scope and criteria are clear, and work can begin          |
| In Progress | The assignee is working on the task                       |
| In Review   | The PR is ready for review                                |
| Done        | Acceptance criteria are met and the PR, if any, is merged |

## Branches and Commits

Create branches from the latest `main` using `<type>/<issue-id>-<description>`, with a lowercase kebab-case description:

```text
feat/12-fridge-inventory
fix/18-expiry-validation
docs/25-update-readme
test/31-recipe-service
chore/40-update-dependencies
```

Use scoped Conventional Commits, with each commit focused on one meaningful change:

```text
feat(web): add inventory page
feat(api): implement ingredient endpoint
fix(api): handle invalid expiry date
docs(repo): update project documentation
```

The application-related examples describe potential future work; they do not imply that these features already exist.
There is currently no commitlint setup or automated validation of branch or commit names.

## Example: Making a Documentation Change

```bash
git switch main
git pull --ff-only origin main
git switch -c docs/25-update-readme
# Edit the file and review the diff.
pnpm format:check
git diff
git add README.md
git commit -m "docs(repo): clarify project scope"
git push -u origin docs/25-update-readme
```

The current pre-commit hook only formats supported staged files using Prettier.
If the formatting check fails, format the relevant file with `pnpm exec prettier README.md --write`
and check again. The `lint`, `typecheck`, `test`, and `build` commands do not exist yet; add the appropriate checks once the applications are implemented.

## Pull Requests and Reviews

Open small PRs focused on one purpose. Link the relevant Issue and include a description and verification results.
Use a Draft PR while work is incomplete; mark it Ready for review and request a review from another team member when ready.
Address feedback on the same branch, then commit and push additional changes.

A typical PR should have at least one teammate approval, passing CI checks, and all review discussions resolved.
Reviewers should focus on correctness, readability, error handling, tests, and architectural consistency.
Changes involving authentication/authorization, database schemas, shared API contracts, CI, or security
configuration should receive two reviews when feasible. The second review is a team convention and is not automatically enforced.

CI is currently configured to check dependency installation using the lockfile and formatting;
a passing CI run does not establish that application behavior is correct. Check actual run results on each GitHub PR.

## Merging and Updating Branches

The author may select **Squash and merge** once sufficient reviews are complete and relevant checks pass;
name the squash commit according to scoped Conventional Commits. Do not push directly to `main`.
Delete the remote branch after merging. `Closes #25` automatically closes the Issue when merged into the default branch;
if the Issue remains open, verify the completion criteria and close it manually.

```bash
git switch main
git pull --ff-only origin main
git branch -d docs/25-update-readme
git fetch --prune
```

After a squash merge, `-d` may refuse to delete the local branch. Use
`git branch -D docs/25-update-readme` only after confirming that the PR has been merged and no unique changes need to be retained.

If a conflict occurs, commit or stash your current changes first; run `git fetch origin`,
then `git merge origin/main` on your working branch. Resolve conflicts file by file, verify the changes, commit, and push.
Ask a teammate for help if you do not understand the conflict; never force-push to `main`.
