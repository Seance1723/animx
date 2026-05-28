# v3.41 Graphify and Structure Review

Graphify was found at `graphify-out/`.

Inspected Graphify files:
- `graphify-out/.graphify_root`
- `graphify-out/graph.json`
- `graphify-out/GRAPH_REPORT.md`
- `graphify-out/manifest.json`

Graphify root:
- `C:\xampp\htdocs\animx`

Structure inspected from Graphify and verified directly:
- Core AnimX entry: `src/js/animx.js`
- Package entry: `src/index.js`
- Existing preset registry: `src/js/presets/preset-registry.js`
- Preset metadata sources: `src/js/presets/css-presets.js`, `src/js/presets/expanded-presets.js`, `src/js/presets/element-presets.js`
- Data attribute parser: `src/js/data/data-parser.js`
- Data runtime: `src/js/data/data-api.js`
- Animation modules: `src/js/text`, `src/js/interactions`, `src/js/components`, `src/js/media`, `src/js/svg`, `src/js/scroll`, `src/js/transitions`, `src/js/backgrounds`, `src/js/cms`, `src/js/packs`, `src/js/runtime`, `src/js/audit`
- Styles and CSS class output: `src/scss`
- Tests: `tests`
- Docs and demos: `docs`, `demo`
- Build scripts: `vite.config.js`, `vite.core.config.js`, `vite.studio.config.js`, `build-post.js`, `scripts/verify-dist.js`
- Build output: `dist`

Registry location for v3.41.0:
- `src/js/registry/animation-registry.js`
- `src/js/registry/animation-schema.js`
- `src/js/registry/animation-taxonomy.js`
- `src/js/registry/capability-matrix.js`
- `src/js/registry/registry-validator.js`
- `src/js/registry/registry-search.js`
- `src/js/registry/registry-report.js`
- `src/js/registry/registry-utils.js`

Files required for this module:
- `src/js/animx.js`
- `src/js/core/devtools.js`
- `src/js/data/data-parser.js`
- `src/js/registry/*`
- `build-post.js`
- `scripts/verify-dist.js`
- `tests/registry.test.js`
- `docs/animation-registry.md`
- `docs/capability-matrix.md`
- `docs/playground-metadata.md`
- `docs/effect-status-rules.md`
- `docs/v3-41-registry-upgrade.md`
- `docs/v3-41-existing-animation-audit.md`
- `README.md`
- `docs/release-notes.md`
- `ANIMX_QA_CHECKLIST.md`
- `ANIMX_MEMORY.md`

Graphify update note:
- The current workflow includes `graphify-out/graph.json` and `GRAPH_REPORT.md`. The source changes in this module are recorded in docs and generated reports; a full Graphify rebuild can be run after acceptance if the project owner wants the graph itself refreshed.
