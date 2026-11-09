---
name: uxd-a11y-design
description: Review designs and specify reading order, contrast, adaptation, focus, states and alternatives before implementation.
---

# Specify accessible interaction intent
## Work

Use relevant VIS, INT, STR, FRM and TAB records. Identify the pattern and variant, action versus navigation, reading order, key expectations, initial/return focus, hidden/disabled states and dynamic-message intent.

Review contrast with actual foreground/background/state information. Do not infer computed contrast from an unknown background or screenshot alone. Specify resize/reflow/text-spacing, orientation, target size/spacing exceptions and motion/forced-color behavior where applicable.

Annotate meaningful alternatives and content dependencies. A modal dialog, disclosure, combobox and tooltip do not share one focus rule. Distinguish design policy and stronger AAA goals from the project’s baseline.

## Handoff

Provide design findings plus a compact implementation and verification contract tied to task/check IDs. State which expectations are visible, specified or still untested. A screenshot cannot establish keyboard, accessibility-tree or human AT success.

## Shared context

Read [the contract](../shared/contract.md) for scoped inputs, result states and evidence requirements. Select only applicable rule IDs from [the shared catalog](../shared/catalog.json), using role, task, lifecycle stage and actual target. Related WCAG IDs require applicability/exception review; policy and APG guidance are not automatically WCAG failures.

Use [provider selection](../shared/providers.md) when a design-system component is involved. Framework and provider are independent; support mixed React/Web Component pages. Prefer installed documentation and versioned sources. Missing capability or evidence is Not tested, never a pass.
