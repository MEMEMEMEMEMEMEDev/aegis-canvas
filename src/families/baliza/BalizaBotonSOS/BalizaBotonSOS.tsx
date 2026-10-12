import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaBotonSOS.scss";

export interface BalizaBotonSOSProps {
  /**
   * `listo`: esperando. `enviando`: ya se activó y el servidor no confirma.
   * `enviado`: la base lo recibió. El estado lo decide quien lo usa: el
   * botón sólo avisa cuando la persona mantuvo apretado lo suficiente.
   */
  estado?: "listo" | "enviando" | "enviado";
  /** Cuánto hay que mantener, en ms. 2 s: un bolsillo no aguanta tanto. */
  mantener?: number;
  onActivar: () => void;
  className?: string;
}

const TEXTO = {
  listo: { grande: "SOS", chico: "Mantén apretado" },
  enviando: { grande: "Enviando…", chico: "No cierres la app" },
  enviado: { grande: "Enviado", chico: "La base recibió tu alerta" },
};

/**
 * El SOS del trabajador. Se activa MANTENIENDO (puntero o Espacio/Enter),
 * no con un toque: un toque se da sin querer en el bolsillo, en la
 * cabina, con guantes. Un anillo muestra cuánto falta. El progreso es
 * información, no adorno: se ve igual con reduced-motion.
 *
 * Única excepción a "sin estado propio": el avance del apretón es un estado
 * de gesto que dura dos segundos y no le sirve a nadie de afuera.
 */
export default function BalizaBotonSOS({ estado = "listo", mantener = 2000, onActivar, className }: BalizaBotonSOSProps) {
  const [avance, setAvance] = useState(0);
  const inicio = useRef<number | null>(null);
  const cuadro = useRef<number | null>(null);
  const ayuda = useId();
  const activo = estado === "listo";

  const soltar = () => {
    inicio.current = null;
    if (cuadro.current) cancelAnimationFrame(cuadro.current);
    cuadro.current = null;
    setAvance(0);
  };

  const apretar = () => {
    if (!activo || inicio.current !== null) return;
    inicio.current = performance.now();
    const paso = (t: number) => {
      if (inicio.current === null) return;
      const p = Math.min(1, (t - inicio.current) / mantener);
      setAvance(p);
      if (p >= 1) {
        soltar();
        onActivar();
        return;
      }
      cuadro.current = requestAnimationFrame(paso);
    };
    cuadro.current = requestAnimationFrame(paso);
  };

  useEffect(() => soltar, []);

  const tecla = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (e.type === "keydown" && !e.repeat) apretar();
    if (e.type === "keyup") soltar();
  };

  const texto = TEXTO[estado];
  return (
    <div className={cx("baliza-sos", `baliza-sos--${estado}`, className)}>
      <button
        type="button"
        className="baliza-sos__boton"
        style={{ "--avance": avance } as CSSProperties}
        aria-describedby={ayuda}
        aria-disabled={!activo}
        onPointerDown={(e) => {
          // Capturar el puntero es una mejora (soltar fuera del botón también
          // cuenta); si el navegador la rechaza, el SOS tiene que seguir.
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* sigue */ }
          apretar();
        }}
        onPointerUp={soltar}
        onPointerCancel={soltar}
        onKeyDown={tecla}
        onKeyUp={tecla}
        onContextMenu={(e) => e.preventDefault()}
      >
        <span className="baliza-sos__anillo" aria-hidden="true" />
        <span className="baliza-sos__grande">{texto.grande}</span>
        <span className="baliza-sos__chico">{texto.chico}</span>
      </button>
      <p id={ayuda} className="baliza-sos__ayuda" aria-live="polite">
        {activo
          ? avance > 0 ? `Sigue apretando… ${Math.ceil(((1 - avance) * mantener) / 1000)} s` : "Mantén apretado 2 segundos para pedir ayuda a tu base."
          : texto.chico}
      </p>
    </div>
  );
}
