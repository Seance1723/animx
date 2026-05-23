/**
 * AnimX Studio Scene Validator (v3.9.0)
 * Secures and validates timeline scene objects.
 */

import { SCENE_SCHEMA_ID } from './studio-scene-schema.js';

export function validateScene(scene) {
  const result = { ok: true, errors: [], warnings: [], suggestions: [], checked: { tracks: 0, steps: 0, presets: 0 } };
  
  if (!scene || typeof scene !== 'object') {
    result.ok = false;
    result.errors.push('Scene is not a valid object');
    return result;
  }
  
  if (scene.schema !== SCENE_SCHEMA_ID) result.errors.push('Missing or invalid schema identifier.');
  if (!scene.sceneId || !/^[a-zA-Z0-9-]+$/.test(scene.sceneId)) result.errors.push('Invalid sceneId.');
  if (!scene.name) result.errors.push('Missing scene name.');
  
  // Strict object check for prototype pollution to be safe internally
  if (Object.prototype.hasOwnProperty.call(scene, '__proto__') || 
      Object.prototype.hasOwnProperty.call(scene, 'constructor') || 
      Object.prototype.hasOwnProperty.call(scene, 'prototype')) {
    result.ok = false;
    result.errors.push('Unsafe keys detected.');
    return result;
  }
  
  if (Array.isArray(scene.tracks)) result.checked.tracks = scene.tracks.length;
  if (Array.isArray(scene.steps)) {
    result.checked.steps = scene.steps.length;
    const stepIds = new Set();
    
    scene.steps.forEach((step, idx) => {
      if (!step.id) result.errors.push(`Step [${idx}] missing id.`);
      else if (stepIds.has(step.id)) result.errors.push(`Duplicate step ID: ${step.id}`);
      stepIds.add(step.id);
      
      if (!step.target) result.errors.push(`Step [${step.id || idx}] missing target.`);
      if (!step.preset && step.type !== 'callback-note' && step.type !== 'wait') {
         result.errors.push(`Step [${step.id || idx}] missing preset.`);
      } else if (step.preset) {
         result.checked.presets++;
      }
      
      if (step.target && (step.target.includes('<script>') || step.target.includes('javascript:'))) {
        result.errors.push(`Step [${step.id}] contains unsafe target selector.`);
      }

      if (step.options && typeof step.options === 'string' && step.options.includes('function')) {
        result.errors.push(`Step [${step.id}] contains unsafe function strings in options.`);
      }
    });
  } else {
    result.errors.push('Steps must be an array.');
  }

  if (result.errors.length > 0) result.ok = false;
  
  // Warnings
  if (scene.trigger === 'scroll' && !scene.scroll) result.warnings.push('Scroll trigger specified but no scroll config found.');
  if (scene.settings && scene.settings.reducedMotionSafe === false) result.warnings.push('Scene is marked as not reduced-motion safe.');

  return result;
}

export function generateSceneReport(scene) {
  const validation = validateScene(scene);
  return {
    status: validation.ok ? 'Pass' : 'Fail',
    trackCount: validation.checked.tracks,
    stepCount: validation.checked.steps,
    errors: validation.errors,
    warnings: validation.warnings
  };
}
