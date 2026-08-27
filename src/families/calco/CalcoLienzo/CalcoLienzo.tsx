import type { ElementType, ReactNode, CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../calco.scss";
import "./CalcoLienzo.scss";

export type CalcoTono = "lima" | "sol" | "crema" | "cielo" | "rosa" | "naranja" | "coral";

export interface CalcoLienzoProps {
  /** El color del campo. Lima es la referencia; el resto son variantes. */
  tono?: CalcoTono;
  /** Trama de semitono sobre el campo. */
  semitono?: boolean;
  /** Chispas ✦ flotando, como en los carteles. Decorativas: van aria-hidden. */
  chispas?: boolean;
  /**
   * Fija la pantalla al viewport: 100dvh, sin scroll de página. Es el modo
   * de la consola — lo que scrollea es lo que hay DENTRO de una ventana,
   * nunca el lienzo. Apagado, el lienzo crece con su contenido (catálogo).
   */
  fijo?: boolean;
  /** La barra de arriba (CalcoCabecera) — fila propia de la rejilla. */
  cabecera?: ReactNode;
  /** La barra de abajo (CalcoDock) — fila propia, pegada al borde inferior. */
  pie?: ReactNode;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

// Doce chispas con posición fija por índice. Fijas y no aleatorias: dos
// renders del mismo lienzo tienen que pintar lo mismo, y el servidor y el
// navegador también.
const CHISPAS = [
  [6, 12, 1.1],
  [88, 8, 0.8],
  [94, 46, 1.3],
  [12, 78, 0.9],
  [72, 90, 1.2],
  [40, 5, 0.7],
  [58, 96, 0.9],
  [3, 50, 1.0],
  [96, 82, 0.8],
  [30, 93, 1.1],
  [80, 30, 0.7],
  [20, 35, 0.8],
] as const;

/**
 * El lienzo: el campo de color plano sobre el que se pega todo lo demás.
 *
 * Es también el chasis de la consola: con `fijo`, ocupa el viewport exacto
 * y reparte tres filas —cabecera, escena, pie— de las que solo la del medio
 * puede contener algo que scrollee, y solo por dentro. Con `env(safe-area-
 * inset-*)` en los cuatro lados: en un teléfono con notch, la cabecera no
 * se mete debajo del reloj ni el dock debajo de la barra de gestos.
 */
export default function CalcoLienzo({
  tono = "lima",
  semitono = false,
  chispas = false,
  fijo = false,
  cabecera,
  pie,
  as: Tag = "div",
  className,
  children,
}: CalcoLienzoProps) {
  return (
    <Tag
      className={cx(
        "calco-lienzo",
        `calco-lienzo--${tono}`,
        semitono && "calco-lienzo--semitono",
        fijo && "calco-lienzo--fijo",
        className,
      )}
    >
      {chispas && (
        <div className="calco-lienzo__chispas" aria-hidden="true">
          {CHISPAS.map(([x, y, s], i) => (
            <span
              key={i}
              className="calco-lienzo__chispa"
              style={{ left: `${x}%`, top: `${y}%`, "--calco-chispa-escala": s, "--calco-i": i } as CSSProperties}
            >
              ✦
            </span>
          ))}
        </div>
      )}

      {cabecera && <div className="calco-lienzo__cabecera">{cabecera}</div>}
      <div className="calco-lienzo__escena">{children}</div>
      {pie && <div className="calco-lienzo__pie">{pie}</div>}
    </Tag>
  );
}
