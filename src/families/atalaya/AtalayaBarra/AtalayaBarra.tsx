import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaBarra.scss";

export interface AtalayaBarraProps {
  /** Lo consumido y el techo, en la MISMA unidad. La pieza no convierte nada. */
  usado: number;
  techo: number;
  /** Cómo se dice la cifra debajo de la barra. */
  formato?: (v: number) => string;
  rotulo?: string;
  /** Desde qué fracción del techo la barra avisa. Por defecto 0.85. */
  umbral?: number;
  className?: string;
}

/**
 * Cuánto de un techo se está usando.
 *
 * Pasado el umbral la barra cambia de color, y pasado el techo se pone en
 * rojo y lo dice con palabras. Es la única barra de esta familia: aegis no
 * tiene deslizadores porque los planes son escalones, y una barra que se
 * pudiera arrastrar prometería algo que el contrato no acepta.
 */
export default function AtalayaBarra({
  usado,
  techo,
  formato = (v) => String(v),
  rotulo,
  umbral = 0.85,
  className,
}: AtalayaBarraProps) {
  const razon = techo > 0 ? usado / techo : 0;
  const estado = razon > 1 ? "pasado" : razon >= umbral ? "cerca" : "bien";
  const pct = Math.round(razon * 100);
  return (
    <div className={cx("atalaya-barra", `atalaya-barra--${estado}`, className)}>
      {rotulo && <span className="atalaya-barra__rotulo">{rotulo}</span>}
      <div
        className="atalaya-barra__riel"
        role="meter"
        aria-valuenow={usado}
        aria-valuemin={0}
        aria-valuemax={techo}
        aria-label={rotulo ?? "uso"}
      >
        <div
          className="atalaya-barra__lleno"
          style={{ inlineSize: `${Math.min(razon, 1) * 100}%` }}
        />
      </div>
      <span className="atalaya-barra__pie">
        <span>
          {formato(usado)} de {formato(techo)}
        </span>
        <span className="atalaya-barra__pct">
          {estado === "pasado" ? "no entra" : `${pct}%`}
        </span>
      </span>
    </div>
  );
}
