# Studio Export Guide

Once you've configured your animation exactly how you want it, you can export it to your project.

## Export Types

In the bottom panel of AnimX Studio, you will see three tabs:

### 1. HTML
Exports standard CSS class-based integration.
\`\`\`html
<div class="ax-fade-up"> Content </div>
\`\`\`

### 2. Data Attributes
Exports a robust element with HTML5 data attributes for configuration. Best for CMS integrations.
\`\`\`html
<div data-ax="fade-up" data-ax-duration="700"> Content </div>
\`\`\`

### 3. JavaScript
Exports a clean snippet using the `AnimX.animate()` API. Best for dynamic frameworks and logic-heavy apps.
\`\`\`javascript
AnimX.animate(".target", "fade-up", { duration: 700 });
\`\`\`

> [!TIP]
> Always verify the exported code matches your specific DOM selector strategy. The Studio assumes generic selectors.
