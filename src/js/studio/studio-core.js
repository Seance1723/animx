import { loadState, subscribe } from './studio-state.js';
import { initCanvas } from './studio-canvas.js';
import { initPresets } from './studio-presets.js';
import { initControls } from './studio-controls.js';
import { runPreview } from './studio-preview.js';
import { initAudit } from './studio-audit.js';
import { exportStudioJson, importStudioJson } from './studio-template-json.js';
import { initStudioProjects } from './studio-projects.js';
import { sanitizeImportedHtml } from './studio-import-safety.js';
import { scanDomStructure } from './studio-dom-scanner.js';
import { generateSmartSuggestions } from './studio-smart-suggestions.js';
import { generateScanReport } from './studio-scan-report.js';
import { getThemeKit, getAllThemeKits } from './studio-theme-kits.js';
import { applyThemeToProject } from './studio-motion-tokens.js';
import { buildProjectPackage, downloadPackageFile } from './studio-package-builder.js';
import { validatePackage } from './studio-package-validator.js';
import { runFullProjectQa } from './studio-qa-runner.js';
import { runReleaseAssistant } from './studio-release-assistant.js';
import { draftReleaseNotes } from './studio-release-notes.js';
import { getCreativeEffects, getCreativeFamilies } from '../creative/creative-catalog.js';
import { 
  generateClientMotionGuide, 
  generateDeveloperGuide, 
  generateCMSGuide, 
  generateWordPressGuide, 
  generateWebflowGuide,
  generateDeploymentChecklist,
  escapeHtml
} from './studio-handoff.js';
import { generateAnimationMap, generatePresetInventory, generateDeliveryKit } from './studio-delivery.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure core AnimX is available
  if (!window.AnimX) {
    console.error('[AnimX Studio] Core AnimX library not found. Studio cannot run.');
    return;
  }
  
  console.log('[AnimX Studio] Initializing v3.2.0 Visual Builder...');
  
  // Init Project System
  initStudioProjects();
  
  // Expose Scanner APIs for UI
  window.AnimXStudio.sanitizeImportedHtml = sanitizeImportedHtml;
  window.AnimXStudio.scanDomStructure = scanDomStructure;
  window.AnimXStudio.generateSmartSuggestions = generateSmartSuggestions;
  window.AnimXStudio.generateScanReport = generateScanReport;
  
  // Expose Theme and Package APIs for UI
  window.AnimXStudio.getThemeKit = getThemeKit;
  window.AnimXStudio.getAllThemeKits = getAllThemeKits;
  window.AnimXStudio.applyThemeToProject = applyThemeToProject;
  window.AnimXStudio.buildProjectPackage = buildProjectPackage;
  window.AnimXStudio.downloadPackageFile = downloadPackageFile;
  window.AnimXStudio.validatePackage = validatePackage;
  
  // Expose QA and Release APIs for UI
  window.AnimXStudio.runFullProjectQa = runFullProjectQa;
  window.AnimXStudio.runReleaseAssistant = runReleaseAssistant;
  window.AnimXStudio.draftReleaseNotes = draftReleaseNotes;
  
  // Expose Creative Catalog
  window.AnimXStudio.getCreativeEffects = getCreativeEffects;
  window.AnimXStudio.getCreativeFamilies = getCreativeFamilies;

  // Expose Handoff & Delivery APIs
  window.AnimXStudio.generateClientMotionGuide = generateClientMotionGuide;
  window.AnimXStudio.generateDeveloperGuide = generateDeveloperGuide;
  window.AnimXStudio.generateCMSGuide = generateCMSGuide;
  window.AnimXStudio.generateWordPressGuide = generateWordPressGuide;
  window.AnimXStudio.generateWebflowGuide = generateWebflowGuide;
  window.AnimXStudio.generateDeploymentChecklist = generateDeploymentChecklist;
  window.AnimXStudio.generateAnimationMap = generateAnimationMap;
  window.AnimXStudio.generatePresetInventory = generatePresetInventory;
  window.AnimXStudio.generateDeliveryKit = generateDeliveryKit;
  window.AnimXStudio.escapeHtml = escapeHtml;
  
  // Load state from localStorage
  const state = loadState();
  window._studioCurrentState = state;
  
  // Initialize panels
  initCanvas(state);
  initPresets(state);
  const syncControls = initControls(state);
  initExport(state);
  initAudit();
  
  // Buttons
  document.getElementById('btn-play').onclick = () => runPreview(window._studioCurrentState);
  document.getElementById('btn-reset').onclick = () => {
    // Reset canvas by reloading current template
    initCanvas(window._studioCurrentState);
  };
  
  // Reduced Motion toggle
  document.getElementById('btn-reduced-motion').onclick = (e) => {
    const btn = e.target;
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      window.AnimX.setReducedMotion('never');
      btn.style.background = '';
    } else {
      btn.classList.add('active');
      window.AnimX.setReducedMotion('always');
      btn.style.background = '#ef4444';
      btn.style.color = 'white';
    }
  };
  
  // JSON Import / Export
  document.getElementById('btn-export-json').onclick = () => {
    exportStudioJson(window._studioCurrentState);
  };
  
  document.getElementById('btn-import-json').onclick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (re) => importStudioJson(re.target.result);
      reader.readAsText(file);
    };
    input.click();
  };
  
  // State changes
  subscribe((newState) => {
    window._studioCurrentState = newState;
    syncControls(newState);
    updateExportCode(newState);
    runPreview(newState);
  });
});
