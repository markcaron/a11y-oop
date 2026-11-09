---
title: Requirements and evidence
layout: guide
section: guidelines
---

<p class="eyebrow">Guidelines / New shared practice</p>

# Requirements and evidence

## Know what you’re checking

Not every helpful recommendation is a requirement, and not every requirement applies to every experience. Before reviewing work, identify the standards and product policies that apply to it.

This library uses WCAG 2.2 A and AA as its proposed accessibility profile. A project may have additional obligations. Confirm its approved baseline rather than treating this library as a statement of current corporate or legal policy.

Keep these kinds of guidance distinct:

- **Requirements:** applicable HTML, ARIA and accessibility standard requirements, including their exceptions.
- **Pattern guidance:** recommended interaction models, such as those in the WAI-ARIA Authoring Practices Guide (APG). An APG deviation is not automatically a WCAG failure.
- **Inclusive design practices:** approaches that can make an experience better for more people.
- **Product policies:** brand, publishing, performance or design conventions that apply to a particular project.

### Read the exact criterion

Short checklists make it easier to begin. The full criterion explains applicability and exceptions. For example, AA target size has spacing and other exceptions; text resize and reflow are different checks; and not every content update is a status message.

Readability recommendations may be stronger than AA. Font choices, preferred label placement and a single-h1 convention can be useful without being universal WCAG requirements.

## Match the claim to the evidence

A screenshot can show color, spacing and visible content. It cannot prove keyboard behavior. A source review can identify a missing association, but it cannot prove a screen reader announcement. A passing automated scan only describes what that tool checked in that state.

Record the target, state, method, environment and observation. Keep impact, confidence and release priority separate. A serious barrier may still need human verification before its cause is confirmed.

### Use clear result states

- **Not assessed:** work hasn’t begun on this check.
- **Pass:** the selected check was performed and its expected result was observed within the recorded scope.
- **Needs work:** the check found something to improve. Record the problem and who will address it.
- **Not applicable:** explain why the check doesn’t apply to this target.
- **Not tested:** the check applies, but its method or environment wasn’t available.

A completed checklist is not a conformance claim. Keep unresolved barriers, untested methods and scope limitations visible.

## Further reading

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA APG introduction](https://www.w3.org/WAI/ARIA/apg/about/introduction/)
- [WAI: Evaluating web accessibility](https://www.w3.org/WAI/test-evaluate/)
