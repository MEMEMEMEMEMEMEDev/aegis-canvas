import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export type DismissReason = "escape" | "outside";

export interface UseDismissOptions {
  /** Escuchar o no. */
  active: boolean;
  /** Nodos considerados "dentro" (no disparan el cierre). */
  refs: ReadonlyArray<RefObject<Element | null>>;
  onDismiss: (reason: DismissReason, event: KeyboardEvent | PointerEvent) => void;
}

/**
 * Cierre por Escape o pointerdown fuera de los nodos dados.
 * Un solo par de listeners en document, activos solo mientras `active`.
 */
export function useDismiss({ active, refs, onDismiss }: UseDismissOptions): void {
  const refsRef = useRef(refs);
  refsRef.current = refs;
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!active) return undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismissRef.current("escape", e);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      const inside =
        target instanceof Node &&
        refsRef.current.some((r) => r.current?.contains(target));
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
