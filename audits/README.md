# Felt theme accessibility regression review

Reviewed November 9, 2026 after applying the temporary Felt appearance. **Executed automated checks pass; full WCAG conformance is not established.**

The Alloy 0.7.0 build verifies 31 pages. All five Node tests pass. axe-core 4.14.0 reports zero violations across 136 rendered scans: 31 pages and three checklist states in both light/dark palettes at 1280/320 CSS pixels. None of these scans reports page-wide horizontal overflow. All reports are newer than the build and validated by scripts/check-audit.mjs.

Palette tests force CSS color-scheme in the local runner; production follows the browser/system preference. Scans wait for enhancement, fonts and finite palette transitions. Dialog scans exercise rendered states, not an end-to-end file import.

## Reports

- [axe-pages-dark-1280.json](axe-pages-dark-1280.json): 31 scans, 0 violations, 4 incomplete rule results.
- [axe-pages-dark-320.json](axe-pages-dark-320.json): 31 scans, 0 violations, 5 incomplete rule results.
- [axe-pages-light-1280.json](axe-pages-light-1280.json): 31 scans, 0 violations, 4 incomplete rule results.
- [axe-pages-light-320.json](axe-pages-light-320.json): 31 scans, 0 violations, 5 incomplete rule results.
- [axe-states-dark-1280.json](axe-states-dark-1280.json): 3 scans, 0 violations, 1 incomplete rule results.
- [axe-states-dark-320.json](axe-states-dark-320.json): 3 scans, 0 violations, 2 incomplete rule results.
- [axe-states-light-1280.json](axe-states-light-1280.json): 3 scans, 0 violations, 1 incomplete rule results.
- [axe-states-light-320.json](axe-states-light-320.json): 3 scans, 0 violations, 2 incomplete rule results.

## Theme-specific verification

Visually inspected the home page in both palettes, the dark checklist and light design guidance. Self-hosted Red Hat fonts, blue pill actions, neutral cards, fields and navigation are visible in the rendered previews. The theme retains native control semantics and 44px primary action targets. No checklist data or behavior was changed.

Calculated key token pairings (relative luminance):

- light secondary text: #4d4d4d on #f2f2f2, 7.55:1.
- dark secondary text: #c7c7c7 on #292929, 8.61:1.
- light interactive: #0066cc on #ffffff, 5.57:1.
- dark interactive: #92c5f9 on #292929, 8.02:1.
- light control boundary: #707070 on #f2f2f2, 4.42:1.
- dark control boundary: #a3a3a3 on #292929, 5.77:1.
- light destructive text: #ffffff on #b1380b, 6.1:1.
- dark destructive text: #151515 on #f89b78, 8.65:1.

## Remaining coverage

- Human assistive technology and announcement quality were not tested.
- OS forced colors, actual zoom/text spacing overrides and additional browsers were not tested.
- The full import/export file roundtrip and blocked-storage/JavaScript-disabled flows were not tested.
- 24 incomplete axe color-contrast rule results remain for human review: decorative arrows/keycaps, offscreen table cells, and modal paragraph background-overlap detection. These are not counted as passes.

The earlier November 6 interaction observations and fixes are archived in [history/2026-11-06/README.md](history/2026-11-06/README.md); they are historical evidence, not newly repeated manual tests. Current machine-readable results: [review.json](review.json). Theme sources and migration notes: [../docs/felt-theme.md](../docs/felt-theme.md).

## Reproduce

Run npm run audit, open the printed local runner URL and choose Scan full matrix. Then run npm run audit:check. Preview selected page lets reviewers inspect the selected page, palette and width without saving a report. This runner is excluded from the published site. Changes remain uncommitted.
