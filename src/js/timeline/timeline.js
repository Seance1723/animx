import { createStep } from './timeline-step.js';
import { parseTimelineOptions, mergeStepOptions } from './timeline-parser.js';
import { buildTimelineGroups } from './timeline-position.js';
import { log } from '../core/utils.js';
import { normalizeSelector } from '../core/selector.js';

let animxInstance = null;
export function bindTimelineAnimX(instance) {
  animxInstance = instance;
}

function dispatchEvent(name, detail) {
  if (typeof document !== 'undefined') {
    const event = new CustomEvent(`animx:${name}`, { detail, bubbles: true });
    document.dispatchEvent(event);
  }
}

export class Timeline {
  constructor(options = {}) {
    this.options = parseTimelineOptions(options);
    this.steps = [];
    this.groups = [];
    
    this.currentGroupIndex = 0;
    this.status = 'idle'; // idle, running, paused, complete, stopped
    this.playbackRate = this.options.timeScale;
    
    this._resolveComplete = null;
    this._rejectComplete = null;
    
    if (this.options.autoplay) {
      // Delay play slightly to allow chaining
      setTimeout(() => this.play(), 0);
    }
  }
  
  add(target, animationInput, stepOptions = {}, position = null) {
    const mergedOpts = mergeStepOptions(this.options.defaults, stepOptions);
    const step = createStep(target, animationInput, mergedOpts, position);
    this.steps.push(step);
    return this; // Chainable
  }
  
  play() {
    if (this.status === 'running') return this;
    if (!animxInstance) {
      log('AnimX: Timeline engine not bound to AnimX core.');
      return this;
    }
    if (this.steps.length === 0) return this;
    
    if (this.status === 'idle' || this.status === 'stopped' || this.status === 'complete') {
      this.groups = buildTimelineGroups(this.steps);
      this.currentGroupIndex = 0;
      
      // Reset statuses
      this.steps.forEach(s => { s.status = 'pending'; s.instance = null; });
      
      this.status = 'running';
      if (this.options.onStart) this.options.onStart(this);
      dispatchEvent('timeline-start', { timeline: this });
      
      // Apply initial delay if any
      if (this.options.delay > 0) {
        setTimeout(() => this._playGroup(this.currentGroupIndex), this.options.delay);
      } else {
        this._playGroup(this.currentGroupIndex);
      }
    } else if (this.status === 'paused') {
      this.resume();
    }
    
    return this;
  }
  
  _playGroup(index) {
    if (this.status !== 'running') return;
    
    if (index >= this.groups.length) {
      this._complete();
      return;
    }
    
    const group = this.groups[index];
    let completedInGroup = 0;
    
    group.forEach(step => {
      const { target, animation, options } = step;
      let targetElements = normalizeSelector(target);
      if (targetElements.length === 0) return Promise.resolve();

      // Normalize stagger if needed
      const mergedOptions = { ...options };
      if (mergedOptions.stagger && typeof mergedOptions.stagger === 'object') {
        Object.assign(mergedOptions, mergedOptions.stagger);
        delete mergedOptions.stagger;
      }
      
      const isText = mergedOptions.type === 'text' || mergedOptions.type === 'typewriter' || mergedOptions.type === 'scramble' || mergedOptions.type === 'counter';
      const isSvg = mergedOptions.type === 'svg';

      step.status = 'running';
      if (this.options.onStepStart) this.options.onStepStart(step, this);
      dispatchEvent('timeline-step-start', { timeline: this, step });

      const runOptions = {
        ...mergedOptions,
        playbackRate: this.playbackRate,
        onComplete: (el) => {
          if (mergedOptions.onComplete) mergedOptions.onComplete(el);
          step.status = 'complete';
          if (this.options.onStepComplete) this.options.onStepComplete(step, this);
          dispatchEvent('timeline-step-complete', { timeline: this, step });
          
          completedInGroup++;
          if (completedInGroup === group.length) {
            // Group finished, move to next
            this.currentGroupIndex++;
            this._playGroup(this.currentGroupIndex);
          }
        },
        onCancel: (el) => {
          if (mergedOptions.onCancel) mergedOptions.onCancel(el);
          step.status = 'cancelled';
        }
      };

      if (isText) {
        step.instance = animxInstance.text(targetElements, runOptions);
      } else if (isSvg) {
        step.instance = animxInstance.svg(targetElements, runOptions);
      } else if (targetElements.length > 1 && mergedOptions.stagger) {
        step.instance = animxInstance.stagger(targetElements, animation, runOptions);
      } else if (mergedOptions.type === 'layout') {
        step.instance = animxInstance.layout(target, runOptions);
      } else {
        step.instance = animxInstance.animate(target, animation, runOptions);
      }
    });
  }
  
  _complete() {
    this.status = 'complete';
    
    if (this.options.onComplete) this.options.onComplete(this);
    dispatchEvent('timeline-complete', { timeline: this });
    
    if (this.options.loop) {
      this.restart();
    } else {
      if (this._resolveComplete) this._resolveComplete(this);
    }
  }
  
  pause() {
    if (this.status !== 'running') return this;
    this.status = 'paused';
    
    if (this.groups[this.currentGroupIndex]) {
      this.groups[this.currentGroupIndex].forEach(step => {
        if (step.instance && typeof step.instance.pause === 'function') {
          step.instance.pause();
        }
      });
    }
    return this;
  }
  
  resume() {
    if (this.status !== 'paused') return this;
    this.status = 'running';
    
    if (this.groups[this.currentGroupIndex]) {
      this.groups[this.currentGroupIndex].forEach(step => {
        if (step.instance && typeof step.type === 'function') {
          // Function step
          step.target();
        } else if (step.type === 'layout') {
          // Layout step
          if (animxInstance && animxInstance.layout) {
            animxInstance.layout(step.target, { ...step.options });
          }
        } else if (step.instance && typeof step.instance.resume === 'function') {
          step.instance.resume();
        } else if (step.instance && typeof step.instance.play === 'function') {
          step.instance.play();
        }
      });
    }
    return this;
  }
  
  stop() {
    if (this.status === 'stopped' || this.status === 'idle') return this;
    this.status = 'stopped';
    
    if (this.groups[this.currentGroupIndex]) {
      this.groups[this.currentGroupIndex].forEach(step => {
        if (step.instance && typeof step.instance.stop === 'function') {
          step.instance.stop();
        }
      });
    }
    
    if (this.options.onCancel) this.options.onCancel(this);
    dispatchEvent('timeline-cancel', { timeline: this });
    
    return this;
  }
  
  restart() {
    this.stop();
    this.status = 'idle';
    this.play();
    return this;
  }
  
  reverse() {
    // For v0.5.0, keep safe: if instances support reverse, use it.
    if (this.status === 'running' || this.status === 'paused') {
      if (this.groups[this.currentGroupIndex]) {
        this.groups[this.currentGroupIndex].forEach(step => {
          if (step.instance && typeof step.instance.reverse === 'function') {
            step.instance.reverse();
          }
        });
      }
    }
    return this;
  }
  
  seek(position) {
    // Basic seek implementation
    if (typeof position === 'number' && position >= 0 && position <= 1) {
      this.progress(position);
    }
    return this;
  }
  
  progress(value) {
    if (value !== undefined) {
      // Basic progress setting for currently running group
      if (this.groups[this.currentGroupIndex]) {
        this.groups[this.currentGroupIndex].forEach(step => {
          if (step.instance && typeof step.instance.progress === 'function') {
            step.instance.progress(value);
          }
        });
      }
      return this;
    }
    
    // Return basic progress estimate
    if (this.steps.length === 0) return 0;
    if (this.status === 'complete') return 1;
    if (this.status === 'idle' || this.status === 'stopped') return 0;
    return this.currentGroupIndex / this.groups.length;
  }
  
  timeScale(value) {
    if (value !== undefined) {
      this.playbackRate = Math.max(0.1, Math.min(5, value));
      if (this.status === 'running' || this.status === 'paused') {
        if (this.groups[this.currentGroupIndex]) {
          this.groups[this.currentGroupIndex].forEach(step => {
            if (step.instance && typeof step.instance.setPlaybackRate === 'function') {
              step.instance.setPlaybackRate(this.playbackRate);
            }
          });
        }
      }
      return this;
    }
    return this.playbackRate;
  }
  
  clear() {
    this.stop();
    this.steps = [];
    this.groups = [];
    this.currentGroupIndex = 0;
    return this;
  }
  
  destroy() {
    this.stop();
    if (this.groups) {
      this.groups.forEach(group => {
        group.forEach(step => {
          if (step.instance && typeof step.instance.destroy === 'function') {
            step.instance.destroy();
          }
        });
      });
    }
    this.steps = [];
    this.groups = [];
    this.currentGroupIndex = 0;
    this.status = 'destroyed';
  }
  
  isRunning() {
    return this.status === 'running';
  }
  
  isPaused() {
    return this.status === 'paused';
  }
  
  getDuration() {
    // Basic estimation: sum of durations of all groups
    if (this.groups.length === 0) {
      const tempGroups = buildTimelineGroups(this.steps);
      return this._estimateGroupsDuration(tempGroups);
    }
    return this._estimateGroupsDuration(this.groups);
  }
  
  _estimateGroupsDuration(groups) {
    let total = 0;
    groups.forEach(group => {
      let maxGroupDur = 0;
      group.forEach(step => {
        const dur = (step.options.duration || 420) + (step.options.delay || 0);
        if (dur > maxGroupDur) maxGroupDur = dur;
      });
      total += maxGroupDur;
    });
    return total;
  }
  
  getSteps() {
    return [...this.steps];
  }
}
