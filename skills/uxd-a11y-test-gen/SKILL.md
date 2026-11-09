---
name: uxd-a11y-test-gen
description: Turn an identified accessibility expectation or failure into tests using the project’s installed framework and real components.
---

# Generate targeted accessibility tests
## Work

Detect the project’s real test runner, dependencies, conventions, component imports, selectors and setup. Confirm a meaningful target/check and expected behavior before writing tests. Read the applicable [React](../shared/runtime-react.md) or [Web Component](../shared/runtime-wc.md) reference and provider docs.

Generate a small targeted regression using real components. Cover meaningful name/state/focus/keyboard transitions and applicable axe checks. Do not introduce unsupported matchers, imaginary PF attributes, undeclared real-event helpers or a different mocking API. Distinguish browser and jsdom limitations.

Execute supported tests when the task/environment permits. A useful regression passes on the valid behavior and fails on the relevant defect; do not claim generated text or a regex judge proves runtime correctness. Do not install dependencies without applicable authorization.

## Handoff

Report changed files, commands actually run, observed outcomes and remaining manual/AT checks. If execution was unavailable, call the tests generated but unverified. Preserve original finding IDs for retest.

## Shared context

Read [the contract](../shared/contract.md) for scoped inputs, result states and evidence requirements. Select only applicable rule IDs from [the shared catalog](../shared/catalog.json), using role, task, lifecycle stage and actual target. Related WCAG IDs require applicability/exception review; policy and APG guidance are not automatically WCAG failures.

Use [provider selection](../shared/providers.md) when a design-system component is involved. Framework and provider are independent; support mixed React/Web Component pages. Prefer installed documentation and versioned sources. Missing capability or evidence is Not tested, never a pass.
