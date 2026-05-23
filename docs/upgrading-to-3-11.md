# Upgrading to 3.11.0

To upgrade to `3.11.0`:
1. Update your CDN or NPM reference to `3.11.0`.
2. Open `demo/studio.html` and use the **Migration Toolkit** panel.
3. Run the **Compatibility Check** to ensure all required functions exist.
4. Run the **Data Attribute Dry-Run** in your dev console to see if any old `data-ax-trigger` tags need to be renamed to `data-ax-on`.
