import { getTemplateById } from './studio-template-registry.js';
import { validateExport } from './studio-export-validator.js';

export function generateExportCode(packName, state) {
  const target = state.selectedElementId ? '#' + state.selectedElementId : '.my-element';
  const anim = state.animation || 'fade-up';
  const dur = state.duration || 700;
  const del = state.delay || 0;
  const ease = state.ease || '';
  const trig = state.trigger || '';
  
  let tplHtml = '<div class="content">...</div>';
  if (state.template) {
    const tpl = getTemplateById(state.template);
    if (tpl) tplHtml = tpl.template.html;
  }
  
  let resultHtml = '';
  let resultJs = '';
  let resultCss = '';
  let info = '';

  switch(packName) {
    case 'html':
      resultHtml = `<div class="ax ax-${anim} ${dur !== 700 ? `ax-${dur}ms` : ''}">\n  Content\n</div>`;
      break;
    
    case 'data':
      resultHtml = `<div data-ax="${anim}"`;
      if (dur !== 700) resultHtml += `\n     data-ax-duration="${dur}"`;
      if (del > 0) resultHtml += `\n     data-ax-delay="${del}"`;
      if (ease) resultHtml += `\n     data-ax-ease="${ease}"`;
      if (trig) resultHtml += `\n     data-ax-trigger="${trig}"`;
      resultHtml += `>\n  Content\n</div>`;
      break;
      
    case 'js':
      resultHtml = `<div id="${state.selectedElementId || 'my-element'}">\n  Content\n</div>`;
      resultJs = `AnimX.animate("${target}", "${anim}"`;
      const opts = [];
      if (dur !== 700) opts.push(`  duration: ${dur}`);
      if (del > 0) opts.push(`  delay: ${del}`);
      if (ease) opts.push(`  ease: "${ease}"`);
      if (trig) opts.push(`  trigger: "${trig}"`);
      if (opts.length > 0) resultJs += `, {\n${opts.join(',\n')}\n}`;
      resultJs += `);`;
      break;
      
    case 'cms':
      resultHtml = `<div data-ax-recipe="${state.template || 'hero-recipe'}">\n  Content\n</div>`;
      info = "// Call AnimX.refreshCMS() after your CMS dynamically injects this HTML.";
      break;
      
    case 'wordpress':
      info = `<!-- WordPress Snippet (Functions.php):
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('animx', get_template_directory_uri() . '/assets/animx.min.css');
    wp_enqueue_script('animx', get_template_directory_uri() . '/assets/animx.min.js', [], null, true);
});
-->`;
      resultHtml = `<div data-ax="${anim}" data-ax-duration="${dur}">\n  <?php the_content(); ?>\n</div>`;
      break;
      
    case 'webflow':
      info = `<!-- Webflow Custom Embed Snippet -->\n<!-- Place animx.min.css in Head, animx.min.js in Before Body -->`;
      resultHtml = `<div data-ax="${anim}" data-ax-duration="${dur}">\n  Content\n</div>`;
      break;
      
    case 'react':
      resultJs = `import { useEffect, useRef } from 'react';\n// Ensure AnimX is loaded globally or imported\n\nexport default function AnimatedComponent() {\n  const ref = useRef(null);\n  \n  useEffect(() => {\n    if (ref.current) {\n      const instance = window.AnimX.animate(ref.current, "${anim}");\n      return () => instance.destroy();\n    }\n  }, []);\n\n  return <div ref={ref}>Content</div>;\n}`;
      break;
      
    case 'vue':
      resultJs = `<template>\n  <div ref="el">Content</div>\n</template>\n\n<script setup>\nimport { ref, onMounted, onBeforeUnmount } from 'vue';\n// Ensure AnimX is loaded globally or imported\n\nconst el = ref(null);\nlet instance = null;\n\nonMounted(() => {\n  instance = window.AnimX.animate(el.value, "${anim}");\n});\n\nonBeforeUnmount(() => {\n  if (instance) instance.destroy();\n});\n</script>`;
      break;
  }
  
  const validation = validateExport(resultHtml, resultJs);

  return {
    html: resultHtml,
    js: resultJs,
    css: resultCss,
    info: info,
    validation
  };
}
