# Importing & Exporting Packs

AnimX provides robust offline importer and exporter APIs.

## Exporting
Exporting a pack creates a valid JSON payload that you can save locally or distribute.
```javascript
const json = AnimX.exportPack('animx-text-essentials-pack', { format: 'json' });
console.log(json);
```

## Importing
Importing runs a 3-step pipeline:
1. **Security Audit**: Scans for XSS, Prototype Pollution.
2. **Validation**: Ensures schema conformity and checks for missing dependencies.
3. **Registration**: Installs it into the local Pack Registry.

```javascript
const report = AnimX.importPack(myJsonString, { dryRun: false, overwrite: true });

if (report.ok) {
  console.log("Pack imported successfully!", report.installed);
} else {
  console.error("Import failed:", report.errors);
}
```
