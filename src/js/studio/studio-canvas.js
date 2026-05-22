import { updateState } from './studio-state.js';
import { getTemplates, getTemplateById, getCategories } from './studio-template-registry.js';

export function initCanvas(state) {
  const sidebar = document.getElementById('template-list');
  const canvasContent = document.querySelector('.ax-studio-canvas-content');
  
  const templates = getTemplates();
  const categories = getCategories();
  
  // Render template list with categories
  sidebar.innerHTML = '';
  categories.forEach(cat => {
    const title = document.createElement('h4');
    title.style.color = '#94a3b8';
    title.style.marginTop = '15px';
    title.style.marginBottom = '5px';
    title.textContent = cat;
    sidebar.appendChild(title);
    
    templates.filter(t => t.category === cat).forEach(t => {
      const el = document.createElement('div');
      el.className = `ax-studio-list-item ${state.template === t.id ? 'selected' : ''}`;
      el.textContent = t.name;
      el.onclick = () => {
        document.querySelectorAll('#template-list .ax-studio-list-item').forEach(n => n.classList.remove('selected'));
        el.classList.add('selected');
        loadTemplate(t.id);
      };
      sidebar.appendChild(el);
    });
  });
  
  // Device toggle buttons
  ['desktop', 'tablet', 'mobile'].forEach(size => {
    document.getElementById(`btn-device-${size}`).onclick = () => {
      const canvas = document.getElementById('studio-canvas');
      canvas.className = `ax-studio-canvas size-${size}`;
    };
  });

  function loadTemplate(id) {
    let tpl = getTemplateById(id);
    if (!tpl) tpl = templates[0];
    const key = tpl.id;
    canvasContent.innerHTML = tpl.template.html;
    
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
