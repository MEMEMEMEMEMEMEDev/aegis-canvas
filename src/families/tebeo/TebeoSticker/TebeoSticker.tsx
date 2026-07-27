import type { ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoSticker.scss";

export interface TebeoStickerProps {
  /** Texto que gira alrededor del círculo (se repite hasta cerrar el aro). */
  ring: string;
  /** Contenido del disco central (texto corto o icono). */
  children: ReactNode;
  /** Diámetro en px. Default: 140. */
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Sticker circular con texto giratorio en el aro y disco de tinta al centro
 * (el "START GENERATE" de la referencia). Con onClick se vuelve botón y el
 * disco se pinta de sol al hover. El giro respeta prefers-reduced-motion.
 */
export default function TebeoSticker({
  ring,
  children,
  size = 140,
  onClick,
  className,
}: TebeoStickerProps) {
  const pathId = useId();
  const Root = onClick ? "button" : "div";
  const ringText = `${ring} · ${ring} · ${ring} · `;

  return (
    <Root
      className={cx("tebeo-sticker", className)}
      style={{ width: size, height: size }}
      {...(onClick ? { type: "button" as const, onClick } : {})}
    >
      <svg className="tebeo-sticker__ring" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text>
          <textPath href={`#${pathId}`} textLength="251">
            {ringText.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <span className="tebeo-sticker__core">{children}</span>
    </Root>
  );
}
