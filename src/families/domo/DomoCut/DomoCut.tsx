import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoCut.scss";

export interface DomoCutProps {
  /** Geometría del corte: chaflanes parejos, filo asimétrico o muesca superior. */
  cut?: "chamfer" | "blade" | "notch";
  /** Rótulo del módulo. */
  title?: string;
  /** Estado secundario junto al título. */
  status?: ReactNode;
  /** Tinta invertida (módulo oscuro). */
  tone?: "paper" | "ink";
  /** Tics de esquina ⌐ (guiño HUD NieR). */
  marks?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Tarjeta cortada DOMO (v2, influencia NieR): panel con esquinas a cuchillo
 * vía clip-path — el borde se finge con doble capa recortada, porque un
 * border normal no sobrevive al clip. Para UIs que no parecen rectángulos.
 */
export default function DomoCut({
  cut = "chamfer",
  title,
  status,
  tone = "paper",
  marks = true,
  className,
  children,
}: DomoCutProps) {
  return (
    <section
      className={cx(
        "domo-cut",
        `domo-cut--${cut}`,
        tone === "ink" && "domo-cut--ink",
        className,
      )}
    >
      <div className={cx("domo-cut__inner", marks && "is-marked")}>
        {(title || status) && (
          <header className="domo-cut__head">
            {title && <h3 className="domo-cut__title">{title}</h3>}
            {status && <span className="domo-cut__status">{status}</span>}
          </header>
        )}
        <div className="domo-cut__body">{children}</div>
      </div>
    </section>
  );
}
