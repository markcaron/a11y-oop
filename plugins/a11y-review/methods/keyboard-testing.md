# Keyboard testing

Use available browser input plus focus observation. Record URL/build, browser/OS, keyboard-navigation settings, viewport/preferences as relevant, auth/data setup, and limitations. No specific automation product is required. Do not install tooling merely because a review mentions it.

1. Reach and activate the invoker by keyboard; record focus before opening.
2. Observe entry focus and visible context. Explain its suitability for the task.
3. Tab and Shift+Tab through both boundaries, inspecting focus/composed focus after important transitions. Check focus indication and reachability of scrolled content.
4. Exercise the task and any nested popup. Test Escape and relevant visible closing/finishing controls; record intentional alternatives.
5. Observe restoration or the justified next-task destination. Reopen to catch stale state. Test long content/removed invokers when in scope.

Containment concerns background page content, not arbitrary browser chrome shortcuts. Do not confuse browser behavior with absent custom JavaScript. Missing focus observation can make an attempted transition Inconclusive.

Without execution capability, provide manual steps and applicable Not tested records. A proposed script is not execution evidence. Snapshots are not human AT results. Stop before an unauthorized destructive action and document the untested transition.

Repeat the scoped sequence in each required environment from the [browser matrix](browser-coverage.md). Check the modal's [state expectations](../library/patterns/modal-dialog.md), including update and reopen behavior. Preserve per-browser focus observations and missing capabilities; do not infer outcomes for unavailable browsers.

When computed-semantic evidence is requested, use the separate [rendered-semantics method](rendered-semantics.md). Otherwise carry semantic questions forward as gaps; keyboard interaction alone does not establish a name or relationship. For shadow-root endpoints consult the [cross-root procedure](../library/runtimes/web-components/names-and-cross-root-relationships.md).
