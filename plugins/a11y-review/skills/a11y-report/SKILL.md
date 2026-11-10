---
name: a11y-report
description: Consolidate supplied accessibility observations into a scoped report preserving findings, evidence origins, conflicts, and coverage gaps. This draft understands modal-dialog checks; it does not execute an audit or certify conformance.
---

# Summarize accessibility findings

Use the [shared review guide](../../references/review-guide.md), especially its consolidation rules. Establish scope from the supplied work or validate the existing scope; do not require a separate planning task.

## Consolidate

Inventory supplied results, findings, evidence, methods, environments, revisions, and missing artifacts. Group shared causes without losing occurrences, IDs, or unresolved findings. Preserve unknown check IDs with an unresolved mapping; use the [pilot catalog](../../references/checks.json) only when interpreting known IDs.

A source Pass cannot cancel a keyboard Fail. Preserve a substantiated failure as Fail even when a comparable repeat passes; mark the behavior intermittent and retain both observations. Use Inconclusive only when the evidence cannot establish whether a failure occurred. Newer passing results do not close older findings without matching retest evidence. Retain browser/state gaps and distinguish tool omissions or harmless tree differences from confirmed browser defects.

Load the [modal reference](../../references/modal-dialog.md) only to resolve expectations or authority. Do not invent evidence, standards mappings, or impact; label unverifiable supplied claims accordingly. Preserve corrections to component/browser/tool attribution without deleting the underlying observations. Keep source naming defects, browser-computed names, and supplied manual screen-reader results distinct.

## Return

Lead with the important findings and next actions. For a small request, a concise summary and limitations note are enough. For a full audit/handoff, include scope/environment, grouped findings with retained occurrences, method/browser/state coverage, conflicts, and remaining work using the shared guide's detailed record fields. Completion percentages do not establish product conformance. Save only when requested; reporting does not imply publishing or issue filing.
