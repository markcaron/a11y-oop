---
title: PF, RHDS and Felt
layout: guide
section: guidelines
---

<p class="eyebrow">Guidelines / New shared practice</p>

# PF, RHDS and Felt

## Keep the need. Adapt the implementation.

A control needs a meaningful name, predictable behavior and the right exposed state whether it comes from PF, RHDS or Felt. The APIs and implementation details may differ. Keep shared accessibility expectations separate from those details.

Choose two kinds of context independently:

- **The design-system provider:** the component library, installed version, documentation and consumer responsibilities.
- **The runtime:** native HTML, React, Web Components or a mixture of them.

A React application can use Web Components. A single page can need more than one provider. Felt’s React and Web Component libraries are treated as separate surfaces; this library does not assume one is a wrapper for the other.

## Resolve the provider before suggesting code

For PF, consult the matching PF React or HTML guidance and the PF MCP server when available. For RHDS and PatternFly Elements, use their matching documentation, manifests and RHDS/PFE tooling. These providers do not share an interchangeable MCP server.

Check the installed package and version. A custom elements manifest can describe attributes, slots and events, but component-specific accessibility guidance also explains what the consumer must supply.

For Felt, use verified project APIs as they become available. Until then, record the missing provider information. Don’t invent an ft-* property or present a PF/RHDS example as a verified Felt implementation.

## Verify the actual experience

React portals and Web Component shadow roots affect how names, focus and queries are observed. Web Components may also use slots, ElementInternals and form association. Wait for registration and updates before testing; use the actual supported runtime and installed tools.

A scanner’s limitations are evidence gaps, not a reason to add redundant semantics to a correct component. Use rendered accessibility information and selected human assistive-technology checks where needed.

## Component guidance

RHDS provides [accessibility guidance for individual elements](https://ux.redhat.com/elements/). Consult the relevant element and version alongside these shared guidelines. This site retains a [source inventory](/data/rhds-component-sources.json) from the review; it is an index, not a claim that every component has equivalent documentation or test coverage.
