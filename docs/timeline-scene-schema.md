# Timeline Scene Schema

AnimX Scenes use a strict JSON data model. This schema is fully validated upon import.

```json
{
  "schema": "animx-timeline-scene",
  "schemaVersion": "1.0",
  "animxVersion": "3.9.0",
  "sceneId": "custom-hero",
  "name": "Custom Hero",
  "trigger": "load",
  "settings": {
    "ease": "smooth",
    "reducedMotionSafe": true
  },
  "tracks": [
    { "id": "track-1", "name": "Typography" }
  ],
  "steps": [
    {
      "id": "step-1",
      "trackId": "track-1",
      "target": ".hero-title",
      "preset": "text-mask-up",
      "type": "text",
      "position": "0",
      "duration": 800
    }
  ]
}
```

## Security
The parser aggressively blocks `__proto__`, `<script>`, and inline `javascript:` URLs to maintain security compliance for enterprise environments.
