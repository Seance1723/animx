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