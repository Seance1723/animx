/**
 * AnimX Studio Scene Storage (v3.9.0)
 * Handles CRUD and safe JSON import/export for local Timeline Scenes.
 */

import { DEFAULT_SCENE_TEMPLATES } from './studio-scene-schema.js';
import { validateScene } from './studio-scene-validator.js';

const STORAGE_KEY = 'animx_studio_scenes';

export function getSavedScenes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return JSON.parse(JSON.stringify(DEFAULT_SCENE_TEMPLATES));
    return JSON.parse(data);
  } catch (e) {
    console.warn('[AnimX Studio] Failed to read scenes from storage.', e);
    return JSON.parse(JSON.stringify(DEFAULT_SCENE_TEMPLATES));
  }
}

export function saveScene(scene) {
  if (!validateScene(scene).ok) return false;
  scene.updatedAt = new Date().toISOString();
  
  const scenes = getSavedScenes();
  const idx = scenes.findIndex(s => s.sceneId === scene.sceneId);
  if (idx >= 0) {
    scenes[idx] = scene;
  } else {
    scenes.push(scene);
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenes));
    return true;
  } catch (e) {
    console.error('[AnimX Studio] Storage full or inaccessible.', e);
    return false;
  }
}

export function deleteScene(sceneId) {
  const scenes = getSavedScenes().filter(s => s.sceneId !== sceneId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenes));
    return true;
  } catch (e) {
    return false;
  }
}

export function importScene(jsonStr) {
  try {
    // String-level protection against Prototype Pollution and arbitrary scripts
    if (jsonStr.includes('__proto__') || jsonStr.includes('prototype') || jsonStr.includes('constructor') || jsonStr.includes('<script>')) {
      throw new Error("Unsafe keys or scripts detected in JSON string.");
    }

    const parsed = JSON.parse(jsonStr);
    const validation = validateScene(parsed);
    if (!validation.ok) {
      console.warn('[AnimX Studio] Scene validation failed:', validation.errors);
      return { success: false, errors: validation.errors };
    }
    
    saveScene(parsed);
    return { success: true, scene: parsed };
  } catch (e) {
    return { success: false, errors: [e.message] };
  }
}

export function exportSceneJSON(sceneId) {
  const scenes = getSavedScenes();
  const scene = scenes.find(s => s.sceneId === sceneId);
  if (!scene) return null;
  return JSON.stringify(scene, null, 2);
}

export function clearScenes() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}
