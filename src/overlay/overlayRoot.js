// =============================================================================
// Overlay root  —  the single, body-level mount point for ALL overlays
// (modals, drawers, toasts, popovers) across the host and every MFE.
//
// It lives as a direct child of <body>, so it sits OUTSIDE any MFE slot and
// outside any ancestor with transform/filter/overflow — the things that would
// otherwise trap or clip a `position: fixed` element. Anything portaled here
// escapes to the real viewport, no matter how deeply nested the caller is.
//
// Framework-agnostic on purpose: a child MFE with its own React instance can
// still reach the same DOM node by id. (Theme flows anyway via :root CSS vars.)
// =============================================================================

const ROOT_ATTR = "data-ds-overlay-root";

/** Returns the shared overlay root, creating it once if needed. */
export function getOverlayRoot() {
  if (typeof document === "undefined") return null; // SSR guard

  let el = document.querySelector(`[${ROOT_ATTR}]`);
  if (!el) {
    el = document.createElement("div");
    el.setAttribute(ROOT_ATTR, "");
    document.body.appendChild(el);
  }
  return el;
}
