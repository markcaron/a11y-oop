# Evaluating the accessibility review plugin

## Structural tests

Run python3 -m unittest discover -s evals/tests -v. Tests copy only the complete plugins/a11y-review/ directory into a fresh installed location, delete the temporary authoring checkout, and validate manifests, all skill entrypoints discovered in the source plugin, and local resource/check references. Negative cases cover missing references, path escapes, mismatched manifests, missing skills, and invalid marketplace sources. These tests do not invoke a real host plugin loader or evaluate assistant behavior.

## Fixture organization

Group fixtures by the component or pattern under test. Case `fixture` paths are relative to `evals/fixtures/`; HTML pages and synthetic observation files live together within their pattern directory.

```text
fixtures/
├── modal/     # Dialog behavior, naming, and reporting inputs
└── form/      # Labels, groups, validation, and reporting inputs
```

When serving `evals/fixtures/`, use URLs such as `/modal/native-valid.html` or `/form/custom-validation-valid.html`. Renaming a fixture also requires updating its case path and any documentation links. Keep expected outcomes in the case rubric rather than adding them to the test prompt.

## Behavioral cases

Use cases/modal-workflow.json and fixtures/modal/ for source defects, valid native alternatives, shadow-root focus, PF consumer responsibilities, missing browser execution, consolidation conflicts, cross-root positive/negative pairs, browser/tool gaps, stale naming on reopen, and routing. HTML files are isolated test fixtures, not a website. fixtures/modal/patternfly-consumer.tsx is source-only and does not bundle React/PF dependencies.

Install the complete plugin in an isolated workspace with the named fixture and required tools. Do not expose authoring-only files or the expected-outcome rubric to the acting assistant. Record prompt, plugin commit/content hash, model configuration, capabilities, output, execution artifacts, and adjudication. Evaluate synthetic reporting records as supplied examples, not live observations.

Compare matched skill-on and skill-off runs using the same fixture, prompt, model, and tools. Freeze expected outcomes before comparison. Adjudicate additional findings by evidence and authority; an unseeded, substantiated finding is not automatically a false positive. Include installed competing skills in routing runs and record their names/versions; also retain isolated-plugin runs to distinguish routing interference. Measure seeded-defect detection, false positives, evidence fidelity, coverage, and routing; repeat unstable cases. Retain original outputs and failures.

Use cases/forms-workflow.json for the ordinary-form slice. fixtures/form/custom-validation-valid.html covers explicit/wrapping labels, a valid span relationship, fieldset/legend, a named ARIA group, and custom error recovery. fixtures/form/custom-validation-broken.html keeps the valid span but seeds unrelated labels, missing group semantics, a dangling description, and unusable validation feedback/recovery. fixtures/form/native-validation-valid.html guards against demanding custom errors or fieldsets for standalone controls. Behavioral specifications remain separate from actual run results; screen-reader follow-up stays manual.

## Evaluation evidence

Keep run outputs and artifacts outside this repository, in saved client chats or a private location of your choice. Formal reports and a prescribed directory or file format are not required. The repository holds reusable cases, fixtures, and validation code, not individual run records.

For comparisons, retain the prompts, original outputs (including failures), and available execution evidence. Keep a brief note identifying the case, skill-on/off pair, date, plugin revision or content hash for uncommitted changes, model/settings, capabilities, competing skills, and browser/OS when relevant. Mark unknowns explicitly; never label a specification as executed.

Assess required/blocking outcomes, evidence-backed additional findings, false positives, and execution gaps against the rubric. A short note alongside the saved conversation is sufficient. Record the pass/block rationale and the preselected comparison dimension; distinguish detection, false positives, evidence fidelity, and handoff quality. Keep sensitive evidence private. Evaluation evidence must remain available to whoever makes the release decision, but does not need to be committed.

## Release gate

Required manifest, installation-portability, and real host-loading checks must pass. Behavioral cases must detect seeded defects, accept valid alternatives, initialize scope independently, and retain unresolved findings/conflicts. Fabricated runtime/AT evidence, unsupported conformance, missing-evidence Pass, or a lost finding blocks release. Demonstrate benefit over skill-off without regressing required correctness. A small suite is not universal proof.

Current status: draft. Selected installed-client invocations/reference reads, live fixture runs, and synthetic reporting evaluations have been supplied during development. Reconcile saved evidence against the current case requirements and plugin revisions before marking individual cases passed or pending. Full gate completion has not been established by this status note; static plugin-copy tests do not complete it. Screen-reader testing remains manual and outside plugin execution scope.

Expansion first targets the [AI Helpers parity milestone](../docs/design/architecture.md#first-expansion-milestone-ai-helpers-accessibility-parity). Evaluate each capability slice and preserve existing required outcomes before advancing; retain run evidence outside this repository.

The external skill-creator validator previously could not start because PyYAML is unavailable. The contributor validator checks this pilot's single-line name/description convention without that dependency; it is not a general YAML validator.

PFE-inspired case specifications are not themselves execution evidence; use the saved run records to determine each case’s status. The cross-root fixture pairs a same-tree relationship with an intentionally out-of-scope declarative relationship; it does not assert support for experimental APIs. fixtures/modal/browser-observations.json contains invented inputs for reporting evaluation, not runtime results. fixtures/modal/reopen-stale-name.html seeds an update missed by initial-state-only review. Required browser/state execution and comparison must still be performed and recorded.
