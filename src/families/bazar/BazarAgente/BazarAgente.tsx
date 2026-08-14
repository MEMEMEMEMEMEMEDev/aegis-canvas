import { useRef, type ElementType, type PointerEvent, type ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarAgente.scss";

export interface BazarAgenteProps {
  /** El ideograma del troquel. Gráfico, nunca texto de lectura. */
  kana: string;
  /** El nombre que va en la barra oscura, en la voz display de la familia. */
  nombre: string;
  /** Etiqueta del nombre: "h3" cuando la carta es una subsección. */
  as?: ElementType;
  /** La línea de rol bajo la barra. Corta: es un subtítulo, no un párrafo. */
  rol?: string;
  /** La solapa vertical del canto izquierdo. */
  etiqueta?: string;
  /** Posición en el mazo — imprime el "(1/4)" de la esquina. */
  indice?: number;
  total?: number;
  /** La banda de advertencia del empaque. */
  aviso?: string;
  /** Micro-línea de la derecha del aviso: la telemetría de la carta. */
  micro?: string;
  /** La palabra grande estampada en el pie, como el logo del blíster. */
  firma?: string;
  /** rosa (default) · morado · holo — la tinta del cartel. */
  tone?: "rosa" | "morado" | "holo";
  /**
   * Marca la carta como la elegida: el filete se enciende y la solapa se
   * llena. Es SOLO piel — quién está activo lo decide quien la usa.
   */
  activo?: boolean;
  /**
   * Inclina la carta siguiendo al puntero. Escribe dos custom properties
   * sobre el propio nodo en vez de re-renderizar: mover el ratón sobre una
   * carta no debería costar un render de React por píxel.
   *
   * Sin hidratar (Astro puro) el manejador nunca se engancha y la carta se
   * queda quieta y perfectamente legible: el tilt es adorno, no contenido.
   */
  tilt?: boolean;
  /** El cartel: retrato, maqueta o lo que la carta exhiba. */
  children?: ReactNode;
  className?: string;
}

/**
 * LA FICHA DE AGENTE: la carta coleccionable de la referencia 1 — solapa
 * vertical al canto, barra oscura con kana y nombre, banda de advertencia,
 * cartel a todo color con el ideograma gigante detrás y el pie con marcas
 * y firma.
 *
 * Es la pieza de más peso de la familia y la única pensada para MANEJARSE:
 * se elige, se inclina y se enciende. El resto del portal es papel pegado;
 * esta es la carta que se tiene en la mano.
 */
export default function BazarAgente({
  kana,
  nombre,
  as: Nombre = "p",
  rol,
  etiqueta = "AGENTE",
  indice,
  total,
  aviso,
  micro,
  firma,
  tone = "rosa",
  activo = false,
  tilt = false,
  children,
  className,
}: BazarAgenteProps) {
  const carta = useRef<HTMLElement>(null);

  const seguir = (e: PointerEvent<HTMLElement>) => {
    // Solo punteros finos: en una pantalla táctil el dedo TAPA la carta que
    // estaría inclinando, y el gesto compite con el scroll de la página.
    if (!tilt || e.pointerType !== "mouse") return;
    const nodo = carta.current;
    if (!nodo) return;

    const caja = nodo.getBoundingClientRect();
    // -1..1 desde el centro. La piel decide cuántos grados vale ese 1.
    const x = (e.clientX - caja.left) / caja.width - 0.5;
    const y = (e.clientY - caja.top) / caja.height - 0.5;
    nodo.style.setProperty("--agente-x", String(x * 2));
    nodo.style.setProperty("--agente-y", String(y * 2));
  };

  const soltar = () => {
    const nodo = carta.current;
    if (!nodo) return;
    // Se BORRAN en vez de fijarse en 0: así la carta vuelve al valor por
    // defecto de la hoja y la transición de reposo la trae de vuelta sola.
    nodo.style.removeProperty("--agente-x");
    nodo.style.removeProperty("--agente-y");
  };

  return (
    <article
      ref={carta}
      className={cx(
        "bazar-agente",
        `bazar-agente--${tone}`,
        activo && "is-activo",
        tilt && "bazar-agente--tilt",
        className,
      )}
      onPointerMove={seguir}
      onPointerLeave={soltar}
    >
      <span className="bazar-agente__solapa" aria-hidden="true">
        {etiqueta}
      </span>

      <header className="bazar-agente__cabecera">
        <span className="bazar-agente__kana" aria-hidden="true">
          {kana}
        </span>
        <Nombre className="bazar-agente__nombre">{nombre}</Nombre>
        {indice !== undefined && total !== undefined && (
          <span className="bazar-agente__paginado" aria-hidden="true">
            ({indice}/{total})
          </span>
        )}
      </header>

      {(aviso || micro) && (
        <div className="bazar-agente__banda">
          {aviso && (
            <span className="bazar-agente__aviso">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 1.8 15 14H1L8 1.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M8 6v4M8 11.6v.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              {aviso}
            </span>
          )}
          {micro && <span className="bazar-agente__micro">{micro}</span>}
        </div>
      )}

      <div className="bazar-agente__cartel">
        {/* El ideograma gigante del fondo: es el mismo kana de la barra,
            reventado de tamaño y recortado por el marco. Decorativo —
            arriba ya se anunció, y repetirlo al lector sería ruido. */}
        <span className="bazar-agente__fondo" aria-hidden="true">
          {kana}
        </span>
        {/* El barrido tornasol. Vive sobre el cartel y bajo el contenido:
            la carta brilla, no se blanquea. */}
        <span className="bazar-agente__brillo" aria-hidden="true" />
        <div className="bazar-agente__lienzo">{children}</div>
      </div>

      {rol && <p className="bazar-agente__rol">{rol}</p>}

      <footer className="bazar-agente__pie">
        <span className="bazar-agente__marcas" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {firma && (
          <span className="bazar-agente__firma" aria-hidden="true">
            {firma}
          </span>
        )}
      </footer>
    </article>
  );
}
