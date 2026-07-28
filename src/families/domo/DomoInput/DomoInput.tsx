import { forwardRef } from "react";
import Input from "../../../primitives/Input/Input";
import type { InputProps } from "../../../primitives/Input/Input";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoInput.scss";

export type DomoInputProps = InputProps;

/**
 * Input DOMO: pozo claro con borde fino que se entinta al foco.
 * Hereda el wiring de accesibilidad del núcleo Input (+ Field envolvente).
 */
const DomoInput = forwardRef<HTMLInputElement, DomoInputProps>(
  function DomoInput({ className, ...rest }, ref) {
    return <Input ref={ref} className={cx("domo-input", className)} {...rest} />;
  },
);

export default DomoInput;
