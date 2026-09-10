# Onest — procedencia

- **Autor**: The Onest Project Authors (Simpals / Dmitri Voloshin) —
  https://github.com/simpals/onest
- **Licencia**: SIL Open Font License 1.1 (`OFL.txt`, copiada del repo de
  Google Fonts, que publica la familia).
- **Archivo servido**: `onest-vf-latin-wght-normal.woff2`, variable en el eje
  `wght` (100–900), subset latin, 34 KB. Es la voz de TODO lo que se lee en
  VITRINA: nombres de producto, precios, formularios, letra chica legal. El
  cuerpo a 400, el nombre de la tarjeta a 600 y el precio a 700 salen del
  mismo fichero.
- **Origen del WOFF2**: build variable de Fontsource
  (`cdn.jsdelivr.net/fontsource/fonts/onest:vf/latin-wght-normal.woff2`),
  compilado desde el release oficial. Se descargó una vez el 2026-09-10 y se
  autoaloja: en runtime NO se llama a ningún CDN. Ejes verificados con
  fonttools antes de commitear.

## Por qué esta y no una de las que ya había

VITRINA es un marketplace: la letra tiene que desaparecer detrás de la
mercancía, aguantar precios en tabla, formularios largos y una ficha técnica
sin ponerse interesante. Onest es una grotesca geométrica muy contenida,
con cifras anchas y claras y una x-height generosa que se lee bien a 14 px
sobre gris cálido — exactamente la letra "de tienda" de la referencia 01.

Las candidatas del inventario fallaban cada una a su manera: Inter Tight es
la voz de PLIEGO y está cerrada de prosado (para titulares, no para leer
una dirección); Geist es de DISQUETE y Schibsted de BAZAR — prestarlas
haría que la tienda sonara a sus hermanas; Space Grotesk y Poppins tienen
demasiada personalidad para un catálogo donde el producto manda.

Regenerar el WOFF2 desde el original: el release íntegro está en el repo de
simpals y el comando es `fonttools ttLib.woff2 compress`.
