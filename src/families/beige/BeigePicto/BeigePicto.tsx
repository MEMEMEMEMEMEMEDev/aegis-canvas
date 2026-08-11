import { cx } from "../../../utils/cx";
import "../beige.scss";
import "./BeigePicto.scss";

export type BeigePictoName =
  | "pc"
  | "carpeta"
  | "chip"
  | "altavoz"
  | "micro"
  | "camara"
  | "mundo"
  | "nota"
  | "consola"
  | "engranaje"
  | "info"
  | "advertencia"
  | "error";

export interface BeigePictoProps {
  name: BeigePictoName;
  /** Lado en píxeles. Múltiplos de 16 para que la rejilla caiga entera. */
  size?: number;
  className?: string;
}

// Un rect de la rejilla 16×16. Toda la lámina está dibujada así: iconos
// propios, pixel a pixel — ningún asset de ningún sistema operativo real.
const R = (x: number, y: number, w: number, h: number, f: string, key?: string) => (
  <rect key={key ?? `${x}-${y}-${w}-${h}-${f}`} x={x} y={y} width={w} height={h} fill={f} />
);

// La paleta de 8 tintas de la lámina (VGA de espíritu).
const N = "#0a0a0a"; // negro
const B = "#ffffff"; // blanco
const G = "#c0c0c0"; // plata
const S = "#808080"; // sombra
const T = "#008080"; // verde azulado
const C = "#00ffff"; // cian pantalla
const A = "#ffce52"; // amarillo manila
const M = "#000080"; // marino

const LAMINA: Record<BeigePictoName, React.ReactNode> = {
  pc: (
    <>
      {R(2, 1, 12, 9, N)}
      {R(3, 2, 10, 7, G)}
      {R(4, 3, 8, 5, T)}
      {R(4, 3, 3, 2, C)}
      {R(7, 10, 2, 1, S)}
      {R(4, 11, 8, 2, G)}
      {R(4, 13, 8, 1, S)}
    </>
  ),
  carpeta: (
    <>
      {R(1, 3, 6, 2, N)}
      {R(1, 5, 14, 9, N)}
      {R(2, 4, 4, 1, A)}
      {R(2, 6, 12, 7, A)}
      {R(2, 6, 12, 2, "#ffe28a")}
      {R(2, 12, 12, 1, "#c99f2e")}
    </>
  ),
  chip: (
    <>
      {R(4, 4, 8, 8, N)}
      {R(5, 5, 6, 6, T)}
      {R(6, 6, 4, 4, C)}
      {R(7, 7, 2, 2, M)}
      {[3, 6, 9, 12].map((x) => R(x, 1, 1, 3, S, `pt${x}`))}
      {[3, 6, 9, 12].map((x) => R(x, 12, 1, 3, S, `pb${x}`))}
      {[1, 12].map((x) => [5, 8, 11].map((y) => R(x, y, 3, 1, S, `pl${x}-${y}`)))}
    </>
  ),
  altavoz: (
    <>
      {R(2, 6, 3, 4, N)}
      {R(5, 4, 3, 8, N)}
      {R(3, 7, 2, 2, S)}
      {R(5, 5, 2, 6, G)}
      {R(9, 7, 1, 2, T)}
      {R(11, 5, 1, 6, T)}
      {R(13, 3, 1, 10, T)}
    </>
  ),
  micro: (
    <>
      {R(6, 1, 4, 7, N)}
      {R(7, 2, 2, 5, G)}
      {R(5, 8, 6, 1, S)}
      {R(7, 9, 2, 3, N)}
      {R(4, 12, 8, 2, N)}
      {R(5, 13, 6, 1, S)}
    </>
  ),
  camara: (
    <>
      {R(1, 4, 10, 9, N)}
      {R(2, 5, 8, 7, G)}
      {R(3, 6, 5, 5, N)}
      {R(4, 7, 3, 3, T)}
      {R(4, 7, 1, 1, C)}
      {R(11, 6, 4, 5, N)}
      {R(12, 7, 2, 3, S)}
    </>
  ),
  mundo: (
    <>
      {R(4, 2, 8, 1, N)}
      {R(2, 3, 12, 1, N)}
      {R(1, 4, 14, 8, N)}
      {R(2, 12, 12, 1, N)}
      {R(4, 13, 8, 1, N)}
      {R(4, 3, 8, 1, T)}
      {R(2, 4, 12, 8, T)}
      {R(4, 12, 8, 1, T)}
      {R(5, 4, 3, 3, "#22aa66")}
      {R(9, 7, 3, 4, "#22aa66")}
      {R(3, 8, 3, 2, "#22aa66")}
      {R(7, 2, 1, 12, "#006666")}
      {R(2, 7, 12, 1, "#006666")}
    </>
  ),
  nota: (
    <>
      {R(3, 1, 10, 14, N)}
      {R(4, 2, 8, 12, B)}
      {R(9, 2, 3, 3, S)}
      {R(9, 2, 2, 2, G)}
      {R(5, 5, 6, 1, S)}
      {R(5, 7, 6, 1, S)}
      {R(5, 9, 4, 1, S)}
    </>
  ),
  consola: (
    <>
      {R(1, 3, 14, 10, N)}
      {R(2, 4, 12, 8, "#101010")}
      {R(3, 5, 1, 1, "#33ff66")}
      {R(4, 5, 3, 1, "#33ff66")}
      {R(3, 7, 5, 1, "#1f9944")}
      {R(3, 9, 2, 1, "#33ff66")}
    </>
  ),
  engranaje: (
    <>
      {R(6, 1, 4, 14, S)}
      {R(1, 6, 14, 4, S)}
      {R(3, 3, 10, 10, S)}
      {R(4, 4, 8, 8, G)}
      {R(6, 6, 4, 4, N)}
    </>
  ),
  info: (
    <>
      {R(4, 1, 8, 1, M)}
      {R(2, 2, 12, 2, M)}
      {R(1, 4, 14, 8, M)}
      {R(2, 12, 12, 2, M)}
      {R(4, 14, 8, 1, M)}
      {R(7, 3, 2, 2, B)}
      {R(7, 6, 2, 6, B)}
    </>
  ),
  advertencia: (
    <>
      {R(7, 1, 2, 2, N)}
      {R(6, 3, 4, 3, N)}
      {R(5, 6, 6, 3, N)}
      {R(4, 9, 8, 3, N)}
      {R(3, 12, 10, 3, N)}
      {R(7, 2, 2, 1, A)}
      {R(6, 4, 4, 2, A, "a1")}
      {R(5, 7, 6, 2, A, "a2")}
      {R(4, 10, 8, 2, A, "a3")}
      {R(4, 13, 8, 1, A)}
      {R(7, 4, 2, 6, N)}
      {R(7, 11, 2, 2, N)}
    </>
  ),
  error: (
    <>
      {R(4, 1, 8, 1, "#c00000")}
      {R(2, 2, 12, 2, "#c00000")}
      {R(1, 4, 14, 8, "#c00000")}
      {R(2, 12, 12, 2, "#c00000")}
      {R(4, 14, 8, 1, "#c00000")}
      {R(4, 4, 2, 2, B)}
      {R(10, 4, 2, 2, B)}
      {R(5, 5, 2, 2, B)}
      {R(9, 5, 2, 2, B)}
      {R(6, 6, 4, 4, B)}
      {R(5, 9, 2, 2, B)}
      {R(9, 9, 2, 2, B)}
      {R(4, 10, 2, 2, B)}
      {R(10, 10, 2, 2, B)}
    </>
  ),
};

/**
 * La lámina de pictogramas del sistema: iconos de píxel propios, dibujados
 * en rejilla de 16×16. Siempre decorativos — el nombre va en texto al lado.
 */
export default function BeigePicto({ name, size = 32, className }: BeigePictoProps) {
  return (
    <svg
      className={cx("beige-picto", className)}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {LAMINA[name]}
    </svg>
  );
}
