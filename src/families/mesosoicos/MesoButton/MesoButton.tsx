import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "./MesoButton.scss";

export type MesoButtonProps = ButtonProps;

/**
 * Botón de la familia MESOSOICOS: corte diagonal (falla geológica) en la
 * esquina inferior derecha, etiqueta mono en mayúsculas, estrato inferior.
 * Todo el comportamiento viene del núcleo headless Button (misma API).
 */
const MesoButton = forwardRef<HTMLButtonElement, MesoButtonProps>(
  function MesoButton({ className, ...rest }, ref) {
    return <Button ref={ref} className={cx("meso-button", className)} {...rest} />;
  },
);

export default MesoButton;
