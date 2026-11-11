---
name: a11y-source-audit
description: Review modal-dialog or ordinary-form source and diffs for accessibility defects and implementation risks. This draft covers modal behavior and form labeling, grouping, validation, and recovery and produces source findings plus a runtime verification queue; it does not execute browser tests.
---

# Review accessibility source

Use the [shared review guide](../../references/review-guide.md); keep scope and output proportional to the request.

- Load [modal expectations](../../references/modal-dialog.md) for dialogs or [form expectations](../../references/forms.md) for ordinary controls, labels, groups, and validation. Load both for a form inside a modal.
- Use [check IDs](../../references/checks.json) when structured tracking is useful.
- For requests outside these patterns, explain the reference coverage limit and route to an available general accessibility capability or offer ordinary review with the limitation.
- For mixed scope, review supported portions and identify remaining work; do not apply modal checks to an ordinary form.

## Review

Inspect requested files/diffs and enough dependencies to trace relevant behavior.

- Trace the relationships, handlers, and state transitions needed to assess the selected pattern expectations.
- Follow project instructions; record file/line and revision when known.
- Distinguish consumer inputs from component-owned behavior.
- Verify installed provider versions, APIs, and available internals before recommending changes; missing docs are a limitation, not permission to invent an API.
- Account for native/browser-provided behavior before identifying missing implementation code or ARIA as a defect.
- Distinguish a broken naming relationship from an unverified computed name.
- For API/event issues, explain the accessibility impact or qualify it as an untested consumer risk.
- In React, trace forwarded props, generated IDs, conditional rendering, and portals.
- For Web Components, follow slots, shadow roots, and ElementInternals; load the [cross-root reference](../../references/web-components/cross-root-relationships.md) when relationships cross roots.
- Load [naming](../../references/names-and-descriptions.md) or [native focus](../../references/focus-and-native-dialogs.md) detail only as needed.

For component-author reviews that include examples, inspect relevant demos/snippets for correct usage and state coverage. Do not expand a consumer request into unrelated documentation work.

## Return

Lead with evidence-backed findings and suggested changes, then list runtime checks still needed.

- Identify source inference as source inference; do not claim keyboard or AT execution.
- Preserve unresolved finding IDs.
- For a detailed audit or handoff, use the shared guide's record fields and [browser requirements](../../references/browser-coverage.md).
- Stay read-only unless fixes were requested.
