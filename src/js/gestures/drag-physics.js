// drag-physics.js
// Inertia and Spring simulation for dragging.

export class PhysicsSimulation {
  constructor(onUpdate, onComplete) {
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
    this.rafId = null;
    this.active = false;
  }

  startInertia(startX, startY, velocityX, velocityY, options = {}, bounds = null) {
    this.stop();
    this.active = true;
    
    let currentX = startX;
    let currentY = startY;
    let vx = velocityX;
    let vy = velocityY;
    
    const friction = options.friction || 0.92;
    const minVelocity = options.minVelocity || 0.02;
    
    const loop = () => {
      if (!this.active) return;
      
      vx *= friction;
      vy *= friction;
      
      currentX += vx;
      currentY += vy;
      
      // If out of bounds, stop inertia and trigger spring back if configured
      if (bounds) {
        let outOfBounds = false;
        if (currentX < bounds.minX) { currentX = bounds.minX; outOfBounds = true; }
        if (currentX > bounds.maxX) { currentX = bounds.maxX; outOfBounds = true; }
        if (currentY < bounds.minY) { currentY = bounds.minY; outOfBounds = true; }
        if (currentY > bounds.maxY) { currentY = bounds.maxY; outOfBounds = true; }
        
        if (outOfBounds) {
          this.onUpdate(currentX, currentY);
          if (options.spring) {
            this.startSpring(currentX, currentY, currentX, currentY, options);
          } else {
            this.stop(true);
          }
          return;
        }
      }
      
      this.onUpdate(currentX, currentY);
      
      if (Math.abs(vx) < minVelocity && Math.abs(vy) < minVelocity) {
        this.stop(true);
      } else {
        this.rafId = requestAnimationFrame(loop);
      }
    };
    
    this.rafId = requestAnimationFrame(loop);
  }

  startSpring(startX, startY, targetX, targetY, options = {}) {
    this.stop();
    this.active = true;
    
    let currentX = startX;
    let currentY = startY;
    let vx = 0;
    let vy = 0;
    
    const stiffness = options.stiffness || 180;
    const damping = options.damping || 18;
    const mass = options.mass || 1;
    let lastTime = performance.now();
    
    const loop = (time) => {
      if (!this.active) return;
      
      const dt = Math.min((time - lastTime) / 1000, 0.05); // cap dt
      lastTime = time;
      
      const fX = -stiffness * (currentX - targetX) - damping * vx;
      const fY = -stiffness * (currentY - targetY) - damping * vy;
      
      const aX = fX / mass;
      const aY = fY / mass;
      
      vx += aX * dt;
      vy += aY * dt;
      
      currentX += vx;
      currentY += vy;
      
      this.onUpdate(currentX, currentY);
      
      const dist = Math.abs(currentX - targetX) + Math.abs(currentY - targetY);
      const vel = Math.abs(vx) + Math.abs(vy);
      
      if (dist < 0.5 && vel < 0.5) {
        this.onUpdate(targetX, targetY);
        this.stop(true);
      } else {
        this.rafId = requestAnimationFrame(loop);
      }
    };
    
    this.rafId = requestAnimationFrame(loop);
  }

  stop(triggerComplete = false) {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.active = false;
    if (triggerComplete && this.onComplete) {
      this.onComplete();
    }
  }
}
