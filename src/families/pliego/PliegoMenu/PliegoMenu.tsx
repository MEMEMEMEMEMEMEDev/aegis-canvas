import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoMenu.scss";

export interface PliegoMenuItem {
  id: string;
  /** El rótulo grande. En minúsculas, como manda la familia. */
  label: string;
  /** Kanji al margen. Decorativo. */
  kana?: string;
  /** Segunda línea: categoría, estado, plazo. */
  meta?: string;
  /** Si la entrada navega, su URL. Sin ella es un botón y avisa por onSelect. */
  href?: string;
  disabled?: boolean;
}

export interface PliegoMenuProps {
  items: PliegoMenuItem[];
  /** Nombre del menú. Obligatorio: una lista de opciones sin nombre no se navega. */
  label: string;
  /** El id de la entrada bajo el cursor. Controlado. */
  value?: string;
  /** Cuando el cursor se mueve (teclado, foco o ratón). */
  onChange?: (id: string) => void;
  /** Cuando se activa una entrada SIN href (las que tienen href navegan solas). */
  onSelect?: (item: PliegoMenuItem) => void;
  /** Numera las entradas: 01, 02, 03… */
  numerado?: boolean;
  className?: string;
}

/**
 * El menú de PLIEGO: la lista de opciones de un juego, con su cursor, sus
 * flechas y la fila elegida invertida en negro.
 *
 * Tabulación rodante y no una parada por entrada: un menú de cinco discos que
 * se come cinco tabulaciones convierte "seguir hasta el contenido" en una
 * penitencia. Se entra al menú con una tabulación, se recorre con las
 * flechas —que es como se recorre un menú— y se sale con otra. Inicio y Fin
 * saltan a los extremos.
 *
 * El cursor se mueve con el FOCO, no con la selección: mover el cursor y
 * elegir son dos cosas distintas, y confundirlas es lo que hace que un menú
 * navegue a la primera opción en cuanto lo tocas.
 */
export default function PliegoMenu({
  items,
  label,
  value,
  onChange,
  onSelect,
  numerado = true,
  className,
}: PliegoMenuProps) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  const activo = value ?? items[0]?.id;
  const indiceActivo = Math.max(
    0,
    items.findIndex((i) => i.id === activo),
  );

  // El vecino, dando la vuelta. NO se salta los deshabilitados, y es a
  // propósito: un demo en montaje sigue siendo una fila del cargador y quien
  // lo recorre con el teclado tiene el mismo derecho a enterarse de que
  // existe y de que todavía no se abre. Por eso las filas inertes se marcan
  // con `aria-disabled` en vez de con `disabled`, que las sacaría del
  // recorrido y las volvería invisibles para quien no mira la pantalla.
  const vecino = (desde: number, paso: number) => {
    const n = items.length;
    return (((desde + paso) % n) + n) % n;
  };

  function irA(i: number) {
    const item = items[i];
    if (!item) return;
    refs.current[i]?.focus();
    onChange?.(item.id);
  }

  function teclas(evento: KeyboardEvent<HTMLUListElement>) {
    switch (evento.key) {
      case "ArrowDown":
      case "ArrowRight":
        evento.preventDefault();
        irA(vecino(indiceActivo, 1));
        break;
      case "ArrowUp":
      case "ArrowLeft":
        evento.preventDefault();
        irA(vecino(indiceActivo, -1));
        break;
      case "Home":
        evento.preventDefault();
        irA(0);
        break;
      case "End":
        evento.preventDefault();
        irA(items.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <nav className={cx("pliego-menu", className)} aria-label={label}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <ul className="pliego-menu__lista" onKeyDown={teclas}>
        {items.map((item, i) => {
          const esActivo = item.id === activo;
          const navega = Boolean(item.href) && !item.disabled;

          // Lo que comparten las dos formas de la entrada. El elemento NO se
          // elige con una variable polimórfica: `disabled` existe en <button>
          // y no en <a>, y un componente cuyo tipo hay que forzar con `as`
          // para que compile es un componente que miente sobre lo que emite.
          const comun = {
            className: cx("pliego-menu__opcion", esActivo && "is-activo"),
            // Rodante: solo la entrada bajo el cursor entra en la secuencia
            // de tabulación; las demás se alcanzan con flechas.
            tabIndex: esActivo ? 0 : -1,
            "aria-current": esActivo ? ("true" as const) : undefined,
            "aria-disabled": item.disabled || undefined,
            onFocus: () => onChange?.(item.id),
            onMouseEnter: () => onChange?.(item.id),
          };

          const dentro = (
            <>
              <span className="pliego-menu__cursor" aria-hidden="true">
                ▶
              </span>

              {numerado && (
                <span className="pliego-menu__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}

              <span className="pliego-menu__texto">
                <span className="pliego-menu__label">{item.label}</span>
                {item.meta && <span className="pliego-menu__meta">{item.meta}</span>}
              </span>

              {item.kana && (
                <span className="pliego-menu__kana" aria-hidden="true">
                  {item.kana}
                </span>
              )}
            </>
          );

          return (
            <li className="pliego-menu__fila" key={item.id}>
              {navega ? (
                <a
                  {...comun}
                  ref={(nodo) => {
                    refs.current[i] = nodo;
                  }}
                  href={item.href}
                >
                  {dentro}
                </a>
              ) : (
                <button
                  {...comun}
                  ref={(nodo) => {
                    refs.current[i] = nodo;
                  }}
                  type="button"
                  onClick={() => {
                    // Inerte pero enfocable: se puede llegar a ella y oír que
                    // está deshabilitada, pero pulsarla no hace nada.
                    if (!item.disabled) onSelect?.(item);
                  }}
                >
                  {dentro}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
