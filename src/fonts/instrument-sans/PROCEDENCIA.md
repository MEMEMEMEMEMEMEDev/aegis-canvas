# Instrument Sans — procedencia

- **Autor**: Rodrigo Fuenzalida (diseñador chileno) para Instrument —
  https://github.com/Instrument/instrument-sans
- **Licencia**: SIL Open Font License 1.1 (`OFL.txt`, copiada del repo de
  Google Fonts, que publica la familia).
- **Archivo servido**: `instrument-sans-vf-latin-wdth-normal.woff2`, variable
  en DOS ejes — `wght` 400–700 y **`wdth` 75–100** —, subset latin, 57 KB.
  Es la voz que GRITA en VITRINA: el titular gigante en mayúsculas del
  checkout, la cesta y el footer, condensado a `font-stretch: 75%` para
  que quepa una palabra entera de borde a borde sin que las letras se
  toquen (el "CHECKOUT" de la referencia 02).
- **Origen del WOFF2**: build variable de Fontsource
  (`cdn.jsdelivr.net/fontsource/fonts/instrument-sans:vf/latin-wdth-normal.woff2`),
  que es el único build que entrega el eje `wdth` en un solo archivo
  (google-webfonts-helper solo sirve estáticas por peso). Se descargó una
  vez el 2026-09-10 y se autoaloja: en runtime NO se llama a ningún CDN.
  Ejes verificados con fonttools antes de commitear.

## Por qué esta y no una de las que ya había

La referencia 02 es un checkout editorial donde el título es UNA palabra
negra, enorme y apretada, en una grotesca neutra condensada. Eso pide un
eje de anchura real: condensar con `transform` deforma los trazos, y una
condensada fija (Anton, de DENKI) es demasiado pesada y demasiado póster.
Instrument Sans a anchura 75 y peso 700 da exactamente ese titular, y a
anchura 100 sigue siendo una grotesca limpia que casa con Onest.

Anybody también tiene eje `wdth`, pero es la display de BAZAR y su carácter
(ancha, algo cómica) es el opuesto de lo que pide una tienda que quiere
parecer seria en el momento de pagar. Y que el autor sea chileno, en un
marketplace que cobra en pesos chilenos, es el guiño que la familia
merecía.

Regenerar el WOFF2 desde el original: el release íntegro está en el repo de
Instrument y el comando es `fonttools ttLib.woff2 compress`.
