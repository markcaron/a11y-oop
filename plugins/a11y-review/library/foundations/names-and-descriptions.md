# Modal names and descriptions

Apply to the dialog and its controls. Inspect the computed name; visible text or a prop is not proof of a naming relationship. Trace references and verify IDs in the relevant tree. Check multiple instances for unintended shared names.

An existing heading referenced by aria-labelledby differs from an unassociated heading. Native semantics and component internals may supply correct behavior without duplicated ARIA. Review descriptions separately; adding one is not a universal improvement. Do not infer an actual screen-reader announcement from source or a browser snapshot.

For Web Components, inspect slots, shadow-root boundaries, and ElementInternals. For React, trace forwarded props, generated IDs, conditional rendering, and portals. Verify installed provider versions and documentation before suggesting an API.

Authority: assess applicable name/role issues against [WCAG 2.2 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value). Inspection steps are project methodology.

For cross-root names/descriptions, load the [relationship procedure](../runtimes/web-components/names-and-cross-root-relationships.md) and map endpoints before deciding a relationship works or fails. Verify changes after updates and reopening as well as the initial state.
