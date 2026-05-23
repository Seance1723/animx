# Physics Performance (v3.19.0)

To prevent battery drain from infinite floating-point calculations, the AnimX physics engine utilizes a hard `maxDuration` cap (default: 5000ms). Any tween exceeding this cap is instantly flagged as `done`, halting the `requestAnimationFrame` loop.
