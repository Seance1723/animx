import { log } from '../core/utils.js';

const registry = new Map();

export function registerPreset(name, config) {
  if (!name || typeof name !== 'string') return;
  
  // Ensure basic metadata exists
  const preset = {
    name,
    className: config.className || `ax-${name}`,
    type: config.type || 'css',
    category: config.category || 'core',
    family: config.family || 'general',
    tags: config.tags || [name],
    description: config.description || '',
    ...config
  };

  registry.set(name, preset);
  log(`Preset registered: ${name}`);
}

export function getPreset(name) {
  if (!registry.has(name)) {
    log(`Preset not found: ${name}`);
    return null;
  }
  return registry.get(name);
}

export function getPresets() {
  return Array.from(registry.values());
}

export function getPresetsByCategory(category) {
  return Array.from(registry.values()).filter(p => p.category === category);
}

export function searchPresets(query) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  
  return Array.from(registry.values()).filter(p => {
    const nameMatch = p.name.toLowerCase().includes(lowerQuery);
    const categoryMatch = p.category.toLowerCase().includes(lowerQuery);
    const familyMatch = p.family.toLowerCase().includes(lowerQuery);
    const descMatch = p.description.toLowerCase().includes(lowerQuery);
    const tagMatch = p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const compMatch = p.component && p.component.toLowerCase().includes(lowerQuery);
    
    return nameMatch || categoryMatch || familyMatch || descMatch || tagMatch || compMatch;
  });
}

export function getPresetTags() {
  const tags = new Set();
  for (const preset of registry.values()) {
    if (preset.tags) preset.tags.forEach(t => tags.add(t));
  }
  return Array.from(tags).sort();
}

export function getComponentPresets() {
  const components = {};
  for (const preset of registry.values()) {
    if (preset.type === 'component') {
      const comp = preset.component || 'other';
      if (!components[comp]) components[comp] = [];
      components[comp].push(preset.name);
    }
  }
  return components;
}

export function getPresetCategories() {
  const categories = new Set();
  for (const preset of registry.values()) {
    if (preset.category) categories.add(preset.category);
  }
  return Array.from(categories).sort();
}
