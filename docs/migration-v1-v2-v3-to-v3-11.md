# Migration Path: v1/v2/v3 to v3.11.0

Upgrading to v3.11.0 is designed to be seamless. The Core Library remains zero-dependency and 100% backward compatible.

## Major Changes (Internal)
- `data-ax-trigger` has been superseded by `data-ax-on`. The old attribute will still function natively.
- `AnimX.timeline()` now prefers tracks instead of flat arrays. Flat arrays will trigger a deprecation warning but will execute normally.

To migrate DOM structure automatically, use `AnimX.migrateDataAttributes(document.body, { dryRun: false })`.
