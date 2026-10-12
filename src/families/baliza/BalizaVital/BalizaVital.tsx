import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaVital.scss";

export interface BalizaVitalProps {
  /** "O+". Se muestra enorme: es lo que pregunta primero un paramédico. */
  sangre: string;
  alergias?: string;
  /** En kilos, sin unidad: "82". */
  peso?: string | number;
  /** `compacta` es la del panel (al lado de los datos del trabajador). */
  tamano?: "normal" | "compacta";
  className?: string;
}

/**
 * El recuadro rojo de lo vital: lo único que se ve sin llave en una
 * emergencia, porque sin esto se puede dañar a quien se quiere ayudar.
 */
export default function BalizaVital({ sangre, alergias, peso, tamano = "normal", className }: BalizaVitalProps) {
  return (
    <dl className={cx("baliza-vital", `baliza-vital--${tamano}`, className)}>
      <div className="baliza-vital__sangre">
        <dt>Grupo sanguíneo</dt>
        <dd>{sangre}</dd>
      </div>
      {alergias && (
        <div className="baliza-vital__alergias">
          <dt>Alergias</dt>
          <dd>{alergias}</dd>
        </div>
      )}
      {peso !== undefined && (
        <div className="baliza-vital__peso">
          <dt>Peso</dt>
          <dd>{peso} kg</dd>
        </div>
      )}
    </dl>
  );
}
