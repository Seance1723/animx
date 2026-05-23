# Local-Only Workflow

AnimX explicitly rejects cloud accounts, forced telemetrics, and backend APIs. 
When you click "Export Package", your browser generates the file locally. When you "Import Package", your browser parses it locally via the `FileReader` API.

Your data never leaves your machine.
