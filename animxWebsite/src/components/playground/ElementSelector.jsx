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
            className={`element-tile ${selected === el.id ? 'active' : ''}`}
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