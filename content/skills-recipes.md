---
title: Workflow recipes
layout: default
section: skills
permalink: /skills/recipes/index.html
---

<div class="page-head"><p class="eyebrow">Small modules, connected work</p><h1>Build a recipe around the task.</h1><p class="lead">Choose the skills you need, share the same task and check IDs, and carry the evidence into the next phase. A recipe describes a handoff; it is not an automatic execution engine.</p></div>

<section class="recipe"><p class="eyebrow">01 / Idea &amp; discovery</p><h2>Understand the task.</h2><p class="recipe-steps">Plan → Inclusive research → Content → Design intent</p><p>Inputs: user need, proposed flow and participation needs. Output: accessible research plan, observed barriers where available, content needs and a scoped design/verification contract.</p><p>Use RES01–02 and relevant topic checks. Keep research observations separate from persona hypotheses.</p></section>
<section class="recipe"><p class="eyebrow">02 / Design &amp; prototype</p><h2>Make the intent visible.</h2><p class="recipe-steps">Plan → Content → Design intent → Runtime review (when a running prototype exists)</p><p>Inputs: content, wireframes/designs and any running prototype. Output: meaning, states, order, alternatives, focus intent and explicit limits of the prototype’s evidence.</p><p>A screenshot-only target stops at design evidence. Do not invent keyboard or AT results.</p></section>
<section class="recipe"><p class="eyebrow">03 / Implement &amp; review</p><h2>Preserve intent in the product.</h2><p class="recipe-steps">Plan → Source audit + provider/runtime references → Runtime review → Test generation</p><p>Inputs: source/diff, installed library version, design contract and running tasks. Output: scoped findings, targeted fixes when requested, executed regression tests and remaining verification work.</p><p>For tables, carry TAB01–04 from content meaning through actual headers, interactions and AT verification.</p></section>
<section class="recipe"><p class="eyebrow">04 / Release &amp; maintain</p><h2>Know what the evidence supports.</h2><p class="recipe-steps">Runtime review → Test generation / retest → Release evidence → Research feedback</p><p>Inputs: build revision, support matrix, findings and observed results. Output: evidence scope, open barriers, owners and focused retest needs. Keep Not tested visible.</p></section>

<div class="prose">

## Example task contract

```json
{
  "taskId": "settings-save",
  "intent": "review",
  "stage": "implementation",
  "targets": {"source": "settings form diff", "url": "supplied running route"},
  "checks": ["FRM01", "FRM02", "INT09"],
  "provider": {"library": "resolve from project", "version": "resolve installed version"},
  "runtime": ["detect from actual target"],
  "methods": ["source", "keyboard", "automated", "human-at"],
  "handoff": "Retain check/task IDs; record unavailable methods as Not tested."
}
```

Human AT work requires a real observer and environment. An assistant can prepare the protocol and consolidate observations without claiming to have performed that work.

[Explore the modules](/skills/) · [Download the complete skill pack](/downloads/a11y-oop-skills.zip)

</div>
