# Rendered semantics

Use this method when rendered-semantic verification is part of the requested scope or a handoff. It supports the scoped review workflow; it does not silently expand a keyboard-only request.

Apply the [browser matrix](browser-coverage.md) and the relevant [modal](modal-dialog.md) or [form](forms.md) state expectations. For modals, capture baseline, open, applicable updates, close, and reopen. For forms, capture initial, invalid submission, correction, and valid submission as applicable in each required environment. Record input/actions, actual exposed names, roles, applicable modal/required/invalid states, group and description/error relationships, hidden content, and focused element/composed chain. Preserve raw snapshots or inspected outputs with revision and tool capability information.

Compare expected semantics to each observation, not only one browser to another. Matching browsers can share a defect. Do not require unrelated controls to expose states they do not support. For native dialogs or ElementInternals, correct semantics can exist without explicit light-DOM attributes.

If relationships cross DOM roots, apply the [relationship procedure](web-components/cross-root-relationships.md). Inspect actual relationship targets when available. A serialized tree without those fields cannot settle the question; use another available inspection method or record the limitation. Announcements require actual AT evidence; visual focus and contrast require visual evidence.

## Identify the inspection layer

Record whether the tool reads the browser engine's accessibility tree, the OS accessibility API, or computes a DOM-derived approximation. A tool named “ARIA snapshot” does not necessarily expose the browser tree. Verify the API and installed version; keep approximations labeled as such and leave native-tree verification Not tested when unavailable. Use a browser-backed inspection mechanism independently for each required engine, including Firefox; a Chromium result does not establish Firefox semantics. Do not require a particular automation package or deprecated API.

Inspect each target's computed role and name as well as relationship metadata when exposed. For forms, inspect group names, help/error descriptions, required and invalid states, and feedback updates; a legend's group name does not replace each option's name. An invalid relationship and an empty computed name are separate observations; a valid fallback can supply a name. A declared modal state in a tree does not prove background interaction is blocked. Keep actual keyboard behavior separate from semantic state.

Screen-reader announcements and navigation remain manual follow-up in this pilot. Do not launch or configure a screen reader. Mark applicable manual checks Not tested unless actual supplied test results are available, and preserve their browser/OS/screen-reader versions, settings, steps, and evidence origin.
