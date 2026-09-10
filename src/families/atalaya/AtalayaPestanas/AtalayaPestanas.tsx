import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaPestanas.scss";

export interface AtalayaPestana {
  id: string;
  nombre: string;
  /** Un número al lado del nombre: cuántas cosas hay ahí adentro. */
  cuenta?: number;
  /** Un punto de estado: la sección tiene algo que mirar. */
  alerta?: "mal" | "aviso" | "sinver";
}

export interface AtalayaPestanasProps {
  pestanas: AtalayaPestana[];
  /** Controlado desde fuera SIEMPRE: así un agente puede moverlo igual que una persona. */
  activa: string;
  onCambio: (id: string) => void;
  etiqueta: string;
  className?: string;
}

export default function AtalayaPestanas({
  pestanas,
  activa,
  onCambio,
  etiqueta,
  className,
}: AtalayaPestanasProps) {
  return (
    <div
      className={cx("atalaya-pestanas", className)}
      role="tablist"
      aria-label={etiqueta}
    >
      {pestanas.map((p) => (
        <button
          key={p.id}
          type="button"
          role="tab"
          id={`pestana-${p.id}`}
          aria-selected={p.id === activa}
          aria-controls={`panel-${p.id}`}
          className={cx(
            "atalaya-pestanas__una",
            p.id === activa && "atalaya-pestanas__una--activa",
          )}
          onClick={() => onCambio(p.id)}
        >
          {p.nombre}
          {p.cuenta != null && (
            <span className="atalaya-pestanas__cuenta">{p.cuenta}</span>
          )}
          {p.alerta && (
            <span
              className={cx(
                "atalaya-pestanas__alerta",
                `atalaya-pestanas__alerta--${p.alerta}`,
              )}
              aria-hidden="true"
            />
          )}
        </button>
      ))}
    </div>
  );
}
