import { getConfig, setConfig } from './core/config.js';
import { normalizeSelector } from './core/selector.js';
import { debug } from './core/debug.js';
import { createSafeInstance } from './core/safe-instance.js';
import { performanceMonitor } from './core/performance-monitor.js';
import { destroyInstances, clearInstances } from './core/instance-registry.js';
import { toggleDebug, diagnose, features, versionInfo, productionCheck } from './core/devtools.js';
import { inspect } from './core/inspector.js';
import { validate } from './core/validator.js';
import { getExamples, copyExample } from './core/example-builder.js';
import { registerPreset, getPreset, getPresets, getComponentPresets, getPresetCategories, getPresetsByCategory, searchPresets, getPresetTags } from './presets/preset-registry.js';
import { findPreset, suggestPreset } from './presets/preset-search-index.js';
import { cssPresets } from './presets/css-presets.js';
import { componentPresets } from './components/component-presets.js';
import { expandedPresets } from './presets/expanded-presets.js';
import { elementPresets } from './presets/element-presets.js'; // v3.26.0

import { accessibility, motionSafe } from './accessibility/accessibility-api.js';
import { setReducedMotion, getReducedMotion } from './accessibility/accessibility-state.js';
import { focusSafe } from './accessibility/focus-safety.js';
import { announce, createLiveRegion } from './accessibility/live-region.js';
import { auditAccessibility } from './accessibility/accessibility-audit.js';

import { security } from './security/security-api.js';
import { securityAudit } from './security/security-audit.js';
import { safeHTML } from './security/safe-html.js';
import { safeSelector } from './security/safe-selector.js';
import { sanitizeOptions } from './security/safe-options.js';

import { normalizeOptions } from './core/animation-normalizer.js';
import { buildTransformAndFilter } from './core/transform-builder.js';
import { AnimationInstance } from './core/animation-instance.js';
import { createCSSDriver } from './drivers/css-driver.js';
import { createWAAPIDriver } from './drivers/waapi-driver.js';
import { createRAFDriver } from './drivers/raf-driver.js';

import { initData, refreshData, runData, bindAnimX } from './data/data-api.js';
import { observeScroll, refreshScroll, unobserveScroll } from './scroll/scroll-api.js';
import { bindScrollAnimX } from './scroll/scroll-observer.js';
import { Timeline, bindTimelineAnimX } from './timeline/timeline.js';
import { stagger, bindStaggerAnimX } from './stagger/stagger.js';
import { text, splitText, revertText, bindTextAnimX } from './text/text-api.js';
import { interact, hover, press, focus, magnetic, ripple, tilt, feedback, bindInteractionAnimX, destroyInteractions } from './interactions/interaction-api.js';
import { component, bindComponentAnimX } from './components/component-api.js';
import { scrollProgress, parallax, pin, scrollScene, readingProgress, destroyAdvancedScroll } from './scroll/advanced-scroll-api.js';
import { bindScrollSceneAnimX } from './scroll/scroll-scene.js';
import { refreshScrollMetrics, clearScrollTicker } from './scroll/scroll-ticker.js';
import { svg, svgDraw, svgUndraw, svgProgress, svgPathFollow, bindSvgAnimX, destroySvg } from './svg/svg-api.js';
import { cms, refreshCMS, observeCMS, disconnectCMS, getCMSRecipes, applyRecipe, bindCMSApi } from './cms/cms-api.js';
import { bindLayoutAnimX } from './layout/layout-api.js';
import { layoutPresets } from './layout/layout-presets.js';
import { bindGestureAnimX } from './gestures/gesture-api.js';
import { gesturePresets } from './gestures/gesture-presets.js';
import { cmsRecipes312 } from './cms/cms-recipes-v3-12.js'; // v3.26.0

// v3.26.0 Migration APIs
import { checkCompatibility } from './migration/compatibility-checker.js';
import { getDeprecations } from './migration/deprecation-checker.js';
import { migrateDataAttributes } from './migration/data-attribute-migrator.js';

// v3.26.0 Runtime Validation APIs
import { validateRuntime } from './runtime/runtime-validator.js';

// v3.26.0 Composer
import { compose, chain } from './composer/composer-api.js';
import { registerVariant, getVariant, getVariants } from './composer/variant-registry.js';
import { validateChain } from './composer/effect-conflict-resolver.js';
import { initComposerDOM } from './composer/composer-data-parser.js';

// v3.16.0 State
import { state, setState, getState, toggleState, trigger, rule, initStateDOM, destroyStateDOM } from './state/state-api.js';

// v3.17.0 Scroll Story & Responsive Motion
import { scrollStory, responsiveMotion, viewportMotion, validateScrollStory } from './scroll-story/scroll-story-api.js';

// v3.18.0 Advanced 3D Motion & Spatial Effects
import { spatial, depth, depthScene, destroySpatial } from './spatial/spatial-api.js';
import { threeD, perspective, validate3D } from './three-d/three-d-api.js';

// v3.19.0 Advanced Physics & Easing
import { easing, registerEase, getEase, getEases, validateEase } from './easing/easing-api.js';
import { physics, spring, inertia, bounce, snap, elastic, validatePhysics, destroyPhysics } from './physics/physics-api.js';

// v3.20.0 Advanced Text Typography
import { rollText, slotText, scrambleText, marqueeText, counterText, scrollText, kineticText, typeText, validateTextEffect, destroyTextEffects } from './text/advanced-text-api.js';

// v3.21.0 Advanced Media & Gallery Effects
import { media, imageReveal, imageMask, imageClip, mediaHover, mediaParallax, videoMotion, gallery, lightboxMotion, beforeAfter, validateMediaEffect, getMediaEffects, destroyMediaEffects } from './media/media-api.js';

// v3.22.0 Advanced Button, Link, Navigation, and Micro-Interaction Packs
import { button, link, nav, menu, dropdown, mobileMenu, micro, buttonState, navState, tabIndicator, validateInteractionEffect, getInteractionEffects } from './interactions/advanced-interaction-api.js';

// v3.23.0 Advanced Card, Grid, List, Table, and Dashboard Motion Packs
import { card, grid, list, table, dashboard, kpi, chartReveal, feed, kanban, filterSort, dataState, validateDataUIEffect, getDataUIEffects, destroyDataUI } from './data-ui/data-ui-api.js';

// v3.24.0 Advanced Form, Modal, Drawer, Toast, Tooltip, and UI Feedback Motion
import { form, input, validationMotion, checkbox, radio, switchEl as switchMotion, range, modal, drawer, toast, tooltip, popover, accordion, upload, progressFeedback, uiFeedback, validateFeedbackEffect, getFeedbackEffects, destroyFeedback } from './feedback/feedback-api.js';

// v3.25.0 Advanced Background, Decorative Motion, Ambient Effects, and Visual Atmosphere Packs
import { background, gradient, meshGradient, aurora, orbs, blobs, spotlight, cursorGlow, particleLite, noise, atmosphere, validateBackgroundEffect, getBackgroundEffects, destroyBackgrounds } from './backgrounds/background-api.js';

// v3.26.0 Advanced SVG, Icon, Logo, Path, and Infographic Motion Packs
import { svgRoute, icon, logo, lineArt, handwriting, infographic, svgChart, svgDiagram, validateSVGEffect, getSVGEffects, destroySVG } from './svg/advanced-svg-api.js';

const VERSION = '3.26.0';

// Optional Studio shortcut
export function studio() {
  if (typeof window !== 'undefined') {
    if (window.location.pathname.includes('animx.studio.html')) {
      console.log('[AnimX] Studio is already running.');
      return;
    }
    const currentUrl = window.location.href;
    const basePath = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    console.log('[AnimX] Launching AnimX Studio...');
    window.location.href = `${basePath}/animx.studio.html`;
  }
}

// Pre-register all presets
[...Object.values(cssPresets), ...componentPresets, ...expandedPresets, ...layoutPresets, ...Object.values(gesturePresets), ...elementPresets, ...cmsRecipes312].forEach(preset => {
  registerPreset(preset.name, preset);
});

class AnimXCore {
  constructor() {
    this.version = VERSION;
    this._instances = new Set();
    this._initialized = false;
    bindAnimX(this);
    bindScrollAnimX(this);
    bindTimelineAnimX(this);
    bindStaggerAnimX(this);
    bindTextAnimX(this);
    bindInteractionAnimX(this);
    bindComponentAnimX(this);
    bindScrollSceneAnimX(this);
    bindSvgAnimX(this);
    bindCMSApi(this);
    bindLayoutAnimX(this);
    bindGestureAnimX(this);
  }

  config(options) {
    if (options) {
      setConfig(options);
    }
    return getConfig();
  }

  // Accessibility APIs
  accessibility(options) {
    return accessibility(options);
  }
  
  a11y(options) {
    return accessibility(options);
  }
  
  auditAccessibility() {
    return auditAccessibility();
  }
  
  motionSafe(onSafe, onReduced) {
    return motionSafe(onSafe, onReduced);
  }
  
  setReducedMotion(mode) {
    return setReducedMotion(mode);
  }
  
  getReducedMotion() {
    return getReducedMotion();
  }
  
  focusSafe(selector, options) {
    return focusSafe(selector, options);
  }
  
  announce(message, options) {
    return announce(message, options);
  }
  
  createLiveRegion(options) {
    return createLiveRegion(options);
  }

  // Security APIs
  security(options) {
    return security(options);
  }

  securityAudit() {
    return securityAudit();
  }

  safeHTML(htmlString) {
    return safeHTML(htmlString);
  }

  safeSelector(selectorString) {
    return safeSelector(selectorString);
  }

  sanitizeOptions(options) {
    return sanitizeOptions(options);
  }

  productionCheck() {
    return productionCheck();
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    debug.info(`AnimX v${this.version} Initialized.`);
    
    const conf = getConfig();
    if (conf.cms && conf.cms.autoScan) {
      cms(document, { observe: conf.cms.observe });
    } else {
      initData();
    }
    refreshScroll();
  }

  ready(callback) {
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      callback();
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', callback);
    }
  }

  registerPreset(name, config) {
    return registerPreset(name, config);
  }

  getPreset(name) {
    return getPreset(name);
  }

  getPresets() {
    return getPresets();
  }
  
  getPresetsByCategory(category) {
    return getPresetsByCategory(category);
  }
  
  searchPresets(query) {
    return searchPresets(query);
  }
  
  findPreset(query) {
    return findPreset(query);
  }
  
  suggestPreset(query) {
    return suggestPreset(query);
  }
  
  getPresetTags() {
    return getPresetTags();
  }

  // DX APIs
  debug(enabled) {
    return toggleDebug(enabled);
  }
  
  inspect(selector) {
    return inspect(selector);
  }
  
  validate(scope) {
    return validate(scope);
  }
  
  diagnose() {
    return diagnose();
  }
  
  features() {
    return features();
  }
  
  detectIntegration() {
    return {
      jquery: typeof window !== 'undefined' && !!window.jQuery,
      wordpress: typeof window !== 'undefined' && (!!window.wp || document.body?.classList.contains('wp-admin') || document.body?.classList.contains('block-editor-page')),
      webflow: typeof window !== 'undefined' && !!window.Webflow,
      alpine: typeof window !== 'undefined' && !!window.Alpine,
      react: 'not-detectable',
      vue: 'not-detectable'
    };
  }
  
  versionInfo() {
    return versionInfo();
  }

  // --- Core API Bindings ---
  
  // v3.26.0 Migration APIs
  checkCompatibility() {
    return checkCompatibility();
  }

  getDeprecations() {
    return getDeprecations();
  }

  migrateDataAttributes(node, options) {
    return migrateDataAttributes(node, options);
  }

  // v3.26.0 Runtime Validation APIs
  validateRuntime() {
    return validateRuntime();
  }

  // Composer APIs
  compose(elements, effects) {
    return compose(elements, effects);
  }

  chain(elements, timeline) {
    return chain(elements, timeline);
  }

  registerVariant(name, config) {
    return registerVariant(name, config);
  }

  getVariant(name) {
    return getVariant(name);
  }

  getVariants() {
    return getVariants();
  }

  validateChain(timeline) {
    return validateChain(timeline);
  }

  // State APIs (v3.16.0)
  state(target, config) { return state(target, config); }
  setState(target, stateName) { return setState(target, stateName); }
  getState(target) { return getState(target); }
  toggleState(target, statesMap) { return toggleState(target, statesMap); }
  trigger(eventName, payload) { return trigger(eventName, payload); }
  rule(target, config) { return rule(target, config); }
  when(target, config) { return rule(target, config); }
  destroyStates() { return destroyStateDOM(); }

  // Scroll Story APIs (v3.17.0)
  scrollStory(target, config) { return scrollStory(target, config); }
  responsiveMotion(target, config) { return responsiveMotion(target, config); }
  viewportMotion(target, config) { return viewportMotion(target, config); }
  validateScrollStory(story) { return validateScrollStory(story); }

  // 3D Motion & Spatial APIs (v3.18.0)
  spatial(target, config) { return spatial(target, config); }
  depth(target, config) { return depth(target, config); }
  depthScene(target, config) { return depthScene(target, config); }
  threeD(target, config) { return threeD(target, config); }
  perspective(target, config) { return perspective(target, config); }
  validate3D(config) { return validate3D(config); }
  destroySpatial() { return destroySpatial(); }

  // Physics & Easing APIs (v3.26.0)
  easing(target, config) { return easing(target, config); }
  registerEase(name, bezierStr) { return registerEase(name, bezierStr); }
  getEase(name) { return getEase(name); }
  getEases() { return getEases(); }
  validateEase(bezierStr) { return validateEase(bezierStr); }
  physics(target, config) { return physics(target, config); }
  spring(target, config) { return spring(target, config); }
  inertia(target, config) { return inertia(target, config); }
  bounce(target, config) { return bounce(target, config); }
  snap(target, config) { return snap(target, config); }
  elastic(target, config) { return elastic(target, config); }
  validatePhysics(config) { return validatePhysics(config); }
  destroyPhysics() { return destroyPhysics(); }

  // Advanced Text APIs (v3.26.0)
  rollText(target, config) { return rollText(target, config); }
  slotText(target, config) { return slotText(target, config); }
  scrambleText(target, config) { return scrambleText(target, config); }
  marqueeText(target, config) { return marqueeText(target, config); }
  counterText(target, config) { return counterText(target, config); }
  scrollText(target, config) { return scrollText(target, config); }
  kineticText(target, config) { return kineticText(target, config); }
  typeText(target, config) { return typeText(target, config); }
  validateTextEffect(config) { return validateTextEffect(config); }
  destroyTextEffects() { return destroyTextEffects(); }

  // Advanced Media APIs (v3.26.0)
  media(target, config) { return media(target, config); }
  imageReveal(target, config) { return imageReveal(target, config); }
  imageMask(target, config) { return imageMask(target, config); }
  imageClip(target, config) { return imageClip(target, config); }
  mediaHover(target, config) { return mediaHover(target, config); }
  mediaParallax(target, config) { return mediaParallax(target, config); }
  videoMotion(target, config) { return videoMotion(target, config); }
  gallery(target, config) { return gallery(target, config); }
  lightboxMotion(target, config) { return lightboxMotion(target, config); }
  beforeAfter(target, config) { return beforeAfter(target, config); }
  validateMediaEffect(config) { return validateMediaEffect(config); }
  getMediaEffects() { return getMediaEffects(); }
  destroyMediaEffects() { return destroyMediaEffects(); }

  // Advanced Interaction APIs (v3.26.0)
  button(target, config) { return button(target, config); }
  link(target, config) { return link(target, config); }
  nav(target, config) { return nav(target, config); }
  menu(target, config) { return menu(target, config); }
  dropdown(target, config) { return dropdown(target, config); }
  mobileMenu(target, config) { return mobileMenu(target, config); }
  micro(target, config) { return micro(target, config); }
  buttonState(target, config) { return buttonState(target, config); }
  navState(target, config) { return navState(target, config); }
  tabIndicator(target, config) { return tabIndicator(target, config); }
  validateInteractionEffect(config) { return validateInteractionEffect(config); }
  getInteractionEffects() { return getInteractionEffects(); }

  // Advanced Data UI APIs (v3.26.0)
  card(target, config) { return card(target, config); }
  grid(target, config) { return grid(target, config); }
  list(target, config) { return list(target, config); }
  table(target, config) { return table(target, config); }
  dashboard(target, config) { return dashboard(target, config); }
  kpi(target, config) { return kpi(target, config); }
  chartReveal(target, config) { return chartReveal(target, config); }
  feed(target, config) { return feed(target, config); }
  kanban(target, config) { return kanban(target, config); }
  filterSort(target, config) { return filterSort(target, config); }
  dataState(target, config) { return dataState(target, config); }
  validateDataUIEffect(config) { return validateDataUIEffect(config); }
  getDataUIEffects() { return getDataUIEffects(); }
  destroyDataUI() { return destroyDataUI(); }

  // Advanced UI Feedback APIs (v3.26.0)
  form(target, config) { return form(target, config); }
  input(target, config) { return input(target, config); }
  validationMotion(target, config) { return validationMotion(target, config); }
  checkbox(target, config) { return checkbox(target, config); }
  radio(target, config) { return radio(target, config); }
  switch(target, config) { return switchMotion(target, config); }
  range(target, config) { return range(target, config); }
  modal(target, config) { return modal(target, config); }
  drawer(target, config) { return drawer(target, config); }
  toast(target, config) { return toast(target, config); }
  tooltip(target, config) { return tooltip(target, config); }
  popover(target, config) { return popover(target, config); }
  accordion(target, config) { return accordion(target, config); }
  upload(target, config) { return upload(target, config); }
  progressFeedback(target, config) { return progressFeedback(target, config); }
  uiFeedback(target, config) { return uiFeedback(target, config); }
  validateFeedbackEffect(config) { return validateFeedbackEffect(config); }
  getFeedbackEffects() { return getFeedbackEffects(); }
  destroyFeedback() { return destroyFeedback(); }

  // Advanced Background Motion APIs (v3.26.0)
  background(target, config) { return background(target, config); }
  gradient(target, config) { return gradient(target, config); }
  meshGradient(target, config) { return meshGradient(target, config); }
  aurora(target, config) { return aurora(target, config); }
  orbs(target, config) { return orbs(target, config); }
  blobs(target, config) { return blobs(target, config); }
  spotlight(target, config) { return spotlight(target, config); }
  cursorGlow(target, config) { return cursorGlow(target, config); }
  particleLite(target, config) { return particleLite(target, config); }
  noise(target, config) { return noise(target, config); }
  atmosphere(target, config) { return atmosphere(target, config); }
  validateBackgroundEffect(config) { return validateBackgroundEffect(config); }
  getBackgroundEffects() { return getBackgroundEffects(); }
  destroyBackgrounds() { return destroyBackgrounds(); }

  // Advanced SVG Motion APIs (v3.26.0)
  svgRoute(target, config) { return svgRoute(target, config); }
  icon(target, config) { return icon(target, config); }
  logo(target, config) { return logo(target, config); }
  lineArt(target, config) { return lineArt(target, config); }
  handwriting(target, config) { return handwriting(target, config); }
  infographic(target, config) { return infographic(target, config); }
  svgChart(target, config) { return svgChart(target, config); }
  svgDiagram(target, config) { return svgDiagram(target, config); }
  validateSVGEffect(config) { return validateSVGEffect(config); }
  getSVGEffects() { return getSVGEffects(); }
  destroySVG() { return destroySVG(); }
  
  getExamples(presetName) {
    return getExamples(presetName);
  }
  
  copyExample(presetName, type) {
    return copyExample(presetName, type);
  }

  // CMS / No-Code APIs
  cms(root, options) {
    return cms(root, options);
  }

  refreshCMS(root) {
    return refreshCMS(root);
  }

  observeCMS(root, options) {
    return observeCMS(root, options);
  }

  disconnectCMS() {
    return disconnectCMS();
  }

  getCMSRecipes() {
    return getCMSRecipes();
  }

  applyRecipe(target, recipeName) {
    return applyRecipe(target, recipeName);
  }

  refresh(root) {
    performanceMonitor.trackRefresh();
    refreshData(root);
    refreshScroll(root);
    refreshScrollMetrics();
  }
  
  refreshScroll(root) {
    refreshScroll(root);
    refreshScrollMetrics();
  }

  run(target) {
    runData(target);
  }
  
  scroll(target, options) {
    return observeScroll(target, options);
  }
  
  scrollProgress(target, options) {
    return scrollProgress(target, options);
  }
  
  parallax(target, options) {
    return parallax(target, options);
  }
  
  pin(target, options) {
    return pin(target, options);
  }
  
  scrollScene(target, options) {
    return scrollScene(target, options);
  }
  
  readingProgress(target, options) {
    return readingProgress(target, options);
  }
  
  unobserve(target) {
    unobserveScroll(target);
  }
  
  timeline(options) {
    return new Timeline(options);
  }
  
  stagger(targets, animationInput, options) {
    return stagger(targets, animationInput, options);
  }
  
  text(targets, options) {
    return text(targets, options);
  }
  
  splitText(targets, options) {
    return splitText(targets, options);
  }
  
  revertText(targets) {
    return revertText(targets);
  }
  
  textSwap(targets, options) {
    return text(targets, { ...options, type: 'swap' });
  }

  ticker(targets, options) {
    return text(targets, { ...options, type: 'ticker' });
  }

  counter(targets, options) {
    return text(targets, { ...options, type: 'counter' });
  }
  
  interact(targets, options) {
    return interact(targets, options);
  }
  
  hover(targets, animationOrOptions, options) {
    return hover(targets, animationOrOptions, options);
  }
  
  press(targets, animationOrOptions, options) {
    return press(targets, animationOrOptions, options);
  }
  
  focus(targets, animationOrOptions, options) {
    return focus(targets, animationOrOptions, options);
  }
  
  magnetic(targets, options) {
    return magnetic(targets, options);
  }
  
  ripple(targets, options) {
    return ripple(targets, options);
  }
  
  tilt(targets, options) {
    return tilt(targets, options);
  }
  
  feedback(targets, type, options) {
    return feedback(targets, type, options);
  }

  component(targets, presetName, options) {
    return component(targets, presetName, options);
  }

  svg(targets, options) {
    return svg(targets, options);
  }

  svgDraw(targets, options) {
    return svgDraw(targets, options);
  }

  svgUndraw(targets, options) {
    return svgUndraw(targets, options);
  }

  svgProgress(targets, options) {
    return svgProgress(targets, options);
  }

  svgPathFollow(targets, options) {
    return svgPathFollow(targets, options);
  }

  getComponentPresets() {
    return getComponentPresets();
  }

  getPresetCategories() {
    return getPresetCategories();
  }

  animate(selector, animationInput, options = {}) {
    const elements = normalizeSelector(selector);
    
    if (elements.length === 0) {
      if (options.debug || getConfig().debug) {
        debug.warn('AnimX.animate(): No targets found for selector', selector);
      }
      return createSafeInstance(elements);
    }
    
    // Route to stagger if multiple elements and stagger option exists
    if (elements.length > 1 && options.stagger && !options._isStaggerChild) {
      return this.stagger(elements, animationInput, options);
    }

    const normOptions = normalizeOptions(options);

    const drivers = elements.map(el => {
      // 1. String Preset (CSS Driver)
      if (typeof animationInput === 'string') {
        const preset = getPreset(animationInput);
        if (preset) {
          return createCSSDriver(el, preset, normOptions, null);
        } else {
          return null;
        }
      } 
      // 2. Custom JS Object (WAAPI or RAF Driver)
      else if (typeof animationInput === 'object' && animationInput.from && animationInput.to) {
        const fromFrame = buildTransformAndFilter(animationInput.from);
        const toFrame = buildTransformAndFilter(animationInput.to);
        const keyframes = [fromFrame, toFrame];
        
        if (typeof el.animate === 'function') {
          return createWAAPIDriver(el, keyframes, normOptions, null);
        } else {
          return createRAFDriver(el, keyframes, normOptions, null);
        }
      }
      return null;
    }).filter(Boolean);

    const instance = new AnimationInstance(elements, drivers);
    
    const boundDrivers = elements.map(el => {
      if (typeof animationInput === 'string') {
        const preset = getPreset(animationInput);
        return preset ? createCSSDriver(el, preset, normOptions, instance) : null;
      } else if (typeof animationInput === 'object' && animationInput.from && animationInput.to) {
        const keyframes = [
          buildTransformAndFilter(animationInput.from),
          buildTransformAndFilter(animationInput.to)
        ];
        return typeof el.animate === 'function' ? 
               createWAAPIDriver(el, keyframes, normOptions, instance) : 
               createRAFDriver(el, keyframes, normOptions, instance);
      }
    }).filter(Boolean);

    instance.drivers = boundDrivers;
    this._instances.add(instance);
    
    instance.play();
    return instance;
  }

  // Global Controls
  replay() {
    this._instances.forEach(inst => inst.replay());
  }

  reset() {
    this._instances.forEach(inst => inst.reset());
  }

  stop(selector) {
    if (selector) {
      const elements = normalizeSelector(selector);
      elements.forEach(el => {
        this._instances.forEach(instance => {
          if (instance.elements.includes(el)) instance.stop();
        });
      });
      destroyInteractions(selector);
      destroyAdvancedScroll(selector);
      destroySvg(selector);
    } else {
      this._instances.forEach(instance => instance.stop());
      this._instances.clear();
      destroyInteractions(document.body);
      destroyAdvancedScroll(document.body);
      destroySvg(document.body);
      clearScrollTicker();
    }
  }

  destroy(selector) {
    this.stop(selector);
    if (selector) {
      const elements = normalizeSelector(selector);
      elements.forEach(el => {
        el.dataset.axState = '';
        el.classList.remove('ax-animating', 'ax-paused');
        destroyInstances(el);
      });
    } else {
      const allEls = document.querySelectorAll('[data-ax-state], .ax-animating, .ax-paused');
      allEls.forEach(el => {
        el.dataset.axState = '';
        el.classList.remove('ax-animating', 'ax-paused');
        destroyInstances(el);
      });
    }
  }
}

const AnimX = new AnimXCore();
AnimX.studio = studio;
AnimX.build = {
  name: 'full',
  version: VERSION,
  checkCompatibility,
  getDeprecations,
  migrateDataAttributes,
  validateRuntime,
  compose,
  chain,
  registerVariant,
  getVariant,
  getVariants,
  validateChain,
  state,
  setState,
  getState,
  toggleState,
  trigger,
  rule,
  scrollStory,
  responsiveMotion,
  viewportMotion,
  validateScrollStory,
  spatial,
  depth,
  depthScene,
  threeD,
  perspective,
  validate3D,
  easing,
  registerEase,
  getEase,
  getEases,
  validateEase,
  physics,
  spring,
  inertia,
  bounce,
  snap,
  elastic,
  validatePhysics,
  destroyPhysics,
  rollText,
  slotText,
  scrambleText,
  marqueeText,
  counterText,
  scrollText,
  kineticText,
  typeText,
  validateTextEffect,
  destroyTextEffects,
  media,
  imageReveal,
  imageMask,
  imageClip,
  mediaHover,
  mediaParallax,
  videoMotion,
  gallery,
  lightboxMotion,
  beforeAfter,
  validateMediaEffect,
  getMediaEffects,
  destroyMediaEffects,
  button,
  link,
  nav,
  menu,
  dropdown,
  mobileMenu,
  micro,
  buttonState,
  navState,
  tabIndicator,
  validateInteractionEffect,
  getInteractionEffects,
  card,
  grid,
  list,
  table,
  dashboard,
  kpi,
  chartReveal,
  feed,
  kanban,
  filterSort,
  dataState,
  validateDataUIEffect,
  getDataUIEffects,
  destroyDataUI,
  form,
  input,
  validationMotion,
  checkbox,
  radio,
  switch: switchMotion,
  range,
  modal,
  drawer,
  toast,
  tooltip,
  popover,
  accordion,
  upload,
  progressFeedback,
  uiFeedback,
  validateFeedbackEffect,
  getFeedbackEffects,
  destroyFeedback,
  background,
  gradient,
  meshGradient,
  aurora,
  orbs,
  blobs,
  spotlight,
  cursorGlow,
  particleLite,
  noise,
  atmosphere,
  validateBackgroundEffect,
  getBackgroundEffects,
  destroyBackgrounds,
  svgRoute,
  icon,
  logo,
  lineArt,
  handwriting,
  infographic,
  svgChart,
  svgDiagram,
  validateSVGEffect,
  getSVGEffects,
  destroySVG,
  versionInfo: () => ({
      name: "AnimX",
      version: "3.26.0",
      release: "Advanced SVG, Icon, Logo, Path, and Infographic Motion Packs",
      dependency: "zero-runtime-dependency"
    }),
  modules: ['core', 'data', 'scroll', 'timeline', 'stagger', 'text', 'interactions', 'components', 'advanced-scroll', 'svg', 'cms', 'layout', 'gestures']
};

if (typeof window !== 'undefined') {
  window.AnimX = AnimX;
  
  if (typeof document !== 'undefined') {
    // Auto initialization
    const doAutoInit = () => {
      const conf = getConfig();
      if (conf.autoInit) AnimX.init();
      initComposerDOM();
      initStateDOM();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doAutoInit);
    } else {
      doAutoInit();
    }
  }
}

export default AnimX;
