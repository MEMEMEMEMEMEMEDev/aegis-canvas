import { Children, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../calco.scss";
import "./CalcoCarrete.scss";

export interface CalcoCarreteProps {
  /** Nombre del carrete. Obligatorio: es una región y hay que anunciarla. */
  label: string;
  /** Ancho de cada tarjeta. Una medida CSS: "16rem", "min(80vw, 20rem)". */
  ancho?: string;
  /** Sin flechas: solo el deslizamiento. */
  sinFlechas?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * El carrete: una fila de tarjetas que se desliza de lado, como la fila de
 * juegos de una consola. Es la única forma de scroll permitida fuera de una
 * ventana, y es HORIZONTAL y por dentro: la página no se mueve.
 *
 * Con scroll-snap cada tarjeta se encaja sola, y las flechas avanzan de una
 * en una midiendo el ancho real de la primera. En táctil las flechas
 * sobran —se desliza con el dedo— y se esconden.
 */
export default function CalcoCarrete({ label, ancho = "16rem", sinFlechas = false, className, children }: CalcoCarreteProps) {
  const pista = useRef<HTMLUListElement>(null);

  function mover(paso: 1 | -1) {
    const lista = pista.current;
    const primera = lista?.firstElementChild as HTMLElement | null;
    if (!lista || !primera) return;
    const salto = primera.getBoundingClientRect().width + 12;
    lista.scrollBy({ left: paso * salto, behavior: "smooth" });
  }

  return (
    <section
      className={cx("calco-carrete", className)}
      aria-label={label}
      aria-roledescription="carrete"
      style={{ "--calco-tarjeta": ancho } as CSSProperties}
    >
      {!sinFlechas && (
        <div className="calco-carrete__flechas">
          <button type="button" className="calco-carrete__flecha" onClick={() => mover(-1)} aria-label="Anterior">
            ◀
          </button>
          <button type="button" className="calco-carrete__flecha" onClick={() => mover(1)} aria-label="Siguiente">
            ▶
          </button>
        </div>
      )}

      <ul className="calco-carrete__pista" ref={pista}>
        {Children.map(children, (hijo, i) => (
          <li className="calco-carrete__tarjeta" key={i}>
            {hijo}
          </li>
        ))}
      </ul>
    </section>
  );
}
