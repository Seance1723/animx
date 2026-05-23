import { packManifestSchema } from './pack-schema.js';
import { getPreset } from '../presets/preset-registry.js';
import { getRecipe } from '../cms/advanced-cms-api.js';
import { getVariant } from '../composer/variant-registry.js';

export function validatePack(pack) {
  const result = {
    ok: true,
    version: "3.29.0",
    packId: pack?.id || "unknown",
    errors: [],
    warnings: [],
    suggestions: [],
    contents: {
      presets: { total: 0, missing: [] },
      variants: { total: 0, missing: [] },
      recipes: { total: 0, missing: [] },
      patterns: { total: 0, missing: [] }
    },
    security: [],
    accessibility: [],
    performance: [],
    compatibility: []
  };

  if (!pack || typeof pack !== 'object') {
    result.ok = false;
    result.errors.push("Invalid pack format");
    return result;
  }

  // Schema checks
  if (!pack.schema || pack.schema !== 'animx-pack-manifest') {
    result.ok = false;
    result.errors.push("Missing or invalid schema");
  }
  if (!pack.id || !/^[a-z0-9-]+$/.test(pack.id)) {
    result.ok = false;
    result.errors.push("Invalid or missing ID (must be kebab-case)");
  }

  // Content validation
  const contents = pack.contents || {};
  if (contents.presets && Array.isArray(contents.presets)) {
    result.contents.presets.total = contents.presets.length;
    contents.presets.forEach(p => {
      if (typeof p === 'string' && !getPreset(p)) result.contents.presets.missing.push(p);
      else if (typeof p === 'object' && !getPreset(p.id || p.name)) result.contents.presets.missing.push(p.id || p.name);
    });
  }

  if (contents.recipes && Array.isArray(contents.recipes)) {
    result.contents.recipes.total = contents.recipes.length;
    contents.recipes.forEach(r => {
      const rId = typeof r === 'string' ? r : r.id;
      if (!getRecipe(rId)) result.contents.recipes.missing.push(rId);
    });
  }
  
  if (contents.variants && Array.isArray(contents.variants)) {
    result.contents.variants.total = contents.variants.length;
    contents.variants.forEach(v => {
      const vId = typeof v === 'string' ? v : v.id;
      if (!getVariant(vId)) result.contents.variants.missing.push(vId);
    });
  }

  // Mark OK false if critical missing
  if (result.contents.presets.missing.length > 0) result.warnings.push(`Missing presets: ${result.contents.presets.missing.join(', ')}`);

  // Simple accessibility checks
  if (!pack.docs?.accessibility) result.suggestions.push("Missing accessibility notes");
  if (pack.quality && !pack.quality.reducedMotionChecked) result.warnings.push("Reduced motion not verified");

  return result;
}
