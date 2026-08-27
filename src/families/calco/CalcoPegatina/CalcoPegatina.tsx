import type { ElementType, ReactNode, MouseEvent, CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoPegatina.scss";

export type CalcoPegatinaForma = "pildora" | "estrella" | "circulo" | "etiqueta";

export interface CalcoPegatinaProps {
  forma?: CalcoPegatinaForma;
  tono?: CalcoTono;
  /** Grados de giro. Pegada a mano: casi nunca 0. */
  giro?: number;
  size?: "sm" | "md" | "lg";
  /**
   * `button` la hace pulsable —con la prensa y el meneo—. Por defecto es
   * un span: una pegatina decorativa no tiene por qué robar el foco.
   */
  as?: ElementType;
  onClick?: (evento: MouseEvent<HTMLElement>) => void;
  /** Rótulo accesible cuando lo de dentro es un glifo y no una palabra. */
  "aria-label"?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * La pegatina: el sticker de las referencias. Cuatro formas —píldora,
 * estrella de "¡OMG!", círculo de "HAVE A GOOD DAY" y etiqueta con muesca—
 * y siempre torcida, porque las pegó alguien con las manos.
 *
 * La estrella no lleva borde CSS: `clip-path` se lo comería. Se dibuja en
 * dos capas con la misma forma —tinta detrás, color delante, un poco más
 * chica— y la sombra dura la pone un `drop-shadow` en el envoltorio, que
 * es el único filtro que sigue el contorno recortado.
 */
export default function CalcoPegatina({
  forma = "pildora",
  tono = "sol",
  giro = -6,
  size = "md",
  as: Tag = "span",
  onClick,
  "aria-label": ariaLabel,
  className,
  children,
}: CalcoPegatinaProps) {
  const pulsable = Tag === "button";

  return (
    <Tag
      className={cx(
        "calco-pegatina",
        `calco-pegatina--${forma}`,
        `calco-pegatina--${tono}`,
        `calco-pegatina--${size}`,
        pulsable && "calco-pegatina--pulsable",
        className,
      )}
      style={{ "--calco-giro": `${giro}deg` } as CSSProperties}
      type={pulsable ? "button" : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {forma === "estrella" && (
        <>
          <span className="calco-pegatina__fondo" aria-hidden="true" />
          <span className="calco-pegatina__cara" aria-hidden="true" />
        </>
      )}
      <span className="calco-pegatina__texto">{children}</span>
    </Tag>
  );
}
