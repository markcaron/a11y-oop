---
name: uxd-a11y-source-audit
description: Review semantic HTML, component APIs and accessibility relationships in a scoped source target or diff.
---

# Review accessibility in source
## Work

Select applicable checks and inspect real markup/components, styles and state logic. Prefer native semantics; inspect action/navigation intent, names/labels, relationships, heading/table structure and hidden/inert/focus consistency. Read exact pattern guidance only for detected custom widgets.

Resolve provider/version before making API recommendations. For PF, verify required state on the control rather than assuming FormGroup labels propagate it; distinguish helper-text styling, error association and a live region. For RHDS, distinguish visual danger state from aria-invalid and document consumer label/content duties.

Read the relevant [React](../shared/runtime-react.md) or [Web Component](../shared/runtime-wc.md) reference. Do not demand redundant ARIA when native or ElementInternals semantics already meet the contract.

## Handoff

Return evidence-backed source findings with location, expectation, actual behavior inferred from source, impact, confidence, owner and a runtime verification plan. Preserve read-only scope unless changes were requested. Source review cannot establish all A/AA conformance or actual announcement behavior.

## Shared context

Read [the contract](../shared/contract.md) for scoped inputs, result states and evidence requirements. Select only applicable rule IDs from [the shared catalog](../shared/catalog.json), using role, task, lifecycle stage and actual target. Related WCAG IDs require applicability/exception review; policy and APG guidance are not automatically WCAG failures.

Use [provider selection](../shared/providers.md) when a design-system component is involved. Framework and provider are independent; support mixed React/Web Component pages. Prefer installed documentation and versioned sources. Missing capability or evidence is Not tested, never a pass.
