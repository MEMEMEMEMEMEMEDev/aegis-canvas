import { useCallback } from "react";
import { useReposo } from "./useReposo";

/**
 * El vuelo al carrito, sin librerías: se clona la lámina del producto, se
 * fija donde estaba, y con la Web Animations API describe una parábola
 * hasta el primer `[data-vitrina-cesta]` visible (la cabecera en
 * escritorio, la pestaña en el teléfono). Al aterrizar, el destino recibe
 * `data-pulso="1"` durante un instante y su badge late.
 *
 * El clon vive fuera del scope (en body), por eso la lámina lleva sus
 * colores inline. Con reduced-motion no hay clon: el aviso ya lo cuenta.
 */
export function useVueloAlCarrito() {
  const reposo = useReposo();

  return useCallback(
    (origen: HTMLElement) => {
      if (reposo || typeof document === "undefined" || typeof origen.animate !== "function") return;

      const destinos = Array.from(document.querySelectorAll<HTMLElement>("[data-vitrina-cesta]"));
      const destino = destinos.find((d) => d.getClientRects().length > 0 && getComputedStyle(d).visibility !== "hidden");
      if (!destino) return;

      const a = origen.getBoundingClientRect();
      const b = destino.getBoundingClientRect();
      if (a.width === 0) return;

      const clon = origen.cloneNode(true) as HTMLElement;
      clon.setAttribute("aria-hidden", "true");
      Object.assign(clon.style, {
        position: "fixed",
        left: `${a.left}px`,
        top: `${a.top}px`,
        width: `${a.width}px`,
        height: `${a.height}px`,
        margin: "0",
        zIndex: "2000",
        pointerEvents: "none",
        willChange: "transform, opacity",
        borderRadius: getComputedStyle(origen).borderRadius,
      } as CSSStyleDeclaration);
      document.body.appendChild(clon);

      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);

      const anim = clon.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) scale(0.55)`, opacity: 0.95, offset: 0.45 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.4 },
        ],
        { duration: 620, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "forwards" },
      );

      const aterriza = () => {
        clon.remove();
        destino.dataset.pulso = "1";
        window.setTimeout(() => {
          delete destino.dataset.pulso;
        }, 420);
      };
      anim.finished.then(aterriza, aterriza);
    },
    [reposo],
  );
}
