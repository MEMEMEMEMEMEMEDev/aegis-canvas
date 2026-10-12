import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import BalizaAvatar from "../BalizaAvatar/BalizaAvatar";
import "../baliza.scss";
import "./BalizaCredencial.scss";

export interface BalizaCredencialProps {
  /** La tarjeta física tiene dos caras; cada una se diseña (y se imprime) aparte. */
  cara: "frente" | "reverso";
  empresa: string;
  /** "conarec.cl", en la cabecera del reverso. */
  dominio?: string;
  /** "N° 04521". */
  numero?: string;
  nombre?: string;
  cargo?: string;
  rut?: string;
  foto?: string;
  /** El QR lo genera la app (sólo lleva un enlace con un id aleatorio). */
  qr?: ReactNode;
  seguro?: string;
  telefonoEmergencia?: string;
  className?: string;
}

/**
 * La credencial impresa, en proporción CR80 (85,6 × 54 mm). Vive en papel:
 * se dibuja con el retema `.baliza-scope--papel` y no hereda la noche.
 */
export default function BalizaCredencial({
  cara,
  empresa,
  dominio,
  numero,
  nombre = "",
  cargo,
  rut,
  foto,
  qr,
  seguro,
  telefonoEmergencia,
  className,
}: BalizaCredencialProps) {
  if (cara === "reverso") {
    return (
      <article className={cx("baliza-scope baliza-scope--papel baliza-credencial baliza-credencial--reverso", className)} aria-label="Credencial, reverso">
        <header className="baliza-credencial__cabeza">
          <span className="baliza-credencial__empresa">{(dominio ?? empresa).toUpperCase()}</span>
          <span className="baliza-credencial__tipo">ACCESO DE EMERGENCIA</span>
        </header>
        <div className="baliza-credencial__qr-zona">
          <p className="baliza-credencial__aviso">Escanear solo en caso de emergencia</p>
          <div className="baliza-credencial__qr">{qr}</div>
          {(seguro || telefonoEmergencia) && (
            <p className="baliza-credencial__legal">
              {seguro}
              {seguro && telefonoEmergencia && " · "}
              {telefonoEmergencia}
            </p>
          )}
        </div>
      </article>
    );
  }
  return (
    <article className={cx("baliza-scope baliza-scope--papel baliza-credencial", className)} aria-label={`Credencial de ${nombre}`}>
      <header className="baliza-credencial__cabeza">
        <span className="baliza-credencial__empresa">{empresa}</span>
        <span className="baliza-credencial__tipo">
          Credencial operativa {numero && <b>{numero}</b>}
        </span>
      </header>
      <div className="baliza-credencial__cuerpo">
        <BalizaAvatar nombre={nombre} foto={foto} forma="ficha" className="baliza-credencial__foto" />
        <div className="baliza-credencial__datos">
          <p className="baliza-credencial__nombre">{nombre}</p>
          {cargo && <dl><div><dt>Cargo</dt><dd>{cargo}</dd></div></dl>}
          <dl className="baliza-credencial__par">
            {rut && <div><dt>RUT</dt><dd>{rut}</dd></div>}
            <div><dt>Empresa</dt><dd>{empresa}</dd></div>
          </dl>
        </div>
      </div>
      <footer className="baliza-credencial__pie">Incluye acceso QR de emergencia en el reverso</footer>
    </article>
  );
}
