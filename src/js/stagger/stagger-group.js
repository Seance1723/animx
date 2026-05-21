function dispatchEvent(element, name, detail) {
  if (typeof document !== 'undefined') {
    const event = new CustomEvent(`animx:${name}`, { detail, bubbles: true });
    (element || document).dispatchEvent(event);
  }
}

export class StaggerGroup {
  constructor(elements, staggerOpts, animationInput, options = {}) {
    this.elements = Array.from(elements);
    this.staggerOpts = staggerOpts;
    this.animation = animationInput;
    this.options = options;
    
    this.instances = [];
    this.status = 'idle'; // idle, running, paused, complete, cancelled
    
    this.groupElement = this.options.groupElement || null;
  }
  
  _dispatch(name, detail = {}) {
    dispatchEvent(this.groupElement || (this.elements.length ? this.elements[0] : null), name, {
      group: this,
      ...detail
    });
  }
  
  addInstance(instance) {
    this.instances.push(instance);
  }
  
  play() {
    if (this.status === 'running') return this;
    if (this.status === 'idle' || this.status === 'complete' || this.status === 'cancelled') {
      this.status = 'running';
      if (this.groupElement) this.groupElement.classList.remove('ax-stagger-ready');
      if (this.groupElement) this.groupElement.classList.add('ax-stagger-running');
      
      if (this.staggerOpts.onStart) this.staggerOpts.onStart(this);
      this._dispatch('stagger-start');
      
      this.instances.forEach(inst => inst.play());
    } else if (this.status === 'paused') {
      this.resume();
    }
    return this;
  }
  
  pause() {
    if (this.status !== 'running') return this;
    this.status = 'paused';
    this.instances.forEach(inst => {
      if (typeof inst.pause === 'function') inst.pause();
    });
    return this;
  }
  
  resume() {
    if (this.status !== 'paused') return this;
    this.status = 'running';
    this.instances.forEach(inst => {
      if (typeof inst.resume === 'function') inst.resume();
      else if (typeof inst.play === 'function') inst.play();
    });
    return this;
  }
  
  stop() {
    this.status = 'stopped';
    this.instances.forEach(inst => {
      if (typeof inst.stop === 'function') inst.stop();
    });
    if (this.groupElement) this.groupElement.classList.remove('ax-stagger-running');
    return this;
  }
  
  cancel() {
    this.status = 'cancelled';
    this.instances.forEach(inst => {
      if (typeof inst.cancel === 'function') inst.cancel();
    });
    
    if (this.groupElement) this.groupElement.classList.remove('ax-stagger-running');
    
    if (this.staggerOpts.onCancel) this.staggerOpts.onCancel(this);
    this._dispatch('stagger-cancel');
    return this;
  }
  
  replay() {
    this.cancel();
    this.status = 'idle';
    this.play();
    return this;
  }
  
  reset() {
    this.status = 'idle';
    this.instances.forEach(inst => {
      if (typeof inst.reset === 'function') inst.reset();
    });
    if (this.groupElement) {
      this.groupElement.classList.remove('ax-stagger-running', 'ax-stagger-complete');
    }
    return this;
  }
  
  destroy() {
    this.instances.forEach(inst => {
      if (typeof inst.destroy === 'function') inst.destroy();
    });
    this.instances = [];
    this.elements = [];
    this.status = 'destroyed';
  }
  
  isRunning() {
    return this.status === 'running';
  }
  
  getProgress() {
    if (this.instances.length === 0) return 0;
    
    let totalProgress = 0;
    this.instances.forEach(inst => {
      if (typeof inst.getProgress === 'function') {
        totalProgress += inst.getProgress();
      }
    });
    
    return totalProgress / this.instances.length;
  }
  
  checkComplete() {
    // Let anim instances handle their own state, we just check if all are complete
    // Actually, stagger manages this internally when creating instances
  }
}
