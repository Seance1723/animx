import React, { useState, useEffect, useRef } from 'react';

// --- Comprehensive Element / Component Catalog Groups ---
const COMPONENT_GROUPS = {
  buttons: {
    name: 'Buttons & Actions',
    presets: [
      { name: 'button-lift', desc: 'Hover elevation & soft shadow' },
      { name: 'button-glow', desc: 'Interactive halo border glow' },
      { name: 'button-ripple', desc: 'Material design press ripple click' },
      { name: 'button-magnetic', desc: 'Spatially pulls towards cursor' },
      { name: 'button-press', desc: 'Elastic shrink bounce on click' },
      { name: 'button-shine', desc: 'Horizontal metallic sheen sweep' },
      { name: 'button-border-draw', desc: 'Traces outline border on hover' },
      { name: 'button-icon-slide', desc: 'Translates inline arrow on hover' },
      { name: 'button-success-pop', desc: 'Bounces badge validation success' },
      { name: 'button-error-shake', desc: 'Validation failure shake' },
      { name: 'button-pulse-attention', desc: 'Continuous gentle pulsing loop' }
    ]
  },
  cards: {
    name: 'Cards & Containers',
    presets: [
      { name: 'card-lift', desc: 'Hover translation elevation' },
      { name: 'card-hover-rise', desc: 'Hover rise elevation shadow' },
      { name: 'card-tilt', desc: '3D interactive cursor tilt tracking' },
      { name: 'card-depth', desc: 'Parallax multi-layer spatial depth' },
      { name: 'card-border-glow', desc: 'Border active gradient glow' },
      { name: 'card-soft-pop', desc: 'Smooth spring scaling pop' },
      { name: 'card-glint', desc: 'Diagonal flash glare sweep' }
    ]
  },
  forms: {
    name: 'Forms & Inputs',
    presets: [
      { name: 'input-focus-glow', desc: 'Active border shadow glow' },
      { name: 'input-label-float', desc: 'Floating label transform focus' },
      { name: 'checkbox-pop', desc: 'Bounce click checkbox select' },
      { name: 'switch-slide', desc: 'Sliding toggle active switch' },
      { name: 'range-fill', desc: 'Glow progress sliders' }
    ]
  },
  feedback: {
    name: 'Overlays & Feedback',
    presets: [
      { name: 'modal-pop', desc: 'Playful bouncing dialog scale' },
      { name: 'modal-scale', desc: 'Smooth dialog scaling entrance' },
      { name: 'drawer-left', desc: 'Off-canvas slide-out control drawers' },
      { name: 'toast-slide-up', desc: 'Upward notification slide toast' },
      { name: 'tooltip-pop', desc: 'Micro scaling popover hint' }
    ]
  },
  tabs: {
    name: 'Tabs & Accordions',
    presets: [
      { name: 'tabs-line-glide', desc: 'Active line indicator glide' },
      { name: 'tabs-pill-slide', desc: 'Active pill backplate slider' },
      { name: 'accordion-expand', desc: 'Layout-safe height collapsible accordion' }
    ]
  },
  tables: {
    name: 'Tables & Lists',
    presets: [
      { name: 'list-row-reveal', desc: 'Staggered horizontal list reveals' },
      { name: 'table-row-fade', desc: 'Staggered row cell opacity entries' }
    ]
  },
  skeleton: {
    name: 'Skeleton & Loaders',
    presets: [
      { name: 'skeleton-shimmer', desc: 'Shimmering block loading placeholders' },
      { name: 'loader-spinner', desc: 'Continuous rotating circle loader' },
      { name: 'loader-dots', desc: 'Three-dot stagger bounce indicator' }
    ]
  },
  backgrounds: {
    name: 'Ambient Atmosphere',
    presets: [
      { name: 'bg-aurora', desc: 'Slow atmospheric moving gradient' },
      { name: 'bg-grid-pulse', desc: 'Pulsating architectural grid lines' }
    ]
  }
};

// --- Comprehensive Visual Effect Catalog Groups ---
const EFFECT_GROUPS = {
  entrance: {
    name: 'Entrance Animations',
    presets: ['fade-in', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'zoom-up', 'zoom-down', 'blur-in', 'flip-in-x', 'flip-in-y', 'rotate-in', 'spin-in']
  },
  exit: {
    name: 'Exit Animations',
    presets: ['fade-out', 'fade-out-up', 'fade-out-down', 'fade-out-left', 'fade-out-right', 'slide-out-up', 'slide-out-down', 'slide-out-left', 'slide-out-right', 'zoom-out', 'scale-out', 'blur-out', 'flip-out-x', 'flip-out-y', 'wipe-out-up', 'wipe-out-down', 'collapse-out']
  },
  attention: {
    name: 'Attention Seekers',
    presets: ['pulse', 'pulse-soft', 'pulse-strong', 'heartbeat', 'ping', 'shake', 'shake-x', 'shake-y', 'bounce', 'bounce-soft', 'swing', 'wobble', 'tada', 'jello', 'glow-pulse', 'vibrate', 'highlight']
  },
  emphasis: {
    name: 'Emphasis / States',
    presets: ['lift', 'rise', 'pop', 'soft-pop', 'depth-pop', 'glow', 'border-glow', 'shine', 'glint', 'light-sweep', 'shadow-lift', 'focus-ring', 'spotlight']
  },
  loops: {
    name: 'Transforms & Loops',
    presets: ['spin', 'spin-reverse', 'float', 'float-up-down', 'float-left-right', 'drift', 'sway', 'skew-left', 'skew-right', 'tilt-soft', 'tilt-hard']
  },
  reveals: {
    name: 'Mask Reveals',
    presets: ['mask-up', 'mask-down', 'mask-left', 'mask-right', 'curtain-up', 'curtain-down', 'curtain-left', 'curtain-right', 'split-reveal-horizontal', 'split-reveal-vertical', 'wipe-up', 'wipe-down']
  },
  text: {
    name: 'Typography & Text',
    presets: ['text-rise', 'text-fade', 'text-blur', 'text-wave', 'text-char-wave', 'text-word-wave', 'text-mask-up', 'text-mask-down', 'text-scramble-decode', 'text-counter-roll', 'text-ticker-left', 'text-ticker-right']
  }
};

export default function PlaygroundLayout() {
  // --- State Setup ---
  const [mode, setMode] = useState('components');

  // Components state
  const [compGroup, setCompGroup] = useState('buttons');
  const [compPreset, setCompPreset] = useState('button-lift');

  // Effects state
  const [effectGroup, setEffectGroup] = useState('entrance');
  const [effectPreset, setEffectPreset] = useState('fade-up');

  // Shared variables
  const [duration, setDuration] = useState(800);
  const [delay, setDelay] = useState(0);
  const [ease, setEase] = useState('smooth');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [copiedText, setCopiedText] = useState(null);
  const [engineLoaded, setEngineLoaded] = useState(false);

  // Legacy fallback supports
  const [staggerAnim, setStaggerAnim] = useState('zoom-in');
  const [staggerDelay, setStaggerDelay] = useState(50);
  const [staggerFrom, setStaggerFrom] = useState('start');

  const [textType, setTextType] = useState('split');
  const [textSplit, setTextSplit] = useState('chars');
  const [textAnim, setTextAnim] = useState('text-rise');

  const [svgType, setSvgType] = useState('draw');
  const [layoutType, setLayoutType] = useState('reorder');

  const canvasRef = useRef(null);
  const activeInstanceRef = useRef(null);

  // --- Defensive Async Loader for AnimX ---
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (window.AnimX) {
        setEngineLoaded(true);
        clearInterval(checkInterval);
      }
    }, 50);
    return () => clearInterval(checkInterval);
  }, []);

  // --- Load State on mount ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem('animx_playground_expanded');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.compGroup) setCompGroup(parsed.compGroup);
        if (parsed.compPreset) setCompPreset(parsed.compPreset);
        if (parsed.effectGroup) setEffectGroup(parsed.effectGroup);
        if (parsed.effectPreset) setEffectPreset(parsed.effectPreset);
        if (parsed.duration) setDuration(parsed.duration);
        if (parsed.delay) setDelay(parsed.delay);
        if (parsed.ease) setEase(parsed.ease);
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
  }, []);

  // --- Save State on change ---
  useEffect(() => {
    try {
      const stateObj = {
        mode,
        compGroup,
        compPreset,
        effectGroup,
        effectPreset,
        duration,
        delay,
        ease
      };
      localStorage.setItem('animx_playground_expanded', JSON.stringify(stateObj));
    } catch (e) {}
  }, [mode, compGroup, compPreset, effectGroup, effectPreset, duration, delay, ease]);

  // Handle group switching presets
  useEffect(() => {
    if (COMPONENT_GROUPS[compGroup]) {
      const presets = COMPONENT_GROUPS[compGroup].presets;
      if (presets && presets.length > 0) {
        setCompPreset(presets[0].name);
      }
    }
  }, [compGroup]);

  useEffect(() => {
    if (EFFECT_GROUPS[effectGroup]) {
      const presets = EFFECT_GROUPS[effectGroup].presets;
      if (presets && presets.length > 0) {
        setEffectPreset(presets[0]);
      }
    }
  }, [effectGroup]);

  // --- Canvas Rendering & Animation orchestration ---
  const renderAndPlay = () => {
    if (!canvasRef.current) return;

    // 1. Destroy previous instance to prevent layout thrashing
    if (activeInstanceRef.current) {
      try {
        activeInstanceRef.current.destroy();
      } catch (e) {}
      activeInstanceRef.current = null;
    }

    const canvas = canvasRef.current;
    canvas.innerHTML = '';
    
    // Force direct browser layout flow recalculation (the reflow hack to replay flawlessly)
    void canvas.offsetHeight;

    if (!window.AnimX) return;

    // Apply reduced motion config
    window.AnimX.config({ reducedMotion: reducedMotion ? 'always' : 'auto' });

    const opts = { duration, delay, ease };

    // 2. Set up DOM templates
    if (mode === 'components') {
      if (compGroup === 'buttons') {
        canvas.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:16px; align-items:center;">
            <button id="compTarget" class="ax-btn ax-btn-primary ${compPreset === 'button-lift' ? 'ax-button-lift' : compPreset === 'button-glow' ? 'ax-button-glow' : compPreset === 'button-shine' ? 'ax-button-shine' : compPreset === 'button-border-draw' ? 'ax-button-border-draw' : compPreset === 'button-icon-slide' ? 'ax-button-icon-slide' : compPreset === 'button-pulse-attention' ? 'ax-button-pulse-attention' : ''}" style="position:relative; z-index:10; font-size:1rem; padding:12px 24px;">
              Interactive Button
              ${compPreset === 'button-icon-slide' ? '<span class="icon" style="margin-left:8px; display:inline-block; transition:transform 0.3s;">→</span>' : ''}
            </button>
            <div style="font-size:0.85rem; color:#94a3b8; max-width:200px; text-align:center;">
              Hover or click the button to see the micro-interaction.
            </div>
          </div>
        `;

        setTimeout(() => {
          if (compPreset === 'button-ripple') {
            activeInstanceRef.current = window.AnimX.button('#compTarget', { ripple: true, duration });
          } else if (compPreset === 'button-magnetic') {
            activeInstanceRef.current = window.AnimX.button('#compTarget', { magnetic: true, duration });
          } else if (compPreset === 'button-press') {
            activeInstanceRef.current = window.AnimX.button('#compTarget', { press: true, duration });
          } else if (compPreset === 'button-success-pop') {
            const el = document.getElementById('compTarget');
            el.addEventListener('click', () => {
              el.innerText = 'Success! ✓';
              el.style.background = '#10b981';
              window.AnimX.button('#compTarget', { type: 'success-pop', duration });
              setTimeout(() => {
                el.innerText = 'Interactive Button';
                el.style.background = '';
              }, 1500);
            });
          } else if (compPreset === 'button-error-shake') {
            const el = document.getElementById('compTarget');
            el.addEventListener('click', () => {
              window.AnimX.button('#compTarget', { type: 'error-shake', duration });
            });
          }
        }, 50);

      } else if (compGroup === 'cards') {
        canvas.innerHTML = `
          <div id="compTarget" class="preview-card ${compPreset === 'card-lift' ? 'ax-card-lift' : compPreset === 'card-hover-rise' ? 'ax-card-hover-rise' : compPreset === 'card-glint' ? 'ax-card-glint' : compPreset === 'card-border-glow' ? 'ax-card-border-glow' : compPreset === 'card-soft-pop' ? 'ax-card-soft-pop' : ''}" style="padding:24px; border-radius:16px; background:#1e293b; border:1px solid #334155; max-width:100%; width:250px; box-sizing:border-box; text-align:left; box-shadow:0 15px 35px rgba(0,0,0,0.4); cursor:pointer; position:relative; overflow:hidden;">
            <div style="height:120px; border-radius:8px; background:linear-gradient(135deg,#6366f1,#a855f7); margin-bottom:16px; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:1.5rem;" class="card-inner-img">
              AnimX
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <span style="font-size:0.75rem; background:rgba(99,102,241,0.2); color:#a5b4fc; padding:4px 8px; border-radius:4px; font-weight:bold;">v3.41.0</span>
              <span style="font-size:0.75rem; color:#94a3b8;">Card Element</span>
            </div>
            <h4 style="margin:0 0 8px; color:white; font-size:1.1rem;">Interactive Card</h4>
            <p style="margin:0; font-size:0.85rem; color:#94a3b8; line-height:1.4;">Hover over the card to experience layout physics.</p>
          </div>
        `;

        setTimeout(() => {
          if (compPreset === 'card-tilt') {
            activeInstanceRef.current = window.AnimX.card('#compTarget', { tilt: true, max: 15, perspective: 1000, duration });
          } else if (compPreset === 'card-depth') {
            activeInstanceRef.current = window.AnimX.card('#compTarget', { depth: true, duration });
          }
        }, 50);

      } else if (compGroup === 'forms') {
        canvas.innerHTML = `
          <div style="max-width:100%; width:250px; box-sizing:border-box; text-align:left; background:#1e293b; padding:20px; border-radius:12px; border:1px solid #334155;">
            <h4 style="margin:0 0 16px; color:white; font-size:1rem;">Interactive Form</h4>
            <div style="margin-bottom:16px; position:relative;">
              <label id="inputLabel" style="font-size:0.8rem; color:#94a3b8; display:block; margin-bottom:6px; transition:all 0.2s;">Username</label>
              <input id="compTarget" type="text" placeholder="Enter username..." style="margin-bottom:0; width:100%; padding:10px 14px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:white; outline:none;" />
            </div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; cursor:pointer;" id="checkWrap">
              <input id="compCheck" type="checkbox" style="width:16px; height:16px; margin:0;" />
              <span style="font-size:0.85rem; color:#94a3b8; user-select:none;">Remember session settings</span>
            </div>
            <button class="ax-btn ax-btn-primary" id="formSubmit" style="width:100%; justify-content:center;">Submit</button>
          </div>
        `;

        setTimeout(() => {
          if (compPreset === 'input-focus-glow') {
            activeInstanceRef.current = window.AnimX.input('#compTarget', { focusGlow: true, duration });
          } else if (compPreset === 'input-label-float') {
            const input = document.getElementById('compTarget');
            const label = document.getElementById('inputLabel');
            input.placeholder = '';
            input.addEventListener('focus', () => {
              label.style.transform = 'translateY(-4px) scale(0.85)';
              label.style.color = '#6366f1';
            });
            input.addEventListener('blur', () => {
              if (!input.value) {
                label.style.transform = '';
                label.style.color = '';
              }
            });
          } else if (compPreset === 'checkbox-pop') {
            const check = document.getElementById('compCheck');
            check.addEventListener('change', () => {
              if (check.checked) {
                window.AnimX.checkbox('#compCheck', { type: 'pop', duration });
              }
            });
          } else if (compPreset === 'switch-slide') {
            const wrap = document.getElementById('checkWrap');
            wrap.innerHTML = `
              <div id="compSwitch" style="width:44px; height:24px; background:#334155; border-radius:12px; padding:2px; position:relative; transition:background 0.3s; cursor:pointer;">
                <div id="switchThumb" style="width:20px; height:20px; background:white; border-radius:50%; position:absolute; left:2px; transition:left 0.3s;"></div>
              </div>
              <span style="font-size:0.85rem; color:#94a3b8; user-select:none;">Active toggle</span>
            `;
            const toggle = document.getElementById('compSwitch');
            const thumb = document.getElementById('switchThumb');
            let active = false;
            toggle.addEventListener('click', () => {
              active = !active;
              toggle.style.background = active ? '#6366f1' : '#334155';
              thumb.style.left = active ? '22px' : '2px';
              window.AnimX.switch('#compSwitch', { active, duration });
            });
          } else if (compPreset === 'range-fill') {
            const wrap = document.getElementById('checkWrap');
            wrap.innerHTML = `
              <div style="width:100%;">
                <label style="font-size:0.8rem; color:#94a3b8; display:block; margin-bottom:5px;">Intensity Volume</label>
                <input id="compRange" type="range" min="0" max="100" value="50" style="width:100%; accent-color:#6366f1;" />
              </div>
            `;
          }
        }, 50);

      } else if (compGroup === 'feedback') {
        canvas.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:16px; align-items:center; max-width:100%; box-sizing:border-box;">
            <button class="ax-btn ax-btn-primary" id="triggerBtn" style="padding:10px 20px;">Trigger Interaction</button>
            <div id="toastBox" style="padding:12px 20px; background:#10b981; color:white; border-radius:8px; font-weight:500; font-size:0.9rem; box-shadow:0 10px 25px rgba(0,0,0,0.3); opacity:0; pointer-events:none; position:relative; max-width:100%; box-sizing:border-box;">
              ✓ Notification alert active!
            </div>
            <div id="modalBox" style="display:none; position:absolute; inset:0; background:rgba(15,23,42,0.85); backdrop-filter:blur(4px); align-items:center; justify-content:center; z-index:99; padding:20px; box-sizing:border-box;">
              <div style="background:#1e293b; border:1px solid #334155; padding:24px; border-radius:12px; max-width:100%; width:240px; box-sizing:border-box; text-align:left; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <h4 style="margin:0 0 10px; color:white;">Dialog Panel</h4>
                <p style="margin:0 0 16px; font-size:0.85rem; color:#94a3b8;">Are you ready to commit these settings?</p>
                <div style="display:flex; gap:10px;">
                  <button class="ax-btn ax-btn-primary" id="modalClose" style="padding:6px 12px; font-size:0.8rem;">Confirm</button>
                  <button class="ax-btn ax-btn-secondary" id="modalCancel" style="padding:6px 12px; font-size:0.8rem;">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        `;

        setTimeout(() => {
          const btn = document.getElementById('triggerBtn');
          const toast = document.getElementById('toastBox');
          const modal = document.getElementById('modalBox');

          if (compPreset === 'toast-slide-up') {
            btn.addEventListener('click', () => {
              toast.style.opacity = '1';
              window.AnimX.toast('#toastBox', { type: 'slide-up', duration });
              setTimeout(() => { toast.style.opacity = '0'; }, 2000);
            });
          } else if (compPreset === 'modal-pop' || compPreset === 'modal-scale') {
            btn.addEventListener('click', () => {
              modal.style.display = 'flex';
              window.AnimX.modal('#modalBox > div', { type: compPreset === 'modal-pop' ? 'pop' : 'scale', duration });
            });
            const hide = () => { modal.style.display = 'none'; };
            document.getElementById('modalClose').addEventListener('click', hide);
            document.getElementById('modalCancel').addEventListener('click', hide);
          } else if (compPreset === 'drawer-left') {
            const dialog = modal.children[0];
            dialog.style.width = '100%';
            dialog.style.maxWidth = '200px';
            dialog.style.height = '100%';
            dialog.style.borderRadius = '0';
            dialog.style.marginRight = 'auto';
            dialog.style.border = 'none';
            dialog.style.borderRight = '1px solid #334155';

            btn.addEventListener('click', () => {
              modal.style.display = 'flex';
              window.AnimX.drawer('#modalBox > div', { type: 'left', duration });
            });
            const hide = () => { modal.style.display = 'none'; };
            document.getElementById('modalClose').addEventListener('click', hide);
            document.getElementById('modalCancel').addEventListener('click', hide);
          } else if (compPreset === 'tooltip-pop') {
            btn.addEventListener('mouseenter', () => {
              const tooltip = document.createElement('div');
              tooltip.id = 'activeTooltip';
              tooltip.innerText = 'Useful Information Box';
              tooltip.style.position = 'absolute';
              tooltip.style.background = '#020617';
              tooltip.style.border = '1px solid #334155';
              tooltip.style.padding = '6px 12px';
              tooltip.style.borderRadius = '4px';
              tooltip.style.fontSize = '0.75rem';
              tooltip.style.color = 'white';
              tooltip.style.top = '10px';
              tooltip.style.zIndex = '999';
              btn.parentElement.appendChild(tooltip);
              window.AnimX.tooltip('#activeTooltip', { type: 'pop', duration });
            });
            btn.addEventListener('mouseleave', () => {
              const t = document.getElementById('activeTooltip');
              if (t) t.remove();
            });
          }
        }, 50);

      } else if (compGroup === 'tabs') {
        canvas.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:16px; max-width:100%; width:260px; box-sizing:border-box;">
            ${compPreset === 'accordion-expand' ? `
              <div style="background:#1e293b; border-radius:8px; border:1px solid #334155; text-align:left; max-width:100%;">
                <div id="accordionHeader" style="padding:14px; font-weight:bold; cursor:pointer; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; user-select:none; color:white;">
                  <span>General Parameters</span>
                  <span id="accordionIcon" style="transition:transform 0.3s; font-size:0.8rem;">▼</span>
                </div>
                <div id="compTarget" style="height:0px; overflow:hidden;">
                  <div style="padding:14px; color:#94a3b8; font-size:0.85rem; line-height:1.4;">
                    Rebuilt options panel using advanced motion engines and safety rules natively.
                  </div>
                </div>
              </div>
            ` : `
              <div style="display:flex; background:#1e293b; border-radius:8px; border:1px solid #334155; padding:4px; position:relative; max-width:100%;" id="tabGroup">
                <div id="tabIndicator" style="position:absolute; height:calc(100% - 8px); top:4px; left:4px; width:75px; background:#6366f1; border-radius:6px; transition:all 0.3s; z-index:0;"></div>
                <button class="tab-btn active" style="flex:1; padding:8px 0; border:none; background:transparent; color:white; font-size:0.85rem; cursor:pointer; font-weight:bold; position:relative; z-index:1;" data-idx="0">Profile</button>
                <button class="tab-btn" style="flex:1; padding:8px 0; border:none; background:transparent; color:#94a3b8; font-size:0.85rem; cursor:pointer; font-weight:bold; position:relative; z-index:1;" data-idx="1">Security</button>
                <button class="tab-btn" style="flex:1; padding:8px 0; border:none; background:transparent; color:#94a3b8; font-size:0.85rem; cursor:pointer; font-weight:bold; position:relative; z-index:1;" data-idx="2">Billing</button>
              </div>
              <div id="tabContent" style="padding:12px; background:#1e293b; border:1px solid #334155; border-radius:8px; font-size:0.85rem; color:#94a3b8; min-height:60px; text-align:left; max-width:100%;">
                Displaying Profile settings.
              </div>
            `}
          </div>
        `;

        setTimeout(() => {
          if (compPreset === 'accordion-expand') {
            const header = document.getElementById('accordionHeader');
            const target = document.getElementById('compTarget');
            const icon = document.getElementById('accordionIcon');
            let open = false;
            header.addEventListener('click', () => {
              open = !open;
              icon.style.transform = open ? 'rotate(180deg)' : '';
              target.style.height = open ? '65px' : '0px';
              window.AnimX.accordion('#compTarget', { active: open, duration });
            });
          } else {
            const ind = document.getElementById('tabIndicator');
            const content = document.getElementById('tabContent');
            const btns = document.querySelectorAll('.tab-btn');

            if (compPreset === 'tabs-line-glide') {
              ind.style.height = '2px';
              ind.style.top = 'auto';
              ind.style.bottom = '0px';
              ind.style.borderRadius = '0';
            }

            const contentMap = [
              'Displaying Profile settings.',
              'Security shields active and secure.',
              'No unpaid bills found.'
            ];

            btns.forEach((btn, idx) => {
              btn.addEventListener('click', () => {
                btns.forEach(b => {
                  b.style.color = '#94a3b8';
                });
                btn.style.color = 'white';
                ind.style.width = `${btn.offsetWidth}px`;
                ind.style.left = `${btn.offsetLeft}px`;
                content.innerText = contentMap[idx];
                window.AnimX.tabIndicator('#tabIndicator', { index: idx, duration });
              });
            });
          }
        }, 50);

      } else if (compGroup === 'tables') {
        canvas.innerHTML = `
          <div style="max-width:100%; width:260px; box-sizing:border-box; text-align:left; background:#1e293b; border-radius:12px; border:1px solid #334155; overflow:hidden;" id="compTarget">
            <div style="padding:12px; background:#0f172a; font-weight:bold; border-bottom:1px solid #334155; font-size:0.9rem; color:white;">Active Sessions</div>
            <div class="row-item" style="padding:12px; border-bottom:1px solid #334155; display:flex; justify-content:space-between; font-size:0.85rem; color:#94a3b8;">
              <span>San Francisco, US</span>
              <span style="color:#10b981; font-weight:bold;">Active</span>
            </div>
            <div class="row-item" style="padding:12px; border-bottom:1px solid #334155; display:flex; justify-content:space-between; font-size:0.85rem; color:#94a3b8;">
              <span>London, UK</span>
              <span>2h ago</span>
            </div>
            <div class="row-item" style="padding:12px; display:flex; justify-content:space-between; font-size:0.85rem; color:#94a3b8;">
              <span>Mumbai, IN</span>
              <span>1d ago</span>
            </div>
          </div>
        `;

        setTimeout(() => {
          const rows = document.querySelectorAll('#compTarget .row-item');
          rows.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(15px)'; });
          activeInstanceRef.current = window.AnimX.stagger('#compTarget .row-item', 'fade-up', {
            duration,
            delay,
            each: 100,
            ease
          });
        }, 50);

      } else if (compGroup === 'skeleton') {
        canvas.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:16px; align-items:center; max-width:100%; width:200px; box-sizing:border-box;" id="compTarget">
            ${compPreset === 'skeleton-shimmer' ? `
              <div style="width:100%; display:flex; flex-direction:column; gap:10px;">
                <div class="shimmer-block" style="height:16px; border-radius:4px; background:#334155; width:70%; position:relative; overflow:hidden;"></div>
                <div class="shimmer-block" style="height:12px; border-radius:4px; background:#334155; width:100%; position:relative; overflow:hidden;"></div>
                <div class="shimmer-block" style="height:12px; border-radius:4px; background:#334155; width:45%; position:relative; overflow:hidden;"></div>
              </div>
            ` : compPreset === 'loader-spinner' ? `
              <div class="spinner-circle" style="width:40px; height:40px; border:3px solid rgba(99,102,241,0.2); border-top-color:#6366f1; border-radius:50%;"></div>
            ` : `
              <div class="dots-container" style="display:flex; gap:8px;">
                <div class="dot" style="width:10px; height:10px; background:#6366f1; border-radius:50%;"></div>
                <div class="dot" style="width:10px; height:10px; background:#6366f1; border-radius:50%;"></div>
                <div class="dot" style="width:10px; height:10px; background:#6366f1; border-radius:50%;"></div>
              </div>
            `}
          </div>
        `;

        setTimeout(() => {
          if (compPreset === 'loader-spinner') {
            activeInstanceRef.current = window.AnimX.animate('.spinner-circle', 'spin', { duration: 1000, ease: 'linear', loop: true });
          } else if (compPreset === 'loader-dots') {
            activeInstanceRef.current = window.AnimX.stagger('.dot', 'bounce', { duration: 600, each: 150, loop: true });
          }
        }, 50);

      } else if (compGroup === 'backgrounds') {
        canvas.innerHTML = `
          <div id="compTarget" style="position:absolute; inset:0; width:100%; height:100%; border-radius:8px; overflow:hidden; display:flex; align-items:center; justify-content:center; flex-direction:column; z-index:0;">
            ${compPreset === 'bg-aurora' ? `
              <div class="aurora" style="position:absolute; width:140%; height:140%; background:radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 40%, rgba(16,185,129,0.08) 70%, transparent 100%); filter:blur(40px); top:-20%; left:-20%;"></div>
            ` : `
              <div class="grid-layer" style="position:absolute; inset:0; background-image:radial-gradient(#334155 1.5px, transparent 1.5px); background-size:20px 20px; opacity:0.35;"></div>
            `}
          </div>
          <div style="z-index:1; position:relative; font-weight:bold; color:white; font-size:1.4rem;">
            Atmospheric Stage
          </div>
        `;

        setTimeout(() => {
          if (compPreset === 'bg-aurora') {
            activeInstanceRef.current = window.AnimX.aurora('#compTarget .aurora', { duration: 8000 });
          } else if (compPreset === 'bg-grid-pulse') {
            activeInstanceRef.current = window.AnimX.animate('#compTarget .grid-layer', 'glow-pulse', { duration: 2000, loop: true });
          }
        }, 50);
      }

    } else if (mode === 'effects') {
      canvas.innerHTML = `<div class="preview-box" id="effectTarget">AnimX</div>`;
      setTimeout(() => {
        if (effectGroup === 'text') {
          activeInstanceRef.current = window.AnimX.text('#effectTarget', { type: 'split', splitType: 'chars', animation: effectPreset, ...opts });
        } else {
          activeInstanceRef.current = window.AnimX.animate('#effectTarget', effectPreset, opts);
        }
      }, 50);

    } else if (mode === 'stagger') {
      let grid = '<div class="preview-stagger-grid" id="staggerGrid">';
      for (let i = 0; i < 20; i++) grid += `<div class="stagger-item"></div>`;
      grid += '</div>';
      canvas.innerHTML = grid;

      setTimeout(() => {
        activeInstanceRef.current = window.AnimX.stagger('.stagger-item', staggerAnim, {
          ...opts,
          each: staggerDelay,
          from: staggerFrom
        });
      }, 50);

    } else if (mode === 'text') {
      canvas.innerHTML = `<div class="preview-text" id="textTarget">Zero Dependency Animation Engine</div>`;
      
      setTimeout(() => {
        if (textType === 'split') {
          activeInstanceRef.current = window.AnimX.text('#textTarget', { type: 'split', splitType: textSplit, animation: textAnim, ...opts });
        } else if (textType === 'typewriter') {
          activeInstanceRef.current = window.AnimX.text('#textTarget', { type: 'typewriter', text: 'Zero Dependency Animation Engine', ...opts });
        } else if (textType === 'scramble') {
          activeInstanceRef.current = window.AnimX.text('#textTarget', { type: 'scramble', text: 'Zero Dependency Animation Engine', ...opts });
        }
      }, 50);

    } else if (mode === 'svg') {
      canvas.innerHTML = `<svg class="preview-svg" viewBox="0 0 100 100" id="svgTarget"><path d="M10,50 Q25,25 50,50 T90,50" /></svg>`;
      
      setTimeout(() => {
        if (svgType === 'draw') {
          activeInstanceRef.current = window.AnimX.svgDraw('#svgTarget path', opts);
        } else {
          window.AnimX.svgDraw('#svgTarget path', { duration: 0 }).then(() => {
            activeInstanceRef.current = window.AnimX.animate('#svgTarget path', 'svg-undraw', opts);
          });
        }
      }, 50);

    } else if (mode === 'layout') {
      if (layoutType === 'reorder') {
        canvas.innerHTML = `<div class="preview-stagger-grid" id="layoutGrid" style="gap:5px; width:150px;">
          <div class="stagger-item" style="background:#6366f1;">1</div>
          <div class="stagger-item" style="background:#8b5cf6;">2</div>
          <div class="stagger-item" style="background:#ec4899;">3</div>
          <div class="stagger-item" style="background:#f43f5e;">4</div>
        </div>`;
      } else if (layoutType === 'expand') {
        canvas.innerHTML = `
          <div style="background:#1e293b; border-radius:8px; width:200px;">
            <div style="padding:10px; border-bottom:1px solid #334155; font-weight:bold;">Accordion Header</div>
            <div id="layoutExpand" style="height:0px; overflow:hidden;">
              <div style="padding:10px; color:#94a3b8; font-size:0.85rem;">This is the hidden content that gets revealed when the accordion expands.</div>
            </div>
          </div>`;
      } else if (layoutType === 'swap') {
        canvas.innerHTML = `<div id="layoutSwap" class="preview-box" style="font-size:1rem;">Old Content</div>`;
      }

      setTimeout(() => {
        if (layoutType === 'reorder') {
          const grid = document.getElementById('layoutGrid');
          const first = window.AnimX.measureLayout('#layoutGrid .stagger-item');
          for (let i = grid.children.length; i >= 0; i--) {
            grid.appendChild(grid.children[Math.random() * i | 0]);
          }
          const last = window.AnimX.measureLayout('#layoutGrid .stagger-item');
          activeInstanceRef.current = window.AnimX.animateLayout(first, last, opts);
        } else if (layoutType === 'expand') {
          activeInstanceRef.current = window.AnimX.toggleExpand('#layoutExpand', opts);
        } else if (layoutType === 'swap') {
          const target = document.getElementById('layoutSwap');
          const content = target.innerText === 'Old Content' ? 'New Content' : 'Old Content';
          activeInstanceRef.current = window.AnimX.swap('#layoutSwap', content, { ...opts, animation: 'fade-slide' });
        }
      }, 50);
    }
  };

  // Replay whenever state updates
  useEffect(() => {
    if (engineLoaded) {
      renderAndPlay();
    }
  }, [engineLoaded, mode, compGroup, compPreset, effectGroup, effectPreset, duration, delay, ease, staggerAnim, staggerDelay, staggerFrom, textType, textSplit, textAnim, svgType, layoutType, reducedMotion]);

  // --- Snippet Generators ---
  const getExportSnippets = () => {
    let htmlStr = '';
    let dataStr = '';
    let jsStr = '';

    const durStr = duration !== 800 ? ` duration: ${duration},` : '';
    const delStr = delay > 0 ? ` delay: ${delay},` : '';
    const easeStr = ease !== 'smooth' ? ` ease: '${ease}',` : '';
    const optsObj = (durStr || delStr || easeStr) ? ` { ${durStr}${delStr}${easeStr} }`.replace(/, }$/, ' }') : '';

    if (mode === 'components') {
      htmlStr = `<button class="ax-btn ax-btn-primary ax-${compPreset}">Interactive Action</button>`;
      dataStr = `<button class="ax-btn ax-btn-primary" data-ax-interaction="${compPreset}"${duration !== 800 ? ' data-ax-duration="' + duration + '"' : ''}></button>`;
      
      const categoryMap = {
        buttons: 'button',
        cards: 'card',
        forms: 'input',
        feedback: 'toast',
        tabs: 'tabIndicator',
        tables: 'stagger',
        skeleton: 'animate',
        backgrounds: 'aurora'
      };
      const apiMethod = categoryMap[compGroup] || 'animate';
      jsStr = `AnimX.${apiMethod}('.target', { type: '${compPreset}'${optsObj ? ', ' + optsObj : ''} });`;

    } else if (mode === 'effects') {
      htmlStr = `<div class="ax ax-${effectPreset}"></div>`;
      dataStr = `<div data-ax="${effectPreset}"${duration !== 800 ? ' data-ax-duration="' + duration + '"' : ''}${delay > 0 ? ' data-ax-delay="' + delay + '"' : ''}></div>`;
      jsStr = `AnimX.animate('.target', '${effectPreset}'${optsObj ? ', ' + optsObj : ''});`;

    } else if (mode === 'stagger') {
      htmlStr = `<!-- Bound via Javascript API for multi-element groups -->`;
      dataStr = `<div data-ax-group data-ax-child="${staggerAnim}" data-ax-stagger="${staggerDelay}">\n  <div class="item"></div>\n</div>`;
      jsStr = `AnimX.stagger('.item', '${staggerAnim}', {\n  each: ${staggerDelay},\n  from: '${staggerFrom}'${duration !== 800 ? ',\n  duration: ' + duration : ''}\n});`;

    } else if (mode === 'text') {
      htmlStr = `<!-- Typography Splitters -->`;
      dataStr = `<!-- Typography Splitters -->`;
      if (textType === 'split') {
        jsStr = `AnimX.text('.title', {\n  type: 'split',\n  splitType: '${textSplit}',\n  animation: '${textAnim}'${duration !== 800 ? ',\n  duration: ' + duration : ''}\n});`;
      } else {
        jsStr = `AnimX.text('.title', {\n  type: '${textType}',\n  text: 'Hello World'${duration !== 800 ? ',\n  duration: ' + duration : ''}\n});`;
      }

    } else if (mode === 'svg') {
      htmlStr = `<!-- Vector Outline Drawing -->`;
      dataStr = `<!-- Vector Outline Drawing -->`;
      jsStr = `AnimX.svgDraw('path', ${optsObj || '{}'});`;

    } else if (mode === 'layout') {
      htmlStr = `<!-- FLIP animations executed in JS logic loops -->`;
      dataStr = `<!-- FLIP animations executed in JS logic loops -->`;
      jsStr = `AnimX.animateLayout(firstLayout, lastLayout, ${optsObj || '{}'});`;
    }

    return { htmlStr, dataStr, jsStr };
  };

  const snippets = getExportSnippets();

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  return (
    <div className="playground-page-wrapper">
      <div className="playground-wrapper">
        
        {/* LEFT COLUMN: Controls (No scrollbar, expands page naturally) */}
        <div className="sidebar" style={{ overflow: 'visible', maxHeight: 'none', height: 'auto' }}>
          <div className="header">
            <span>Builder Controls</span>
          </div>

          {/* Mode Selection Tabs */}
          <div className="tabs">
            <button className={`tab ${mode === 'components' ? 'active' : ''}`} onClick={() => setMode('components')}>Components</button>
            <button className={`tab ${mode === 'effects' ? 'active' : ''}`} onClick={() => setMode('effects')}>Effects</button>
            <button className={`tab ${mode === 'stagger' ? 'active' : ''}`} onClick={() => setMode('stagger')}>Stagger</button>
            <button className={`tab ${mode === 'text' ? 'active' : ''}`} onClick={() => setMode('text')}>Text</button>
            <button className={`tab ${mode === 'svg' ? 'active' : ''}`} onClick={() => setMode('svg')}>SVG</button>
            <button className={`tab ${mode === 'layout' ? 'active' : ''}`} onClick={() => setMode('layout')}>Layout</button>
          </div>

          {/* COMPONENTS CONTROLS */}
          {mode === 'components' && (
            <div className="section">
              <label className="label">Component Group</label>
              <select value={compGroup} onChange={(e) => setCompGroup(e.target.value)}>
                {Object.keys(COMPONENT_GROUPS).map(g => (
                  <option key={g} value={g}>{COMPONENT_GROUPS[g].name}</option>
                ))}
              </select>

              <label className="label">Preset & Interaction</label>
              <select value={compPreset} onChange={(e) => setCompPreset(e.target.value)}>
                {COMPONENT_GROUPS[compGroup]?.presets.map(p => (
                  <option key={p.name} value={p.name}>{p.name} ({p.desc})</option>
                ))}
              </select>
            </div>
          )}

          {/* EFFECTS CONTROLS */}
          {mode === 'effects' && (
            <div className="section">
              <label className="label">Effect Group</label>
              <select value={effectGroup} onChange={(e) => setEffectGroup(e.target.value)}>
                {Object.keys(EFFECT_GROUPS).map(g => (
                  <option key={g} value={g}>{EFFECT_GROUPS[g].name}</option>
                ))}
              </select>

              <label className="label">Visual Preset</label>
              <select
                size="5"
                value={effectPreset}
                onChange={(e) => setEffectPreset(e.target.value)}
                style={{ marginBottom: 0 }}
              >
                {EFFECT_GROUPS[effectGroup]?.presets.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}

          {/* STAGGER CONTROLS */}
          {mode === 'stagger' && (
            <div className="section">
              <label className="label">Base Animation</label>
              <select value={staggerAnim} onChange={(e) => setStaggerAnim(e.target.value)}>
                <option value="zoom-in">zoom-in</option>
                <option value="fade-up">fade-up</option>
                <option value="flip-in-y">flip-in-y</option>
              </select>

              <div className="slider-group">
                <label className="label">Stagger Delay <span className="slider-val">{staggerDelay}ms</span></label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={staggerDelay}
                  onChange={(e) => setStaggerDelay(parseInt(e.target.value))}
                />
              </div>

              <label className="label">Origin (From)</label>
              <select value={staggerFrom} onChange={(e) => setStaggerFrom(e.target.value)}>
                <option value="start">Start</option>
                <option value="center">Center</option>
                <option value="end">End</option>
                <option value="edges">Edges</option>
                <option value="random">Random</option>
              </select>
            </div>
          )}

          {/* TEXT CONTROLS */}
          {mode === 'text' && (
            <div className="section">
              <label className="label">Text Engine</label>
              <select value={textType} onChange={(e) => setTextType(e.target.value)}>
                <option value="split">Split Animation</option>
                <option value="typewriter">Typewriter</option>
                <option value="scramble">Scramble</option>
              </select>

              {textType === 'split' && (
                <div>
                  <label className="label">Split By</label>
                  <select value={textSplit} onChange={(e) => setTextSplit(e.target.value)}>
                    <option value="chars">Characters</option>
                    <option value="words">Words</option>
                    <option value="lines">Lines</option>
                  </select>
                  <label className="label">Animation</label>
                  <select value={textAnim} onChange={(e) => setTextAnim(e.target.value)}>
                    <option value="text-rise">text-rise</option>
                    <option value="text-wave">text-wave</option>
                    <option value="fade-up">fade-up</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* SVG CONTROLS */}
          {mode === 'svg' && (
            <div className="section">
              <label className="label">SVG Engine</label>
              <select value={svgType} onChange={(e) => setSvgType(e.target.value)}>
                <option value="draw">Draw (Line Animation)</option>
                <option value="undraw">Undraw</option>
              </select>
            </div>
          )}

          {/* LAYOUT CONTROLS */}
          {mode === 'layout' && (
            <div className="section">
              <label className="label">Layout Engine</label>
              <select value={layoutType} onChange={(e) => setLayoutType(e.target.value)}>
                <option value="reorder">FLIP Reorder</option>
                <option value="expand">Expand / Collapse</option>
                <option value="swap">Content Swap</option>
              </select>
            </div>
          )}

          {/* SHARED CONTROLS */}
          <div className="section">
            <div className="slider-group">
              <label className="label">Duration <span className="slider-val">{duration}ms</span></label>
              <input
                type="range"
                min="100"
                max="3000"
                step="100"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
            </div>
            <div className="slider-group">
              <label className="label">Delay <span className="slider-val">{delay}ms</span></label>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={delay}
                onChange={(e) => setDelay(parseInt(e.target.value))}
              />
            </div>
            <label className="label">Easing</label>
            <select value={ease} onChange={(e) => setEase(e.target.value)}>
              <option value="smooth">Smooth (Default)</option>
              <option value="snappy">Snappy</option>
              <option value="bounce">Bounce</option>
              <option value="linear">Linear</option>
            </select>
          </div>
        </div>

        {/* CENTER COLUMN: Canvas Preview */}
        <div className="canvas-container" style={{ alignSelf: 'stretch' }}>
          <div className="canvas-toolbar">
            <button className="ax-btn ax-btn-primary" onClick={renderAndPlay}>Replay Animation</button>
            <button className="ax-btn ax-btn-secondary" onClick={() => {
              if (activeInstanceRef.current) activeInstanceRef.current.destroy();
              renderAndPlay();
            }}>Reset View</button>
            <div style={{ flex: 1 }}></div>
            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
              /> Simulate Reduced Motion
            </label>
          </div>

          <div ref={canvasRef} className="canvas" id="canvasArea" style={{ position: 'relative' }}>
            {/* dynamic elements rendered here */}
          </div>
        </div>

        {/* RIGHT COLUMN: Code Export */}
        <div className="export-panel" style={{ alignSelf: 'stretch' }}>
          <div className="header">Export Snippets</div>
          <div className="section" style={{ flex: 1, overflowY: 'auto' }}>
            
            <label className="label">HTML (Classes)</label>
            <div className="code-block">
              <button className="copy-btn" onClick={() => handleCopy(snippets.htmlStr, 'html')}>
                {copiedText === 'html' ? 'Copied!' : 'Copy'}
              </button>
              <span id="codeHtml">{snippets.htmlStr}</span>
            </div>

            <label className="label">HTML (Data Attributes)</label>
            <div className="code-block">
              <button className="copy-btn" onClick={() => handleCopy(snippets.dataStr, 'data')}>
                {copiedText === 'data' ? 'Copied!' : 'Copy'}
              </button>
              <span id="codeData">{snippets.dataStr}</span>
            </div>

            <label className="label">JavaScript API</label>
            <div className="code-block">
              <button className="copy-btn" onClick={() => handleCopy(snippets.jsStr, 'js')}>
                {copiedText === 'js' ? 'Copied!' : 'Copy'}
              </button>
              <span id="codeJs">{snippets.jsStr}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}