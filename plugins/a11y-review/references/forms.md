# Form labels, groups, and validation

Scope: ordinary inputs, selects, textareas, native radios/checkboxes, and submission recovery. Custom widgets, multistep flows, authentication, uploads, and form-associated custom-element internals need separate coverage. For a form inside a modal, also load [modal expectations](modal-dialog.md); an ordinary form does not need a focus trap or Escape dismissal.

## Labels and names

- Identify each control's purpose and naming mechanism.
- Prefer an explicit `<label for="id">` pointing to a unique, labelable control or a wrapping label. Verify the actual target, not proximity or styling.
- A span beside an input provides no association by itself.
- Placeholder text is not a persistent visible label.
- Where visible text labels a control, compare it with the accessible name; overriding it with unrelated aria-label text can break label-in-name expectations.
- Accept a span correctly referenced by aria-labelledby: the relationship, not the tag, supplies the name. Unlike a native label, that span does not automatically activate its control when clicked. Keep a native-label recommendation separate from a demonstrated naming failure.
- An aria-label can name a control without supplying visible instructions.
- Use [name computation](names-and-descriptions.md) and [cross-root tracing](web-components/cross-root-relationships.md) as applicable; source inference is not a captured browser name.

```html
<label for="email">Email</label><input id="email" type="email">
<label><input type="checkbox"> Send updates</label>
<span id="reference-label">Reference code</span>
<input aria-labelledby="reference-label">
```

## Group labels

- Use fieldset with a descriptive first-child legend for related options whose meaning depends on a shared question, such as Yes/No radios. Each option still needs an individual label; legend does not replace those labels.
- Sharing a radio name controls selection behavior, not the group's accessible name.
- A nearby heading or border alone does not establish a semantic group.
- Accept an appropriately named ARIA group or radiogroup when its semantics and interaction are correct.
- Do not require fieldset around every field, every standalone checkbox, or every visually adjacent set of self-explanatory controls. Evaluate whether the shared question is necessary to understand the choices.
- Check repeated/nested groups for correct ownership and names.
- Prefer native grouping without declaring every alternative a WCAG failure.

## Instructions, errors, and recovery

- Expose required status and any necessary format instructions before submission. Native required participates in validation; aria-required communicates semantics but does not enforce validation.
- Connect relevant help/error text, commonly with aria-describedby; descriptions supplement names. Check ID resolution and preserve help when adding error descriptions.
- For detected errors, identify the affected field/group in text and explain correction when known. Color alone, “Invalid” without a clear target, or invalid state without an explanation is insufficient feedback.
- For custom validation, check error associations and invalid states on the affected controls, then their removal/update after correction and resubmission.
- Do not report missing aria-invalid alone as a defect where native validation already exposes invalidity; inspect the mechanism and actual result.
- Client-side feedback does not establish server-side validation.
- On unsuccessful submit, observe a usable route to errors and correction without losing unrelated input. A focused error summary with links or focus on an invalid field are useful strategies, not universal mandatory destinations.
- Verify keyboard reachability, summary links, group selection, and resubmission.
- Native validation UI can be valid without a custom summary or alert.
- For success/error status updates that do not take focus, inspect applicable status-message semantics; do not prescribe role=alert everywhere. Actual announcements remain manual and Not tested unless supplied.

## Keyboard sequence

1. Traverse controls in both directions using native keyboard interaction; select radios with arrow keys and toggle checkboxes with Space. Record focus visibility separately as visual evidence.
2. Submit missing or invalid values with safe test data. Observe error discovery, focus destination, keyboard access to errors/summary links, and retained input. Do not submit real transactions without authorization.
3. Correct individual and group errors, resubmit, and observe stale error removal, focus, and completion feedback. Accept usable native validation; do not require a custom summary, focus trap, or Escape dismissal.
4. When semantics are in scope, inspect individual/group names, descriptions, required/invalid states, and feedback using [rendered semantics](rendered-semantics.md). Keep that evidence separate from key actions.

## States and evidence

- Use initial, invalid-submit, correction, and valid-submit as applicable.
- In each required environment, inspect control and group names, group relationships, help/error descriptions, required/invalid state, and feedback updates. Verify group names separately from individual option names; a legend does not replace each option’s name.
- Observe error visibility, retained values, and focus after submission and correction using the corresponding visual and keyboard methods.
- Record source, browser-tree, keyboard, and visual observations separately. Browser trees do not establish announcements; keyboard testing does not establish names.
- Use [rendered semantics](rendered-semantics.md) for browser-backed inspection.

## Authority

The [WAI labels](https://www.w3.org/WAI/tutorials/forms/labels/), [grouping](https://www.w3.org/WAI/tutorials/forms/grouping/), [validation](https://www.w3.org/WAI/tutorials/forms/validation/), and [notification](https://www.w3.org/WAI/tutorials/forms/notifications/) tutorials are informative implementation guidance. [HTML labels](https://html.spec.whatwg.org/multipage/forms.html#the-label-element) define native association. Assess applicable WCAG requirements separately: [1.3.1](https://www.w3.org/TR/WCAG22/#info-and-relationships), [2.5.3](https://www.w3.org/TR/WCAG22/#label-in-name), [3.3.1](https://www.w3.org/TR/WCAG22/#error-identification), [3.3.2](https://www.w3.org/TR/WCAG22/#labels-or-instructions), [3.3.3](https://www.w3.org/TR/WCAG22/#error-suggestion), [4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value), and [4.1.3](https://www.w3.org/TR/WCAG22/#status-messages). Related criteria are not automatic violation mappings; preserving data and preferred focus strategies remain recommendations unless an applicable requirement is demonstrated.
