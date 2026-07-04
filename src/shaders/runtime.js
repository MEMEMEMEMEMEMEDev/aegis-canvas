// =============================================================================
// Shared shader scheduler  —  ONE requestAnimationFrame loop for every live
// ShaderSurface on the page. Each surface registers a draw(t) callback; the
// clock only advances while running and pauses when the tab is hidden, so N
// stacked effects cost one RAF, not N. (Context-per-canvas is still per
// surface — a shared-context / render-to-texture pool is the next step when we
// need *many* at once.)
// =============================================================================

const drawers = new Set();
let rafId = null;
let last = null;
let elapsed = 0;

function frame(now) {
  if (last === null) last = now;
  elapsed += (now - last) / 1000;
  last = now;
  drawers.forEach((d) => {
    try {
      d(elapsed);
    } catch {
      /* a single bad surface must not kill the loop */
    }
  });
  rafId = requestAnimationFrame(frame);
}

function ensureRunning() {
  if (rafId === null && drawers.size > 0 && typeof document !== "undefined" && !document.hidden) {
    last = null;
    rafId = requestAnimationFrame(frame);
  }
}

function stop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
    last = null;
  }
}

export function registerDrawer(fn) {
  drawers.add(fn);
  ensureRunning();
  return () => {
    drawers.delete(fn);
    if (drawers.size === 0) stop();
  };
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else ensureRunning();
  });
}
