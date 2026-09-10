import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaBoton from "../VitrinaBoton/VitrinaBoton";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import type { PictoCategoriaName, PictoUiName } from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaCartel.scss";

export interface VitrinaCartelAccion {
  label: string;
  onClick: () => void;
  /** Default: coral en superficie, bloque-texto en bloque, tinta en coral. */
  tono?: "coral" | "tinta";
  variant?: "solid" | "outline";
}

export interface VitrinaCartelProps {
  /** superficie (el hero claro), bloque (la colección en negro) o coral (la venta flash). */
  tono?: "superficie" | "bloque" | "coral";
  sobre?: ReactNode;
  titulo: ReactNode;
  texto?: ReactNode;
  accion?: VitrinaCartelAccion;
  secundaria?: VitrinaCartelAccion;
  /** Tarjetas pequeñas que flotan a la derecha (cada una con su --vitrina-i). */
  flotantes?: ReactNode[];
  /** Lo que va a la derecha en vez de flotantes: una cuenta atrás, una lámina grande. */
  derecha?: ReactNode;
  /** Algo bajo las acciones: avatares, "Más de 50.000 clientes". */
  pie?: ReactNode;
  /** Altura mínima del cartel. */
  alto?: "normal" | "hero";
  className?: string;
}

/**
 * Cartel VITRINA: el hero y los banners. Tres tonos con la misma
 * estructura — kicker, titular, texto, acciones — y a la derecha o bien
 * tarjetas que flotan (el hero de la referencia, con productos alrededor
 * de la modelo) o bien lo que se le pase (la cuenta atrás de la flash).
 */
export default function VitrinaCartel({
  tono = "superficie",
  sobre,
  titulo,
  texto,
  accion,
  secundaria,
  flotantes,
  derecha,
  pie,
  alto = "normal",
  className,
}: VitrinaCartelProps) {
  const tonoBoton = (a: VitrinaCartelAccion, principal: boolean) => {
    if (a.tono) return a.tono;
    if (tono === "coral") return "tinta";
    if (tono === "bloque") return principal ? "tinta" : "tinta";
    return principal ? "coral" : "tinta";
  };

  return (
    <section className={cx("vitrina-cartel", `vitrina-cartel--${tono}`, `vitrina-cartel--${alto}`, className)}>
      <div className="vitrina-cartel__col">
        {sobre && <span className="vitrina-cartel__sobre">{sobre}</span>}
        <h2 className="vitrina-cartel__titulo">{titulo}</h2>
        {texto && <p className="vitrina-cartel__texto">{texto}</p>}
        {(accion || secundaria) && (
          <div className="vitrina-cartel__acciones">
            {accion && (
              <VitrinaBoton
                tono={tonoBoton(accion, true)}
                variant={accion.variant ?? "solid"}
                onClick={accion.onClick}
                className={tono === "bloque" ? "vitrina-cartel__boton-claro" : undefined}
                icono={<VitrinaPicto name="flecha-der" />}
              >
                {accion.label}
              </VitrinaBoton>
            )}
            {secundaria && (
              <VitrinaBoton
                tono={tonoBoton(secundaria, false)}
                variant={secundaria.variant ?? "outline"}
                onClick={secundaria.onClick}
                className={tono === "bloque" ? "vitrina-cartel__boton-borde" : undefined}
              >
                {secundaria.label}
              </VitrinaBoton>
            )}
          </div>
        )}
        {pie && <div className="vitrina-cartel__pie">{pie}</div>}
      </div>

      {flotantes && flotantes.length > 0 && (
        <div className="vitrina-cartel__flotantes" aria-hidden="true">
          {flotantes.map((f, i) => (
            <div key={i} className="vitrina-cartel__flotante" style={{ "--vitrina-i": i } as CSSProperties}>
              {f}
            </div>
          ))}
        </div>
      )}
      {derecha && <div className="vitrina-cartel__derecha">{derecha}</div>}
    </section>
  );
}

export interface VitrinaCartelFranjaItem {
  picto: PictoCategoriaName | PictoUiName;
  titulo: string;
  texto: string;
}

/** La franja de confianza: envío gratis, pago seguro, devoluciones, soporte. */
export function VitrinaCartelFranja({ items, className }: { items: VitrinaCartelFranjaItem[]; className?: string }) {
  return (
    <ul className={cx("vitrina-franja", className)}>
      {items.map((it) => (
        <li key={it.titulo} className="vitrina-franja__item">
          <span className="vitrina-franja__picto" aria-hidden="true">
            <VitrinaPicto name={it.picto} size={28} />
          </span>
          <span className="vitrina-franja__col">
            <span className="vitrina-franja__titulo">{it.titulo}</span>
            <span className="vitrina-franja__texto">{it.texto}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
