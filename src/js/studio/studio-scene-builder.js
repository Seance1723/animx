/**
 * AnimX Studio Scene Builder Core UI Controller (v3.9.0)
 * Wires the internal logic to the HTML panels.
 */

import { getSavedScenes, importScene, clearScenes, exportSceneJSON, saveScene } from './studio-scene-storage.js';
import { generateSceneReport } from './studio-scene-validator.js';
import { playScenePreview, stopScenePreview } from './studio-scene-preview.js';
import { exportSceneToJS, exportSceneToHTML } from './studio-scene-export.js';
import { createEmptyScene } from './studio-scene-schema.js';

let currentScene = null;

export function loadScenesUI() {
  const scenes = getSavedScenes();
  const list = document.getElementById('scene-list');
  if (!list) return;
  
  list.innerHTML = scenes.map(s => `
    <div style="border: 1px solid #ccc; padding: 1rem; border-radius: 6px; cursor: pointer;" onclick="AnimXStudio.selectScene('${s.sceneId}')">
      <h3 style="margin-top:0;">${s.name}</h3>
      <p style="color:#666; font-size:0.9rem;">Trigger: ${s.trigger}</p>
      <p><strong>Tracks:</strong> ${s.tracks?.length || 0} | <strong>Steps:</strong> ${s.steps?.length || 0}</p>
    </div>
  `).join('');
}

export function selectScene(sceneId) {
  const scenes = getSavedScenes();
  currentScene = scenes.find(s => s.sceneId === sceneId);
  if (!currentScene) return;
  
  renderTrackEditor();
  renderStepEditor();
  renderExportPanel();
  renderValidationPanel();
}

export function renderTrackEditor() {
  const container = document.getElementById('scene-tracks-container');
  if (!container || !currentScene) return;
  
  container.innerHTML = currentScene.tracks.map(t => `
    <div style="background:#f1f5f9; padding: 0.5rem; margin-bottom: 0.5rem; border-left: 4px solid ${t.color};">
      <strong>${t.name}</strong> [${t.type}]
    </div>
  `).join('');
}

export function renderStepEditor() {
  const container = document.getElementById('scene-steps-container');
  if (!container || !currentScene) return;
  
  container.innerHTML = currentScene.steps.map(s => `
    <div style="border: 1px solid #cbd5e1; padding: 0.5rem; margin-bottom: 0.5rem;">
      <strong>Target:</strong> ${s.target} | <strong>Preset:</strong> ${s.preset} | <strong>Pos:</strong> ${s.position}
    </div>
  `).join('');
}

export function renderExportPanel() {
  if (!currentScene) return;
  const js = exportSceneToJS(currentScene);
  const html = exportSceneToHTML(currentScene);
  
  const el = document.getElementById('scene-export-preview');
  if (el) el.innerText = js + "\n\n" + html;
}

export function renderValidationPanel() {
  if (!currentScene) return;
  const report = generateSceneReport(currentScene);
  
  const el = document.getElementById('scene-report-container');
  if (el) {
    el.innerHTML = `
      <p><strong>Status:</strong> ${report.status}</p>
      <p><strong>Errors:</strong> ${report.errors.length}</p>
      <p><strong>Warnings:</strong> ${report.warnings.length}</p>
    `;
  }
}

export function createNewScene() {
  currentScene = createEmptyScene();
  saveScene(currentScene);
  loadScenesUI();
  selectScene(currentScene.sceneId);
}

export function uiPlayScene() {
  if (currentScene) playScenePreview(currentScene);
}

export function uiStopScene() {
  stopScenePreview();
}
