import type { ReactNode, CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoContador.scss";

export interface CalcoContadorProps {
  /** La cifra. Texto, no número: "146", "100", "~5,5". */
  valor: string;
  /** Lo que va pegado a la cifra: "%", "min", "+". */
  sufijo?: string;
  /** Qué mide. Obligatorio: una cifra sin etiqueta es decoración. */
  etiqueta: ReactNode;
  /** Un "+1" que flota al lado, como en la referencia 2. */
  delta?: string;
  tono?: CalcoTono;
  size?: "sm" | "md" | "lg";
  /** Grados de giro. */
  giro?: number;
  className?: string;
}

/**
 * El contador: una cifra a cuerpo de cartel con su etiqueta debajo, en un
 * bloque de color. La cifra lleva la letra extruida de la familia y el
 * `delta` es el "+1 +1" flotante de la referencia 2 — un sticker pequeño
 * que celebra.
 *
 * La cifra es texto y no número a propósito: viene de perfil.ts tal cual,
 * con su tilde o su coma decimal, y aquí no se redondea nada.
 */
export default function CalcoContador({
  valor,
  sufijo,
  etiqueta,
  delta,
  tono = "sol",
  size = "md",
  giro = 0,
  className,
}: CalcoContadorProps) {
  return (
    <div
      className={cx("calco-contador", `calco-contador--${tono}`, `calco-contador--${size}`, className)}
      style={{ "--calco-giro": `${giro}deg` } as CSSProperties}
    >
      <p className="calco-contador__cifra">
        <span className="calco-contador__valor">{valor}</span>
        {sufijo && <span className="calco-contador__sufijo">{sufijo}</span>}
      </p>
      <p className="calco-contador__etiqueta">{etiqueta}</p>
      {delta && (
        <span className="calco-contador__delta" aria-hidden="true">
          {delta}
        </span>
      )}
    </div>
  );
}
