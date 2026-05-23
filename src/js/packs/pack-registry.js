const _packs = new Map();

export function registerPack(packManifest) {
  if (!packManifest || !packManifest.id) return false;
  _packs.set(packManifest.id, packManifest);
  return true;
}

export function getPack(id) {
  return _packs.get(id);
}

export function getPacks() {
  return Array.from(_packs.values());
}

export function getPackCatalog() {
  return {
    version: "3.29.0",
    generatedAt: new Date().toISOString(),
    packs: getPacks().map(p => ({
      id: p.id,
      name: p.name,
      category: p.category || "all-purpose",
      type: p.type || "mixed-pack",
      version: p.version || "1.0.0",
      items: Object.values(p.contents || {}).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0),
      status: p.quality?.validated ? "ready" : "needs-review",
      tags: p.tags || [],
      description: p.description || ""
    }))
  };
}

export function destroyPacks() {
  _packs.clear();
}
