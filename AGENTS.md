# Working on a11y-oop

This is a skills-only modal pilot. The website, RHDS snapshots, and original drafts remain on site-archive; do not reintroduce them for skill development.

- Read the relevant skill and canonical resources. The architecture is a backlog, not a command to scaffold all skills.
- Keep tool-agnostic tasks in skills/, expectations in library/, methods in methods/, records in contracts/, and stable IDs in checks/.
- Each skill initializes/reuses scope. Results identify check, target/state, method, environment, revision. Preserve unresolved findings and evidence origins; missing/inconclusive evidence is never a pass.
- Distinguish standards, APG, provider requirements, and recommendations. Verify installed APIs and preserve native/ElementInternals semantics.
- Declare required dependencies separately from optional reading. Generated packages use local references; never hand-edit dist/.
- Run python3 scripts/validate.py, python3 -m unittest discover -s evals/tests -v, and python3 scripts/package.py.
- Packages remain draft pending the behavioral gate in evals/README.md. Packaging tests are not runtime accessibility evidence.
- Preserve user scope. Reviews do not imply fixes, installation, publishing, or issue filing.
