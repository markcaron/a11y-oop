# Versioned design-system providers

Choose runtime independently from provider, including mixed pages. Record installed packages/versions before suggesting APIs. Prefer component-specific accessibility docs alongside API/CEM data. An API manifest does not prove accessibility behavior.

- PF React / HTML: use matching PatternFly docs and PF MCP when available. Validate actual props. FormGroup isRequired is a label marker, not propagation to the control; native required may suffice. HelperTextItem variant styles a message; invalid state, association and announcement require their own implementation/evidence.
- RHDS / PFE Web Components: use RHDS/PFE docs, CEM and matching RHDS MCP when available. Preserve correct built-in/ElementInternals semantics. Verify consumer labels, slotted content, state and styles. rh-select danger styling is not aria-invalid; rh-icon is decorative by default unless named through its API. Check versions before applying either example.
- Felt React / Web Components: resolve actual project packages/docs as they become available. Treat the libraries as separate surfaces. Do not assume wrappers or invent a future ft-* API.

Use local/source docs if an MCP is absent. Record document revision, package version, truncation, conflicting guidance and unresolved source gaps. Retrieve omitted portions before relying on a partial excerpt.
