import { getPack } from './pack-registry.js';
import { getPreset } from '../presets/preset-registry.js';
import { getRecipe } from '../cms/advanced-cms-api.js';

export function exportPack(packId, options = { includeDocs: true, includeExamples: true, format: "json" }) {
  const pack = getPack(packId);
  if (!pack) return null;

  // Clone pack
  const exportPayload = JSON.parse(JSON.stringify(pack));

  // We could theoretically inject the actual preset configurations here if the 
  // pack type is "standalone", but for marketplace distribution we just 
  // distribute the metadata references and let AnimX resolve them.
  
  if (options.includeDocs && !exportPayload.docs) {
    exportPayload.docs = {
      readme: `# ${pack.name}\n\n${pack.description}`,
      usage: "Import via AnimX.importPack() or use the Local Pack Manager."
    };
  }

  if (options.format === 'json') {
    return JSON.stringify(exportPayload, null, 2);
  }

  return exportPayload;
}
