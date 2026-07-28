import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoStatus.scss";

export interface DomoStatusProps {
  /** Mensaje de estado; al cambiar, entra con un tick de instrumento. */
  children: ReactNode;
  /** Proceso en curso: puntos secuenciales al estilo "Heating up….". */
  busy?: boolean;
  className?: string;
}

/**
 * Línea de estado DOMO ("Heating up to desired temperature...."): el canal
 * donde el sistema — o el agente AI — cuenta qué está haciendo. aria-live
 * para que también lo cuente en voz alta.
 */
export default function DomoStatus({ children, busy = false, className }: DomoStatusProps) {
  return (
    <p className={cx("domo-status", className)} role="status" aria-live="polite">
      <span className="domo-status__text" key={typeof children === "string" ? children : undefined}>
        {children}
      </span>
      {busy && (
        <span className="domo-status__dots" aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      )}
    </p>
  );
}
