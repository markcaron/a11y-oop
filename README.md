# Accessibility, on purpose

A working accessibility library: role-based checklist, guidance, and modular AI skills for PF, RHDS and future Felt work across native HTML, React and Web Components.

## Run locally

Prerequisites: [Alloy](https://alloyssg.dev/) (tested with 0.7.0), Node.js 20.11+ and the `zip` command. No production npm packages, React, Tailwind, CSS frameworks or client framework are required. `axe-core` is a development-only audit dependency; use `npm ci` to install it.

```sh
npm run dev
```

Open the local URL printed by Alloy. The default requested port is 3000; Alloy may choose another port if it is occupied. Stop with Ctrl-C.

```sh
npm test
npm run build
```

Production output is `_site/`. Any static HTTP host can serve it. Root-relative links currently assume deployment at the domain root. No hosting registration, deployment, analytics or network service is configured.

`prepare:site` creates checklist HTML/JSON and downloadable skill packages before Alloy builds. If editing catalog or skill sources while `dev` is running, restart it to rerun preparation. Alloy watches ordinary page, layout and CSS/JS changes.

## Sources and generated output

- `data/checklist.json`: canonical draft checklist catalog. Stable IDs, role membership, source references, criteria mappings and all 90 original checklist-item mappings.
- `content/guidelines/`: adapted RHDS prose and explicitly identified new guidance.
- `vendor/rhds/accessibility/`: unchanged source Markdown from RHDS revision `7b65f1378496ac57cc207be8f84822afc8180345`.
- `data/rhds-sources.json`: source hashes and adaptation ledger.
- `skills/uxd-a11y-*/SKILL.md`: eight editable task modules.
- `skills/shared/`: shared contract, catalog and provider/runtime references. `catalog.json` here is generated from `data/checklist.json` and is ignored by git.
- `static/assets/`: authored CSS and native JavaScript modules, plus imported example assets.
- `scripts/prepare.mjs`: generates `content/checklist.html`, `content/skills/`, static data and self-contained downloadable skill packs. Do not edit these generated outputs.

The inherited Apache-2.0 project license is preserved. See NOTICE and the site’s About page for source attribution. Original PDFs and local filesystem paths are not distributed.

## Checklist behavior

All 66 checks are rendered as HTML by Alloy. A light-DOM `<a11y-checklist>` element progressively enhances native forms, details, progress and dialog elements. With JavaScript unavailable, guidance remains readable and controls remain disabled.

Role, topic, classification, result and search filters are reflected in the URL. Results/notes are saved locally under `a11y-oop:checklist:v1`, not in the URL or on a server. Storage is specific to origin/browser/device. Export/import transfers versioned JSON. Imports validate before replacement; Start over clears only this app’s storage key after confirmation. Storage errors are visible and preserve in-memory work for export.

“Reviewed” includes pass, fail and explained not-applicable records; not-tested and unexplained exclusions do not count. This is workflow progress, never a conformance score. Source/design/browser/human AT evidence remain distinct. Note fields are plain text.

## AI skill packages

Each downloadable ZIP contains one complete skill folder, including its `references/shared/` resources. The complete pack contains all eight folders. Extract the desired folders into the skill directory supported by your assistant; no platform-specific manifests or MCP installs are implied. Source modules refer to the sibling shared directory; preparation rewrites only those paths for independent installation.

Recipes on `/skills/recipes/` describe composable handoffs. They do not run an agent service. Browser/testing capabilities must be supplied by the host; Felt APIs must be resolved from actual project documentation when available. The modules are drafts and have not undergone independent behavioral evaluations.

## Verification

`npm test` checks shared role filtering, source lookup, import rejection, progress semantics and source-map integrity. `npm run build` also verifies all generated pages’ main headings, IDs, local files, cross-page fragments and template rendering. These checks do not substitute for human accessibility review or an assistive-technology support matrix.

Useful browser checks: filter to a role/topic; change a result and add evidence; reload; cancel and confirm Start over; export/import; try an invalid import; use only a keyboard; test narrow viewport, text resizing and OS forced colors; inspect selected tasks with real assistive technology.

## Rendered accessibility scans

Run `npm ci`, then `npm run audit`. Open the printed local audit-runner URL. Scan all pages in light and dark color schemes at 1280 and 320 CSS pixels, then scan expanded checklist details and both dialogs. Reports are saved under `audits/`; the runner is local development tooling and is not copied into `_site/`. Color-scheme overrides exercise the rendered palettes, not OS forced colors or human AT. No checklist results/notes are changed by scans.

The audit uses the installed axe-core version and explicitly records WCAG 2.0/2.1/2.2 A/AA tags plus best practices. Triage incomplete results; zero automated violations is not a whole-site accessibility certification.

The first executed source/runtime review and its coverage limits are recorded in [audits/README.md](audits/README.md). Use **Scan full matrix**, then `npm run audit:check`, to check all saved page/state profiles against the latest build.

## Felt light/dark mock theme

The temporary appearance uses the proposed Felt component styling with self-hosted Red Hat fonts, neutral surfaces, blue pill actions and standard light/dark palettes. It follows system color preference. Source mappings, approximations and migration guidance are in [docs/felt-theme.md](docs/felt-theme.md). No actual Felt component library is installed yet.
