# Drag & Physics

AnimX provides `AnimX.drag()` for low-level pointer loop controls and `AnimX.draggable()` which automatically applies state CSS classes (`.ax-draggable`, `.ax-dragging`).

## Basic Draggable

```javascript
AnimX.draggable('.card');
```

## Bounds & Axis Locking

You can restrict movement by passing a bounds string (like `'parent'`) and lock an axis to `'x'` or `'y'`.

```javascript
AnimX.draggable('.card', {
  bounds: 'parent',
  axis: 'x'
});
```

## Inertia & Spring

Enable `inertia` to allow the element to slide when released. If it hits bounds, enable `spring` to make it bounce back softly.

```javascript
AnimX.draggable('.card', {
  bounds: '.container',
  inertia: true,
  spring: true
});
```

## Handles

If you want the user to only grab a specific part of an element:

```javascript
AnimX.draggable('.modal', {
  handle: '.modal-header'
});
```

## Drag Reorder (List Sorting)

Combine the drag engine with the layout FLIP engine to create a functional list sorter.

```javascript
AnimX.dragReorder('.list', {
  items: '.item',
  axis: 'y'
});
```

```html
<!-- No-code equivalent -->
<ul data-ax-drag-reorder data-ax-reorder-items="li">
  <li>One</li>
  <li>Two</li>
</ul>
```
