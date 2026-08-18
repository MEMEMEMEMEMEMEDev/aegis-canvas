# aegis-canvas · `@ahroi/foundation`

Design system multi-estilo de **Marcelo Huenchupan**, consumible por cualquier
app. **Autoría en SCSS** (maps, mixins, funciones) + **theming en runtime con
CSS custom properties `--ds-*`** → cambio de tema instantáneo, sin recompilar.

> **v2 — reconstrucción desde cero (2026-07-22).** Se conservan la estructura y
> las convenciones; todas las capas (tokens, temas, componentes) se rediseñan.
> La v1 completa vive en el historial git.
>
> **Modelo mental:** *Estilo = Tema (piel, `--ds-*`) + Familia (forma de los
> componentes)*. Capas: **`primitives/`** (universales) · **`families/`**
> (lenguajes visuales).

## Convenciones (lo que NO se resetea)

- **Tokens primitivos** (`tokens/`): maps SCSS crudos, nunca usados directo en
  componentes. Se consumen vía `functions/` (accesores seguros) y `themes/`.
- **Contrato semántico** (`themes/`): custom properties `--ds-*` (surface,
  text, border, accent, status…). Todos los temas comparten las **mismas
  claves**; solo cambian valores. Prefijo `--ds-` para evitar colisiones
  entre MFEs federados.
- **Cambio de tema en JS**: `document.documentElement.dataset.theme = "…"`;
  sin atributo, sigue `prefers-color-scheme` del sistema.
- **Headless-first**: el comportamiento (estado, teclado, ARIA, foco) vive en
  `behaviors/` (hooks) y en núcleos de componente SIN opinión visual; las
  familias/marcas visten las clases BEM después. Permite estéticas radicales
  sin re-resolver accesibilidad, y hace cada componente **100% controlable por
  props/eventos** — requisito para que agentes de AI manejen la UI.
- **Componentes**: React + `.scss` + `.stories.tsx` por carpeta, clases
  BEM `ds-x__el--mod`, SCSS vía `@use "../../abstracts" as ds;` (functions +
  mixins + tokens en un import, sin emitir CSS).
- **Consumo**: el shell hace `@use "@ahroi/foundation";` (emite CSS una vez);
  los componentes de las apps importan solo herramientas
  (`@ahroi/foundation/mixins`, `/functions`, `/tokens`).
- **Familias como islas**: cada familia emite su **mini-contrato scoped**
  (`.tebeo-scope` → `--tebeo-*`, `.domo-scope` → `--domo-*`, …) sin tocar
  `:root`. Retematizar = redefinir esas variables en un wrapper (así se
  hacen el modo oscuro espacial y la fusión Domo×Denki de Multi V1).
- **Fuentes self-hosted** (`src/fonts/README.md`): solo WOFF2 + licencia
  OFL/Apache viajando junto al archivo; jamás CDN de Google.

## Familias

Cada familia nace de referencias visuales en `refs/` (material de terceros,
gitignoreado) que se traducen a reglas mecánicas: paleta, grosor de borde,
radios, tipografías y componentes firma. Flujo: `refs/` → incubadora
`proto/` → bautizo. Cada una tiene en Storybook su `Set → Overview`
(catálogo) y su `Portafolio → Completo` (vista real).

| Familia | Concepto | Ref | Tipografías |
| --- | --- | --- | --- |
| **MESOSOICOS** | estratos geológicos + UI de videojuego: basalto/hueso/ámbar, fallas diagonales | — | fuentes de marca (`--ds-font-*`) |
| **TEBEO** | neo-retro sticker/cómic: crema + tinta + amarillo sol, bordes gruesos | refs/4 | Archivo Black + Space Grotesk |
| **KOI** | festival japonés nocturno: vidrio esmerilado, hinomaru, linternas | refs/5–6 | Permanent Marker + Poppins |
| **TELAR** | neo-andino digital: lana oscura, esquinas chakana, OS denso | carta blanca | Bricolage Grotesque + IBM Plex Mono |
| **DOMO** | panel de control doméstico, todo mono, 1 vista + modales, AI-ready | refs/7 | Chivo Mono |
| **DENKI 電気** | póster retro-industrial japonés: semitono, bermellón, katakana | refs/8 | Anton + IBM Plex Mono |
| **CINTA** | cassette-futurismo: chasis con tornillos, carretes que giran | refs/9 | Audiowide + Space Mono |
| **OBSIDIANA** | galería de esquirlas: vitrina oscura, un solo acento cian, todo corta en diagonal — la familia del ESQUELETO del portafolio | refs/3 | Space Grotesk + Spline Sans Mono |
| **PLIEGO** | lámina de imprenta japonesa: papel casi blanco, filetes de un pelo, UN rojo-rosa como bloque plano, minúsculas gigantes — y encima la mecánica de un menú de videojuego | refs/10 | Inter Tight (única) |
| *proto* | incubadora vacía (nombre siempre provisional) | — | — |

Imports: `@ahroi/foundation/<familia>` (ver `exports` en package.json).

## Multiverso (concepto de portafolio)

El portafolio es un **multiverso de mundos-proyecto** navegado desde la nave
**AEGIS** (este repo). Historia `Multiverso/Multi V1` en `src/multi/`:

- **Viajar = deployar**: la pantalla de carga a página completa recorre el
  pipeline CI/CD real (typecheck → sass → storybook → deploy) etapa a etapa,
  y la *sala de máquinas* del puente lo documenta como sistemas de la nave.
- **Navegación rara adrede**: sin navbar — consola de vidrio flotante,
  códigos de salto (DenkiCombo) y órbitas.
- **Mundos**: Radio CINTA (música, AI DJ enchufable) · Sector 電気-OS
  (Domo×Denki vía retema de tokens) · La Gaceta Estelar (Tebeo×Telar+Denki,
  periódico interestelar). Prototipo previo del concepto:
  `Families/DomoV2/Multiverso`; su evolución `Families/DomoV3/Multiverso`
  (la **dársena**) jubila la ventana de navegador falsa: seis mundos a
  viewport completo (todas las familias menos TELAR; lo más japo de KOI vive
  como huésped en DENKI), tablero de salidas estilo estación, **ASIS** — la
  AI de a bordo que responde y pilotea la UI —, el planeta **LAB** de demos
  de IA (patrón entrada → proceso → salida) y un visor HUD con línea de
  mundos. La transferencia monta la piel del destino en vivo — tokens
  reales, specimen tipográfico y un handshake que retiñe el propio panel
  antes del tajo de salida; la llegada se estampa con un sello tipo hanko.

> **Multi V4 — el multiverso curado** (`Multiverso/Multi V4`, concepto en
> `src/multi/v4/CONCEPTO.md`): la creatividad cambia de sitio. Esqueleto UX
> convencional (nav visible, hero directo, scroll natural) vestido por
> OBSIDIANA, con **casos de estudio reales** (problema → proceso → resultado).
> Los mundos de V1–V3 pasan de ser la navegación a ser exhibiciones dentro de
> los casos.

## Estructura

```
src/
  index.ts          Barrel del núcleo (JS público)
  index.scss        Entry full (tema + base). Incluir 1× por app.
  _abstracts.scss   Barrel de herramientas para SCSS de componentes
  tokens/           Primitivas (maps SCSS)
  themes/           Contrato semántico --ds-* (marca portafolio dark-first)
  functions/        Accesores seguros a tokens
  mixins/           Herramientas de composición (hover, focus-ring, up/down…)
  base/             Reset + globales
  behaviors/        Hooks headless: useControllableState, useDisclosure,
                    useDismiss, useListNavigation (teclado/typeahead)
  primitives/       Núcleos headless: Button, Field, Input…
  families/         Lenguajes visuales (ver tabla) — cada una con su
                    <familia>.scss (voz), componentes piel y demo/
  multi/            Multi V1: composición multiverso (nave AEGIS)
  fonts/            WOFF2 self-hosted + licencias (ver src/fonts/README.md)
  overlay/          Portal + overlayRoot (overlays que escapan de padres atrapados)
  utils/            cx()
  foundation/       Stories de documentación (Storybook)
refs/               Referencias visuales de terceros (gitignoreado salvo README)
```

## Scripts

```bash
npm run build            # sass → dist/foundation.css
npm run build:min        # versión minificada
npm run typecheck        # tsc --noEmit
npm run storybook        # dev en http://localhost:6007 (toolbar con temas)
npm run build-storybook  # build estático → storybook-static/
```

Telemetría de Storybook desactivada (`core.disableTelemetry`).
