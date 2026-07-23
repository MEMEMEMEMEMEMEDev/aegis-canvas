import { cx } from "../../../utils/cx";
import "./MesoPanel.scss";

/**
 * Panel MESOSOICOS: superficie elevada con cortes diagonales opuestos,
 * veta de ámbar superior y etiqueta meta opcional.
 *
 * @param {object} props
 * @param {string} [props.label]  etiqueta técnica del panel (mono, uppercase)
 * @param {string} [props.meta]   dato pequeño alineado a la derecha del label
 */
export default function MesoPanel({ label, meta, className, children, ...rest }) {
  return (
    <section className={cx("meso-panel", className)} {...rest}>
      {(label || meta) && (
        <header className="meso-panel__head">
          {label && <span className="meso-panel__label">{label}</span>}
          {meta && <span className="meso-panel__meta">{meta}</span>}
        </header>
      )}
      {children}
    </section>
  );
}
