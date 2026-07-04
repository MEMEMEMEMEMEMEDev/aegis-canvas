import { cx } from "../../../utils/cx";
import "./MetaTag.scss";

/**
 * Monospace meta chip — like the hex-code tags on a palette inspiration card.
 *
 * @param {object} props
 * @param {string} [props.swatch]   color value rendered as a leading dot
 * @param {"outline"|"solid"} [props.variant="outline"]
 */
export default function MetaTag({
  children,
  swatch,
  variant = "outline",
  className = "",
  ...rest
}) {
  return (
    <span className={cx("ds-tag", `ds-tag--${variant}`, className)} {...rest}>
      {swatch && (
        <span
          className="ds-tag__dot"
          style={{ background: swatch }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
