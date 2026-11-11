# Modal dialog

Version: 0.1.0-draft.2. Applies when a dialog blocks background interaction. Nonmodal panels and alert dialogs need separate scope decisions; appearance alone does not determine the pattern.

## Expectations

- Identify the dialog and its name.
- Declared modality must agree with actual interaction.
- Move focus inside on opening. Introductory text or a safe action can be appropriate alternatives to the first control.
- Descriptions are optional; avoid flattening complex structured content into a description.
- Contain the tab sequence.
- Provide a visible closing control and test Escape.
- Restore the invoker on close unless a removed invoker or a logical next task justifies another destination. Record that rationale.
- Test nested popup dismissal in layers.

## Inspection

Use the [naming reference](names-and-descriptions.md) and [native/focus reference](focus-and-native-dialogs.md).

- A named native dialog opened with showModal() is a valid baseline; missing custom trap code is not a defect by itself.
- A custom role plus aria-modal supplies semantics, not interaction logic; see the [ARIA definition](https://www.w3.org/TR/wai-aria-1.2/#aria-modal).
- For browser-backed inspection, capture the dialog’s computed role, name, description relationships, modal state, and hidden/ignored state across the applicable transitions below. Native semantics may supply these without explicit ARIA attributes.
- A declared modal state in the tree does not prove background interaction is blocked; verify actual keyboard and pointer behavior separately.
- Prefer robust background restrictions such as inert for custom modals; verify keyboard/pointer restrictions and exposed modal semantics independently.
- Do not require aria-hidden solely because it is absent: aria-modal communicates background inertness to assistive technology.
- Browser semantics inspection does not prove screen-reader browsing or announcements; those require separate AT testing.

Compare short/long content, multiple instances, closing paths, removed invokers, and rerenders when in scope. For example, aria-labelledby="heading" with an existing matching heading differs from a plain panel showing the same text without an association.

## Keyboard sequence

1. Reach and activate the invoker by keyboard; record focus before opening.
2. Observe entry focus and why that destination fits the task.
3. Tab and Shift+Tab through both boundaries. Inspect focus/composed focus and scrolled-content reachability. Record focus visibility as separate visual evidence from the rendered page or screenshots; keyboard movement alone cannot establish it.
4. Exercise the task, relevant updates, and nested popup dismissal. Test Escape and visible closing/finishing controls; record intended alternatives.
5. Observe whether focus returns to the invoker or reaches a logical next step; explain any alternative destination. Reopen to catch stale focus, content, or names. Test long content/removed invokers when applicable to scope.

For unexpected native focus or boundary behavior, perform the [native-control attribution check](focus-and-native-dialogs.md#attribute-unexpected-native-behavior) before assigning component responsibility.

## Authority and evidence

- Interaction expectations are APG guidance. Classify normative violations separately against applicable criteria.
- Source review identifies structural defects and risks.
- Keyboard testing establishes observed focus transitions; browser-tree inspection establishes exposed semantics in that environment. Neither proves human AT announcements.

Sources: [APG modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [example rationale](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/), and [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element). Original summaries; no imported source pages.

## State and transition expectations

Select applicable states before testing; do not demand expanded/checked/invalid states from a modal that does not support them. Evaluate these outcomes per required browser using the [browser](browser-coverage.md) and [rendered-semantics](rendered-semantics.md) methods:

- **Closed baseline:** The closed dialog's content is not available as an active dialog; its invoker remains usable. Inspect hidden/ignored output with the tool's capabilities in mind.
- **Open:** The intended name, dialog semantics, and modality are exposed; actual background behavior agrees. Observe suitable entry focus and usable closing controls separately.
- **Interaction/update:** Relevant content, names, relationships, and supported child states reflect the update without stale or unintended associations. Preserve the intended focus path.
- **Nested popup, when present:** Child interaction and dismissal leave the intended parent state and focus. Child dismissal does not automatically imply parent dismissal.
- **Close:** Content becomes unavailable as an active modal, background access resumes, and focus reaches the invoker or justified next task.
- **Reopen:** The intended current name/content/relationships are restored or refreshed, and entry focus works again. No stale hidden state, relationship target, or orphan focus remains.
- Record expected and actual outcomes; identical snapshot serialization is not required.
- Source review can establish an implementation risk but cannot fill browser execution rows.
- Human announcements and visual contrast remain separately verified methods.
