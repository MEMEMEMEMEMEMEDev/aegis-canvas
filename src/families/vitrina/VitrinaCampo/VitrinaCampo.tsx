import Field from "../../../primitives/Field/Field";
import type { FieldProps } from "../../../primitives/Field/Field";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaCampo.scss";

export interface VitrinaCampoProps extends FieldProps {
  /** caja: label micro arriba (la tienda). linea: la voz del checkout. */
  modo?: "caja" | "linea";
}

/**
 * Campo VITRINA: la piel del Field headless — label en micro, hint en
 * letra chica y el error en rojo con role="alert" (eso lo hace el núcleo).
 * En modo línea el label baja de tono para que la línea del input mande.
 */
export default function VitrinaCampo({ modo = "caja", className, ...rest }: VitrinaCampoProps) {
  return <Field className={cx("vitrina-campo", `vitrina-campo--${modo}`, className)} {...rest} />;
}
