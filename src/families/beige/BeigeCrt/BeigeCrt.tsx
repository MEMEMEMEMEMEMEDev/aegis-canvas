import { cx } from "../../../utils/cx";
import "../beige.scss";
import "./BeigeCrt.scss";

export interface BeigeCrtProps {
  /** suave baja las líneas a la mitad — para pantallas muy densas de texto. */
  intensity?: "media" | "suave";
  className?: string;
}

/**
 * El monitor de tubo: una lámina fija sobre TODA la pantalla con las
 * líneas de barrido, la rejilla RGB de la máscara, la viñeta del vidrio
 * curvo, un parpadeo mínimo y una banda que rueda cada tanto.
 *
 * Todo es CSS: gradientes repetidos y dos animaciones solo de compositor
 * (opacity/transform), así que no cuesta un solo frame. `pointer-events:
 * none` y aria-hidden: la lámina ni se toca ni se anuncia. Con
 * prefers-reduced-motion queda la textura estática, sin parpadeo ni banda.
 */
export default function BeigeCrt({ intensity = "media", className }: BeigeCrtProps) {
  return (
    <div
      className={cx("beige-crt", intensity === "suave" && "beige-crt--suave", className)}
      aria-hidden="true"
    >
      <div className="beige-crt__scan" />
      <div className="beige-crt__banda" />
      <div className="beige-crt__vidrio" />
    </div>
  );
}
