/**
 * AnimX Advanced UI Feedback Motion API (v3.26.0)
 */

import { initForm } from './form-motion-engine.js';
import { initInput } from './input-motion-engine.js';
import { initValidation } from './validation-motion-engine.js';
import { initCheckbox } from './checkbox-radio-engine.js';
import { initSwitch } from './switch-range-engine.js';
import { initModal } from './modal-motion-engine.js';
import { initDrawer } from './drawer-motion-engine.js';
import { initToast } from './toast-motion-engine.js';
import { initTooltip } from './tooltip-motion-engine.js';
import { initAccordion } from './accordion-motion-engine.js';
import { initUpload } from './upload-motion-engine.js';
import { initProgress } from './progress-feedback-engine.js';

export function form(target, config) { initForm(target, config); }
export function input(target, config) { initInput(target, config); }
export function validationMotion(target, config) { initValidation(target, config); }
export function checkbox(target, config) { initCheckbox(target, config); }
export function radio(target, config) { initCheckbox(target, config); } // Handled together
export function switchEl(target, config) { initSwitch(target, config); }
export function range(target, config) { initSwitch(target, config); } // Handled together
export function modal(target, config) { initModal(target, config); }
export function drawer(target, config) { initDrawer(target, config); }
export function toast(target, config) { initToast(target, config); }
export function tooltip(target, config) { initTooltip(target, config); }
export function popover(target, config) { initTooltip(target, config); } // Handled together
export function accordion(target, config) { initAccordion(target, config); }
export function upload(target, config) { initUpload(target, config); }
export function progressFeedback(target, config) { initProgress(target, config); }
export function uiFeedback(target, config) { console.log('Init UI feedback', target, config); }

export function validateFeedbackEffect(config) {
  if (!config) return { ok: false, errors: ['No config provided'] };
  return { ok: true, errors: [] };
}

export function getFeedbackEffects() {
  return [];
}

export function destroyFeedback() {
  console.log('[AnimX UI Feedback] Destroyed');
}
