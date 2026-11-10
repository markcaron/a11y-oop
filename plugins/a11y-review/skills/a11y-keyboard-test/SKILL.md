---
name: a11y-keyboard-test
description: Test modal-dialog keyboard operation and focus in a running interface, or prepare explicit unexecuted steps when browser capabilities are unavailable. Use for live keyboard review rather than source-only analysis.
---

# Test modal keyboard behavior

## Scope and records

Read [scope](../../contracts/scope.md), [results](../../contracts/results.md), and [handoffs](../../contracts/handoffs.md). Reuse scope or establish it yourself. This draft covers modals only; record other patterns as coverage gaps.

## Work

Read the [keyboard method](../../methods/keyboard-testing.md), [modal reference](../../library/patterns/modal-dialog.md), and [catalog](../../checks/catalog.json). Load naming and native/focus support only as needed.

Identify opener, target, transitions, and input/focus capabilities. Execute the scoped sequence when possible and record actual focused elements and outcomes. Validate source handoffs against the running revision; retain findings when builds differ.

Without execution, return applicable Not tested records and runnable manual steps. If attempted observation is ambiguous, use Inconclusive. Scripts, screenshots alone, or clean axe scans do not establish tested keyboard behavior.

## Return

Give environment, action sequence, expected/observed focus, per-check results, findings, and remaining transitions. Apply [coverage rules](../../contracts/coverage.md). Keep browser evidence separate from human AT results. Do not modify the implementation unless requested.

Use the [required browser matrix](../../methods/browser-coverage.md). Observe update/close/reopen transitions rather than only the initial open state. If semantic verification is requested, use [rendered semantics](../../methods/rendered-semantics.md); keep that evidence distinct from keyboard and AT observations.
