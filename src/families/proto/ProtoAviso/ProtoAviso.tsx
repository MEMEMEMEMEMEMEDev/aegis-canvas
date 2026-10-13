import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoAviso.scss";

export interface ProtoAvisoProps {
  /** `urgencia` interrumpe (role=alert); el resto informa (role=status). */
  tono?: "info" | "bien" | "espera" | "urgencia";
  titulo?: ReactNode;
  icono?: ReactNode;
  accion?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function ProtoAviso({ tono = "info", titulo, icono, accion, children, className }: ProtoAvisoProps) {
  return (
    <div className={cx("proto-aviso", `proto-aviso--${tono}`, className)} role={tono === "urgencia" ? "alert" : "status"}>
      {icono && <span className="proto-aviso__icono" aria-hidden="true">{icono}</span>}
      <div className="proto-aviso__cuerpo">
        {titulo && <p className="proto-aviso__titulo">{titulo}</p>}
        {children && <div className="proto-aviso__texto">{children}</div>}
      </div>
      {accion && <div className="proto-aviso__accion">{accion}</div>}
    </div>
  );
}
