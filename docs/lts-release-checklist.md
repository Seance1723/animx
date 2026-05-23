# LTS Release Checklist

Prior to releasing v3.11.0, the following checks were confirmed:
- [x] All 100+ public API endpoints verified present.
- [x] All native presets successfully bound to `AnimX.getPresets()`.
- [x] Security `__proto__` pollution filters verified active on Studio Imports.
- [x] Accessibility `prefers-reduced-motion` observers active on boot.
- [x] Dist generated cleanly (`animx.min.js`, `animx.min.css`) without referencing `src/`.
