# Fuentes self-hosted (WOFF2)

Servidas desde el propio design system → cero llamadas a Google Fonts (mejor
rendimiento, privacidad y confiabilidad). Declaradas en `../base/_fonts.scss`.

| Familia | Pesos | Subset | Licencia | Copyright |
|---|---|---|---|---|
| **Inter** | 400/500/600/700 | latin | OFL 1.1 | © The Inter Project Authors (https://github.com/rsms/inter) |
| **JetBrains Mono** | 400/500/700 | latin | OFL 1.1 | © 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono) |
| **Noto Sans JP** | 400/500/700 | **CJK usados en el repo** | OFL 1.1 | © 2014-2021 Google (Noto Project) |

La OFL 1.1 permite incrustar y redistribuir libremente (ver `OFL.txt`). La única
obligación es conservar este aviso de licencia junto a las fuentes.

## Procedencia

Descargadas como WOFF2 desde [google-webfonts-helper](https://gwfh.mranftl.com/)
(que sirve los archivos oficiales de Google Fonts).

## Noto Sans JP — subsetting

La fuente completa pesa ~1 MB por peso. Está **subseteada** solo a los glifos
CJK que aparecen en el código → ~9 KB por peso. Para re-generarla cuando uses
kanji/kana nuevos:

```bash
# 1) extraer los glifos CJK usados (ver script en scratch / o a mano)
# 2) subsetear cada peso:
pyftsubset noto-sans-jp-japanese-<peso>.woff2 \
  --text-file=jp-glyphs.txt --flavor=woff2 --no-hinting \
  --output-file=noto-sans-jp-<peso>.woff2
```

Requiere `fonttools` + `brotli` (`pip install fonttools brotli`).
