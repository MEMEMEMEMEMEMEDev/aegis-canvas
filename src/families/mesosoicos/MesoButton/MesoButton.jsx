import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "./MesoButton.scss";

/**
 * Botón de la familia MESOSOICOS: corte diagonal (falla geológica) en la
 * esquina inferior derecha, etiqueta mono en mayúsculas, estrato inferior.
 * Todo el comportamiento viene del núcleo headless Button.
 *
 * Misma API que Button (variant solid|outline|ghost|danger, size, loading…).
 */
const MesoButton = forwardRef(function MesoButton({ className, ...rest }, ref) {
  return <Button ref={ref} className={cx("meso-button", className)} {...rest} />;
});

export default MesoButton;
