import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import BeigePicto from "../BeigePicto/BeigePicto";
import BeigeBoton from "../BeigeBoton/BeigeBoton";
import "../beige.scss";
import "./BeigeDialogo.scss";

export interface BeigeDialogoProps {
  title: string;
  as?: ElementType;
  /** info (default) · advertencia · error — el icono grande del mensaje. */
  tone?: "info" | "advertencia" | "error";
  /**
   * Botones del pie. Cadenas → botones de maqueta (el primero, principal);
   * para botones reales, pasar el pie como children del consumidor.
   */
  acciones?: readonly string[];
  children: ReactNode;
  className?: string;
}

/**
 * El cuadro de mensaje del sistema: icono a la izquierda, texto a la
 * derecha, botones centrados abajo. Las malas noticias, con protocolo.
 */
export default function BeigeDialogo({
  title,
  as: Title = "p",
  tone = "info",
  acciones = ["Aceptar"],
  children,
  className,
}: BeigeDialogoProps) {
  return (
    <section className={cx("beige-dialogo", className)}>
      <header className="beige-dialogo__titulo">
        <Title className="beige-dialogo__rotulo">{title}</Title>
        <span className="beige-dialogo__x" aria-hidden="true" />
      </header>
      <div className="beige-dialogo__cuerpo">
        <BeigePicto name={tone} size={32} />
        <div className="beige-dialogo__texto">{children}</div>
      </div>
      {acciones.length > 0 && (
        <div className="beige-dialogo__acciones">
          {acciones.map((accion, i) => (
            <BeigeBoton key={accion} principal={i === 0}>
              {accion}
            </BeigeBoton>
          ))}
        </div>
      )}
    </section>
  );
}
