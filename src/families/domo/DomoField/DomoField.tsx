import Field from "../../../primitives/Field/Field";
import type { FieldProps } from "../../../primitives/Field/Field";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoField.scss";

export type DomoFieldProps = FieldProps;

/**
 * Campo DOMO: piel sobre el núcleo Field (label + control + hint/error con
 * todo el wiring ARIA). Rótulo de instrumento, error en tinta de alerta.
 */
export default function DomoField({ className, ...rest }: DomoFieldProps) {
  return <Field className={cx("domo-field", className)} {...rest} />;
}
