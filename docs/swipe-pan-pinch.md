# Swipe, Pan, Pinch, and Long Press

AnimX provides lightweight detection modules for standard mobile-friendly interactions.

## Swipe

Detect quick flicks.

```javascript
AnimX.swipe('.card', {
  direction: 'left', // any, left, right, up, down, horizontal, vertical
  threshold: 60,
  onSwipe: (e) => console.log('Swiped!', e.direction)
});
```

## Pan

Track continuous coordinate movement without necessarily translating an element.

```javascript
AnimX.pan('.canvas', {
  onMove: (e) => {
    console.log(`Delta X: ${e.deltaX}, Delta Y: ${e.deltaY}`);
  }
});
```

## Pinch (Zoom)

Track two-finger spread/pinch scaling on touch devices.

```javascript
AnimX.pinch('.image', {
  minScale: 0.5,
  maxScale: 3,
  onScale: (e) => {
    console.log(`Current Scale: ${e.scale}`);
  }
});
```

## Long Press

Detect when an element is held for a specified duration without moving outside a tolerance radius.

```javascript
AnimX.longPress('.button', {
  duration: 800, // ms
  moveTolerance: 10, // px
  onLongPress: () => alert('Held!')
});
```
