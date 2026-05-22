# Template JSON Format

You can export and import your Studio configurations using JSON. This allows you to save custom tweaked animations and share them with teammates.

## Security
The JSON importer strictly sanitizes incoming data. It only restores configurations (durations, easing, selected IDs). It does **not** execute arbitrary scripts or insert unsafe HTML.
