# Installation details

Install the entire plugins/a11y-review/ directory, including its shared references. Copying just one SKILL.md leaves required files behind. There is no ZIP build, dist/ directory, or runtime dependency installation for the instructions themselves.

## Local development

Check out the branch containing the plugin, currently skills-foundation. From the repository root, Claude Code can load it with:

```sh
claude --plugin-dir ./plugins/a11y-review
```

Use your client's plugin/skill invocation syntax with the names in the [usage guide](usage.md). Browser tools and project libraries are provided by the host environment. A missing browser yields unexecuted manual steps and explicit gaps.

## Marketplace discovery

Matching Claude and Cursor plugin manifests and marketplace catalogs are included. The catalogs register a11y-review at ./plugins/a11y-review. Use a checkout/ref containing those files; main does not contain this work until merged.

See the [Claude plugin docs](https://code.claude.com/docs/en/plugins) and [Cursor plugin reference](https://cursor.com/docs/reference/plugins) for client-specific discovery. Actual host loading remains to be verified separately from the repository's file/link tests. This repo does not change your client settings automatically.

[Start using the skills](usage.md) · [Back to the start](../README.md)
