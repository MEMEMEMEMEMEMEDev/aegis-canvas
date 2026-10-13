import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoMensaje.scss";

export interface ProtoMensajeProps {
  /**
   * `cliente` escribe desde su WhatsApp. `asistente` es la IA de la clínica
   * y SIEMPRE se nombra como asistente. `equipo` es una persona de la
   * clínica que tomó la conversación. `sistema` es un aviso entre mensajes.
   */
  de: "cliente" | "asistente" | "equipo" | "sistema";
  /** Quién firma, si no es el cliente ("Asistente San Bruno", "Camila · recepción"). */
  firma?: string;
  hora?: string;
  /** Botones de respuesta rápida (los de una plantilla de WhatsApp). */
  respuestas?: { id: string; texto: string }[];
  /** La respuesta elegida, si ya se eligió una. */
  elegida?: string;
  onResponder?: (id: string) => void;
  children: ReactNode;
  className?: string;
}

export default function ProtoMensaje({ de, firma, hora, respuestas, elegida, onResponder, children, className }: ProtoMensajeProps) {
  if (de === "sistema") {
    return <p className={cx("proto-mensaje-sistema", className)}>{children}</p>;
  }
  return (
    <div className={cx("proto-mensaje", `proto-mensaje--${de}`, className)}>
      <div className="proto-mensaje__globo">
        {firma && <span className="proto-mensaje__firma">{firma}</span>}
        <div className="proto-mensaje__texto">{children}</div>
        {hora && <span className="proto-mensaje__hora">{hora}</span>}
      </div>
      {respuestas && respuestas.length > 0 && (
        <div className="proto-mensaje__respuestas">
          {respuestas.map((r) => (
            <button
              key={r.id}
              type="button"
              className={cx("proto-mensaje__respuesta", elegida === r.id && "proto-mensaje__respuesta--elegida")}
              disabled={elegida !== undefined}
              aria-pressed={elegida === r.id}
              onClick={() => onResponder?.(r.id)}
            >
              {r.texto}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
