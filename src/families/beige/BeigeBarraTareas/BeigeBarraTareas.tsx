import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import BeigePicto, { type BeigePictoName } from "../BeigePicto/BeigePicto";
import "../beige.scss";
import "./BeigeBarraTareas.scss";

export interface BeigeTarea {
  label: string;
  picto?: BeigePictoName;
  href?: string;
  /** El programa al frente: botón hundido. */
  activa?: boolean;
}

export interface BeigeBarraTareasProps {
  /** Rótulo del botón Inicio. */
  inicio?: string;
  /** id del botón Inicio, para que el consumidor le cuelgue su menú. */
  inicioId?: string;
  tareas?: readonly BeigeTarea[];
  /** El reloj de la bandeja. Texto: el consumidor decide si lo hace vivir. */
  reloj?: string;
  /** id del elemento del reloj, para actualizarlo desde fuera. */
  relojId?: string;
  /** Contenido extra de la bandeja (iconitos). */
  children?: ReactNode;
  /** Rótulo accesible del landmark. */
  label?: string;
  /** Pegada al borde inferior de la pantalla. */
  fija?: boolean;
  className?: string;
}

/**
 * La barra de tareas: Inicio, los programas abiertos y la bandeja con su
 * reloj. Con `fija` se pega abajo, como es debido.
 */
export default function BeigeBarraTareas({
  inicio = "Inicio",
  inicioId,
  tareas,
  reloj,
  relojId,
  children,
  label = "Barra de tareas",
  fija = false,
  className,
}: BeigeBarraTareasProps) {
  return (
    <nav
      className={cx("beige-barra", fija && "beige-barra--fija", className)}
      aria-label={label}
    >
      <button className="beige-barra__inicio" type="button" id={inicioId}>
        <BeigePicto name="pc" size={16} />
        {inicio}
      </button>

      <span className="beige-barra__muesca" aria-hidden="true" />

      {tareas && tareas.length > 0 && (
        <div className="beige-barra__tareas">
          {tareas.map((tarea) => {
            const clase = cx("beige-barra__tarea", tarea.activa && "beige-barra__tarea--activa");
            const contenido = (
              <>
                {tarea.picto && <BeigePicto name={tarea.picto} size={16} />}
                <span>{tarea.label}</span>
              </>
            );
            return tarea.href ? (
              <a key={tarea.label} className={clase} href={tarea.href}>
                {contenido}
              </a>
            ) : (
              <span key={tarea.label} className={clase}>
                {contenido}
              </span>
            );
          })}
        </div>
      )}

      {(reloj || children) && (
        <div className="beige-barra__bandeja">
          {children}
          {reloj && <span id={relojId}>{reloj}</span>}
        </div>
      )}
    </nav>
  );
}
