import { cx } from "../../../utils/cx";
import { IconoHuella } from "../iconos";
import "../proto.scss";
import "./ProtoAvatar.scss";

export function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  const primera = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1]?.[0] ?? "" : "";
  return (primera + ultima).toUpperCase();
}

export interface ProtoAvatarProps {
  nombre: string;
  /**
   * `persona` lleva iniciales; `mascota` la huella y la inicial de su
   * nombre, para que en una lista se distinga a Rocky de su dueña de un
   * vistazo.
   */
  tipo?: "persona" | "mascota";
  tamano?: "chico" | "normal" | "grande";
  className?: string;
}

export default function ProtoAvatar({ nombre, tipo = "persona", tamano = "normal", className }: ProtoAvatarProps) {
  return (
    <span className={cx("proto-avatar", `proto-avatar--${tipo}`, `proto-avatar--${tamano}`, className)} aria-hidden="true">
      {tipo === "mascota" ? (
        <>
          <IconoHuella className="proto-avatar__huella" tamano={tamano === "grande" ? 22 : tamano === "chico" ? 9 : 12} />
          <span className="proto-avatar__letra">{iniciales(nombre).slice(0, 1)}</span>
        </>
      ) : (
        iniciales(nombre)
      )}
    </span>
  );
}
