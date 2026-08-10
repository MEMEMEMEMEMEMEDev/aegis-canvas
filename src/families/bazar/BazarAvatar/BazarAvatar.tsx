import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarAvatar.scss";

export type BazarAvatarShape = "bolsa" | "visor" | "gato" | "robo";

export interface BazarAvatarProps {
  /** bolsa (anónimo con bolsa de papel) · visor · gato · robo. */
  shape?: BazarAvatarShape;
  /** papel (default) · rosa · morado — el fondo del marco. */
  tone?: "papel" | "rosa" | "morado";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Los avatares anónimos del foro: caras genéricas con ojos de rejilla,
 * como los usuarios de la referencia 3. Siempre decorativos — el nombre
 * va en texto al lado, nunca dentro del dibujo.
 */
export default function BazarAvatar({
  shape = "bolsa",
  tone = "papel",
  size = "md",
  className,
}: BazarAvatarProps) {
  // El patrón de rejilla de los ojos necesita un id ÚNICO por instancia:
  // con un id fijo, dos avatares en la misma página se roban el patrón.
  const grid = useId().replace(/:/g, "");

  const ojo = (cx0: number, cy: number, r = 7) => (
    <>
      <circle cx={cx0} cy={cy} r={r} fill={`url(#g-${grid})`} stroke="currentColor" strokeWidth="2" />
    </>
  );

  return (
    <span
      className={cx("bazar-avatar", `bazar-avatar--${tone}`, `bazar-avatar--${size}`, className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48">
        <defs>
          <pattern id={`g-${grid}`} width="3.2" height="3.2" patternUnits="userSpaceOnUse">
            <rect width="3.2" height="3.2" fill="var(--bazar-label)" />
            <rect width="1.7" height="1.7" x="0.75" y="0.75" fill="currentColor" />
          </pattern>
        </defs>

        {shape === "bolsa" && (
          <g>
            <path
              d="M10 8h28v30l-3.5 4-3.5-4-3.5 4-3.5-4-3.5 4-3.5-4-3.5 4-3.5-4z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M15 8l3 7M33 8l-3 7" stroke="currentColor" strokeWidth="1.6" fill="none" />
            {ojo(18, 24)}
            {ojo(30, 24)}
          </g>
        )}

        {shape === "visor" && (
          <g>
            <path
              d="M24 6c9 0 15 6 15 15v10c0 6-6 11-15 11S9 37 9 31V21c0-9 6-15 15-15z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path d="M9 22h30" stroke="currentColor" strokeWidth="2" />
            {ojo(17, 27, 6.5)}
            {ojo(31, 27, 6.5)}
            <path d="M23.5 27h1" stroke="currentColor" strokeWidth="2" />
          </g>
        )}

        {shape === "gato" && (
          <g>
            <path
              d="M10 20l-2-12 10 6c2-1 4-1.5 6-1.5s4 .5 6 1.5l10-6-2 12c1.5 2.5 2 5 2 7 0 9-7 15-16 15S8 36 8 27c0-2 .5-4.5 2-7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {ojo(17, 28, 6)}
            {ojo(31, 28, 6)}
            <path d="M22 35h4l-2 2.5z" fill="currentColor" />
          </g>
        )}

        {shape === "robo" && (
          <g>
            <rect
              x="9"
              y="14"
              width="30"
              height="26"
              rx="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path d="M24 14V7M24 7h6" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="32" cy="7" r="2.5" fill="currentColor" />
            {ojo(18, 27, 6)}
            {ojo(30, 27, 6)}
            <path d="M19 36h10" stroke="currentColor" strokeWidth="2" />
          </g>
        )}
      </svg>
    </span>
  );
}
