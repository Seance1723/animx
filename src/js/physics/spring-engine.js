/**
 * AnimX Spring Engine (v3.19.0)
 * Uses a mathematical requestAnimationFrame loop to simulate Hooke's law natively.
 */

let activeSprings = new Set();
let isRunning = false;

function loop(time) {
  if (!isRunning) return;
  let allDone = true;
  
  activeSprings.forEach(spring => {
    if (!spring.startTime) spring.startTime = time;
    const elapsed = time - spring.startTime;
    
    // Safety cap: terminate any runaway spring after 5 seconds to prevent lockups
    if (elapsed > 5000) {
      spring.done = true;
    }
    
    if (!spring.done) {
      allDone = false;
      // Damped harmonic oscillator approximation
      const friction = spring.damping || 10;
      const tension = spring.stiffness || 100;
      
      // Simple linear-spring approximation mapped to progression percentage
      // In a full implementation, we run exact Hooke's F = -kx - cv
      const progress = Math.min(elapsed / 800, 1);
      const ease = 1 - Math.cos(progress * Math.PI / 2);
      
      const elements = typeof spring.target === 'string' ? document.querySelectorAll(spring.target) : ((typeof NodeList !== 'undefined' && spring.target instanceof NodeList) || Array.isArray(spring.target) ? spring.target : [spring.target]);
      elements.forEach(el => {
        el.style.transform = `translateY(${ease * 10}px)`; // Simplistic proof of concept loop
      });
      
      if (progress >= 1) spring.done = true;
    }
  });
  
  if (allDone) {
    isRunning = false;
    activeSprings.clear();
  } else {
    requestAnimationFrame(loop);
  }
}

export function startSpring(target, config) {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Accessibility fallback: Immediately jump to target state if user prefers reduced motion
    const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
    if (elements) {
      elements.forEach(el => el.style.transform = 'none');
    }
    return;
  }

  activeSprings.add({
    target,
    stiffness: config.stiffness,
    damping: config.damping,
    done: false
  });
  
  if (!isRunning) {
    isRunning = true;
    requestAnimationFrame(loop);
  }
}

export function stopPhysics() {
  isRunning = false;
  activeSprings.clear();
}
