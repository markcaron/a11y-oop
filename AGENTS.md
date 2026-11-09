# Working on a11y-oop

This is a plugin marketplace. The modal-only a11y-review plugin lives in plugins/a11y-review/. The site and original drafts remain on site-archive.

- Read the relevant skill and resources. The architecture is a backlog, not a command to scaffold every skill or plugin.
- Keep task instructions, library/, methods/, contracts/, checks/, recipes/, and sources/ inside their plugin root. Shared references must resolve when only that plugin is installed.
- Match Claude/Cursor plugin manifests and maintain both marketplace catalogs. Do not add version or mcpServers to plugin manifests. Do not create a dist/ build or individual-skill packaging pipeline.
- Each skill initializes/reuses scope. Results identify check, target/state, method, environment, revision. Preserve unresolved findings and evidence origins; missing/inconclusive evidence is never a pass.
- Distinguish standards, APG, provider requirements, and recommendations. Verify installed APIs and preserve native/ElementInternals semantics.
- Run python3 scripts/validate.py and python3 -m unittest discover -s evals/tests -v. Plugin-copy tests do not establish real host discovery or behavioral accuracy.
- The plugin stays draft until the behavioral gate in evals/README.md passes. Preserve user scope; reviews do not imply fixes, installs, or publishing.
