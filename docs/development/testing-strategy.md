# Testing Strategy

Guidelines for Group 07 - IntroSE 24C02.
The goal is to verify meaningful behavior through readable and maintainable tests.

## Current Status

The repository does not yet contain frontend/backend applications, a test runner, test cases, or a `test` script.
CI is currently configured only to install dependencies using the lockfile and check formatting.
`pnpm format:check` is not a functional test.

## Planned Tools

Based on the proposed direction in the [README](../../README.md), the team plans to use:

| Tool                  | Purpose                                     |
| --------------------- | ------------------------------------------- |
| Vitest                | Run unit/integration tests                  |
| React Testing Library | Test React UI through user-visible behavior |
| Supertest             | Send HTTP requests to test Express APIs     |

These tools have not yet been installed or configured; confirm them alongside the technology stack when initializing the applications.
Do not introduce E2E testing or coverage thresholds at this stage.

## Planned Test Types and Examples

**Unit tests:** Verify pure functions, business logic, and validation independently.
Examples include invalid expiration date data, food prioritization rules, and ingredient-based recipe filtering.
For each important rule, consider normal cases, boundary cases, and invalid inputs.
When testing date-related logic, use a fixed point in time so tests do not depend on the execution date.

**Integration tests:** Verify Express endpoints, status codes, responses, and error handling.
Once a database is available, test critical data interactions in an isolated test environment;
do not use real user data. Add authorization tests when authentication features are implemented.

**UI tests:** Verify what users see and the outcomes of their actions, such as an error message
when a food item is submitted without a name. Avoid relying on internal function names or component structures unrelated to behavior.

**AI integration:** Once implemented, test how the application handles valid responses, malformed responses, and service failures.
Use small sample responses instead of real AI API calls in automated tests to avoid network dependencies, costs, and nondeterministic wording.

## Testing Policy

- Add or update tests when introducing or modifying important business logic.
- Verify key API behavior, including invalid inputs and relevant processing errors.
- Add regression tests for bug fixes when feasible.
- Documentation-only PRs do not require new tests; not every PR must add tests.
- Write test names that describe behavior and use meaningful assertions; avoid tests that merely mirror the implementation.
- Mock external dependencies only when necessary, and avoid complex mocking setups.

## Running Checks

Currently, `pnpm format:check` can be used to check formatting.
**Future command:** Use `pnpm test` only after the team adds an actual script;
it is not currently available. Workspace-specific test instructions have not been defined because workspace packages do not yet exist.

When initializing the applications, add at least one meaningful frontend behavior test and one API test,
a single-run test script suitable for CI, and update the README and the corresponding workflow in the implementation PR.
Watch mode or coverage reporting may be added if useful, but no mandatory coverage threshold is required.
