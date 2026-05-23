# Bundle Optimization

AnimX explicitly splits core runtime concerns from Studio IDE and Gallery concerns.

- **animx.min.js**: Contains the public AnimX runtime, registry parsers, core engines, and critical performance paths.
- **animx.esm.js**: The exact same logic but emitted using ESModules so modern bundlers can prune unused Named Exports.
- **animx.core.min.js**: A stripped-down version omitting certain heavy legacy integrations if configured.

We strictly avoid including heavy Studio logic (like `studio.html` panels) into `animx.min.js`.
