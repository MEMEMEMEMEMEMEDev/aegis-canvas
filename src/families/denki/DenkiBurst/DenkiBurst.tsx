import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiBurst.scss";

export interface DenkiBurstProps {
  /** Texto del estallido ("12,000¥", "OPEN TO WORK"). */
  children: string;
  /** Diámetro en px. */
  size?: number;
  /** Fondo crema (default) o bermellón. */
  tone?: "cream" | "red";
  /** Grados de rotación del sticker. */
  tilt?: number;
  /** Latido sutil de "oferta". */
  pulse?: boolean;
  className?: string;
}

// Estrella de 12 puntas precalculada (determinista, sin Math.random).
const POINTS = Array.from({ length: 24 }, (_, i) => {
  const r = i % 2 === 0 ? 47 : 36;
  const a = (i * Math.PI) / 12 - Math.PI / 2;
  return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
}).join(" ");

/**
 * Ráfaga DENKI: el estallido de precio del póster — estrella dentada con
 * borde de tinta y texto al centro. El sticker de "¡oferta!" de todo
 * catálogo que se respete.
 */
export default function DenkiBurst({
  children,
  size = 120,
  tone = "cream",
  tilt = -8,
  pulse = true,
  className,
}: DenkiBurstProps) {
  // Textos largos se parten en dos líneas y la fuente se encoge para
  // caber dentro de la estrella (Anton ≈ 0.55em por carácter).
  const words = children.split(" ");
  const lines =
    children.length <= 9 || words.length === 1
      ? [children]
      : [
          words.slice(0, Math.ceil(words.length / 2)).join(" "),
          words.slice(Math.ceil(words.length / 2)).join(" "),
        ];
  const widest = Math.max(...lines.map((l) => l.length));
  const fontSize = Math.min(15, 118 / (widest + 1));

  return (
    <span
      className={cx("denki-burst", `denki-burst--${tone}`, pulse && "is-pulsing", className)}
      style={{ width: size, height: size, rotate: `${tilt}deg` }}
      role="img"
      aria-label={children}
    >
      <svg viewBox="-50 -50 100 100" aria-hidden="true">
        <polygon className="denki-burst__star" points={POINTS} />
        <text className="denki-burst__text" x="0" y="0" style={{ fontSize }}>
          {lines.map((line, i) => (
            <tspan
              key={i}
              x="0"
              dy={i === 0 ? `${(-(lines.length - 1) / 2) * 1.05}em` : "1.05em"}
            >
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
}
