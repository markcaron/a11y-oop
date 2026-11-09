# Retained sources and migration decisions

The current skills branch starts from the original project commit and selectively retains planning and source material. Nothing in legacy/ is automatically an approved requirement or canonical check catalog.

## Disposition

- Architecture plan and sample prompts: retained under docs/ as the proposed direction.
- Original eight generated skills: archived, not adopted.
- Alloy layouts, assets, content, site scripts, tests, dependencies, and audit reports: archived, not part of this branch.
- RHDS accessibility Markdown: retained unchanged under vendor/rhds/accessibility as reference source material; links inside upstream snapshots may require the original repository/site context.
- Historical RHDS source hashes and adaptation ledger: retained in legacy/rhds-sources.json. Website paths in that ledger describe the archive, not files expected in this branch.
- Historical component-source ledger: retained in legacy/rhds-component-sources.json for review.
- Historical 66-check synthesis: retained in legacy/checklist.json for traceability and selective review. Its count, status model, claims, and source mappings are not new design requirements.
- Runtime/provider references: recover selectively from the archive after review; none are copied as approved guidance in this foundation.

## Archive

The authored site snapshot is commit `a32cd743b23edad208b6f37f0dd681bd99bfea4d` on `site-archive`. A full local backup, including ignored generated files and dependencies, was verified before the branch separation. That machine-specific backup is not required to use this repository.

Source registries and an adaptation format for new guidance will be added with the first reviewed reference. Preserve upstream attribution and distinguish local interpretations from quoted requirements.
