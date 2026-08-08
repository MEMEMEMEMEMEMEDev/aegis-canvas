import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqBarcode.scss";

export interface DisqBarcodeProps {
  /** Dígitos impresos bajo las barras. */
  code: string;
  /** Alto de las barras en px. */
  height?: number;
  className?: string;
}

/**
 * Código de barras DISQUETE.
 *
 * Los grosores NO son aleatorios: salen de los caracteres del propio código,
 * así que el mismo código dibuja siempre el mismo patrón. Es lo que separa
 * un código de barras de una fila de rayas — y además evita que cada build
 * genere un dibujo distinto y toda captura de pantalla parezca un cambio.
 */
export default function DisqBarcode({ code, height = 34, className }: DisqBarcodeProps) {
  // Cuatro grosores, elegidos por el carácter. Un patrón denso necesita más
  // barras que caracteres, así que se recorre el código dos veces y media.
  const barras = Array.from({ length: Math.max(24, code.length * 3) }, (_, i) => {
    const codigo = code.charCodeAt(i % code.length) + i;
    return 1 + (codigo % 4);
  });

  return (
    <span className={cx("disq-barcode", className)} role="img" aria-label={`Código ${code}`}>
      <span className="disq-barcode__bars" style={{ height } as CSSProperties} aria-hidden="true">
        {barras.map((grosor, i) => (
          <i key={i} style={{ flexGrow: grosor } as CSSProperties} />
        ))}
      </span>
      <span className="disq-barcode__code" aria-hidden="true">
        {code}
      </span>
    </span>
  );
}
