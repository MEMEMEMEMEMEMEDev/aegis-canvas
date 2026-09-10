import { useId, useState } from "react";
import { VitrinaArea } from "../../VitrinaEntrada/VitrinaEntrada";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCampo from "../../VitrinaCampo/VitrinaCampo";
import VitrinaEstrellas from "../../VitrinaEstrellas/VitrinaEstrellas";
import { useAvisos } from "../avisos";
import type { Producto } from "../datos";
import { hace } from "../formato";


type Pestana = "descripcion" | "especificaciones" | "opiniones";

/** Descripción · Especificaciones · Opiniones, como tablist de verdad. */
export default function ProductoPestanas({ producto, inicial = "descripcion" }: { producto: Producto; inicial?: Pestana }) {
  const id = useId();
  const [activa, setActiva] = useState<Pestana>(inicial);
  const [valor, setValor] = useState(0);
  const [texto, setTexto] = useState("");
  const { avisar } = useAvisos();
  const pestanas: Array<[Pestana, string]> = [["descripcion", "Descripción"], ["especificaciones", "Especificaciones"], ["opiniones", `Opiniones (${producto.resenas})`]];

  return (
    <div className="tienda-pestanas" id="opiniones">
      <div className="tienda-pestanas__lista" role="tablist" aria-label="Información del producto">
        {pestanas.map(([k, label]) => (
          <button key={k} type="button" role="tab" id={`${id}-tab-${k}`} aria-selected={activa === k} aria-controls={`${id}-panel-${k}`} tabIndex={activa === k ? 0 : -1} className={`tienda-pestanas__tab${activa === k ? " is-activa" : ""}`} onClick={() => setActiva(k)}>
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${id}-panel-${activa}`} aria-labelledby={`${id}-tab-${activa}`} className="tienda-pestanas__panel">
        {activa === "descripcion" && (
          <div className="tienda-prosa">
            <p>{producto.descripcion}</p>
            <p>Envío {producto.envio.gratis ? "gratis" : "estándar"}, entrega en {producto.envio.dias[0]} a {producto.envio.dias[1]} días hábiles. Cambio o devolución dentro de los 30 días, sin preguntas.</p>
          </div>
        )}

        {activa === "especificaciones" && (
          <dl className="tienda-specs">
            {producto.especificaciones.map(([k, v]) => (
              <div key={k} className="tienda-specs__fila">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {activa === "opiniones" && (
          <div className="tienda-opiniones">
            <div className="tienda-opiniones__resumen">
              <span className="tienda-opiniones__cifra">{producto.valoracion.toFixed(1).replace(".", ",")}</span>
              <VitrinaEstrellas valor={producto.valoracion} cantidad={producto.resenas} tamano="lg" />
            </div>
            <ul className="tienda-opiniones__lista">
              {producto.opiniones.map((o, i) => (
                <li key={i} className="tienda-opinion">
                  <div className="tienda-opinion__cab">
                    <span className="tienda-opinion__autor">{o.autor}</span>
                    <span className="tienda-opinion__fecha">{hace(o.fecha)}</span>
                  </div>
                  <VitrinaEstrellas valor={o.valor} tamano="sm" />
                  <p className="tienda-opinion__texto">{o.texto}</p>
                </li>
              ))}
            </ul>
            <form
              className="tienda-opiniones__form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!valor) return;
                avisar("ok", "Gracias por tu opinión: la publicamos en cuanto la revisemos");
                setValor(0);
                setTexto("");
              }}
            >
              <VitrinaEstrellas interactivo valor={valor} onChange={setValor} label="Tu valoración" />
              <VitrinaCampo label="Tu opinión" hint="Opcional">
                <VitrinaArea value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="¿Qué tal te resultó?" rows={3} />
              </VitrinaCampo>
              <VitrinaBoton variant="outline" type="submit" disabled={!valor}>
                Publicar opinión
              </VitrinaBoton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
