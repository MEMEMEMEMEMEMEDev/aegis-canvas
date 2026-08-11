import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../beige.scss";
import "./BeigeCampo.scss";

export interface BeigeCampoProps {
  children: ReactNode;
  /** Rótulo pequeño sobre el campo. */
  label?: string;
  /** Consola: pozo negro con fósforo verde y letra VT323. */
  terminal?: boolean;
  className?: string;
}

/** El campo-pozo: blanco hundido para contenido, o consola de fósforo. */
export default function BeigeCampo({ children, label, terminal = false, className }: BeigeCampoProps) {
  return (
    <div className={cx("beige-campo", className)}>
      {label && <span className="beige-campo__rotulo">{label}</span>}
      <div className={cx("beige-campo__pozo", terminal && "beige-campo__pozo--terminal")}>
        {children}
      </div>
    </div>
  );
}
