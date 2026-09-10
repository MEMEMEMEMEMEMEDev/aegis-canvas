import { useState } from "react";
import type { FormEvent } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaOpcion, { VitrinaOpcionGrupo } from "../../../VitrinaOpcion/VitrinaOpcion";
import VitrinaPicto from "../../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../../VitrinaSello/VitrinaSello";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import type { MetodoPagoTipo } from "../../datos";
import { tarjetaTexto } from "../../formato";
import FormTarjeta from "../../partes/FormTarjeta";
import { tarjetaPredeterminada, useTienda } from "../../state";

export default function PasoPago({ onSiguiente, onAtras }: { onSiguiente: () => void; onAtras: () => void }) {
  const { state, dispatch } = useTienda();
  const [tipo, setTipo] = useState<MetodoPagoTipo>(state.checkout.pago?.tipo ?? "tarjeta");
  const [tarjetaId, setTarjetaId] = useState<string | undefined>(state.checkout.pago?.tarjetaId ?? tarjetaPredeterminada(state)?.id);
  const [nueva, setNueva] = useState(state.tarjetas.length === 0);
  const [err, setErr] = useState<string | null>(null);

  function seguir(e: FormEvent) {
    e.preventDefault();
    if (tipo === "billetera") return setErr("La billetera digital no está disponible en esta demo. Elige otro medio.");
    if (tipo === "tarjeta" && !tarjetaId) return setErr("Elige o añade una tarjeta");
    setErr(null);
    dispatch({ type: "checkout", parcial: { pago: { tipo, tarjetaId: tipo === "tarjeta" ? tarjetaId : undefined } } });
    onSiguiente();
  }

  return (
    <form className="tienda-paso" onSubmit={seguir} noValidate>
      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion">Medio de pago</VitrinaTitular>
        <VitrinaOpcionGrupo leyenda="Elige cómo pagar" error={tipo === "billetera" ? "No disponible en la demo" : null}>
          <VitrinaOpcion tipo="radio" name="pago" checked={tipo === "tarjeta"} onChange={() => setTipo("tarjeta")} icono={<VitrinaPicto name="tarjeta" />} label="Tarjeta de crédito o débito" derecha={<VitrinaSello pequeno>Visa · MC · Amex</VitrinaSello>} />
          <VitrinaOpcion tipo="radio" name="pago" checked={tipo === "transferencia"} onChange={() => setTipo("transferencia")} icono={<VitrinaPicto name="casa" />} label="Transferencia bancaria" detalle="Te mandamos los datos; confirmamos en menos de 1 hora" />
          <VitrinaOpcion tipo="radio" name="pago" checked={tipo === "billetera"} onChange={() => setTipo("billetera")} icono={<VitrinaPicto name="rayo" />} label="Billetera digital" detalle="Pronto" />
        </VitrinaOpcionGrupo>
      </section>

      {tipo === "tarjeta" && (
        <section className="tienda-paso__bloque">
          <VitrinaTitular tamano="seccion">Tarjeta</VitrinaTitular>
          {state.tarjetas.length > 0 && !nueva && (
            <VitrinaOpcionGrupo leyenda="Tus tarjetas">
              {state.tarjetas.map((t) => (
                <VitrinaOpcion key={t.id} tipo="radio" name="tarjeta" checked={tarjetaId === t.id} onChange={() => setTarjetaId(t.id)} icono={<VitrinaPicto name="tarjeta" />} label={tarjetaTexto(t.marca, t.ultimos4)} detalle={`${t.titular} · vence ${t.vence}`} derecha={t.predeterminada ? <span className="tienda-chica">Predeterminada</span> : undefined} />
              ))}
            </VitrinaOpcionGrupo>
          )}
          {nueva ? (
            <FormTarjeta
              modo="linea"
              guardarLabel="Usar esta tarjeta"
              onCancelar={state.tarjetas.length ? () => setNueva(false) : undefined}
              onGuardar={(t) => {
                dispatch({ type: "tarjeta-guardar", tarjeta: t });
                setTarjetaId(t.id);
                setNueva(false);
              }}
            />
          ) : (
            <button type="button" className="tienda-enlace" onClick={() => setNueva(true)}>
              + Añadir otra tarjeta
            </button>
          )}
        </section>
      )}

      {err && (
        <p className="tienda-error" role="alert">
          {err}
        </p>
      )}
      {!(tipo === "tarjeta" && nueva) && (
        <div className="tienda-paso__acciones">
          <VitrinaBoton variant="outline" type="button" onClick={onAtras}>
            Atrás
          </VitrinaBoton>
          <VitrinaBoton tono="bloque" type="submit">
            Revisar el pedido
          </VitrinaBoton>
        </div>
      )}
    </form>
  );
}
