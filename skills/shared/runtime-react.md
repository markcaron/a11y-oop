# React runtime evidence

Use real imports, refs, events and installed test-library conventions. Account for portals and overlay containers outside the main root. Verify the actual DOM and accessible relationships after state transitions. Do not assume PF and a native control have identical APIs.

Follow the installed runner's assertions and async model. jest-axe in jsdom cannot establish visual contrast or real layout/focus behavior. Mocked components cannot verify the library's actual accessibility. Test keyboard model, focused/selected/expanded states and return focus in the appropriate browser when needed.

React may host Web Components. In that case also load runtime-wc.md and the appropriate provider for those elements.
