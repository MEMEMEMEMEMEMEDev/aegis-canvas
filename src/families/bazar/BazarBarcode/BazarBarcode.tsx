import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarBarcode.scss";

export interface BazarBarcodeProps {
  /** El texto bajo las barras. Visible y legible — es contenido. */
  code: string;
  /** Grados de rotación de la etiqueta. */
  angle?: number;
  className?: string;
}

// Las barras salen del propio código: mismo texto, mismas barras, en
// cualquier render. No hay Math.random — un código de barras que cambia
// entre build y build no es un código de barras.
const barras = (code: string): number[] => {
  const semilla = [...code].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return Array.from({ length: 26 }, (_, i) => ((semilla * (i + 3) + i * 7) % 3) + 1);
};

/** La etiqueta de código de barras pegada al empaque. */
export default function BazarBarcode({ code, angle = -4, className }: BazarBarcodeProps) {
  let x = 0;
  return (
    <span
      className={cx("bazar-barcode", className)}
      style={{ "--bazar-barcode-angulo": `${angle}deg` } as React.CSSProperties}
    >
      <svg viewBox="0 0 60 18" preserveAspectRatio="none" aria-hidden="true">
        {barras(code).map((ancho, i) => {
          const rect = <rect key={i} x={x} y="0" width={ancho} height="18" />;
          x += ancho + 1.2;
          return rect;
        })}
      </svg>
      <span className="bazar-barcode__codigo">{code}</span>
    </span>
  );
}
