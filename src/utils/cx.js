/**
 * Join class names, dropping any falsy values.
 *
 *   cx("ds-x", cond && "ds-x--on", undefined, className)  →  "ds-x ds-x--on …"
 *
 * The canonical way to compose BEM classes across the design system.
 */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default cx;
