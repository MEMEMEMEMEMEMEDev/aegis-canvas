// design-sync pre-bundle. El repo exporta TS fuente con imports .scss de
// efecto (vite los compila en las apps consumidoras); el conversor de
// design-sync necesita (1) una entrada JS bundleable, (2) un árbol .d.ts
// para descubrir componentes/props, y (3) un CSS completo (theme + estilos
// de componentes, que dist/foundation.css no incluye). Este paso produce
// los tres de forma determinista desde el fuente.
// Requiere el symlink .design-sync/node_modules -> ../.ds-sync/node_modules
// (recrearlo en un clon fresco: ln -sfn ../.ds-sync/node_modules .design-sync/node_modules).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const repo = dirname(here);
const outDir = join(here, ".cache/dist-js");
mkdirSync(outDir, { recursive: true });

// (1) Entrada JS: núcleo + MESOSOICOS en un solo bundle (contextos React compartidos).
await build({
  entryPoints: [join(here, "entry.ts")],
  outfile: join(outDir, "index.js"),
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  loader: { ".scss": "empty" },
  external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client", "scheduler"],
});

// (2) Árbol .d.ts → dist/types (dist/ está gitignorado). El punto de entrada
// combinado _ds-entry.d.ts (núcleo + mesosoicos) es lo que package.json
// publishConfig.types apunta — el conversor lo usa para descubrir exports.
execFileSync(
  "npx",
  ["tsc", "-p", "tsconfig.json", "--noEmit", "false", "--declaration",
   "--emitDeclarationOnly", "--rootDir", "src", "--outDir", "dist/types"],
  { cwd: repo, stdio: "inherit" },
);
writeFileSync(
  join(repo, "dist/types/_ds-entry.d.ts"),
  'export * from "./index";\nexport * from "./families/mesosoicos/index";\n',
);

// (3) CSS completo: index.scss (reset + tokens + tema) + SCSS de cada componente.
const require = createRequire(join(repo, "package.json"));
const sass = require("sass");
const files = [
  join(repo, "src/index.scss"),
  ...globSync(join(repo, "src/{primitives,families,overlay}/**/*.scss")).sort(),
];
const css = files.map((f) => sass.compile(f, { style: "expanded" }).css).join("\n");
writeFileSync(join(outDir, "foundation-full.css"), css);
console.log(`build-entry: index.js + foundation-full.css (${files.length} scss) + dist/types listos`);
