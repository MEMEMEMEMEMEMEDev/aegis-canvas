/**
 * Une clases condicionalmente: cx("ds-x", isOpen && "is-open", className).
 * Acepta strings, falsy (se ignoran) y arrays anidados.
 */
export function cx(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(" ");
}
