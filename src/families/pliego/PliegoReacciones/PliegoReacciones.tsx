import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoReacciones.scss";

export interface PliegoReaccionOpcion {
  id: string;
  /** El signo que se ve: "✳", "!", "?"… o un emoji. */
  glifo: string;
  /** Lo que dice, y lo que lee un lector de pantalla. */
  label: string;
}

export interface PliegoReaccionFlotante {
  /** Único: se usa como key mientras sube. */
  key: string;
  glifo: string;
  /** 0..1: por dónde sube, de izquierda a derecha. */
  x: number;
}

export interface PliegoReaccionesProps {
  opciones: PliegoReaccionOpcion[];
  onReaccionar: (id: string) => void;
  /** Cuántas de cada una en el último rato, para el número al lado. */
  conteos?: Record<string, number>;
  /**
   * Las que están subiendo ahora. Las pone y las saca quien usa el
   * componente (≈ 2 s de vida): el componente sólo las anima.
   */
  flotando?: PliegoReaccionFlotante[];
  /** Entre dos toques, el botón descansa (el servidor también limita). */
  enPausa?: boolean;
  className?: string;
}

/**
 * Reacciones anónimas de la audiencia: una botonera y, encima, los signos
 * subiendo. Sin texto libre a propósito: en una sala pública lo que no se
 * puede escribir no se puede usar para insultar.
 *
 * Los flotantes son aria-hidden: un lector de pantalla que anuncia cada
 * aplauso ajeno deja de leer los subtítulos, que es lo único que importa.
 */
export default function PliegoReacciones({
  opciones, onReaccionar, conteos = {}, flotando = [], enPausa = false, className,
}: PliegoReaccionesProps) {
  return (
    <div className={cx("pliego-reacciones", className)}>
      <div className="pliego-reacciones__cielo" aria-hidden="true">
        {flotando.map((f) => (
          <span key={f.key} className="pliego-reacciones__flota"
            style={{ "--pliego-x": f.x, "--pliego-giro": `${(f.x - 0.5) * 30}deg` } as CSSProperties}>
            {f.glifo}
          </span>
        ))}
      </div>
      <div className="pliego-reacciones__botonera" role="group" aria-label="Reaccionar">
        {opciones.map((o) => (
          <button key={o.id} type="button" className="pliego-reacciones__boton" disabled={enPausa}
            onClick={() => onReaccionar(o.id)} aria-label={o.label}>
            <span className="pliego-reacciones__glifo" aria-hidden="true">{o.glifo}</span>
            <span className="pliego-reacciones__nombre" aria-hidden="true">{o.label}</span>
            {conteos[o.id] ? <span className="pliego-reacciones__conteo">{conteos[o.id]}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
