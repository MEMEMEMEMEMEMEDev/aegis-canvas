import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaAlerta.scss";

export interface BalizaAlertaProps {
  /**
   * `sos`: alguien pidió ayuda (escaneo del QR o botón del trabajador).
   * `aviso`: algo no llegó cuando debía (un viaje sin confirmar). No es rojo
   * todavía porque puede ser una falsa alarma; si nadie lo resuelve, el
   * servidor lo escala a `sos`. `tomada`: alguien ya la está atendiendo.
   */
  tipo?: "sos" | "aviso" | "tomada";
  /** "SOS ACTIVADO", "SIN CONFIRMAR LLEGADA". */
  titulo: string;
  /** Quién: "Carlos Muñoz Reyes". */
  persona: string;
  /** "2/10, 09:33:35". */
  cuando: string;
  /** "hace 0:02" — el reloj lo lleva quien la usa. */
  hace?: string;
  children: ReactNode;
  className?: string;
}

/**
 * La franja que entra arriba del panel cuando algo pasa. Es una región viva
 * (role="alert"): un lector de pantalla la anuncia al aparecer.
 */
export default function BalizaAlerta({ tipo = "sos", titulo, persona, cuando, hace, children, className }: BalizaAlertaProps) {
  return (
    <section
      className={cx("baliza-alerta", `baliza-alerta--${tipo}`, className)}
      role={tipo === "tomada" ? undefined : "alert"}
      aria-label={`${titulo}: ${persona}`}
    >
      {/* div y no header: con role="alert" la sección pierde su ámbito y un
          header suelto se volvería un segundo banner de la página. */}
      <div className="baliza-alerta__cabeza">
        <span className="baliza-alerta__titulo">
          {tipo !== "tomada" && <span className="baliza-alerta__latido" aria-hidden="true" />}
          {titulo}
          <span className="baliza-alerta__persona">· {persona}</span>
        </span>
        <span className="baliza-alerta__cuando">
          <time>{cuando}</time>
          {hace && <span className="baliza-alerta__hace">{hace}</span>}
        </span>
      </div>
      <div className="baliza-alerta__cuerpo">{children}</div>
    </section>
  );
}
