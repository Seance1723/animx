import { updateState } from './studio-state.js';

export function initPresets(state) {
  const presetList = document.getElementById('preset-list');
  const searchInput = document.getElementById('preset-search');
  
  function renderPresets(query = '') {
    const categories = window.AnimX.getPresetCategories();
    presetList.innerHTML = '';
    
    if (query.trim()) {
      const results = window.AnimX.searchPresets(query);
      results.forEach(p => {
        const el = document.createElement('div');
        el.className = `ax-studio-list-item ${state.animation === p.name ? 'selected' : ''}`;
        el.innerHTML = `<span>${p.name}</span> <span class="ax-studio-category-label">${p.category}</span>`;
        el.onclick = () => {
          updateState({ animation: p.name });
          renderPresets(query);
        };
        presetList.appendChild(el);
      });
      return;
    }
    
    categories.forEach(cat => {
      const title = document.createElement('h4');
      title.style.color = '#94a3b8';
      title.style.marginTop = '15px';
      title.style.marginBottom = '5px';
      title.textContent = cat;
      presetList.appendChild(title);
      
      const results = window.AnimX.searchPresets(cat);
      results.forEach(p => {
        const el = document.createElement('div');
        el.className = `ax-studio-list-item ${state.animation === p.name ? 'selected' : ''}`;
        el.textContent = p.name;
        el.onclick = () => {
          updateState({ animation: p.name });
          renderPresets();
        };
        presetList.appendChild(el);
      });
    });
  }
  
  searchInput.oninput = (e) => renderPresets(e.target.value);
  
  renderPresets();
}
