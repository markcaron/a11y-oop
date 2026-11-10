# Shared review guide

## Every review

Start with the person's task, available files or running target, and relevant states. Reuse an existing scope or establish a brief one from the request and project context. Ask only for information that blocks useful work. This pilot covers modals; name broader exclusions. Follow project instructions and the requested action—review does not imply fixes or publication.

State what was inspected, what was found, the supporting evidence, and what still needs verification. A quick review can use a few findings and a short limitations note. Do not require a questionnaire, separate scope file, full catalog dump, or detailed result matrix for a small request. Keep enough evidence to reproduce findings and preserve existing IDs.

Separate source inference, automated output, browser observation, visual inspection, supplied testimony, and human AT evidence. Missing or inconclusive evidence is never a pass. A tree snapshot cannot establish visual contrast or what a screen reader announced. Separate standards violations, APG deviations, provider requirements, and recommendations; related WCAG IDs do not automatically prove a violation. Keep impact, confidence, and release priority distinct.

Use the project's standards profile; when absent, label WCAG 2.2 A/AA and separate APG guidance as assumptions. For runtime work, select [browser coverage](browser-coverage.md) proportionate to the supported environments. A source-only review carries runtime needs forward rather than claiming they ran.

## Result meanings

- **Not assessed:** Applicability/evaluation has not been considered.
- **Not applicable:** It does not apply; state the reason.
- **Not tested:** Applicable evaluation was not performed; state why.
- **Inconclusive:** Evaluation was attempted but evidence cannot settle the outcome.
- **Pass:** Evidence supports this expectation in the evaluated conditions only.
- **Fail:** Evidence demonstrates the expectation was not met; classify its authority separately.

## Detailed reviews and handoffs

For a broader audit, repeated testing, or transfer to another task, preserve a scope ID/version, objective, targets/states, standards/policies, required methods/environments, available capabilities, exclusions, and unknowns. Define required check/method/target/state/environment combinations before counting coverage. A result unit is check + target/state or transition + method + environment + revision, not a whole component's universal status.

Use [check IDs](checks.json) for structured tracking. Give observations result IDs and run/time. Record expected versus actual, evidence/limitation, confidence, authority, affected file/target, and related finding ID. Record evaluated revision, browser/engine/OS/tool capabilities, and check/plugin provenance when known; label unknowns instead of inventing details. Markdown is sufficient unless machine-readable output is requested.

Carry scope, results, finding IDs, artifacts, unresolved questions, and next verification steps. Include browser/state requirements and cross-root endpoint maps when relevant. The next task validates scope/revision and available evidence; record changes explicitly. Missing artifacts remain gaps.

The first task assigns scope-local IDs (for example S-01, R-01, F-01) and subsequent tasks preserve them, assigning unused IDs only to new records. When merging independent scopes, qualify colliding IDs with their original scope. An illustrative handoff, not an executed observation:

```text
Scope: S-01 v1; modal #details; source revision unknown
Result: R-01; finding F-01; check MOD-01; state open; method source
Run/time: example only; not executed
Environment: supplied HTML; browser/OS not applicable
Expected: dialog has an accessible name
Actual/evidence: aria-labelledby references an absent ID at example.html:9
Status: Fail; confidence high for source relationship; runtime name unverified
Authority: naming requirement; verify computed name before runtime determination
Provenance: check/plugin revision unknown; artifact example.html
Next: retain F-01; verify computed name in required browsers; browser work Not tested
```

Use the catalog stateVocabulary for recorded states/transitions; applicability belongs in the scope or result, not in alternate state names.

## Combining results

Keep states, environments, revisions, and methods separate. A source Pass cannot cancel a keyboard Fail. A substantiated failure remains Fail when a comparable repeat passes: label it intermittent, retain both observations, and keep the finding open. Use Inconclusive when evidence quality or interpretation prevents establishing whether a failure occurred, not merely because a failure did not recur. A newer passing source revision does not prove an older runtime failure is fixed.

Separate the observed outcome from responsibility for it. Matching component and native-control behavior does not isolate the cause: component-specific attribution is unsupported, but a component contribution is not ruled out and an engine/tool cause is not established. Retain the finding and both observations; matching headed results alone neither establish responsibility nor justify closure. Prefer “the evidence does not isolate the component as the cause” over “the component cannot cause this” or “this is an engine defect.” API/event defects need an evidence-backed connection to accessibility impact; describe untested consumer effects as risks.

Keep each factual claim attached to the observation that supports it. Matching behavior or a shared environment does not copy unrelated results between targets: if only one record reports no background focus, containment is unreported for the other. Keyboard containment does not establish pointer or assistive-technology isolation. Preserve explicit cross-references only to the extent stated. Do not invent an earlier diagnosis to retract. When reporting counts or coverage, derive them from the supplied records; label any new check mapping or status as an assessment rather than supplied data.

Methods answer different questions; they have no universal strength ranking. Source review can establish a reference mismatch, a browser tree can establish an exposed name, and keyboard input can establish navigation in tested conditions. None substitutes for the others. Missing screen-reader evidence limits announcement and AT-interaction claims; it does not invalidate demonstrated source or keyboard defects. Frame follow-up as determining the outcome, not confirming a preferred hypothesis: inspect the computed name and fallback behavior rather than “confirm the empty name.”

Screen-reader testing is a manual follow-up outside this pilot’s execution scope. Preserve supplied manual results as supplied evidence; otherwise applicable checks remain Not tested. Browser trees cannot fill those results.

Group common causes without losing occurrences or result IDs. Close findings only through an explicit evidence-backed disposition in the matching retest scope; nonreproduction alone is insufficient. Preserve unknown check IDs and unverified supplied claims rather than dropping them.

Summarize required units by status/method/environment when that detail is needed. A check passes only when all required applicable units pass. A pass in one browser does not fill another's untested units. Distinguish harmless snapshot differences and inspection-tool gaps from confirmed defects. Checklist completion is not a conformance percentage; this pilot does not certify products.
