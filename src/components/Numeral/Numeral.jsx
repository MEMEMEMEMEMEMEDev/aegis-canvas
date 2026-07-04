import { cx } from "../../utils/cx";
import "./Numeral.scss";

/**
 * Oversized display numeral — the giant "8" / "01" hero figure of game UI.
 *
 * @param {object} props
 * @param {string|number} props.value
 * @param {string} [props.caption]   small mono caption beside the figure (\n allowed)
 */
export default function Numeral({ value, caption, className = "", ...rest }) {
  return (
    <div className={cx("ds-numeral", className)} {...rest}>
      <span className="ds-numeral__value">{value}</span>
      {caption && <span className="ds-numeral__caption">{caption}</span>}
    </div>
  );
}
