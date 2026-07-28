import { useEffect, useState } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiCombo.scss";

export interface DenkiComboProps {
  /** Entradas del combo: flechas y botones ("←", "↓", "→", "P", "3D"…). */
  sequence: string[];
  /** Nombre del movimiento ("HADOUKEN 3D"). */
  label?: string;
  /** ms por tecla al reproducir el combo. */
  speed?: number;
  /** Reproducción en loop (default). */
  playing?: boolean;
  className?: string;
}

/**
 * Combo DENKI: entrada de comando arcade — la secuencia se "pulsa" sola,
 * tecla a tecla, como en la pantalla de movimientos de un fighting game.
 * Con reduced-motion queda quieta (todas las teclas en reposo).
 */
export default function DenkiCombo({
  sequence,
  label,
  speed = 480,
  playing = true,
  className,
}: DenkiComboProps) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!playing) {
      setStep(-1);
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    // Ciclo: teclas 0..n-1 y una pausa de dos tiempos antes de repetir.
    const total = sequence.length + 2;
    let i = -1;
    const id = window.setInterval(() => {
      i = (i + 1) % total;
      setStep(i < sequence.length ? i : -1);
    }, speed);
    return () => window.clearInterval(id);
  }, [sequence.length, speed, playing]);

  return (
    <div
      className={cx("denki-combo", className)}
      role="img"
      aria-label={`${label ? `${label}: ` : ""}${sequence.join(" ")}`}
    >
      {label && <span className="denki-combo__label">{label}</span>}
      <span className="denki-combo__keys" aria-hidden="true">
        {sequence.map((key, i) => (
          <kbd
            key={i}
            className={cx("denki-combo__key", i === step && "is-pressed")}
          >
            {key}
          </kbd>
        ))}
      </span>
    </div>
  );
}
