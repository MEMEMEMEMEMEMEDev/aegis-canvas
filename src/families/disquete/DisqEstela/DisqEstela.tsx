import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqEstela.scss";

export interface DisqEstelaProps {
  /** Cuántas líneas lleva la estela. */
  lineas?: number;
  /** primarias: amarillo/rojo/azul (referencia 4). espectro: las cinco. */
  tones?: "primarias" | "espectro";
  /** Hacia dónde apunta la velocidad. */
  align?: "izq" | "der";
  /** Alto total en em. */
  height?: number;
  className?: string;
}

// Los largos NO son aleatorios: salen del índice con dos primos, así que la
// misma estela se imprime siempre igual — y ninguna captura de pantalla
// delata un build distinto.
const largo = (i: number): number => 38 + ((i * 29) % 47);

/**
 * Estela DISQUETE: las líneas de velocidad que en la referencia salen
 * disparadas de un cráneo o de un globo — tinta amarilla, roja y azul en
 * grosores finos, cada una con su largo.
 *
 * Puramente decorativa. Al entrar en pantalla las líneas se estiran una vez,
 * escalonadas (transform, compositor); con prefers-reduced-motion nacen
 * quietas.
 */
export default function DisqEstela({
  lineas = 9,
  tones = "primarias",
  align = "der",
  height = 3,
  className,
}: DisqEstelaProps) {
  return (
    <span
      className={cx("disq-estela", `disq-estela--${tones}`, `disq-estela--${align}`, className)}
      style={{ height: `${height}em` }}
      aria-hidden="true"
    >
      {Array.from({ length: lineas }, (_, i) => (
        <i key={i} style={{ "--disq-estela-w": `${largo(i)}%`, "--disq-estela-i": i } as CSSProperties} />
      ))}
    </span>
  );
}
