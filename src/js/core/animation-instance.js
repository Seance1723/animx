export class AnimationInstance {
  constructor(elements, driverGroup) {
    this.elements = Array.isArray(elements) ? elements : [elements];
    this.drivers = Array.isArray(driverGroup) ? driverGroup : [driverGroup];
    this._status = 'idle'; // idle, running, paused, finished, cancelled, destroyed
  }

  play() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.play && d.play());
    this._status = 'running';
    return this;
  }

  resume() {
    return this.play();
  }

  pause() {
    if (this._status === 'destroyed' || this._status === 'finished') return this;
    this.drivers.forEach(d => d.pause && d.pause());
    this._status = 'paused';
    return this;
  }

  stop() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.stop && d.stop());
    this._status = 'stopped';
    return this;
  }

  cancel() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.cancel && d.cancel());
    this._status = 'cancelled';
    return this;
  }

  finish() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.finish && d.finish());
    this._status = 'finished';
    return this;
  }

  reverse() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.reverse && d.reverse());
    this._status = 'running';
    return this;
  }

  replay() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.replay && d.replay());
    this._status = 'running';
    return this;
  }

  reset() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.reset && d.reset());
    this._status = 'idle';
    return this;
  }

  destroy() {
    if (this._status === 'destroyed') return this;
    this.drivers.forEach(d => d.destroy && d.destroy());
    this._status = 'destroyed';
    this.elements = [];
    this.drivers = [];
    return this;
  }

  isRunning() {
    return this._status === 'running';
  }
  
  setStatus(status) {
    if (this._status !== 'destroyed') {
      this._status = status;
    }
  }
}
