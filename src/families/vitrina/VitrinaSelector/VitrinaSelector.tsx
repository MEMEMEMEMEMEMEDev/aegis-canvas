import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaSelector.scss";

export interface VitrinaSelectorOpcion {
  id: string;
  label: string;
  /** Para tipo color: el hex de la placa. */
  color?: string;
  agotada?: boolean;
}

export interface VitrinaSelectorProps {
  /** talla (píldoras con texto) o color (círculos con la placa). */
  tipo?: "talla" | "color";
  /** Nombre del grupo ("Talla", "Color"). Se pinta como leyenda. */
  label: string;
  opciones: VitrinaSelectorOpcion[];
  value?: string;
  onChange: (id: string) => void;
  /** Texto a la derecha de la leyenda ("Guía de tallas"). */
  accion?: { label: string; onClick: () => void };
  error?: string | null;
  className?: string;
}

/**
 * Selector VITRINA: las variantes de la ficha — tallas como píldoras,
 * colores como círculos con la placa de la lámina. Es un radiogroup con
 * flechas; una opción agotada se ve tachada pero se puede enfocar
 * (aria-disabled), porque "no hay 42" también es información.
 */
export default function VitrinaSelector({ tipo = "talla", label, opciones, value, onChange, accion, error, className }: VitrinaSelectorProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activo = Math.max(0, opciones.findIndex((o) => o.id === value));
  const elegido = opciones.find((o) => o.id === value);

  function teclas(e: KeyboardEvent<HTMLDivElement>) {
    const foco = refs.current.findIndex((r) => r === document.activeElement);
    const desde = foco < 0 ? activo : foco;
    const n = opciones.length;
    let destino: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") destino = (desde + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") destino = (desde - 1 + n) % n;
    else if (e.key === "Home") destino = 0;
    else if (e.key === "End") destino = n - 1;
    if (destino === null) return;
    e.preventDefault();
    const op = opciones[destino];
    refs.current[destino]?.focus();
    if (op && !op.agotada) onChange(op.id);
  }

  return (
    <div className={cx("vitrina-selector", `vitrina-selector--${tipo}`, error && "is-invalid", className)}>
      <div className="vitrina-selector__cabecera">
        <span className="vitrina-selector__label" id={`sel-${label}`}>
          {label}
          {elegido && <span className="vitrina-selector__elegido">: {elegido.label}</span>}
        </span>
        {accion && (
          <button type="button" className="vitrina-selector__accion" onClick={accion.onClick}>
            {accion.label}
          </button>
        )}
      </div>

      <div className="vitrina-selector__fila" role="radiogroup" aria-labelledby={`sel-${label}`} onKeyDown={teclas}>
        {opciones.map((o, i) => {
          const es = o.id === value;
          return (
            <button
              key={o.id}
              ref={(n) => {
                refs.current[i] = n;
              }}
              type="button"
              role="radio"
              aria-checked={es}
              aria-disabled={o.agotada || undefined}
              aria-label={tipo === "color" ? `${o.label}${o.agotada ? ", agotado" : ""}` : undefined}
              tabIndex={es || (value === undefined && i === 0) ? 0 : -1}
              className={cx("vitrina-selector__opcion", es && "is-elegida", o.agotada && "is-agotada")}
              onClick={() => {
                if (!o.agotada) onChange(o.id);
              }}
              title={o.label}
            >
              {tipo === "color" ? <span className="vitrina-selector__placa" style={{ background: o.color }} aria-hidden="true" /> : o.label}
              {tipo === "talla" && o.agotada && <span className="vitrina-selector__sr">, agotado</span>}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="vitrina-selector__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
