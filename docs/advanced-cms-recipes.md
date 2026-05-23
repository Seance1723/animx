# Advanced CMS Recipes (v3.28.0)

AnimX offers zero-dependency CMS recipes using pure data attributes. 

## Safe DOM Initialization

If you are injecting items via AJAX or infinite scroll, safely refresh AnimX by calling:

```javascript
// Scan just the newly loaded container to avoid double-init
AnimX.refreshCMS('.my-ajax-container');
```

Alternatively, attach an observer that automatically debounces and caps observations at 500 nodes:

```javascript
AnimX.observeCMS('.my-feed', { maxNodesPerRefresh: 500, debounce: 80 });
```
