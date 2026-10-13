import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoAgenda.scss";

export interface ProtoAgendaColumna {
  id: string;
  /** "Dra. Valentina", "Pabellón". */
  nombre: string;
  /** "Veterinaria", "Técnico", "Sala". */
  detalle?: string;
}

/**
 * `cita` es un paciente (celeste: gente). `porConfirmar` espera respuesta
 * (miel). `urgencia` es lo único rojo. `interno` es tiempo del equipo que no
 * es un paciente: colación, reunión, preparar pabellón.
 */
export type ProtoAgendaTono = "cita" | "porConfirmar" | "urgencia" | "interno";

export interface ProtoAgendaBloque {
  id: string;
  columna: string;
  /** "09:30" */
  inicio: string;
  minutos: number;
  titulo: string;
  detalle?: string;
  tono?: ProtoAgendaTono;
}

export interface ProtoAgendaProps {
  /** El nombre de la vista, para lectores de pantalla. */
  titulo: string;
  columnas: ProtoAgendaColumna[];
  bloques: ProtoAgendaBloque[];
  /** Hora en que empieza y termina la rejilla (enteras). */
  desde?: number;
  hasta?: number;
  /** "11:42": dibuja la línea de ahora. */
  ahora?: string;
  elegido?: string | null;
  onElegir?: (id: string) => void;
  className?: string;
}

const PX_MIN = 1.5; // 90 px por hora: una cita de 20 min se lee entera

const aMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

const fin = (inicio: string, minutos: number) => {
  const t = aMin(inicio) + minutos;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

/**
 * La agenda de TODO el equipo en una vista: una columna por persona o sala,
 * la altura de cada bloque es su duración. Cada bloque es un botón (se elige
 * con teclado); quien la usa decide qué pasa al elegir.
 */
export default function ProtoAgenda({
  titulo, columnas, bloques, desde = 9, hasta = 19, ahora, elegido, onElegir, className,
}: ProtoAgendaProps) {
  const alto = (hasta - desde) * 60 * PX_MIN;
  const horas = Array.from({ length: hasta - desde + 1 }, (_, i) => desde + i);
  const yAhora = ahora ? (aMin(ahora) - desde * 60) * PX_MIN : null;

  return (
    <div className={cx("proto-agenda", className)} role="region" aria-label={titulo} tabIndex={0}>
      <div className="proto-agenda__rejilla" style={{ gridTemplateColumns: `3.5rem repeat(${columnas.length}, minmax(7.5rem, 1fr))` }}>
        <div className="proto-agenda__esquina" aria-hidden="true" />
        {columnas.map((c) => (
          <div key={c.id} className="proto-agenda__cabeza">
            <span className="proto-agenda__nombre">{c.nombre}</span>
            {c.detalle && <span className="proto-agenda__detalle">{c.detalle}</span>}
          </div>
        ))}

        <div className="proto-agenda__horas" style={{ height: alto }} aria-hidden="true">
          {horas.map((h) => (
            <span key={h} style={{ top: (h - desde) * 60 * PX_MIN }}>{String(h).padStart(2, "0")}:00</span>
          ))}
        </div>

        {columnas.map((c) => (
          <ul key={c.id} className="proto-agenda__columna" style={{ height: alto }} aria-label={c.nombre}>
            {bloques
              .filter((b) => b.columna === c.id)
              .map((b) => {
                const top = (aMin(b.inicio) - desde * 60) * PX_MIN;
                return (
                  <li key={b.id} style={{ top, height: Math.max(b.minutos * PX_MIN, 28) }} className="proto-agenda__lugar">
                    <button
                      type="button"
                      className={cx(
                        "proto-agenda__bloque",
                        `proto-agenda__bloque--${b.tono ?? "cita"}`,
                        elegido === b.id && "proto-agenda__bloque--elegido",
                        b.minutos < 25 && "proto-agenda__bloque--corto",
                        b.minutos >= 25 && b.minutos < 45 && "proto-agenda__bloque--medio",
                        b.minutos >= 60 && "proto-agenda__bloque--largo",
                      )}
                      aria-pressed={elegido === b.id}
                      onClick={() => onElegir?.(b.id)}
                    >
                      <span className="proto-agenda__hora">{b.inicio}–{fin(b.inicio, b.minutos)}</span>
                      <span className="proto-agenda__titulo">{b.titulo}</span>
                      {b.detalle && <span className="proto-agenda__mas">{b.detalle}</span>}
                      {b.tono === "porConfirmar" && <span className="proto-oculto"> (por confirmar)</span>}
                      {b.tono === "urgencia" && <span className="proto-oculto"> (urgencia)</span>}
                    </button>
                  </li>
                );
              })}
          </ul>
        ))}

        {yAhora !== null && yAhora >= 0 && yAhora <= alto && (
          <div className="proto-agenda__ahora" style={{ top: `calc(var(--proto-agenda-cabeza) + ${yAhora}px)` }} aria-label={`Ahora: ${ahora}`} role="img">
            <span>{ahora}</span>
          </div>
        )}
      </div>
    </div>
  );
}
