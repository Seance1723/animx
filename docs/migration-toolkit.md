# AnimX Migration Toolkit (v3.11.0)

The Migration Toolkit is included in AnimX v3.11.0 to help developers safely upgrade older DOM markup and Studio projects to the Long-Term Support (LTS) standard.

## Features
- **Data Attribute Migrator:** Scans the DOM for legacy attributes (e.g. `data-ax-trigger`) and upgrades them to the modern spec (`data-ax-on`).
- **Studio JSON Migrator:** Safely converts `v3.2.0` projects to the `v3.11.0` schema, parsing structural changes while blocking prototype pollution attempts.
- **Compatibility Audits:** Programmatically verify that the core APIs remain backward compatible.
