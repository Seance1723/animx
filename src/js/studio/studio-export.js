import { generateExportCode } from './studio-export-packs.js';

export function updateExportCode(state) {
  const codeOutput = document.getElementById('code-output');
  const warningsOutput = document.getElementById('export-warnings');
  
  const activeTabBtn = document.querySelector('.ax-studio-code-tabs button.active');
  const activePack = activeTabBtn ? activeTabBtn.dataset.pack : 'html';
  
  const result = generateExportCode(activePack, state);
  
  let finalString = '';
  if (result.info) finalString += result.info + '\n\n';
  if (result.html) finalString += result.html + '\n';
  if (result.js) finalString += '\n' + result.js;
  
  codeOutput.textContent = finalString.trim();
  
  if (result.validation && !result.validation.ok) {
    warningsOutput.style.display = 'block';
    warningsOutput.innerHTML = `<strong>⚠️ Export Warnings:</strong><ul><li>${result.validation.warnings.join('</li><li>')}</li></ul>`;
  } else {
    warningsOutput.style.display = 'none';
  }
}

export function initExport(state) {
  const tabs = document.querySelectorAll('.ax-studio-code-tabs button');
  tabs.forEach(btn => {
    btn.onclick = () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateExportCode(window._studioCurrentState || state);
    };
  });
  updateExportCode(state);
}
