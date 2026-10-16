# Team Contract

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

**Draft status:** Initial draft · **Date:** 16 October 2026 · **Reviewed by:** None yet · **Agreed by:** None yet

This initial draft proposes how the **5-member Group 7 (ID 7)** will work together on the Introduction to Software Engineering project.

## Team Information

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

**Team size:** 5 members

| Member | Student ID | Email | Lead focus / role |
|---|---|---|---|
| Nguyễn Cao Thông (group leader) | 24127128 | ncthong2427@clc.fitus.edu.vn | Project Manager (PM) |
| Ngô Huỳnh Thắm | 24127238 | nhtham2413@clc.fitus.edu.vn | Testing and Documentation |
| Cao Tiến Thiên | 24127122 | ctthien2416@clc.fitus.edu.vn | Frontend and UI/UX Design |
| Dư Hoài Phúc | 24127104 | dhphuc2424@clc.fitus.edu.vn | Backend and Architecture Design |
| Phan Tuấn Phong | 24127099 | ptphong2417@clc.fitus.edu.vn | Research, Requirements|

## Team Roles and Responsibilities

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

Every member will act as a full-stack engineer and contribute to implementation, testing, documentation, and review. All members will participate in the UI/UX design phase; the design lead coordinates that work and documents decisions. Lead roles set direction and coordinate work in their area; they do not make that area the sole responsibility of one person.

| Lead role | Assigned member | Primary responsibilities |
|---|---|---|
| Project Manager (PM) | Nguyễn Cao Thông | Schedule and facilitate sprint meetings, keep the team aware of milestones and blockers, and help track decisions and follow-up actions. |
| Backend Lead | Dư Hoài Phúc | Coordinate backend design and implementation, API and integration points, and related technical risks; raise dependencies early. |
| Frontend and UI/UX Design Lead | Cao Tiến Thiên | Coordinate user flows, interface and interaction design, and frontend implementation; keep design decisions documented and reviewable. |
| Testing and Documentation Lead | Ngô Huỳnh Thắm | Coordinate test planning and quality checks, organize project documentation, and help prepare Markdown and PDF deliverables. |
| Research, Requirements| Phan Tuấn Phong | Coordinate user and competitor research and requirements documentation; check that requirements are clear and traceable; help implement development tasks as backup capacity when needed. |

These five roles combine the team’s current responsibilities. Every member remains responsible for assigned tasks and will contribute outside their lead area when needed. Phong’s backup-development responsibility supplements the research and requirements role; it does not replace shared implementation responsibility.

## Communication Plan

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

- **Team discussion channel:** Messenger. Members will check the team chat regularly during working times and keep notifications enabled for direct mentions.
- **Class announcements and assignment submission:** Check the Moodle and Discord regularly for class announcements, discussions, and questions. Submit assignments through Moodle.
- **Task tracking:** Jira. Log every project task, including reports, coding, research, testing, and self-training, and assign each task to exactly one team member. Record creation, assignment, and completion dates. Create and assign tasks before work begins; mark them complete only when the work is finished. Include screenshots of all tasks in weekly reports.
- **Code and documents:** Private GitHub repository: https://github.com/nightshade94/CSC13002-IntroToSE-Project. Source code and Markdown documentation will be version-controlled together.
- **Response expectations:** Acknowledge ordinary messages within 12 hours during agreed working times. Messages sent outside those times will be handled during the next agreed working period. For an urgent blocker, directly mention the person needed and state the decision or help required. Members should share their availability rather than assume everyone is online.
- **Meetings:** Follow the sprint cadence in the Work Schedule section. The Project Manager will share the agenda in advance and record decisions, owners, and due dates in Jira or project notes.
- If a member cannot attend a meeting, they will notify the team beforehand when possible and send a short written update with progress, next steps, and blockers.

## Work Schedule and Deadlines

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

Each project assignment is one sprint of approximately 2–3 weeks. Every sprint includes exactly one Sprint Planning meeting, two Scrum meetings spread across the sprint, and one Sprint Review meeting. The team will aim to keep recurring Scrum dates fixed across sprints. Meeting dates and the expected course deadline will be recorded in Jira at Sprint Planning.

When schedules allow, the team may meet offline on Tuesday morning for one of the two scheduled Scrum meetings or a shared work session. The team will confirm the time and place in the team chat. This optional session will not add a third Scrum meeting to the sprint.

| Milestone | Target date / availability |
|---|---|
| Sprint Planning | One near the start of each sprint; date and time agreed at planning |
| Scrum meeting 1 | First target recurring date and time: [to be agreed] |
| Scrum meeting 2 | Second target recurring date and time, later in the sprint: [to be agreed] |
| Optional offline Scrum/work session | Tuesday morning when schedules allow; may coincide with one of the two Scrum meetings; confirm time and place in the team chat |
| Sprint Review | Near the end of each sprint; date and time agreed at planning |
| Course submission deadline | [date and time, when announced] |
| Internal completion deadline | At least 48 hours before the course deadline, unless the team records a different buffer and reason |

At Sprint Planning, each task will have a clear outcome, exactly one owner, creation and assignment dates, an agreed target date, and a completion date recorded when finished. Tasks must be created and assigned in Jira before work begins; members must not create, assign, and complete a task retroactively. Dependencies and review time should be included in estimates.

If a deadline is at risk, the task owner will tell the team as soon as possible, explain the blocker, and propose a revised estimate or scope. The team will review dependencies, reassign work where appropriate, and agree on a recovery plan. The team will not hide delays or record work as complete before it is finished.

## Code and Documentation Standards

**Performed by:** Nguyễn Cao Thông, Dư Hoài Phúc · **Reviewed by:** None yet · **Edited by:** [None]

- Use current project tooling and record changes in the repository. The setup uses Node.js 24 LTS, pnpm 10.32.1, Prettier, and GitHub Actions; confirm application architecture and testing tools together before implementation.
- Work in small, reviewable changes: create a feature or fix branch, implement and test, open a Pull Request, complete CI checks and code review, then merge to main. Link the relevant Jira task from the Pull Request.
- Use branch names such as `feat/12-fridge-inventory`, `fix/18-expiry-date-validation`, or `docs/25-update-requirements`, and use Conventional Commits such as `feat(web): add fridge inventory page` or `fix(api): handle invalid expiry date`.
- Before a change is merged, another member will review it for correctness, readability, alignment with requirements, and relevant test coverage. The author will address feedback or record the team’s agreed reason for not applying it.
- Record review findings, approval decisions, and any agreed reasons for not applying suggestions in the related GitHub Pull Request. Address requested changes in the PR and resolve review conversations before merge. If review identifies follow-up work outside the PR’s scope, create a Jira task with exactly one owner and link it to the PR.
- Run the relevant checks for the change and record any known gaps or failures. Add or update tests when behavior changes, following the project’s test plan.
- Write reports and project documentation in English Markdown and store them with the code. Use Mermaid for diagrams where practical. For each report or document section, put the Performed by / Reviewed by / Edited by attribution on the first line immediately after that section heading.
- Preserve the original Markdown files and prepare PDF versions for course submissions.
- Never commit API keys, passwords, tokens, or other credentials. If external services require configuration, use local environment settings and provide a safe .env.example with sample values.
- From PA2 onward, use Spec Kit for the specification-driven development workflow. Each member must register for a free educational account on an AI coding platform.
- For PA1, submit the English Markdown and corresponding PDF files, include a Git log screenshot or export, and package the submission in a folder named PA1-Group7 before zipping it. Use Mermaid for diagrams where possible. Record the performer, reviewer, and editor on the first line after each document section heading; replace pending attribution markers with actual names before submission.

## Accountability and Performance

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

Contribution will be assessed through assigned work completed, quality and review readiness, timely communication about progress or blockers, participation in meetings and reviews, and support for shared project goals. Task history, code and document reviews, meeting notes, and agreed deliverables will provide a record of contributions. Lines of code or hours alone will not be treated as a measure of contribution.

If a member is falling behind or not participating:

1. The Project Manager will check in privately and ask what support or adjustment is needed.
2. The member and team will agree on specific next steps, an owner, and a reasonable date, and record the plan.
3. If the issue continues, the team will discuss reassignment of unstarted work and document the impact on project deliverables.
4. If the team cannot resolve the issue, it will seek help from the teaching assistant or instructor and provide an accurate record of tasks, communication, and attempts to resolve the problem.

Repeatedly missing agreed responsibilities without communicating may result in work being reassigned and the contribution record being shared with the teaching staff, who determine any course consequences under course policy.

## Decision-Making Process

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

The team will first discuss decisions and aim for consensus. Routine decisions within an assigned task may be made by that task owner if they do not conflict with agreed requirements, architecture, or team commitments. The owner will record decisions that affect other work.

For major decisions—such as project scope, requirements, architecture, sprint commitments, or submission readiness—the team will seek consensus. If consensus is not reached after discussion, each active team member will have one vote and a majority decision will be final for the team. The Project Manager will facilitate the discussion and record the decision and any unresolved concern; the PM has no unilateral final say. If a vote is tied, the team will narrow the options and vote again; if still tied, it will ask the teaching assistant or instructor for guidance. Course requirements and instructor decisions take precedence over this contract.

## Conflict Resolution

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

Team members will address disagreements respectfully and focus on the work and its impact:

1. Discuss the issue directly and try to agree on a practical resolution.
2. If unresolved, ask the Project Manager to facilitate and record the agreed action.
3. If it still affects progress or involves course requirements, ask the teaching assistant or instructor for help.

## Review and Update Process

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

The team will review this contract during each Sprint Review and whenever team membership, availability, tools, or project needs change materially. Any member may propose an update. The team will discuss the proposed change, agree to it using the Decision-Making Process, and record the revision date and summary below. Updates apply after they are shared with all members.

| Revision date | Summary of change | Agreed by |
|---|---|---|
| 2026-10-16 | Initial draft; pending team review | None yet |

## Team Agreement

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** None yet · **Edited by:** [None]

**Agreement status:** Not yet reviewed or agreed by any team member.

The expectations below are proposals in this initial draft. They become team commitments only after the members review the contract and record their agreement. Until then, the signature table is intentionally pending.

| Member | Signature / confirmation | Date |
|---|---|---|
| Nguyễn Cao Thông (group leader) | Pending review and agreement | — |
| Ngô Huỳnh Thắm | Pending review and agreement | — |
| Cao Tiến Thiên | Pending review and agreement | — |
| Dư Hoài Phúc | Pending review and agreement | — |
| Phan Tuấn Phong | Pending review and agreement | — |
