# Pack Manifest Schema

This document details the expected fields in the v3.29.0 Pack Manifest.

| Field | Type | Required | Description |
|---|---|---|---|
| `schema` | String | Yes | Must be `"animx-pack-manifest"` |
| `id` | String | Yes | Unique kebab-case ID. |
| `animxVersion` | String | Yes | The targeted AnimX version (e.g., `"3.29.0"`). |
| `name` | String | Yes | Display name of the pack. |
| `type` | Enum | Yes | `preset-pack`, `recipe-pack`, `mixed-pack`, etc. |
| `contents` | Object | No | Contains arrays of IDs mapping to presets, variants, recipes. |
| `author` | Object | No | Author metadata (name, url, email). |
| `quality` | Object | No | Verification flags (`validated`, `securityChecked`, `reducedMotionChecked`). |

See `src/js/packs/pack-schema.js` for the exact code schema validation rules.
