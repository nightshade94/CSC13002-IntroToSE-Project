# Architecture Overview

## System Overview

The system is a proposed web application developed by Group 07 - IntroSE 24C02 as part of the **Introduction to Software Engineering (CSC13002)** course. It aims to support household food inventory management, estimated expiration date tracking, and meal planning to reduce food waste.

The food inventory serves as the foundation for recipe recommendations and ingredient utilization planning. AI is intended to assist with recommendations, while users retain control over meal choices and how ingredients are used.

See the [README](../../README.md) for the complete product vision and scope.

## Current Implementation Status

The repository does not yet contain frontend/backend application code, a database, or business APIs. The following development tools are currently available:

- Node.js 24 LTS for development tooling and pnpm 10.32.1 for dependency management.
- Prettier; Husky + lint-staged for formatting supported staged files.
- GitHub Actions configured to install dependencies using a frozen lockfile and perform formatting checks.

The `pnpm-workspace.yaml` file currently contains `packages: []`, with no workspace packages defined.

React, Vite, Express, TypeScript, ESLint, and testing frameworks have **not yet been implemented**.

The CI configuration in the repository does not confirm whether CI checks have passed or whether branch protection rules are enabled on GitHub.

## Proposed Architecture

The planned architecture follows a full-stack monorepo approach, using TypeScript for both the frontend and backend.

The following diagram illustrates the conceptual system flow only; these components have not yet been implemented:

```text
User / Browser
      |
      v
React + Vite Frontend
      |
      | HTTP / REST API
      v
Node.js + Express Backend
      |
      +---- Database (TBD)
      |
      +---- AI Service (TBD)
```

The backend is expected to handle business logic, data access, and AI service integration.

The team has not yet selected a database, ORM, AI provider, or authentication approach.

API keys and sensitive connection credentials must remain on the backend when external services are integrated.

## Functional Areas

The following functional areas are identified for requirements analysis. Their inclusion does not imply that all features will be part of the MVP.

| Functional Area                  | Planned Capabilities                                                                                                  | Scope                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Authentication & User Management | User registration, login, and account management                                                                      | Proposed priority                         |
| Fridge & Food Inventory          | Manual food entry, inventory updates, and quantity management                                                         | Proposed priority                         |
| Food Expiration Tracking         | Estimated expiration date tracking, identification of soon-to-expire items, and consideration of notification methods | Proposed priority                         |
| Recipe Recommendation            | Ingredient-based recipe suggestions, prioritizing items that should be used soon                                      | Proposed priority                         |
| Meal Planning                    | Basic meal planning capabilities                                                                                      | Proposed priority                         |
| Household Collaboration          | Shared household food inventory and meal plans                                                                        | Under consideration; not committed to MVP |
| Community                        | Sharing posts and recipes, with community interactions                                                                | Future extension; not committed to MVP    |
| Business & Promotions            | Promotional offers and business partner integrations                                                                  | Future extension; not committed to MVP    |
| Administration                   | Account or content administration based on actual requirements                                                        | Scope to be clarified                     |

Receipt OCR, AI-based expiration date estimation, and aggregated consumption trend analysis are also under consideration.

The system must not assume the collection, sharing, or commercialization of user data by default.

AI-estimated expiration dates are for reference only and must not replace product labels or official storage instructions.

## Proposed Actors

- **User:** Manages food inventory and meal plans and uses recipe recommendations.
- **Admin:** Performs administrative functions within the agreed project scope; specific permissions have not yet been defined.
- **Business Partner — Under Consideration:** May manage offers or promotional campaigns if business-oriented features are included. This role should only be modeled as an actor if business partners interact directly with the system. It has not been confirmed as an MVP actor.

## Proposed Monorepo Structure

```text
apps/
├── web/         # Frontend
└── api/         # Backend

packages/
└── shared/      # Create only when types/schemas are genuinely shared
```

When initializing applications, update the workspace configuration and scripts to reflect the actual project structure.

Do not create a shared package solely to complete the proposed directory structure.

## Open Architectural Decisions

- Finalize the technology stack and MVP boundaries, particularly household collaboration, notifications, and OCR.
- Select the database, determine whether an ORM is necessary, and define the data management approach.
- Define authentication, session management, and authorization mechanisms.
- Select an AI provider, establish an integration strategy, and define fallback behavior when the service is unavailable.
- Determine recipe data sources, usage rights, and data quality requirements.
- Define the deployment architecture and environment configuration.
- Establish privacy requirements, including data collection, retention periods, user consent, and data sharing boundaries.

Document each decision and its brief rationale in the relevant Issue or Pull Request, then update the documentation to reflect the actual implementation.

## Architectural Principles

Separate the user interface, request handling, and business logic when doing so improves code clarity and maintainability. Clearly define API inputs, outputs, and error responses.

Validate external input, handle errors explicitly, and store secrets in environment configuration.

Maintain a codebase structure that is easy to navigate, and introduce abstractions only when there is a demonstrated need.

Microservices and complex multilayer architectures are not necessary at the current stage of the project.
