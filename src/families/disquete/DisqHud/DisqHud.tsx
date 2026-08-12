import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqHud.scss";

export interface DisqHudProps {
  children: ReactNode;
  /**
   * Las celdas de la fila de lectura ("06 DISCOS", "03 CASOS"…). Son datos
   * REALES y se leen: no van aria-hidden. El punto que parpadea al lado sí
   * es decoración.
   */
  readout?: readonly string[];
  /** Rótulo accesible de la fila de lectura. */
  readoutLabel?: string;
  className?: string;
}

/**
 * HUD DISQUETE: el marco de interfaz de videojuego. Cuatro esquinas de
 * mira, una fila de lectura con su indicador respirando, y dentro lo que
 * sea — la portada de un mundo, una sección que merece marco.
 *
 * Las esquinas son spans con dos bordes: cero imágenes, cero SVG. El marco
 * no encierra con un borde completo porque un HUD no es una caja: son las
 * cuatro pinzas que dicen "esto está en pantalla, enfocado".
 */
export default function DisqHud({ children, readout, readoutLabel = "Datos", className }: DisqHudProps) {
  return (
    <div className={cx("disq-hud", className)}>
      <span className="disq-hud__esquina disq-hud__esquina--tl" aria-hidden="true" />
      <span className="disq-hud__esquina disq-hud__esquina--tr" aria-hidden="true" />
      <span className="disq-hud__esquina disq-hud__esquina--bl" aria-hidden="true" />
      <span className="disq-hud__esquina disq-hud__esquina--br" aria-hidden="true" />

      {readout && readout.length > 0 && (
        <p className="disq-hud__readout" aria-label={readoutLabel}>
          <span className="disq-hud__pulso" aria-hidden="true" />
          {readout.map((celda, i) => (
            <span className="disq-hud__celda" key={i}>
              {celda}
            </span>
          ))}
        </p>
      )}

      <div className="disq-hud__cuerpo">{children}</div>
    </div>
  );
}
