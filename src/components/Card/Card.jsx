import "./Card.scss";

/**
 * Raised surface container.
 *
 * @param {object} props
 * @param {"none"|"sm"|"md"|"lg"} [props.elevation="md"]
 * @param {string} [props.padding="xl"]  spacing token key (e.g. "md", "xl")
 */
export default function Card({
  children,
  elevation = "md",
  padding = "xl",
  className = "",
  style,
  ...rest
}) {
  return (
    <div
      className={`ds-card ds-card--e-${elevation} ${className}`.trim()}
      style={{ padding: `var(--ds-space-${padding})`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
