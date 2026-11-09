# a11y-oop: architecture and action plan

Status: Proposal for review. No implementation or migration is implied by this document.

Implementation note (2026-11-09): The skills-foundation branch now contains draft modal-only implementations of a11y-source-audit, a11y-keyboard-test, and a11y-report, plus their required contracts, methods, checks, and standalone packaging. The broader inventory below remains planned. No Alloy site, retained RHDS site pages, or historical checklist ships with this pilot. See the repository README for current scope and evaluation status.

This plan maps the proposed reference library, skills, methods, checklists, recipes, and directory structure for a11y-oop. It describes the intended scope, not a requirement to generate every file immediately.

AI Helpers’ existing PatternFly plugin stays separate and supported. The current a11y-oop skills are drafts to evaluate and replace; their names, structure, and checklist count are not requirements for this work.

## 1. Architecture

The library has five distinct responsibilities:

- **References:** What to consider, why it matters, applicability, exceptions, and examples.
- **Methods:** How to inspect or test something and what the evidence can establish.
- **Skills:** Tasks that select references and methods and produce useful results.
- **Recipes:** Sequences of skills with shared inputs and handoffs.
- **Checklists:** Role-specific views of shared checks, usable with or without an assistant.

The website presents these resources. Download packages distribute them. Neither should maintain a separate copy of the guidance.

Use **`a11y-` as the proposed working skill prefix** for this independent project. Settle branding before publishing.

## 2. Proposed directory structure

This is a target layout, not an instruction to move the existing site immediately. Existing site directories can remain in place during development.

```text
a11y-oop/
├── AGENTS.md
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── NOTICE
│
├── library/                         # Canonical accessibility knowledge
│   ├── index.yaml                   # Reference IDs, paths, tags, relationships
│   ├── foundations/
│   ├── patterns/
│   ├── runtimes/
│   └── providers/
│
├── methods/                         # Evidence collection and interpretation
│   ├── scope-and-sampling.md
│   ├── design-inspection.md
│   ├── source-inspection.md
│   ├── automated-scanning.md
│   ├── keyboard-testing.md
│   ├── rendered-semantics.md
│   ├── visual-and-preference-testing.md
│   ├── assistive-technology-testing.md
│   └── regression-testing.md
│
├── contracts/                       # Shared definitions, kept small
│   ├── scope.md
│   ├── results.md
│   ├── findings.md
│   ├── coverage.md
│   └── handoffs.md
│
├── checks/
│   ├── catalog.json                 # Stable check IDs and reference mappings
│   └── profiles/
│       ├── designer.json
│       ├── content-author.json
│       ├── developer.json
│       ├── component-author.json
│       └── qa.json
│
├── skills/
│   └── a11y-*/SKILL.md              # Full proposed inventory below
│
├── recipes/
│   ├── design-to-development.md
│   ├── pull-request-review.md
│   ├── existing-experience-audit.md
│   ├── component-development.md
│   ├── content-publication.md
│   ├── remediation-and-retest.md
│   ├── release-review.md
│   └── design-system-adoption.md
│
├── packaging/
│   ├── skills.json                  # Resources included with each skill
│   └── bundles.json                 # Optional collections of skills
│
├── schemas/                         # Validate maintained structured data
│   ├── reference-index.schema.json
│   ├── check-catalog.schema.json
│   ├── checklist-profile.schema.json
│   ├── scope.schema.json
│   ├── result.schema.json
│   └── package.schema.json
│
├── evals/
│   ├── cases/
│   ├── fixtures/
│   └── rubrics/
│
├── sources/
│   ├── registry.json                # URLs, revisions, attribution, review dates
│   └── adaptations.json             # Imported material and local interpretation
│
├── vendor/                          # Retained upstream source snapshots
├── scripts/                         # Validation, packaging, site preparation
│
├── content/                         # Alloy website content
├── layouts/
├── static/
├── data/                            # Existing site data during transition
│
└── dist/                            # Generated distribution; never hand-edited
    ├── skills/
    └── bundles/
```

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
- **Component development:** Define contract → design/pattern review → source review → runtime checks → regression tests and documentation.
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

A result measures one **check ID + target/state or transition + method + environment + revision** within a scope. Give each observation a result ID and run/time so repeated observations remain distinguishable. Record check/reference/package versions as provenance. Use explicit unknown values where necessary, and qualify reproducibility rather than inventing environment or revision details.

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

## 9. Packaging and website boundaries

Maintain each reference once, then generate:

- Individual skills containing their required references and methods.
- Optional bundles for design, development, QA, or comprehensive review.
- Human-readable website pages.
- Checklist views.

### Package dependencies and optional reading

Individual downloads must work independently. Resource metadata and package manifests distinguish:

- **Required dependencies:** Local contracts, methods, checks, references, scripts, and assets needed to execute the skill, including resources required only for supported conditional branches. Packaging includes their transitive required dependencies.
- **Optional related reading:** Background and adjacent topics that are not necessary to execute the skill. These links do not expand the package dependency graph. Optional local links must be rewritten to stable published destinations or omitted when the resource is not shipped; leave no broken paths in the download.
- **External sources and capability requirements:** Authoritative documentation and tools/services used when available. Declare required live lookups and their fallbacks explicitly. A self-contained instruction package does not imply bundled browser tools, MCP access, or a fully offline audit.

Do not infer package dependencies from every Markdown link. Validate the declared dependency graph, required files, and installed link targets, including cycles and accidental references to the source checkout.

### Shipping versus loading

A package ships the resources necessary for all supported branches. For an individual task, the assistant loads only the shared entry contracts and the references selected by actual scope, patterns, runtime, and provider. Each conditional resource has a clear loading trigger. Shipping a file does not instruct the assistant to read it on every invocation.

### Early installation proof

During Phase 4, generate standalone packages and extract/install them into a clean workspace outside the source repository. Run against copied fixtures with the source checkout unavailable to the evaluation. Verify that contracts, required references, relative paths, and handoffs work from the installed packages. Repeat this packaging check for releases; website integration can follow later.

Keep platform-specific manifests outside the canonical knowledge. A future AI Helpers contribution can adapt packaging and naming without creating a competing copy of the guidance.

## 10. Plan of action

### Phase 1: Inventory and disposition

Classify existing a11y-oop and PF material as retain, adapt, replace, or defer. Preserve attribution and existing check IDs where continuity is meaningful.

Deliverable: An inventory with disposition decisions and source ownership.

### Phase 2: Agree on the model

Review this directory map, skill boundaries, naming, reference format, minimal scope/result contract, dependency types, and evaluation criteria. Keep the existing site working during the transition.

Deliverable: An agreed architecture and one reference-writing template. Planned files stay in the backlog until needed; do not generate empty scaffolds for the whole inventory.

### Phase 3: Author a small reference set by hand

Start with one modal-dialog reference and its check records, supported by only the naming, focus, and other foundation material needed to execute it. Write the minimal scope/result/coverage and handoff contracts alongside it. Review depth and tone before scaling; defer the broader form reference set until this slice works.

Deliverable: One reviewed modal-dialog module, its checks, and the minimal shared contracts demonstrating the expected quality.

### Phase 4: Prove one complete workflow

Build `a11y-source-audit`, `a11y-keyboard-test`, and `a11y-report` around the modal-dialog slice. Use a PF example and a Web Component example to test the same expectations across runtimes/providers without expanding into a full form audit.

Generate and install the standalone packages in a clean workspace outside the source repository, with no access to source-only resources. Execute the source-review → keyboard-test → report workflow against copied fixtures. Also invoke each skill independently to verify minimal scope initialization and package completeness.

Deliverable: A repeatable installed-package workflow with useful evidence, intact handoffs, and no dependencies on the authoring checkout.

### Phase 5: Evaluate behavior

Use broken examples, valid alternatives, missing capabilities, and mixed runtimes. Check missed issues, false positives, evidence quality, and overclaiming.

Compare skill-on and skill-off runs on the same tasks, fixtures, model configuration, and tool capabilities. Record package versions, prompts, outputs, and adjudicated outcomes. Assess correct findings, missed defects, false positives, evidence fidelity, and coverage reporting. Define expected outcomes and acceptance criteria before running the comparison; do not tune the rubric to the generated wording.

Test routing for overlapping requests: design versus source review, automated testing versus test generation, pattern versus component review, and planning versus direct invocation. Verify that selection follows the requested task and that it does not expand into unrelated actions.

### Evaluation release gate

Before expanding the pilot or releasing a skill package:

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

Extend the packaging already proven in Phase 4, generate public views, and deliberately replace the old draft downloads. Rerun installed-package checks and the evaluation release gate for the distributed versions.

Deliverable: Self-contained downloads and a website using the same canonical sources.

### Phase 9: Pilot and release

Test real workflows before advertising the complete candidate catalog. Require the evaluation release gate and installed-package checks to pass for the release artifacts. Contribute suitable PF improvements upstream independently.

Deliverable: A supported initial release with documented scope and limitations.

## First deliverable

The first reviewable content deliverable is **one modal-dialog reference, its check records, and a minimal scope/result contract**. The first executable proof is a packaged source-review → keyboard-test → report example running outside the source repository. Validate those relationships before expanding to eighteen candidate skills or the larger reference inventory.
