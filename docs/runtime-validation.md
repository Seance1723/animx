# Runtime Validation Guide (v3.13.0)

AnimX v3.13.0 introduces a formal Runtime Validator to programmatically prove the structural health of the library.

## Usage
The fastest way to validate the active DOM is via the global API:
```javascript
const report = AnimX.validateRuntime();
console.log(report.ok, report.issues);
```

## What it Checks
1. **Preset Integrity**: Validates that all active presets in `AnimX.getPresets()` have proper metadata (Category, Element, Reduced Motion Strategy).
2. **Usage Mappings**: Ensures that if a preset declares `class` usage, it isn't falsely promising behavior.
