---
name: a11y-source-audit
description: Review source or a diff for accessibility defects and implementation risks. This draft covers modal dialogs and produces source findings plus a runtime verification queue; it does not execute browser tests.
---

# Review modal source

## Scope and records

Read [scope](../../contracts/scope.md), [results](../../contracts/results.md), and [handoffs](../../contracts/handoffs.md). Reuse scope or establish it yourself. This draft covers modals only; record other patterns as coverage gaps.

## Work

Read the [source method](../../methods/source-inspection.md). For modals, load the [modal reference](../../library/patterns/modal-dialog.md) and applicable IDs from the [catalog](../../checks/catalog.json). Load naming and native/focus support when those questions arise.

Trace opening/closing, naming, state, and focus contracts. Resolve installed provider APIs before recommending changes. Distinguish missing consumer inputs from component-owned behavior. Preserve native and ElementInternals semantics; absent custom trap code alone does not prove a bug.

## Return

Give scope, file/line evidence, per-check source results, findings with authority/impact/confidence, limitations, and specific runtime steps. Preserve existing IDs. Do not label source inference as keyboard or AT execution. Apply [coverage rules](../../contracts/coverage.md) when summarizing. Suggest fixes without editing unless requested.

For shadow-root relationships, load the [cross-root reference](../../library/runtimes/web-components/names-and-cross-root-relationships.md). Hand off required browser/state verification and inspected demo/doc coverage when component-author scope includes examples.
