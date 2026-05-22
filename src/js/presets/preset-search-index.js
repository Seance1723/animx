import { getPreset, searchPresets, getPresets } from './preset-registry.js';

export function findPreset(query) {
  const exact = getPreset(query);
  if (exact) return exact;
  const results = searchPresets(query);
  return results.length > 0 ? results : null;
}

export function suggestPreset(query) {
  if (!query) return [];
  
  const q = query.toLowerCase().replace(/[-\s]/g, '');
  const allResults = getPresets();
  
  const scored = allResults.map(preset => {
    let score = 0;
    const name = preset.name.toLowerCase().replace(/[-\s]/g, '');
    
    // Exact match normalized
    if (name === q) score += 100;
    // Includes match
    else if (name.includes(q)) score += 50;
    else if (q.includes(name)) score += 30;
    
    // Tag match
    if (preset.tags && preset.tags.some(t => t.replace(/[-\s]/g, '').includes(q))) {
      score += 20;
    }
    
    return { preset, score };
  }).filter(item => item.score > 0);
  
  scored.sort((a, b) => b.score - a.score);
  
  return scored.slice(0, 5).map(item => item.preset);
}
