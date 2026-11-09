---
title: About this library
layout: default
---

<div class="page-head"><p class="eyebrow">About &amp; sources</p><h1>Built from shared practice.</h1><p class="lead">This is a working library for bringing accessibility into research, content, design, development and verification. It connects checklists, guidance and assistant skills around the same user needs.</p></div>

<div class="prose">

## What is here

- A draft catalog of 66 normalized checks, shared across eight roles.
- A checklist application with local progress, shareable filters and progress export/import.
- Thirteen RHDS guidance pages, plus new research, shared-table, provider and evidence guidance.
- Eight focused AI skills and four example recipes, sharing the same catalog and evidence contract.

The catalog is not an exhaustive WCAG test suite. The full historical master worksheet referenced in the planning documents was not provided. Related criteria and role assignments need continued expert review.

## Sources



Source locations in checklist records use the following keys:

- **S1:** Greg’s templated page-build Web QA checklist (3 pages).
- **S2:** Greg’s Localization QA checklist (2 pages).
- **S3:** Greg’s Browsers QA checklist (1 page).
- **S4:** Greg’s Draft QA checklist (4 pages).
- **S5:** A11y Checklist App kick-off notes (9 pages).
- **S6:** Accessibility section of UX Dot: IA (6 pages).
- **S7:** Accessibility section of UX Dot: Resources/Worksheet (3 pages).
- **S8:** DX web accessibility checklist cheat sheet (3 pages).
- **H001–H090:** original array order in the supplied checklist JSON, attributed by the contributor to Heydon Pickering. The export has no embedded author/date/version metadata. Original wording and mappings remain in the [catalog JSON](/data/checklist.json).
- **RC/RD/RV/RS:** RHDS content, design, development and contributor guidance.
- **RT/RA/RR/RI/RF:** RHDS manual testing, assistive technology, screen readers, CI/CD and fundamentals guidance.

Supplied PDFs and local filesystem paths are not published by this site. The catalog retains source titles, page/item locations and file hashes for traceability. Older resource links are provenance, not a claim that each link or recommendation has been revalidated.

## RHDS content

RHDS content is sourced from the local 5.0.0 checkout at revision `7b65f1378496ac57cc207be8f84822afc8180345`. Original Markdown is retained in `vendor/rhds/accessibility/`. Adapted pages preserve prose and examples; this site converts display wrappers to native HTML, resolves links and copies the referenced assets available in that checkout.

New interpretation notes are labeled separately. A PatternFly repository URL typo is corrected. Existing examples and version-specific tooling claims may still need expert review before reuse in a product. Source inventory and adaptation notes are available as [JSON](/data/rhds-sources.json).

New research, table, evidence and provider pages use the same practical tone. They are identified as new shared practice rather than original RHDS prose.

## Your progress

Checklist results and notes are stored under `a11y-oop:checklist:v1` in your browser’s local storage. They are not sent to a server. Different browsers, devices and site origins have separate storage. Private browsing, storage restrictions or clearing browser data may remove your progress.

Export creates a JSON file containing your results and notes. Import validates the file before you choose whether to replace progress. Start over clears only this checklist’s results and notes; it does not clear unrelated browser data.

## Contributing

Edit `data/checklist.json` for shared checks, `content/guidelines/` for site guidance and `skills/` for assistant modules. Keep IDs stable; record sources, applicability, authority and evidence requirements. Preserve positive examples and exceptions when refining rules.

Review changes with people doing the work, including disabled people. Update relevant examples and tests when behavior changes. See the repository README for build and verification commands.

</div>
