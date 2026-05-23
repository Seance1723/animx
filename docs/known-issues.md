# Known Issues

## Open Issues

### [AX-KNOWN-002] Safari 3D Perspective Sub-Pixel Shifts
- **Severity:** low
- **Status:** open (deferred)
- **Module:** spatial / 3D
- **Description:** `perspective()` triggers minor sub-pixel rendering shifts on certain scaled flexbox layouts in Safari.
- **Workaround:** Avoid mixing `transform: perspective()` with flexbox gaps on Safari. Use a wrapper element with perspective applied instead.
- **Target Fix:** Post v4.0.0

## Fixed Issues

### [AX-KNOWN-001] Safari Local Storage Quotas
- **Severity:** medium → fixed
- **Status:** fixed in v3.37.0
- **Fix:** Graceful in-memory storage fallback when `localStorage` is unavailable.
