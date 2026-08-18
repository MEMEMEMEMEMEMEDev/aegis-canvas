import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoNumero.scss";

export interface PliegoNumeroProps {
  /** El número de la pieza. Se rellena con cero: 3 → "03". */
  value: number | string;
  /** El total, si lo hay: "03 / 05". */
  total?: number | string;
  /** Vacío (perfilado), macizo en tinta, o macizo en rosa. */
  tone?: "hueco" | "tinta" | "rosa";
  size?: "hero" | "md" | "sm";
  className?: string;
}

const dos = (v: number | string) => String(v).padStart(2, "0");

/**
 * El número troquelado que numera cada pieza del pliego.
 *
 * En `hueco` va perfilado con `-webkit-text-stroke`, que es lo que da el
 * aspecto de troquel. Ese perfilado NO se usa nunca para texto que haya que
 * leer de corrido: aquí funciona porque son dos cifras a cuerpo enorme, y
 * aun así el número real viaja también en el `aria-label` del elemento, para
 * quien lo escucha en vez de mirarlo.
 */
export default function PliegoNumero({
  value,
  total,
  tone = "hueco",
  size = "md",
  className,
}: PliegoNumeroProps) {
  const n = dos(value);
  const etiqueta = total ? `${n} de ${dos(total)}` : n;

  return (
    <span
      className={cx("pliego-numero", `pliego-numero--${tone}`, `pliego-numero--${size}`, className)}
      role="img"
      aria-label={etiqueta}
    >
      <span className="pliego-numero__cifra" aria-hidden="true">
        {n}
      </span>
      {total && (
        <span className="pliego-numero__total" aria-hidden="true">
          / {dos(total)}
        </span>
      )}
    </span>
  );
}
