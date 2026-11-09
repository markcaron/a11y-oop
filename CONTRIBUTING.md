# Contributing

Improve the modal pilot before expanding the [architecture](docs/a11y-oop-architecture-plan.md). New skills require name/description frontmatter, independent scope initialization, task boundaries, and selective reference loading.

Keep expectations in library/, methods in methods/, records in contracts/, checks in checks/, and recipes in recipes/. Record sources and review dates in sources/registry.json. Do not restore RHDS site snapshots or the old checklist as canonical guidance.

Declare required dependencies in packaging/skills.json. Optional reading does not expand the graph and uses external URLs when unshipped. Shipping a resource does not require loading it for every task.

Run python3 scripts/validate.py, python3 -m unittest discover -s evals/tests -v, and python3 scripts/package.py. Verify installed isolation and retain behavioral outcomes using evals/README.md. Static packaging checks do not satisfy the behavioral release gate. The site and original drafts remain on site-archive.
