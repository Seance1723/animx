# Migration from v1.x to v2.0.0

AnimX v2.0.0 is our **Hero Release**. It vastly improves stability, testing, missing target safety, and documentation while maintaining strict backward compatibility.

### Breaking Changes
- **None.** All public APIs (`AnimX.version`, `AnimX.animate`, `AnimX.scroll`, `AnimX.timeline`, etc.) remain fully backwards compatible.

### Improvements
- **Missing Target Safety:** Calling `AnimX.animate('.does-not-exist')` no longer crashes or returns `null`. It returns a "safe mock" instance, meaning you can chain `.play()` or `.destroy()` safely even if the DOM node isn't present.
- **Diagnostics API:** You can now run `AnimX.diagnose()` and `AnimX.validate()` to inspect memory state, preset validity, and missing targets.
- **Preset API:** Added `AnimX.searchPresets()`, `AnimX.suggestPreset()`, and `AnimX.findPreset()`.

### Limitations
- Advanced layout transitions (FLIP) and gesture-based drag physics are still excluded from the v2 core to keep the bundle size zero-dependency.
