# a11y-oop: architecture and action plan

Status: Proposal for review. No implementation or migration is implied by this document.

Implementation note (2026-11-09): The three modal-only draft skills now ship together as the a11y-review plugin under plugins/a11y-review/. Its canonical library, contracts, methods, checks, recipes, and sources are inside that plugin. The repository has matching Claude/Cursor plugin manifests and marketplace catalogs. The broader inventory remains planned; no Alloy site, retained RHDS pages, historical checklist, or dist/ build is included.

This plan maps the proposed reference library, skills, methods, checklists, recipes, and directory structure for a11y-oop. It describes the intended scope, not a requirement to generate every file immediately.

AI Helpers’ existing PatternFly plugin stays separate and supported. The current a11y-oop skills are drafts to evaluate and replace; their names, structure, and checklist count are not requirements for this work.

## 1. Architecture

The library has five distinct responsibilities:

- **References:** What to consider, why it matters, applicability, exceptions, and examples.
- **Methods:** How to inspect or test something and what the evidence can establish.
- **Skills:** Tasks that select references and methods and produce useful results.
- **Recipes:** Sequences of skills with shared inputs and handoffs.
- **Checklists:** Role-specific views of shared checks, usable with or without an assistant.

Plugins distribute these resources together. A future website can present the same canonical guidance without owning a separate copy.

Distribute related skills as plugins. The first plugin is a11y-review; do not create one plugin per skill.

Use **`a11y-` as the proposed working skill prefix** for this independent project. Settle branding before publishing.

## 2. Proposed directory structure

The tree shows the implemented plugin layout. The expanded reference and skill inventories in later sections remain a backlog. All installed resources stay within their plugin; repository-level contributor tools do not need to be installed.

```text
a11y-oop/
├── .claude-plugin/marketplace.json
├── .cursor-plugin/marketplace.json
├── AGENTS.md
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── NOTICE
├── plugins/
│   └── a11y-review/                 # One installable plugin
│       ├── .claude-plugin/plugin.json
│       ├── .cursor-plugin/plugin.json
│       ├── LICENSE
│       ├── NOTICE
│       ├── skills/                  # Three implemented modal-only drafts
│       │   ├── a11y-source-audit/SKILL.md
│       │   ├── a11y-keyboard-test/SKILL.md
│       │   └── a11y-report/SKILL.md
│       ├── library/                 # Shared canonical expectations
│       │   ├── foundations/
│       │   └── patterns/
│       ├── methods/
│       ├── contracts/
│       │   ├── scope.md
│       │   ├── results.md
│       │   ├── coverage.md
│       │   └── handoffs.md
│       ├── checks/catalog.json
│       ├── recipes/modal-review.md
│       └── sources/registry.json
├── docs/                            # Plans and contributor documentation
├── scripts/                         # Manifest and reference validation
└── evals/                           # Contributor tests and behavioral cases
    ├── cases/
    ├── fixtures/
    └── tests/
```

Future runtime/provider references, checklist profiles, additional methods, and recipes from the inventory below belong inside the relevant plugin. Add schemas or further plugins only when their implementation needs them.

`library/` contains expectations. `methods/` contains procedures. `contracts/` defines how work is recorded. Keeping those separate prevents every skill from accumulating its own audit methodology.

## 3. Reference library: foundations

These are the shared topics used across design systems and frameworks.

```text
library/foundations/
├── standards-and-guidance.md
├── native-html-and-aria.md
├── names-and-descriptions.md
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

Use one file per pattern, with category folders for discovery. This inventory covers the [APG pattern catalog](https://www.w3.org/WAI/ARIA/apg/patterns/) reviewed for this proposal, with additional application patterns clearly identified.

```text
library/patterns/
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
│   ├── modal-dialog.md
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
library/runtimes/
├── native-html.md
├── react/
│   ├── semantics-and-prop-forwarding.md
│   ├── ids-labels-and-relationships.md
│   ├── state-focus-and-lifecycle.md
│   └── portals-routing-and-hydration.md
├── web-components/
│   ├── shadow-dom-and-slots.md
│   ├── element-internals-and-forms.md
│   ├── names-and-cross-root-relationships.md
│   └── focus-events-and-lifecycle.md
└── mixed-applications.md

library/providers/
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

The current modal pilot adds browser-coverage and rendered-semantics methods, a cross-root relationship reference, explicit modal state expectations, and evaluation cases. Real cross-browser/AT execution and behavioral comparison remain pending; authoring these cases does not establish that the plugin passed them.

## 6. Proposed skill inventory

These are **18 candidate skills**. Only the first few should ship initially. Every listed name corresponds to `skills/<name>/SKILL.md`.

Every independently invoked skill must reuse an applicable scope record or establish a minimal one before proceeding. `a11y-plan` provides fuller planning; it is not a prerequisite for using another skill. Scope initialization follows the shared contract in section 8 and should not become a mandatory questionnaire.

### Planning and design

- **`a11y-plan`** — Define targets, user tasks, significant states, standards profile, sampling, capabilities, and coverage. Produces a scoped review plan. Uses scope, sampling, coverage, and applicable check profiles.
- **`a11y-design-review`** — Review designs and interaction specifications using relevant foundation and pattern references plus design-inspection methods. Identifies implementation requirements and questions that need runtime verification.
- **`a11y-content-review`** — Review copy, headings, link text, instructions, alternatives, and semantic content structure. Uses content, naming, structure, links, forms, and media references as applicable. Separates accessibility findings from editorial advice.
- **`a11y-checklist`** — Assemble a role/task-specific checklist from shared check IDs. Produces an actionable view without introducing new rules.

### Implementation review

- **`a11y-source-audit`** — Review HTML, CSS, JavaScript, JSX, or component source. Uses source-inspection methods and selects foundation, pattern, runtime, and provider guidance. Records what still needs execution.
- **`a11y-pattern-review`** — Evaluate a specified interaction against its intended pattern across available designs, source, and running behavior. Uses pattern selection, matching pattern references, and methods appropriate to the available evidence.
- **`a11y-component-review`** — Review a reusable component’s public accessibility contract: defaults, APIs, names, states, slots/children, documentation, and consumer duties. Uses matching foundation, pattern, runtime, and provider-author guidance.
- **`a11y-authoring-review`** — Review templates, editors, and content workflows for accessible output and author support. Uses content/media/form foundations and provider-authoring guidance. Include authoring-interface scope explicitly when relevant; detailed authoring-tool standards coverage requires its own source review.

### Runtime evaluation

- **`a11y-automated-test`** — Run available automated checks across defined pages and states; triage violations and incomplete results. Uses automated-scanning methods and relevant runtime/provider limitations.
- **`a11y-keyboard-test`** — Exercise user tasks, focus order, activation, composite controls, containment, and restoration. Uses keyboard-testing methods, interaction foundations, and matching pattern references.
- **`a11y-semantics-review`** — Inspect rendered names, roles, relationships, states, structure, and updates using available browser evidence. Uses rendered-semantics methods and relevant foundation/runtime references.
- **`a11y-visual-review`** — Evaluate contrast, zoom, reflow, spacing, focus visibility, preferences, and pointer/touch conditions. Uses visual-and-preference methods and matching visual/interaction foundations.
- **`a11y-at-test`** — Prepare and document assistive-technology testing; execute supported interactions when capabilities exist and distinguish human results from browser inspection. Uses AT methods and relevant task/pattern expectations.

### Remediation and maintenance

- **`a11y-report`** — Consolidate findings and coverage, preserve evidence origins, deduplicate underlying problems, and identify remaining gaps. Uses finding, coverage, and handoff contracts; consults references to resolve classification questions.
- **`a11y-remediation-plan`** — Group findings by cause, ownership, dependency, impact, and verification needs. Uses existing evidence, relevant references, and handoff contracts.
- **`a11y-fix`** — Implement requested fixes using applicable references and real project APIs; surface decisions requiring product judgment. Selects foundation, pattern, runtime, and provider guidance for the actual target.
- **`a11y-test-gen`** — Add persistent tests following the project’s test conventions and the behaviors each test can actually verify. Uses regression-testing methods, relevant expectations, and runtime/provider details.
- **`a11y-retest`** — Verify fixes, check related regressions, and update finding status with new evidence. Selects the original finding’s references and suitable verification methods.

Do not create separate skills for every pattern, framework, or provider. For example, `a11y-source-audit` loads React and PF references when appropriate. This keeps skill discovery manageable.

## 7. Recipes and handoffs

Recipes describe a sequence; they do not silently require a particular agent platform.

- **Design to development:** Plan → design review → content review → implementation checklist and handoff.
- **Pull request review:** Source audit → relevant pattern/component review → targeted runtime checks → report.
- **Existing experience audit:** Plan → automated, keyboard, semantics, visual, and AT testing → consolidated report.
- **Component development:** Define contract → design/pattern review → source and demo/snippet review → browser/state verification → traceable regression tests and documentation.
- **Content publication:** Content review → authoring review where applicable → targeted rendered checks.
- **Remediation and retest:** Report → remediation plan → requested fixes → tests → retest.
- **Release review:** Select critical journeys → run applicable checks → retest known findings → summarize remaining risk and coverage.
- **Design-system adoption:** Identify runtime/provider changes → source/component review → behavior verification → regression testing.

Each recipe defines its inputs, conditional steps, outputs, handoff records, and stopping conditions. Unavailable capabilities produce explicit gaps.

The first step validates or establishes scope, even when the recipe begins directly with an audit. Handoffs carry scope ID/version, check and finding IDs, result records, unresolved questions, and coverage gaps. A receiving skill records scope changes explicitly rather than silently dropping targets, states, or unresolved findings.

## 8. Shared reference and result formats

Every substantial reference should answer:

- When does this apply?
- What should happen, and why?
- Which parts are standards requirements, pattern guidance, provider requirements, or recommendations?
- What exceptions or valid alternatives exist?
- What are representative correct and incorrect examples?
- How can this be verified, and what cannot be concluded from that method?
- What sources and versions support the guidance?

Check records identify applicability and link to references; they do not duplicate reference prose.

### Minimal scope contract

Before work begins, each skill reuses and validates an existing scope or records:

- Scope ID/version, objective, and requested action (review, plan, fix, or retest).
- Targets and relevant states, including transitions when behavior depends on them.
- Standards profile and applicable local policies; identify assumptions rather than inventing an approved profile.
- Available methods/capabilities and known environment or revision information.
- Exclusions, sampling decisions, and unresolved setup questions.

Discover this information from the request, repository, and existing records first. Ask only for gaps that prevent meaningful work; record nonblocking unknowns and continue within the supported scope. A scoped report can serve as the record—no separate file is mandatory unless requested or required for a handoff.

### Result unit and evidence

A result measures one **check ID + target/state or transition + method + environment + revision** within a scope. Give each observation a result ID and run/time so repeated observations remain distinguishable. Record check/reference versions and plugin commit as provenance. Use explicit unknown values where necessary, and qualify reproducibility rather than inventing environment or revision details.

Results preserve expected versus actual behavior, evidence, source, confidence, and retest history. Environment includes relevant browser/AT/tool versions and conditions such as viewport or preferences. Revision identifies the evaluated source, build, or design version as available.

Use these statuses:

- **Not assessed:** No applicability decision or evaluation has yet been made for this scoped check/method/target combination.
- **Not applicable:** An applicability decision establishes that the check does not apply; record the reason.
- **Not tested:** The check applies, but evaluation was not performed; record why, such as an unavailable capability or an unexecuted planned step.
- **Inconclusive:** Evaluation was attempted, but incomplete, ambiguous, or contradictory evidence prevents a defensible pass/fail decision; retain the evidence and required follow-up.
- **Pass:** Evidence supports the expectation for this specific result unit.
- **Fail:** Evidence demonstrates a failure of the expectation for this specific result unit. Classify its authority separately; failure of a recommendation is not automatically a normative violation.

Low confidence does not turn an unresolved observation into a pass. Use Inconclusive when the evidence cannot support a determination.

### Consolidation and coverage

- Preserve method-specific observations. A source pass and keyboard failure for the same control can both be valid; report the keyboard failure without claiming the source observation proves runtime behavior.
- Keep observations from different states, environments, and revisions separate. A later pass only verifies a fix for the matching retest scope; it does not close failures in untested conditions.
- If comparable observations conflict within the same result unit, retain both and mark the current determination Inconclusive pending investigation. Keep any associated finding open rather than treating the conflict as resolution.
- Group related results into stable finding IDs without deleting evidence or unresolved occurrences. Carry unresolved findings through handoffs; close them only with an explicit, evidence-backed disposition.
- Report failures and coverage gaps separately. Summaries identify the required result units in scope and show each status count; a missing observation is not a pass. Define required methods before reporting completion so different numbers of observations do not distort coverage.
- A combined check summary retains any substantiated failure and identifies outstanding or inconclusive methods. Claim a scoped check pass only when all required applicable result units pass; do not infer whole-product conformance or calculate a conformance percentage from checklist completion.

Normative violations, pattern deviations, provider requirements, and inclusive-design/editorial recommendations remain distinguishable. Keep impact separate from certainty and release priority. Source inspection, automated results, browser observations, and human AT results retain their distinct evidence origins.

## 9. Plugin distribution and website boundaries

The installable unit is a plugin containing related skills and all canonical supporting resources. The first is plugins/a11y-review/. Maintain identical Claude/Cursor plugin manifests and repository marketplace catalogs. More plugins can be added when their scope warrants separate installation.

No individual-skill ZIPs, dependency-copying build, path rewriting, or dist/ directory are required. Keep required local references inside the plugin boundary, and validate their existence after copying only the plugin into a clean installed location. Optional reading can remain external. Shipping resources together does not mean loading every reference for every task; retain task-specific loading triggers.

Prove plugin portability during the first workflow. Also test actual host discovery separately: a filesystem-copy test cannot establish that the client loaded or invoked the plugin correctly. Keep behavioral evaluation distinct from both structural and host-loading checks.

A future website may consume the canonical plugin resources. It must not own a competing copy of guidance or become a prerequisite for plugin installation. No site is included in this skills/plugin phase.

## 10. Plan of action

### Phase 1: Inventory and disposition

Classify existing a11y-oop and PF material as retain, adapt, replace, or defer. Preserve attribution and existing check IDs where continuity is meaningful.

Deliverable: An inventory with disposition decisions and source ownership.

### Phase 2: Agree on the model

Review this directory map, skill boundaries, naming, reference format, minimal scope/result contract, plugin boundaries, and evaluation criteria. Keep the existing site working during the transition.

Deliverable: An agreed architecture and one reference-writing template. Planned files stay in the backlog until needed; do not generate empty scaffolds for the whole inventory.

### Phase 3: Author a small reference set by hand

Start with one modal-dialog reference and its check records, supported by only the naming, focus, and other foundation material needed to execute it. Write the minimal scope/result/coverage and handoff contracts alongside it. Review depth and tone before scaling; defer the broader form reference set until this slice works.

Deliverable: One reviewed modal-dialog module, its checks, and the minimal shared contracts demonstrating the expected quality.

### Phase 4: Prove one complete workflow

Build `a11y-source-audit`, `a11y-keyboard-test`, and `a11y-report` around the modal-dialog slice. Use a PF example and a Web Component example to test the same expectations across runtimes/providers without expanding into a full form audit.

Install the complete a11y-review plugin in a clean workspace outside the source repository, with no access to source-only resources, and verify actual host discovery separately. Execute the source-review → keyboard-test → report workflow against copied fixtures. Also invoke each skill independently to verify minimal scope initialization and plugin completeness.

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

### Phase 8: Integrate distribution and the website

Extend the plugin installation already proven in Phase 4. Website integration and any optional downloads remain deferred; generate public views only when website work resumes. Rerun installed-plugin checks and the evaluation release gate for the distributed versions.

Deliverable: Self-contained downloads and a website using the same canonical sources.

### Phase 9: Pilot and release

Test real workflows before advertising the complete candidate catalog. Require the evaluation release gate and installed-plugin checks to pass for the release artifacts. Contribute suitable PF improvements upstream independently.

Deliverable: A supported initial release with documented scope and limitations.

## First deliverable

The first reviewable content deliverable is **one modal-dialog reference, its check records, and a minimal scope/result contract**. The first executable proof is a plugin-installed source-review → keyboard-test → report example running outside the source repository. Validate those relationships before expanding to eighteen candidate skills or the larger reference inventory.
