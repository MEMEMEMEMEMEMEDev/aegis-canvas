import { useCallback, useRef } from "react";
import { cx } from "../../utils/cx";
import { useFieldProps } from "../Field/Field";
import "./Textarea.scss";

/**
 * Multiline text input. Composes with <Field> like every control.
 *
 * @param {object} props
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {number}  [props.rows=3]
 * @param {boolean} [props.autoResize=false] grow with content (up to maxRows)
 * @param {number}  [props.maxRows=10]
 * @param {boolean} [props.invalid]
 */
export default function Textarea({
  size = "md",
  rows = 3,
  autoResize = false,
  maxRows = 10,
  invalid,
  disabled,
  required,
  id,
  onChange,
  className = "",
  ...rest
}) {
  const field = useFieldProps({ id, invalid, disabled, required });
  const ref = useRef(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el || !autoResize) return;
    el.style.height = "auto";
    const line = parseFloat(getComputedStyle(el).lineHeight) || 20;
    el.style.height = `${Math.min(el.scrollHeight, line * maxRows)}px`;
  }, [autoResize, maxRows]);

  return (
    <textarea
      ref={ref}
      className={cx(
        "ds-textarea",
        `ds-textarea--${size}`,
        autoResize && "ds-textarea--auto",
        className,
      )}
      id={field.id}
      rows={rows}
      disabled={field.disabled}
      required={field.required || undefined}
      aria-invalid={field.invalid || undefined}
      aria-describedby={field.describedBy}
      onChange={(e) => {
        resize();
        onChange?.(e);
      }}
      {...rest}
    />
  );
}
