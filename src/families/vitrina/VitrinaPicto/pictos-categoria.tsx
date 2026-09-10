// Rejilla 48×48, trazo de línea más grueso, currentColor. Son los carteles
// de sección del supermercado: uno por categoría, más los cuatro de la
// franja de confianza. Dibujo propio.

export type PictoCategoriaName =
  | "tecnologia"
  | "hogar"
  | "ferreteria"
  | "deporte"
  | "moda"
  | "belleza"
  | "juguetes"
  | "libreria"
  | "envio"
  | "seguro"
  | "devoluciones"
  | "soporte";

const c = (cx: number, cy: number, r: number, k: string) => <circle key={k} cx={cx} cy={cy} r={r} />;
const p = (d: string, k: string) => <path key={k} d={d} />;

export const PICTOS_CATEGORIA: Record<PictoCategoriaName, React.ReactNode> = {
  // Un portátil abierto.
  tecnologia: [p("M8 12h32v20H8z", "a"), p("M4 34h40v3H4z", "b"), p("M20 16h8", "c")],
  // Una olla con sus asas y la tapa.
  hogar: p("M10 20h28v14a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4zM6 20h8M34 20h8M14 14h20M24 8v6", "a"),
  // La llave inglesa.
  ferreteria: p("M30 8a8 8 0 0 0-8 12L8 34l6 6 14-14a8 8 0 0 0 12-8l-6 6-4-4 6-6z", "a"),
  // Una zapatilla de perfil.
  deporte: p("M6 30c0-3 4-4 8-6l4-8 6 2 4 4c6 2 12 4 14 8v4H6zM6 34h36M20 22l4 4M24 20l4 4", "a"),
  // La camiseta.
  moda: p("M18 8l-10 6 4 8 4-2v20h16V20l4 2 4-8-10-6a6 6 0 0 1-12 0z", "a"),
  // El frasco con tapa.
  belleza: p("M18 18h12v22a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2zM20 8h8v10h-8zM18 26h12", "a"),
  // Un robot de bloques.
  juguetes: p("M14 18h20v18H14zM20 12h8v6h-8zM24 6v6M19 25h2M27 25h2M20 32h8M8 22h6v8H8zM34 22h6v8h-6z", "a"),
  // Un libro abierto.
  libreria: p("M8 10h14a4 4 0 0 1 4 4v24a4 4 0 0 0-4-4H8zM40 10H26a4 4 0 0 0-4 4v24a4 4 0 0 1 4-4h14z", "a"),
  // El camión de reparto.
  envio: [p("M4 14h26v18H4zM30 20h8l6 6v6H30z", "a"), c(11, 36, 3, "b"), c(37, 36, 3, "c")],
  // El escudo con el check.
  seguro: p("M24 6l16 6v12c0 10-7 16-16 18C15 40 8 34 8 24V12l16-6zM17 24l5 5 9-10", "a"),
  // La flecha que vuelve.
  devoluciones: p("M8 24a16 16 0 1 0 5-11.6M8 8v9h9", "a"),
  // Los auriculares de soporte.
  soporte: p("M8 26a16 16 0 0 1 32 0M8 26v10h6V24H8M40 26v10h-6V24h6M34 36v2a4 4 0 0 1-4 4h-6", "a"),
};
