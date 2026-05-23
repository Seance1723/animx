import { registerPack, getPack, getPacks, getPackCatalog, destroyPacks } from './pack-registry.js';
import { validatePack } from './pack-validator.js';
import { auditPack } from './pack-security-audit.js';
import { importPack } from './pack-importer.js';
import { exportPack } from './pack-exporter.js';
import { checkPackCompatibility } from './pack-compatibility-checker.js';
import { initDefaultPacks } from './default-packs.js';

export function packs() {
  return getPacks();
}

export function bindPacksApi(animx) {
  initDefaultPacks();
}

export {
  registerPack,
  getPack,
  getPacks,
  getPackCatalog,
  destroyPacks,
  validatePack,
  auditPack,
  importPack,
  exportPack,
  checkPackCompatibility
};
