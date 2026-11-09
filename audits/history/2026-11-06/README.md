# Accessibility review — a11y-oop

Reviewed November 6, 2026 using the repository’s `uxd-a11y-source-audit`, `uxd-a11y-runtime-review` and `uxd-a11y-release` modules.

**Result: automated checks and the selected interaction checks pass. Full WCAG conformance is not established.**

Alloy was updated with Homebrew from **0.3.1 to 0.7.0**. The 31-page build and five Node tests pass on the new version. axe-core **4.14.0** is a development-only dependency. Original RHDS prose/vendor sources are preserved; fixes affect presentation, naming, focus and code scrolling.

## Executed matrix

All **136 scans** returned zero violations: all 31 default pages plus three checklist states (expanded visible details, reset dialog, import dialog), in light/dark palettes at 1280/320 CSS pixels. All 124 default-page scans also reported no page-wide horizontal overflow. Code and data tables may scroll in their own containers.

Browser-reported environment: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36`. Tags: `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`. Palette tests explicitly set CSS color-scheme; they are not an OS preference or AT test. Scans wait for component enhancement, fonts and finite palette transitions. An earlier transition sample is retained in baseline/ and is not a settled-palette result.

- [axe-pages-light-1280.json](axe-pages-light-1280.json): 31 scans, 0 violations; 4 incomplete rule results retained.
- [axe-states-light-1280.json](axe-states-light-1280.json): 3 scans, 0 violations; 1 incomplete rule results retained.
- [axe-pages-dark-1280.json](axe-pages-dark-1280.json): 31 scans, 0 violations; 4 incomplete rule results retained.
- [axe-states-dark-1280.json](axe-states-dark-1280.json): 3 scans, 0 violations; 1 incomplete rule results retained.
- [axe-pages-light-320.json](axe-pages-light-320.json): 31 scans, 0 violations; 5 incomplete rule results retained.
- [axe-states-light-320.json](axe-states-light-320.json): 3 scans, 0 violations; 1 incomplete rule results retained.
- [axe-pages-dark-320.json](axe-pages-dark-320.json): 31 scans, 0 violations; 5 incomplete rule results retained.
- [axe-states-dark-320.json](axe-states-dark-320.json): 3 scans, 0 violations; 1 incomplete rule results retained.

## Corrections and retest

### AOP01 · VIS01

Required input/select/textarea boundaries contrasted 1.49:1 in light mode and 2.10:1 in dark mode against their surfaces.

**Correction:** Separate control-border token: #778078 on #fff (4.08:1) and #8ca493 on #233129 (5.09:1). Decorative dividers keep their lighter token.

**Retest:** Rendered light-mode CSS inspected; dark provider palette checked; full light/dark scans and control checks after change.

Classification: normative violation. Confidence: confirmed.

### AOP02 · TXT02

axe flagged the brand on every page: decorative text glyph and an overriding aria-label created ambiguous visible/name matching.

**Correction:** Use an empty-alt logo image and derive the link name from visible brand text plus a hidden home suffix.

**Retest:** 31 baseline label-content-name-mismatch results; zero after change in all four page profiles. Native accessibility name is a11y oop home.

Classification: automated naming finding. Confidence: confirmed scanner flag; no human speech-input test.

### AOP03 · STR04

Adapted explanatory asides created repeated unnamed complementary landmarks; desktop/mobile screen-reader navigation groups also lacked distinct names.

**Correction:** Use non-landmark note wrappers and distinct navigation labels without changing prose.

**Retest:** Baseline landmark-unique results on four pages; none in final scans.

Classification: best practice. Confidence: confirmed.

### AOP04 · STR02

A Note label in the development introduction skipped from the page h1 to h3.

**Correction:** Keep the word Note as emphasized text instead of a structural heading.

**Retest:** Baseline heading-order result; none after change. Not independently asserted as a WCAG failure.

Classification: best practice. Confidence: confirmed.

### AOP05 · STR03, INT03

Focus ownership was checked after hiding a filtered-out card, when the browser could already have moved focus away.

**Correction:** Capture focus ownership before filtering, then focus a results heading that becomes visible on focus.

**Retest:** Changing TAB01 to Pass under the Not assessed filter reduced four visible checks to three and placed focus on Checklist results. Subsequent Tab navigation reached Export, Import and Start over.

Classification: source focus risk. Confidence: source risk before change; corrected runtime behavior observed.

### AOP06 · INT01

Home statistics used aria-label on an unnamed generic div, flagged as incomplete by axe.

**Correction:** Give the intentionally named statistics collection a group role.

**Retest:** No aria-prohibited-attr result on home in final scans.

Classification: semantic naming finding. Confidence: confirmed source issue.

### AOP07 · VIS03

The recipe page code block lacked the prose wrapper that constrains overflow; the whole page scrolled horizontally at 320 CSS pixels.

**Correction:** Apply the existing prose/code styling so the code example can scroll within its own region.

**Retest:** Baseline 320-pixel page overflow; no page-wide overflow in all 124 final page scans.

Classification: reflow finding. Confidence: confirmed.

### AOP08 · INT02

Overflowing code examples on CI/CD, Content and Development could not receive keyboard focus at narrow widths.

**Correction:** Give code examples tabindex=0 only when they actually overflow; ResizeObserver updates this as layout changes.

**Retest:** Three baseline scrollable-region-focusable results; none in final 320-pixel profiles.

Classification: normative violation. Confidence: confirmed.

## Observed interaction checks

- **Keyboard bypass:** Observed focus on Skip to main content, then main.
- **Filtered-result focus:** Four checks became three; focus moved to visible Checklist results heading. Selection used the native control value API, not a full select-menu keyboard test.
- **Modal keyboard and cancellation:** Three Tabs from results heading and Enter opened reset. Keep my progress received focus; Tab reached Clear all progress; Escape returned to Start over. Background content was absent from modal AX scope.
- **Visible focus:** Start over matched :focus-visible; solid 3px rgb(153,80,0) outline. Dialog screenshot recorded cancel focus and unobscured content.
- **Reset:** After confirm: 0 of 66 reviewed, four table checks restored, filters unchanged, focus on Start over.
- **Required exclusion reason:** Details opened automatically; required reason and instruction exposed; count stayed zero until text was entered, then became one. Test result was cleared afterward.

## Remaining coverage

- **G01 · Not tested — Human assistive technology:** No real screen-reader speech, speech-input, magnifier, switch-control or participant session. AX snapshots are not substitutes. Dynamic announcement quality still needs human verification.
- **G02 · Not tested — OS forced colors / high contrast:** CSS fallback reviewed, but no Windows forced-colors or OS high-contrast session was executed. Light/dark tests use a CSS color-scheme override.
- **G03 · Not tested — Additional adaptation:** No actual browser zoom/text-only 200% session, WCAG text-spacing override, portrait/landscape device session or complete target-size exception inventory in this run. Narrow 320-pixel reflow scans do not replace these.
- **G04 · Not tested — Additional environments and flows:** Single Chrome 156/macOS-reported browser environment. No Safari/Firefox/mobile matrix, full import/export file roundtrip, blocked-storage browser simulation, or JavaScript-disabled browser session in this run. Unit import validation passes. Dialog state scans open dialogs directly and are not end-to-end file-upload tests.
- **G05 · Needs review / partial triage — Axe incomplete contrast:** Axe retains non-character arrow/keycap checks, offscreen media-table cells at 320px, and a reset-dialog paragraph background-overlap result. Decorative arrows do not carry independent meaning. Reset paragraph was visibly legible and measured #242c28 on #fff in light mode; dark CSS uses #eff3eb on #233129. Offscreen cells remain review items, not failures or automated passes.

No human AT or disabled-participant results are implied. Native browser accessibility trees and automated scans are separate evidence origins. No unresolved confirmed defect was found in the executed scopes; applicable untested methods prevent an overall conformance/pass claim.

## Reproduce

Run `npm ci`, then `npm run audit`. Open the printed local URL and choose **Scan full matrix**. After it completes, run `npm run audit:check`. This local runner is not included in the published site. It does not alter checklist progress; manual test entries were cleared.

Machine-readable scope, findings, source hashes and coverage gaps: [review.json](review.json). Baseline findings: [baseline](baseline/). Changes are uncommitted.
