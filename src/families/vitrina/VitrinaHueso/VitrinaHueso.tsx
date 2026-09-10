import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaHueso.scss";

export interface VitrinaHuesoProps {
  /** linea (texto), bloque (un botón, un banner), circulo (un avatar) o lamina (la foto). */
  forma?: "linea" | "bloque" | "circulo" | "lamina";
  /** Medida CSS. Las líneas por defecto ocupan el ancho. */
  ancho?: string;
  alto?: string;
  /** Solo linea: cuántas, con la última más corta. */
  lineas?: number;
  className?: string;
}

/**
 * Hueso VITRINA: el skeleton — el gris cálido con una banda de brillo que
 * cruza mientras llega lo de verdad. Cuatro formas y dos presets, y el
 * grupo que los envuelve dice "cargando" una sola vez (aria-busy).
 */
export default function VitrinaHueso({ forma = "linea", ancho, alto, lineas = 1, className }: VitrinaHuesoProps) {
  if (forma === "linea" && lineas > 1) {
    return (
      <span className={cx("vitrina-hueso-lineas", className)} aria-hidden="true">
        {Array.from({ length: lineas }, (_, i) => (
          <span key={i} className="vitrina-hueso vitrina-hueso--linea" style={{ width: i === lineas - 1 ? "62%" : ancho ?? "100%", height: alto } as CSSProperties} />
        ))}
      </span>
    );
  }
  return <span className={cx("vitrina-hueso", `vitrina-hueso--${forma}`, className)} style={{ width: ancho, height: alto } as CSSProperties} aria-hidden="true" />;
}

/** Envoltorio de una pantalla o bloque en carga: aria-busy + "Cargando" una vez. */
export function VitrinaHuesoGrupo({ label = "Cargando", className, children }: { label?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cx("vitrina-hueso-grupo", className)} aria-busy="true" role="status" aria-label={label}>
      {children}
    </div>
  );
}

/** Preset: una tarjeta de producto. */
export function VitrinaHuesoTarjeta({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <span className={cx("vitrina-hueso-tarjeta", horizontal && "vitrina-hueso-tarjeta--horizontal")} aria-hidden="true">
      <VitrinaHueso forma="lamina" />
      <span className="vitrina-hueso-tarjeta__cuerpo">
        <VitrinaHueso forma="linea" ancho="40%" alto="0.6rem" />
        <VitrinaHueso forma="linea" lineas={2} />
        <VitrinaHueso forma="linea" ancho="35%" alto="1rem" />
      </span>
    </span>
  );
}

/** Preset: una línea de cesta o pedido. */
export function VitrinaHuesoLinea() {
  return (
    <span className="vitrina-hueso-linea" aria-hidden="true">
      <VitrinaHueso forma="lamina" ancho="4.5rem" alto="4.5rem" />
      <span className="vitrina-hueso-linea__cuerpo">
        <VitrinaHueso forma="linea" lineas={2} />
        <VitrinaHueso forma="bloque" ancho="6rem" alto="2rem" />
      </span>
      <VitrinaHueso forma="linea" ancho="4rem" alto="1rem" />
    </span>
  );
}
