# Rendered semantics

Use this method when rendered-semantic verification is part of the requested scope or a handoff. It does not silently expand a keyboard-only request. Use the selected pattern reference to determine targets, states, and expected semantics.

## Identify the inspection layer

- Record whether the tool reads the browser engine's accessibility tree, the OS accessibility API, or computes a DOM-derived approximation. API names such as “AX state” or “ARIA snapshot,” role-like output, and use of a real browser do not establish the inspection layer.
- Verify the actual inspection path for the current tab or surface using tool documentation, capability metadata, or implementation evidence. Record the API/tool version when available. If an API can fall back to DOM snapshots, establish which path this capture used before calling it browser-backed or native AX.
- When the path cannot be established, label the capture “inspection output; provenance unverified.” Do not relabel it as definitely DOM-derived either. Browser-computed name/role/relationship verification remains Not tested; conclusions based on the ambiguous capture are Inconclusive.
- An omitted name or group in unverified output does not establish an unnamed control or absent browser-exposed group. Preserve independent DOM relationship defects, keyboard observations, and visual findings.
- Accept a documented engine-tree or OS accessibility capture within its actual target, fields, and environment; it does not establish screen-reader output. Keep verified DOM approximations labeled as approximations.
- Use a browser-backed inspection mechanism independently for each engine required by the [browser matrix](browser-coverage.md); results do not transfer between engines.
- Do not require a particular automation package or deprecated API.

## Capture observations

- Inspect the selected targets and applicable states in each required environment, using the pattern reference's expectations.
- Record input/actions, exposed names, roles, applicable states and relationships, hidden content, and focused element/composed chain.
- Preserve raw snapshots or inspected outputs with revision, environment, API/tool version, and capability information.
- If relationships cross DOM roots, apply the [relationship procedure](web-components/cross-root-relationships.md).
- Inspect actual relationship targets when available. A serialized tree without those fields cannot settle the question; use another available inspection method or record the limitation.

## Interpret evidence

- Compare each observation with its expected semantics, not only with another browser's output. Matching browsers can share a defect.
- Do not require targets to expose states they do not support. Native semantics or element internals can supply correct behavior without explicit light-DOM attributes.
- An invalid relationship and an empty computed name are separate observations; a valid fallback can supply a name.
- Exposed semantics do not establish actual interaction behavior. Keep keyboard observations separate from semantic state.
- Announcements require actual AT evidence; visual focus and contrast require visual evidence.

Screen-reader announcements and navigation remain manual follow-up in this pilot.

- Do not launch or configure a screen reader.
- Mark applicable manual checks Not tested unless actual supplied test results are available, and preserve their browser/OS/screen-reader versions, settings, steps, and evidence origin.
