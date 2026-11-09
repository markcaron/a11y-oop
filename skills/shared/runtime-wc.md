# Web Component runtime evidence

Wait for customElements.whenDefined(tagName) and actual update completion before querying a component. Use the project's registration and fixture conventions. For Lit, updateComplete may be relevant; further frame/event waits must reflect the behavior under test.

Inspect slots, flattened/composed relationships, deep activeElement and form-associated host behavior where used. IDs do not automatically cross shadow roots. Check actual supported cross-root/ElementInternals APIs and browser versions rather than assuming universal support or impossibility.

Test consumer name/description inputs, label activation, required/invalid state, reset/disabled/form submission where applicable, and actual keyboard/focus behavior. Do not query only light DOM and conclude internals are absent.

Use installed WTR / @open-wc/testing / chai-a11y-axe / PFE snapshot tools only when present; do not invent their matchers. A snapshot verifies observed properties, not the entire AT experience. Scanner support for ElementInternals is version-dependent. Record limitations and use appropriate browser/AT evidence without altering correct semantics to appease a tool.
