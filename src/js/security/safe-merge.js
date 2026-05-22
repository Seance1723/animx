/**
 * Safely merges deeply nested objects without allowing prototype pollution.
 * @param {Object} target 
 * @param {Object} source 
 */
export function safeMerge(target, source) {
  if (!target || typeof target !== 'object') return target;
  if (!source || typeof source !== 'object') return target;

  for (const key of Object.keys(source)) {
    // Prevent Prototype Pollution
    if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
      continue;
    }

    const sourceVal = source[key];
    const targetVal = target[key];

    if (Array.isArray(sourceVal)) {
      // Arrays are copied, not deep merged
      target[key] = [...sourceVal];
    } else if (sourceVal !== null && typeof sourceVal === 'object') {
      if (!targetVal || typeof targetVal !== 'object' || Array.isArray(targetVal)) {
        target[key] = {};
      }
      safeMerge(target[key], sourceVal);
    } else {
      target[key] = sourceVal;
    }
  }

  return target;
}
