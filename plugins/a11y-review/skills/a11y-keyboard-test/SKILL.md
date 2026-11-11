---
name: a11y-keyboard-test
description: Test modal-dialog and ordinary-form keyboard operation, validation recovery, and focus in a running interface, or prepare explicit unexecuted steps when browser capabilities are unavailable. Use for live keyboard review rather than source-only analysis.
---

# Test keyboard behavior

Use the [shared review guide](../../references/review-guide.md). Select [modal expectations](../../references/modal-dialog.md), [form expectations](../../references/forms.md), or both for forms inside modals. Establish minimal scope yourself or reuse the supplied review. Select [browser coverage](../../references/browser-coverage.md) from project support needs; record unavailable environments as gaps.

## Test

Confirm the running target/build, task, data/auth setup, and available input/focus observation. Record browser/OS, keyboard settings, and other relevant conditions. Follow this sequence for each scoped modal:

1. Reach and activate the invoker by keyboard; record focus before opening.
2. Observe entry focus and why that destination fits the task.
3. Tab and Shift+Tab through both boundaries. Inspect focus/composed focus and scrolled-content reachability. Record focus visibility as separate visual evidence from the rendered page or screenshots; keyboard movement alone cannot establish it.
4. Exercise the task, relevant updates, and nested popup dismissal. Test Escape and visible closing/finishing controls; record intended alternatives.
5. Observe whether focus returns to the invoker or reaches a logical next step; explain any alternative destination. Reopen to catch stale focus, content, or names. Test long content/removed invokers when applicable to scope.

For an ordinary form, use this sequence instead of modal entry/containment checks:

1. Traverse controls in both directions using native keyboard interaction; select radios with arrow keys and toggle checkboxes with Space. Record focus visibility separately as visual evidence.
2. Submit missing or invalid values with safe test data. Observe error discovery, focus destination, keyboard access to errors/summary links, and retained input. Do not submit real transactions without authorization.
3. Correct individual and group errors, resubmit, and observe stale error removal, focus, and completion feedback. Accept usable native validation; do not require a custom summary, focus trap, or Escape dismissal.
4. When semantics are in scope, inspect individual/group names, descriptions, required/invalid states, and feedback through the browser-backed method below. Keep that evidence separate from key actions.

For unexpected native focus or boundary behavior, perform the [native-control attribution check](../../references/browser-coverage.md#attribute-unexpected-native-behavior) before assigning component responsibility.

Repeat in required available browsers. Containment concerns background page content, not arbitrary browser chrome shortcuts. A focused shadow host alone does not prove focus escaped; use the [cross-root reference](../../references/web-components/cross-root-relationships.md) when needed.

Use browser-driven key input, including browser automation that performs keyboard actions. Dispatching KeyboardEvent objects or walking elements with .focus() does not test native Tab order. For accessible open shadow roots, start with document.activeElement and repeatedly follow element.shadowRoot.activeElement while present; record the chain. If closed roots or tool limitations hide the endpoint, report that limitation instead of assuming escape or success.

When computed semantics are in scope, use [rendered-semantic verification](../../references/rendered-semantics.md) and keep that evidence separate. Otherwise hand off those questions. Keyboard actions alone do not prove accessible relationships or human AT announcements.

## Return

Give actual steps, observed behavior, findings, and gaps, with evidence proportionate to the task. If execution is unavailable, provide manual steps and Not tested results; ambiguous attempted observation is Inconclusive. Proposed scripts, screenshots alone, and clean axe scans are not keyboard execution evidence. Preserve source handoff findings when builds differ. Stop before unauthorized destructive actions; do not modify the implementation unless requested.
