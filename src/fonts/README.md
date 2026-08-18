# Fuentes self-hosted

Todas las tipografías del sistema se autoalojan aquí — nunca se llama a
Google Fonts ni a ningún CDN externo (soberanía + privacidad + performance).

## Convención

```
fonts/
  <familia>/
    OFL.txt (o LICENSE)   ← OBLIGATORIO: viaja siempre junto a la fuente
    <Familia>[wght].woff2 ← variable font si existe; si no, un .woff2 por peso
    source/               ← opcional: release original íntegro (canónico, sin modificar)
```

- **Se sirve solo WOFF2** (TTF/OTF nunca; son fuente canónica, no formato web).
- Los `@font-face` se declaran **en el tema de cada marca** (no en base común):
  cada app carga únicamente las fuentes de SU marca. `font-display: swap`.
- Fuentes CJK (japonés): jamás completas — subset a los glifos usados
  (`pyftsubset`, como en v1: Noto Sans JP quedó en ~9KB/peso) o troceo por
  `unicode-range`. El subset es artefacto de build; el original queda en
  `source/`.

## Proceso al incorporar una familia

1. Descargar el release oficial (repo GitHub de la fuente o
   google-webfonts-helper) — no los archivos troceados del CDN de Google.
2. Verificar licencia (OFL 1.1 o Apache 2.0 — todo el catálogo Google Fonts
   califica) y copiar su `OFL.txt`/`LICENSE` a la carpeta.
3. Convertir a WOFF2 si hace falta; preferir variable font.
4. Declarar `@font-face` en el tema de la marca que la usa.

## Inventario actual

| Carpeta | Licencia | Usada por |
| --- | --- | --- |
| `archivo-black/` | OFL 1.1 | TEBEO (display) |
| `space-grotesk/` | OFL 1.1 | TEBEO (cuerpo) |
| `permanent-marker/` | Apache 2.0 | KOI (brush) |
| `poppins/` | OFL 1.1 | KOI (UI) |
| `bricolage-grotesque/` | OFL 1.1 | TELAR (display) |
| `ibm-plex-mono/` | OFL 1.1 | TELAR (terminal) + DENKI (ficha técnica) |
| `chivo-mono/` | OFL 1.1 | DOMO (única voz) |
| `anton/` | OFL 1.1 | DENKI (display póster) |
| `audiowide/` | OFL 1.1 | CINTA (display techno) |
| `space-mono/` | OFL 1.1 | CINTA (cuerpo/specs) |
| `fraunces/` | OFL 1.1 | MULTI V3 (display serif del OS — primera serif del sistema) |
| `spline-sans-mono/` | OFL 1.1 | MULTI V3 (consola del OS) |
| `geist/` | OFL 1.1 | DISQUETE (display) — **variable**, un archivo 100–900 |
| `geist-mono/` | OFL 1.1 | DISQUETE (micro/specs) — **variable**, un archivo 100–900 |
| `anybody/` | OFL 1.1 | BAZAR (display) — **variable en DOS ejes** (wght 100–900 · wdth 50–150) |
| `schibsted-grotesk/` | OFL 1.1 | BAZAR (cuerpo) — **variable**, wght 400–900 |
| `martian-mono/` | OFL 1.1 | BAZAR (micro/telemetría) — **variable**, wght 100–800 |
| `jersey-15/` | OFL 1.1 | BEIGE (UI/cuerpo) — pixel-grotesca en rejilla de 15px |
| `silkscreen/` | OFL 1.1 | BEIGE (cromo: títulos, botones) — 400 y 700 reales |
| `vt323/` | OFL 1.1 | BEIGE (terminal/consola) — digitalización del DEC VT320 |
| `inter-tight/` | OFL 1.1 | PLIEGO (voz única) — **variable**, wght 100–900 en un archivo |

Los glifos CJK (katakana de DENKI, kanji de KOI) usan el stack del sistema —
no se autoaloja ninguna fuente japonesa completa.

DISQUETE es la primera familia con **superfamilia** (sans + mono con las
mismas proporciones) y la primera con **fuentes variables**: los dos archivos
juntos pesan 52 KB y cubren los nueve pesos, menos que Anton sola (40 KB) más
cualquier segundo peso. Cuando haya que reemplazar un par estático, este es el
patrón a seguir. La procedencia exacta de cada una está en su
`PROCEDENCIA.md`.

## Estado legal (resumen)

OFL/Apache permiten: autoalojar, uso comercial, incrustar en apps propias y
de clientes, redistribuir. Obligaciones: conservar el archivo de licencia;
no vender las fuentes por sí solas; las versiones modificadas (incl. subsets)
no deben redistribuirse bajo el Reserved Font Name — por eso el original
íntegro se conserva y el subset se trata como artefacto de build del sitio.
Sin atribución visible requerida.
