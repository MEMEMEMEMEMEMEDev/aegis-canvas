import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiPie.scss";

export interface DenkiPieProps {
  /** La marca, en la voz display de la familia. */
  marca: string;
  /** La línea chica bajo la marca — la división, el estudio, el año. */
  sub?: string;
  /** El sello de la esquina derecha: un kanji, decorativo. */
  sello?: string;
  /** paper (default) · panel */
  tone?: "paper" | "panel";
  className?: string;
}

/**
 * EL PIE DEL PÓSTER: la banda de marca que cierra la lámina — nombre del
 * fabricante a la izquierda, marcas de imprenta al medio y el sello al
 * canto derecho.
 *
 * Es lo último que se mira y lo que convierte una composición suelta en un
 * impreso con dueño. La referencia lo tiene y sin él el póster se queda sin
 * suelo.
 */
export default function DenkiPie({ marca, sub, sello, tone = "paper", className }: DenkiPieProps) {
  return (
    <footer className={cx("denki-pie", `denki-pie--${tone}`, className)}>
      <span className="denki-pie__marca">
        {marca}
        {sub && <i>{sub}</i>}
      </span>

      {/* Las marcas de control de la imprenta: barras de tinta, un aspa de
          registro y el rayado. Decorativas — dicen "impreso", nada más. */}
      <span className="denki-pie__marcas" aria-hidden="true">
        <i className="denki-pie__barras" />
        <i className="denki-pie__aspa" />
        <i className="denki-pie__rayado" />
      </span>

      {sello && (
        <span className="denki-pie__sello" lang="ja" aria-hidden="true">
          {sello}
        </span>
      )}
    </footer>
  );
}
