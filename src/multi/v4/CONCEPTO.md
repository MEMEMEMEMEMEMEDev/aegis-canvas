# MULTI V4 — el multiverso curado

> Decisiones tomadas el 2026-07-30 revisando refs/1–9 contra Multi V1–V3.

## Diagnóstico (por qué V4 existe)

Las nueve referencias de `refs/` comparten una estructura que V1–V3 no estaban
siguiendo: **todas son productos con dirección de arte fuerte sobre un
esqueleto UX completamente convencional**. Nav visible arriba, hero con
propuesta de valor, stats, cards, CTA evidente. La creatividad vive en la
*superficie* (tipografía, paleta, texturas, diagonales) — **nunca en la
navegación**.

V1–V3 hacían lo contrario: la creatividad estaba en la *mecánica* (nave,
warp, códigos de salto, hallazgos) y la superficie quedaba al servicio del
juego. El README lo decía con orgullo: "navegación rara adrede". Para un
portafolio UX/UI eso es regalarle fricción al usuario más importante — el
recruiter que decide en menos de 10 segundos si sigue mirando.

## Los tres principios de V4

1. **El esqueleto no juega; juega la piel.** Navegación siempre visible,
   hero que responde *quién / qué / cómo contactar* sin scroll, scroll
   natural, contacto a un clic. Toda la rareza se muda a la superficie
   (OBSIDIANA) y a widgets firma — nunca a la estructura.
2. **El contenido son casos de estudio reales.** Problema → proceso →
   resultado, con métricas verificables en los repos. Los tres casos
   fundacionales: `@ahroi/foundation` (design system), el portafolio Astro
   (SEO real) y `aegis v2` (GitOps con firma de imágenes). Nada de deducir
   habilidades: se cuentan.
3. **Los mundos no mueren: se degradan a exhibiciones.** Radio Cinta, Koi
   Matsuri, la Gaceta, el warp-pipeline… dejan de ser la navegación y pasan
   a ser *demos embebidas dentro del caso de estudio del design system*.
   El pipeline de "viajar = deployar" es perfecto como widget del caso
   aegis v2 — no como pantalla de carga obligatoria.

## OBSIDIANA, la familia del esqueleto

Nace de refs/3 (galería oscura de paneles diagonales). Es la primera familia
creada para el *esqueleto* del portafolio y no para un mundo:

- Carbón azulado, **un solo acento** (cian) — el trabajo es el color.
- Firma geométrica: todo corta en diagonal (esquirlas-paralelogramo, sesgos,
  biseles). La única curva permitida es el ObsiAnillo, y por eso destaca.
- Widgets firma, no genéricos: `ObsiMuro`/`ObsiEsquirla` (la galería que
  elige), `ObsiPlaca` (rótulo de sección), `ObsiDato` (evidencia),
  `ObsiAnillo` (autor), `ObsiNav`, `ObsiBoton`.

## Sobre los widgets de las familias (acuerdo)

- Crecen **por demanda** del contenido, no contra una matriz estándar.
- No tienen por qué ser componentes típicos: se prefieren piezas firma con
  rol claro (un `CintaEq` vale más que un `CintaTable`).

## Roadmap

- [x] OBSIDIANA núcleo + hub V4 con tres casos reales (esta iteración).
- [ ] Detalle de caso como página larga propia (hoy es disclosure en el hub).
- [ ] Exhibiciones: embeber los mundos V3 dentro de sus casos (Radio Cinta →
      foundation; warp-pipeline → aegis v2).
- [ ] Familia **GALA** (refs/2): lujo serif oro/negro con diagonales — para
      la línea de tiempo de logros/carrera. Fraunces ya está en el sistema.
- [ ] Familia **SODA** (refs/1): glass pastel claro y juguetón — candidata a
      piel del playground/laboratorio.
- [ ] Completar TODO(usuario) de GitHub/LinkedIn en `content.ts`.
- [ ] Portar el hub V4 a `portafolio-v3` (Astro) cuando se estabilice.
