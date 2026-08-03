// =============================================================================
// MULTI V2 — el pad de combos: el código de salto se EJECUTA de verdad.
//
// Baseline accesible: cada token es un <button> real (clic/Enter/Tab bastan,
// y en móvil son la cabina arcade). El teclado físico es mejora progresiva:
// un listener global que solo reacciona a teclas de la secuencia activa,
// ignora inputs editables (no chocar con el prompt de la AI) y solo hace
// preventDefault cuando la tecla matchea (no secuestra el scroll).
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { TECLAS, TECLA_HINT } from "./content";

export interface ComboPadProps {
  sequence: string[];
  /** Nombre del combo para lectores de pantalla ("código de salto a…"). */
  label: string;
  onSuccess: () => void;
  onFail?: () => void;
}

export default function ComboPad({ sequence, label, onSuccess, onFail }: ComboPadProps) {
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const errorTimer = useRef<number | null>(null);

  // Refs para que el listener de teclado no se re-suscriba en cada pulso.
  const pulsarRef = useRef<(token: string) => void>(() => {});

  const pulsar = (token: string) => {
    const esperado = sequence[progreso];
    if (esperado === undefined) return;
    if (token === esperado) {
      const next = progreso + 1;
      if (next >= sequence.length) {
        setProgreso(sequence.length);
        setAnuncio("Secuencia completa. Salto autorizado.");
        onSuccess();
      } else {
        setProgreso(next);
        setAnuncio(`${next} de ${sequence.length}`);
      }
    } else {
      setProgreso(0);
      setError(true);
      setAnuncio("Secuencia incorrecta: reiniciada.");
      if (errorTimer.current !== null) window.clearTimeout(errorTimer.current);
      errorTimer.current = window.setTimeout(() => setError(false), 400);
      onFail?.();
    }
  };
  pulsarRef.current = pulsar;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const t = e.target;
      if (t instanceof HTMLElement) {
        if (t.closest("input, textarea, [contenteditable]")) return;
        // Enter/Espacio sobre un botón enfocado ya significa "clic en ese
        // botón" (y los del pad llaman a pulsar por su onClick): no doblar.
        if ((e.key === "Enter" || e.key === " ") && t.closest("button, a, [role='button']"))
          return;
      }
      // Resolver tecla → token SOLO contra los tokens de esta secuencia.
      const token = sequence.find((tok) => (TECLAS[tok] ?? []).includes(e.key));
      if (token === undefined) return;
      e.preventDefault();
      pulsarRef.current(token);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sequence]);

  useEffect(
    () => () => {
      if (errorTimer.current !== null) window.clearTimeout(errorTimer.current);
    },
    [],
  );

  const tokensUnicos = sequence.filter((tok, i) => sequence.indexOf(tok) === i);

  return (
    <div className={error ? "mv2-combo is-error" : "mv2-combo"} aria-label={label}>
      <div className="mv2-combo__objetivo" aria-hidden="true">
        {sequence.map((tok, i) => (
          <kbd
            key={`${tok}-${i}`}
            className={`mv2-combo__paso ${
              i < progreso ? "is-lista" : i === progreso ? "is-actual" : ""
            }`}
          >
            {tok}
          </kbd>
        ))}
      </div>
      <div className="mv2-combo__pad" role="group" aria-label={`${label} — pad de mando`}>
        {tokensUnicos.map((tok) => (
          <button
            key={tok}
            type="button"
            className="mv2-combo__tecla"
            onClick={() => pulsar(tok)}
          >
            <span className="mv2-combo__glifo" aria-hidden="true">
              {tok}
            </span>
            <span className="mv2-combo__hint">{TECLA_HINT[tok] ?? tok}</span>
          </button>
        ))}
      </div>
      <span className="mv2-visualmente-oculto" aria-live="polite">
        {anuncio}
      </span>
    </div>
  );
}
