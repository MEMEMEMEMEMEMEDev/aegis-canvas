import { cx } from "../../../utils/cx";
import "./MesoTag.scss";

/**
 * Etiqueta técnica MESOSOICOS: chip mono con marcador cuadrado.
 *
 * @param {object} props
 * @param {"neutral"|"accent"} [props.tone="neutral"]
 */
export default function MesoTag({ tone = "neutral", className, children, ...rest }) {
  return (
    <span className={cx("meso-tag", `meso-tag--${tone}`, className)} {...rest}>
      {children}
    </span>
  );
}
