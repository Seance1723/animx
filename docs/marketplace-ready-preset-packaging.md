# Marketplace-Ready Preset Packaging (v3.29.0)

AnimX introduces a completely **Local, Zero-Dependency Pack Manager**.
We designed a JSON-based manifest system that mimics a real marketplace distribution model without ever requiring a backend, a server, or a cloud dependency.

## Why JSON Manifests?
Instead of adding heavy `.zip` decoding libraries to the browser, AnimX exports "Packs" as structured JSON files. These JSON files contain all metadata (name, author, tier, compatibility) and explicitly list the internal preset, variant, and recipe IDs required to run them.

## Key Features
1. **Zero Dependency**: All export/import logic uses native `JSON.parse` and `JSON.stringify`.
2. **Security First**: `importPack` strictly scrubs for prototype pollution (`__proto__`), `<script>` injections, and `javascript:` URIs.
3. **Dry-Run Validations**: Before installing, a pack is dry-run through a compatibility checker to verify AnimX version bounds.
4. **Offline Studio Builder**: Create your own packs in the Local Pack Manager inside AnimX Studio.
