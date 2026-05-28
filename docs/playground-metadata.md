# Playground Metadata

AnimX v3.41.0 prepares metadata for a future playground without building website code.

Each effect includes:
- `playground.ready`
- `playground.previewType`
- `playground.defaultOptions`
- `playground.supportedControls`
- `playground.exportTypes`

An effect can be playground-ready only when:
- the effect exists
- at least one usage mode works
- preview type is known
- reduced-motion behavior is safe
- fallback or final-state behavior keeps content readable
- snippets can be generated without hiding content

Generated output:
- `dist/reports/animx-playground-readiness.json`
- `dist/animx.preset-data.json`
