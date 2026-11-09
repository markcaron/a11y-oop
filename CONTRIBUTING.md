# Contributing

Improve the modal pilot before expanding the [architecture](docs/a11y-oop-architecture-plan.md). a11y-review is one plugin containing three skills; new skills do not automatically require new plugins.

Keep canonical resources inside their plugin root: skills/ for task instructions, library/ for expectations, methods/ for procedures, contracts/ for shared records, checks/ for stable check IDs, and recipes/ for workflows. Relative references may leave a skill folder but must stay inside the plugin. All resources ship together; each skill loads only the references relevant to its task. Optional external reading does not require copying upstream content.

Plugin manifests in .claude-plugin/plugin.json and .cursor-plugin/plugin.json must match. Register plugins in the repository's corresponding marketplace catalogs. Omit version and mcpServers fields from plugin manifests. Do not introduce runtime providers or external dependencies merely to package instructions.

Skills need matching name/description frontmatter, independent scope initialization, clear task boundaries, and selective reference loading. Record sources and review dates inside the plugin. Do not restore archived site snapshots or the historical checklist as canonical guidance.

Run python3 scripts/validate.py and python3 -m unittest discover -s evals/tests -v. Test an installed plugin outside the authoring checkout. Validate actual host loading separately, and retain behavioral outcomes using evals/README.md; static checks do not satisfy the behavioral release gate. No dist/ or individual-skill ZIP packaging is used.
