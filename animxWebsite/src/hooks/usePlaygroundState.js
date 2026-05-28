import { useState } from 'react';
export function usePlaygroundState() {
  const [state, setState] = useState({
    selectedElement: 'text',
    selectedEffect: 'reveal',
    duration: 800,
    delay: 0,
    stagger: 50,
    easing: 'ease-out',
    intensity: 50,
    reducedMotionPreview: false
  });
  return [state, setState];
}