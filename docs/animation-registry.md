# Animation Registry

AnimX v3.41.0 adds a centralized animation registry in `src/js/registry`.

The registry is built from existing preset sources and conservative JS API mappings. It does not create animation effects. An effect is `ready` only when the library can point to an existing CSS class or JS API path.

Primary APIs:
- `AnimX.getRegistry()`
- `AnimX.getEffects()`
- `AnimX.getEffectsByElement(element)`
- `AnimX.getEffectsByFamily(family)`
- `AnimX.getEffectsByStatus(status)`
- `AnimX.searchEffects(query)`
- `AnimX.validateRegistry()`

Every effect includes id, name, family, category, element, status, usage modes, implementation metadata, reduced-motion behavior, fallback metadata, accessibility notes, performance notes, docs/test hints, and playground metadata.

Future modules must add real implementation first, then add registry metadata. Do not add metadata-only effects as `ready`.
