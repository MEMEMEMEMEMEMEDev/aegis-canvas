/**
 * Layout primitive: a flex container with tokenized gap.
 *
 * @param {object} props
 * @param {"row"|"column"} [props.direction="column"]
 * @param {string} [props.gap="md"]   spacing token key
 * @param {string} [props.align]      align-items
 * @param {string} [props.justify]    justify-content
 * @param {boolean} [props.wrap=false]
 * @param {React.ElementType} [props.as="div"]
 */
export default function Stack({
  as: Tag = "div",
  direction = "column",
  gap = "md",
  align,
  justify,
  wrap = false,
  children,
  style,
  ...rest
}) {
  return (
    <Tag
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `var(--ds-space-${gap})`,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
