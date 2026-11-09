---
name: uxd-a11y-release
description: Consolidate existing accessibility evidence, coverage, unresolved barriers, owners and retest needs for a build or release.
---

# Assemble accessibility release evidence
## Work

Use QA04–07 and the scoped checks already selected for the product. Identify build/source revision, approved profile, tested task/state/environment combinations, evidence origins and unresolved methods. Do not manufacture an overall score from unrelated checklist completions.

Keep violations, APG deviations, inclusive-design observations and product-policy failures distinct. Separate impact, confidence and release priority. Retain open barriers, owners, mitigations and retest history; only mark a finding resolved when its required verification was performed.

Review provider/document versions and changed components for focused retest. Track catalogue/source owners and review dates. Historical survey/download goals are context, not current accessibility acceptance criteria.

## Handoff

Deliver an honest evidence summary and next actions. This module does not grant permission to publish, merge, waive requirements or issue a formal conformance/ACR claim. State the material limits of the available evidence.

## Shared context

Read [the contract](../shared/contract.md) for scoped inputs, result states and evidence requirements. Select only applicable rule IDs from [the shared catalog](../shared/catalog.json), using role, task, lifecycle stage and actual target. Related WCAG IDs require applicability/exception review; policy and APG guidance are not automatically WCAG failures.

Use [provider selection](../shared/providers.md) when a design-system component is involved. Framework and provider are independent; support mixed React/Web Component pages. Prefer installed documentation and versioned sources. Missing capability or evidence is Not tested, never a pass.
