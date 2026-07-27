import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoPhone.scss";

export interface TebeoPhoneProps {
  /** Contenido de la pantalla (una mini-app TEBEO, un canvas, una captura…). */
  children: ReactNode;
  /** Isla/notch superior. Default: true. */
  island?: boolean;
  /** Barra home inferior. Default: true. */
  homebar?: boolean;
  /** Inclinación en grados (se endereza al hover). Default: 0. */
  tilt?: number;
  /** Ancho en px. Default: 300. */
  width?: number;
  className?: string;
}

/**
 * Mockup de teléfono TEBEO: marco de tinta gordo, isla dinámica y barra home.
 * Para enseñar apps móviles dentro del portafolio como objetos físicos.
 * Con `tilt` queda apoyado en ángulo y se endereza al pasar el mouse.
 */
export default function TebeoPhone({
  children,
  island = true,
  homebar = true,
  tilt = 0,
  width = 300,
  className,
}: TebeoPhoneProps) {
  return (
    <div
      className={cx("tebeo-phone", className)}
      style={{ width, rotate: `${tilt}deg` }}
    >
      <div className="tebeo-phone__screen">
        {island && <span className="tebeo-phone__island" aria-hidden="true" />}
        <div className="tebeo-phone__content">{children}</div>
        {homebar && <span className="tebeo-phone__homebar" aria-hidden="true" />}
      </div>
    </div>
  );
}
