# Accessibility, on purpose

Three new, independently usable draft skills for modal-dialog review:

- [a11y-source-audit](skills/a11y-source-audit/SKILL.md): source findings and runtime verification queue.
- [a11y-keyboard-test](skills/a11y-keyboard-test/SKILL.md): observed keyboard/focus behavior or explicit unexecuted steps.
- [a11y-report](skills/a11y-report/SKILL.md): consolidated findings, conflicts, and method-specific coverage.

These are new implementations, not the eight archived drafts. Coverage is modal dialogs only; the other 15 planned skills are not implemented. The RHDS site content and historical catalog have been removed.

## Install and validate

Python 3.10+ is sufficient; no Alloy, Node packages, or network is needed to validate/package instructions:

```sh
python3 scripts/validate.py
python3 -m unittest discover -s evals/tests -v
python3 scripts/package.py
```

Extract a ZIP from dist/ into your assistant's supported skill location. Each contains one skill folder and its required references. Install that generated folder, not a bare source skills/ folder: the source uses canonical files, while distributions rewrite paths into local references/. Browser tools and provider libraries are not bundled.

## Use

Follow the [modal recipe](recipes/modal-review.md) or invoke a skill independently:

> Use a11y-source-audit on this modal. Record source evidence and the keyboard transitions needing verification. Do not edit files.

> Use a11y-keyboard-test at [URL] with these findings. Without execution, mark checks Not tested and give manual steps.

> Use a11y-report to consolidate these results, preserving unresolved findings and different revisions/methods.

## Status and layout

Expectations live in library/, procedures in methods/, records in contracts/, check IDs in checks/, and task entrypoints in skills/. packaging/ distinguishes dependencies from optional reading. sources/ holds URLs and review metadata, not site pages.

See [evaluation guidance](evals/README.md) for fixtures and the outstanding behavioral release gate. Package tests do not prove assistant behavior or actual keyboard/AT performance. Packages remain drafts; no release tag or conformance claim is made.

The [architecture](docs/a11y-oop-architecture-plan.md) and [sample prompts](docs/a11y-oop-sample-prompts.md) include future work. The site remains on site-archive. Apache-2.0 is retained; see [NOTICE](NOTICE).
