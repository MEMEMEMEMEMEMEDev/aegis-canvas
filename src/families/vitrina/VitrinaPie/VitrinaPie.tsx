import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import VitrinaTitular from "../VitrinaTitular/VitrinaTitular";
import "../vitrina.scss";
import "./VitrinaPie.scss";

export interface VitrinaPieColumna {
  titulo: string;
  enlaces: Array<{ id: string; label: string }>;
}

export interface VitrinaPieProps {
  marca: ReactNode;
  /** La frase gigante en blanco. */
  titular: ReactNode;
  sobre?: string;
  columnas?: VitrinaPieColumna[];
  onIr?: (id: string) => void;
  /** Con él aparece el newsletter. */
  onSuscribir?: (email: string) => void;
  /** La letra chica: copyright, "hecho en…". */
  legal?: ReactNode;
  /** Marcas de pago u otros sellos, a la derecha del legal. */
  extras?: ReactNode;
  className?: string;
}

/**
 * Pie VITRINA: el footer bloque negro de la referencia — una frase gigante
 * en blanco condensado, columnas de enlaces en micro, el newsletter con un
 * input de línea y la letra chica en gris que todavía se lee (7,2:1).
 */
export default function VitrinaPie({ marca, titular, sobre, columnas, onIr, onSuscribir, legal, extras, className }: VitrinaPieProps) {
  const [email, setEmail] = useState("");
  const [listo, setListo] = useState(false);

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    onSuscribir?.(email.trim());
    setListo(true);
    setEmail("");
  }

  return (
    <footer className={cx("vitrina-pie", className)}>
      <div className="vitrina-pie__interior">
        <div className="vitrina-pie__arriba">
          <VitrinaTitular tamano="gigante" tono="bloque" sobre={sobre} as="p">
            {titular}
          </VitrinaTitular>
        </div>

        <div className="vitrina-pie__rejilla">
          <div className="vitrina-pie__col vitrina-pie__col--marca">
            <span className="vitrina-pie__marca">{marca}</span>
            {onSuscribir && (
              <form className="vitrina-pie__news" onSubmit={enviar}>
                <label className="vitrina-pie__label" htmlFor="vitrina-pie-email">
                  Novedades y ofertas
                </label>
                <div className="vitrina-pie__campo">
                  <input
                    id="vitrina-pie-email"
                    type="email"
                    className="vitrina-pie__input"
                    placeholder="tu@correo.cl"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setListo(false);
                    }}
                    autoComplete="email"
                  />
                  <button type="submit" className="vitrina-pie__enviar" aria-label="Suscribirme">
                    <VitrinaPicto name="flecha-der" />
                  </button>
                </div>
                <span className="vitrina-pie__nota" role="status">
                  {listo ? "Listo. Te escribimos poco y bien." : "Sin spam. Te das de baja cuando quieras."}
                </span>
              </form>
            )}
          </div>

          {columnas?.map((c) => (
            <div key={c.titulo} className="vitrina-pie__col">
              <span className="vitrina-pie__titulo">{c.titulo}</span>
              <ul className="vitrina-pie__lista">
                {c.enlaces.map((e) => (
                  <li key={e.id}>
                    <button type="button" className="vitrina-pie__enlace" onClick={() => onIr?.(e.id)}>
                      {e.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="vitrina-pie__abajo">
          <span className="vitrina-pie__legal">{legal}</span>
          {extras && <span className="vitrina-pie__extras">{extras}</span>}
        </div>
      </div>
    </footer>
  );
}
