import { useEffect, useState } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaCuenta.scss";

export interface VitrinaCuentaProps {
  /** Cuándo termina: ISO o Date. */
  hasta: string | Date;
  /** Nombre del temporizador ("Termina la venta flash"). */
  label: string;
  onFin?: () => void;
  /** coral (sobre el cartel coral), tinta (sobre claro) o bloque (sobre negro). */
  tono?: "coral" | "tinta" | "bloque";
  /** Sin días: solo HH:MM:SS. */
  sinDias?: boolean;
  className?: string;
}

const UNIDADES = [
  ["d", "Días"],
  ["h", "Horas"],
  ["m", "Min"],
  ["s", "Seg"],
] as const;

function restante(hasta: Date) {
  const ms = Math.max(0, hasta.getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, fin: ms === 0 };
}

/**
 * Cuenta atrás VITRINA: DD:HH:MM:SS en cajas, cifras de tabla. Es un
 * role="timer" con aria-live off (leerlo cada segundo sería una tortura);
 * el nombre accesible dice "termina en 2 días 4 horas" y se actualiza solo
 * cuando cambian las horas. Cada dígito que cambia entra desde arriba.
 */
export default function VitrinaCuenta({ hasta, label, onFin, tono = "coral", sinDias = false, className }: VitrinaCuentaProps) {
  const fecha = typeof hasta === "string" ? new Date(hasta) : hasta;
  const [t, setT] = useState(() => restante(fecha));

  useEffect(() => {
    const id = window.setInterval(() => {
      const r = restante(fecha);
      setT(r);
      if (r.fin) {
        window.clearInterval(id);
        onFin?.();
      }
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fecha.getTime()]);

  const unidades = sinDias ? UNIDADES.slice(1) : UNIDADES;
  const sr = t.fin
    ? `${label}: terminó`
    : `${label}: termina en ${t.d > 0 ? `${t.d} días ` : ""}${t.h} horas ${t.m} minutos`;

  return (
    <div className={cx("vitrina-cuenta", `vitrina-cuenta--${tono}`, className)} role="timer" aria-live="off" aria-label={sr}>
      {unidades.map(([k, nombre], i) => {
        const val = String(t[k]).padStart(2, "0");
        return (
          <span key={k} className="vitrina-cuenta__grupo" aria-hidden="true">
            <span className="vitrina-cuenta__caja">
              {val.split("").map((d, j) => (
                <span key={`${j}-${d}`} className="vitrina-cuenta__digito">
                  {d}
                </span>
              ))}
            </span>
            <span className="vitrina-cuenta__nombre">{nombre}</span>
            {i < unidades.length - 1 && <span className="vitrina-cuenta__sep">:</span>}
          </span>
        );
      })}
    </div>
  );
}
