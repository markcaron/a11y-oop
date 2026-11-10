# Names and relationships across DOM roots

Apply when a dialog, title, description, invoker, or related control involves shadow DOM. This is a verification procedure, not a frozen browser-support matrix.

For each relationship, record the source element and root, target element(s) and root(s), intended purpose, and mechanism: declarative ID reference, element-reflection property, native semantics, or ElementInternals. Distinguish author attributes from internal defaults; do not require a particular controller or prohibit a public ARIA API universally.

Trace the real endpoints, including slot assignment. A slotted node remains in its DOM tree; visual placement does not establish reference scope. Identical IDs in separate shadow roots are not automatically duplicate-ID defects.

Inspect declarative references within their actual tree scope. Do not assume element-reflection properties have the same rules as attribute ID strings, or that assigning a property proves a computed relationship. Consult the current specification and browser support for the exact API/direction, including whether the receiver is an Element or ElementInternals. Avoid carrying dated experimental-support claims into findings without verification.

Use the [rendered-semantics method](../../../methods/rendered-semantics.md) to verify exposed results in required browsers. Separate a definite source-level scope mismatch from a runtime conclusion that needs browser evidence. If the tool does not expose target relationships, report that limitation rather than infer failure from an absent field. Also distinguish the document's focused host from the focused descendant inside its shadow root.

Verify any fallback against its purpose. A name supplied directly can differ from an associated description. A live-region announcement does not establish a persistent naming/description relationship and can add unwanted announcements; test actual timing and AT behavior before recommending it. Native semantics may already satisfy the requirement. Do not prescribe speculative reflection assignments or announcers universally.

Sources: [HTML reflection algorithms](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes) and [WCAG name/role/value](https://www.w3.org/TR/WCAG22/#name-role-value). Scope and support must be checked for the target environment.
