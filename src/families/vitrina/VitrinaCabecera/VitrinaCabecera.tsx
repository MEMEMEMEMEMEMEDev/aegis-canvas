import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaCabecera.scss";

export type VitrinaCabeceraDestino = "inicio" | "favoritos" | "cuenta" | "cesta" | "menu" | (string & {});

export interface VitrinaCabeceraProps {
  /** El logo: texto o nodo. */
  marca: ReactNode;
  /** Mensajes de la barra promo de arriba; rotan solos. */
  promo?: string[];
  /** Links de la fila (solo ≥md). */
  enlaces?: Array<{ id: string; label: string }>;
  /** El buscador. Sin él, no hay caja. */
  busqueda?: {
    valor: string;
    onCambio: (v: string) => void;
    onBuscar: (v: string) => void;
    placeholder?: string;
  };
  favoritos?: number;
  cesta?: number;
  /** Nombre del usuario con sesión, o nada. */
  usuario?: string | null;
  onIr: (destino: VitrinaCabeceraDestino) => void;
  className?: string;
}

/**
 * Cabecera VITRINA: la barra de la tienda. Promo que rota arriba, logo,
 * links de categoría, el buscador y los tres iconos con sus cifras. En el
 * teléfono se compacta (logo, lupa, carrito) y el buscador baja a su
 * propia fila. El botón de la cesta lleva `data-vitrina-cesta`: ahí
 * aterriza lo que vuela desde una tarjeta.
 */
export default function VitrinaCabecera({ marca, promo, enlaces, busqueda, favoritos = 0, cesta = 0, usuario, onIr, className }: VitrinaCabeceraProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!promo || promo.length < 2) return undefined;
    const id = window.setInterval(() => setI((x) => (x + 1) % promo.length), 3800);
    return () => window.clearInterval(id);
  }, [promo]);

  function buscar(e: FormEvent) {
    e.preventDefault();
    busqueda?.onBuscar(busqueda.valor.trim());
  }

  const caja = busqueda && (
    <form className="vitrina-cabecera__busqueda" role="search" onSubmit={buscar}>
      <VitrinaPicto name="lupa" size={18} className="vitrina-cabecera__lupa" />
      <input
        type="search"
        className="vitrina-cabecera__input"
        placeholder={busqueda.placeholder ?? "Buscar productos, marcas y más…"}
        aria-label="Buscar en la tienda"
        value={busqueda.valor}
        onChange={(e) => busqueda.onCambio(e.target.value)}
        enterKeyHint="search"
      />
    </form>
  );

  return (
    <header className={cx("vitrina-cabecera", className)}>
      {promo && promo.length > 0 && (
        <div className="vitrina-cabecera__promo" aria-live="off">
          <span key={i} className="vitrina-cabecera__promo-texto">
            <VitrinaPicto name="rayo" size={14} />
            {promo[i] ?? promo[0]}
          </span>
        </div>
      )}

      <div className="vitrina-cabecera__barra">
        <button type="button" className="vitrina-cabecera__icono vitrina-cabecera__menu" onClick={() => onIr("menu")} aria-label="Abrir menú">
          <VitrinaPicto name="menu" />
        </button>

        <button type="button" className="vitrina-cabecera__marca" onClick={() => onIr("inicio")} aria-label="Ir al inicio">
          {marca}
        </button>

        {enlaces && enlaces.length > 0 && (
          <nav className="vitrina-cabecera__enlaces" aria-label="Secciones">
            {enlaces.map((e) => (
              <button key={e.id} type="button" className="vitrina-cabecera__enlace" onClick={() => onIr(e.id)}>
                {e.label}
              </button>
            ))}
          </nav>
        )}

        <div className="vitrina-cabecera__ancha">{caja}</div>

        <div className="vitrina-cabecera__iconos">
          <button type="button" className="vitrina-cabecera__icono" onClick={() => onIr("favoritos")} aria-label={`Favoritos${favoritos ? `, ${favoritos}` : ""}`}>
            <VitrinaPicto name="corazon" />
            {favoritos > 0 && <span className="vitrina-cabecera__badge vitrina-cabecera__badge--suave">{favoritos}</span>}
          </button>
          <button type="button" className="vitrina-cabecera__icono vitrina-cabecera__usuario" onClick={() => onIr("cuenta")} aria-label={usuario ? `Cuenta de ${usuario}` : "Entrar a tu cuenta"}>
            <VitrinaPicto name="usuario" />
            {usuario && <span className="vitrina-cabecera__nombre">{usuario}</span>}
          </button>
          <button type="button" className="vitrina-cabecera__icono" onClick={() => onIr("cesta")} aria-label={`Cesta${cesta ? `, ${cesta} artículos` : ", vacía"}`} data-vitrina-cesta="">
            <VitrinaPicto name="carrito" />
            {cesta > 0 && <span className="vitrina-cabecera__badge">{cesta > 99 ? "99+" : cesta}</span>}
          </button>
        </div>
      </div>

      {caja && <div className="vitrina-cabecera__estrecha">{caja}</div>}
    </header>
  );
}
