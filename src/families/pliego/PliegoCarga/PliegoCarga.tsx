import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoCarga.scss";

export interface PliegoCargaProps {
  /** Qué se está montando. */
  title: string;
  /** Las líneas del arranque, en orden. */
  lines: string[];
  /** Segundos que dura la secuencia entera. */
  duration?: number;
  /** Rótulo del pie, a la derecha de la barra. */
  readout?: string;
  className?: string;
}

/**
 * La secuencia de arranque: el cartel de carga de un juego, con sus líneas
 * apareciendo una a una y la barra llenándose.
 *
 * Es CSS de cabo a rabo — ni un temporizador, ni estado, ni un re-render.
 * Un cartel de carga que necesita JavaScript para desaparecer es un cartel
 * que se queda puesto cuando el JavaScript falla, y eso es exactamente lo
 * peor que puede pasarle a una pantalla de bienvenida.
 *
 * El texto NO va oculto para lectores: las líneas dicen qué trae el demo
 * ("128 productos de prueba"), así que quien lo escucha las recibe de una
 * vez, sin el escalonado, que es como debe recibirlas.
 */
export default function PliegoCarga({
  title,
  lines,
  duration = 2,
  readout,
  className,
}: PliegoCargaProps) {
  const estilo = {
    "--pliego-carga-dur": `${duration}s`,
    "--pliego-carga-n": lines.length || 1,
  } as CSSProperties;

  return (
    <div className={cx("pliego-carga", className)} style={estilo}>
      <p className="pliego-carga__titulo">{title}</p>

      <ol className="pliego-carga__lineas">
        {lines.map((linea, i) => (
          <li className="pliego-carga__linea" key={i} style={{ "--i": i } as CSSProperties}>
            <span className="pliego-carga__punto" aria-hidden="true" />
            {linea}
          </li>
        ))}
      </ol>

      <p className="pliego-carga__pie">
        <span className="pliego-carga__riel" aria-hidden="true">
          <span className="pliego-carga__lleno" />
        </span>
        {readout && (
          <span className="pliego-carga__readout" aria-hidden="true">
            {readout}
          </span>
        )}
      </p>
    </div>
  );
}
