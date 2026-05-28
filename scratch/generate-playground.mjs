import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(process.cwd(), 'animxWebsite/src');

const files = {
  // 1. snippetGenerator.js
  'utils/snippetGenerator.js': `
export function generateHTML(element, options) {
  let tag = 'div';
  let inner = 'AnimX Animated Element';
  if (element === 'text') {
    tag = 'h2';
    inner = 'Unleash Your Creative Power';
  } else if (element === 'button') {
    tag = 'button';
    inner = 'Explore Now';
  } else if (element === 'card') {
    tag = 'div';
    inner = '<h3 class="card-title">Project Delta</h3>\\n  <p class="card-desc">Zero-dependency fluid animation layer</p>';
  }

  const durationAttr = options.duration !== 800 ? \` data-ax-duration="\${options.duration}"\` : '';
  const delayAttr = options.delay > 0 ? \` data-ax-delay="\${options.delay}"\` : '';
  const easeAttr = options.easing !== 'ease-out' ? \` data-ax-easing="\${options.easing}"\` : '';
  const triggerAttr = options.trigger && options.trigger !== 'page-load' ? \` data-ax-trigger="\${options.trigger}"\` : '';

  return \`<\${tag} data-ax="\${options.selectedEffect}"\${durationAttr}\${delayAttr}\${easeAttr}\${triggerAttr} class="ax-element">\\n  \${inner}\\n</\${tag}>\`;
}

export function generateJS(element, options) {
  const trigger = options.trigger || 'page-load';
  const triggerCode = trigger === 'hover' 
    ? \`AnimX.hover('.target', '\${options.selectedEffect}', { duration: \${options.duration}, delay: \${options.delay} });\`
    : trigger === 'click'
    ? \`AnimX.press('.target', '\${options.selectedEffect}', { duration: \${options.duration} });\`
    : \`AnimX.animate('.target', {\\n  preset: '\${options.selectedEffect}',\\n  duration: \${options.duration},\\n  delay: \${options.delay},\\n  easing: '\${options.easing}'\\n});\`;

  return \`import AnimX from 'animx';\\n\\n// Initialize the \${element} animation\\n\${triggerCode}\`;
}

export function generateCSSClass(element, options) {
  let tag = 'div';
  if (element === 'text') tag = 'h2';
  if (element === 'button') tag = 'button';
  
  const speedClass = options.duration < 400 ? ' ax-fast' : options.duration > 1500 ? ' ax-slow' : '';
  const delayClass = options.delay > 0 ? \` ax-delay-\${options.delay}\` : '';
  
  return \`<\${tag} class="ax-element ax-\${options.selectedEffect}\${speedClass}\${delayClass}">\\n  Interactive Content\\n</\${tag}>\`;
}

export function generateReact(element, options) {
  const isInteractive = ['hover-scale', 'ripple', 'magnetic', 'tilt'].includes(options.selectedEffect);
  
  if (isInteractive) {
    return \`import React, { useEffect, useRef } from 'react';\\nimport AnimX from 'animx';\\n\\nexport default function AnimatedComponent() {\\n  const ref = useRef(null);\\n\\n  useEffect(() => {\\n    if (!ref.current) return;\\n    // Enable interaction physics\\n    const inst = AnimX.component(ref.current, 'button-ripple', {\\n      duration: \${options.duration},\\n      easing: '\${options.easing}'\\n    });\\n    return () => inst.destroy();\\n  }, []);\\n\\n  return (\\n    <button ref={ref} className="interactive-btn">\\n      Interactive Button\\n    </button>\\n  );\\n}\`;
  }

  return \`import React from 'react';\\nimport 'animx/css';\\n\\nexport default function AnimatedComponent() {\\n  return (\\n    <div\\n      data-ax="\${options.selectedEffect}"\\n      data-ax-duration={\${options.duration}}\\n      data-ax-delay={\${options.delay}}\\n      data-ax-easing="\${options.easing}"\\n    >\\n      <h2>AnimX React Integration</h2>\\n    </div>\\n  );\\n}\`;
}

export function generateCMS(element, options) {
  return \`<!-- No-code & CMS Integration (Webflow, Shopify, Framer) -->\\n<div \\n  class="animx-cms-element"\\n  data-ax-recipe="hero-\${options.selectedEffect}"\\n  data-ax-trigger="\${options.trigger || 'scroll'}"\\n  data-ax-duration="\${options.duration}"\\n>\\n  CMS Dynamic Content\\n</div>\\n\\n<!-- Make sure script is included in page header -->\\n<script src="https://cdn.jsdelivr.net/npm/animx@3.41.0/dist/animx.min.js"></script>\`;
}
`,

  // 2. safePreview.js
  'utils/safePreview.js': `
export function safePreview(container, element, options, onComplete) {
  if (!window.AnimX || !container) return;

  try {
    // 1. Reset inner element to prevent state leaking
    container.innerHTML = '';
    
    // 2. Setup placeholder structure depending on type
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.className = 'preview-wrapper-inner';

    let el;
    if (element === 'text') {
      el = document.createElement('h2');
      el.innerText = 'Unleash Your Creative Power';
      el.className = 'preview-text';
    } else if (element === 'button') {
      el = document.createElement('button');
      el.innerText = 'Explore Now';
      el.className = 'preview-button';
    } else if (element === 'card') {
      el = document.createElement('div');
      el.className = 'preview-card';
      el.innerHTML = \`
        <div class="card-glow"></div>
        <div class="card-image-placeholder"></div>
        <h3>Project Delta</h3>
        <p>Zero-dependency fluid animation layer</p>
      \`;
    } else if (element === 'image') {
      el = document.createElement('div');
      el.className = 'preview-image-container';
      el.innerHTML = \`
        <img src="https://picsum.photos/400/250?blur=1" alt="Preview Image" class="preview-img" />
        <div class="image-overlay"></div>
      \`;
    } else if (element === 'background') {
      el = document.createElement('div');
      el.className = 'preview-background-stage';
      el.innerHTML = \`
        <div class="ambient-glow"></div>
        <p class="ambient-label">Ambient Atmosphere Engine</p>
      \`;
    }

    if (!el) return;

    // Apply reduced motion visual class simulation if requested
    if (options.reducedMotionPreview) {
      el.classList.add('reduced-motion-simulated');
      wrapper.appendChild(el);
      container.appendChild(wrapper);
      return;
    }

    // Apply custom properties for duration/delay/stagger
    el.style.setProperty('--ax-duration', \`\${options.duration}ms\`);
    el.style.setProperty('--ax-delay', \`\${options.delay}ms\`);
    el.style.setProperty('--ax-stagger', \`\${options.stagger}ms\`);

    // Add required attributes for declarative scanning
    el.setAttribute('data-ax', options.selectedEffect);
    el.setAttribute('data-ax-duration', options.duration);
    el.setAttribute('data-ax-delay', options.delay);
    el.setAttribute('data-ax-easing', options.easing);
    if (options.trigger && options.trigger !== 'page-load') {
      el.setAttribute('data-ax-trigger', options.trigger);
    }

    wrapper.appendChild(el);
    container.appendChild(wrapper);

    // Call corresponding JavaScript engine for premium setups
    setTimeout(() => {
      try {
        if (options.selectedEffect === 'reveal' || options.selectedEffect === 'scramble' || options.selectedEffect === 'typewriter') {
          if (window.AnimX.text) {
            window.AnimX.text(el, {
              type: options.selectedEffect === 'reveal' ? 'reveal' : options.selectedEffect === 'scramble' ? 'scramble' : 'typewriter',
              duration: options.duration,
              delay: options.delay,
              stagger: options.stagger,
              easing: options.easing
            });
          }
        } else if (options.selectedEffect === 'hover-scale' || options.selectedEffect === 'ripple' || options.selectedEffect === 'magnetic') {
          if (window.AnimX.component) {
            const inst = window.AnimX.component(el, options.selectedEffect === 'hover-scale' ? 'button-hover' : options.selectedEffect === 'ripple' ? 'button-ripple' : 'button-magnetic', {
              duration: options.duration,
              easing: options.easing
            });
            el._animx_inst = inst;
          }
        } else if (options.selectedEffect === 'tilt') {
          if (window.AnimX.tilt) {
            window.AnimX.tilt(el, { max: 15, perspective: 1000 });
          }
        } else if (options.selectedEffect === 'aurora' || options.selectedEffect === 'particles') {
          if (window.AnimX.background) {
            const ambient = el.querySelector('.ambient-glow');
            window.AnimX.background(ambient || el, {
              type: options.selectedEffect,
              intensity: options.intensity / 100,
              duration: options.duration
            });
          }
        } else {
          // Standard declarative preset sweep
          window.AnimX.animate(el, options.selectedEffect, {
            duration: options.duration,
            delay: options.delay,
            easing: options.easing
          });
        }
      } catch (e) {
        console.warn('AnimX API trigger failed, falling back to CSS presets', e);
      }
    }, 50);

  } catch (err) {
    console.error('AnimX safe preview error', err);
  }
}
`,

  // 3. ElementSelector.jsx
  'components/playground/ElementSelector.jsx': `
import React from 'react';
import { animationElements } from '../../data/animationElements';

export default function ElementSelector({ selected, onSelect }) {
  const getIcon = (id) => {
    switch (id) {
      case 'text': return '✍️';
      case 'button': return '🔘';
      case 'card': return '🎴';
      case 'image': return '🖼️';
      case 'background': return '🌌';
      default: return '📦';
    }
  };

  return (
    <div className="element-selector-container">
      <h3 className="section-title">1. Choose Element</h3>
      <div className="element-grid">
        {animationElements.map((el) => (
          <button
            key={el.id}
            className={\`element-tile \${selected === el.id ? 'active' : ''}\`}
            onClick={() => onSelect(el.id)}
          >
            <span className="tile-icon">{getIcon(el.id)}</span>
            <span className="tile-label">{el.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
`,

  // 4. DynamicOptionsPanel.jsx
  'components/playground/DynamicOptionsPanel.jsx': `
import React from 'react';
import { optionDefinitions } from '../../data/playgroundOptions';
import { animationElements } from '../../data/animationElements';

export default function DynamicOptionsPanel({ element, options, onChange }) {
  const currentElement = animationElements.find(el => el.id === element);
  if (!currentElement) return null;

  const handleEffectChange = (e) => {
    onChange({ ...options, selectedEffect: e.target.value });
  };

  const handleValueChange = (key, val) => {
    onChange({ ...options, [key]: val });
  };

  return (
    <div className="dynamic-options-panel">
      <h3 className="section-title">2. Refine Motion</h3>
      
      <div className="control-group">
        <label className="control-label">Visual Preset Effect</label>
        <div className="select-wrapper">
          <select value={options.selectedEffect} onChange={handleEffectChange}>
            {currentElement.effects.map(eff => (
              <option key={eff} value={eff}>{eff.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="control-divider"></div>

      {currentElement.options.includes('duration') && (
        <div className="control-group">
          <div className="control-header">
            <span className="control-label">Duration</span>
            <span className="control-value">{options.duration}ms</span>
          </div>
          <input
            type="range"
            min={optionDefinitions.duration.min}
            max={optionDefinitions.duration.max}
            step="50"
            value={options.duration}
            onChange={(e) => handleValueChange('duration', parseInt(e.target.value))}
          />
        </div>
      )}

      {currentElement.options.includes('delay') && (
        <div className="control-group">
          <div className="control-header">
            <span className="control-label">Delay</span>
            <span className="control-value">{options.delay}ms</span>
          </div>
          <input
            type="range"
            min={optionDefinitions.delay.min}
            max={optionDefinitions.delay.max}
            step="50"
            value={options.delay}
            onChange={(e) => handleValueChange('delay', parseInt(e.target.value))}
          />
        </div>
      )}

      {currentElement.options.includes('stagger') && (
        <div className="control-group">
          <div className="control-header">
            <span className="control-label">Stagger</span>
            <span className="control-value">{options.stagger}ms</span>
          </div>
          <input
            type="range"
            min={optionDefinitions.stagger.min}
            max={optionDefinitions.stagger.max}
            step="5"
            value={options.stagger}
            onChange={(e) => handleValueChange('stagger', parseInt(e.target.value))}
          />
        </div>
      )}

      {currentElement.options.includes('easing') && (
        <div className="control-group">
          <label className="control-label">Easing Curve</label>
          <div className="select-wrapper">
            <select value={options.easing} onChange={(e) => handleValueChange('easing', e.target.value)}>
              {optionDefinitions.easing.options.map(ease => (
                <option key={ease} value={ease}>{ease}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {currentElement.options.includes('intensity') && (
        <div className="control-group">
          <div className="control-header">
            <span className="control-label">Effect Intensity</span>
            <span className="control-value">{options.intensity}%</span>
          </div>
          <input
            type="range"
            min={optionDefinitions.intensity.min}
            max={optionDefinitions.intensity.max}
            value={options.intensity}
            onChange={(e) => handleValueChange('intensity', parseInt(e.target.value))}
          />
        </div>
      )}

      <div className="control-group">
        <label className="control-label">Trigger Condition</label>
        <div className="select-wrapper">
          <select value={options.trigger || 'page-load'} onChange={(e) => handleValueChange('trigger', e.target.value)}>
            <option value="page-load">Page Entry (Instant)</option>
            <option value="scroll">Scroll Intersection</option>
            <option value="hover">Mouse Hover</option>
            <option value="click">User Interaction Click</option>
          </select>
        </div>
      </div>

      <div className="control-divider"></div>

      <div className="control-toggle-group">
        <label className="toggle-container">
          <input
            type="checkbox"
            checked={options.reducedMotionPreview}
            onChange={(e) => handleValueChange('reducedMotionPreview', e.target.checked)}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">Simulate Accessibility Mode (Reduced Motion)</span>
        </label>
      </div>
    </div>
  );
}
`,

  // 5. LivePreviewStage.jsx
  'components/playground/LivePreviewStage.jsx': `
import React, { useRef, useEffect } from 'react';
import { safePreview } from '../../utils/safePreview';

export default function LivePreviewStage({ element, options }) {
  const containerRef = useRef(null);

  const triggerReplay = () => {
    safePreview(containerRef.current, element, options);
  };

  useEffect(() => {
    triggerReplay();
    return () => {
      if (containerRef.current) {
        const target = containerRef.current.querySelector('.preview-button');
        if (target && target._animx_inst && typeof target._animx_inst.destroy === 'function') {
          target._animx_inst.destroy();
        }
      }
    };
  }, [element, options]);

  return (
    <div className="live-preview-stage-container">
      <div className="stage-header">
        <h3 className="section-title">3. Live Canvas Stage</h3>
        <button className="btn-replay" onClick={triggerReplay}>
          🔄 Replay Animation
        </button>
      </div>
      <div className="preview-canvas-wrapper">
        <div ref={containerRef} className="preview-canvas">
          {/* Managed by safePreview for clean DOM setup */}
        </div>
        {options.reducedMotionPreview && (
          <div className="reduced-motion-overlay">
            <span>♿ Reduced Motion Active: Fallback safe rendering simulation</span>
          </div>
        )}
      </div>
      <div className="stage-footer">
        <span className="metric-tag">FPS: 60 (Hardware Accelerated)</span>
        <span className="metric-tag">Engine: {options.easing === 'spring' ? 'WAAPI + Springs' : 'CSS GPU Driver'}</span>
      </div>
    </div>
  );
}
`,

  // 6. ExportSnippetsPanel.jsx
  'components/playground/ExportSnippetsPanel.jsx': `
import React, { useState } from 'react';
import { generateHTML, generateJS, generateCSSClass, generateReact, generateCMS } from '../../utils/snippetGenerator';

export default function ExportSnippetsPanel({ element, options }) {
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'html', label: 'HTML5 Attributes' },
    { id: 'css', label: 'Utility Classes' },
    { id: 'js', label: 'JavaScript API' },
    { id: 'react', label: 'React / Next' },
    { id: 'cms', label: 'No-Code / CMS' }
  ];

  const getCode = () => {
    switch (activeTab) {
      case 'html': return generateHTML(element, options);
      case 'css': return generateCSSClass(element, options);
      case 'js': return generateJS(element, options);
      case 'react': return generateReact(element, options);
      case 'cms': return generateCMS(element, options);
      default: return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="export-snippets-container">
      <h3 className="section-title">4. Deploy Code</h3>
      
      <div className="snippets-tabs-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={\`tab-btn \${activeTab === tab.id ? 'active' : ''}\`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="snippets-content-wrapper">
        <div className="snippets-code-header">
          <span className="code-lang-label">{activeTab.toUpperCase()} Integration</span>
          <button className={\`copy-btn \${copied ? 'copied' : ''}\`} onClick={handleCopy}>
            {copied ? '✔️ Copied!' : '📋 Copy Code'}
          </button>
        </div>
        <pre className="code-block-playground">
          <code>{getCode()}</code>
        </pre>
      </div>

      <div className="integration-guide-note">
        <p>
          💡 <strong>Production Tip:</strong> AnimX core has zero external runtime overhead. Styles automatically compile to hardware-accelerated transforms for ultra-responsive animations.
        </p>
      </div>
    </div>
  );
}
`,

  // 7. PlaygroundLayout.jsx
  'components/playground/PlaygroundLayout.jsx': `
import React, { useState } from 'react';
import ElementSelector from './ElementSelector';
import DynamicOptionsPanel from './DynamicOptionsPanel';
import LivePreviewStage from './LivePreviewStage';
import ExportSnippetsPanel from './ExportSnippetsPanel';

export default function PlaygroundLayout() {
  const [selectedElement, setSelectedElement] = useState('text');
  const [options, setOptions] = useState({
    selectedEffect: 'reveal',
    duration: 800,
    delay: 0,
    stagger: 50,
    easing: 'ease-out',
    intensity: 50,
    trigger: 'page-load',
    reducedMotionPreview: false
  });

  const handleSelectElement = (elId) => {
    setSelectedElement(elId);
    
    // Determine default effect
    let defaultEffect = 'reveal';
    if (elId === 'button') defaultEffect = 'hover-scale';
    if (elId === 'card') defaultEffect = 'fade-up';
    if (elId === 'image') defaultEffect = 'mask-reveal';
    if (elId === 'background') defaultEffect = 'aurora';

    setOptions(prev => ({
      ...prev,
      selectedEffect: defaultEffect
    }));
  };

  return (
    <div className="playground-layout-wrapper">
      <div className="playground-header-intro">
        <h2>Visual Animation Playground</h2>
        <p>Tweak dynamic parameters, experience real-time execution safely, and grab the code for any deployment stack.</p>
      </div>
      
      <div className="playground-columns-grid">
        {/* Left column: Element choices + controls */}
        <div className="playground-column controls-col">
          <ElementSelector selected={selectedElement} onSelect={handleSelectElement} />
          <DynamicOptionsPanel element={selectedElement} options={options} onChange={setOptions} />
        </div>

        {/* Center column: Live rendering stage */}
        <div className="playground-column stage-col">
          <LivePreviewStage element={selectedElement} options={options} />
        </div>

        {/* Right column: Export snippets */}
        <div className="playground-column snippets-col">
          <ExportSnippetsPanel element={selectedElement} options={options} />
        </div>
      </div>
    </div>
  );
}
`,

  // 8. _playground.scss
  'styles/_playground.scss': `
.playground-layout-wrapper {
  padding: 24px;
  background: var(--bg);
  min-height: calc(100vh - 120px);
  box-sizing: border-box;
  text-align: left;

  .playground-header-intro {
    margin-bottom: 24px;
    h2 {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-h);
      margin: 0 0 8px;
    }
    p {
      font-size: 16px;
      color: var(--text);
      margin: 0;
    }
  }

  .playground-columns-grid {
    display: grid;
    grid-template-columns: 320px 1fr 380px;
    gap: 20px;
    align-items: stretch;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
  }

  .playground-column {
    background: var(--bg-main, #f9f9f9);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-shadow: var(--shadow);
    overflow: hidden;

    @media (prefers-color-scheme: dark) {
      background: #1e2028;
    }

    &.controls-col {
      max-height: 80vh;
      overflow-y: auto;
    }
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-h);
    margin: 0 0 16px;
    border-bottom: 2px solid var(--accent);
    padding-bottom: 6px;
    display: inline-block;
  }

  /* 1. Element Selector Styles */
  .element-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    .element-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 8px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        border-color: var(--accent);
        transform: translateY(-2px);
      }

      &.active {
        background: var(--accent-bg);
        border-color: var(--accent);
        box-shadow: 0 0 10px rgba(170, 59, 255, 0.2);

        .tile-label {
          color: var(--accent);
          font-weight: 600;
        }
      }

      .tile-icon {
        font-size: 24px;
        margin-bottom: 6px;
      }

      .tile-label {
        font-size: 13px;
        color: var(--text);
      }
    }
  }

  /* 2. Control Options Styles */
  .control-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .control-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-h);
    }

    .control-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      
      .control-label {
        font-weight: 500;
        color: var(--text-h);
      }

      .control-value {
        color: var(--accent);
        font-family: var(--mono);
      }
    }

    input[type="range"] {
      width: 100%;
      accent-color: var(--accent);
      cursor: pointer;
    }

    .select-wrapper {
      position: relative;
      select {
        width: 100%;
        padding: 10px 12px;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 6px;
        color: var(--text-h);
        font-size: 14px;
        outline: none;
        cursor: pointer;
        appearance: none;

        &:focus {
          border-color: var(--accent);
        }
      }

      &::after {
        content: '▼';
        font-size: 10px;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--text);
      }
    }
  }

  .control-divider {
    height: 1px;
    background: var(--border);
    margin: 4px 0;
  }

  .control-toggle-group {
    .toggle-container {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-size: 13px;
      color: var(--text);

      input {
        display: none;
      }

      .toggle-slider {
        width: 36px;
        height: 20px;
        background: #ccc;
        border-radius: 10px;
        position: relative;
        transition: 0.2s;

        &::after {
          content: '';
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: 0.2s;
        }
      }

      input:checked + .toggle-slider {
        background: var(--accent);
        &::after {
          left: 18px;
        }
      }
    }
  }

  /* 3. Stage Preview Canvas Styles */
  .live-preview-stage-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .btn-replay {
        background: var(--accent-bg);
        color: var(--accent);
        border: 1px solid var(--accent-border);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: var(--accent);
          color: #fff;
        }
      }
    }

    .preview-canvas-wrapper {
      position: relative;
      flex: 1;
      min-height: 350px;
      border: 1px dashed var(--border);
      border-radius: 10px;
      background: var(--bg);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
      overflow: hidden;

      .preview-canvas {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .reduced-motion-overlay {
        position: absolute;
        bottom: 12px;
        left: 12px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
      }
    }

    .stage-footer {
      display: flex;
      gap: 10px;
      margin-top: 12px;

      .metric-tag {
        font-size: 11px;
        background: var(--code-bg);
        padding: 4px 8px;
        border-radius: 4px;
        color: var(--text);
        font-family: var(--mono);
      }
    }
  }

  /* 4. Export Snippets Styles */
  .export-snippets-container {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .snippets-tabs-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      background: var(--code-bg);
      padding: 4px;
      border-radius: 8px;

      .tab-btn {
        flex: 1;
        min-width: 80px;
        padding: 6px 8px;
        font-size: 11px;
        font-weight: 500;
        border: none;
        background: transparent;
        color: var(--text);
        border-radius: 6px;
        cursor: pointer;
        transition: 0.15s;

        &.active {
          background: var(--bg);
          color: var(--accent);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
      }
    }

    .snippets-content-wrapper {
      background: #16171d;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;

      .snippets-code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        background: #1f2028;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);

        .code-lang-label {
          font-size: 11px;
          font-family: var(--mono);
          color: #888;
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #eee;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          &.copied {
            background: var(--accent-bg);
            border-color: var(--accent);
            color: var(--accent);
          }
        }
      }

      .code-block-playground {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
        max-height: 250px;

        code {
          background: transparent !important;
          padding: 0 !important;
          color: #a78bfa;
          font-size: 12px;
          text-align: left;
          display: block;
          white-space: pre;
        }
      }
    }

    .integration-guide-note {
      font-size: 12px;
      color: var(--text);
      line-height: 140%;
      background: var(--accent-bg);
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid var(--accent);

      p {
        margin: 0;
      }
    }
  }

  /* Actual visual preview styles rendered in the canvas */
  .preview-text {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-h);
    margin: 0;
  }

  .preview-button {
    background: linear-gradient(135deg, var(--accent), #7c3aed);
    color: #fff;
    border: none;
    padding: 12px 28px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(170, 59, 255, 0.3);
    position: relative;
    overflow: hidden;
  }

  .preview-card {
    position: relative;
    width: 250px;
    padding: 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow);
    text-align: left;

    .card-image-placeholder {
      height: 120px;
      background: linear-gradient(45deg, var(--accent-bg), rgba(124, 58, 237, 0.15));
      border-radius: 8px;
      margin-bottom: 12px;
    }

    h3 {
      font-size: 16px;
      color: var(--text-h);
      margin: 0 0 6px;
    }

    p {
      font-size: 12px;
      color: var(--text);
      margin: 0;
    }
  }

  .preview-image-container {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    max-width: 100%;

    .preview-img {
      display: block;
      width: 100%;
      height: auto;
      max-height: 220px;
      object-fit: cover;
    }
  }

  .preview-background-stage {
    width: 100%;
    height: 250px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background: #111;
    display: flex;
    justify-content: center;
    align-items: center;

    .ambient-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba(170, 59, 255, 0.3), transparent 70%);
      pointer-events: none;
    }

    .ambient-label {
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      z-index: 1;
    }
  }

  /* Simulating reduced motion setting */
  .reduced-motion-simulated {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
}
console.log('Playground components and styles generated.');
