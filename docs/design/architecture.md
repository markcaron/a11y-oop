# a11y-oop: architecture and action plan

Status: Maintainer design record and future inventory, updated 2026-11-10. The simplified layout is the current draft pilot.

For using the plugin, start with the [README](../../README.md) and [usage guide](../usage.md). For editing a small piece, start with [Contributing](../../CONTRIBUTING.md). This plan is optional deeper reading, not user onboarding.

The current a11y-review plugin contains three modal-only draft skills: a11y-source-audit, a11y-keyboard-test, and a11y-report. Structural/portability checks and behavioral case specifications are maintained in evals/. Behavioral scenarios remain unexecuted; actual client loading and behavioral accuracy still need verification.

The intended scope is broad accessibility across content, page structure, forms, navigation, visual design, interaction patterns, reusable components, and complete user journeys. Component-level review is one part of that scope. Modal dialogs are the first bounded test case for validating the skills and their handoffs, not the boundary of the project. The broader coverage remains planned until implemented and evaluated.

AI Helpers’ PatternFly plugin stays separate. The Alloy site and original generated skills remain on site-archive. This work does not restore the site or adopt the old checklist. The 18-skill inventory below is a backlog, not a requirement to create every file or plugin.

## 1. Architecture and progressive disclosure

People encounter three levels:

1. **Start:** README.md explains the three supported tasks, gives one prompt per task, and links to installation.
2. **Use:** docs/usage.md explains useful inputs, expected outputs, limitations, and how to combine the skills. docs/installation.md holds client-specific detail.
3. **Maintain:** CONTRIBUTING.md leads to evaluations and this design inventory only when someone needs them.

The AI tool running a skill selects references and handles review bookkeeping. A person should not need to understand check IDs, evidence records, browser matrices, or evaluation infrastructure before requesting a focused review.

The implementation has two main content areas:

- **skills/:** Task entrypoints, including procedures specific to that task. The source-review and keyboard procedures live directly in their respective SKILL.md files.
- **references/:** Shared expectations and conditional detail. review-guide.md consolidates scope, results, coverage, and handoffs. Other files support modal expectations, naming, focus, browser coverage, rendered semantics, cross-root relationships, check IDs, and source provenance.

Methods, checklists, and recipes remain useful concepts without requiring top-level directories. A substantial reused method can be a reference. Checklists can be views of checks.json. User-facing workflow recipes live in the usage guide; add separate workflow guides only when their size or reuse warrants it.

Distribute related skills as one plugin. The first is a11y-review, with the a11y- skill prefix. Add another plugin only when there is a clear separate installable capability. No build or standalone skill ZIP is needed.

## 2. Current directory structure

This is the local implemented layout. The later inventories describe possible additions; create them as reviewed work becomes necessary.

```text
a11y-oop/
├── README.md
├── CONTRIBUTING.md
├── AGENTS.md
├── LICENSE
├── NOTICE
├── .claude-plugin/marketplace.json
├── .cursor-plugin/marketplace.json
├── docs/
│   ├── usage.md
│   ├── installation.md
│   └── design/
│       ├── architecture.md
│       └── future-skill-prompts.md
├── plugins/a11y-review/
│   ├── .claude-plugin/plugin.json
│   ├── .cursor-plugin/plugin.json
│   ├── LICENSE
│   ├── NOTICE
│   ├── skills/
│   │   ├── a11y-source-audit/SKILL.md
│   │   ├── a11y-keyboard-test/SKILL.md
│   │   └── a11y-report/SKILL.md
│   └── references/
│       ├── review-guide.md
│       ├── modal-dialog.md
│       ├── names-and-descriptions.md
│       ├── focus-and-native-dialogs.md
│       ├── browser-coverage.md
│       ├── rendered-semantics.md
│       ├── checks.json
│       ├── sources.json
│       └── web-components/cross-root-relationships.md
├── scripts/
│   ├── validate.py
│   └── plugins.py
└── evals/
    ├── README.md
    ├── cases/modal-workflow.json
    ├── fixtures/
    └── tests/test_plugins.py
```

The four separate contracts are replaced by references/review-guide.md. The former source/keyboard method files are merged into their skills. The modal recipe is explained in docs/usage.md. The separate library/, methods/, contracts/, checks/, sources/, and recipes/ directories are no longer part of the plugin layout.

Keep shared files flat while the pilot is small. Introduce topic subfolders only when enough material exists to make discovery easier. The proposed paths below show possible grouping, not empty scaffolds to generate.

## 3. Reference library: foundations

These are candidate topics used across design systems and frameworks. references/names-and-descriptions.md and references/focus-and-native-dialogs.md already support the pilot. The remaining entries below are planned; deeper detail should be added only when it changes a skill’s decisions.

```text
references/
├── standards-and-guidance.md
├── native-html-and-aria.md
├── names-and-descriptions.md
├── focus-and-native-dialogs.md       # Implemented pilot reference
│
├── content/
│   ├── language-and-readability.md
│   ├── typography-and-text-semantics.md
│   ├── headings-and-labels.md
│   ├── lists-and-grouping.md
│   └── instructions-and-sensory-language.md
│
├── structure/
│   ├── page-titles-and-language.md
│   ├── landmarks-and-regions.md
│   ├── reading-and-focus-order.md
│   ├── navigation-and-wayfinding.md
│   └── tables-and-data-relationships.md
│
├── interaction/
│   ├── links-and-actions.md
│   ├── keyboard-and-shortcuts.md
│   ├── focus-visibility-and-management.md
│   ├── pointer-touch-and-dragging.md
│   ├── hover-and-focus-content.md
│   ├── hidden-disabled-and-inert.md
│   └── dynamic-content-and-announcements.md
│
├── forms/
│   ├── labels-instructions-and-descriptions.md
│   ├── grouping-fieldset-and-legend.md
│   ├── input-types-purpose-and-autocomplete.md
│   ├── required-readonly-and-disabled.md
│   ├── validation-errors-and-recovery.md
│   ├── multistep-and-repeated-entry.md
│   └── authentication-and-error-prevention.md
│
├── visual/
│   ├── color-and-noncolor-cues.md
│   ├── text-and-nontext-contrast.md
│   ├── zoom-reflow-and-orientation.md
│   ├── text-spacing-and-overrides.md
│   ├── forced-colors-and-user-preferences.md
│   └── motion-flashing-and-time-limits.md
│
└── media/
    ├── images-icons-and-alternatives.md
    ├── charts-and-complex-graphics.md
    └── audio-video-and-alternatives.md
```

Deliberate boundaries:

- **Typography pedantics:** Separate semantic requirements from editorial preferences.
- **Links:** Cover purpose, accessible name, context, visual affordance, and activation behavior together.
- **Forms:** Give composition and error recovery as much attention as individual controls.
- **Tables:** Establish static table semantics here; interactive grid behavior belongs in the pattern library.
- **Color:** Include states, charts, and control boundaries, alongside text contrast.

The [WCAG quick reference](https://www.w3.org/WAI/WCAG22/quickref/) provides a useful coverage cross-check. Maintain explicit coverage gaps rather than imply this inventory alone constitutes a complete conformance methodology.

## 4. Reference library: interaction patterns

Keep the current modal guidance at references/modal-dialog.md. Add focused files for other patterns under references/patterns/ when needed, with category folders only when they improve discovery. This inventory covers the [APG pattern catalog](https://www.w3.org/WAI/ARIA/apg/patterns/) reviewed for this proposal, with additional application patterns clearly identified.

```text
references/patterns/
├── selection-guide.md
│
├── content/
│   ├── accordion.md
│   ├── carousel.md
│   ├── disclosure.md
│   ├── feed.md
│   └── tabs.md
│
├── controls/
│   ├── button.md
│   ├── checkbox.md
│   ├── combobox.md
│   ├── listbox.md
│   ├── menu-and-menubar.md
│   ├── menu-button.md
│   ├── meter.md
│   ├── radio-group.md
│   ├── slider.md
│   ├── slider-multithumb.md
│   ├── spinbutton.md
│   ├── switch.md
│   ├── toolbar.md
│   └── window-splitter.md
│
├── overlays-and-feedback/
│   ├── alert.md
│   ├── alert-dialog.md
│   └── tooltip.md
│
├── navigation-and-structure/
│   ├── breadcrumb.md
│   ├── landmarks.md
│   └── link.md
│
├── data/
│   ├── grid.md
│   ├── table.md
│   ├── treeview.md
│   └── treegrid.md
│
└── application/                     # Beyond the APG pattern catalog
    ├── native-select.md
    ├── popovers-and-nonmodal-dialogs.md
    ├── drawers-and-side-panels.md
    ├── notifications-and-loading.md
    ├── pagination-filtering-and-sorting.md
    ├── routing-and-page-transitions.md
    └── file-upload-and-drag-drop.md
```

`selection-guide.md` resolves ambiguous requests such as “dropdown,” “popup,” or “clickable card.” It helps identify the intended behavior before selecting a reference.

Pattern files explain purpose, appropriate native alternatives, names and relationships, keyboard behavior, focus, states, common failures, and verification. Link shared principles rather than duplicating foundation prose.

**APG guidance and normative requirements remain distinguishable.** APG is informative, and its examples illustrate approaches rather than exhaust every valid implementation. See the [APG introduction](https://www.w3.org/WAI/ARIA/apg/about/introduction/).

## 5. Reference library: runtimes and design systems

Framework and design system are separate choices. A React page can contain Web Components and more than one component library.

```text
references/
├── native-html.md
├── react/
│   ├── semantics-and-prop-forwarding.md
│   ├── ids-labels-and-relationships.md
│   ├── state-focus-and-lifecycle.md
│   └── portals-routing-and-hydration.md
├── web-components/
│   ├── shadow-dom-and-slots.md
│   ├── element-internals-and-forms.md
│   ├── cross-root-relationships.md      # Implemented pilot reference
│   └── focus-events-and-lifecycle.md
└── mixed-applications.md

references/providers/
├── selection-and-versioning.md
├── patternfly/
│   ├── index.md
│   ├── consumer-responsibilities.md
│   ├── component-author-responsibilities.md
│   ├── content-authoring.md
│   ├── gotchas.md
│   └── documentation-and-mcp.md
├── rhds/
│   ├── index.md
│   ├── consumer-responsibilities.md
│   ├── component-author-responsibilities.md
│   ├── content-authoring.md
│   ├── gotchas.md
│   └── documentation-and-mcp.md
├── pfe/
│   ├── index.md
│   └── compatibility-and-differences.md
└── felt/
    ├── index.md
    ├── react.md
    ├── web-components.md
    └── migration-and-coexistence.md
```

Provider references contain verified exceptions and responsibilities, with version scope. They link to current component documentation rather than duplicating entire API manuals.

Felt entries remain planned until actual documentation supports their contents. Do not assume its React architecture or invent component APIs.

### Browser, state, and component verification requirements (PFE comparison, 2026-11-10)

The [PFE review-a11y skill](https://github.com/patternfly/patternfly-elements/blob/staging/pfv6/.claude/skills/review-a11y/SKILL.md) identified requirements to make explicit within existing skills; no additional skill names are needed.

- **Browser matrix:** Select required browsers/OS from supported environments and record availability per method. For Web Components without a policy, propose Chromium and Firefox as an assumption; include WebKit/Safari when the target platforms require it. A missing required environment is a gap, not an inherited pass. Compare functional semantics and behavior, not exact tree serialization.
- **State/transition expectations:** Map each applicable state to expected names, roles, values, relationships, visibility, and focus, including return transitions and reopening. Distinguish keyboard, computed-semantics, visual, and AT evidence. Snapshot fields omitted by tooling do not establish browser defects or announcements.
- **Cross-root procedure:** Map source/target endpoints, DOM roots, mechanism, expected outcome, actual computed evidence, and browser/tool versions. Distinguish declarative IDs, element reflection, native behavior, and ElementInternals. Verify current API scope/support and fallback behavior; do not copy dated support tables or prescribe universal live-region workarounds.
- **Demos and documentation:** Component-author reviews include representative demos and copyable snippets, supported states, and consumer responsibilities. Keep project-specific InternalsController or public-attribute conventions in provider guidance. This does not automatically expand consumer audits into documentation reviews.
- **Form-associated custom elements (planned):** Make submission values, validity/validation, reset, disabled propagation, label association, and state restoration explicit in Web Component form references and component-author checks. This remains outside the modal pilot.
- **Regression traceability (planned):** Connect critical state/relationship expectations and findings to persistent tests, or explicit browser/human checks where automation cannot establish the outcome. Apply in a11y-test-gen, a11y-retest, and component-development handoffs. A snapshot test is not proof of human AT behavior.

Avoid false universal rules: disabled composite-widget items may remain focusable; accordion regions are optional; provider controllers and particular MCPs are not universal prerequisites. Interpret expectations through the actual pattern and platform sources, including [APG disabled-control guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls) and [APG accordion guidance](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

The current modal pilot includes references/browser-coverage.md, references/rendered-semantics.md, references/web-components/cross-root-relationships.md, modal state expectations, and evaluation cases. Task-specific procedures remain in the source and keyboard skills. Real cross-browser/AT execution and behavioral comparison remain pending; authoring these cases does not establish that the plugin passed them.

## 6. Proposed skill inventory

Skill boundaries remain candidates: merge or split them based on routing evidence, not a target count. The inventory contains **18 skill names**. Three are implemented as modal-only drafts (a11y-source-audit, a11y-keyboard-test, a11y-report); the other 15 remain candidates. Every listed name corresponds to `skills/<name>/SKILL.md`.

Every independently invoked skill must reuse an applicable scope record or establish a minimal one before proceeding. `a11y-plan` provides fuller planning; it is not a prerequisite for using another skill. Scope and output follow references/review-guide.md: a focused request needs a brief scope and evidence-backed findings, while detailed IDs/coverage records support audits and handoffs. Neither should become a mandatory questionnaire.

### Planning and design

- **`a11y-plan`** — Define targets, user tasks, significant states, standards profile, sampling, capabilities, and coverage. Produces a scoped review plan. Uses the shared review guide, sampling guidance, and applicable check profiles when those are implemented.
- **`a11y-design-review`** — Review designs and interaction specifications using relevant foundation and pattern references plus design-inspection methods. Identifies implementation requirements and questions that need runtime verification.
- **`a11y-content-review`** — Review copy, headings, link text, instructions, alternatives, and semantic content structure. Uses content, naming, structure, links, forms, and media references as applicable. Separates accessibility findings from editorial advice.
- **`a11y-checklist`** — Assemble a role/task-specific checklist from shared check IDs. Produces an actionable view without introducing new rules.

### Implementation review

- **`a11y-source-audit`** — Review HTML, CSS, JavaScript, JSX, or component source. Uses its source-review procedure and selects foundation, pattern, runtime, and provider guidance. Records what still needs execution.
- **`a11y-pattern-review`** — Evaluate a specified interaction against its intended pattern across available designs, source, and running behavior. Uses pattern selection, matching pattern references, and methods appropriate to the available evidence.
- **`a11y-component-review`** — Review a reusable component’s public accessibility contract: defaults, APIs, names, states, slots/children, documentation, and consumer duties. Uses matching foundation, pattern, runtime, and provider-author guidance.
- **`a11y-authoring-review`** — Review templates, editors, and content workflows for accessible output and author support. Uses content/media/form foundations and provider-authoring guidance. Include authoring-interface scope explicitly when relevant; detailed authoring-tool standards coverage requires its own source review.

### Runtime evaluation

- **`a11y-automated-test`** — Run available automated checks across defined pages and states; triage violations and incomplete results. Uses automated-scanning methods and relevant runtime/provider limitations.
- **`a11y-keyboard-test`** — Exercise user tasks, focus order, activation, composite controls, containment, and restoration. Uses its keyboard-testing procedure, interaction references, and matching pattern references.
- **`a11y-semantics-review`** — Inspect rendered names, roles, relationships, states, structure, and updates using available browser evidence. Uses shared rendered-semantics guidance and relevant foundation/runtime references.
- **`a11y-visual-review`** — Evaluate contrast, zoom, reflow, spacing, focus visibility, preferences, and pointer/touch conditions. Uses visual-and-preference methods and matching visual/interaction foundations.
- **`a11y-at-test`** — Prepare and document assistive-technology testing; execute supported interactions when capabilities exist and distinguish human results from browser inspection. Uses AT methods and relevant task/pattern expectations.

### Remediation and maintenance

- **`a11y-report`** — Consolidate findings and coverage, preserve evidence origins, deduplicate underlying problems, and identify remaining gaps. Uses the shared review guide’s consolidation rules; consults references to resolve classification questions.
- **`a11y-remediation-plan`** — Group findings by cause, ownership, dependency, impact, and verification needs. Uses existing evidence, relevant references, and the shared review guide’s handoff rules.
- **`a11y-fix`** — Implement requested fixes using applicable references and real project APIs; surface decisions requiring product judgment. Selects foundation, pattern, runtime, and provider guidance for the actual target.
- **`a11y-test-gen`** — Add persistent tests following the project’s test conventions and the behaviors each test can actually verify. Uses regression-testing methods, relevant expectations, and runtime/provider details.
- **`a11y-retest`** — Verify fixes, check related regressions, and update finding status with new evidence. Selects the original finding’s references and suitable verification methods.

Do not create separate skills for every pattern, framework, or provider. For example, `a11y-source-audit` loads React and PF references when appropriate. This keeps skill discovery manageable.

## 7. Workflow examples and handoffs

The current source → keyboard → report example lives in docs/usage.md. These additional workflows are planned usage scenarios, not a required recipes/ directory or agent service. Keep simple sequences in the usage guide; split out a guide only when that makes it easier to use.

- **Design to development:** Plan → design review → content review → implementation checklist and handoff.
- **Pull request review:** Source audit → relevant pattern/component review → targeted runtime checks → report.
- **Existing experience audit:** Plan → automated, keyboard, semantics, visual, and AT testing → consolidated report.
- **Component development:** Define contract → design/pattern review → source and demo/snippet review → browser/state verification → traceable regression tests and documentation.
- **Content publication:** Content review → authoring review where applicable → targeted rendered checks.
- **Remediation and retest:** Report → remediation plan → requested fixes → tests → retest.
- **Release review:** Select critical journeys → run applicable checks → retest known findings → summarize remaining risk and coverage.
- **Design-system adoption:** Identify runtime/provider changes → source/component review → behavior verification → regression testing.

Each documented workflow identifies useful inputs, conditional steps, expected outputs, and when to stop. A short request does not need a separate record file; detailed handoffs use the shared review guide. Unavailable capabilities produce explicit gaps.

The first step validates or establishes brief scope, even when a workflow begins directly with an audit. Detailed handoffs carry scope ID/version, check and finding IDs, result records, unresolved questions, and coverage gaps; a quick review can pass concise findings and limitations. A receiving skill records scope changes explicitly rather than silently dropping targets, states, or unresolved findings.

## 8. Shared guidance and proportionate results

The canonical rules live in [the shared review guide](../../plugins/a11y-review/references/review-guide.md), replacing the four scope/result/coverage/handoff contracts. Maintain those rules there rather than duplicate them in every skill or require users to learn them.

### A focused review

Discover the target and relevant states from the request and available project context. Ask only for information that blocks useful work. Return evidence-backed findings, suggested changes, and a short statement of untested work. Do not require checklists, result matrices, a separate scope file, or internal IDs as user inputs.

### An audit, repeat test, or handoff

Preserve the scope and stable finding IDs, required check/method/state/environment units, revision, expected versus actual behavior, evidence, limitations, and next verification steps. A result unit is check + target/state or transition + method + environment + revision; it is not a universal component verdict. Record unknowns explicitly. Use structured prose unless machine-readable output is requested.

Status meanings remain Pass, Fail, Not applicable, Not tested, Inconclusive, and Not assessed. A source pass cannot erase a keyboard failure; a substantiated intermittent failure remains Fail despite a passing repeat. Use Inconclusive only when evidence cannot establish whether failure occurred. Keep browser, state, revision, and method origins separate. Required environments that were unavailable remain gaps, and checklist completion is not conformance.

### Reference-writing conventions

Each substantive reference states applicability, expectation, authority, exceptions, useful examples, verification limits, and sources/versions. Distinguish normative requirements, APG guidance, provider requirements, and recommendations. checks.json links expectations to stable IDs without duplicating all prose; sources.json records provenance. Split a reference only when size or reuse makes the split useful.

Keep human AT evidence, source inference, browser observations, visual inspection, and automated output distinct. These safeguards remain even when the final response is brief.

## 9. Plugin distribution and website boundaries

The installable unit is a plugin containing related skills and all canonical supporting resources. The first is plugins/a11y-review/, containing skills/ and shared references/. Maintain identical Claude/Cursor plugin manifests and repository marketplace catalogs. More plugins can be added when their scope warrants separate installation.

No individual-skill ZIPs, dependency-copying build, path rewriting, or dist/ directory are required. Keep required local references inside the plugin boundary, and validate their existence after copying only the plugin into a clean installed location. Optional reading can remain external. Shipping resources together does not mean loading every reference for every task; retain task-specific loading triggers.

Prove plugin portability during the first workflow. Also test actual host discovery separately: a filesystem-copy test cannot establish that the client loaded or invoked the plugin correctly. Keep behavioral evaluation distinct from both structural and host-loading checks.

A future website may consume the canonical plugin resources. It must not own a competing copy of guidance or become a prerequisite for plugin installation. No site is included in this skills/plugin phase.

## 10. Next steps and expansion plan

### Phase 1: Review the simplified experience

Review the README, usage guide, and one illustrative result. Confirm that a person can choose a task, supply useful input, and understand the output without opening contributor or design material. Keep the full roadmap behind contributor links.

Deliverable: An understandable local entry point and agreed content depth. The uncommitted restructuring is ready for this review.

### Phase 2: Review the three skill boundaries

Review the task entrypoints, shared review guide, and modal reference. Keep task-specific procedures in their skills and conditional detail in references/. Avoid introducing new directories or formal outputs without a demonstrated need. Preserve scope, evidence, and handoff safeguards.

Deliverable: A focused, maintainable three-skill pilot. Do not expand to all 18 skills during this step.

### Phase 3: Verify installed-plugin discovery

Structural and copy-portability tests pass. Next, load the complete plugin in a supported client and confirm all three skills are discoverable and can read their shared references. No website, build step, or contributor Python installation is required just to use the instructions; browser work needs host capabilities.

Deliverable: Recorded real-client discovery/reference-loading evidence, distinct from filesystem checks.

### Phase 4: Prove one complete workflow

Exercise the existing `a11y-source-audit`, `a11y-keyboard-test`, and `a11y-report` modal drafts. Use a PF example and a Web Component example to test the same expectations across runtimes/providers without expanding into a full form audit.

Install the complete a11y-review plugin in a clean workspace outside the source repository, with no access to source-only resources, and verify actual host discovery separately. Execute the source-review → keyboard-test → report workflow against copied fixtures. Also invoke each skill independently to verify minimal scope initialization, proportional output, and plugin completeness. Include a small request that should not trigger a formal audit report.

Deliverable: A repeatable installed-plugin workflow with useful evidence, intact handoffs, and no dependencies on the authoring checkout.

### Phase 5: Evaluate behavior

Use broken examples, valid alternatives, missing capabilities, and mixed runtimes. Check missed issues, false positives, evidence quality, and overclaiming.

Compare skill-on and skill-off runs on the same tasks, fixtures, model configuration, and tool capabilities. Record plugin commits, prompts, outputs, and adjudicated outcomes. Assess correct findings, missed defects, false positives, evidence fidelity, and coverage reporting. Define expected outcomes and acceptance criteria before running the comparison; do not tune the rubric to the generated wording.

Include browser coverage gaps, functional snapshot differences, hidden relationship fields, cross-root positive/negative pairs, and stale state after reopening in the evaluation suite. Do not mistake fixture authoring for execution.

Test routing for overlapping requests: design versus source review, automated testing versus test generation, pattern versus component review, and planning versus direct invocation. Verify that selection follows the requested task and that it does not expand into unrelated actions.

### Evaluation release gate

Before expanding the pilot or releasing a plugin:

- Every required packaging, scope, status, conflict-handling, and handoff case must pass.
- No evaluated case may fabricate runtime/AT evidence, claim unsupported conformance, turn missing or inconclusive evidence into a pass, or lose an unresolved finding during consolidation. Any such occurrence blocks release until fixed and retested.
- The initial modal suite must detect each seeded blocking defect and accept its designated valid alternatives. Preserve distinctions between normative violations and pattern guidance.
- Routing cases must select an appropriate task boundary, and independently invoked skills must initialize or reuse scope successfully.
- Against the skill-off baseline, demonstrate a documented benefit in at least one preselected quality dimension without regressions in the blocking behaviors or the fixture suite’s required correctness outcomes. If results are mixed or unstable, repeat matched cases and resolve material regressions before proceeding.

These are gates for the declared evaluation suite, not proof of universal correctness. Keep human review of evidence and limitations, and grow the suite from observed failures.

Deliverable: Evaluation cases, matched baseline comparisons, and an explicit pass/block decision supported by retained results.

### Phase 6: Expand foundations and runtime coverage

Add content, visual conditions, rendered semantics, automation, and corresponding skills.

Deliverable: A tested core library and a small usable skill collection.

### Phase 7: Expand patterns and providers

Write references as representative examples become available. Introduce complex grids, trees, and authoring workflows later.

Deliverable: Incrementally validated coverage, with remaining gaps visible.

### Phase 8: Refine plugin documentation and distribution

Keep manifests, marketplace discovery, and installation/usage guides aligned with what is implemented. Add user-facing examples as capabilities become available instead of advertising the full roadmap. Keep contributor checks and design records behind deeper links. Rerun portability and relevant behavioral checks for the distributed plugin.

Deliverable: A plugin people can discover, install, and use without studying its internal records. Website integration and optional downloads remain outside this work until explicitly resumed.

### Phase 9: Pilot and release

Test real workflows before advertising the complete candidate catalog. Require the evaluation release gate and installed-plugin checks to pass for the release artifacts. Contribute suitable PF improvements upstream independently.

Deliverable: A supported initial release with documented scope and limitations.

## Next milestone

The modal reference and three skills already exist as drafts. The next milestone is an understandable entry point plus one real installed-plugin source → keyboard → report exercise, with clear evidence and limitations. Review the quality of that experience before adding reference categories or skills. Real-client loading and behavioral evaluation remain outstanding; passing structural tests does not complete this milestone.
