import type { Categoria, CategoriaId } from "./tipos";

// Placas claras: la tinta del pictograma da ≥ 12:1 sobre todas.
export const CATEGORIAS: Categoria[] = [
  { id: "tecnologia", nombre: "Tecnología", matiz: "#dbe7f5", picto: "tecnologia" },
  { id: "hogar", nombre: "Hogar y cocina", matiz: "#f3e8d8", picto: "hogar" },
  { id: "ferreteria", nombre: "Ferretería", matiz: "#ffe1d1", picto: "ferreteria" },
  { id: "deporte", nombre: "Deporte y outdoor", matiz: "#dcefe0", picto: "deporte" },
  { id: "moda", nombre: "Moda", matiz: "#efe1ea", picto: "moda" },
  { id: "belleza", nombre: "Belleza y cuidado", matiz: "#fbe6e0", picto: "belleza" },
  { id: "juguetes", nombre: "Juguetes", matiz: "#fff1c9", picto: "juguetes" },
  { id: "libreria", nombre: "Librería y oficina", matiz: "#e6e6f5", picto: "libreria" },
];

export const CATEGORIA = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c])) as Record<CategoriaId, Categoria>;
