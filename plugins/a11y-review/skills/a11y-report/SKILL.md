---
name: a11y-report
description: Consolidate supplied accessibility observations into a scoped report preserving findings, evidence origins, conflicts, and coverage gaps. This draft understands modal-dialog checks; it does not execute an audit or certify conformance.
---

# Consolidate accessibility evidence

## Scope and records

Read [scope](../../contracts/scope.md), [results](../../contracts/results.md), and [handoffs](../../contracts/handoffs.md). Reuse scope or establish it yourself. This draft covers modals only; record other patterns as coverage gaps.

## Work

Read [coverage and consolidation](../../contracts/coverage.md). Inventory supplied scope, results, findings, methods, environments, revisions, and missing artifacts. Establish minimal scope from the supplied work if absent. Preserve unknown check IDs as supplied with an unresolved mapping; do not discard observations outside the [pilot catalog](../../checks/catalog.json).

Group causes without merging distinct methods, states, environments, or revisions. Retain unresolved occurrences and original IDs. A source pass cannot cancel a keyboard failure. Comparable conflicts stay visible and unresolved. Do not infer closure from a newer pass without matching retest evidence.

Load the [modal reference](../../library/patterns/modal-dialog.md) only to interpret an expectation or authority. Do not invent evidence, standards mappings, or impact. Label claims whose evidence cannot be checked as unverified.

## Return

Provide scope/environment, concise outcome, required-unit coverage by status/method, grouped findings with retained occurrences, conflicts/limitations, and next actions. Separate failures, recommendations, and gaps. Explain denominators and remaining methods; no completion percentage proves product conformance. Save only when requested; reporting does not authorize publication or issue filing.
