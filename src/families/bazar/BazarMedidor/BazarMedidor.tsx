import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarMedidor.scss";

export interface BazarMedidorProps {
  /** La cifra, tal cual. Nunca redondeada por el componente. */
  valor: string;
  /** Lo que va pegado a la cifra: "%", "años", "×". */
  sufijo?: string;
  /** Qué mide. Va debajo, en la voz micro. */
  label: string;
  /**
   * Proporción real, de 0 a 1, cuando el dato ES una proporción.
   *
   * Sin ella la tira de segmentos queda DECORATIVA y se oculta al lector:
   * un medidor lleno junto a un número que no tiene máximo es un gráfico
   * inventado, y en una ficha de credenciales eso es mentir con estilo.
   */
  ratio?: number;
  /** rosa (default) · morado */
  tone?: "rosa" | "morado";
  className?: string;
}

const SEGMENTOS = 12;

/**
 * EL MEDIDOR: la cifra del HUD con su tira de segmentos — el stat de una
 * pantalla de personaje.
 *
 * La tira solo se llena de verdad si quien lo usa entrega una proporción
 * real; en cualquier otro caso son muescas de empaque y el lector de
 * pantalla oye solo la cifra y su etiqueta.
 */
export default function BazarMedidor({
  valor,
  sufijo,
  label,
  ratio,
  tone = "rosa",
  className,
}: BazarMedidorProps) {
  const medido = ratio !== undefined;
  const llenos = medido ? Math.round(Math.min(1, Math.max(0, ratio)) * SEGMENTOS) : 0;

  return (
    <div className={cx("bazar-medidor", `bazar-medidor--${tone}`, className)}>
      <p className="bazar-medidor__cifra">
        {valor}
        {sufijo && <span className="bazar-medidor__sufijo">{sufijo}</span>}
      </p>

      <span
        className={cx("bazar-medidor__tira", medido && "is-medida")}
        {...(medido
          ? {
              role: "meter",
              "aria-valuenow": Math.round(ratio * 100),
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-label": label,
            }
          : { "aria-hidden": true })}
      >
        {Array.from({ length: SEGMENTOS }, (_, i) => (
          <i key={i} className={medido && i < llenos ? "is-lleno" : undefined} />
        ))}
      </span>

      <p className="bazar-medidor__label">{label}</p>
    </div>
  );
}
