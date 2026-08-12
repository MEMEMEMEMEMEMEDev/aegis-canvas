import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqPantalla.scss";

export type DisqPantallaLayout = "tienda" | "panel" | "agenda" | "landing" | "chat";

export interface DisqPantallaProps {
  /** Qué interfaz dibuja la pantalla. */
  layout?: DisqPantallaLayout;
  /** Tinta de acento de la interfaz dibujada. */
  tone?: "indigo" | "magenta" | "teal" | "coral" | "band";
  /**
   * Nombre accesible. Con él la pantalla es una imagen con descripción; sin
   * él es decoración pura. Una maqueta que ilustra de qué va un demo SÍ
   * comunica, así que casi siempre debería llevarlo.
   */
  label?: string;
  /** Enciende el resplandor del tubo alrededor. */
  glow?: boolean;
  className?: string;
}

/** Bloque de la maqueta. `f` es el flex-grow; el resto son clases. */
const B = (clase: string, key: number, style?: CSSProperties) => (
  <i key={key} className={clase} style={style} />
);

/**
 * PANTALLA DISQUETE: la maqueta de una interfaz, dibujada con bloques.
 *
 * No es una captura ni un mockup importado: son divs con las proporciones de
 * la interfaz que representan —una rejilla de productos, un panel con su
 * gráfico, un calendario, una conversación— así que pesa cero, escala sin
 * pixelarse y no depende de material de nadie. Es la misma decisión que el
 * resto de la familia: si se puede dibujar, se dibuja.
 *
 * Encima va el cristal: líneas de barrido y viñeta, la firma del tubo.
 */
export default function DisqPantalla({
  layout = "tienda",
  tone = "indigo",
  label,
  glow = false,
  className,
}: DisqPantallaProps) {
  return (
    <span
      className={cx(
        "disq-pantalla",
        `disq-pantalla--${tone}`,
        glow && "disq-pantalla--glow",
        className,
      )}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <span className="disq-pantalla__marco">
        <span className={cx("disq-pantalla__lienzo", `disq-pantalla__lienzo--${layout}`)}>
          {layout === "tienda" && (
            <>
              <span className="disq-pantalla__barra">
                {B("disq-pantalla__marca", 0)}
                {[0, 1, 2].map((i) => B("disq-pantalla__link", i))}
                {B("disq-pantalla__carro", 9)}
              </span>
              <span className="disq-pantalla__rejilla">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span className="disq-pantalla__ficha" key={i}>
                    <i className="disq-pantalla__foto" />
                    <i className="disq-pantalla__linea" />
                    <i className="disq-pantalla__precio" />
                  </span>
                ))}
              </span>
            </>
          )}

          {layout === "panel" && (
            <>
              <span className="disq-pantalla__flanco">
                {[0, 1, 2, 3, 4].map((i) => B("disq-pantalla__item", i))}
              </span>
              <span className="disq-pantalla__tablero">
                <span className="disq-pantalla__cifras">
                  {[0, 1, 2].map((i) => (
                    <span className="disq-pantalla__cifra" key={i}>
                      <i className="disq-pantalla__num" />
                      <i className="disq-pantalla__rotulo" />
                    </span>
                  ))}
                </span>
                <span className="disq-pantalla__grafico">
                  {[62, 38, 84, 51, 96, 44, 72].map((alto, i) =>
                    B("disq-pantalla__barra-dato", i, { height: `${alto}%` }),
                  )}
                </span>
                <span className="disq-pantalla__tabla">
                  {[0, 1, 2].map((i) => B("disq-pantalla__fila", i))}
                </span>
              </span>
            </>
          )}

          {layout === "agenda" && (
            <>
              <span className="disq-pantalla__barra">
                {B("disq-pantalla__marca", 0)}
                {B("disq-pantalla__link", 1)}
              </span>
              <span className="disq-pantalla__mes">
                {Array.from({ length: 28 }, (_, i) =>
                  B(
                    // Tres huecos tomados: los días que ya tienen hora.
                    [9, 14, 20].includes(i)
                      ? "disq-pantalla__dia disq-pantalla__dia--tomado"
                      : "disq-pantalla__dia",
                    i,
                  ),
                )}
              </span>
              <span className="disq-pantalla__horas">
                {[0, 1, 2].map((i) => B("disq-pantalla__hora", i))}
              </span>
            </>
          )}

          {layout === "landing" && (
            <>
              <span className="disq-pantalla__barra">
                {B("disq-pantalla__marca", 0)}
                {B("disq-pantalla__cta", 1)}
              </span>
              <span className="disq-pantalla__hero">
                {B("disq-pantalla__titular", 0)}
                {B("disq-pantalla__titular disq-pantalla__titular--corto", 1)}
                {B("disq-pantalla__boton", 2)}
              </span>
              <span className="disq-pantalla__tres">
                {[0, 1, 2].map((i) => B("disq-pantalla__columna", i))}
              </span>
            </>
          )}

          {layout === "chat" && (
            <>
              <span className="disq-pantalla__barra">
                {B("disq-pantalla__marca", 0)}
                {B("disq-pantalla__link", 1)}
              </span>
              <span className="disq-pantalla__hilo">
                {B("disq-pantalla__globo disq-pantalla__globo--yo", 0)}
                {B("disq-pantalla__globo disq-pantalla__globo--ia", 1)}
                {B("disq-pantalla__globo disq-pantalla__globo--ia disq-pantalla__globo--largo", 2)}
                {B("disq-pantalla__globo disq-pantalla__globo--yo disq-pantalla__globo--corto", 3)}
              </span>
              <span className="disq-pantalla__prompt" />
            </>
          )}
        </span>

        <span className="disq-pantalla__cristal" />
      </span>
    </span>
  );
}
