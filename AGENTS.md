# Working on a11y-oop

Use Alloy, semantic HTML, CSS and native JavaScript modules/Web Components. No React or Tailwind. Prefer native elements and behavior. Keep light/dark/forced-color and motion preferences tied to browser/OS settings.

Edit data/checklist.json as the single checklist source. Keep IDs stable and provenance, applicability, policy distinctions and role ownership explicit. Do not label unavailable evidence as passed. Preserve RHDS prose where possible and label interpretation notes/new guidance separately; original Markdown belongs in vendor/rhds/accessibility.

Do not hand-edit generated content/checklist.html, content/skills/, static/data/, static/downloads/, static/skills/, skills/shared/catalog.json, _site/ or .alloy/. Run npm run build to generate/check output and npm test for state/data behavior. Restart npm run dev after catalog/skill source edits.

Keep AI modules focused, tool-agnostic and composable. Shared expectations, providers, runtime evidence and workflow recipes have separate responsibilities. Preserve actual project APIs and user scope. Do not install packages, publish, or change unrelated projects just because a skill references those activities.
