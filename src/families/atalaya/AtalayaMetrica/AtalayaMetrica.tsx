import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaMetrica.scss";

export interface AtalayaMetricaProps {
  /** Qué se mide. Corto y en palabras de quien lo lee. */
  rotulo: ReactNode;
  /** La cifra. Ya formateada: esta pieza no inventa unidades. */
  valor: ReactNode;
  /** La unidad o el contexto: «de 4 CPU», «últimas 24 h». */
  unidad?: ReactNode;
  /**
   * El cambio contra el período anterior. `sentido` dice si subir es bueno,
   * porque eso NO se puede deducir: más peticiones es bueno, más errores no.
   */
  delta?: { valor: string; sentido: "mejor" | "peor" | "igual" };
  /** Una serie chiquita, si la hay. */
  chispa?: ReactNode;
  /**
   * Cuando la cifra NO se pudo medir. No es un cero: un cero es una
   * medición y esto es su ausencia, y confundirlos es la enfermedad que
   * todo este producto existe para evitar.
   */
  sinMedir?: boolean;
  className?: string;
}

export default function AtalayaMetrica({
  rotulo,
  valor,
  unidad,
  delta,
  chispa,
  sinMedir,
  className,
}: AtalayaMetricaProps) {
  return (
    <div className={cx("atalaya-metrica", sinMedir && "atalaya-metrica--sinver", className)}>
      <span className="atalaya-metrica__rotulo">{rotulo}</span>
      <span className="atalaya-metrica__cifra">
        {sinMedir ? (
          <span className="atalaya-metrica__nada">no se pudo medir</span>
        ) : (
          <>
            <span className="atalaya-metrica__valor">{valor}</span>
            {unidad && <span className="atalaya-metrica__unidad">{unidad}</span>}
          </>
        )}
      </span>
      {!sinMedir && delta && (
        <span className={cx("atalaya-metrica__delta", `atalaya-metrica__delta--${delta.sentido}`)}>
          {delta.valor}
        </span>
      )}
      {!sinMedir && chispa && <span className="atalaya-metrica__chispa">{chispa}</span>}
    </div>
  );
}
