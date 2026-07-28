import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiBarcode.scss";

export interface DenkiBarcodeProps {
  /** Dígitos bajo las barras. */
  code?: string;
  /** Alto de las barras en px. */
  height?: number;
  className?: string;
}

/**
 * Código de barras DENKI: el sello de producto del pie del póster.
 * Decorativo (aria-hidden): las barras son gradientes, no un EAN real.
 */
export default function DenkiBarcode({
  code = "4 901234 567894",
  height = 34,
  className,
}: DenkiBarcodeProps) {
  return (
    <span className={cx("denki-barcode", className)} aria-hidden="true">
      <span className="denki-barcode__bars" style={{ height }} />
      <span className="denki-barcode__code">{code}</span>
    </span>
  );
}
