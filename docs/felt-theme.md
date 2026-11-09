# Temporary Felt theme

Scope: light and dark appearance, November 9, 2026. The site keeps its native HTML, existing light-DOM checklist element, content and behavior. No Felt component package, glass effect, density selector or new high-contrast mode is introduced. The existing forced-color fallback is retained.

## Sources

- [Requested Felt Figma file and mode demo](https://www.figma.com/design/bbsf9FkFgMv1SyuZA5R4uV/Felt-v1--Components--Tokens--and-Styles?node-id=3547-330). Inspected with signed-in browser access.
- Button / Primary / Default, node 3:31: blue #0066cc fill, pill action shape; the inspected instance was 40px high. Existing 44px minimum hit areas are retained for this site; no density modes are implemented.
- Card / standard Dark: canvas and primary surface #1f1f1f, secondary surface #292929, default border #4d4d4d. Standard Light canvas #fff. High-contrast and glass examples were not used.
- Local Felt prototype at source commit 26777359399305c4c2583c1d1950fe405ebfe996: styles/felt.base.css and styles/felt.theme.css for typography and complementary palette values.
- RHDS Felt preview at 7b65f1378496ac57cc207be8f84822afc8180345: docs/theming/themes/project-felt/preview/felt-theme-preview.css for 16px card radii, 6px field radii, pill actions and 8/16/24/32px spacing. Figma exposes radius aliases; this mock uses the preview's resolved radii rather than claiming every alias was resolved in Figma.

The Make prototype linked by the Figma embed required separate access, so it was not inspected and no access request was sent. The accessible component pages, inspected colors and local styles inform this approximation; it is not a pixel-exact export or an official Felt token package.

## Implementation

`static/assets/felt-theme.css` contains project-prefixed primitives, light-dark semantic roles and a bridge to the site's existing --aop-* component tokens. Layout styles remain in site.css. The theme stylesheet loads last in both layouts. Red Hat Text, Display and Mono variable fonts are self-hosted from the existing RHDS checkout with their SIL Open Font License. No CDN/font service is required.

System color preference remains the default through color-scheme: light dark and CSS light-dark(). There is no JavaScript theme class or stored theme preference. Color-scheme overrides in the audit runner only exercise test palettes. Stronger control-boundary tokens stay separate from decorative borders.

## Replacing the mocks

Resolve the actual Felt component and token versions first. Replace one native presentation surface at a time while preserving its semantic/action contract. Bind verified Felt tokens at the bridge, then remove the equivalent mock selector when a real component owns that presentation. Recheck names, focus, label activation, consumer content and both palettes after each swap. This theme does not invent a future component API.
