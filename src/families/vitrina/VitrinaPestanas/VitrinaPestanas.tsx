import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import type { PictoUiName } from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaPestanas.scss";

export interface VitrinaPestanaItem {
  id: string;
  label: string;
  icono: PictoUiName;
  /** Cifra en el globo (la cesta). 0 no se enseña. */
  badge?: number;
}

export interface VitrinaPestanasProps {
  items: VitrinaPestanaItem[];
  /** Nombre del nav. Obligatorio. */
  label: string;
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Pestañas VITRINA: la barra de abajo de una app de teléfono — Inicio,
 * Buscar, Cesta, Favoritos, Cuenta. Es un <nav> con `aria-current="page"`
 * (navegan, no cambian paneles: no es un tablist), con tabulación rodante
 * y flechas. Cambia AL PULSAR, no al enfocar. La cesta lleva
 * `data-vitrina-cesta`: es el destino del vuelo cuando la cabecera
 * compacta no lo tiene a la vista.
 */
export default function VitrinaPestanas({ items, label, value, onChange, className }: VitrinaPestanasProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activo = Math.max(0, items.findIndex((i) => i.id === value));

  function teclas(e: KeyboardEvent<HTMLDivElement>) {
    const foco = refs.current.findIndex((r) => r === document.activeElement);
    const desde = foco < 0 ? activo : foco;
    const n = items.length;
    let destino: number | null = null;
    if (e.key === "ArrowRight") destino = (desde + 1) % n;
    else if (e.key === "ArrowLeft") destino = (desde - 1 + n) % n;
    else if (e.key === "Home") destino = 0;
    else if (e.key === "End") destino = n - 1;
    if (destino === null) return;
    e.preventDefault();
    refs.current[destino]?.focus();
  }

  return (
    <nav className={cx("vitrina-pestanas", className)} aria-label={label}>
      <div className="vitrina-pestanas__fila" onKeyDown={teclas}>
        {items.map((item, i) => {
          const es = item.id === value;
          return (
            <button
              key={item.id}
              ref={(n) => {
                refs.current[i] = n;
              }}
              type="button"
              className={cx("vitrina-pestanas__tecla", es && "is-activa")}
              aria-current={es ? "page" : undefined}
              tabIndex={es ? 0 : -1}
              onClick={() => onChange(item.id)}
              {...(item.id === "cesta" ? { "data-vitrina-cesta": "" } : {})}
            >
              <span className="vitrina-pestanas__icono" aria-hidden="true">
                <VitrinaPicto name={item.icono} size={22} />
                {item.badge ? <span className="vitrina-pestanas__badge">{item.badge > 99 ? "99+" : item.badge}</span> : null}
              </span>
              <span className="vitrina-pestanas__label">{item.label}</span>
              {item.badge ? <span className="vitrina-pestanas__sr">, {item.badge} artículos</span> : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
