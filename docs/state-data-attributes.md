# State Data Attributes (v3.16.0)

AnimX uses a highly optimized, debounced `MutationObserver` on the root document to watch specifically for changes to the `data-ax-state` attribute.

## Mapping States in HTML

```html
<div 
  class="state-target" 
  data-ax-state="idle" 
  data-ax-state-idle="fade-up" 
  data-ax-state-loading="card-lift" 
  data-ax-state-success="card-spotlight-hover">
  I am reactive!
</div>
```

When Javascript updates `div.setAttribute('data-ax-state', 'loading')`, AnimX automatically intercepts the mutation and fires `card-lift`.
