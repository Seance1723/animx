# Content Security Policy (CSP) Notes

AnimX is designed to be highly compatible with strict Content Security Policies.

## Core JavaScript
- **No `eval`:** AnimX does not use `eval()` or `new Function()` anywhere in its core runtime.
- **No `unsafe-eval` required:** You do not need to add `unsafe-eval` to your `script-src` to use AnimX.

## Inline Styles (`style-src`)
- **Transforms & Opacity:** AnimX uses the native Web Animations API (WAAPI) for most animations, which does not inherently require inline styles.
- However, certain layout components, text metrics calculations, or SVG state resets *may* briefly manipulate inline styles (e.g., `element.style.transform`). 
- **Recommendation:** In strict CSP environments, you may need `style-src 'self' 'unsafe-inline'` depending on how restrictively your browser interprets DOM style property access.

## Demo Pages
- The provided `demo/index.html` uses inline `<script>` tags purely for demonstration convenience.
- **Production Recommendation:** Always load your AnimX initialization logic from an external, CSP-whitelisted `.js` file.
