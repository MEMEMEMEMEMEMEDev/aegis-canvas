import { cx } from "../../../utils/cx";
import "../beige.scss";
import "./BeigeProgreso.scss";

export interface BeigeProgresoProps {
  /** 0–100. Con `infinito` se ignora. */
  value?: number;
  /** Nombre accesible: qué está cargando. */
  label: string;
  /** Barrido perpetuo en vez de porcentaje (la copia de archivos eterna). */
  infinito?: boolean;
  className?: string;
}

/**
 * La barra de progreso de bloques marinos. Con `infinito`, un tren de
 * bloques barre la pista en bucle — para procesos sin porcentaje honesto.
 */
export default function BeigeProgreso({
  value = 0,
  label,
  infinito = false,
  className,
}: BeigeProgresoProps) {
  const recorte = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cx("beige-progreso", infinito && "beige-progreso--infinito", className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={infinito ? undefined : recorte}
    >
      <i style={{ width: infinito ? undefined : `${recorte}%` }} />
    </div>
  );
}
