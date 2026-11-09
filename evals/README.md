# Evaluating the modal plugin

## Structural tests

Run python3 -m unittest discover -s evals/tests -v. Tests copy only the complete plugins/a11y-review/ directory into a fresh installed location, delete the temporary authoring checkout, and validate manifests, three discoverable skill entrypoints, and local resource/check references. Negative cases cover missing references, path escapes, mismatched manifests, missing skills, and invalid marketplace sources. These tests do not invoke a real host plugin loader or evaluate assistant behavior.

## Behavioral cases

Use cases/modal-workflow.json and fixtures/ for source defects, valid native alternatives, shadow-root focus, PF consumer responsibilities, missing browser execution, consolidation conflicts, and routing. HTML files are isolated test fixtures, not a website. PatternFlyModal.tsx is source-only and does not bundle React/PF dependencies.

Install the complete plugin in an isolated workspace with the named fixture and required tools. Do not expose authoring-only files or the expected-outcome rubric to the acting assistant. Record prompt, plugin commit/content hash, model configuration, capabilities, output, execution artifacts, and adjudication. Evaluate synthetic reporting records as supplied examples, not live observations.

Compare matched skill-on and skill-off runs using the same fixture, prompt, model, and tools. Freeze expected outcomes before comparison. Measure seeded-defect detection, false positives, evidence fidelity, coverage, and routing; repeat unstable cases. Retain original outputs and failures.

## Release gate

Required manifest, installation-portability, and real host-loading checks must pass. Behavioral cases must detect seeded defects, accept valid alternatives, initialize scope independently, and retain unresolved findings/conflicts. Fabricated runtime/AT evidence, unsupported conformance, missing-evidence Pass, or a lost finding blocks release. Demonstrate benefit over skill-off without regressing required correctness. A small suite is not universal proof.

Current status: draft. Matched behavioral comparisons, real host-loading checks, and independent runtime/AT evaluation remain pending. Static plugin-copy tests do not complete that gate. The next step is an installed-plugin source → keyboard → report exercise with retained evidence.

The external skill-creator validator previously could not start because PyYAML is unavailable. The contributor validator checks this pilot's single-line name/description convention without that dependency; it is not a general YAML validator.
