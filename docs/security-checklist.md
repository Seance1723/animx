# Production Security Checklist

When deploying AnimX in production, follow this checklist:

- [ ] **Keep SafeMode On:** Ensure `AnimX.security().safeMode` is `true`.
- [ ] **Disable HTML Strings:** Leave `allowHTMLStringSwap: false` unless strictly required. Pass `DocumentFragment` nodes instead of HTML strings.
- [ ] **Avoid Inline Events:** Never trigger AnimX via `onclick` or other inline event attributes. Use standard event listeners or `data-ax` triggers.
- [ ] **Run Security Audit:** Call `AnimX.securityAudit()` in your staging environment to catch bad selectors, inline handlers, or `javascript:` URLs attached to animated elements.
- [ ] **Verify CSP:** Ensure your Content Security Policy explicitly forbids `unsafe-eval`.
- [ ] **Sanitize External Data:** If your data originates from a CMS or user input, sanitize it server-side or via DOMPurify before feeding it to AnimX attributes.
