---
name: a11y-source-audit
description: Review modal-dialog source or a diff for accessibility defects and implementation risks. This draft covers modal dialogs and produces source findings plus a runtime verification queue; it does not execute browser tests.
---

# Review modal source

Use the [shared review guide](../../references/review-guide.md); keep scope and output proportional to the request. Load the [modal reference](../../references/modal-dialog.md) for expectations and [check IDs](../../references/checks.json) when structured tracking is useful.

For a non-modal request, explain that this pilot has no applicable reference coverage and route to an available general accessibility review capability, or offer ordinary source review with that limitation. Do not apply modal checks or imply pilot coverage. For mixed scope, review the modal portion and identify the remaining work.

## Review

Inspect the requested files/diff and enough dependencies to trace the invoker, opening/closing paths, name, entry focus, background restrictions, restoration, updates, and reopening. Follow project instructions. Record file/line and revision when known.

Distinguish consumer inputs from component-owned behavior. Verify installed provider versions, APIs, and available internals before recommending changes; missing docs are a limitation, not permission to invent an API. Correct native/browser behavior does not require handwritten trap code or redundant ARIA. Distinguish a broken naming relationship from an unverified computed name. For API/event issues, explain the accessibility impact or qualify it as an untested consumer risk.

In React, trace forwarded props, generated IDs, conditional rendering, and portals. For Web Components, follow slots, shadow roots, and ElementInternals; load the [cross-root reference](../../references/web-components/cross-root-relationships.md) when relationships cross roots. Load [naming](../../references/names-and-descriptions.md) or [native focus](../../references/focus-and-native-dialogs.md) detail only as needed.

For component-author reviews that include examples, inspect relevant demos/snippets for correct usage and state coverage. Do not expand a consumer request into unrelated documentation work.

## Return

Lead with evidence-backed findings and suggested changes, then list runtime checks still needed. Identify source inference as source inference; do not claim keyboard or AT execution. Preserve unresolved finding IDs. For a detailed audit or handoff, use the shared guide's record fields and [browser requirements](../../references/browser-coverage.md). Stay read-only unless fixes were requested.
