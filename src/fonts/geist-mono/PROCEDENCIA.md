# Geist / Geist Mono — procedencia

- **Autor**: The Geist Project Authors (Vercel) — https://github.com/vercel/geist-font
- **Licencia**: SIL Open Font License 1.1 (`OFL.txt`, copiada del repo oficial).
- **Archivo servido**: `geist-vf-latin-wght-normal.woff2`, variable en el eje
  `wght` (100–900), subset latin. Un solo archivo cubre todos los pesos.
- **Origen del WOFF2**: build de Fontsource
  (`cdn.jsdelivr.net/fontsource/fonts/geist:vf@latest`), que compila desde el
  release oficial. Se descargó una vez y se autoaloja: en runtime NO se llama
  a ningún CDN.

Nota sobre la convención del repo: el proceso canónico pide bajar el release
oficial y convertir a WOFF2 aquí. Esta máquina no tiene `fonttools`/`woff2`,
así que se tomó el WOFF2 ya compilado por Fontsource desde ese mismo release.
Si algún día hace falta regenerarlo, el original íntegro está en el repo de
Vercel y el comando es `fonttools ttLib.woff2 compress`.
