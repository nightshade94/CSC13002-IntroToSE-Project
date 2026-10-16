# Member Roles and Project Scope

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

This document prepares two parts of the PA1 Project Proposal for team review and TA consultation: a detailed description of each member's role, and the project scope, including how the scope is scaled up or down during the semester. It builds on the [Team Contract](../../../management/team-contract.md) and the [Architecture Overview](../../../analysis-and-design/overview.md); if this document and the Team Contract disagree about roles, the Team Contract applies.

| Version | Date       | Description           | Author         |
| ------- | ---------- | --------------------- | -------------- |
| 0.1     | 2026-10-16 | Detailed member roles | Cao Tiến Thiên |

## 1. Team Members and Roles

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

As required by the course, every member works as a full-stack engineer: everyone designs, writes code, tests, reviews and writes documentation. A lead role states what a member coordinates and is accountable for; it does not limit what the member works on, and it does not make that area the responsibility of one person only.

### 1.1 Role Summary

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

| Member                          | Student ID | Lead role                      | Leads                                                                  | Back-up (proposed) |
| ------------------------------- | ---------- | ------------------------------ | ---------------------------------------------------------------------- | ------------------ |
| Nguyễn Cao Thông (group leader) | 24127128   | Project Manager (PM)           | Sprint planning, Scrum events, Jira board, communication with TAs      | Ngô Huỳnh Thắm     |
| Dư Hoài Phúc                    | 24127104   | Backend and Architecture Lead  | System architecture, API, database, AI service integration, Git and CI | Phan Tuấn Phong    |
| Cao Tiến Thiên                  | 24127122   | Frontend and UI/UX Design Lead | User flows, interface design, design system, front-end implementation  | Phan Tuấn Phong    |
| Ngô Huỳnh Thắm                  | 24127238   | Testing and Documentation Lead | Test planning, quality checks, documentation format, PDF deliverables  | Cao Tiến Thiên     |
| Phan Tuấn Phong                 | 24127099   | Research and Requirements Lead | User and competitor research, requirements, back-up development        | Ngô Huỳnh Thắm     |

### 1.2 Detailed Responsibilities

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

#### Nguyễn Cao Thông — Project Manager (group leader)

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

- Plans each sprint with the team, facilitates Sprint Planning, the two Scrum meetings and the Sprint Review, and shares agendas in advance.
- Maintains the Jira board: every task has one assignee, creation and assignment dates before work starts, and a completion date when the work is actually finished.
- Tracks progress, risks and blockers, and records decisions, owners and due dates.
- Communicates with TAs and the instructor, follows Moodle announcements, and submits deliverables.
- Facilitates scope decisions (Section 2.4) but has no unilateral final say; major decisions follow the Decision-Making Process of the Team Contract.
- Also contributes to: proposal writing, document reviews, and back-end and front-end tasks.

#### Dư Hoài Phúc — Backend and Architecture Lead

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

- Leads the system architecture and back-end design: API contracts, data model, database, and integration with AI services.
- Maintains the GitHub repository, the contribution workflow, Pull Request rules and CI checks, and keeps secrets out of the repository.
- Raises technical risks and dependencies early, especially AI service quotas and integration effort.
- Reviews the technical feasibility of functional groups and AI features.
- Also contributes to: front-end integration, test cases for API behaviour, and documentation.

#### Cao Tiến Thiên — Frontend and UI/UX Design Lead

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

- Coordinates the UI/UX design phase: user flows, information architecture, wireframes, mock-ups and a shared design system; every member takes part in this phase.
- Leads front-end implementation of the web application and keeps screens consistent, responsive and accessible.
- Documents design decisions so that they can be reviewed, and checks that user stories map to screens and flows.
- Owns the project scope section (Section 2) together with the PM.
- Also contributes to: UI test scenarios, survey review, and back-end tasks when needed.

#### Ngô Huỳnh Thắm — Testing and Documentation Lead

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

- Coordinates test planning: derives test cases from acceptance criteria and organises test reports.
- Owns documentation quality: templates, structure, English, and the _Performed by / Reviewed by / Edited by_ line of every section.
- Prepares the Markdown and PDF deliverables and checks that Mermaid diagrams render correctly before submission.
- Also contributes to: proposal content (actors, functional groups and AI features), requirement reviews, and implementation tasks.

#### Phan Tuấn Phong — Research and Requirements Lead

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

- Coordinates user and competitor research, including the existing app survey.
- Leads requirements documentation and checks that requirements are clear, testable and traceable to functional groups.
- Researches legal and privacy constraints that affect the scope.
- Acts as back-up developer: takes front-end or back-end tasks when a lead is overloaded or unavailable.
- Also contributes to: UI/UX design, testing, and documentation.

### 1.3 Responsibility Matrix by Work Area

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

**L** = leads and is accountable for the area · **C** = contributes to the area. Every member contributes to every area, in line with the full-stack requirement.

| Work area                          | Thông | Phúc | Thiên | Thắm | Phong |
| ---------------------------------- | :---: | :--: | :---: | :--: | :---: |
| Project management and Scrum       |   L   |  C   |   C   |  C   |   C   |
| Research and requirements          |   C   |  C   |   C   |  C   |   L   |
| Architecture and back end          |   C   |  L   |   C   |  C   |   C   |
| AI service integration             |   C   |  L   |   C   |  C   |   C   |
| UI/UX design                       |   C   |  C   |   L   |  C   |   C   |
| Front-end implementation           |   C   |  C   |   L   |  C   |   C   |
| Testing and quality                |   C   |  C   |   C   |  L   |   C   |
| Documentation and PDF deliverables |   C   |  C   |   C   |  L   |   C   |
| Git repository and CI              |   C   |  L   |   C   |  C   |   C   |

### 1.4 Back-up and Hand-over

**Performed by:** Cao Tiến Thiên · **Reviewed by:** None yet · **Edited by:** [None]

- Each lead has a back-up (Section 1.1) who follows the lead's work closely enough to take over at short notice. The pairs are a proposal and are confirmed at Sprint Planning.
- A member who will be unavailable for more than 24 hours tells the team in advance, with the return date and the status of their tasks.
- If work must change owner, the original Jira task is closed with a comment and a new task is created for the new owner, so that Jira, Git history and the attribution lines all credit the person who actually did the work.
- If a member leaves the course, the remaining members redistribute the lead roles at the next Sprint Planning and update the Team Contract; the scope rules in Section 2.4 apply.
