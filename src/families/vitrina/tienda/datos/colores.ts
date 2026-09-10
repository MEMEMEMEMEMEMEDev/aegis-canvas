import type { ColorId } from "./tipos";

// La placa de una variante de color tiñe la lámina; el nombre va en el
// selector. Tonos medios: la tinta del pictograma se lee sobre todos.
export const COLORES: Record<ColorId, { nombre: string; hex: string }> = {
  negro: { nombre: "Negro", hex: "#c9c9c7" },
  blanco: { nombre: "Blanco", hex: "#f2f2f0" },
  gris: { nombre: "Gris", hex: "#dcdcda" },
  rojo: { nombre: "Rojo", hex: "#f5c3bb" },
  azul: { nombre: "Azul", hex: "#c4d4ea" },
  verde: { nombre: "Verde", hex: "#c8e3cf" },
  arena: { nombre: "Arena", hex: "#e9dcc6" },
  coral: { nombre: "Coral", hex: "#ffc9b8" },
  madera: { nombre: "Madera", hex: "#e7d3bb" },
};

/** El color real del círculo del selector (más saturado que la placa). */
export const COLOR_MUESTRA: Record<ColorId, string> = {
  negro: "#2b2b2b",
  blanco: "#f7f7f5",
  gris: "#9a9a97",
  rojo: "#c8422f",
  azul: "#4a6fa5",
  verde: "#3f8a5a",
  arena: "#d9c8a9",
  coral: "#ff7a52",
  madera: "#b8865a",
};
