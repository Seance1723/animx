# Local Preset Pack Format

A local pack in AnimX is represented by the `animx-pack-manifest` schema.

## Structure
A valid pack must contain:
- `schema`: Always `"animx-pack-manifest"`
- `id`: A unique kebab-case identifier (e.g. `animx-text-essentials-pack`)
- `type`: Can be `preset-pack`, `recipe-pack`, `variant-pack`, etc.
- `contents`: An object referencing the animation resources.

## Example Payload
```json
{
  "schema": "animx-pack-manifest",
  "id": "my-custom-pack",
  "name": "My Custom Pack",
  "version": "1.0.0",
  "type": "preset-pack",
  "contents": {
    "presets": ["my-custom-fade", "my-custom-slide"]
  }
}
```

When importing this pack, AnimX verifies that `my-custom-fade` and `my-custom-slide` exist in the local registry.
