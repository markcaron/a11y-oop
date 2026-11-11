---
name: a11y-keyboard-test
description: Test modal-dialog and ordinary-form keyboard operation, validation recovery, and focus in a running interface, or prepare explicit unexecuted steps when browser capabilities are unavailable. Use for live keyboard review rather than source-only analysis.
---

# Test keyboard behavior

Use the [shared review guide](../../references/review-guide.md).

- Select [modal expectations](../../references/modal-dialog.md), [form expectations](../../references/forms.md), or both for forms inside modals.
- Establish minimal scope yourself or reuse the supplied review.
- Select [browser coverage](../../references/browser-coverage.md) from project support needs; record unavailable environments as gaps.

## Test

Confirm the running target/build, task, data/auth setup, and available input/focus observation. Record browser/OS, keyboard settings, and other relevant conditions. Follow the keyboard sequence in each selected pattern reference; combine applicable sequences for mixed scope.

- Reach the target, perform the scoped task and state transitions, and record expected versus observed behavior.
- Record focus visibility separately as visual evidence; keyboard movement alone cannot establish it.
- Use safe test data and stop before unauthorized transactions or destructive actions.
- Repeat in required available browsers.
- A focused shadow host alone does not prove focus escaped; inspect the focus chain.
- Use browser-driven key input, including browser automation that performs keyboard actions. Dispatching KeyboardEvent objects or walking elements with .focus() does not test native Tab order.
- For accessible open shadow roots, start with document.activeElement and repeatedly follow element.shadowRoot.activeElement while present; record the chain. If closed roots or tool limitations hide the endpoint, report that limitation instead of assuming escape or success.

When computed semantics are in scope, use [rendered-semantic verification](../../references/rendered-semantics.md) and keep that evidence separate. Otherwise hand off those questions. Keyboard actions alone do not prove accessible relationships or human AT announcements.

## Return

Give actual steps, observed behavior, findings, and gaps, with evidence proportionate to the task.

- If execution is unavailable, provide manual steps and Not tested results; ambiguous attempted observation is Inconclusive.
- Proposed scripts, screenshots alone, and clean axe scans are not keyboard execution evidence.
- Preserve source handoff findings when builds differ.
- Stop before unauthorized destructive actions; do not modify the implementation unless requested.
