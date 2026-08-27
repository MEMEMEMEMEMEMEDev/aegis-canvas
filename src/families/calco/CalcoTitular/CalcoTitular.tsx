import type { ElementType, ReactNode, CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoTitular.scss";

export interface CalcoTitularProps {
  /** h1 en la pantalla, h2 en una ventana. Nunca un div. */
  as?: ElementType;
  size?: "hero" | "seccion" | "card";
  /** La línea chica de arriba: "Familia · Calco", "Ficha 01". */
  sobre?: ReactNode;
  /** Kanji al lado, decorativo. */
  kana?: string;
  /** Con volumen: la letra extruida de "HAPPINESS". */
  extrusion?: boolean;
  /** El color del relleno de la letra. La extrusión y el contorno son tinta. */
  tono?: CalcoTono | "tinta";
  /** Grados de giro. Un titular de cartel se pega un poco torcido. */
  giro?: number;
  className?: string;
  children: ReactNode;
}

/**
 * El titular: Unbounded a peso máximo, en mayúsculas y con volumen. Es la
 * letra de "NEO BRUTALISM" y de "HAPPINESS": ancha, redonda, y con la
 * sombra apilada que la despega del papel.
 *
 * Sin extrusión es el mismo titular plano, para los sitios donde el
 * volumen competiría con un bloque que ya lo tiene debajo.
 */
export default function CalcoTitular({
  as: Tag = "h2",
  size = "seccion",
  sobre,
  kana,
  extrusion = true,
  tono = "crema",
  giro = 0,
  className,
  children,
}: CalcoTitularProps) {
  return (
    <div
      className={cx("calco-titular", `calco-titular--${size}`, `calco-titular--${tono}`, extrusion && "calco-titular--extruido", className)}
      style={{ "--calco-giro": `${giro}deg` } as CSSProperties}
    >
      {sobre && <p className="calco-titular__sobre">{sobre}</p>}
      <Tag className="calco-titular__texto">
        {children}
        {kana && (
          <span className="calco-titular__kana" aria-hidden="true">
            {kana}
          </span>
        )}
      </Tag>
    </div>
  );
}
