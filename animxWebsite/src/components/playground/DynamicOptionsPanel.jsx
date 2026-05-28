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