import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import ProtoAvatar from "../ProtoAvatar/ProtoAvatar";
import { IconoCandado, IconoChincheta, IconoHuella, IconoOjo } from "../iconos";
import "../proto.scss";
import "./ProtoNota.scss";

export interface ProtoNotaProps {
  autor: string;
  /** "Veterinaria", "Recepción". */
  rol?: string;
  hora: string;
  /**
   * A quién va: `todos`, `yo` (privada: sólo la ve quien la escribió) o el
   * nombre de una persona o un rol ("Javier", "Técnicos").
   */
  para: "todos" | "yo" | string;
  /** Fijada arriba del tablero (un aviso que sigue vigente). */
  fijada?: boolean;
  /** Si está pegada a un paciente, su nombre. */
  paciente?: string;
  /** Cuántos la vieron, de cuántos a quienes iba. */
  vistos?: { n: number; de: number };
  accion?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ProtoNota({ autor, rol, hora, para, fijada = false, paciente, vistos, accion, children, className }: ProtoNotaProps) {
  const privada = para === "yo";
  return (
    <article className={cx("proto-nota", fijada && "proto-nota--fijada", privada && "proto-nota--privada", className)}>
      <header className="proto-nota__cabeza">
        <ProtoAvatar nombre={autor} tamano="chico" />
        <div className="proto-nota__quien">
          <span className="proto-nota__autor">{autor}{rol && <span className="proto-nota__rol"> · {rol}</span>}</span>
          <span className="proto-nota__para">
            {privada ? (
              <><IconoCandado tamano={13} /> Sólo tú la ves</>
            ) : (
              <>Para {para === "todos" ? "todo el equipo" : para}</>
            )}
            {paciente && <> · <IconoHuella tamano={12} /> {paciente}</>}
          </span>
        </div>
        <time className="proto-nota__hora">{hora}</time>
      </header>
      {fijada && (
        <p className="proto-nota__fijada"><IconoChincheta tamano={14} /> Fijada</p>
      )}
      <div className="proto-nota__cuerpo">{children}</div>
      {(vistos || accion) && (
        <footer className="proto-nota__pie">
          {vistos && (
            <span className="proto-nota__vistos">
              <IconoOjo tamano={15} /> Vista por {vistos.n} de {vistos.de}
            </span>
          )}
          {accion}
        </footer>
      )}
    </article>
  );
}
