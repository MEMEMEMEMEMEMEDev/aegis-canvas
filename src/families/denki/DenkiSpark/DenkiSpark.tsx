import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiSpark.scss";

export interface DenkiSparkProps {
  /** Tamaño en px del lado mayor. */
  size?: number;
  /** Grados de giro. La chispa de la referencia nunca cae recta. */
  tilt?: number;
  /** red (default) · ink · cream */
  tone?: "red" | "ink" | "cream";
  /** Late, como un impacto que se repite. */
  pulse?: boolean;
  className?: string;
}

// Astilla de impacto: radios muy desiguales, a propósito. Una estrella
// regular se lee como sol o como sello; el golpe de cómic necesita puntas
// de largos distintos. Los valores son fijos —nada de Math.random— para
// que el mismo componente dibuje siempre la misma chispa y un diff sea
// revisable.
const RADIOS = [50, 17, 34, 14, 46, 20, 28, 12, 44, 18, 32, 15];

const PUNTOS = RADIOS.map((r, i) => {
  const a = (i * 2 * Math.PI) / RADIOS.length - Math.PI / 2;
  return `${(50 + Math.cos(a) * r).toFixed(2)},${(50 + Math.sin(a) * r).toFixed(2)}`;
}).join(" ");

/**
 * LA CHISPA: el golpe de impacto del póster — la astilla dentada que sale
 * de donde algo choca. En la referencia marca el botón que se acaba de
 * pulsar; acá señala lo que la página quiere que mires.
 *
 * Siempre decorativa: nunca lleva texto y nunca es la única señal de nada.
 */
export default function DenkiSpark({
  size = 84,
  tilt = -12,
  tone = "red",
  pulse = false,
  className,
}: DenkiSparkProps) {
  return (
    <svg
      className={cx("denki-spark", `denki-spark--${tone}`, pulse && "is-pulse", className)}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ rotate: `${tilt}deg` }}
      aria-hidden="true"
    >
      <polygon points={PUNTOS} />
    </svg>
  );
}
