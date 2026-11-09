# Working on a11y-oop

This is a skills-first accessibility repository. Read docs/a11y-oop-architecture-plan.md before architectural work. The Alloy website and original skill drafts are preserved on site-archive; do not reintroduce site files or dependencies as part of skill development.

- Add only resources needed for the current reviewed slice. The 18 skill names and directory map are a proposed backlog, not instructions to generate all scaffolds.
- Keep canonical expectations in library/, methods in methods/, shared contracts in contracts/, checks in checks/, task entrypoints in skills/, and workflows in recipes/ as those directories are implemented.
- Skills are tool-agnostic. Each SKILL.md needs matching name/description frontmatter and clear task boundaries. Prefer native semantics and verify real provider APIs and versions.
- Every independently invoked skill reuses or initializes minimal scope. Keep results specific to check, target/state, method, environment, and revision. Missing or inconclusive evidence is never a pass; preserve unresolved findings across handoffs.
- Distinguish normative requirements, APG guidance, provider requirements, and recommendations. Source inspection, automated scans, browser observations, and human AT evidence remain distinct.
- Declare required package dependencies separately from optional reading. Ship required resources; load only task-relevant references. Test installed packages outside the authoring checkout before release.
- Keep vendor/ unchanged. sources/legacy/ contains unapproved historical material for review, not a canonical check catalog. Preserve attribution and provenance when adapting sources.
- Run python3 scripts/validate.py after changes. Add meaningful packaging and behavioral evaluations with the first executable workflow; do not claim this validator proves behavior.
- Do not hand-edit generated dist/ output. Avoid empty directories and placeholder skills. Do not install tools, publish, or modify other projects solely because a reference mentions those activities.
