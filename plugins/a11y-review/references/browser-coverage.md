# Browser coverage

Use the project's supported browser/OS policy to select required environments before testing. Record browser and engine/version, OS, input settings, build revision, applicable AT, and tool capabilities. Different Chromium wrappers are not independent rendering engines.

If the policy is absent, propose Chromium and Firefox for this Web Component pilot and label that matrix an assumption. Include WebKit/Safari when supported target platforms require it. Do not turn every review into an exhaustive browser project; record sampling and exclusions. A source-only review carries the runtime matrix forward without pretending to execute it.

Create required result units per browser, check, state/transition, and method. Repeat the same scoped sequence using equivalent setup and data. If a required browser cannot be exercised, leave its applicable units Not tested with the reason; a pass in another browser does not fill the gap. Do not install a particular MCP server or change host settings solely because this method mentions multiple browsers.

Compare functional semantics and behavior, not byte-identical trees. Differences in tree wrappers, serialization, or naming of platform properties may be harmless. Investigate whether the user-relevant role, name, state, relationship, or action is missing before calling a difference a defect. Preserve original observations and their environments.

Record what each tool can expose: input, composed focus, computed name/role, states, relationship targets, and hidden/ignored nodes. A tool omitting a relationship is not proof of browser failure. When unsupported inspection prevents evaluation, use Not tested; when inspection was attempted but remains ambiguous, use Inconclusive. Never infer visual contrast or human AT announcements from a tree snapshot.

## Attribute unexpected native behavior

Before attributing unusual native-dialog focus or boundary behavior to a component, compare with a minimal native dialog in the same browser, OS, keyboard settings, and automation environment. Record automation version, browser build, and headed/headless mode; use matching supported binaries when available. If execution or a suitable control is unavailable, retain the observation and attribution gap rather than asserting a component defect. A headed repeat is useful when headless behavior is suspect, but does not by itself establish behavior outside automation.

If the control reproduces the behavior, preserve the observed outcome and any applicable expectation failure, but withdraw unsupported component-specific attribution. Matching behavior does not isolate the cause, rule out component contributions, or prove an engine/tool defect. The same result in headed mode does not resolve that uncertainty or justify closing the finding. Keep responsibility unresolved until evidence distinguishes the causes. If the control behaves differently, investigate component-specific differences before assigning cause. When document focus is lost and the external destination is unknown, record that uncertainty; document.activeElement alone does not prove background-page focus escape.
