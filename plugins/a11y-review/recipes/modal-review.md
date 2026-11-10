# Modal source → keyboard → report

1. Invoke a11y-source-audit on source/diff; retain scope, source results, findings, and runtime queue.
2. Invoke a11y-keyboard-test with that handoff and the matching running build. Record revisions explicitly. Capture real transitions or return Not tested and manual steps.
3. Invoke a11y-report with both outputs. Preserve evidence origins and unresolved findings; passing source cannot override a keyboard failure.

Each skill also works independently. Keyboard-only requests begin at step 2; reporting existing evidence begins at step 3. No other skill installation or Alloy site is required.

Example: “Review this modal source, test it at [URL], and consolidate evidence. Keep source findings separate from observed behavior. Do not edit files.”

Outputs are minimal scope, source records, keyboard records or explicit gaps, and a report. Keep actual environment/revision or unknowns. Human AT and further visual checks remain separate; this is not conformance certification.

Before runtime execution, select the required browser matrix and applicable baseline/open/update/close/reopen expectations. Source review maps cross-root endpoints; keyboard review records transitions per required browser. Add rendered-semantic verification only where requested or required by scope. The final report retains missing-browser and inspection-capability gaps. Component-author reviews include the relevant demo/snippet coverage; future regression-test generation will trace critical state expectations and findings to tests or explicit human verification needs.
