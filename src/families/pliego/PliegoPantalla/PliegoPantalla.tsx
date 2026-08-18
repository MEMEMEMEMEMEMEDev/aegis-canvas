import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoPantalla.scss";

export type PliegoPantallaLayout = "tienda" | "panel" | "agenda" | "landing" | "chat";

export interface PliegoPantallaProps {
  /** Qué interfaz dibuja la maqueta. */
  layout?: PliegoPantallaLayout;
  /**
   * Nombre accesible. Con él la maqueta es una imagen con descripción; sin él
   * es decoración pura. Una maqueta que ilustra de qué va un demo SÍ
   * comunica, así que casi siempre debería llevarlo.
   */
  label?: string;
  /** Invierte el papel: maqueta blanca sobre tinta. */
  invertida?: boolean;
  className?: string;
}

/** Bloque de la maqueta. */
const B = (clase: string, key: number, style?: CSSProperties) => (
  <i key={key} className={clase} style={style} />
);

/**
 * PANTALLA PLIEGO: la maqueta de una interfaz, dibujada a filete.
 *
 * No es una captura: son cajas con las proporciones de lo que representan
 * —una rejilla de productos, un panel con su gráfico, un mes de calendario,
 * una conversación—, así que pesa cero, escala sin pixelarse y no depende
 * del material de nadie.
 *
 * A diferencia de la maqueta de otras familias, aquí NO hay cristal ni
 * resplandor: PLIEGO es papel, y una maqueta de papel se dibuja con líneas y
 * manchas planas. El único color saturado se gasta en lo que en esa pantalla
 * es la acción — el precio, el botón, el día ocupado.
 */
export default function PliegoPantalla({
  layout = "tienda",
  label,
  invertida = false,
  className,
}: PliegoPantallaProps) {
  return (
    <span
      className={cx(
        "pliego-pantalla",
        `pliego-pantalla--${layout}`,
        invertida && "pliego-pantalla--invertida",
        className,
      )}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <span className="pliego-pantalla__lienzo">
        {layout === "tienda" && (
          <>
            <span className="pliego-pantalla__barra">
              {B("pliego-pantalla__marca", 0)}
              {[0, 1, 2].map((i) => B("pliego-pantalla__link", i))}
              {B("pliego-pantalla__accion", 9)}
            </span>
            <span className="pliego-pantalla__rejilla">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span className="pliego-pantalla__ficha" key={i}>
                  <i className="pliego-pantalla__foto" />
                  <i className="pliego-pantalla__linea" />
                  <i className="pliego-pantalla__precio" />
                </span>
              ))}
            </span>
          </>
        )}

        {layout === "panel" && (
          <>
            <span className="pliego-pantalla__flanco">
              {[0, 1, 2, 3, 4].map((i) => B("pliego-pantalla__item", i))}
            </span>
            <span className="pliego-pantalla__tablero">
              <span className="pliego-pantalla__cifras">
                {[0, 1, 2].map((i) => (
                  <span className="pliego-pantalla__cifra" key={i}>
                    <i className="pliego-pantalla__num" />
                    <i className="pliego-pantalla__rotulo" />
                  </span>
                ))}
              </span>
              <span className="pliego-pantalla__grafico">
                {[62, 38, 84, 51, 96, 44, 72].map((alto, i) =>
                  B("pliego-pantalla__dato", i, { height: `${alto}%` }),
                )}
              </span>
              <span className="pliego-pantalla__tabla">
                {[0, 1, 2].map((i) => B("pliego-pantalla__fila", i))}
              </span>
            </span>
          </>
        )}

        {layout === "agenda" && (
          <>
            <span className="pliego-pantalla__barra">
              {B("pliego-pantalla__marca", 0)}
              {B("pliego-pantalla__link", 1)}
            </span>
            <span className="pliego-pantalla__mes">
              {Array.from({ length: 28 }, (_, i) =>
                B(
                  // Tres huecos tomados: los días que ya tienen hora.
                  [9, 14, 20].includes(i)
                    ? "pliego-pantalla__dia pliego-pantalla__dia--tomado"
                    : "pliego-pantalla__dia",
                  i,
                ),
              )}
            </span>
            <span className="pliego-pantalla__horas">
              {[0, 1, 2].map((i) => B("pliego-pantalla__hora", i))}
            </span>
          </>
        )}

        {layout === "landing" && (
          <>
            <span className="pliego-pantalla__barra">
              {B("pliego-pantalla__marca", 0)}
              {B("pliego-pantalla__accion", 1)}
            </span>
            <span className="pliego-pantalla__hero">
              {B("pliego-pantalla__titular", 0)}
              {B("pliego-pantalla__titular pliego-pantalla__titular--corto", 1)}
              {B("pliego-pantalla__boton", 2)}
            </span>
            <span className="pliego-pantalla__tres">
              {[0, 1, 2].map((i) => B("pliego-pantalla__columna", i))}
            </span>
          </>
        )}

        {layout === "chat" && (
          <>
            <span className="pliego-pantalla__barra">
              {B("pliego-pantalla__marca", 0)}
              {B("pliego-pantalla__link", 1)}
            </span>
            <span className="pliego-pantalla__hilo">
              {B("pliego-pantalla__globo pliego-pantalla__globo--yo", 0)}
              {B("pliego-pantalla__globo pliego-pantalla__globo--ia", 1)}
              {B("pliego-pantalla__globo pliego-pantalla__globo--ia pliego-pantalla__globo--largo", 2)}
              {B("pliego-pantalla__globo pliego-pantalla__globo--yo pliego-pantalla__globo--corto", 3)}
            </span>
            <span className="pliego-pantalla__prompt" />
          </>
        )}
      </span>
    </span>
  );
}
