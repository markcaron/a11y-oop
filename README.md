# Accessibility, on purpose

Review accessibility in source code, test keyboard behavior, and turn findings into an actionable report.

The project aims to support accessibility across content, page structure, forms, navigation, visual design, components, and complete user journeys.

**Current pilot:** draft skills using modal dialogs as the first test case. The broader accessibility coverage is planned, not implemented yet.

## Choose a task

**Review code** — a11y-source-audit

> Use a11y-source-audit to review this modal's source: [files].

**Test an interface** — a11y-keyboard-test

> Use a11y-keyboard-test to test this modal at [URL].

**Summarize findings** — a11y-report

> Use a11y-report to combine these accessibility results: [files].

Use one skill or combine them. The AI tool running the skill handles reference selection and review bookkeeping; describe the task in your own words.

## Install

Install the complete a11y-review plugin with your client's plugin support. No build or dependency installation is needed to read the skills. For local Claude Code development, run from this checkout:

```sh
claude --plugin-dir ./plugins/a11y-review
```

[Installation details](docs/installation.md) cover the branch and supported manifest formats. Browser testing needs browser capabilities supplied by your tool.

## Usage

- [Using the skills](docs/usage.md) — useful inputs, expected results, and a complete example.
- [Contributing](CONTRIBUTING.md) — how to edit and validate the plugin.

See [LICENSE](LICENSE) and [NOTICE](NOTICE) for licensing and attribution.
