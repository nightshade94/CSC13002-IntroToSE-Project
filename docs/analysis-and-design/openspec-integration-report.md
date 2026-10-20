## Proposed OpenSpec Integration

**Performed by:** Dư Hoài Phúc · **Reviewed by:** Not yet · **Edited by:** None

### Purpose

The team is considering [OpenSpec](https://github.com/Fission-AI/OpenSpec), a lightweight specification-driven development tool, to make requirements clearer before implementation with AI coding assistants. The goal is to reduce misunderstandings, scope changes, and inconsistencies between expected behavior and delivered features.

### Integration with the Existing Workflow

OpenSpec would complement—not replace—the team's current tools:

| Tool               | Responsibility                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **Jira**           | Task tracking, priorities, assignments, and acceptance criteria                          |
| **OpenSpec**       | Feature specifications, behavioral scenarios, design decisions, and implementation tasks |
| **GitHub**         | Source control, pull requests, and code review                                           |
| **GitHub Actions** | Automated quality checks                                                                 |

The proposed workflow is:

`Jira Issue → OpenSpec Proposal & Review → Implementation & Tests → GitHub PR & CI → Merge → Archive Specification → Jira Done`

Each relevant OpenSpec change should reference its Jira issue key, allowing requirements, implementation, and review to be traced together.

### Adoption Scope

OpenSpec should initially be used for features with meaningful business rules or multiple implementation steps, such as **food inventory management** or **recipe recommendations**. Small bug fixes, formatting changes, and routine documentation updates do not require a specification.

The team will pilot OpenSpec on one feature before considering wider adoption. Existing academic requirements documents, including the SRS, remain the reference for agreed project requirements; OpenSpec provides more detailed, implementation-oriented specifications.

### Expected Benefits and Considerations

**Expected benefits:** clearer requirements, testable scenarios, more consistent AI-assisted implementation, and improved traceability from tasks to code.

**Considerations:** additional documentation effort, the need for human review of AI-generated specifications, and possible duplication with Jira or the SRS. To keep the process manageable for a five-member student team, specifications should be concise and created only when they add value.

**Status:** Proposed for a limited pilot; integration and effectiveness have not yet been verified.
