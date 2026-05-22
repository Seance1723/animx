# Project Export

Once you configure your sections and motion style, you can export the full project.

## Output Formats
1. **HTML**: Generates the full page structure with `ax-*` classes.
2. **Data Attributes**: Generates the page structure with `data-ax-*` attributes (ideal for CMS).
3. **JS Initialization**: Generates the HTML + a custom `AnimX.config({...})` boot script.

Every export runs through our local security validator to prevent XSS.
