import { useRef, type KeyboardEvent } from "react";
import { useControllableState } from "../../../behaviors/useControllableState";
import { useListNavigation } from "../../../behaviors/useListNavigation";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarRoster.scss";

export interface BazarRosterItem {
  /** Id estable. Es el valor que viaja en `value` y en `onChange`. */
  id: string;
  /** El ideograma del troquel de la fila. Decorativo. */
  kana: string;
  nombre: string;
  /** La línea chica: período, sector, lo que distinga la ficha. */
  meta?: string;
  disabled?: boolean;
}

export interface BazarRosterProps {
  items: readonly BazarRosterItem[];
  /** Modo controlado: el id elegido. */
  value?: string;
  /** Modo no controlado: el id que arranca elegido. */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /**
   * Prefijo de los ids del par pestaña/panel. Cada ficha anuncia el SUYO:
   *   pestaña → `${panelId}-tab-<id>`   ·   panel → `${panelId}-<id>`
   *
   * Quien lo usa tiene que poner ese id en cada panel y devolverle el
   * `aria-labelledby` de la pestaña. Sin esto un lector de pantalla oye
   * botones que no llevan a ninguna parte.
   */
  panelId?: string;
  /** Nombre accesible de la lista. Obligatorio: es un mando. */
  label: string;
  /** vertical (default) · horizontal — qué flechas navegan. */
  orientation?: "vertical" | "horizontal";
  className?: string;
}

/**
 * EL MAZO: la columna de fichas que elige a quién exhibe la vitrina — la
 * pantalla de selección de la referencia 2, donde el equipo rodea a quien
 * está en cartel.
 *
 * Semántica de PESTAÑAS, no de lista decorativa: cada ficha es un `tab`
 * que gobierna un panel, y las flechas mueven Y eligen (activación
 * automática, que es lo correcto cuando cambiar de panel no cuesta nada).
 * Home, End y el typeahead salen del comportamiento compartido, así que
 * este mando se navega igual que cualquier otro del sistema.
 */
export default function BazarRoster({
  items,
  value,
  defaultValue,
  onChange,
  panelId,
  label,
  orientation = "vertical",
  className,
}: BazarRosterProps) {
  const [elegido, elegir] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? items.find((i) => !i.disabled)?.id,
    onChange,
  });

  const nav = useListNavigation({ items, getLabel: (i) => i.nombre });
  const fichas = useRef<(HTMLButtonElement | null)[]>([]);

  const indice = items.findIndex((i) => i.id === elegido);

  /** Elige por índice y lleva el foco con él: mover sin foco parte el teclado. */
  const saltar = (destino: number) => {
    const item = items[destino];
    if (!item) return;
    elegir(item.id);
    fichas.current[destino]?.focus();
  };

  const teclas = (e: KeyboardEvent<HTMLDivElement>) => {
    const vertical = orientation === "vertical";
    const siguiente = vertical ? "ArrowDown" : "ArrowRight";
    const anterior = vertical ? "ArrowUp" : "ArrowLeft";

    switch (e.key) {
      case siguiente:
        saltar(nav.move(1, indice));
        break;
      case anterior:
        saltar(nav.move(-1, indice));
        break;
      case "Home":
        saltar(nav.first());
        break;
      case "End":
        saltar(nav.last());
        break;
      default:
        // Una letra suelta salta a la ficha que empieza por ella. Cualquier
        // otra tecla (Tab, F5, atajos con modificador) sigue su camino.
        if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
        saltar(nav.typeahead(e.key));
        break;
    }
    e.preventDefault();
  };

  return (
    <div
      className={cx("bazar-roster", `bazar-roster--${orientation}`, className)}
      role="tablist"
      aria-label={label}
      aria-orientation={orientation}
      onKeyDown={teclas}
    >
      {items.map((item, i) => {
        const activo = item.id === elegido;
        return (
          <button
            key={item.id}
            ref={(nodo) => {
              fichas.current[i] = nodo;
            }}
            type="button"
            role="tab"
            id={panelId ? `${panelId}-tab-${item.id}` : undefined}
            aria-selected={activo}
            aria-controls={panelId ? `${panelId}-${item.id}` : undefined}
            // Roving tabindex: el mazo entero es UNA parada de tabulación;
            // dentro se navega con flechas. Doce fichas no deberían costar
            // doce tabuladas para llegar al contenido de abajo.
            tabIndex={activo ? 0 : -1}
            disabled={item.disabled}
            className={cx("bazar-roster__ficha", activo && "is-activa")}
            onClick={() => elegir(item.id)}
          >
            <span className="bazar-roster__kana" aria-hidden="true">
              {item.kana}
            </span>
            <span className="bazar-roster__texto">
              <span className="bazar-roster__nombre">{item.nombre}</span>
              {item.meta && <span className="bazar-roster__meta">{item.meta}</span>}
            </span>
            {/* El cursor dibujado de la referencia: apunta a la ficha en
                cartel. Decorativo — el estado real ya lo dice aria-selected. */}
            <svg className="bazar-roster__cursor" viewBox="0 0 16 20" aria-hidden="true">
              <path
                d="M2 1.6 13.4 9.2 8.2 10.3 11 17.2 8.4 18.3 5.6 11.5 2 15.2z"
                fill="currentColor"
                stroke="var(--bazar-tinta)"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
