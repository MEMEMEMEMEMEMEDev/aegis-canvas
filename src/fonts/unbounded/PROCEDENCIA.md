# Unbounded — procedencia

- **Autor**: The Unbounded Project Authors —
  https://github.com/googlefonts/unbounded
- **Licencia**: SIL Open Font License 1.1 (`OFL.txt`, copiada del repo
  oficial).
- **Archivo servido**: `unbounded-vf-latin-wght-normal.woff2`, variable en el
  eje `wght` (200–900), subset latin. Un solo archivo de 50 KB cubre toda la
  voz display de CALCO: el titular a 900 y el rótulo de una loseta a 800
  salen del mismo fichero.
- **Origen del WOFF2**: el bloque `/* latin */` de la hoja
  `fonts.googleapis.com/css2?family=Unbounded:wght@200..900`, que sirve el
  WOFF2 variable compilado desde el release oficial (mismo procedimiento que
  Inter Tight). Se descargó una vez el 2026-08-27 y se autoaloja: en runtime
  NO se llama a ningún CDN.

## Por qué esta y no una de las que ya había

CALCO nace de tres carteles de neobrutalismo donde la letra grande es ancha,
redonda y con todo el peso del mundo — el "996" en relieve, el "HAPPINESS"
extruido. Unbounded es exactamente eso: una geométrica extendida que a 900
se vuelve un bloque, y que además admite la extrusión por sombras apiladas
sin que los contraformas se cierren.

Las candidatas del inventario fallaban cada una a su manera: Archivo Black
es la voz de TEBEO, y prestarla habría hecho que CALCO sonara a su vecina
más cercana justo donde más necesita distinguirse; Anton es de DENKI y es
condensada, lo contrario de lo que piden los carteles; Anybody a anchura
150 se acerca, pero es de BAZAR —la familia a la que CALCO viene a relevar
en SOBRE MÍ— y llevarse su letra habría dejado la mudanza a medias.

El cuerpo es Space Grotesk, ya alojada para TEBEO. Compartir el cuerpo y no
la display es el mismo trato que IBM Plex Mono entre TELAR y DENKI: la
identidad la lleva la grande, y el préstamo cuesta cero descargas nuevas.

Regenerar el WOFF2 desde el original: el release íntegro está en el repo de
googlefonts y el comando es `fonttools ttLib.woff2 compress`.
