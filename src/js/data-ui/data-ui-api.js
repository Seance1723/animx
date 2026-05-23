/**
 * AnimX Advanced Data UI API (v3.26.0)
 */

import { initCard } from './card-motion-engine.js';
import { initGrid } from './grid-motion-engine.js';
import { initList } from './list-motion-engine.js';
import { initTable } from './table-motion-engine.js';
import { initDashboard } from './dashboard-motion-engine.js';
import { initKPI } from './kpi-motion-engine.js';
import { initChartReveal } from './chart-reveal-engine.js';
import { initFeed } from './feed-motion-engine.js';
import { initKanban } from './kanban-motion-engine.js';
import { initFilterSort } from './filter-sort-motion-engine.js';
import { initDataState } from './data-state-motion-engine.js';

export function card(target, config) { initCard(target, config); }
export function grid(target, config) { initGrid(target, config); }
export function list(target, config) { initList(target, config); }
export function table(target, config) { initTable(target, config); }
export function dashboard(target, config) { initDashboard(target, config); }
export function kpi(target, config) { initKPI(target, config); }
export function chartReveal(target, config) { initChartReveal(target, config); }
export function feed(target, config) { initFeed(target, config); }
export function kanban(target, config) { initKanban(target, config); }
export function filterSort(target, config) { initFilterSort(target, config); }
export function dataState(target, config) { initDataState(target, config); }

export function validateDataUIEffect(config) {
  if (!config) return { ok: false, errors: ['No config provided'] };
  return { ok: true, errors: [] };
}

export function getDataUIEffects() {
  return [];
}

export function destroyDataUI() {
  console.log('[AnimX Data UI] Destroyed');
}
