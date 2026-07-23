import { useEffect, useRef } from "react";

/**
 * Cierre por Escape o pointerdown fuera de los nodos dados.
 * Un solo par de listeners en document, activos solo mientras `active`.
 *
 * @param {object} opts
 * @param {boolean} opts.active                    escuchar o no
 * @param {Array<{current: Element|null}>} opts.refs  nodos considerados "dentro"
 * @param {(reason: "escape"|"outside", event: Event) => void} opts.onDismiss
 */
export function useDismiss({ active, refs, onDismiss }) {
  const refsRef = useRef(refs);
  refsRef.current = refs;
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!active) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onDismissRef.current("escape", e);
    };
    const onPointerDown = (e) => {
      const inside = refsRef.current.some(
        (r) => r.current && r.current.contains(e.target),
      );
      if (!inside) onDismissRef.current("outside", e);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [active]);
}
