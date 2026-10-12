import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaContacto.scss";

export interface BalizaContactoProps {
  /** "Jefe de base". */
  rol: string;
  nombre: string;
  /** Teléfono en formato E.164 ("+56912345678"): el botón llama. */
  telefono?: string;
  tamano?: "normal" | "chico";
  className?: string;
}

/** Un botón que llama. En la ficha móvil es lo más útil después de lo vital. */
export default function BalizaContacto({ rol, nombre, telefono, tamano = "normal", className }: BalizaContactoProps) {
  const clases = cx("baliza-contacto", `baliza-contacto--${tamano}`, className);
  const cuerpo = (
    <>
      <span className="baliza-contacto__rol">{rol}</span>
      <span className="baliza-contacto__nombre">{nombre}</span>
    </>
  );
  return telefono ? (
    <a className={clases} href={`tel:${telefono}`} aria-label={`Llamar a ${nombre}, ${rol}`}>
      {cuerpo}
    </a>
  ) : (
    <span className={clases}>{cuerpo}</span>
  );
}
