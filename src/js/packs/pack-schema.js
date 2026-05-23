export const packManifestSchema = {
  $id: "animx-pack-manifest",
  type: "object",
  required: ["schema", "schemaVersion", "animxVersion", "id", "name", "version", "type"],
  properties: {
    schema: { type: "string", pattern: "^animx-pack-manifest$" },
    schemaVersion: { type: "string" },
    animxVersion: { type: "string" },
    id: { type: "string", pattern: "^[a-z0-9-]+$" },
    name: { type: "string" },
    version: { type: "string" },
    description: { type: "string" },
    type: { type: "string", enum: ["preset-pack", "variant-pack", "recipe-pack", "pattern-pack", "industry-pack", "cms-pack", "studio-pack", "theme-kit-pack", "motion-token-pack", "mixed-pack"] },
    category: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    tier: { type: "string", enum: ["free", "pro", "premium", "internal"] },
    author: {
      type: "object",
      properties: { name: { type: "string" }, url: { type: "string" }, email: { type: "string" } }
    },
    license: {
      type: "object",
      properties: { type: { type: "string" }, text: { type: "string" }, url: { type: "string" } }
    },
    compatibility: {
      type: "object",
      properties: { animx: { type: "string" }, core: { type: "boolean" }, studio: { type: "boolean" }, requires: { type: "array" } }
    },
    contents: {
      type: "object",
      properties: {
        presets: { type: "array" },
        variants: { type: "array" },
        recipes: { type: "array" },
        patterns: { type: "array" },
        scenes: { type: "array" },
        storyPacks: { type: "array" },
        cmsRecipes: { type: "array" },
        themeKits: { type: "array" },
        motionTokens: { type: "array" },
        examples: { type: "array" }
      }
    },
    exports: { type: "object" },
    docs: { type: "object" },
    preview: { type: "object" },
    quality: { type: "object" }
  }
};
