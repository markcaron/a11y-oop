# Modal dialog

Version: 0.1.0-draft.1. Applies when a dialog blocks background interaction. Nonmodal panels and alert dialogs need separate scope decisions; appearance alone does not determine the pattern.

## Expectations

Identify the dialog and its name. Declared modality must agree with actual interaction. Move focus inside on opening. Introductory text or a safe action can be appropriate alternatives to the first control. Descriptions are optional; avoid flattening complex structured content into a description.

Contain the tab sequence. Provide a visible closing control and test Escape. Restore the invoker on close unless a removed invoker or a logical next task justifies another destination. Record that rationale. Test nested popup dismissal in layers.

## Inspection

Use the [naming reference](../foundations/names-and-descriptions.md) and [native/focus reference](../foundations/focus-and-native-dialogs.md). A named native dialog opened with showModal() is a valid baseline; missing custom trap code is not a defect by itself. A custom role plus aria-modal supplies semantics, not interaction logic.

Compare short/long content, multiple instances, closing paths, removed invokers, and rerenders when in scope. For example, aria-labelledby="heading" with an existing matching heading differs from a plain panel showing the same text without an association.

## Authority and evidence

Interaction expectations are APG guidance. Classify normative violations separately against applicable criteria. Source review identifies structural defects and risks. Keyboard testing establishes observed focus transitions; browser-tree inspection establishes exposed semantics in that environment. Neither proves human AT announcements.

Sources: [APG modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [example rationale](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/), and [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element). Original summaries; no imported source pages.
