import { useState } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaCajon from "../../../VitrinaCajon/VitrinaCajon";
import VitrinaDialogo from "../../../VitrinaDialogo/VitrinaDialogo";
import VitrinaPicto from "../../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../../VitrinaSello/VitrinaSello";
import VitrinaVacio from "../../../VitrinaVacio/VitrinaVacio";
import { useAvisos } from "../../avisos";
import type { Tarjeta } from "../../datos";
import { tarjetaTexto } from "../../formato";
import FormTarjeta from "../../partes/FormTarjeta";
import { useTienda } from "../../state";

export default function Pagos() {
  const { state, dispatch } = useTienda();
  const { avisar } = useAvisos();
  const [nueva, setNueva] = useState(false);
  const [borrando, setBorrando] = useState<Tarjeta | null>(null);

  return (
    <div className="tienda-lista">
      {state.tarjetas.length === 0 ? (
        <VitrinaVacio picto="tarjeta" titulo="Sin tarjetas guardadas" texto="Guarda una y pagas en dos toques. Solo se guardan los últimos 4 dígitos." accion={{ label: "Añadir tarjeta", onClick: () => setNueva(true) }} />
      ) : (
        <div className="tienda-lista__cards">
          {state.tarjetas.map((t) => (
            <article key={t.id} className={`tienda-card-datos tienda-card-datos--tarjeta tienda-card-datos--${t.marca}`}>
              <div className="tienda-card-datos__cab">
                <span className="tienda-card-datos__titulo">
                  <VitrinaPicto name="tarjeta" size={18} /> {tarjetaTexto(t.marca, t.ultimos4)}
                </span>
                {t.predeterminada && (
                  <VitrinaSello tono="neutro" pequeno>
                    Predeterminada
                  </VitrinaSello>
                )}
              </div>
              <p className="tienda-card-datos__texto">
                {t.titular}
                <br />
                Vence {t.vence}
              </p>
              <div className="tienda-card-datos__acciones">
                {!t.predeterminada && (
                  <VitrinaBoton size="sm" variant="outline" onClick={() => { dispatch({ type: "tarjeta-predeterminar", id: t.id }); avisar("ok", "Tarjeta predeterminada actualizada"); }}>
                    Predeterminar
                  </VitrinaBoton>
                )}
                <VitrinaBoton size="sm" variant="ghost" icono={<VitrinaPicto name="papelera" />} onClick={() => setBorrando(t)}>
                  Quitar
                </VitrinaBoton>
              </div>
            </article>
          ))}
        </div>
      )}
      {state.tarjetas.length > 0 && (
        <VitrinaBoton variant="outline" icono={<VitrinaPicto name="mas" />} onClick={() => setNueva(true)}>
          Añadir tarjeta
        </VitrinaBoton>
      )}

      <VitrinaCajon abierto={nueva} onCerrar={() => setNueva(false)} titulo="Nueva tarjeta" lado="der" id="tienda-tarjeta">
        {nueva && (
          <FormTarjeta
            onCancelar={() => setNueva(false)}
            onGuardar={(t) => {
              dispatch({ type: "tarjeta-guardar", tarjeta: t });
              setNueva(false);
              avisar("ok", `${tarjetaTexto(t.marca, t.ultimos4)} guardada`);
            }}
          />
        )}
      </VitrinaCajon>

      <VitrinaDialogo abierto={borrando !== null} id="tienda-borrar-tarjeta" titulo={`¿Quitar la ${borrando ? tarjetaTexto(borrando.marca, borrando.ultimos4) : "tarjeta"}?`} detalle="Tendrás que volver a escribirla la próxima vez que pagues." confirmar="Quitar" peligro onConfirmar={() => { if (borrando) dispatch({ type: "tarjeta-borrar", id: borrando.id }); setBorrando(null); avisar("ok", "Tarjeta quitada"); }} onCancelar={() => setBorrando(null)} />
    </div>
  );
}
