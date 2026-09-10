import { useState } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaCajon from "../../../VitrinaCajon/VitrinaCajon";
import VitrinaDialogo from "../../../VitrinaDialogo/VitrinaDialogo";
import VitrinaPicto from "../../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../../VitrinaSello/VitrinaSello";
import VitrinaVacio from "../../../VitrinaVacio/VitrinaVacio";
import { useAvisos } from "../../avisos";
import type { Direccion } from "../../datos";
import FormDireccion from "../../partes/FormDireccion";
import { useTienda } from "../../state";

export default function Direcciones() {
  const { state, dispatch } = useTienda();
  const { avisar } = useAvisos();
  const [editando, setEditando] = useState<Direccion | "nueva" | null>(null);
  const [borrando, setBorrando] = useState<Direccion | null>(null);

  return (
    <div className="tienda-lista">
      {state.direcciones.length === 0 ? (
        <VitrinaVacio picto="ubicacion" titulo="Sin direcciones guardadas" texto="Guarda una y el checkout va más rápido." accion={{ label: "Añadir dirección", onClick: () => setEditando("nueva") }} />
      ) : (
        <div className="tienda-lista__cards">
          {state.direcciones.map((d) => (
            <article key={d.id} className="tienda-card-datos">
              <div className="tienda-card-datos__cab">
                <span className="tienda-card-datos__titulo">
                  <VitrinaPicto name="ubicacion" size={18} /> {d.alias}
                </span>
                {d.predeterminada && (
                  <VitrinaSello tono="neutro" pequeno>
                    Predeterminada
                  </VitrinaSello>
                )}
              </div>
              <p className="tienda-card-datos__texto">
                {d.nombre}
                <br />
                {d.calle} {d.numero}
                {d.depto ? `, ${d.depto}` : ""}
                <br />
                {d.comuna}, {d.region}
                <br />
                {d.telefono}
              </p>
              <div className="tienda-card-datos__acciones">
                <VitrinaBoton size="sm" variant="outline" onClick={() => setEditando(d)}>
                  Editar
                </VitrinaBoton>
                {!d.predeterminada && (
                  <VitrinaBoton size="sm" variant="ghost" onClick={() => { dispatch({ type: "direccion-predeterminar", id: d.id }); avisar("ok", `${d.alias} es ahora tu dirección predeterminada`); }}>
                    Predeterminar
                  </VitrinaBoton>
                )}
                <VitrinaBoton size="sm" variant="ghost" icono={<VitrinaPicto name="papelera" />} onClick={() => setBorrando(d)} aria-label={`Borrar ${d.alias}`}>
                  Borrar
                </VitrinaBoton>
              </div>
            </article>
          ))}
        </div>
      )}
      {state.direcciones.length > 0 && (
        <VitrinaBoton variant="outline" icono={<VitrinaPicto name="mas" />} onClick={() => setEditando("nueva")}>
          Añadir dirección
        </VitrinaBoton>
      )}

      <VitrinaCajon abierto={editando !== null} onCerrar={() => setEditando(null)} titulo={editando === "nueva" ? "Nueva dirección" : "Editar dirección"} lado="der" id="tienda-direccion">
        {editando && (
          <FormDireccion
            inicial={editando === "nueva" ? undefined : editando}
            onCancelar={() => setEditando(null)}
            onGuardar={(d) => {
              dispatch({ type: "direccion-guardar", direccion: d });
              setEditando(null);
              avisar("ok", "Dirección guardada");
            }}
          />
        )}
      </VitrinaCajon>

      <VitrinaDialogo abierto={borrando !== null} id="tienda-borrar-direccion" titulo={`¿Borrar «${borrando?.alias}»?`} detalle="Los pedidos ya hechos conservan su dirección de entrega." confirmar="Borrar" peligro onConfirmar={() => { if (borrando) dispatch({ type: "direccion-borrar", id: borrando.id }); setBorrando(null); avisar("ok", "Dirección borrada"); }} onCancelar={() => setBorrando(null)} />
    </div>
  );
}
