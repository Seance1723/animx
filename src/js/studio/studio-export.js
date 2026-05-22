export function updateExportCode(state) {
  const codeOutput = document.getElementById('code-output');
  const activeTab = document.querySelector('.ax-studio-code-tabs button.active').dataset.code;
  
  const target = state.selectedElementId ? '#' + state.selectedElementId : '.my-element';
  const anim = state.animation;
  const dur = state.duration;
  const del = state.delay;
  const ease = state.ease;
  const trig = state.trigger;
  
  if (activeTab === 'html') {
    codeOutput.textContent = `<div class="ax-${anim}">\n  Content\n</div>`;
  } 
  else if (activeTab === 'data') {
    let html = `<div data-ax="${anim}"`;
    if (dur && dur !== 700) html += `\n     data-ax-duration="${dur}"`;
    if (del > 0) html += `\n     data-ax-delay="${del}"`;
    if (ease) html += `\n     data-ax-ease="${ease}"`;
    if (trig) html += `\n     data-ax-trigger="${trig}"`;
    html += `>\n  Content\n</div>`;
    codeOutput.textContent = html;
  } 
  else if (activeTab === 'js') {
    let js = `AnimX.animate("${target}", "${anim}"`;
    
    const opts = [];
    if (dur && dur !== 700) opts.push(`  duration: ${dur}`);
    if (del > 0) opts.push(`  delay: ${del}`);
    if (ease) opts.push(`  ease: "${ease}"`);
    if (trig) opts.push(`  trigger: "${trig}"`);
    
    if (opts.length > 0) {
      js += `, {\n${opts.join(',\n')}\n}`;
    }
    js += `);`;
    codeOutput.textContent = js;
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
