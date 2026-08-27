import { cx } from "../../../utils/cx";
import "../calco.scss";
import "./CalcoSemaforo.scss";

export type CalcoSemaforoEstado = "listo" | "espera" | "dormido";

export interface CalcoSemaforoProps {
  estado: CalcoSemaforoEstado;
  /** Qué está midiendo: "la IA", "el servidor". Es el nombre accesible. */
  label: string;
  /** Lo que se lee al lado de las luces. Sin él, solo las luces. */
  texto?: string;
  /** Horizontal (por defecto) o de pie, como el de la calle. */
  vertical?: boolean;
  size?: "sm" | "md";
  className?: string;
}

// Qué cara pone cada luz. Son las tres del semáforo de la referencia 3.
const CARAS: Record<CalcoSemaforoEstado, string> = {
  listo: "◡",
  espera: "―",
  dormido: "︵",
};

const ORDEN: CalcoSemaforoEstado[] = ["dormido", "espera", "listo"];

/**
 * El semáforo: tres luces con cara —coral triste, sol neutra, lima
 * contenta— y solo una encendida. Es el indicador de estado de la familia:
 * la IA que duerme, el servidor que espera, la cola que está lista.
 *
 * La luz que espera parpadea; las otras dos se quedan quietas. Y el estado
 * se dice también con texto (`aria-label` + `texto`): un color y una cara
 * no son información para quien no los ve.
 */
export default function CalcoSemaforo({
  estado,
  label,
  texto,
  vertical = false,
  size = "md",
  className,
}: CalcoSemaforoProps) {
  return (
    <div
      className={cx("calco-semaforo", `calco-semaforo--${size}`, vertical && "calco-semaforo--vertical", className)}
      role="status"
      aria-label={`${label}: ${texto ?? estado}`}
    >
      <span className="calco-semaforo__luces" aria-hidden="true">
        {ORDEN.map((e) => (
          <span key={e} className={cx("calco-semaforo__luz", `calco-semaforo__luz--${e}`, e === estado && "is-on")}>
            <span className="calco-semaforo__cara">{CARAS[e]}</span>
          </span>
        ))}
      </span>
      {texto && <span className="calco-semaforo__texto">{texto}</span>}
    </div>
  );
}
