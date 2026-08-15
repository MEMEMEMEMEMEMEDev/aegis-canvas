import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarDossier.scss";

export interface BazarDossierProps {
  nombre: string;
  /** Etiqueta del nombre: "h3" cuando el dossier cuelga de una sección. */
  as?: ElementType;
  /** El kana que marca al personaje, en el bullet del nombre. */
  kana?: string;
  /** La línea de arriba: período, cargo, lo que sitúe la ficha. */
  meta?: string;
  /** rosa (default) · morado — el filete y el bullet. */
  tone?: "rosa" | "morado";
  children: ReactNode;
  className?: string;
}

/**
 * EL DOSSIER: el panel oscuro que se apoya sobre el cartel y cuenta quién
 * es quien está en vitrina — el bloque de Nicole Demara de la referencia 2,
 * con su texto entintado a media frase.
 *
 * Es la mitad legible de la pantalla de selección: la carta impresiona y
 * esto explica. Por eso el panel es sobrio y de una sola columna, aunque
 * el resto de la familia esté torcido y a todo color.
 */
export default function BazarDossier({
  nombre,
  as: Nombre = "p",
  kana,
  meta,
  tone = "rosa",
  children,
  className,
}: BazarDossierProps) {
  return (
    <div className={cx("bazar-dossier", `bazar-dossier--${tone}`, className)}>
      {meta && <p className="bazar-dossier__meta">{meta}</p>}

      <Nombre className="bazar-dossier__nombre">
        {kana && (
          <span className="bazar-dossier__kana" lang="ja" aria-hidden="true">
            {kana}
          </span>
        )}
        {nombre}
      </Nombre>

      <div className="bazar-dossier__cuerpo">{children}</div>
    </div>
  );
}
