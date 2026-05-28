export default function PowerPreview() {
  return (
    <section className="power-preview">
      <h2>Power Preview</h2>
      <div className="preview-strip">
        <div className="preview-item" data-ax="fade-up">Fade</div>
        <div className="preview-item" data-ax="zoom-in">Zoom</div>
        <div className="preview-item" data-ax="flip">Flip</div>
      </div>
    </section>
  );
}