# Package Import & Export

Packages can be exported as raw `.json` files via the browser's `Blob` API.
During import, AnimX uses a strict validator to strip malicious intent. No scripts will run during import, and any invalid DOM payloads stored inside the JSON will be sandboxed prior to render.
