export function isSafeKey(key) {
  if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
    return false;
  }
  return true;
}

export function safeMerge(target, source) {
  if (typeof target !== 'object' || typeof source !== 'object') return target;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) && isSafeKey(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        target[key] = safeMerge(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
