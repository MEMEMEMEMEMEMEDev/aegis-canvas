import { cx } from "../../../utils/cx";
import { IconoHuella } from "../iconos";
import "../proto.scss";
import "./ProtoHuellitas.scss";

export interface ProtoHuellitasProps {
  /** Cuántos pasos da el rastro. */
  pasos?: number;
  /** Hacia dónde camina. */
  rumbo?: "derecha" | "izquierda";
  className?: string;
}

/**
 * Un rastro de huellitas: el único adorno de la familia. Lavanda, siempre
 * aria-hidden, nunca encima de texto. Si decora todo, deja de ser un guiño.
 */
export default function ProtoHuellitas({ pasos = 5, rumbo = "derecha", className }: ProtoHuellitasProps) {
  return (
    <span className={cx("proto-huellitas", `proto-huellitas--${rumbo}`, className)} aria-hidden="true">
      {Array.from({ length: pasos }, (_, i) => (
        <IconoHuella key={i} tamano={22} className={cx("proto-huellitas__paso", i % 2 === 1 && "proto-huellitas__paso--alto")} />
      ))}
    </span>
  );
}
