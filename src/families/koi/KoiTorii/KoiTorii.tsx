import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiTorii.scss";

export interface KoiToriiProps {
  /** Ancho en px. Default: 220. */
  size?: number;
  /** Silueta: hinomaru (sun, default), dorado linterna o tinta nocturna. */
  tone?: "sun" | "gold" | "ink";
  /** Si viene, el torii es informativo (role img); si no, decorativo. */
  label?: string;
  className?: string;
}

/**
 * Torii KOI: la puerta del festival en silueta — kasagi curvado, doble
 * dintel y pilares con base. Pensado como pieza de ESCENA (fondos, capas
 * de parallax, cabeceras): un solo path, escala limpia a cualquier tamaño.
 */
export default function KoiTorii({ size = 220, tone = "sun", label, className }: KoiToriiProps) {
  return (
    <svg
      viewBox="0 0 220 170"
      width={size}
      className={cx("koi-torii", `koi-torii--${tone}`, className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {/* Kasagi: el dintel superior curvado con las puntas levantadas. */}
      <path d="M6 34 Q110 6 214 34 L210 48 Q110 24 10 48 Z" />
      {/* Nuki: el travesaño recto. */}
      <rect x="26" y="62" width="168" height="12" rx="2" />
      {/* Gakuzuka: el soporte central entre dinteles. */}
      <rect x="103" y="40" width="14" height="24" />
      {/* Pilares, apenas inclinados hacia adentro, con base. */}
      <path d="M38 44 L58 44 L54 158 L42 158 Z" />
      <path d="M162 44 L182 44 L178 158 L166 158 Z" />
      <rect x="36" y="156" width="26" height="10" rx="2" />
      <rect x="158" y="156" width="26" height="10" rx="2" />
    </svg>
  );
}
