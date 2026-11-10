# Evaluating the modal plugin

## Structural tests

Run python3 -m unittest discover -s evals/tests -v. Tests copy only the complete plugins/a11y-review/ directory into a fresh installed location, delete the temporary authoring checkout, and validate manifests, three discoverable skill entrypoints, and local resource/check references. Negative cases cover missing references, path escapes, mismatched manifests, missing skills, and invalid marketplace sources. These tests do not invoke a real host plugin loader or evaluate assistant behavior.

## Behavioral cases

Use cases/modal-workflow.json and fixtures/ for source defects, valid native alternatives, shadow-root focus, PF consumer responsibilities, missing browser execution, consolidation conflicts, cross-root positive/negative pairs, browser/tool gaps, stale naming on reopen, and routing. HTML files are isolated test fixtures, not a website. PatternFlyModal.tsx is source-only and does not bundle React/PF dependencies.

Install the complete plugin in an isolated workspace with the named fixture and required tools. Do not expose authoring-only files or the expected-outcome rubric to the acting assistant. Record prompt, plugin commit/content hash, model configuration, capabilities, output, execution artifacts, and adjudication. Evaluate synthetic reporting records as supplied examples, not live observations.

Compare matched skill-on and skill-off runs using the same fixture, prompt, model, and tools. Freeze expected outcomes before comparison. Adjudicate additional findings by evidence and authority; an unseeded, substantiated finding is not automatically a false positive. Include installed competing skills in routing runs and record their names/versions; also retain isolated-plugin runs to distinguish routing interference. Measure seeded-defect detection, false positives, evidence fidelity, coverage, and routing; repeat unstable cases. Retain original outputs and failures.

## Retained runs

Store each real evaluation under evals/runs/<run-id>/ with metadata.json, prompt.txt, output.md, artifacts/, and adjudication.md. Create these only when a run occurs; never label a specification as executed. Metadata records case ID, skill-on/off mode, paired run ID, timestamp, fixture hash, plugin content hash (including uncommitted files), model/settings, capabilities, installed competing skills, browser/OS where relevant, and execution status. Mark unavailable values explicitly.

Adjudication records each required/blocking outcome, acceptable additional findings with evidence, false positives, execution gaps, and pass/block rationale. Reference original artifacts and preserve failed runs. Keep sensitive artifacts out of version control; record an accessible evidence location and any redactions. A paired comparison states the preselected benefit dimension and results for detection, false positives, evidence fidelity, and handoffs separately.

## Release gate

Required manifest, installation-portability, and real host-loading checks must pass. Behavioral cases must detect seeded defects, accept valid alternatives, initialize scope independently, and retain unresolved findings/conflicts. Fabricated runtime/AT evidence, unsupported conformance, missing-evidence Pass, or a lost finding blocks release. Demonstrate benefit over skill-off without regressing required correctness. A small suite is not universal proof.

Current status: draft. Matched behavioral comparisons, real host-loading checks, and independent runtime/AT evaluation remain pending. Static plugin-copy tests do not complete that gate. The next step is an installed-plugin source → keyboard → report exercise with retained evidence.

The external skill-creator validator previously could not start because PyYAML is unavailable. The contributor validator checks this pilot's single-line name/description convention without that dependency; it is not a general YAML validator.

New PFE-inspired cases remain not-run. The cross-root fixture pairs a same-tree relationship with an intentionally out-of-scope declarative relationship; it does not assert support for experimental APIs. Browser-observations.json contains invented inputs for reporting evaluation, not runtime results. Reopen-stale-name.html seeds an update missed by initial-state-only review. Required browser/state execution and comparison must still be performed and recorded.
