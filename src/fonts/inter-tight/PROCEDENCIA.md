# Inter Tight — procedencia

- **Autor**: The Inter Project Authors (Rasmus Andersson) —
  https://github.com/rsms/inter-tight
- **Licencia**: SIL Open Font License 1.1 (`OFL.txt`, copiada del repo de
  Google Fonts, que es el que publica esta variante).
- **Archivo servido**: `inter-tight-vf-latin-wght-normal.woff2`, variable en el
  eje `wght` (100–900), subset latin. Un solo archivo de 44 KB cubre TODA la
  familia PLIEGO: el titular a peso 800 y la letra pequeña a 500 salen del
  mismo fichero, así que la familia entera cuesta una descarga.
- **Origen del WOFF2**: el bloque `/* latin */` de la hoja
  `fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900`, que sirve el
  WOFF2 variable compilado desde el release oficial. Se descargó una vez y se
  autoaloja: en runtime NO se llama a ningún CDN.

## Por qué esta y no una de las que ya había

PLIEGO nace de una referencia de diseño editorial japonés donde el titular es
una palabra gigante en minúsculas, muy apretada, en una grotesca neutra. Ese
ajuste —tracking negativo a cuerpo enorme sin que las letras se toquen— es
exactamente para lo que Inter Tight existe: es Inter redibujada con el prosado
cerrado, pensada para titulares.

Las candidatas del inventario fallaban por lo mismo, cada una a su manera:
Geist y Schibsted son de la casa de otras dos familias (DISQUETE y BAZAR) y
prestarlas habría hecho que PLIEGO sonara a sus hermanas; Archivo Black y
Anton son demasiado pesadas y anchas para minúsculas gigantes; Anybody y
Bricolage tienen carácter propio que compite con la retícula en vez de
sostenerla.

Regenerar el WOFF2 desde el original: el release íntegro está en el repo de
rsms y el comando es `fonttools ttLib.woff2 compress`.
