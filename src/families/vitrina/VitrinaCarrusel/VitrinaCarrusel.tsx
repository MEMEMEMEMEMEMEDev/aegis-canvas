import { Children, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaCarrusel.scss";

export interface VitrinaCarruselProps {
  /** Nombre de la región. Obligatorio. */
  label: string;
  /** Ancho de cada tarjeta: "16rem", "min(78vw, 18rem)". */
  ancho?: string;
  /** Sin flechas (en táctil se deslizan con el dedo igual). */
  sinFlechas?: boolean;
  /** Puntos de posición debajo. */
  puntos?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Carrusel VITRINA: la fila de tarjetas que se desliza de lado — novedades,
 * más vendidos, relacionados. scroll-snap encaja cada tarjeta, las flechas
 * avanzan de una en una midiendo el ancho real de la primera, y los puntos
 * siguen a la tarjeta que más se ve (IntersectionObserver, no scroll math).
 */
export default function VitrinaCarrusel({ label, ancho = "16rem", sinFlechas = false, puntos = false, className, children }: VitrinaCarruselProps) {
  const pista = useRef<HTMLUListElement>(null);
  const [activo, setActivo] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const lista = pista.current;
    if (!lista || !puntos || typeof IntersectionObserver === "undefined") return undefined;
    const hijos = Array.from(lista.children);
    const io = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActivo(hijos.indexOf(visible.target));
      },
      { root: lista, threshold: [0.6] },
    );
    hijos.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [puntos, items.length]);

  function mover(paso: 1 | -1) {
    const lista = pista.current;
    const primera = lista?.firstElementChild as HTMLElement | null;
    if (!lista || !primera) return;
    const salto = primera.getBoundingClientRect().width + 12;
    const reposo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lista.scrollBy({ left: paso * salto, behavior: reposo ? "auto" : "smooth" });
  }

  function ir(i: number) {
    const lista = pista.current;
    const hijo = lista?.children[i] as HTMLElement | undefined;
    if (!lista || !hijo) return;
    const reposo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lista.scrollTo({ left: hijo.offsetLeft - lista.offsetLeft, behavior: reposo ? "auto" : "smooth" });
  }

  return (
    <section className={cx("vitrina-carrusel", className)} aria-label={label} aria-roledescription="carrusel" style={{ "--vitrina-tarjeta": ancho } as CSSProperties}>
      {!sinFlechas && (
        <div className="vitrina-carrusel__flechas">
          <button type="button" className="vitrina-carrusel__flecha vitrina-carrusel__flecha--izq" onClick={() => mover(-1)} aria-label="Anterior">
            <VitrinaPicto name="chevron-izq" size={18} />
          </button>
          <button type="button" className="vitrina-carrusel__flecha vitrina-carrusel__flecha--der" onClick={() => mover(1)} aria-label="Siguiente">
            <VitrinaPicto name="chevron-der" size={18} />
          </button>
        </div>
      )}

      <ul className="vitrina-carrusel__pista" ref={pista}>
        {items.map((hijo, i) => (
          <li className="vitrina-carrusel__tarjeta" key={i}>
            {hijo}
          </li>
        ))}
      </ul>

      {puntos && items.length > 1 && (
        <div className="vitrina-carrusel__puntos">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cx("vitrina-carrusel__punto", i === activo && "is-activo")}
              onClick={() => ir(i)}
              aria-label={`Ir a ${i + 1} de ${items.length}`}
              aria-current={i === activo ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
