# aegis-canvas · `@ahroi/foundation`

Design system multi-estilo de **Marcelo Huenchupan**, consumible por cualquier
app. **Autoría en SCSS** (maps, mixins, funciones) + **theming en runtime con CSS
custom properties `--ds-*`** → el cambio de tema (claro/oscuro/ether/fono) es
instantáneo, sin recompilar y sin JS pesado.

> Repo independiente (extraído de `plataforma` con historial). Se consume hoy vía
> `file:` (symlink local) desde las apps; a futuro se publicará a un registry npm.
>
> **Modelo mental:** *Estilo = Tema (piel, `--ds-*`) + Familia (forma de los
> componentes)*. Capas: **`primitives/`** (universales) · **`families/`**
> (lenguajes visuales, p. ej. `hud`).

## Uso

**En el shell/host (una sola vez por app)** — emite reset + tokens + tema:

```scss
@use "@ahroi/foundation";
```

**En SCSS de componentes (en cualquier MFE)** — solo herramientas, sin CSS:

```scss
@use "@ahroi/foundation/mixins" as m;
@use "@ahroi/foundation/functions" as fn;
@use "@ahroi/foundation/tokens" as t;

.card {
  padding: fn.space("md");
  border-radius: var(--ds-radius-lg);
  background: var(--ds-surface-raised);
  color: var(--ds-text);
  box-shadow: var(--ds-shadow-md);

  @include m.up(md) {
    padding: fn.space("xl");
  }
}
```

## Cambiar de tema (JS)

```js
document.documentElement.dataset.theme = "dark"; // fuerza oscuro
document.documentElement.dataset.theme = "light"; // fuerza claro
delete document.documentElement.dataset.theme; // sigue al SO
```

Sin atributo, respeta `prefers-color-scheme` del sistema automáticamente.

## Arquitectura

```
src/
  index.js          Barrel del NÚCLEO (primitivos + shaders + utils + overlay)
  index.scss        Entry full (reset + tokens + tema + fuentes). Incluir 1× por app.
  primitives/       Componentes universales (.jsx + .scss + .stories):
                    Button, Card, Stack, Modal, Toggle, Stat, ProgressRing,
                    ShaderSurface, Spinner · formularios: Field, Input,
                    SearchInput, Textarea, Select, Dropdown, Checkbox,
                    Radio/RadioGroup, NumberInput
  families/         Lenguajes visuales. hud/ (HudPanel, MetaTag, Numeral) →
                    import "@ahroi/foundation/hud". Cada familia con su barrel.
  forms/            validators.js (composables, mensajes es) + useField hook
  tokens/           Primitivas SCSS: palette, type, spacing, radii, shadow,
                    motion, breakpoints. (sin CSS, solo maps)
  themes/           Contrato semántico → CSS custom properties (--ds-*)
                    light / dark / static + apply (emite :root)
  functions/        rem(), space(), font-size(), shadow()… accesores seguros
  mixins/           up()/down()/between(), text(), container(), grid-auto()…
  base/             reset moderno + estilos de elementos + @font-face
  fonts/            Fuentes self-hosted WOFF2 (Inter, JetBrains Mono, Noto JP)
  shaders/          Runtime de shaders 2D (useShader, effects)
  overlay/          Portal + overlayRoot (modales que escapan de padres atrapados)
```

### Convención de tokens

- **Primitivas** (`tokens/_palette.scss`): escalas crudas, nunca se usan
  directo en componentes. Cambia un hue acá y todos los temas se actualizan.
- **Contrato semántico** (`--ds-surface-*`, `--ds-text-*`, `--ds-accent-*`…):
  lo único que tocan los componentes. Light y dark comparten las **mismas
  claves**, solo cambian los valores.
- **Tokens estáticos** (`--ds-space-*`, `--ds-radius-*`, `--ds-font-size-*`…):
  no dependen del tema, expuestos como vars para consumo uniforme entre MFEs.

Todas las custom properties llevan prefijo `--ds-` para evitar colisiones entre
MFEs federados.

## Componentes + Storybook

Los componentes React viven en `src/primitives/` (y las familias en
`src/families/`) y consumen la fundación vía `@use "../../abstracts" as ds;`
(functions + mixins + tokens en un solo import). Se documentan con **Storybook 10**
(builder Vite), 100% local y open source.

```bash
npm run storybook        # dev en http://localhost:6007 (toolbar con toggle de tema)
npm run build-storybook  # build estático → storybook-static/ (sírvelo tú mismo)
```

Cada componente tiene su story en `Components/`; la vitrina integradora del
arsenal de formularios vive en `Foundation/Forms`. La toolbar de Storybook trae
un selector de tema (☀ Light / ☾ Dark / ⚙ System) que aplica `data-theme` al
`<html>`, igual que en producción.

> Telemetría de Storybook **desactivada** (`core.disableTelemetry`). El addon
> de testing con navegador (`addon-vitest`) requiere `npx playwright install
> chromium` si quieres correr los tests visuales; es opcional.

## Scripts

```bash
npm run build          # compila src/index.scss → dist/foundation.css
npm run build:min      # versión minificada
npm run storybook      # Storybook dev
```
