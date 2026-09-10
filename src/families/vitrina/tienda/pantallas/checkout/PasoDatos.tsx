import { useState } from "react";
import type { FormEvent } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaCampo from "../../../VitrinaCampo/VitrinaCampo";
import VitrinaEntrada from "../../../VitrinaEntrada/VitrinaEntrada";
import VitrinaOpcion, { VitrinaOpcionGrupo } from "../../../VitrinaOpcion/VitrinaOpcion";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import type { Direccion } from "../../datos";
import FormDireccion from "../../partes/FormDireccion";
import { useRuta } from "../../ruta";
import { direccionPredeterminada, useTienda } from "../../state";

const direccionTexto = (d: Direccion) => `${d.calle} ${d.numero}${d.depto ? `, ${d.depto}` : ""}, ${d.comuna}`;

export default function PasoDatos({ onSiguiente }: { onSiguiente: () => void }) {
  const { state, dispatch } = useTienda();
  const { ir } = useRuta();
  const conSesion = state.sesion !== null;
  const [email, setEmail] = useState(state.checkout.email || state.sesion?.email || "");
  const [direccionId, setDireccionId] = useState<string | undefined>(state.checkout.direccionId ?? direccionPredeterminada(state)?.id);
  const [nueva, setNueva] = useState(state.direcciones.length === 0);
  const [err, setErr] = useState<string | null>(null);

  function seguir(e: FormEvent) {
    e.preventDefault();
    if (!conSesion && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr("Necesitamos un correo para enviarte la confirmación");
    if (!direccionId) return setErr("Elige o crea una dirección de entrega");
    setErr(null);
    dispatch({ type: "checkout", parcial: { email: email.trim() || state.sesion?.email || "", direccionId } });
    onSiguiente();
  }

  return (
    <form className="tienda-paso" onSubmit={seguir} noValidate>
      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion" accion={!conSesion ? { label: "¿Ya tienes cuenta? Entra", onClick: () => ir({ v: "acceso", modo: "entrar", despues: { v: "checkout", paso: "datos" } }) } : undefined}>
          Tus datos
        </VitrinaTitular>
        {conSesion ? (
          <p className="tienda-nota">
            Compras como <strong>{state.sesion?.nombre} {state.sesion?.apellido}</strong> · {state.sesion?.email}
          </p>
        ) : (
          <VitrinaCampo modo="linea" label="Correo para la confirmación" required>
            <VitrinaEntrada modo="linea" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.cl" autoComplete="email" />
          </VitrinaCampo>
        )}
      </section>

      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion">Dirección de entrega</VitrinaTitular>
        {state.direcciones.length > 0 && !nueva && (
          <VitrinaOpcionGrupo leyenda="Elige una dirección">
            {state.direcciones.map((d) => (
              <VitrinaOpcion key={d.id} tipo="radio" name="direccion" checked={direccionId === d.id} onChange={() => setDireccionId(d.id)} label={`${d.alias} · ${d.nombre}`} detalle={`${direccionTexto(d)}, ${d.region}`} derecha={d.predeterminada ? <span className="tienda-chica">Predeterminada</span> : undefined} />
            ))}
          </VitrinaOpcionGrupo>
        )}
        {nueva ? (
          <FormDireccion
            modo="linea"
            guardarLabel="Usar esta dirección"
            onCancelar={state.direcciones.length ? () => setNueva(false) : undefined}
            onGuardar={(d) => {
              dispatch({ type: "direccion-guardar", direccion: d });
              setDireccionId(d.id);
              setNueva(false);
            }}
          />
        ) : (
          <button type="button" className="tienda-enlace" onClick={() => setNueva(true)}>
            + Usar otra dirección
          </button>
        )}
      </section>

      {err && (
        <p className="tienda-error" role="alert">
          {err}
        </p>
      )}
      {!nueva && (
        <VitrinaBoton tono="bloque" type="submit">
          Continuar al envío
        </VitrinaBoton>
      )}
    </form>
  );
}
