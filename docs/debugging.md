# Developer Experience &# Debugging AnimX

AnimX (v2.1.0) includes powerful built-in diagnostics.

> **Tip:** You can interactively test these debug tools by opening the local docs landing page `dist/animx.docs.html` and running the commands in your browser console!

## 1. Debug Mode
Enable debug mode to surface structured warnings (`AX_*` codes) and helpful suggestions (like typo corrections for presets) in the console.

```javascript
AnimX.debug(true);  // Enable warnings
AnimX.debug(false); // Disable warnings (Default)
console.log(AnimX.debug()); // Check status
```

*Note: Debug warnings use a `warnOnce` mechanism to avoid spamming the console.*

## 2. Validate DOM
Scan the entire document (or a specific scope) for invalid data attributes, missing presets, duplicates, or broken configurations.

```javascript
const result = AnimX.validate();
// Returns { ok: false, errors: ['Preset "fadeup" not found...'], warnings: [], checked: 42 }

// Or limit scope:
AnimX.validate('.my-section');
```

## 3. Diagnose Environment
Diagnose checks if the browser environment is properly configured to run AnimX. It verifies CSS availability, `prefers-reduced-motion`, IntersectionObserver, and WAAPI support.

```javascript
const env = AnimX.diagnose();
console.log(env.cssLoaded); // If false, you forgot to link animx.css
```

## 4. Inspect Element
Inspect an element to see its active AnimX instances, classes, and parsed attributes.

```javascript
const info = AnimX.inspect('#my-card');
console.log(info.activeInstances);
console.log(info.presets);
```
*(Calling `AnimX.inspect()` without arguments returns the global engine state).*

## 5. Preset Searching & Suggestions
Search the internal metadata registry dynamically.

```javascript
// Search deeply
const results = AnimX.searchPresets('button');

// Get suggestions for typos
const suggestions = AnimX.suggestPreset('cardrise'); 
// Returns top 5 matches like [{ name: 'card-lift' }, ...]
```

## 6. Examples Generator
Quickly generate usable examples directly in your console.

```javascript
// Get raw strings
const examples = AnimX.getExamples('fade-up-soft');
console.log(examples.html, examples.data, examples.js);

// Automatically copy to clipboard
AnimX.copyExample('fade-up-soft', 'js');
```

## Error Codes
If `debug(true)` is enabled, AnimX issues standard codes:
- `AX_PRESET_MISSING`
- `AX_COMPONENT_PRESET_MISSING`
- `AX_PATH_MISSING`
- `AX_INVALID_ATTRIBUTE`
