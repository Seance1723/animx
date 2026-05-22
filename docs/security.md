# Security and Defensive Runtime

AnimX is built with a defensive runtime. While no front-end animation library can be "fully secure" or "XSS-proof" against all attacks (since final security depends on your overall architecture and Content Security Policy), AnimX applies safer defaults and active input validation to reduce risk.

## Zero Dependency Does Not Mean Automatic Security
AnimX explicitly does not rely on third-party dependencies, meaning we avoid upstream vulnerabilities from large frameworks. However, you must still apply standard best practices to DOM inputs.

## Defensive Strategies
- **No `eval()` or `new Function()`:** The core AnimX library never dynamically evaluates javascript strings.
- **Prototype Pollution Prevention:** All configuration and option merges use a hardened merge utility that explicitly ignores `__proto__`, `prototype`, and `constructor` keys.
- **Safe HTML Parsing:** When inserting HTML strings via `AnimX.swap()`, AnimX drops `<script>` tags, inline event attributes (`onclick`, etc.), and `javascript:` URLs. **Note:** HTML string swapping is disabled by default.
- **Selector Safety:** Bad selectors passed to `.animate()` or `data-ax` attributes are caught and ignored rather than throwing uncaught exceptions that crash your page.
- **Adapter Safety:** Framework adapters (like jQuery or Alpine) fail safely if the host framework is missing.

## What AnimX Does Not Guarantee
AnimX is a UI animation tool, not a full HTML sanitizer (like DOMPurify). We strongly advise passing pre-sanitized strings or safe `DocumentFragment` instances if your content is sourced from raw user input.
