import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarInventario.scss";

export interface BazarInventarioProps {
  titulo: string;
  /** Etiqueta del título: "h3" cuando la bolsa es una subsección. */
  as?: ElementType;
  /** El ideograma del troquel de la bolsa. Decorativo. */
  kana?: string;
  /** La línea chica bajo el título. */
  sub?: string;
  /** Las piezas. Cada una ocupa una casilla. */
  items: readonly string[];
  /**
   * Casillas mínimas de la rejilla. Si sobran, se dibujan VACÍAS — una
   * bolsa a medio llenar es información en un inventario, y rellenar el
   * hueco con casillas falsas sería inventar equipo.
   */
  casillas?: number;
  /** rosa (default) · morado */
  tone?: "rosa" | "morado";
  /** Grados de rotación de la bolsa. */
  rotate?: number;
  className?: string;
}

/**
 * EL INVENTARIO: una bolsa de equipo con sus casillas — la rejilla de
 * objetos de cualquier pantalla de personaje, con la impresión del bazar.
 *
 * Cada casilla lleva su número de ranura y el nombre completo de la pieza:
 * es un inventario que además se LEE, porque lo que guarda es el stack de
 * alguien y no un icono de poción.
 */
export default function BazarInventario({
  titulo,
  as: Titulo = "p",
  kana,
  sub,
  items,
  casillas = 0,
  tone = "rosa",
  rotate = 0,
  className,
}: BazarInventarioProps) {
  const vacias = Math.max(0, casillas - items.length);

  return (
    <section
      className={cx("bazar-bolsa", `bazar-bolsa--${tone}`, className)}
      style={rotate ? { rotate: `${rotate}deg` } : undefined}
    >
      <header className="bazar-bolsa__cabecera">
        {kana && (
          <span className="bazar-bolsa__kana" lang="ja" aria-hidden="true">
            {kana}
          </span>
        )}
        <span className="bazar-bolsa__titulos">
          <Titulo className="bazar-bolsa__titulo">{titulo}</Titulo>
          {sub && <span className="bazar-bolsa__sub">{sub}</span>}
        </span>
        <span className="bazar-bolsa__cuenta" aria-hidden="true">
          {String(items.length).padStart(2, "0")}
        </span>
      </header>

      <ul className="bazar-bolsa__rejilla">
        {items.map((item, i) => (
          <li key={item} className="bazar-bolsa__casilla">
            <span className="bazar-bolsa__ranura" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="bazar-bolsa__pieza">{item}</span>
          </li>
        ))}
        {Array.from({ length: vacias }, (_, i) => (
          <li key={`vacia-${i}`} className="bazar-bolsa__casilla is-vacia" aria-hidden="true" />
        ))}
      </ul>
    </section>
  );
}
