# Webflow Animation Recipes (v3.28.0)

Add AnimX scripts into your Webflow Site Settings (Custom Code).

## Webflow CMS Collections
For dynamic collection lists, apply the data attribute to the Collection Item:

1. Select your Collection Item.
2. Go to Settings -> Custom Attributes.
3. Name: `data-ax-recipe`, Value: `wf-cms-collection-stagger`.

This approach completely replaces the heavy Webflow interactions JS, massively improving page load scores.
