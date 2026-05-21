import { normalizeSelector } from '../core/selector.js';
import { getPreset } from '../presets/preset-registry.js';
import { dispatchComponentEvent } from './component-utils.js';
import { getConfig } from '../core/config.js';

let coreInstance = null;

export function bindComponentAnimX(instance) {
  coreInstance = instance;
}

export function component(selector, presetName, options = {}) {
  const elements = normalizeSelector(selector);
  const preset = getPreset(presetName);
  
  const createEmptyInstance = () => ({
    elements: [],
    preset: presetName,
    enable: () => {},
    disable: () => {},
    play: () => {},
    pause: () => {},
    resume: () => {},
    stop: () => {},
    replay: () => {},
    reset: () => {},
    destroy: () => {},
    isEnabled: () => false,
    isRunning: () => false
  });

  if (elements.length === 0) {
    if (getConfig().debug) {
      console.warn(`AnimX.component: No targets found for selector`, selector);
    }
    return createEmptyInstance();
  }

  if (!preset || preset.type !== 'component') {
    if (getConfig().debug) {
      console.warn(`AnimX.component: Preset '${presetName}' not found.`);
    }
    elements.forEach(el => dispatchComponentEvent(el, 'error', { presetName, error: 'Preset not found' }));
    return createEmptyInstance();
  }
  
  const instances = elements.map(el => runComponentPreset(el, preset, options)).filter(Boolean);
  return instances.length === 1 ? instances[0] : instances;
}

function runComponentPreset(element, preset, options) {
  if (!coreInstance) return null;
  
  dispatchComponentEvent(element, 'start', { preset, options });
  
  let underlyingInstance = null;
  
  // Route to the proper physics engine based on behavior
  switch (preset.behavior) {
    case 'hover':
      underlyingInstance = coreInstance.hover(element, preset.className, options);
      break;
    case 'ripple':
      // The ripple engine expects options like color/duration
      underlyingInstance = coreInstance.ripple(element, options);
      // We might also attach the class if the ripple preset has specific styles
      if (preset.className) element.classList.add(preset.className);
      break;
    case 'magnetic':
      underlyingInstance = coreInstance.magnetic(element, options);
      if (preset.className) element.classList.add(preset.className);
      break;
    case 'tilt':
      underlyingInstance = coreInstance.tilt(element, options);
      if (preset.className) element.classList.add(preset.className);
      break;
    case 'press':
      underlyingInstance = coreInstance.press(element, preset.className, options);
      break;
    case 'focus':
      underlyingInstance = coreInstance.focus(element, preset.className, options);
      break;
    case 'feedback':
      // Extract the feedback type from the name (e.g. error-shake -> error)
      let type = 'info';
      if (preset.name.includes('error')) type = 'error';
      else if (preset.name.includes('success')) type = 'success';
      else if (preset.name.includes('warning')) type = 'warning';
      
      underlyingInstance = coreInstance.feedback(element, type, options);
      break;
    case 'css':
    default:
      // A standard WAAPI CSS preset run
      underlyingInstance = coreInstance.animate(element, preset.name, options);
      break;
  }
  
  dispatchComponentEvent(element, 'ready', { preset, instance: underlyingInstance });
  
  // Wrap the instance to provide a unified component interface
  return {
    elements: [element],
    preset: preset.name,
    enable: () => {
      if (underlyingInstance && underlyingInstance.enable) underlyingInstance.enable();
      dispatchComponentEvent(element, 'enable', { preset });
    },
    disable: () => {
      if (underlyingInstance && underlyingInstance.disable) underlyingInstance.disable();
      dispatchComponentEvent(element, 'disable', { preset });
    },
    play: () => {
      if (underlyingInstance && underlyingInstance.play) underlyingInstance.play();
    },
    pause: () => {
      if (underlyingInstance && underlyingInstance.pause) underlyingInstance.pause();
    },
    resume: () => {
      if (underlyingInstance && underlyingInstance.resume) underlyingInstance.resume();
      else if (underlyingInstance && underlyingInstance.play) underlyingInstance.play();
    },
    stop: () => {
      if (underlyingInstance && underlyingInstance.stop) underlyingInstance.stop();
    },
    replay: () => {
      if (underlyingInstance && underlyingInstance.replay) underlyingInstance.replay();
    },
    reset: () => {
      if (underlyingInstance && underlyingInstance.reset) underlyingInstance.reset();
    },
    destroy: () => {
      if (underlyingInstance && underlyingInstance.destroy) underlyingInstance.destroy();
      if (preset.className) element.classList.remove(preset.className);
      dispatchComponentEvent(element, 'destroy', { preset });
    },
    isEnabled: () => {
      if (underlyingInstance && underlyingInstance.isEnabled) return underlyingInstance.isEnabled();
      return true;
    },
    isRunning: () => {
      if (underlyingInstance && underlyingInstance.isRunning) return underlyingInstance.isRunning();
      return false;
    }
  };
}
