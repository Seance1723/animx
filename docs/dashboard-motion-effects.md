# Dashboard Motion Effects (v3.23.0)

The dashboard pipeline combines Staggered Grids, KPI odometer counters (`AnimX.kpi()`), and Chart helpers (`AnimX.chartReveal()`).

## Chart Helper Engine
Rather than importing a massive charting dependency like Chart.js or Recharts, `AnimX.chartReveal()` assumes your dashboard provides pre-rendered SVG nodes or DOM bars, and applies zero-dependency width/height entrance scaling to them.

```javascript
AnimX.dashboard('.admin-dashboard', { effect: 'dashboard-grid-stagger' });
AnimX.chartReveal('.svg-chart', { effect: 'chart-bar-grow' });
```
