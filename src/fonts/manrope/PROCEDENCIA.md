# Manrope — procedencia

- **Autor**: The Manrope Project Authors (Mikhail Sharanda) —
  https://github.com/googlefonts/manrope
- **Licencia**: SIL Open Font License 1.1 (`OFL.txt`, copiada del repo de
  Google Fonts, `ofl/manrope/OFL.txt`).
- **Archivo servido**: `manrope-vf-latin-wght-normal.woff2`, variable en el
  eje `wght` (200–800), subset latin, 24 KB, versión 4.504. Es la voz de
  toda la familia BALIZA (SOS Ruta): el cuerpo a 500, los rótulos a 600, los
  botones a 700 y las cifras de las métricas a 800 salen del mismo fichero.
- **Origen del WOFF2**: build variable de Fontsource
  (`cdn.jsdelivr.net/fontsource/fonts/manrope:vf/latin-wght-normal.woff2`),
  compilado desde el release oficial. Se descargó una vez el 2026-10-12 y se
  autoaloja: en runtime NO se llama a ningún CDN. Ejes verificados con
  fonttools antes de commitear.

## Por qué esta

No se eligió: la trae el Figma del cliente (SOS Ruta), que la usa en todas
las pantallas de escritorio y en la landing. El Figma mezcla además Inter en
las pantallas móviles; se unificó en Manrope porque dos grotescas casi
iguales sólo suman peso de descarga a una página que se abre en la ruta, con
señal mala.

Regenerar el WOFF2 desde el original: el release íntegro está en el repo de
googlefonts/manrope y el comando es `fonttools ttLib.woff2 compress`.
