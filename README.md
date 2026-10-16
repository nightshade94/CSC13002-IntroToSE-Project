# Repository Overview

This project is a proposed smart food management web application designed to help users track the food stored in their refrigerators, plan meals, and make more efficient use of available ingredients through AI-powered features.

The project is developed by **Group 07 - IntroSE 24C02** as part of the **Introduction to Software Engineering (CSC13002)** course.

> **Project Status:** The project is currently in the requirements analysis, system design, and development environment setup stages. The features described below represent the planned product scope and have not yet been implemented.

## 1. Introduction

### Background

Managing food at home can present several challenges in everyday life, including:

- Losing track of the ingredients currently available in the refrigerator.
- Food expiring or spoiling because it is not used in time.
- Difficulty deciding what to cook based on available ingredients.
- Spending too much time recording and tracking groceries after shopping.
- Lack of a shared platform for household members to manage food supplies and meal plans.

The system aims to address these challenges by combining food inventory management, meal planning, and AI-powered capabilities within a single web platform.

### Product Objectives

- **Food Inventory Management:** Track food items, quantities, storage locations, and estimated expiration dates.
- **Food Waste Reduction:** Help identify ingredients that should be prioritized for use.
- **Recipe Recommendations:** Suggest recipes based on currently available ingredients.
- **Meal Planning:** Support meal plan creation and efficient food utilization.
- **Household Collaboration:** Allow household members to collaboratively manage shared food storage.
- **Extended Integrations:** Explore opportunities for community features and promotional programs offered by businesses and partners.

## 2. Technology Stack and Architecture

### Current Repository Status

The repository currently contains the foundational development setup. No frontend or backend application source code has been implemented yet.

The following tools are currently in use:

| Component              | Technology          |
| ---------------------- | ------------------- |
| Tooling Runtime        | Node.js 24 LTS      |
| Package Manager        | pnpm 10.32.1        |
| Code Formatter         | Prettier            |
| Git Hooks              | Husky + lint-staged |
| Continuous Integration | GitHub Actions      |

### Planned Technology Stack

The team plans to develop the application using a full-stack monorepo architecture.

The proposed application structure is as follows:

```text
apps/
├── web/         # Frontend
└── api/         # Backend

packages/
└── shared/      # Shared types and schemas, as needed
```

Architectural decisions will continue to be documented in the [architecture documentation](docs/architecture/overview.md).

## 3. Development Environment Setup

### Prerequisites

- Git.
- Node.js **24 LTS**.
- pnpm **10.32.1**.

If you use nvm:

```bash
nvm install 24
nvm use 24
```

Install pnpm:

```bash
npm install --global pnpm@10.32.1
```

### Clone and Install

```bash
git clone https://github.com/nightshade94/CSC13002-IntroToSE-Project.git
cd CSC13002-IntroToSE-Project

pnpm install
pnpm format:check
```

Running `pnpm install` configures the Git hooks through the `prepare` script. If the hooks have not been activated, run:

```bash
pnpm run prepare
```

Currently, the repository only provides development tooling. There is no application available to run using `pnpm dev` yet.

### Available Commands

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm install`      | Install dependencies and set up Git hooks      |
| `pnpm format`       | Format supported files                         |
| `pnpm format:check` | Check source code and documentation formatting |

The `dev`, `lint`, `typecheck`, `test`, and `build` commands will be added once the corresponding applications are initialized.

### Environment Variables

The repository currently does not require a `.env` file or any external service accounts.

When API, database, or AI service configuration becomes necessary, the team will provide a `.env.example` file containing safe placeholder values.

Do not commit API keys, passwords, or other secrets to the repository.

## 4. Current Repository Structure

```text
.github/              # GitHub Actions, issue and PR templates
.husky/               # Git hooks
docs/en(vi)_version/  # Documentation in English and Vietnamese
├── architecture/     # Architecture documentation
└── development/      # Collaboration, coding, and testing guidelines

package.json          # Shared scripts and development tools
pnpm-workspace.yaml   # Workspace configuration
pnpm-lock.yaml        # Dependency lockfile
README.md             # Project overview
CONTRIBUTING.md       # Contribution guidelines
```

The repository structure will be expanded as the team begins application development.

## 5. Development Workflow and Collaboration

The team follows **GitHub Flow**, integrating **Jira** for project management and **GitHub** for source code management, Pull Requests, and Code Reviews.

Responsibilities are divided as follows:

- **Jira:** Issue tracking, task assignment, prioritization, and progress monitoring.
- **GitHub:** Source code management, feature branches, Pull Requests, and Code Reviews.
- **GitHub Actions:** Automated quality checks and Continuous Integration (CI).

### Development Workflow

The team follows an Issue-driven development process:

```text
Create / Assign Jira Issue
          ↓
Move Issue to In Progress
          ↓
Create Feature Branch
          ↓
Implement & Test
          ↓
Open GitHub Pull Request
          ↓
CI Checks & Code Review
          ↓
Squash Merge into main
          ↓
Move Jira Issue to Done
```

Jira Issues are managed through a Kanban board with the following statuses:

`Backlog → Ready → In Progress → In Review → Done`

Issue status updates can be performed manually or automated through Jira-GitHub integration when configured.

### Branch Naming Convention

Each development branch should reference its corresponding Jira Issue Key.

Format:

```text
<type>/<JIRA-KEY>-<description>
```

Examples:

```text
feat/SFP-12-fridge-inventory
fix/SFP-18-expiry-date-validation
docs/SFP-25-update-requirements
```

Here, `SFP-12` represents a Jira Issue Key. Replace `SFP` with the actual Jira Project Key if different.

### Commit Message Convention

Commit messages follow **Conventional Commits** with scopes and Jira Issue Keys.

Format:

```text
<type>(<scope>): <description> <JIRA-KEY>
```

Examples:

```text
feat(web): add fridge inventory page SFP-12
feat(api): implement ingredient endpoint SFP-15
fix(api): handle invalid expiry date SFP-18
docs(repo): update project overview SFP-25
```

### Pull Requests and Code Review

Each Pull Request should:

- Reference the corresponding Jira Issue Key in its title and description.
- Include a short summary of changes and relevant testing information.
- Pass the required GitHub Actions CI checks.
- Receive at least **one approval from another team member** before merging.
- Use **Squash Merge** to maintain a clean history on `main`.

For critical changes involving authentication, database schemas, shared API contracts, or CI configuration, two approvals are recommended when practical.

After merging, the Jira Issue should be verified and moved to `Done`. Automatic status transitions require additional Jira Automation configuration.

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 6. Learning Objectives

In addition to building the application, the project aims to provide hands-on experience with activities throughout the software development lifecycle:

- Gathering and analyzing requirements.
- Identifying actors, use cases, and system boundaries.
- Designing system architecture and data models.
- Managing development tasks using GitHub Issues and Projects.
- Collaborating through Git and Pull Requests.
- Implementing and testing software.
- Integrating automated checks through CI.
- Writing documentation and managing changes.

The team prioritizes **development process quality, effective collaboration, and the completeness of core functionality** over implementing a large number of features within a limited timeframe.

## 7. Development Team

The project is developed by **Group 07 - IntroSE 24C02** as part of the **Introduction to Software Engineering (CSC13002)** course.

Detailed information about team members and their responsibilities will be added once the team has finalized role assignments.

## 8. Internal Documentation

- [Contribution Guidelines — CONTRIBUTING.md](CONTRIBUTING.md)
- [Architecture Overview](docs/architecture/overview.md)
- [GitHub Setup](docs/development/github-setup.md)

---

_Smart food management, efficient meal planning, and a commitment to reducing food waste._

_Project — CSC13002: Introduction to Software Engineering._

_Faculty of Information Technology, University of Science._
