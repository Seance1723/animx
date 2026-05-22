import { updateState } from './studio-state.js';
import { templates } from './studio-templates.js';

export function initCanvas(state) {
  const sidebar = document.getElementById('template-list');
  const canvasContent = document.querySelector('.ax-studio-canvas-content');
  
  // Render template list
  sidebar.innerHTML = '';
  Object.keys(templates).forEach(key => {
    const el = document.createElement('div');
    el.className = `ax-studio-list-item ${state.template === key ? 'selected' : ''}`;
    el.textContent = templates[key].name;
    el.onclick = () => {
      document.querySelectorAll('#template-list .ax-studio-list-item').forEach(n => n.classList.remove('selected'));
      el.classList.add('selected');
      loadTemplate(key);
    };
    sidebar.appendChild(el);
  });
  
  // Device toggle buttons
  ['desktop', 'tablet', 'mobile'].forEach(size => {
    document.getElementById(`btn-device-${size}`).onclick = () => {
      const canvas = document.getElementById('studio-canvas');
      canvas.className = `ax-studio-canvas size-${size}`;
    };
  });

  function loadTemplate(key) {
    if (!templates[key]) key = 'hero';
    canvasContent.innerHTML = templates[key].html;
    
    // Bind selection
    const selectables = canvasContent.querySelectorAll('.ax-studio-selectable');
    selectables.forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        selectables.forEach(n => n.classList.remove('ax-studio-selected'));
        el.classList.add('ax-studio-selected');
        updateState({ template: key, selectedElementId: el.id });
      };
    });
    
    // Pre-select if matches state, else select first
    let toSelect = canvasContent.querySelector(`#${state.selectedElementId}`);
    if (!toSelect && selectables.length > 0) toSelect = selectables[0];
    
    if (toSelect) {
      toSelect.classList.add('ax-studio-selected');
      updateState({ template: key, selectedElementId: toSelect.id });
    } else {
      updateState({ template: key });
    }
  }

  loadTemplate(state.template);
}
