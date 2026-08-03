import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoLog.scss";

export interface DomoLogItem {
  /** Línea de operación ("Montando mini-contrato"). */
  texto: string;
  /** Dato secundario a la derecha ("--koi-* × 6", una url, un hash…). */
  detalle?: string;
}

export interface DomoLogProps {
  items: DomoLogItem[];
  /**
   * Índice del paso en curso: lo anterior queda ✓, lo posterior en espera.
   * `items.length` = todo completado (bitácora cerrada).
   */
  paso?: number;
  /** Nombre del proceso para lectores de pantalla ("transferencia"). */
  label: string;
  className?: string;
}

/**
 * Bitácora de operaciones DOMO: el instrumento cuenta qué está haciendo,
 * línea a línea y en ticks secos — ✓ hecho, ▸ en curso (cursor latiendo),
 * · en cola. Controlable por `paso` desde fuera: sirve igual para narrar
 * una transferencia en vivo que para dejar el informe cerrado de un viaje.
 */
export default function DomoLog({ items, paso = items.length, label, className }: DomoLogProps) {
  return (
    <ol className={cx("domo-log", className)} role="log" aria-label={label}>
      {items.map((item, i) => {
        const estado = i < paso ? "is-lista" : i === paso ? "is-actual" : undefined;
        return (
          <li key={`${i}-${item.texto}`} className={cx("domo-log__linea", estado)}>
            <span className="domo-log__marca" aria-hidden="true">
              {i < paso ? "✓" : i === paso ? "▸" : "·"}
            </span>
            <span className="domo-log__texto">{item.texto}</span>
            {item.detalle && <span className="domo-log__detalle">{item.detalle}</span>}
          </li>
        );
      })}
    </ol>
  );
}
