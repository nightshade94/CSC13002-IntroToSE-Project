# GitHub Setup

Checklist for maintainers.
Only local files were inspected during this documentation update; **remote settings have not been verified or modified**.

## Verified in the Repository

- Three Issue templates (Feature/Bug/Task) and a PR template are present in `.github/`.
- `.github/workflows/ci.yml` defines CI for PRs targeting `main` and pushes to `main`.
- The `Repository quality` job uses the Node.js version specified in `.nvmrc`, the pnpm version specified in `package.json`, and pnpm caching,
  and runs `pnpm install --frozen-lockfile` and `pnpm format:check`.
- ESLint, type checking, unit/integration tests, and build checks are not yet included in CI; add them once the applications exist.
- `.github/CODEOWNERS` does not exist yet.

These files do not establish that the workflow has run successfully, that the repository is private, or that branch protection is enabled.

## Repository and Access Permissions — Manual Configuration

Keeping the repository **Private** during the course project is recommended, subject to course requirements and team agreement.
A user with appropriate permissions can check **Settings → General → Danger Zone → Change repository visibility**;
change visibility only after understanding the implications and obtaining team agreement.

Assign 1–2 people to maintain the repository; actual permissions depend on repository ownership:

- **Personal repository:** Only the owner and collaborators are available. Collaborators on a private repository have
  read/write access; there are no separate `Maintain`/`Admin` roles to assign to a second maintainer.
  The owner manages settings and invites members via **Settings → Collaborators**.
- **Organization repository:** `Write` can be used for developers, `Maintain` for those managing
  repository work, and `Admin` for those who genuinely need to manage permissions/protection. `Maintain` does not grant all
  `Admin` permissions. Check **Settings → Collaborators and teams** or the corresponding access management section.

GitHub Pro on a personal account does not provide the same permission model as an organization using GitHub Team.
See [personal repository permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository)
and [organization repository roles](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization).

## Merging

Go to **Settings → General → Pull Requests**:

- [x] Enable **Allow squash merging**.
- [x] Disable **Allow merge commits** and **Allow rebase merging** if the team agrees to use squash merging exclusively.
- [x] Enable **Automatically delete head branches** to remove feature branches after merging.

## Protecting main

With appropriate permissions, go to **Settings → Branches → Add branch protection rule** and use the pattern `main`:

- [x] Enable **Require a pull request before merging**.
- [x] Enable **Require approvals**, with at least **1** approval.
- [x] Enable **Require conversation resolution before merging**.
- [x] Enable **Require status checks to pass before merging**, selecting **Repository quality**
      after the check appears following a CI run on GitHub.
- [x] Keep **Allow force pushes** and **Allow deletions** disabled.
- [x] Save and verify that the rule applies correctly to `main`.

If using **Settings → Rules → Rulesets**, create a branch ruleset for `main` with equivalent requirements,
set enforcement to **Active**, and review bypass permissions. Choose an approach that is easy for the team to maintain.
Preventing deletion of `main` is different from automatically deleting feature branches after a merge.

Branch protection availability for private repositories depends on the GitHub plan, personal/organization ownership, and supported features.
Do not infer enforcement capabilities from the Pro/Team plan names alone; check the UI and
[protected branches documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
If enforcement is not supported, document the limitation and follow team review conventions rather than claiming the rules are enforced.
Two reviews for important changes are a team policy described in [Git workflow](git-workflow.md), not a separate automated requirement.

## Issues, Labels, and Projects

1. Verify that **Settings → General → Features → Issues** is enabled.
2. Go to **Issues → Labels** and add the following small set of labels if they do not already exist:

   | Category | Suggested labels                                   |
   | -------- | -------------------------------------------------- |
   | Type     | `type:feature`, `type:bug`, `type:docs`            |
   | Priority | `priority:high`, `priority:medium`, `priority:low` |
   | Area     | `area:web`, `area:api`, `area:shared`              |

   Apply labels relevant to each Issue; `area:shared` is not needed until shared code exists.

3. Create a Project from the owner/organization **Projects** page by selecting **New project → Board**.
4. Set the **Status** field to `Backlog`, `Ready`, `In Progress`, `In Review`, and `Done`;
   group the Board by Status. See [Git workflow](git-workflow.md) for the meaning of each status.
5. Link the Project to the repository through its **Projects** tab if the UI supports it,
   add Issues, and assign one primary assignee to each Issue. Verify Project viewing and editing permissions separately.

Section names may vary depending on the UI and ownership. This document does not indicate that a Project or labels have been created or that permissions have been modified.

## Ownership and Post-Setup Verification

Add CODEOWNERS only after the team agrees on actual usernames/teams with appropriate permissions.
Example syntax: `docs/ @<github-username>`; replace the placeholder before adding it to an active file.
Do not introduce bots or complex approval workflows.

Maintainers should verify repository visibility/access permissions, merge settings, the rules for `main`, and actual CI results on a PR.
When the applications exist, add ESLint, type checking, tests, and build checks to CI; update required checks if job names change.
