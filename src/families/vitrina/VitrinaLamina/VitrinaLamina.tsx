import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import type { PictoCategoriaName } from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaLamina.scss";

export interface VitrinaLaminaProps {
  /** El cartel de sección: qué es la cosa. */
  picto: PictoCategoriaName;
  /** El color de la placa (hex claro). Va INLINE a propósito: es lo que vuela al carrito. */
  matiz: string;
  /** Tinta del pictograma. Default: la tinta de la familia (inline, por la misma razón). */
  tinta?: string;
  ratio?: "1" | "4/5" | "16/9" | "3/2";
  /** Tamaño del pictograma según dónde vive la lámina. */
  tamano?: "mini" | "tarjeta" | "galeria";
  /** Etiqueta pequeña abajo ("M · Rojo", "Lado A"). */
  etiqueta?: string;
  /** Con él es una imagen con nombre; sin él, decoración. */
  label?: string;
  /**
   * Foto real opcional: si viene, reemplaza el picto (cover, mismo marco/
   * ratio/radio/sombra de la lámina). Sin ella, la lámina de siempre — un
   * consumidor que nunca la pasa no cambia en nada.
   */
  foto?: string;
  className?: string;
}

const PICTO = { mini: 28, tarjeta: 56, galeria: 120 } as const;

/**
 * Lámina VITRINA: la "foto" del producto sin foto. Una placa de color plano
 * con el pictograma de su sección, como el cartel de un pasillo de
 * supermercado: pesa cero, escala sin pixelarse y no depende del material
 * de nadie. Los colores van inline porque la lámina es lo que se clona y
 * vuela hasta el carrito, fuera del scope de la familia. Cuando un
 * consumidor SÍ tiene una foto real de su catálogo (`foto`), reemplaza el
 * picto sin perder el marco — el picto queda de reserva para cuando no hay
 * foto, no al revés.
 */
const VitrinaLamina = forwardRef<HTMLSpanElement, VitrinaLaminaProps>(function VitrinaLamina(
  { picto, matiz, tinta = "#141413", ratio = "1", tamano = "tarjeta", etiqueta, label, foto, className },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx("vitrina-lamina", `vitrina-lamina--${tamano}`, className)}
      style={{ background: matiz, color: tinta, aspectRatio: ratio.replace("/", " / ") } as CSSProperties}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {foto ? <img src={foto} alt="" className="vitrina-lamina__foto" /> : <VitrinaPicto name={picto} size={PICTO[tamano]} />}
      {etiqueta && <span className="vitrina-lamina__etiqueta">{etiqueta}</span>}
    </span>
  );
});

export default VitrinaLamina;
