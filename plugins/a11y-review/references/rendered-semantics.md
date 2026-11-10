# Rendered semantics: modal pilot

Use this method when rendered-semantic verification is part of the requested scope or a handoff. It supports the current modal workflow; it does not introduce a fourth skill or silently expand a keyboard-only request.

Apply the [browser matrix](browser-coverage.md) and the modal's [state expectations](modal-dialog.md). Capture the baseline, open state, relevant interaction update, closed state, and reopening in each required environment. Record input/actions, actual exposed name/role/modal state, applicable relationships, hidden content, and focused element/composed chain. Preserve raw snapshots or inspected outputs with revision and tool capability information.

Compare expected semantics to each observation, not only one browser to another. Matching browsers can share a defect. Do not require unrelated controls to expose states they do not support. For native dialogs or ElementInternals, correct semantics can exist without explicit light-DOM attributes.

If relationships cross DOM roots, apply the [relationship procedure](web-components/cross-root-relationships.md). Inspect actual relationship targets when available. A serialized tree without those fields cannot settle the question; use another available inspection method or record the limitation. Announcements require actual AT evidence; visual focus and contrast require visual evidence.
