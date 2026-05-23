# 3D Motion Performance (v3.18.0)

The pointer tracking mechanism in AnimX caches DOM bounding rectangles and strictly queues updates via `requestAnimationFrame`. If the mouse leaves the document or stops moving, the loop yields control back to the browser immediately to preserve laptop battery and mobile CPU efficiency.
