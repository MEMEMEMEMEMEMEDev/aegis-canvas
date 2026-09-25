import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoQR.scss";

export interface PliegoQRProps {
  /**
   * La matriz del código, `true` = módulo oscuro. El canvas NO genera el QR
   * (no carga un codificador en cada app que no lo usa): lo calcula quien lo
   * usa (p. ej. `qrcode-generator`) y lo pasa hecho.
   */
  matriz: boolean[][];
  /** Qué abre el código, en palabras: el QR no dice nada a un lector de pantalla. */
  label: string;
  /** Lado en px. */
  lado?: number;
  className?: string;
}

/**
 * El QR como pieza de imprenta: módulos cuadrados en tinta sobre hoja, zona
 * de silencio de 4 módulos (sin ella muchos lectores no lo leen) y las
 * marcas de registro en las esquinas. Entra "impreso" por filas.
 */
export default function PliegoQR({ matriz, label, lado = 240, className }: PliegoQRProps) {
  const n = matriz.length;
  const total = n + 8;
  return (
    <span className={cx("pliego-qr", className)} style={{ width: lado, height: lado } as CSSProperties}>
      <svg viewBox={`0 0 ${total} ${total}`} width={lado} height={lado} role="img" aria-label={label} shapeRendering="crispEdges">
        <rect width={total} height={total} fill="var(--pliego-hoja)" />
        {matriz.map((fila, y) => (
          <g key={y} className="pliego-qr__fila" style={{ "--pliego-i": y } as CSSProperties}>
            {fila.map((m, x) => (m ? <rect key={x} x={x + 4} y={y + 4} width={1} height={1} /> : null))}
          </g>
        ))}
      </svg>
    </span>
  );
}
