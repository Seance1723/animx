# QA Report JSON Format

When you run the QA Assistant, the underlying data structure returned is formatted as follows:

```json
{
  "version": "3.5.0",
  "projectName": "Untitled",
  "ranAt": "2026-05-23T00:00:00.000Z",
  "score": 100,
  "status": "pass",
  "checks": [],
  "errors": [],
  "warnings": [],
  "suggestions": [],
  "reports": {
    "preset": { "errors": [], "warnings": [] },
    "exports": { "errors": [], "warnings": [] },
    "accessibility": { "errors": [], "warnings": [] },
    "security": { "errors": [], "warnings": [] }
  }
}
```
