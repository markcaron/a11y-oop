---
name: uxd-a11y-plan
description: Define accessibility scope, user tasks, role ownership and verification methods for a new feature, prototype or review.
---

# Plan accessible work
## Work

Identify the user need and essential tasks. Record the intended lifecycle stage, source/design/running targets, component/library versions, approved standards profile, local policies and the user’s review or change intent. Preserve existing authorization.

Choose applicable topics and role actions; don’t load the whole catalog for every request. Distinguish tasks that a screenshot, source, browser, automated tool, human AT session or participant study can actually answer. Record task IDs and carry them into design specifications and findings.

Produce a small plan: task → relevant check IDs → owner → evidence method → handoff. Separate component-author and consumer duties. Identify missing setup, data, test environments and docs without inventing them.

## Handoff

Pass the same scoped contract to research, content, design, source review or runtime review as appropriate. A plan is not execution evidence. Example: a settings form uses FRM01–03, INT09 and applicable visual/structural checks; its confirmation announcement remains unverified until observed.

## Shared context

Read [the contract](../shared/contract.md) for scoped inputs, result states and evidence requirements. Select only applicable rule IDs from [the shared catalog](../shared/catalog.json), using role, task, lifecycle stage and actual target. Related WCAG IDs require applicability/exception review; policy and APG guidance are not automatically WCAG failures.

Use [provider selection](../shared/providers.md) when a design-system component is involved. Framework and provider are independent; support mixed React/Web Component pages. Prefer installed documentation and versioned sources. Missing capability or evidence is Not tested, never a pass.
