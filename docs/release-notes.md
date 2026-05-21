# Release Notes

## v1.0.0 - Stable Public Release

**AnimX v1.0.0** marks the first stable production release. The focus of this release was strictly hardening, auditing, and finalizing public APIs without adding massive layout solvers or physics engines.

### Feature Summary
- **Declarative Core**: Robust data-attribute engine supporting `scroll`, `manual`, and `disabled` modes.
- **Stagger & Timeline Engine**: Chain complex WAAPI transitions safely.
- **Text Animation**: Production-ready character/word/line splitting with built-in accessibility guards.
- **Component Presets**: 100+ native `data-ax-component` recipes added.
- **Strict Reduced Motion**: Hardened fallback implementations intercepting physics and text loops to guarantee a11y compliance.

### Limitations
- No automatic advanced layout flipping (`FLIP` transitions).
- No complex touch-gesture throwing physics.

### Next Planned Release (v1.1.0)
The upcoming `v1.1.0` will be a Performance and Cleanup Upgrade focusing on code minification improvements, tree-shaking exports, and deeper WAAPI polyfilling for legacy edge-cases.
