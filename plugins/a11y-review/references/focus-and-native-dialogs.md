# Focus and native dialogs

A native dialog opened through showModal() supplies modal behavior; open or show() alone does not.

- Do not demand a handwritten focus trap, explicit role, or redundant aria-modal solely because the browser implements native behavior. Verify actual use and browser support.
- Native dialog closing also has focus-restoration steps: absent custom restoration code is not a defect by itself. Verify the actual close path, prior focus, invoker availability, and resulting destination at runtime.
- Do not add tabindex to the native dialog itself.
- Choose an appropriate child for intentional entry focus.
- Inspect cancel/close handlers when they modify native behavior.
- A custom role or aria-modal alone does not implement modality.
- Record focus before opening, inside, after closing, and on reopening.
- In shadow DOM, document.activeElement may be a host; inspect the composed focus chain before calling it an escape.
- Containment concerns background page content, not arbitrary browser chrome shortcuts.
- Containment within a modal is not itself an inescapable trap if keyboard users can close or complete it.

Sources: [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element), [WCAG keyboard](https://www.w3.org/TR/WCAG22/#keyboard), and [no keyboard trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap).

## Attribute unexpected native behavior

- Before attributing unusual native-dialog focus or boundary behavior to a component, compare with a minimal native dialog in the same browser, OS, keyboard settings, and automation environment.
- Record automation version, browser build, and headed/headless mode; use matching supported binaries when available.
- If execution or a suitable control is unavailable, retain the observation and attribution gap rather than asserting a component defect.
- A headed repeat is useful when headless behavior is suspect, but does not by itself establish behavior outside automation.
- Apply the [shared attribution rules](review-guide.md#combining-results) to the comparison: matching results leave cause unresolved and do not justify closure.
- If the control behaves differently, investigate component-specific differences before assigning cause.
- When document focus is lost and the external destination is unknown, record that uncertainty; document.activeElement alone does not prove background-page focus escape.
