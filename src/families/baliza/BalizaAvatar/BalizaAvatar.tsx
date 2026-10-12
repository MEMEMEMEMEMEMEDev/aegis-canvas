import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaAvatar.scss";

export interface BalizaAvatarProps {
  /** Nombre completo: de aquí salen las iniciales y el texto alternativo. */
  nombre: string;
  /** URL de la foto. Sin foto, iniciales. */
  foto?: string;
  /**
   * `ficha` es el recuadro claro grande de la ficha de emergencia: la cara
   * es lo primero que necesita quien llega, para saber que es él.
   */
  forma?: "circulo" | "ficha";
  tamano?: "chico" | "normal" | "grande";
  className?: string;
}

export function iniciales(nombre: string) {
  const partes = nombre.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase();
}

export default function BalizaAvatar({
  nombre,
  foto,
  forma = "circulo",
  tamano = "normal",
  className,
}: BalizaAvatarProps) {
  return (
    <span
      className={cx("baliza-avatar", `baliza-avatar--${forma}`, `baliza-avatar--${tamano}`, className)}
      role="img"
      aria-label={foto ? `Foto de ${nombre}` : nombre}
    >
      {foto ? <img src={foto} alt="" /> : <span aria-hidden="true">{iniciales(nombre)}</span>}
    </span>
  );
}
