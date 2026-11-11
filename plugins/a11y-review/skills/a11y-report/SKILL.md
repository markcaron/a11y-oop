---
name: a11y-report
description: Consolidate supplied accessibility observations into a scoped report preserving findings, evidence origins, conflicts, and coverage gaps. This draft understands modal-dialog and ordinary-form checks; it does not execute an audit or certify conformance.
---

# Summarize accessibility findings

Use the [shared review guide](../../references/review-guide.md), especially its consolidation rules. Establish scope from the supplied work or validate the existing scope; do not require a separate planning task.

## Consolidate

- Inventory supplied results, findings, evidence, methods, environments, revisions, and missing artifacts.
- Trace each summary claim to its supporting record; do not transfer outcomes across targets or rank evidence methods universally.
- Group findings by supported shared causes without losing occurrences, IDs, or unresolved findings.
- Preserve unknown check IDs with an unresolved mapping; use the [pilot catalog](../../references/checks.json) only when interpreting known IDs.
- Apply the [consolidation rules](../../references/review-guide.md#combining-results) for statuses, conflicting results, attribution, retests, and coverage gaps. Preserve unresolved findings and their supporting observations.
- Load the relevant [modal](../../references/modal-dialog.md) or [form](../../references/forms.md) reference only to resolve expectations or authority.
- Do not invent evidence, standards mappings, or impact; label unverifiable supplied claims accordingly.
- Keep source naming defects, browser-computed names, and supplied manual screen-reader results distinct.

## Return

Lead with the important findings and next actions.

- For a small request, a concise summary and limitations note are enough.
- For a full audit/handoff, include scope/environment, grouped findings with retained occurrences, method/browser/state coverage, conflicts, and remaining work using the shared guide's detailed record fields.
- Completion percentages do not establish product conformance.
- Save only when requested; reporting does not imply publishing or issue filing.
