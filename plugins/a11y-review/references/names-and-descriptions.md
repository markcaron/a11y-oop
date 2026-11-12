# Names and descriptions

Use for accessible names and descriptions. Select targets and relevant states from the applicable pattern reference.

- Inspect the computed name; visible text or a prop is not proof of a naming relationship.
- Trace references and verify IDs in the relevant tree.
- Check multiple instances for unintended shared names.

An existing heading referenced by aria-labelledby differs from an unassociated heading.

- Native semantics and component internals may supply correct behavior without duplicated ARIA.
- Review descriptions separately; adding one is not a universal improvement.
- Do not infer an actual screen-reader announcement from source or a browser snapshot.

For name computation and precedence (including valid aria-labelledby taking precedence over aria-label), consult [Accessible Name and Description Computation 1.2](https://www.w3.org/TR/accname-1.2/).

Authority: assess applicable name/role issues against [WCAG 2.2 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value). Inspection steps are project methodology.

For cross-root names/descriptions, load the [relationship procedure](web-components/cross-root-relationships.md) and map endpoints before deciding a relationship works or fails. Verify changes across the states and transitions selected for the review.

- Report a source-level naming relationship defect separately from the final computed name.
- Check explicit labels, native/ElementInternals semantics, and other applicable fallbacks before asserting that the target is unnamed.
- Queue browser-backed name inspection when unavailable; do not claim a runtime naming violation solely from a broken relationship.
- Even a confirmed empty browser-computed name is not a recorded screen-reader announcement.
