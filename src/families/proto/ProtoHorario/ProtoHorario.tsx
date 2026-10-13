import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoHorario.scss";

export interface ProtoHorarioBloque {
  /** "10:30" */
  hora: string;
  libre: boolean;
}

export interface ProtoHorarioProps {
  /** "Martes 14 de octubre" — también nombra el grupo para lectores. */
  dia: string;
  bloques: ProtoHorarioBloque[];
  valor: string | null;
  onCambio: (hora: string) => void;
  className?: string;
}

/**
 * Las horas libres de un día. Sólo se ofrecen las que CABEN: el que llama
 * ya filtró por la duración del servicio, así que una consulta de 30 min y
 * una cirugía de 2 h ven horarios distintos el mismo día.
 */
export default function ProtoHorario({ dia, bloques, valor, onCambio, className }: ProtoHorarioProps) {
  const libres = bloques.filter((b) => b.libre).length;
  return (
    <fieldset className={cx("proto-horario", className)}>
      <legend className="proto-horario__dia">
        {dia}
        <span className="proto-horario__cuenta">
          {libres === 0 ? "sin horas libres" : libres === 1 ? "1 hora libre" : `${libres} horas libres`}
        </span>
      </legend>
      <div className="proto-horario__rejilla">
        {bloques.map((b) => (
          <label key={b.hora} className={cx("proto-horario__bloque", valor === b.hora && "proto-horario__bloque--elegido", !b.libre && "proto-horario__bloque--ocupado")}>
            <input
              type="radio"
              name={dia}
              value={b.hora}
              checked={valor === b.hora}
              disabled={!b.libre}
              onChange={() => onCambio(b.hora)}
              className="proto-horario__radio"
            />
            {b.hora}
            {!b.libre && <span className="proto-oculto"> (ocupada)</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
