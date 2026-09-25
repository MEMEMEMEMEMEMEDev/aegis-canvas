import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoTicker.scss";

export interface PliegoTickerItem {
  id: string;
  contenido: ReactNode;
}

export interface PliegoTickerProps {
  items: PliegoTickerItem[];
  /** Nombre de la cinta: "Estado de las salas". */
  label: string;
  /** Segundos por vuelta completa. */
  vuelta?: number;
  className?: string;
}

/**
 * La cinta que corre: el estado de todas las salas pasando, como el rótulo
 * de salidas de una estación. Se detiene con el puntero o el foco (quien
 * quiere leer, lee), y con movimiento reducido es una lista quieta que
 * envuelve.
 *
 * La lista va DOS veces para que la vuelta no tenga salto; la segunda copia
 * está oculta a los lectores de pantalla, que leen cada sala una vez.
 */
export default function PliegoTicker({ items, label, vuelta = 40, className }: PliegoTickerProps) {
  const lista = (copia: boolean) => (
    <ul className="pliego-ticker__lista" aria-hidden={copia || undefined}>
      {items.map((it) => (
        <li key={it.id} className="pliego-ticker__item">
          <span className="pliego-ticker__ast" aria-hidden="true">✳</span>
          {it.contenido}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cx("pliego-ticker", className)} role="region" aria-label={label} tabIndex={0}
      style={{ "--pliego-ticker-vuelta": `${vuelta}s` } as CSSProperties}>
      <div className="pliego-ticker__riel">
        {lista(false)}
        {lista(true)}
      </div>
    </div>
  );
}
