# AnimX Studio Limitations

While AnimX Studio is a powerful tool, it is explicitly **not**:
- A full-featured website builder (like Webflow or Framer).
- A cloud-synced collaborative tool (like Figma).
- A heavy framework app.

## Strict Guidelines

- **Local Only**: Studio operates entirely in your browser using `localStorage`. No data is sent to external servers.
- **Preview Tool**: The HTML imports and templates are strictly for animation testing. Do not rely on Studio to build complex DOM layouts from scratch.
- **Security Check**: When exporting HTML snippets, ensure you are passing them through your backend's sanitizer if the content is user-generated. Studio snippets themselves do not contain `eval` or inline execution by design, but your platform's security remains your responsibility.
