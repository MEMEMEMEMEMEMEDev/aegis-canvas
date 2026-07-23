import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../../utils/cx";
import "./MesoPanel.scss";

export interface MesoPanelProps extends ComponentPropsWithoutRef<"section"> {
  /** Etiqueta técnica del panel (mono, uppercase). */
  label?: string;
  /** Dato pequeño alineado a la derecha del label. */
  meta?: string;
}

/**
 * Panel MESOSOICOS: superficie elevada con cortes diagonales opuestos,
 * veta de ámbar superior y etiqueta meta opcional.
 */
export default function MesoPanel({
  label,
  meta,
  className,
  children,
  ...rest
}: MesoPanelProps) {
  return (
    <section className={cx("meso-panel", className)} {...rest}>
      {(label || meta) && (
        <header className="meso-panel__head">
          {label && <span className="meso-panel__label">{label}</span>}
          {meta && <span className="meso-panel__meta">{meta}</span>}
        </header>
      )}
      {children}
    </section>
  );
}
