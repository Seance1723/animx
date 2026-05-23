# QA Rules Configuration

The QA Runner evaluates multiple localized rulesets:

- `studio-export-qa.js`: Searches data exports for malicious payloads.
- `studio-preset-qa.js`: Cross-references your layout's `section.settings` against the array of known default presets.

These rules are static and run locally via DOM and string evaluation to maintain zero external dependencies.
