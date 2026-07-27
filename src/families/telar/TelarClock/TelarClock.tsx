import { useEffect, useState } from "react";
import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarClock.scss";

export interface TelarClockProps {
  /** Zona horaria IANA. Default: America/Santiago. */
  timeZone?: string;
  /** Etiqueta junto a la hora. Default: "SCL". */
  label?: string;
  className?: string;
}

/**
 * Reloj vivo TELAR: HH:MM:SS reales de una zona horaria, con los dos puntos
 * parpadeando. El detalle "OS encendido" del portafolio.
 */
export default function TelarClock({
  timeZone = "America/Santiago",
  label = "SCL",
  className,
}: TelarClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const [hh, mm, ss] = new Intl.DateTimeFormat("es-CL", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(now)
    .split(":");

  return (
    <span className={cx("telar-clock", className)}>
      <span className="telar-clock__time">
        {hh}
        <em>:</em>
        {mm}
        <em>:</em>
        {ss}
      </span>
      <span className="telar-clock__label">{label}</span>
    </span>
  );
}
