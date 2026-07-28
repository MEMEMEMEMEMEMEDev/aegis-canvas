import { useControllableState } from "../../../behaviors/useControllableState";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaTransport.scss";

export type CintaTransportState = "play" | "pause" | "stop";

export interface CintaTransportProps {
  /** Estado controlado (undefined = no controlado). */
  state?: CintaTransportState;
  defaultState?: CintaTransportState;
  onChange?: (next: CintaTransportState) => void;
  disabled?: boolean;
  className?: string;
}

const KEYS: Array<{ id: CintaTransportState; glyph: string; name: string; tone: string }> = [
  { id: "play", glyph: "▶", name: "Reproducir", tone: "amber" },
  { id: "pause", glyph: "❚❚", name: "Pausa", tone: "sky" },
  { id: "stop", glyph: "■", name: "Detener", tone: "coral" },
];

/**
 * Transporte CINTA: las tres teclas redondas pastel del reproductor —
 * play / pausa / stop. Controlable desde fuera (la AI también aprieta
 * play). La tecla activa queda hundida, como en el hardware real.
 */
export default function CintaTransport({
  state,
  defaultState = "stop",
  onChange,
  disabled = false,
  className,
}: CintaTransportProps) {
  const [current = "stop", setCurrent] = useControllableState<CintaTransportState>({
    value: state,
    defaultValue: defaultState,
    onChange,
  });

  return (
    <div className={cx("cinta-transport", className)} role="group" aria-label="transporte">
      {KEYS.map((key) => (
        <button
          key={key.id}
          type="button"
          className={cx(
            "cinta-transport__key",
            `cinta-transport__key--${key.tone}`,
            current === key.id && "is-active",
          )}
          aria-label={key.name}
          aria-pressed={current === key.id}
          disabled={disabled}
          onClick={() => setCurrent(key.id)}
        >
          <span aria-hidden="true">{key.glyph}</span>
        </button>
      ))}
    </div>
  );
}
