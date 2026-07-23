import { cx } from "../../../utils/cx";
import "./MesoStat.scss";

/**
 * Cifra destacada MESOSOICOS: valor mono grande sobre etiqueta meta,
 * separados por un estrato.
 *
 * @param {object} props
 * @param {string|number} props.value
 * @param {string} props.label
 * @param {string} [props.suffix]  unidad pequeña junto al valor (ej. "%", "ms")
 */
export default function MesoStat({ value, label, suffix, className, ...rest }) {
  return (
    <div className={cx("meso-stat", className)} {...rest}>
      <span className="meso-stat__value">
        {value}
        {suffix && <small className="meso-stat__suffix">{suffix}</small>}
      </span>
      <span className="meso-stat__label">{label}</span>
    </div>
  );
}
