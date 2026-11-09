# Results

One result unit is check ID + target/state or transition + method + environment + evaluated revision within a scope. Give each observation a result ID and run/time. Record check/package versions. Use explicit unknowns rather than inventing environment or revision information.

Each result contains: scope ID/version; result ID; check ID/version; target; state/transition; method; environment; revision; run/time; status; expected; actual; evidence or limitation; confidence; authority classification; related finding ID; next verification step. Concise structured prose is sufficient unless machine-readable output is requested.

- **Not assessed:** Applicability or evaluation has not been considered.
- **Not applicable:** Applicability was considered and ruled out; explain why.
- **Not tested:** Applicable evaluation was not performed; record why.
- **Inconclusive:** Evaluation was attempted but evidence cannot support a determination; retain evidence and follow-up.
- **Pass:** Evidence supports this expectation for this result unit only.
- **Fail:** Evidence demonstrates the expectation was not met. A pattern failure is not automatically a standards violation.

Evidence identifies file/line, inspected state, actual action sequence/output, or supplied artifact. Label source inference and testimony separately from first-hand execution. Synthetic examples are never runtime observations. Insufficient evidence is Inconclusive; confidence alone cannot justify Pass.

Keep normative violations, pattern deviations, provider requirements, recommendations, and coverage gaps distinguishable. Related WCAG IDs are investigative mappings, not automatic failure classifications. Keep user impact, confidence, and release priority separate.
