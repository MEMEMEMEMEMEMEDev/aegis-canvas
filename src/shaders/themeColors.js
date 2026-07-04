// =============================================================================
// Theme-color bridge  —  reads the foundation's semantic CSS custom properties
// and exposes them as [r,g,b] floats (0–1) for shader uniforms. This is what
// keeps every effect *monochrome-correct*: the shader paints in the theme's
// own ink/paper/accent, so it re-skins with the theme and never introduces a
// colour the design system didn't sanction.
// =============================================================================

const cache = new Map();

function parseColor(str) {
  if (!str) return null;
  str = str.trim();
  if (str[0] === "#") {
    let h = str.slice(1);
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    if (h.length < 6) return null;
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    ];
  }
  const m = str.match(/\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(/[,\s/]+/).map(parseFloat);
    return [(p[0] || 0) / 255, (p[1] || 0) / 255, (p[2] || 0) / 255];
  }
  return null;
}

export function themeColor(name, fallback = [0, 0, 0]) {
  if (cache.has(name)) return cache.get(name);
  let value = "";
  if (typeof window !== "undefined") {
    value = getComputedStyle(document.documentElement).getPropertyValue(name);
  }
  const rgb = parseColor(value) || fallback;
  cache.set(name, rgb);
  return rgb;
}

// Invalidate when the theme flips (data-theme / class / inline style change).
if (typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
  const mo = new MutationObserver(() => cache.clear());
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class", "style"],
  });
}
