import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarPanel.scss";

export interface TelarPanelProps {
  /** Título de la barra (mono, mayúsculas). */
  title: string;
  children: ReactNode;
  /** Glifo decorativo junto al título. Default: "▚". */
  glyph?: string;
  /** Franja tejida bajo la barra de título. Default: false. */
  weave?: boolean;
  /** Color de la barra: wool (default), fucsia, cobre, verde o sol. */
  tone?: "wool" | "fucsia" | "cobre" | "verde" | "sol";
  /** Sin padding interno (para visuales a sangre). */
  flush?: boolean;
  className?: string;
}

/**
 * Panel-ventana TELAR: la célula base del OS denso. Barra de título mono con
 * glifo y puntos de hilado, esquinas escalonadas chakana, opcionalmente una
 * franja tejida. Todo compacto: está hecho para convivir apretado.
 */
export default function TelarPanel({
  title,
  children,
  glyph = "▚",
  weave = false,
  tone = "wool",
  flush = false,
  className,
}: TelarPanelProps) {
  return (
    <section className={cx("telar-panel", `telar-panel--${tone}`, className)}>
      <header className="telar-panel__bar">
        <span className="telar-panel__glyph" aria-hidden="true">
          {glyph}
        </span>
        <h3 className="telar-panel__title">{title}</h3>
        <span className="telar-panel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </header>
      {weave && <span className="telar-panel__weave" aria-hidden="true" />}
      <div className={cx("telar-panel__body", flush && "telar-panel__body--flush")}>
        {children}
      </div>
    </section>
  );
}
