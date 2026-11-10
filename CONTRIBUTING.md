# Contributing

Start with the [usage guide](docs/usage.md) to understand the three supported tasks. Improve a small piece of the modal pilot before expanding its scope.

## Find what to edit

- **Task behavior:** plugins/a11y-review/skills/ contains the three entrypoints and their source/keyboard procedures.
- **Shared guidance:** plugins/a11y-review/references/ contains one review guide plus modal, browser, naming, and Web Component detail. Read the relevant topic, not everything.
- **Check IDs and sources:** references/checks.json and references/sources.json support tracking and provenance.
- **Accuracy and portability:** [Evaluation guidance](evals/README.md) describes cases, tests, and the release gate. A wording improvement does not require learning the entire evaluation system; run the checks and add cases when behavior changes warrant them.

Keep references inside the installable plugin. Load detail only when the task needs it. New files or directories should solve a demonstrated maintenance problem; the design backlog is not a scaffolding checklist.

## Validate a change

Contributor checks need Python 3.10+:

```sh
python3 scripts/validate.py
python3 -m unittest discover -s evals/tests -v
```

These check manifests, local links, skill metadata, and plugin portability. They do not establish actual host loading, AI behavior, or runtime accessibility. Preserve the draft status until the relevant evaluation gate passes.

Match Claude/Cursor plugin manifests and maintain both marketplace catalogs. Omit version and mcpServers fields from plugin manifests. Keep the plugin self-contained; no dist/ build is needed. Skills need matching name/description frontmatter and should preserve user scope, evidence origins, native semantics, unresolved findings, and unavailable-capability gaps.

## Deeper design material

- [Architecture and future inventory](docs/design/architecture.md) — maintainer design record; not required to use or make a small improvement.
- [Future skill prompts](docs/design/future-skill-prompts.md) — examples for the broader proposed catalog.

The website and original drafts remain on site-archive. Do not restore site content as part of ordinary plugin work.
