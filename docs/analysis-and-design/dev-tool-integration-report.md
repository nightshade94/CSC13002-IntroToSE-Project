# E. Development Tools and Process Setup

**Performed by:** Dư Hoài Phúc · **Reviewed by:** Ngô Huỳnh Thắm · **Edited by:** None

## E.1. Development Process Selection

### Process Evaluation

A suitable software development process is essential for coordinating tasks, monitoring progress, and ensuring accountability among team members. For Smart Fridge Planner, the team considered several common development approaches.

| Process   | Advantages                                                             | Limitations                                                     |
| --------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| Waterfall | Clear development phases and documentation structure                   | Limited flexibility when requirements change                    |
| Kanban    | Continuous task visualization and flexible work prioritization         | Does not inherently define Sprint planning or review activities |
| Scrum     | Time-boxed iterations, regular collaboration, and incremental delivery | Requires consistent meetings and active task management         |

### Selected Process: Scrum

The team selected **Scrum** in accordance with the course requirements. Scrum is suitable for a five-member student team because it encourages communication, clear task ownership, regular feedback, and incremental development.

Each Programming Assignment (PA) corresponds to one Sprint lasting approximately **2–3 weeks**. Every Sprint includes:

| Meeting         | Frequency        | Purpose                                                          |
| --------------- | ---------------- | ---------------------------------------------------------------- |
| Sprint Planning | Once per Sprint  | Define Sprint goals, identify tasks, and assign responsibilities |
| Scrum Meeting   | Twice per Sprint | Review progress, discuss obstacles, and coordinate activities    |
| Sprint Review   | Once per Sprint  | Evaluate completed deliverables and identify improvements        |

Meeting records and weekly reports will follow the course-provided _WeeklyReports_ format.

### Planned Application

Jira will be used to manage the Sprint Backlog and monitor task progress. The team plans to organize work through the following statuses:

`Backlog → Ready → In Progress → In Review → Done`

These statuses provide visibility into individual tasks, while Sprint meetings support coordination and progress evaluation.

Scrum will govern project planning and team collaboration, whereas GitHub Flow will govern source code integration. The two processes serve different purposes and are intended to complement each other.

## E.2. Communication and Collaboration Tools

### Tool Evaluation

Effective communication is necessary for coordinating work outside formal Sprint meetings. The team considered commonly available communication platforms.

| Tool      | Advantages                                                                      | Limitations                                                             |
| --------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Messenger | Familiar interface, accessible to all members, convenient for quick discussions | Limited structured task tracking and long-term information organization |
| Discord   | Organized channels, voice communication, and screen sharing                     | Requires additional workspace setup and consistent channel management   |
| Slack     | Structured discussions and integrations with development tools                  | Introduces another platform and potential free-plan limitations         |

### Selected Tool: Messenger

**Messenger** was selected as the team's primary internal communication platform because it is familiar, accessible, and requires minimal additional setup.

The team intends to use Messenger for:

- Daily discussions and progress updates.
- Coordinating Scrum meetings.
- Sharing announcements and urgent information.
- Discussing technical difficulties and implementation decisions.

Messenger supports communication but is not used as the official record of project tasks. Important assignments, responsibilities, and progress updates must be recorded in Jira to maintain traceability.

In addition, **Moodle** and the course **Facebook Group** are used for assignment submissions, official announcements, class discussions, and communication with instructors.

### Selection Rationale

Messenger provides sufficient communication capabilities for a small student team without introducing unnecessary administrative overhead. Separating informal communication from formal task management also helps prevent important assignments from being lost in chat history.

## E.3. Project and Task Management

### Tool Evaluation

The team considered several project management platforms suitable for Scrum-based collaboration.

| Tool   | Advantages                                                                                         | Limitations                                                      |
| ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Trello | Simple Kanban interface and low learning curve                                                     | More limited native support for structured Scrum management      |
| Asana  | Flexible task organization and collaboration features                                              | Some advanced project management features may depend on the plan |
| Jira   | Scrum boards, Sprint management, issue tracking, configurable workflows, and detailed task history | Higher initial learning curve and configuration effort           |

### Selected Tool: Jira

**Jira** was selected as the central project management tool because it provides structured support for Scrum and enables the team to track individual contributions throughout each Sprint.

Jira is particularly appropriate for the assignment because the course requires evidence of task creation, assignment, and completion.

### Planned Application

All project-related work will be tracked in Jira, including:

- Requirement analysis and research.
- Self-training activities.
- Documentation and report writing.
- Software design and implementation.
- Testing and defect resolution.
- Repository and development environment configuration.

Each task must have **exactly one assigned team member**. Members may collaborate, but one person remains responsible for the task's completion and updates.

The team will follow these task management requirements:

1. Create and assign tasks **before** work begins.
2. Record the creation date and assignment date.
3. Record the actual completion date when the task is finished.
4. Update task statuses to reflect real progress.
5. Include screenshots of all relevant Jira tasks in weekly reports, as required by the course.

Tasks must not be created retrospectively and marked as completed immediately after the work has already been performed.

### Selection Rationale

Jira provides a centralized record of responsibilities, progress, and deliverables. Its structured workflow supports transparent evaluation of teamwork and helps the team identify delays or blockers during Sprint meetings.

## E.4. Version Control and Code Collaboration

### Tool Evaluation

Version control is essential for managing parallel contributions and maintaining a reliable history of source code and documentation.

The team considered common Git hosting platforms.

| Platform  | Advantages                                                                       | Limitations                                                                             |
| --------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| GitHub    | Pull Requests, code reviews, GitHub Actions, and broad developer tooling support | Some advanced repository governance features depend on the account or organization plan |
| GitLab    | Integrated repository management and CI/CD capabilities                          | May introduce additional workflow and administration complexity                         |
| Bitbucket | Git collaboration and integration with Atlassian products                        | Less aligned with the team's selected development tooling and existing repository       |

### Selected Tools: Git and GitHub

The team selected **Git and GitHub** for source code management because of their established collaboration workflow, extensive development tooling, and integration with automated quality checks.

A private repository has been established for Smart Fridge Planner:

[CSC13002-IntroToSE-Project](https://github.com/nightshade94/CSC13002-IntroToSE-Project)

The repository stores development configurations and Markdown documentation alongside application code as it is introduced.

The documentation structure is intended to separate project management, requirements, analysis and design, and testing artifacts.

### Development Workflow

The team adopts **GitHub Flow**, using short-lived branches and Pull Requests.

The planned workflow is:

1. Select an assigned Jira Issue.
2. Create a branch from the latest `main`.
3. Implement the required changes.
4. Run relevant local checks.
5. Open a Pull Request referencing the Jira Issue.
6. Complete CI checks and peer review.
7. Squash Merge approved changes into `main`.
8. Update the Jira Issue when the work is completed.

Branch names include the Jira Issue Key:

```text
feat/SFP-12-fridge-inventory
fix/SFP-18-expiry-validation
docs/SFP-25-update-requirements
```

Commit messages follow **Conventional Commits** with scopes:

```text
feat(web): add fridge inventory page SFP-12
fix(api): handle invalid food quantity SFP-18
docs(repo): update project documentation SFP-25
```

Pull Requests are expected to receive at least one peer approval before merging. More sensitive changes may require additional review.

### Selection Rationale

GitHub Flow is relatively simple and suitable for a small team. It provides a controlled process for integrating changes while allowing students to practice branching, code review, conflict resolution, and collaborative development.

The repository remains private, and credentials, API keys, and other secrets must never be committed.

## E.5. Development Environment and Quality Assurance

### Tool Identification and Evaluation

A consistent development environment helps reduce formatting differences, dependency conflicts, and integration errors.

The team evaluated several tools for repository standardization and quality assurance.

| Category               | Considered Options        | Selected Approach   | Rationale                                                 |
| ---------------------- | ------------------------- | ------------------- | --------------------------------------------------------- |
| Package Management     | npm, Yarn, pnpm           | pnpm                | Workspace support and consistent dependency management    |
| Formatting             | Prettier, Biome           | Prettier            | Widely adopted and straightforward configuration          |
| Linting                | ESLint, Biome             | ESLint (planned)    | Flexible TypeScript and React linting ecosystem           |
| Git Hooks              | Husky, Lefthook           | Husky + lint-staged | Lightweight checks on staged files                        |
| Continuous Integration | GitHub Actions, GitLab CI | GitHub Actions      | Native integration with the selected Git hosting platform |
| Testing                | Vitest, Jest              | Vitest (planned)    | Suitable for the intended Vite and TypeScript environment |

### Current Setup

The repository currently provides a shared development foundation consisting of:

- **Node.js 24 LTS:** Standardized runtime for development tooling.
- **pnpm:** Dependency and workspace management.
- **Prettier:** Consistent formatting of supported files.
- **Husky and lint-staged:** Lightweight pre-commit checks.
- **GitHub Actions:** Automated repository checks.
- **Development documentation:** Contribution guidelines, Git workflow, coding conventions, and testing strategy.

A lightweight documentation attribution system has also been developed to assist with recording contributors and reviewers in academic Markdown files. This supports the course's emphasis on individual accountability and documented collaboration.

### Planned Improvements

The intended application technology stack includes:

- React, Vite, and TypeScript for frontend development.
- Node.js, Express, and TypeScript for backend development.
- ESLint for static code analysis.
- Vitest, React Testing Library, and Supertest for automated testing.

As the applications are initialized, the team plans to extend GitHub Actions to include linting, type checking, automated tests, and build verification.

No mandatory test coverage threshold is planned during the initial development stage. The team will prioritize meaningful tests and reliable development practices before introducing stricter quality requirements.

### Selection Rationale

The selected tools provide a practical balance between code quality and usability. Automated formatting and repository checks help reduce avoidable errors, while lightweight configurations allow students to focus on learning essential Software Engineering practices.

## E.6. Specification-Driven and AI-Assisted Development

### Tool Evaluation

Specification-driven development (SDD) encourages developers to define expected software behavior before implementation. This approach is particularly useful when working with AI coding assistants because it provides clearer requirements and reduces ambiguity.

The team considered the following approaches.

| Tool / Approach       | Advantages                                                                                                      | Limitations                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Manual Specifications | Simple, flexible, and does not require additional tools                                                         | More manual effort to maintain consistency between requirements and implementation |
| GitHub Spec Kit       | Structured workflow from specification and planning to implementation; directly aligns with course requirements | Requires learning a new workflow and maintaining specification artifacts           |
| OpenSpec              | Lightweight, iterative, and designed for AI-assisted specification management                                   | Additional tooling and potential overlap with existing project documentation       |

### Selected Tool: Spec Kit

The course explicitly requires **Spec Kit** starting from PA2. Therefore, the team plans to initialize and adopt Spec Kit as the primary specification-driven development tool.

OpenSpec was also considered because of its flexible, change-oriented workflow. However, it is not selected as a replacement for Spec Kit, and any additional adoption would depend on project needs and instructor approval.

### Planned Application

Starting from PA2, the team intends to use Spec Kit to support:

1. Defining feature requirements and expected behavior.
2. Reviewing specifications before implementation.
3. Preparing technical plans and implementation tasks.
4. Guiding AI-assisted code generation.
5. Verifying implementation against the agreed specifications.

Specifications will complement the project's formal requirements documentation and Jira task records rather than replace them.

### AI Coding Assistants

All five team members have registered for AI coding accounts.

AI coding assistants may support requirement exploration, technical research, implementation, debugging, test generation, and documentation.

However, AI-generated results must be reviewed by the responsible team members. The team remains accountable for requirement correctness, implementation quality, and the final submitted deliverables.

### Selection Rationale

Spec Kit was selected to satisfy course requirements and provide a structured approach to AI-assisted development. Its intended use supports the educational goal of connecting requirements, design decisions, implementation, and verification.

## E.7. Overall Workflow Integration

The selected tools serve complementary roles within the development process.

| Development Activity                   | Primary Tool         |
| -------------------------------------- | -------------------- |
| Assignment submission                  | Moodle               |
| Course announcements and discussions   | Facebook Group       |
| Internal communication                 | Messenger            |
| Sprint planning and task tracking      | Jira                 |
| Specification-driven development       | Spec Kit (from PA2)  |
| Implementation support                 | AI Coding Assistants |
| Version control and code review        | GitHub               |
| Automated repository checks            | GitHub Actions       |
| Documentation and contribution records | GitHub repository    |

The intended collaboration process connects these tools as follows:

**Sprint Planning → Jira Task Assignment → Specification & Planning → Implementation → GitHub Pull Request → CI & Code Review → Sprint Review**

This process provides traceability from task allocation to completed deliverables. Jira records task ownership and progress, GitHub records implementation history and reviews, and specification artifacts document expected system behavior.

The team intends to keep the workflow lightweight and adjust supporting practices as members gain experience.

## E.8. Conclusion

The Smart Fridge Planner team has selected a development toolset that balances course requirements, professional Software Engineering practices, and the capabilities of a five-member student team.

Scrum provides the overall development process, Jira supports task management and accountability, Messenger enables daily communication, and GitHub provides collaborative version control. Repository tooling and GitHub Actions support consistency and quality assurance.

Spec Kit is planned for adoption from PA2, while AI coding assistants will support development under human supervision.

Together, these tools are expected to improve communication, task transparency, development quality, and traceability of individual contributions. The team's priority is not to maximize the number of tools used, but to establish a **practical, maintainable, and accountable development workflow** that supports both project delivery and the learning objectives of the course.
