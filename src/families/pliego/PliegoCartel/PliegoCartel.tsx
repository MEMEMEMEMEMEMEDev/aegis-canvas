import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoCartel.scss";

export interface PliegoCartelProps {
  /** El nombre de la sala o de la charla. En minúsculas, como la familia. */
  titulo: string;
  /** Línea diminuta sobre el título: "sala 2 · auditorio". */
  sobre?: string;
  /** Idiomas, dichos: "english → español". */
  idiomas?: string;
  /** La URL corta, escrita: quien no puede escanear la tipea. */
  url: string;
  /** El QR (PliegoQR) o cualquier cosa del mismo tamaño. */
  qr?: ReactNode;
  /** El sello de estado (PliegoEnVivo). */
  estado?: ReactNode;
  /** La última línea de subtítulo, grande: el cartel también se lee de lejos. */
  subtitulo?: ReactNode;
  /** Kanji al canto, decorativo. */
  kana?: string;
  className?: string;
}

/**
 * La pantalla del proyector de un escenario: qué sala es, en qué idioma, y
 * cómo entrar desde el celular. Ocupa el viewport entero y se monta con la
 * coreografía de la familia (barrido escalonado), pieza por pieza.
 */
export default function PliegoCartel({
  titulo, sobre, idiomas, url, qr, estado, subtitulo, kana = "字幕", className,
}: PliegoCartelProps) {
  const pieza = (i: number) => ({ "--pliego-i": i }) as CSSProperties;
  return (
    <section className={cx("pliego-cartel", className)} aria-label={`Cartel de ${titulo}`}>
      <span className="pliego-cartel__kana" aria-hidden="true">{kana}</span>
      <div className="pliego-cartel__cabeza">
        {sobre && <p className="pliego-cartel__sobre pliego-entra" style={pieza(0)}>✳ {sobre} ✳</p>}
        <h1 className="pliego-cartel__titulo pliego-entra" style={pieza(1)}>{titulo.toLowerCase()}</h1>
        <div className="pliego-cartel__linea pliego-entra" style={pieza(2)}>
          {estado}
          {idiomas && <span className="pliego-cartel__idiomas">{idiomas}</span>}
        </div>
      </div>
      {subtitulo && <div className="pliego-cartel__sub pliego-entra pliego-entra--sube" style={pieza(3)}>{subtitulo}</div>}
      <div className="pliego-cartel__pie pliego-entra" style={pieza(4)}>
        {qr && <div className="pliego-cartel__qr">{qr}</div>}
        <div className="pliego-cartel__entrar">
          <p className="pliego-cartel__rotulo">subtítulos en tu celular</p>
          <p className="pliego-cartel__url">{url}</p>
        </div>
      </div>
    </section>
  );
}
