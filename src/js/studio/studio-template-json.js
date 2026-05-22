import { updateState } from './studio-state.js';
import { validateExport } from './studio-export-validator.js';

export function exportStudioJson(state) {
  const data = {
    version: '3.1.0',
    type: 'animx-studio-state',
    state: state
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `animx-studio-export-${Date.now()}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}

export function importStudioJson(fileContent, onImportSuccess) {
  try {
    const data = JSON.parse(fileContent);
    
    if (data.type !== 'animx-studio-state' || !data.state) {
      throw new Error("Invalid AnimX Studio JSON format.");
    }
    
    // Safety check - we do not currently allow custom HTML strings in state to be injected,
    // we only allow 'template' IDs from the registry to ensure no XSS occurs during JSON import.
    // However, if we ever add custom HTML, we should run it through safeHTML() or validateExport().
    
    const s = data.state;
    // Sanitize state to known primitive types
    const cleanState = {
      template: String(s.template || ''),
      selectedElementId: String(s.selectedElementId || ''),
      animation: String(s.animation || 'fade-up'),
      duration: parseInt(s.duration) || 700,
      delay: parseInt(s.delay) || 0,
      ease: String(s.ease || ''),
      trigger: String(s.trigger || '')
    };
    
    updateState(cleanState);
    if (onImportSuccess) onImportSuccess(cleanState);
    
  } catch (err) {
    alert("Failed to import JSON: " + err.message);
  }
}
