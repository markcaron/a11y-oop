# a11y-oop: sample skill prompts

These examples use the **proposed skill names** from the [architecture and action plan](a11y-oop-architecture-plan.md). They are not all implemented yet. Each skill can be invoked independently.

Current pilot: a11y-source-audit, a11y-keyboard-test, and a11y-report are implemented as modal-only drafts. The other names below are planned. Broader form, page, and dashboard examples will require later reference coverage; use modal targets when trying the current pilot.

Replace bracketed placeholders with the relevant URLs, paths, or findings.

## Planning and design

### `a11y-plan`

> Use a11y-plan to prepare an accessibility review of our account settings flow. Inspect this repo for frameworks, component libraries, and existing tests. Include these Figma designs: [URL]. Identify the pages, states, tools, and human testing needed. Save the plan as Markdown.

### `a11y-design-review`

> Use a11y-design-review on this Figma flow: [URL]. Use Figma MCP if available. Review the default, validation, loading, and success states. Separate design findings, implementation requirements, and questions the designs don’t answer.

### `a11y-content-review`

> Use a11y-content-review on this onboarding flow: [URL or files]. Check headings, link text, labels, instructions, error messages, and image alternatives. Distinguish accessibility issues from editorial recommendations, and suggest revised wording.

### `a11y-checklist`

> Use a11y-checklist to create a designer checklist for a multistep registration form. Include grouped fields, validation, authentication, and confirmation. Link each check to its reference and identify what needs developer or QA verification.

## Implementation review

### `a11y-source-audit`

> Use a11y-source-audit on the current branch’s changes. Check our PF React form implementation, including labels, descriptions, required states, validation, and focus logic. Verify installed APIs and list findings that require runtime testing. Don’t change files.

### `a11y-pattern-review`

> Use a11y-pattern-review on this “dropdown”: [URL and source path]. First determine whether its intended behavior fits a native select, combobox, listbox, menu button, or disclosure. Review the implementation against the appropriate guidance.

### `a11y-component-review`

> Use a11y-component-review on this reusable Web Component: [directory]. Review its defaults, public API, accessible name, slots, states, focus behavior, and documentation. Distinguish component defects from consumer responsibilities.

### `a11y-authoring-review`

> Use a11y-authoring-review on our article editor and output template: [paths or URL]. Check whether authors can create accessible headings, links, images, and tables, and whether the published output preserves those semantics. Identify where defaults or guidance could prevent mistakes.

## Runtime evaluation

### `a11y-automated-test`

> Use a11y-automated-test against [local URL]. Inspect and reuse the repo’s existing tooling. Scan the initial page, expanded navigation, open modal, and form error state. Report violations, incomplete results, and coverage gaps. If tooling is missing, recommend the preferred setup before adding dependencies.

### `a11y-keyboard-test`

> Use a11y-keyboard-test on the checkout flow at [URL]. Complete the task without a pointer, including validation and the confirmation dialog. Check focus order, visibility, widget keys, traps, and focus restoration. Record reproduction steps for failures.

### `a11y-semantics-review`

> Use a11y-semantics-review on this dashboard: [URL]. Inspect rendered headings, landmarks, names, roles, table relationships, and expanded states. Include loading and filtering updates. Distinguish browser evidence from behavior that requires a screen reader.

### `a11y-visual-review`

> Use a11y-visual-review on [URL]. Check text and control contrast, focus visibility, zoom, reflow, text spacing, forced colors, and reduced motion. Exercise open overlays and error states. Record which conditions were actually tested.

### `a11y-at-test`

> Use a11y-at-test to prepare a human screen-reader test of this registration flow: [URL]. Target VoiceOver with Safari and NVDA with Firefox. Provide task steps, expected information and interactions, and fields for recording actual results. Leave unexecuted checks marked Not tested.

## Remediation and maintenance

### `a11y-report`

> Use a11y-report to consolidate these source, axe, keyboard, and screen-reader results: [files]. Deduplicate shared causes while preserving affected locations and evidence origins. Separate standards violations, pattern deviations, and recommendations. Include coverage gaps and next actions.

### `a11y-remediation-plan`

> Use a11y-remediation-plan on this report: [path]. Group findings by underlying cause and likely owner. Recommend an implementation order based on user impact and dependencies, with acceptance criteria and a verification method for each fix.

### `a11y-fix`

> Use a11y-fix to address findings FORM-03 and FOCUS-02 in [report path]. Follow the existing component APIs and project conventions. Make the fixes, run relevant checks, and identify any wording or interaction decisions that need product input.

### `a11y-test-gen`

> Use a11y-test-gen to add regression coverage for this modal’s accessible name, keyboard operation, initial focus, and focus restoration. Reuse the repo’s test framework. Include an axe scan where supported, and explain which behaviors still require human testing.

### `a11y-retest`

> Use a11y-retest to verify the fixes listed in [report path] against [URL or commit]. Repeat the original reproduction steps and check related states for regressions. Update each finding with evidence and a status; explain anything you couldn’t verify.
