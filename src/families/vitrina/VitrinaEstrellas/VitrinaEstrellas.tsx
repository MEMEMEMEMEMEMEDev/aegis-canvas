import { useId } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaEstrellas.scss";

export interface VitrinaEstrellasProps {
  /** 0–5, con decimales. */
  valor: number;
  /** Nº de reseñas, entre paréntesis. */
  cantidad?: number;
  /** Radiogroup de 1 a 5 para escribir una opinión. */
  interactivo?: boolean;
  onChange?: (valor: number) => void;
  /** Nombre accesible del grupo interactivo. */
  label?: string;
  tamano?: "sm" | "md" | "lg";
  className?: string;
}

const ESTRELLA = "M12 3l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 17.3 6.2 20.5l1.4-6.4L2.7 9.7l6.5-.7z";

function Estrella({ lleno }: { lleno: number }) {
  return (
    <span className="vitrina-estrellas__estrella" style={{ "--lleno": `${lleno * 100}%` } as CSSProperties} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="vitrina-estrellas__borde" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d={ESTRELLA} />
      </svg>
      <svg viewBox="0 0 24 24" className="vitrina-estrellas__relleno" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d={ESTRELLA} />
      </svg>
    </span>
  );
}

/**
 * Estrellas VITRINA: cinco de línea que se rellenan por fracción (4,3 es
 * cuatro llenas y un tercio de la quinta, con clip-path, no con un icono
 * "media estrella"). En modo interactivo es un radiogroup nativo: cinco
 * radios de verdad debajo de cinco estrellas grandes.
 */
export default function VitrinaEstrellas({
  valor,
  cantidad,
  interactivo = false,
  onChange,
  label = "Tu valoración",
  tamano = "md",
  className,
}: VitrinaEstrellasProps) {
  const id = useId();
  const v = Math.max(0, Math.min(5, valor));

  if (interactivo) {
    return (
      <fieldset className={cx("vitrina-estrellas", "vitrina-estrellas--interactivo", `vitrina-estrellas--${tamano}`, className)}>
        <legend className="vitrina-estrellas__leyenda">{label}</legend>
        <div className="vitrina-estrellas__fila">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="vitrina-estrellas__opcion">
              <input
                type="radio"
                name={`${id}-estrellas`}
                value={n}
                checked={Math.round(v) === n}
                onChange={() => onChange?.(n)}
                className="vitrina-estrellas__radio"
              />
              <span className="vitrina-estrellas__sr">
                {n} {n === 1 ? "estrella" : "estrellas"}
              </span>
              <Estrella lleno={n <= Math.round(v) ? 1 : 0} />
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  const sr = `${v.toFixed(1).replace(".", ",")} de 5${cantidad !== undefined ? `, ${cantidad} reseñas` : ""}`;
  return (
    <span className={cx("vitrina-estrellas", `vitrina-estrellas--${tamano}`, className)} role="img" aria-label={sr}>
      <span className="vitrina-estrellas__fila">
        {[0, 1, 2, 3, 4].map((i) => (
          <Estrella key={i} lleno={Math.max(0, Math.min(1, v - i))} />
        ))}
      </span>
      {cantidad !== undefined && (
        <span className="vitrina-estrellas__cantidad" aria-hidden="true">
          ({cantidad})
        </span>
      )}
    </span>
  );
}
