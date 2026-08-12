import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqNeon.scss";

export interface DisqNeonProps {
  /** suave baja las luces a la mitad — para pliegos densos de texto. */
  intensity?: "media" | "suave";
  /** Lámina fija a la pantalla en vez de absoluta a su contenedor. */
  fija?: boolean;
  className?: string;
}

/**
 * Las luces de la vitrina: la lámina que convierte el pliego impreso en un
 * escaparate. Tres masas de luz de los colorways de la familia derivando muy
 * despacio, un haz de foco que barre la vitrina cada tanto, y la retícula de
 * medios tonos de la imprenta como textura.
 *
 * Es la hermana de BeigeCrt: todo CSS, gradientes y dos animaciones solo de
 * compositor (transform), `pointer-events: none` y aria-hidden. Las masas no
 * llevan blur de filtro — el desvanecido vive en las paradas del gradiente,
 * que cuesta cero por frame. Con prefers-reduced-motion las luces se quedan
 * quietas y el haz no pasa.
 *
 * Va DENTRO de un contenedor `position: relative` con `overflow: hidden`
 * (DisqShelf ya lo es), o con `fija` cubre la pantalla entera.
 */
export default function DisqNeon({ intensity = "media", fija = false, className }: DisqNeonProps) {
  return (
    <div
      className={cx("disq-neon", intensity === "suave" && "disq-neon--suave", fija && "disq-neon--fija", className)}
      aria-hidden="true"
    >
      <span className="disq-neon__masa disq-neon__masa--indigo" />
      <span className="disq-neon__masa disq-neon__masa--magenta" />
      <span className="disq-neon__masa disq-neon__masa--teal" />
      <span className="disq-neon__haz" />
      <span className="disq-neon__reticula" />
    </div>
  );
}
