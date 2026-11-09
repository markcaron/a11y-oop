# Accessibility, on purpose

a11y-oop is a skills-first accessibility project: modular references, evidence-collection methods, task-focused AI skills, shared checks, and workflow recipes.

## Current status

This branch establishes the project foundation. The 18 skills in the plan are candidates, not implemented or released packages. The previous eight generated skills have not been carried forward.

- [Architecture and action plan](docs/a11y-oop-architecture-plan.md)
- [Sample prompts for proposed skills](docs/a11y-oop-sample-prompts.md)
- [Contribution guidance](CONTRIBUTING.md)
- [Source provenance](sources/README.md)

The first implementation will cover one modal-dialog reference and its checks, minimal scope/result contracts, and a packaged source-review → keyboard-test → report workflow. Other directories are added when they contain reviewed work; there are no empty skill scaffolds.

## Working locally

No Alloy installation, website build, Node packages, or network access is required for the current foundation. Run the documentation and source-integrity checks with Python 3:

```sh
python3 scripts/validate.py
```

Future packaging and evaluation tooling will be introduced with the first executable workflow. Passing the current validator does not establish skill behavior or accessibility conformance.

## Archived website

The Alloy site and original skill drafts are preserved on the `site-archive` branch. Its README contains its build and testing instructions. Build outputs, caches, and installed dependencies are not committed.

To work on the archived site separately:

```sh
git fetch origin
git worktree add ../a11y-oop-site site-archive
```

If the archive branch only exists on the remote in a fresh clone, create its local branch with `git branch --track site-archive origin/site-archive` first. Use the separate worktree to avoid mixing site files into the skills branch. The skills repository is intended to become the canonical source that any future website consumes.

## License and attribution

The existing Apache-2.0 license is retained. See [NOTICE](NOTICE) for retained upstream material. Historical source records are preserved for review, not presented as an approved checklist or a complete standards mapping.
