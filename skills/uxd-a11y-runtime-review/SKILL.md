---
name: uxd-a11y-runtime-review
description: Evaluate scoped browser tasks using available keyboard, semantic, visual, automated and human AT evidence methods.
---

# Review a running accessible experience
## Work

Confirm URL/routes, setup, test data, relevant states, support matrix and capabilities. Use available installed browser/testing tools; do not require a specific vendor’s MCP. Respect the requested review or fix scope. Report unavailable methods as Not tested.

Run applicable full-page and significant-overlay scan scopes with recorded tool/version/profile. Separate scanner violations, best practices and incomplete/manual results. Exercise actual widget keys, focus, pointer alternatives, reflow/preferences and dynamic transitions according to the chosen checks and patterns.

Select [React](../shared/runtime-react.md) and/or [Web Component](../shared/runtime-wc.md) runtime guidance independently of the provider. Inspect actual rendered semantics; known tool limitations require another evidence method, not semantic changes just to satisfy a scanner.

Human AT observation must record actual environment and task results. Browser trees, generated narration and simulated personas cannot be relabeled as an AT test.

## Handoff

Consolidate by stable check/task/target/state. Keep expected/actual evidence, impact, confidence, owner and coverage gaps. Never report overall success while applicable required methods remain untested.

## Shared context

Read [the contract](../shared/contract.md) for scoped inputs, result states and evidence requirements. Select only applicable rule IDs from [the shared catalog](../shared/catalog.json), using role, task, lifecycle stage and actual target. Related WCAG IDs require applicability/exception review; policy and APG guidance are not automatically WCAG failures.

Use [provider selection](../shared/providers.md) when a design-system component is involved. Framework and provider are independent; support mixed React/Web Component pages. Prefer installed documentation and versioned sources. Missing capability or evidence is Not tested, never a pass.
