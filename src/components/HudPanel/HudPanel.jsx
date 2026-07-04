import { cx } from "../../utils/cx";
import "./HudPanel.scss";

/**
 * Framed surface with game-UI corner brackets and an optional label/index bar.
 *
 * @param {object} props
 * @param {string}  [props.label]          mono label shown on the top-left of the bar
 * @param {string}  [props.index]          mono index (e.g. "01") shown top-right
 * @param {boolean} [props.corners=true]   draw the L-shaped corner brackets
 * @param {"sm"|"md"|"lg"} [props.pad="lg"]
 */
export default function HudPanel({
  children,
  label,
  index,
  corners = true,
  pad = "lg",
  className = "",
  ...rest
}) {
  return (
    <section
      className={cx(
        "ds-hud",
        corners && "ds-hud--corners",
        `ds-hud--pad-${pad}`,
        className,
      )}
      {...rest}
    >
      {(label || index) && (
        <header className="ds-hud__bar">
          {label && <span className="ds-hud__label">{label}</span>}
          {index && <span className="ds-hud__index">{index}</span>}
        </header>
      )}
      <div className="ds-hud__body">{children}</div>
    </section>
  );
}
