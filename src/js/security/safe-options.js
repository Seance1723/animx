export function sanitizeOptions(options = {}) {
  if (!options || typeof options !== 'object') return {};
  
  const clean = {};
  
  for (const key of Object.keys(options)) {
    if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
      continue; // Block unsafe keys explicitly
    }
    
    clean[key] = options[key];
  }
  
  return clean;
}
