# Deprecated APIs in v3.11.0

The following APIs and data attributes are deprecated. They will remain supported for CMS backwards compatibility, but we recommend migrating away from them.

1. **`data-ax-trigger`**: Use `data-ax-on` instead.
2. **`data-ax-preset`**: Use `data-ax` instead.
3. **Flat Timelines**: `AnimX.timeline([...])` should be updated to use tracks `AnimX.timeline({ tracks: [...] })`.
4. **CamelCase Presets**: Use kebab-case strings (e.g. `fade-up` instead of `fadeUp`).
