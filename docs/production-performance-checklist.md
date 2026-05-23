# Production Performance Checklist

- [ ] Use `animx.min.css` and `animx.min.js`.
- [ ] Do not include `animx.studio.html` or `animx-studio.js` in production bundles.
- [ ] Ensure `data-ax` observers are not over-used for elements always above the fold.
- [ ] If using bundlers, rely on ESM exports to enable potential tree-shaking optimizations.
