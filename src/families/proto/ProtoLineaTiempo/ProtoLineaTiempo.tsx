import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import { IconoCama, IconoExamen, IconoHuella, IconoJeringa, IconoNota } from "../iconos";
import "../proto.scss";
import "./ProtoLineaTiempo.scss";

export type ProtoHitoTipo = "consulta" | "vacuna" | "examen" | "hospitalizacion" | "nota";

export interface ProtoHito {
  id: string;
  /** "12 ago 2026" */
  fecha: string;
  tipo: ProtoHitoTipo;
  titulo: ReactNode;
  /** Quién lo registró: la historia es de todo el equipo, pero cada línea tiene autor. */
  autor: string;
  cuerpo?: ReactNode;
  /** Nota interna del equipo: no va en el informe que se le entrega al dueño. */
  interna?: boolean;
}

const ICONO: Record<ProtoHitoTipo, ReactNode> = {
  consulta: <IconoHuella tamano={16} />,
  vacuna: <IconoJeringa tamano={16} />,
  examen: <IconoExamen tamano={16} />,
  hospitalizacion: <IconoCama tamano={16} />,
  nota: <IconoNota tamano={16} />,
};

const NOMBRE: Record<ProtoHitoTipo, string> = {
  consulta: "Consulta",
  vacuna: "Vacuna",
  examen: "Examen",
  hospitalizacion: "Hospitalización",
  nota: "Nota del equipo",
};

/** La historia de un paciente, de lo más nuevo a lo más viejo. */
export default function ProtoLineaTiempo({ hitos, className }: { hitos: ProtoHito[]; className?: string }) {
  return (
    <ol className={cx("proto-linea", className)}>
      {hitos.map((h) => (
        <li key={h.id} className={cx("proto-linea__hito", h.interna && "proto-linea__hito--interna")}>
          <span className="proto-linea__marca" aria-hidden="true">{ICONO[h.tipo]}</span>
          <div className="proto-linea__cuerpo">
            <p className="proto-linea__meta">
              <span className="proto-linea__tipo">{NOMBRE[h.tipo]}</span> · {h.fecha} · {h.autor}
              {h.interna && <span className="proto-linea__interna"> · interna</span>}
            </p>
            <p className="proto-linea__titulo">{h.titulo}</p>
            {h.cuerpo && <div className="proto-linea__texto">{h.cuerpo}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
