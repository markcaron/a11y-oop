# Source inspection

Inspect the requested files/diff and enough dependencies to trace semantics and transitions. Record revision, file/line, runtime, provider version, and relevant call paths. Follow existing project instructions. Review stays read-only unless changes were requested.

Trace the invoker, opening mechanism, name, entry focus, background handling, closing/cancel handlers, restoration, and rerenders. Distinguish component-owned behavior from consumer inputs. Inspect native/browser behavior and available component internals before demanding custom code. Missing provider docs or dependencies produce limitations, not invented APIs.

In React, follow props and portals; in Web Components, follow slots, shadow roots, and ElementInternals. Do not assume cross-root ID references work or absent light-DOM ARIA means absent semantics.

Return source-method results and a separate runtime queue. Inferred focus paths are not executed keyboard tests. State uncertainty about runtime-generated content rather than calling an unobserved state passing.

When relevant relationships involve shadow DOM, map endpoints using the [cross-root procedure](../library/runtimes/web-components/names-and-cross-root-relationships.md). Hand off browser-specific state expectations and capability needs rather than inferred snapshot results. Include rerendered names/relationships and the close/reopen path where applicable.

For component-author scope, inspect demos and documentation snippets as consumer examples: naming inputs, actual interaction paths, and supported states should teach correct use. Record which examples were reviewed. Do not expand a product-level modal request into an unrelated documentation audit. Broader custom-element form lifecycle review remains planned.
