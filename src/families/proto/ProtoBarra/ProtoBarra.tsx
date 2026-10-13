import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import { IconoHuella } from "../iconos";
import "../proto.scss";
import "./ProtoBarra.scss";

export interface ProtoBarraProps {
  /** Lo que va al centro: la navegación de la web o del panel. */
  centro?: ReactNode;
  /** A la derecha: quién está, el botón de agendar. */
  fin?: ReactNode;
  className?: string;
}

/** La marca de la clínica arriba. Provisional: el logo real lo trae la clínica. */
export default function ProtoBarra({ centro, fin, className }: ProtoBarraProps) {
  return (
    <header className={cx("proto-barra", className)}>
      <span className="proto-barra__marca">
        <IconoHuella tamano={26} className="proto-barra__huella" />
        <span className="proto-barra__nombre">
          San Bruno
          <span className="proto-barra__bajada">veterinaria</span>
        </span>
      </span>
      {centro && <div className="proto-barra__centro">{centro}</div>}
      {fin && <div className="proto-barra__fin">{fin}</div>}
    </header>
  );
}
