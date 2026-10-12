import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaNavInferior.scss";

export interface BalizaDestino {
  id: string;
  nombre: string;
  icono: ReactNode;
  /** Un punto que pide atención (un viaje por vencer). */
  aviso?: boolean;
}

export interface BalizaNavInferiorProps {
  destinos: BalizaDestino[];
  activo: string;
  onCambio: (id: string) => void;
  etiqueta?: string;
  className?: string;
}

/** La navegación de la app del trabajador: tres destinos, al alcance del pulgar. */
export default function BalizaNavInferior({ destinos, activo, onCambio, etiqueta = "Principal", className }: BalizaNavInferiorProps) {
  return (
    <nav className={cx("baliza-nav", className)} aria-label={etiqueta}>
      {destinos.map((d) => (
        <button
          key={d.id}
          type="button"
          className={cx("baliza-nav__destino", d.id === activo && "is-activo")}
          aria-current={d.id === activo ? "page" : undefined}
          onClick={() => onCambio(d.id)}
        >
          <span className="baliza-nav__icono">
            {d.icono}
            {d.aviso && <span className="baliza-nav__punto" aria-hidden="true" />}
          </span>
          {d.nombre}
          {d.aviso && <span className="baliza-oculto">, requiere atención</span>}
        </button>
      ))}
    </nav>
  );
}
