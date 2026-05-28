# v3.42 Graphify and Text Module Review

Graphify used: yes.

Graphify files inspected:
- `graphify-out/.graphify_root`
- `graphify-out/graph.json`
- `graphify-out/GRAPH_REPORT.md`

Files inspected:
- AnimX entry: `src/js/animx.js`
- Registry schema and reports: `src/js/registry/*`
- Capability matrix: `src/js/registry/capability-matrix.js`
- Text module: `src/js/text/text-api.js`, `src/js/text/split-text.js`, `src/js/text/text-parser.js`, `src/js/text/text-utils.js`, `src/js/text/text-accessibility.js`
- Data parser/runtime: `src/js/data/data-parser.js`, `src/js/data/data-api.js`
- Text styles: `src/scss/text/_text-base.scss`, `src/scss/text/_text-reveal.scss`, `src/scss/keyframes/_text.scss`
- Tests: `tests/text.test.js`, `tests/registry.test.js`
- Dist generation: `build-post.js`, `scripts/verify-dist.js`
- Docs/release notes: `docs`, `README.md`, `ANIMX_MEMORY.md`, `ANIMX_QA_CHECKLIST.md`

Existing text module location:
- `src/js/text`

Existing registry location:
- `src/js/registry`

Existing text effects found:
- Split text, text rise, text slide up, text mask up, text wave, text swap, ticker, rolling, scramble, counter, marquee, and advanced text API placeholders.

Where v3.42.0 was implemented:
- `src/js/text/text-reveal-presets.js`
- `src/js/text/split-text.js`
- `src/js/text/text-parser.js`
- `src/js/data/data-parser.js`
- `src/js/data/data-api.js`
- `src/scss/text/_text-base.scss`
- `src/scss/text/_text-reveal.scss`
- `src/js/registry/registry-report.js`

Structural risk found:
- The existing text path delegated split fragments through the CSS driver, which removed `ax-text-*` wrapper classes. This module preserved split wrapper classes during animation.
- Some existing advanced text APIs are reserved for v3.43.0 and were not expanded here.
