# Focus and native dialogs

A native dialog opened through showModal() supplies modal behavior; open or show() alone does not. Do not demand a handwritten focus trap, explicit role, or redundant aria-modal solely because the browser implements native behavior. Verify actual use and browser support.

Do not add tabindex to the native dialog itself. Choose an appropriate child for intentional entry focus. Inspect cancel/close handlers when they modify native behavior. A custom role or aria-modal alone does not implement modality.

Record focus before opening, inside, after closing, and on reopening. In shadow DOM, document.activeElement may be a host; inspect the composed focus chain before calling it an escape. Containment within a modal is not itself an inescapable trap if keyboard users can close or complete it.

Sources: [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element), [WCAG keyboard](https://www.w3.org/TR/WCAG22/#keyboard), and [no keyboard trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap).
