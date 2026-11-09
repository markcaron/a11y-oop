# Contributing

Start with the [architecture plan](docs/a11y-oop-architecture-plan.md). Implement a small reviewed slice rather than generating the full inventory.

## First workflow

1. Write one modal-dialog reference, its check records, and the minimum naming/focus support it needs.
2. Define minimal scope, result, coverage, and handoff contracts.
3. Implement a11y-source-audit, a11y-keyboard-test, and a11y-report against that slice.
4. Package required dependencies and test the installed skills against copied PF and Web Component fixtures outside this source checkout.
5. Evaluate against the release gate in the plan, including valid alternatives, conflicting observations, missing capabilities, independent invocation, and skill-on versus skill-off comparisons.

## Content and packaging

Each reference states applicability, expectation, authority, exceptions, examples, verification limits, and versioned sources. Keep shared prose canonical and link it rather than copying it. Required dependencies and optional reading have different packaging semantics; packaged resources do not all need to be loaded for every task.

Keep imported upstream Markdown unchanged under vendor/. Adapted guidance belongs in library/ with provenance. Historical checklist records remain in sources/legacy/ until reviewed individually; do not promote all records or preserve the old count as a requirement.

## Validation

Run `python3 scripts/validate.py`. It checks local Markdown file links, retained RHDS source hashes, legacy JSON readability, and separation from the site. It is not a behavioral evaluation or an accessibility certification. Add packaging and behavioral checks when the corresponding implementation exists.

The existing AI Helpers PF plugin is maintained separately. Contributions back upstream should follow that repository’s contribution and naming conventions.
