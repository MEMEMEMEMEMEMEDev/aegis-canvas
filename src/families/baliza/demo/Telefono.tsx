import type { ReactNode } from "react";
import "./demo.scss";

/**
 * Marco de teléfono para MAQUETAR la app del trabajador en Storybook. No es
 * parte de la familia: la app real es Kotlin (Compose) y de aquí se llevan
 * los tokens y las medidas, no este marco. `sinMesa` lo deja solo (para
 * meterlo en una captura de la landing).
 */
export default function Telefono({ children, pie, hora = "13:31", sinMesa = false }: { children: ReactNode; pie?: ReactNode; hora?: string; sinMesa?: boolean }) {
  const telefono = (
    <div className="baliza-scope demo-telefono">
      <div className="demo-telefono__estado" aria-hidden="true">
        <span>{hora}</span>
        <span className="demo-telefono__isla" />
        <span>4G ▮▮▮▯ 82%</span>
      </div>
      <div className="demo-telefono__pantalla">{children}</div>
      {pie}
    </div>
  );
  return sinMesa ? telefono : <div className="demo-mesa">{telefono}</div>;
}
