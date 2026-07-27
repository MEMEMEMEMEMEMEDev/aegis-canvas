// design-sync bundle entry: núcleo + familia MESOSOICOS en un solo módulo.
// Un único bundle evita duplicar instancias (contextos React compartidos
// entre primitivos y familia). Compilado por build-entry.mjs.
export * from "../src/index";
export * from "../src/families/mesosoicos/index";
export { PreviewSurface } from "./preview-surface";
