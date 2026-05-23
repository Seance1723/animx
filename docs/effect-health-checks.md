# Effect Health Checks (v3.13.0)

Effect Health is determined by the completeness of a Preset's implementation.

### Status Indicators
- **Healthy**: Preset has metadata, valid target, and implements safe `reducedMotion` behavior.
- **Warning**: Preset is missing a category, element tag, or has empty behavior descriptors.
- **Broken**: Preset declares usage modes (e.g. `data`) but crashes the `data-ax` parser.
