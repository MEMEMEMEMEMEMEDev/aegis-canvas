import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoRuido.scss";

export interface PliegoRuidoProps {
  /** Añade la retícula de montaje bajo el grano. */
  reticula?: boolean;
  /** Añade el barrido de líneas de un monitor. */
  barrido?: boolean;
  intensidad?: "suave" | "media";
  className?: string;
}

/**
 * La capa de textura del pliego: grano de papel, retícula de montaje y —si se
 * pide— el barrido de líneas del monitor, que es la mitad videojuego de la
 * familia.
 *
 * Se posiciona `absolute` y no `fixed`: un `fixed` dentro de un ancestro con
 * `transform` se ancla al ancestro, y esta capa va dentro de vistas que
 * animan su entrada. Quien la use la mete en un contenedor `relative` que
 * cubra lo que quiera texturizar.
 */
export default function PliegoRuido({
  reticula = false,
  barrido = false,
  intensidad = "suave",
  className,
}: PliegoRuidoProps) {
  return (
    <div
      className={cx("pliego-ruido", `pliego-ruido--${intensidad}`, className)}
      aria-hidden="true"
    >
      {reticula && <span className="pliego-ruido__reticula" />}
      <span className="pliego-ruido__grano" />
      {barrido && <span className="pliego-ruido__barrido" />}
    </div>
  );
}
