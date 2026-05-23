# Custom Recipe Library

Recipes are robust animation sequences targeting multiple elements within a section (e.g., a "Hero Section" recipe that cascades through the title, copy, and buttons).

## How It Works
- Create a recipe in the **Recipe Library** tab.
- Define sequential steps (target selector, preset, delay).
- Studio can automatically generate:
  - **JS Sequences**: `AnimX.timeline().add(...).play()`
  - **HTML Markup**: Using standard `data-ax` structural tags.
  - **No-Code / CMS Ready Markup**: Simplified data attributes.

Recipes are saved to `localStorage` and can be exported as pure JSON.
They do NOT add runtime dependencies.
