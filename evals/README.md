# Evaluating the modal pilot

## Automated packaging checks

Run `python3 -m unittest discover -s evals/tests -v`. These check required dependency closures, missing declarations, cycles, portable paths, optional-reading exclusion, reproducible ZIPs, and installed file/link integrity after the temporary authoring checkout is deleted. These are structural tests, not assistant behavior evaluations.

## Behavioral cases

Use cases/modal-workflow.json and fixtures/ for source defects, valid native alternatives, shadow-root focus, PF consumer responsibilities, missing execution capabilities, consolidation conflicts, and routing. The HTML files are isolated test fixtures, not a replacement website. PatternFlyModal.tsx is source-only: no dependency installation or running PF build is implied. Native and Web Component fixtures can be served from a local static server for actual browser evaluation.

For each case, install the generated skill in an isolated workspace alongside only the named fixture and required tools. Do not expose the source checkout or the expected-outcome rubric to the acting assistant. Record prompt, package hash/version, model configuration, capabilities, output, actual execution artifacts, and adjudication. Evaluate synthetic reporting records as supplied examples, not live observations.

Compare matched skill-on and skill-off runs using the same fixture, prompt, model, and tool capabilities. Freeze expected outcomes before the comparison. Measure seeded-defect detection, false positives, evidence fidelity, coverage, and routing; repeat unstable cases. Retain original outputs and failures rather than only a score.

## Release gate

Required package/isolation cases must pass. The behavioral suite must detect seeded blocking defects, accept valid alternatives, initialize scope for independent invocation, retain unresolved findings/conflicts, and respect routing boundaries. Any fabricated runtime/AT evidence, unsupported conformance claim, missing-evidence Pass, or lost unresolved finding blocks release. Demonstrate benefit over skill-off in a preselected quality dimension without regressing required correctness. Passing a small suite does not prove universal correctness.

Current status: draft. Behavioral matched runs and independent runtime/AT evaluation are not completed by the packaging tests. No release tag is authorized by a passing static check. The next validation step is to run the installed source → keyboard → report recipe on real fixtures and retain its evidence, then perform matched comparisons.

The external skill-creator quick validator was attempted during implementation but could not start because PyYAML is unavailable. The project validator checks the pilot's single-line name/description frontmatter convention and package resources without that dependency; it is not a general YAML validator.
