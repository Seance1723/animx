# Tree-Shaking Strategy

In v3.31.0, we introduced proper `sideEffects` mapping in `package.json`.

```json
"sideEffects": [
  "*.css",
  "*.scss"
]
```

This tells Rollup/Webpack that our `.js` and `.esm.js` files do not execute dirty top-level DOM mutations when imported. Thus, if you only import a specific submodule, the bundler can safely drop unused core features.

> [!WARNING]
> Because AnimX relies on a global registry for `data-ax` parsing, full tree-shaking of individual presets is limited if you rely exclusively on HTML `data-ax` attributes, as the parsers need the whole registry. If you configure custom bundles, keep this in mind.
