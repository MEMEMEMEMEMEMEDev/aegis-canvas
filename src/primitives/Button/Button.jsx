import "./Button.scss";

/**
 * Primary action element. Themed entirely through the foundation contract.
 *
 * @param {object}   props
 * @param {"solid"|"outline"|"ghost"} [props.variant="solid"]
 * @param {"sm"|"md"|"lg"}            [props.size="md"]
 * @param {boolean}  [props.fullWidth=false]
 * @param {React.ReactNode} [props.leftIcon]
 */
export default function Button({
  children,
  variant = "solid",
  size = "md",
  fullWidth = false,
  leftIcon,
  type = "button",
  className = "",
  ...rest
}) {
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    fullWidth && "ds-button--full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {leftIcon && <span className="ds-button__icon">{leftIcon}</span>}
      {children}
    </button>
  );
}
