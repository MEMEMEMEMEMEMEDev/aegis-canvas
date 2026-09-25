import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoEnVivo.scss";

export interface PliegoEnVivoProps {
  /**
   * `vivo` llega audio ahora · `quieto` la sala existe pero nadie habla ·
   * `sinver` no se puede saber (sin conexión). El tercero NO se pinta de
   * gris-como-quieto: es trama, porque "no sé" no es "no hay".
   */
  estado: "vivo" | "quieto" | "sinver";
  /** El audio es una grabación (salas demo). Se dice siempre, no se esconde. */
  grabado?: boolean;
  className?: string;
}

const TEXTO = { vivo: "en vivo", quieto: "sin audio", sinver: "sin señal" } as const;

/**
 * El sello de una sala: el bloque rosa con su punto latiendo y una cuchilla
 * que lo barre, como la luz de "al aire" de un estudio. `role="status"`: un
 * cambio de estado se anuncia una vez, sin interrumpir.
 */
export default function PliegoEnVivo({ estado, grabado = false, className }: PliegoEnVivoProps) {
  return (
    <span className={cx("pliego-envivo", `pliego-envivo--${estado}`, className)} role="status">
      <span className="pliego-envivo__punto" aria-hidden="true" />
      <span className="pliego-envivo__texto">
        {TEXTO[estado]}
        {grabado && estado === "vivo" && <span className="pliego-envivo__grabado"> · grabado</span>}
      </span>
    </span>
  );
}
