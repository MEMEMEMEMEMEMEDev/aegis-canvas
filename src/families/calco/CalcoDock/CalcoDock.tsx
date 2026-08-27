import { useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../calco.scss";
import "./CalcoDock.scss";

export interface CalcoDockItem {
  id: string;
  label: string;
  /** El glifo grande: un emoji, un carácter, un SVG. */
  icono: ReactNode;
  /** Kanji chico bajo el icono. Decorativo. */
  kana?: string;
  disabled?: boolean;
}

export interface CalcoDockProps {
  items: CalcoDockItem[];
  /** Nombre del dock. Obligatorio: es un tablist y hay que anunciarlo. */
  label: string;
  /** El id del elemento elegido. Controlado. */
  value: string;
  onChange: (id: string) => void;
  /**
   * Prefijo de los paneles que controla: `${panelId}-${item.id}`. Sin él,
   * las teclas son botones a secas y no tabs.
   */
  panelId?: string;
  /** Algo suelto a la derecha del dock: una pegatina, un botón. */
  extra?: ReactNode;
  className?: string;
}

/**
 * El dock: la barra de pestañas de abajo de una app de teléfono, con los
 * cuatro o cinco sitios a los que se puede ir. Es lo que hace que la
 * pantalla se lea como app y no como web, y por eso va pegado al borde de
 * abajo y respeta la barra de gestos del aparato.
 *
 * Es un tablist de verdad: tabulación rodante, flechas, Inicio/Fin. Y el
 * cambio ocurre AL PULSAR, no al mover el foco — en un dock, pasar por una
 * pestaña con las flechas no debería cambiar de pantalla.
 */
export default function CalcoDock({ items, label, value, onChange, panelId, extra, className }: CalcoDockProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const indiceActivo = Math.max(
    0,
    items.findIndex((i) => i.id === value),
  );

  const vecino = (desde: number, paso: number) => {
    const n = items.length;
    return (((desde + paso) % n) + n) % n;
  };

  function teclas(evento: KeyboardEvent<HTMLDivElement>) {
    const foco = refs.current.findIndex((r) => r === document.activeElement);
    const desde = foco < 0 ? indiceActivo : foco;
    let destino: number | null = null;

    switch (evento.key) {
      case "ArrowRight":
        destino = vecino(desde, 1);
        break;
      case "ArrowLeft":
        destino = vecino(desde, -1);
        break;
      case "Home":
        destino = 0;
        break;
      case "End":
        destino = items.length - 1;
        break;
      default:
        return;
    }
    evento.preventDefault();
    refs.current[destino]?.focus();
  }

  return (
    <nav className={cx("calco-dock", className)} aria-label={label}>
      <div className="calco-dock__teclas" role={panelId ? "tablist" : undefined} onKeyDown={teclas}>
        {items.map((item, i) => {
          const activa = item.id === value;
          return (
            <button
              key={item.id}
              ref={(nodo) => {
                refs.current[i] = nodo;
              }}
              type="button"
              className={cx("calco-dock__tecla", activa && "is-activa")}
              role={panelId ? "tab" : undefined}
              id={panelId ? `${panelId}-tab-${item.id}` : undefined}
              aria-selected={panelId ? activa : undefined}
              aria-controls={panelId ? `${panelId}-${item.id}` : undefined}
              aria-pressed={panelId ? undefined : activa}
              aria-disabled={item.disabled || undefined}
              tabIndex={activa ? 0 : -1}
              onClick={() => {
                if (!item.disabled) onChange(item.id);
              }}
            >
              <span className="calco-dock__icono" aria-hidden="true">
                {item.icono}
              </span>
              <span className="calco-dock__label">{item.label}</span>
              {item.kana && (
                <span className="calco-dock__kana" aria-hidden="true">
                  {item.kana}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {extra && <div className="calco-dock__extra">{extra}</div>}
    </nav>
  );
}
