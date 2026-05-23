/**
 * AnimX Studio Preset Pack Manager (v3.26.0)
 * Handles CRUD, validation, import/export for local custom preset packs.
 * Local-only, zero-dependency.
 */

const STORAGE_KEY = 'animx-studio-preset-packs';
let memoryStore = {};

const DEFAULT_PACKS = [
  {
    schema: "animx-preset-pack",
    schemaVersion: "1.0",
    animxVersion: "3.26.0",
    packId: "premium-saas-pack",
    name: "Premium SaaS Motion Pack",
    description: "Reusable polished motion presets for SaaS landing pages",
    category: "saas",
    tags: ["saas", "premium", "landing"],
    presets: [
      {
        name: "saas-hero-reveal",
        type: "text",
        category: "hero",
        element: "text",
        base: "text-mask-up",
        description: "Smooth hero title reveal",
        tags: ["hero"],
        options: { split: "lines", stagger: 80, duration: 800, ease: "smooth" },
        dataAttributes: { "data-ax": "text-mask-up", "data-ax-text": "lines", "data-ax-stagger": "80" },
        reducedMotion: "final-state"
      }
    ],
    recipes: [],
    tokens: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function getPresetPacks() {
  try {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    }
  } catch (err) {
    console.warn('[AnimX Studio] Falling back to memory storage. ' + err.message);
    if (memoryStore[STORAGE_KEY]) {
      return JSON.parse(memoryStore[STORAGE_KEY]);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_PACKS));
}

export function savePresetPack(pack) {
  if (!validatePresetPack(pack).ok) return false;
  pack.updatedAt = new Date().toISOString();
  
  const packs = getPresetPacks();
  const idx = packs.findIndex(p => p.packId === pack.packId);
  if (idx >= 0) {
    packs[idx] = pack;
  } else {
    packs.push(pack);
  }
  
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packs));
    } else {
      memoryStore[STORAGE_KEY] = JSON.stringify(packs);
    }
    return true;
  } catch (e) {
    console.error('[AnimX Studio] Storage full or inaccessible. Using memory store.', e);
    memoryStore[STORAGE_KEY] = JSON.stringify(packs);
    return true;
  }
}

export function deletePresetPack(packId) {
  const packs = getPresetPacks().filter(p => p.packId !== packId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packs));
    return true;
  } catch (e) {
    return false;
  }
}

export function validatePresetPack(pack) {
  const result = { ok: true, errors: [], warnings: [], checked: { presets: 0, recipes: 0 } };
  
  if (!pack || typeof pack !== 'object') {
    result.ok = false;
    result.errors.push('Pack is not a valid object');
    return result;
  }
  
  if (pack.schema !== 'animx-preset-pack') result.errors.push('Missing or invalid schema identifier.');
  if (!pack.packId || !/^[a-z0-9-]+$/.test(pack.packId)) result.errors.push('Invalid packId. Must be lowercase alphanumeric with hyphens.');
  if (!pack.name) result.errors.push('Missing pack name.');
  
  // Prototype pollution check
  if (Object.prototype.hasOwnProperty.call(pack, '__proto__') || 
      Object.prototype.hasOwnProperty.call(pack, 'constructor') || 
      Object.prototype.hasOwnProperty.call(pack, 'prototype')) {
    result.ok = false;
    result.errors.push('Unsafe keys detected.');
    return result;
  }
  
  if (Array.isArray(pack.presets)) {
    result.checked.presets = pack.presets.length;
    const names = new Set();
    pack.presets.forEach((p, idx) => {
      if (!p.name || !/^[a-z0-9-]+$/.test(p.name)) result.errors.push(`Preset [${idx}] has invalid name.`);
      if (names.has(p.name)) result.errors.push(`Duplicate preset name: ${p.name}`);
      names.add(p.name);
      
      // Basic primitive safety check
      if (p.options && typeof p.options === 'string' && p.options.includes('function')) {
        result.errors.push(`Preset ${p.name} contains function strings.`);
      }
    });
  } else {
    result.errors.push('Presets must be an array.');
  }

  if (result.errors.length > 0) result.ok = false;
  return result;
}

export function importPresetPack(jsonStr) {
  try {
    const parsed = JSON.parse(jsonStr);
    
    // Defensive check
    if (jsonStr.includes('__proto__') || jsonStr.includes('prototype')) {
      throw new Error("Unsafe keys detected in JSON string.");
    }

    const validation = validatePresetPack(parsed);
    if (!validation.ok) {
      console.warn('[AnimX Studio] Pack validation failed:', validation.errors);
      return { success: false, errors: validation.errors };
    }
    
    savePresetPack(parsed);
    return { success: true, pack: parsed };
  } catch (e) {
    return { success: false, errors: [e.message] };
  }
}

export function exportPresetPack(packId) {
  const packs = getPresetPacks();
  const pack = packs.find(p => p.packId === packId);
  if (!pack) return null;
  
  return JSON.stringify(pack, null, 2);
}

export function clearPresetPacks() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}
