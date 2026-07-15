import { cx } from "../../utils/cx";
import Spinner from "../Spinner/Spinner";
import "./Button.scss";

/**
 * Primary action element. Themed entirely through the foundation contract.
 *
 * @param {object}   props
 * @param {"solid"|"outline"|"ghost"|"danger"} [props.variant="solid"]
 * @param {"sm"|"md"|"lg"}            [props.size="md"]
 * @param {boolean}  [props.fullWidth=false]
 * @param {boolean}  [props.loading=false]  spinner + disabled + aria-busy
 * @param {boolean}  [props.iconOnly=false] square button — pass `aria-label`!
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 */
export default function Button({
  children,
  variant = "solid",
  size = "md",
  fullWidth = false,
  loading = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  type = "button",
  disabled,
  className = "",
  ...rest
}) {
  const classes = cx(
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    fullWidth && "ds-button--full",
    iconOnly && "ds-button--icon-only",
    loading && "ds-button--loading",
    className,
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span className="ds-button__spinner" aria-hidden="true">
          <Spinner size="sm" label="" />
        </span>
      )}
      <span className="ds-button__content">
        {leftIcon && <span className="ds-button__icon">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ds-button__icon">{rightIcon}</span>}
      </span>
    </button>
  );
}
