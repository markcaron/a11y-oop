# Working on a11y-oop

This is a plugin marketplace with draft accessibility skills; the current pilot covers modal dialogs and ordinary-form labels, groups, validation, and recovery. Start with README.md and docs/usage.md. The website and original drafts remain on site-archive.

- Keep task instructions/procedures in plugins/a11y-review/skills/ and shared guidance in references/. Use references/review-guide.md for evidence and handoffs; keep ordinary responses proportional to the task.
- Read only relevant topic detail. docs/design/ is a future inventory and maintainer record, not a scaffolding command or required user onboarding.
- Preserve evidence origins, scope, native/ElementInternals semantics, and unresolved findings. Missing or inconclusive evidence is never a pass; source review cannot stand in for runtime execution.
- Match Claude/Cursor manifests and marketplace catalogs; omit version and mcpServers in plugin manifests. Keep all skill references inside the plugin; no dist/ build.
- Run python3 scripts/validate.py and python3 -m unittest discover -s evals/tests -v. Structural checks do not establish behavioral accuracy or real client loading; the plugin stays draft.
- Respect user scope. Review does not imply fixes, tool installation, publication, or issue filing.
