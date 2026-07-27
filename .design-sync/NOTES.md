# design-sync — notas del repo aegis-canvas (@ahroi/foundation)

## Cómo se construye el bundle (por qué existe build-entry.mjs)
- El repo NO emite dist JS: `exports['.'].default` apunta a `src/index.ts` y los
  componentes importan `.scss` como efecto (vite los compila en apps consumidoras).
  El conversor no soporta `.scss` en el bundle principal, así que
  `.design-sync/build-entry.mjs` (commiteado, invocado por `buildCmd`) produce:
  1. `.design-sync/.cache/dist-js/index.js` — entry combinada (núcleo + mesosoicos
     en UN bundle para no duplicar contextos React) con `.scss` → loader `empty`.
  2. `dist/types/` — árbol `.d.ts` vía `tsc --emitDeclarationOnly --rootDir src`
     (tsgo 7 imprime un aviso TS5011 inofensivo sin --rootDir). `_ds-entry.d.ts`
     (núcleo + mesosoicos) es lo que `package.json.publishConfig.types` apunta —
     así el conversor descubre los exports (el paquete no tiene campo `types`).
  3. `.design-sync/.cache/dist-js/foundation-full.css` — index.scss + scss de cada
     componente (dist/foundation.css solo trae reset+tokens+tema, SIN estilos de
     componentes) → `cfg.cssEntry`.
- Requiere symlink `.design-sync/node_modules -> ../.ds-sync/node_modules`
  (esbuild); recrear en clon fresco: `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`.

## [GENERAL] decisiones globales
- [GENERAL] Marca DARK-FIRST: `:root` ya emite el tema oscuro sin atributo;
  `data-theme` solo se usa para forzar light. La tarjeta de preview usa fondo
  blanco propio, así que `cfg.provider = PreviewSurface` (definido en
  `.design-sync/preview-surface.tsx`, exportado SOLO vía `.design-sync/entry.ts`,
  no es API pública) repone la superficie oscura. El decorador de
  `.storybook/preview.jsx` no se bundlea (importa `src/index.scss` — sin loader);
  no hace falta: solo setea data-theme, y el default dark no lo necesita.
- [GENERAL] Historias: `Families/Mesosoicos` (galería de composición),
  `Foundation/Welcome` (placeholder doc) y `Foundation/Behaviors` (demo de hooks
  headless, no componentes) están excluidas vía `titleMap: null`. Las historias
  por componente Meso se crearon en el sync inicial (jul 2026) partiendo la
  galería — el archivo galería se conserva para Storybook.
- [GENERAL] `[FONT_MISSING]` "Cascadia Code"/"JetBrains Mono": son fallbacks
  intermedios del stack mono del sistema (`ui-monospace, ...`) — diseño
  deliberado (ver src/fonts/README.md: fuentes self-hosted planificadas, aún no
  añadidas). No hay fuente que shippear; storybook y previews resuelven igual.
  Warn triaged — no perseguir en re-syncs mientras no existan fuentes de marca.

- Cosmético: los blurbs de componentes del README generado pierden acentos
  ("Ncleo" por "Núcleo") — artefacto de la extracción de JSDoc del conversor,
  no de este repo. No perseguir.

## Re-sync risks
- Cuando el repo añada fuentes self-hosted por marca (src/fonts/), habrá que
  wirearlas vía cfg.extraFonts y el [FONT_MISSING] dejará de ser aceptable.
- `_ds-entry.d.ts` / entry.ts combinan núcleo + mesosoicos: si se añade otra
  familia (p.ej. otro subpath export), añadirla a AMBOS (entry.ts y el
  _ds-entry.d.ts que escribe build-entry.mjs).
- Las historias nuevas por componente Meso reutilizan el JSX de la galería; si
  la galería evoluciona, las historias por componente no se actualizan solas.
