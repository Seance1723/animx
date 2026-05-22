# React / Next.js Usage

AnimX is zero-dependency and framework agnostic. You do not need a dedicated React wrapper package!

## Installation

```bash
npm install animx
```

## Basic Component

Use standard React `useRef` and `useEffect`. **Crucially, return `instance.destroy()`** from the effect to guarantee React 18 Strict Mode doesn't double-animate or leak memory.

```jsx
import { useEffect, useRef } from 'react';
import AnimX from 'animx';
import 'animx/dist/animx.css';

export default function AnimatedBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    // 1. Initialize animation
    const instance = AnimX.animate(boxRef.current, 'fade-up', {
      duration: 800
    });

    // 2. Cleanup on unmount
    return () => instance.destroy();
  }, []);

  return <div ref={boxRef}>Hello React</div>;
}
```

## Stagger Example

You can animate multiple children without needing refs on every single child.

```jsx
export default function StaggerList() {
  const containerRef = useRef(null);

  useEffect(() => {
    const instance = AnimX.stagger(containerRef.current.children, 'list-item', {
      stagger: 100
    });
    
    return () => instance.destroy();
  }, []);

  return (
    <ul ref={containerRef}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  );
}
```
