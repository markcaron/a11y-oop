# Accessibility, on purpose

a11y-oop is a plugin marketplace for accessibility workflows. The first plugin, **a11y-review**, contains three draft modal-dialog skills:

- [a11y-source-audit](plugins/a11y-review/skills/a11y-source-audit/SKILL.md): source findings and a runtime verification queue.
- [a11y-keyboard-test](plugins/a11y-review/skills/a11y-keyboard-test/SKILL.md): observed keyboard/focus behavior or explicit unexecuted steps.
- [a11y-report](plugins/a11y-review/skills/a11y-report/SKILL.md): consolidated findings, conflicts, and method-specific coverage.

## Plugin installation

The installable unit is the entire plugins/a11y-review/ directory. It contains both platform manifests, all three skills, and one shared copy of their contracts, methods, references, checks, and recipe. Do not copy an individual skill folder without its plugin resources. No ZIP generation, path rewriting, dist/ directory, or build step is required.

For local development, check out skills-foundation and load the plugin directory using your client's plugin support. For Claude Code:

```sh
claude --plugin-dir ./plugins/a11y-review
```

The repository has matching Claude and Cursor marketplace catalogs. They register a11y-review at ./plugins/a11y-review. For marketplace installation, use a checkout/ref containing these files; main does not contain this work until merged. See the [Claude plugin docs](https://code.claude.com/docs/en/plugins) and [Cursor plugin reference](https://cursor.com/docs/reference/plugins) for client installation and discovery. No client settings or marketplace registrations are changed automatically by this repo.

Host-specific plugin loading has not been exercised in the automated tests. Browser tools and provider libraries are supplied by the host/project, not this plugin.

## Validate

Python 3.10+ is needed only for contributor validation:

```sh
python3 scripts/validate.py
python3 -m unittest discover -s evals/tests -v
```

These check matching manifests/catalogs, skill discovery/frontmatter, plugin-contained references, check records, and portability after copying the plugin out of its authoring repository. They do not prove assistant behavior or accessibility conformance.

## Use

Follow the [modal recipe](plugins/a11y-review/recipes/modal-review.md) or invoke a skill independently using your client's skill syntax:

> Use a11y-source-audit on this modal. Record source evidence and keyboard transitions needing verification. Do not edit files.

> Use a11y-keyboard-test at [URL] with these findings. Without execution, mark checks Not tested and give manual steps.

> Use a11y-report to consolidate these results, preserving unresolved findings and different revisions/methods.

## Status and layout

Coverage is modal dialogs only; the other 15 proposed skills are not implemented. See [evaluation guidance](evals/README.md) for the outstanding behavioral release gate. The plugin remains a draft. The modal pilot now includes explicit browser coverage, state/transition expectations, and a cross-root relationship procedure. Required environments follow project support policy; unavailable browser/tool capabilities remain visible gaps.

Canonical skill resources live inside plugins/a11y-review/. docs/ contains the [architecture](docs/a11y-oop-architecture-plan.md) and [future skill prompts](docs/a11y-oop-sample-prompts.md); evals/ and scripts/ are repository-level contributor tools. Future plugins can be added under plugins/ when their scope warrants a separate installable unit.

The original site and eight generated drafts remain on site-archive. No RHDS site snapshots or old checklist are included. Apache-2.0 is retained; see [NOTICE](NOTICE).
