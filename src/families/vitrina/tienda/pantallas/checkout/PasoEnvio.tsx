import { useState } from "react";
import type { FormEvent } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaOpcion, { VitrinaOpcionGrupo } from "../../../VitrinaOpcion/VitrinaOpcion";
import VitrinaPicto from "../../../VitrinaPicto/VitrinaPicto";
import VitrinaPrecio from "../../../VitrinaPrecio/VitrinaPrecio";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import type { MetodoEnvio } from "../../datos";
import { entregaEstimada } from "../../formato";
import { COSTO_ENVIO, ENVIO_DIAS, ENVIO_GRATIS_DESDE, ENVIO_LABEL, totales, useTienda } from "../../state";

export default function PasoEnvio({ onSiguiente, onAtras }: { onSiguiente: () => void; onAtras: () => void }) {
  const { state, dispatch } = useTienda();
  const [envio, setEnvio] = useState<MetodoEnvio>(state.checkout.envio ?? "estandar");
  const t = totales(state);
  const gratisEstandar = t.subtotal >= ENVIO_GRATIS_DESDE;
  const direccion = state.direcciones.find((d) => d.id === state.checkout.direccionId);

  const gratis = <span className="tienda-ok">Gratis</span>;
  const precioDe = (m: MetodoEnvio) => (m === "retiro" || (m === "estandar" && gratisEstandar) ? gratis : <VitrinaPrecio valor={COSTO_ENVIO[m]} tamano="sm" />);

  function seguir(e: FormEvent) {
    e.preventDefault();
    dispatch({ type: "checkout", parcial: { envio } });
    onSiguiente();
  }

  return (
    <form className="tienda-paso" onSubmit={seguir}>
      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion" accion={{ label: "Cambiar", onClick: onAtras }}>
          Entregar en
        </VitrinaTitular>
        {direccion && (
          <p className="tienda-nota">
            <strong>{direccion.alias}</strong> · {direccion.calle} {direccion.numero}
            {direccion.depto ? `, ${direccion.depto}` : ""}, {direccion.comuna}
          </p>
        )}
      </section>

      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion">Método de envío</VitrinaTitular>
        <VitrinaOpcionGrupo leyenda="Elige cómo te llega">
          {(["estandar", "express", "retiro"] as MetodoEnvio[]).map((m) => (
            <VitrinaOpcion key={m} tipo="radio" name="envio" checked={envio === m} onChange={() => setEnvio(m)} icono={<VitrinaPicto name={m === "retiro" ? "casa" : m === "express" ? "rayo" : "camion"} />} label={ENVIO_LABEL[m]} detalle={m === "retiro" ? "Ferretería Lautaro · Temuco, o el punto más cercano" : entregaEstimada(ENVIO_DIAS[m])} derecha={precioDe(m)} />
          ))}
        </VitrinaOpcionGrupo>
        {!gratisEstandar && <p className="tienda-chica">El envío estándar es gratis en compras sobre $39.990.</p>}
      </section>

      <div className="tienda-paso__acciones">
        <VitrinaBoton variant="outline" type="button" onClick={onAtras}>
          Atrás
        </VitrinaBoton>
        <VitrinaBoton tono="bloque" type="submit">
          Continuar al pago
        </VitrinaBoton>
      </div>
    </form>
  );
}
