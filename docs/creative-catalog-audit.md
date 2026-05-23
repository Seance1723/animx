# Creative Catalog Audit

The v3.12.0 release implemented a strict audit of the creative catalog.

## Rules
1. **No Duplicates**: Presets must not conflict in name.
2. **Metadata**: Every preset must declare its `element`, `category`, and `reducedMotion` strategy.
3. **Performance**: Heavy UI components must never loop by default unless scoped into an ambient class.
