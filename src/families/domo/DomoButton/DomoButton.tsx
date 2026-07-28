import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoButton.scss";

export type DomoButtonProps = ButtonProps;

/**
 * Botón DOMO: píldora monoespaciada en mayúsculas, borde fino de instrumento.
 * Monocromo puro — la jerarquía la dan solid (tinta) / outline / ghost.
 */
const DomoButton = forwardRef<HTMLButtonElement, DomoButtonProps>(
  function DomoButton({ className, ...rest }, ref) {
    return <Button ref={ref} className={cx("domo-button", className)} {...rest} />;
  },
);

export default DomoButton;
