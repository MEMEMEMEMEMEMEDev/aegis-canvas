import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaPasos.scss";

export interface VitrinaPasosProps {
  pasos: Array<{ id: string; label: string }>;
  actual: string;
  /** Con él, los pasos ya hechos son botones para volver. */
  onIr?: (id: string) => void;
  className?: string;
}

/**
 * Pasos VITRINA: el stepper del checkout. Un <ol> numerado con
 * `aria-current="step"`; los pasos hechos llevan un check y, si se puede
 * volver, son botones. En el teléfono colapsa a "Paso 2 de 4 · Envío" con
 * una barra de progreso.
 */
export default function VitrinaPasos({ pasos, actual, onIr, className }: VitrinaPasosProps) {
  const i = Math.max(0, pasos.findIndex((p) => p.id === actual));
  const paso = pasos[i];

  return (
    <nav className={cx("vitrina-pasos", className)} aria-label="Progreso del pago">
      <div className="vitrina-pasos__compacto" aria-hidden="true">
        <span className="vitrina-pasos__cifra">
          Paso {i + 1} de {pasos.length}
        </span>
        <span className="vitrina-pasos__nombre">{paso?.label}</span>
        <span className="vitrina-pasos__barra">
          <span className="vitrina-pasos__progreso" style={{ "--p": `${((i + 1) / pasos.length) * 100}%` } as CSSProperties} />
        </span>
      </div>

      <ol className="vitrina-pasos__lista">
        {pasos.map((p, j) => {
          const hecho = j < i;
          const es = j === i;
          const contenido = (
            <>
              <span className="vitrina-pasos__num" aria-hidden="true">
                {hecho ? <VitrinaPicto name="check" size={14} /> : j + 1}
              </span>
              <span className="vitrina-pasos__label">{p.label}</span>
            </>
          );
          return (
            <li key={p.id} className={cx("vitrina-pasos__paso", hecho && "is-hecho", es && "is-actual")} aria-current={es ? "step" : undefined}>
              {hecho && onIr ? (
                <button type="button" className="vitrina-pasos__volver" onClick={() => onIr(p.id)}>
                  {contenido}
                  <span className="vitrina-pasos__sr"> (volver)</span>
                </button>
              ) : (
                <span className="vitrina-pasos__quieto">{contenido}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
