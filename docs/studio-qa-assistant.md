# Studio QA Assistant

The QA Assistant is a local-only verification engine that runs directly inside AnimX Studio. It validates your project state against common pitfalls before you export your code.

## Key Checks:
- **Project Structure**: Ensures valid IDs and components.
- **Preset Validation**: Verifies that you aren't referencing deprecated or misspelled presets.
- **Export Safety**: Wraps around our security sanitizer to guarantee that your `.html` exports contain absolutely no injected `<script>` tags, inline event handlers, or `javascript:` URLs.

The QA Assistant does *not* talk to an external server and is not a substitute for a comprehensive legal accessibility or security audit. It is a rapid, heuristic guide designed to catch obvious mistakes before launch.
