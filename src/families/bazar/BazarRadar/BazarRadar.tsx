import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarRadar.scss";

export interface BazarRadarProps {
  /** Rótulo bajo el disco. Sin él, el radar es decoración pura. */
  label?: string;
  /** Lectura chica a la derecha del rótulo. */
  readout?: string;
  /** Diámetro del disco, en rem. */
  size?: number;
  /** Cuántos ecos hay en el barrido (0–5). */
  ecos?: number;
  tone?: "rosa" | "morado";
  className?: string;
}

// Posiciones de los ecos, en porcentaje del disco. Fijas y no aleatorias: un
// componente que se dibuja distinto en cada render es un componente que no se
// puede comparar entre dos capturas, y este vive en un portafolio que se
// audita con capturas.
const ECOS = [
  { x: 68, y: 32 },
  { x: 33, y: 61 },
  { x: 74, y: 70 },
  { x: 22, y: 30 },
  { x: 52, y: 18 },
];

/**
 * EL RADAR: el disco con la aguja barriendo — el mueble que dice "esta
 * pantalla está encendida" sin tener que anunciarlo con palabras.
 *
 * La aguja da una vuelta cada ocho segundos y los ecos laten una vez por
 * vuelta, desfasados. No hay nada que parpadee ni cambie de brillo de golpe:
 * es el ritmo de un instrumento, no el de una alarma.
 *
 * El disco entero es decorativo. Con `label` se anuncia el rótulo y nada
 * más — lo que el radar "mide" no es un dato, y fingir que lo es sería
 * exactamente el gráfico decorativo que esta familia no se permite.
 */
export default function BazarRadar({
  label,
  readout,
  size = 7,
  ecos = 3,
  tone = "rosa",
  className,
}: BazarRadarProps) {
  const cuantos = Math.max(0, Math.min(ecos, ECOS.length));

  return (
    <div
      className={cx("bazar-radar", `bazar-radar--${tone}`, className)}
      style={{ "--radar-size": `${size}rem` } as CSSProperties}
    >
      <span className="bazar-radar__disco" aria-hidden="true">
        <span className="bazar-radar__anillos" />
        <span className="bazar-radar__cruz" />
        <span className="bazar-radar__aguja" />
        {ECOS.slice(0, cuantos).map((eco, i) => (
          <span
            className="bazar-radar__eco"
            key={i}
            style={
              {
                left: `${eco.x}%`,
                top: `${eco.y}%`,
                // El eco late cuando la aguja pasa por encima: el retardo es
                // el ángulo del punto convertido a fracción de la vuelta.
                "--eco-retardo": `${(i * 8) / cuantos}s`,
              } as CSSProperties
            }
          />
        ))}
      </span>

      {label && (
        <p className="bazar-radar__pie">
          <span className="bazar-radar__label">{label}</span>
          {readout && (
            <span className="bazar-radar__readout" aria-hidden="true">
              {readout}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
