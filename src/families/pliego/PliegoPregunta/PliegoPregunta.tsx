import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoPregunta.scss";

export interface PliegoPreguntaProps {
  texto: string;
  votos: number;
  /** Esta persona ya la votó: el botón queda marcado y no suma dos veces. */
  votada?: boolean;
  onVotar?: () => void;
  /**
   * `pendiente` espera moderación (sólo la ven producción y quien la hizo) ·
   * `publicada` la ve la sala · `respondida` ya se contestó.
   */
  estado?: "pendiente" | "publicada" | "respondida";
  /** "hace 2 min". */
  cuando?: string;
  /** Acciones de moderación (panel): aprobar, descartar, marcar respondida. */
  acciones?: ReactNode;
  className?: string;
}

const DICHO = { pendiente: "esperando moderación", publicada: "", respondida: "respondida" } as const;

/**
 * Una pregunta de la audiencia para el orador. El voto es el gesto de la
 * sala: la más votada sube. El número salta al cambiar (la clave del span
 * es el número, así que React lo vuelve a montar y la animación corre).
 */
export default function PliegoPregunta({
  texto, votos, votada = false, onVotar, estado = "publicada", cuando, acciones, className,
}: PliegoPreguntaProps) {
  return (
    <article className={cx("pliego-pregunta", `pliego-pregunta--${estado}`, className)}>
      {onVotar ? (
        <button type="button" className={cx("pliego-pregunta__voto", votada && "pliego-pregunta__voto--hecho")}
          onClick={onVotar} aria-pressed={votada} disabled={estado !== "publicada"}
          aria-label={`${votada ? "Quitar mi voto" : "Votar"} (${votos} votos)`}>
          <span aria-hidden="true">▲</span>
          <span key={votos} className="pliego-pregunta__cifra" aria-hidden="true">{votos}</span>
        </button>
      ) : (
        <span className="pliego-pregunta__voto pliego-pregunta__voto--quieto">
          <span aria-hidden="true">▲</span>
          <span className="pliego-pregunta__cifra" aria-hidden="true">{votos}</span>
          {/* Texto oculto y no aria-label: un span sin rol no puede
              llevar nombre accesible (axe lo marcó). */}
          <span className="pliego-pregunta__sr">{votos} votos</span>
        </span>
      )}
      <div className="pliego-pregunta__cuerpo">
        <p className="pliego-pregunta__texto">{texto}</p>
        {(DICHO[estado] || cuando) && (
          <p className="pliego-pregunta__meta">{[DICHO[estado], cuando].filter(Boolean).join(" · ")}</p>
        )}
        {acciones && <div className="pliego-pregunta__acciones">{acciones}</div>}
      </div>
    </article>
  );
}
