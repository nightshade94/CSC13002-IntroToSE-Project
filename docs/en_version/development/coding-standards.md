# Coding Standards

Guidelines for Group 07 - IntroSE 24C02 as part of the **Introduction to Software Engineering (CSC13002)** course.
Prettier has already been configured; TypeScript, React, Express, and ESLint mentioned below are **planned**,
and the corresponding applications and configurations do not yet exist. See the [architecture documentation](../architecture/overview.md).

## Naming and Formatting

- Use English for identifiers, configuration names, and commits; documentation is primarily written in Vietnamese.
- `camelCase`: variables and functions, such as `expiryDate` and `filterRecipes`.
- `PascalCase`: components, classes, types, and interfaces, such as `InventoryItem`.
- `kebab-case`: regular filenames, such as `expiry-validation.ts`.
- `UPPER_SNAKE_CASE`: appropriate global constants, such as `MAX_RECIPE_RESULTS`.
- Choose descriptive names, keep functions focused on one responsibility, and avoid code duplication and premature abstraction.

## Planned TypeScript Practices

- Enable `strict` when initializing the applications; no `tsconfig` exists yet.
- Declare explicit, meaningful types when they clarify function contracts or data structures; rely on type inference for simple cases.
- Avoid unnecessary `any` types; validate or narrow unknown data before using it.
- Do not use type assertions merely to bypass compiler errors; TypeScript types do not replace runtime validation.

## Planned React Practices

- Prefer small functional components focused on presentation and interaction.
- Separate complex business logic from the UI to improve readability and testability.
- Extract reusable hooks only when needed; follow the Rules of Hooks.
- Represent loading, empty, and error states when the interaction flow requires them.

## Planned Express Practices

- Distinguish routing, request/response handling, and business logic; separate files when useful.
- Do not place all business logic in route handlers, but do not require a fixed number of architectural layers.
- Validate external params, query parameters, and request bodies; handle errors and responses consistently.
- Keep API contracts clear between the frontend and backend; discuss shared contract changes in PRs.

## Code Quality

Prettier is the current formatting tool. ESLint is planned to help detect issues once application code exists.
Write readable code and keep PRs focused; use comments to explain non-obvious reasoning rather than restating the code.
Add libraries only when they provide a concrete benefit, and explain the rationale in the PR.
Refer to the [testing strategy](testing-strategy.md) when changing business logic.

## Basic Security

Do not commit credentials; use environment variables and a safe `.env.example` when needed.
Do not include API keys, tokens, or personal information in logs. Validate external data,
including AI service responses; do not assume AI-generated content is always correct.
