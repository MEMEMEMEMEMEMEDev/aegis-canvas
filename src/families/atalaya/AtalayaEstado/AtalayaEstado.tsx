import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaEstado.scss";

/**
 * Las cuatro salidas que un comando de aegis puede dar, y la razón de ser
 * de esta familia.
 *
 *   bien    hecho, o ya estaba así   el instrumento midió y está bien
 *   mal     mal, o falta             el instrumento midió y algo está torcido
 *   sinver  no pude mirar            el instrumento nunca llegó al sujeto
 *   aviso   vale saberlo             una medida que se sostiene, con algo colgando
 *
 * `sinver` NO tiene color propio: se dibuja con trama sobre el neutro
 * apagado. Casi ninguna herramienta tiene esa cuarta salida y por eso
 * termina disfrazada de verde — y un verde nadie lo investiga. Con textura,
 * el ojo la encuentra recorriendo la pantalla aunque el rojo y el verde ya
 * estén ocupados, y aunque quien mira no distinga bien los colores.
 */
export type AtalayaEstadoTipo = "bien" | "mal" | "aviso" | "sinver";

export interface AtalayaEstadoProps {
  estado: AtalayaEstadoTipo;
  /** El texto al lado de la marca. Sin él queda sólo el punto. */
  children?: React.ReactNode;
  /** `punto` (por defecto) para filas densas; `pastilla` cuando va solo. */
  forma?: "punto" | "pastilla";
  /**
   * Lo que lee un lector de pantalla. Por defecto describe el estado en
   * palabras, porque una marca de color y textura no dice nada sola.
   */
  etiqueta?: string;
  className?: string;
}

const DICHO: Record<AtalayaEstadoTipo, string> = {
  bien: "bien",
  mal: "mal",
  aviso: "aviso",
  sinver: "no se pudo medir",
};

export default function AtalayaEstado({
  estado,
  children,
  forma = "punto",
  etiqueta,
  className,
}: AtalayaEstadoProps) {
  return (
    <span
      className={cx(
        "atalaya-estado",
        `atalaya-estado--${estado}`,
        `atalaya-estado--${forma}`,
        className,
      )}
    >
      <span className="atalaya-estado__marca" aria-hidden="true" />
      <span className="atalaya-estado__sr">{etiqueta ?? DICHO[estado]}</span>
      {children != null && <span className="atalaya-estado__texto">{children}</span>}
    </span>
  );
}
