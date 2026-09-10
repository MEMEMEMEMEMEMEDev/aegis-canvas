import type { Vendedor, VendedorId } from "./tipos";

export const VENDEDORES: Vendedor[] = [
  { id: "tecnoaustral", nombre: "TecnoAustral", ciudad: "Puerto Montt", valoracion: 4.7, ventas: 12840, desde: 2016 },
  { id: "casa-lumbre", nombre: "Casa Lumbre", ciudad: "Valparaíso", valoracion: 4.5, ventas: 6210, desde: 2019 },
  { id: "ferreteria-lautaro", nombre: "Ferretería Lautaro", ciudad: "Temuco", valoracion: 4.9, ventas: 21930, desde: 1987, destacado: true },
  { id: "andes-outdoor", nombre: "Andes Outdoor", ciudad: "Santiago", valoracion: 4.6, ventas: 8750, desde: 2014 },
  { id: "tienda-cauquen", nombre: "Tienda Cauquén", ciudad: "Concepción", valoracion: 4.4, ventas: 4380, desde: 2021 },
  { id: "papelera-bosque", nombre: "Papelera Bosque", ciudad: "Valdivia", valoracion: 4.8, ventas: 9960, desde: 2010 },
];

export const VENDEDOR = Object.fromEntries(VENDEDORES.map((v) => [v.id, v])) as Record<VendedorId, Vendedor>;
