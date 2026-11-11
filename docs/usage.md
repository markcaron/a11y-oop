# Using the skills

Pick the task you need today. You do not need to run a planning skill or learn the plugin's internal files first. The current pilot covers modal dialogs and ordinary-form labels, groups, validation, and error recovery. The project’s broader scope includes content, page structure, forms, navigation, visual design, components, and complete user journeys.

## Review source code

Use **a11y-source-audit** with files, a directory, or a diff. Mention the component library if you know it; the skill can inspect the project for context.

> Review this modal's source with a11y-source-audit: src/delete-dialog.ts. Focus on naming and focus management. Don't change files.

Expect findings with source locations, suggested changes, and a short list of behavior that still needs a running interface. Source review does not prove what happened in a browser.

## Test keyboard behavior

Use **a11y-keyboard-test** with a running URL and which modal or form to exercise. Include access/setup instructions and important states when needed. Existing source findings are helpful but optional.

> Use a11y-keyboard-test on the Delete item modal at [URL]. Open it from the item menu and check entry focus, Tab navigation, dismissal, and focus after closing.

Expect observed steps, findings, and anything that could not be tested. If the AI tool cannot operate a browser, it should give you manual steps and clearly say they were not executed. It should not silently install tools or make up results.

Browser coverage follows your project's supported environments. A review in one browser does not prove another browser works; missing environments stay visible as gaps.

## Combine results

Use **a11y-report** with notes, findings, test outputs, or earlier skill responses. Files are useful for longer reviews; previous responses can be enough for a short one.

> Use a11y-report to combine these source and keyboard findings. Group shared causes, keep unresolved issues visible, and show what still needs checking.

Expect an actionable summary that distinguishes failures, recommendations, and untested work. Conflicting results and different browser/build conditions should remain visible. Reporting does not run new tests.

## A complete review

1. Review the modal's source.
2. Give those findings and the running URL to keyboard testing.
3. Ask for a consolidated report from both outputs.

You can also request that sequence in one prompt:

> Review this modal source, test it at [URL], and summarize the findings. Do not edit files. Tell me which browser checks actually ran and what remains untested.

The tool handles the handoff. For a small review, a useful result might look like this illustrative example:

> **Finding:** The dialog references a title ID that doesn't exist in this template. Add the correct naming relationship.
> **Evidence:** Source inspection at src/dialog.html:18.
> **Still to verify:** The computed name and focus behavior in the running interface. No browser checks ran.

A full audit can include detailed check IDs, environments, and coverage records. Those are not prerequisites for a quick request. Only ask for saved files or machine-readable results when you need them.

## Review a form

> Review this form with a11y-source-audit: [files]. Check labels, fieldset/legend or equivalent grouping, required fields, instructions, errors, and recovery. Do not change files.

> Use a11y-keyboard-test on the form at [URL]. Submit empty and invalid test values, correct the errors, and resubmit. Include browser-backed names, groups, and invalid/error relationships if available; distinguish them from keyboard observations.

The pilot accepts native labels, correctly referenced spans, and valid native or ARIA grouping. It does not flag tags alone or require a custom error summary when native validation works. Screen-reader checks remain manual. Custom widgets, multistep flows, authentication, uploads, and form-associated custom-element internals need separate coverage.

## Limits

The plugin is a draft. Structural and portability checks pass, but full behavioral and client-loading evaluation remains pending. It does not certify accessibility. Screen-reader testing remains a separate manual follow-up: the skills do not launch or configure screen readers, and browser accessibility trees do not establish announcements. Supplied manual results can be included with their evidence origin; otherwise applicable checks remain Not tested. Broader accessibility coverage beyond the declared patterns remains future work.

[Back to the start](../README.md) · [Contribute improvements](../CONTRIBUTING.md)
