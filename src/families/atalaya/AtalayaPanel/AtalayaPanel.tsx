import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaPanel.scss";

export interface AtalayaPanelProps {
  /** El rótulo de la sección. Corto: es un encabezado, no una frase. */
  titulo?: ReactNode;
  /** Una línea que dice qué se está mirando. */
  sub?: ReactNode;
  /** Acciones de la esquina: botones, un enlace, un selector de rango. */
  acciones?: ReactNode;
  /** Sin borde ni sombra: para anidar un panel dentro de otro. */
  desnudo?: boolean;
  /** Quita el relleno del cuerpo: para tablas y listas a sangre. */
  sinRelleno?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * La superficie de la familia. Un borde de un pelo y una sombra que casi no
 * está: lo que separa dos bloques es el espacio entre ellos, no el cromo.
 *
 * No todo es un panel. Poner borde, relleno y sombra a cada bloque aplana la
 * jerarquía y deja la pantalla sin un solo punto donde descansar el ojo.
 */
export default function AtalayaPanel({
  titulo,
  sub,
  acciones,
  desnudo,
  sinRelleno,
  children,
  className,
}: AtalayaPanelProps) {
  return (
    <section
      className={cx(
        "atalaya-panel",
        desnudo && "atalaya-panel--desnudo",
        className,
      )}
    >
      {(titulo || acciones || sub) && (
        <header className="atalaya-panel__cabeza">
          <div className="atalaya-panel__titulos">
            {titulo && <h2 className="atalaya-panel__titulo">{titulo}</h2>}
            {sub && <p className="atalaya-panel__sub">{sub}</p>}
          </div>
          {acciones && <div className="atalaya-panel__acciones">{acciones}</div>}
        </header>
      )}
      <div
        className={cx(
          "atalaya-panel__cuerpo",
          sinRelleno && "atalaya-panel__cuerpo--sin-relleno",
        )}
      >
        {children}
      </div>
    </section>
  );
}
