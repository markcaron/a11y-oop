---
title: Tables across roles
layout: guide
section: guidelines
---

<p class="eyebrow">Guidelines / New shared practice</p>

# Tables across roles

## One topic, connected responsibilities

Data tables help people understand relationships. Making those relationships accessible begins before the table is coded, and it continues after the component is in place.

Use a table when the information has meaningful row and column relationships. If a list or a few paragraphs would communicate the same information more clearly, consider using those instead.

### Content

Choose useful headers and explain units, abbreviations and unfamiliar values. Give the table enough context to identify its purpose. A caption can help, particularly when people navigate directly between tables.

Keep relationships as simple as possible. Split or merged headers may need extra explanation and more detailed markup.

### Design

Show how headers relate to values and how people will read the table. Plan for longer labels, translation, narrow screens and zoom. If the table includes sorting, selection or filters, specify the controls and their states as well as the visual appearance.

A table that needs two-dimensional layout may scroll within its own container. The surrounding page should still reflow, and people using a keyboard need to be able to reach and scroll the content.

### Development

Use table, header and data-cell markup that preserves the intended relationships. Add appropriate header associations for complex structures. Avoid adding an interactive grid role to a static data table; doing so introduces a different interaction contract.

Use the selected design system’s documented API. Check the version, rendered semantics and consumer responsibilities rather than assuming that a valid component API guarantees an accessible table.

### Research and verification

Ask whether people can locate, compare and interpret important values. Check header associations with selected assistive technology, as well as keyboard access, responsive behavior and interactive states.

Research observations and technical checks tell you different things. Keep both, with enough context to follow up.

## Carry the same intent through the work

Use the shared checks **TAB01–TAB04** from content planning through implementation and verification. Record how the table’s purpose, header relationships and interactions are preserved. PF React, RHDS Web Components and future Felt implementations can use different APIs while keeping the same user need.

- [Open the table checklist](/checklist/?topic=Tables%20and%20structured%20data)
- [WAI tables tutorial](https://www.w3.org/WAI/tutorials/tables/)
- [WCAG: Understanding reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
