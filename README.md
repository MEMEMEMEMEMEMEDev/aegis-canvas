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
- **Componentes**: React `.jsx` + `.scss` + `.stories.jsx` por carpeta, clases
  BEM `ds-x__el--mod`, SCSS vía `@use "../../abstracts" as ds;` (functions +
  mixins + tokens en un import, sin emitir CSS).
- **Consumo**: el shell hace `@use "@ahroi/foundation";` (emite CSS una vez);
  los componentes de las apps importan solo herramientas
  (`@ahroi/foundation/mixins`, `/functions`, `/tokens`).

## Estructura

```
src/
  index.js          Barrel del núcleo (JS público)
  index.scss        Entry full (tema + base). Incluir 1× por app.
  _abstracts.scss   Barrel de herramientas para SCSS de componentes
  tokens/           Primitivas (maps SCSS)          — por diseñar
  themes/           Contrato semántico --ds-*       — por diseñar
  functions/        Accesores seguros a tokens      — por diseñar
  mixins/           Herramientas de composición     — por diseñar
  base/             Reset + globales (+ @font-face) — por diseñar
  primitives/       Componentes universales         — vacío
  families/         Lenguajes visuales              — vacío
  foundation/       Stories de documentación (Storybook)
```

## Scripts

```bash
npm run build            # sass → dist/foundation.css
npm run build:min        # versión minificada
npm run storybook        # dev en http://localhost:6007 (toolbar con temas)
npm run build-storybook  # build estático → storybook-static/
```

Telemetría de Storybook desactivada (`core.disableTelemetry`).
