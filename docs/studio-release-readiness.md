# Studio Release Readiness

Before publishing your AnimX integration, check the **Release Readiness** panel in Studio.

This tool automatically verifies:
- `window.AnimX.version` matches your Studio version.
- **Security Check:** Ensures no Prototype Pollution vulnerabilities exist in parsed user data.
- **Accessibility Check:** Verifies Reduced Motion listeners are active.
- **Bundle Check:** Verifies that zero external dependencies (React, GSAP) have been injected into the timeline data model.
