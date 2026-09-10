import { useEffect } from "react";
import VitrinaLinea from "../../../VitrinaLinea/VitrinaLinea";
import VitrinaPasos from "../../../VitrinaPasos/VitrinaPasos";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import VitrinaTotales from "../../../VitrinaTotales/VitrinaTotales";
import { VENDEDOR } from "../../datos";
import type { PasoCheckout } from "../../datos";
import { laminaDe } from "../../partes/utiles";
import { useRuta } from "../../ruta";
import { lineasCesta, totales, useTienda } from "../../state";
import PasoDatos from "./PasoDatos";
import PasoEnvio from "./PasoEnvio";
import PasoPago from "./PasoPago";
import PasoRevision from "./PasoRevision";

export const PASOS: Array<{ id: PasoCheckout; label: string }> = [
  { id: "datos", label: "Datos" },
  { id: "envio", label: "Envío" },
  { id: "pago", label: "Pago" },
  { id: "revision", label: "Revisión" },
];

const TITULO: Record<PasoCheckout, string> = { datos: "Checkout", envio: "Envío", pago: "Pago", revision: "Revisión" };

/** Hasta qué paso se puede llegar con lo que hay en el borrador. */
function pasoPermitido(b: { email: string; direccionId?: string; envio?: string; pago?: unknown }, conSesion: boolean): PasoCheckout {
  if (!(conSesion || b.email) || !b.direccionId) return "datos";
  if (!b.envio) return "envio";
  if (!b.pago) return "pago";
  return "revision";
}

export default function Checkout({ paso }: { paso: PasoCheckout }) {
  const { state, dispatch } = useTienda();
  const { ir, reemplazar } = useRuta();
  const lineas = lineasCesta(state);
  const t = totales(state, state.checkout.envio);

  // No se puede saltar a un paso sin lo que pide el anterior.
  const tope = pasoPermitido(state.checkout, state.sesion !== null);
  const orden = PASOS.map((p) => p.id);
  const permitido = orden.indexOf(paso) <= orden.indexOf(tope);
  useEffect(() => {
    if (!permitido) reemplazar({ v: "checkout", paso: tope });
    else if (state.checkout.paso !== paso) dispatch({ type: "checkout-paso", paso });
  }, [permitido, tope, paso, reemplazar, dispatch, state.checkout.paso]);

  const irA = (p: PasoCheckout) => ir({ v: "checkout", paso: p });

  const resumen = (
    <>
      <div className="tienda-lineas tienda-lineas--compactas">
        {lineas.map(({ linea, producto, variante, nombreVariante }) => (
          <VitrinaLinea key={linea.id} modo="compacta" linea={{ id: linea.id, nombre: producto.nombre, variante: nombreVariante, vendedor: VENDEDOR[producto.vendedor].nombre, precioUnitario: producto.precio, cantidad: linea.cantidad, lamina: laminaDe(producto, variante?.color) }} />
        ))}
      </div>
      <VitrinaTotales subtotal={t.subtotal} descuento={t.descuento} descuentoLabel={state.checkout.paso && state.cupon ? `Cupón ${state.cupon.codigo}` : "Descuento"} envio={t.envio} total={t.total} nota="IVA incluido." />
    </>
  );

  return (
    <>
      <VitrinaTitular tamano="gigante" sobre={paso === "datos" ? "Tu compra" : "Checkout"}>
        {TITULO[paso]}
      </VitrinaTitular>
      <VitrinaPasos pasos={PASOS} actual={paso} onIr={(id) => irA(id as PasoCheckout)} />

      <div className="tienda-transaccion">
        <div className="tienda-transaccion__principal">
          <details className="tienda-resumen-movil">
            <summary>
              Resumen del pedido · <strong>{t.unidades} {t.unidades === 1 ? "artículo" : "artículos"}</strong>
            </summary>
            <div className="tienda-resumen-movil__cuerpo">{resumen}</div>
          </details>

          {paso === "datos" && <PasoDatos onSiguiente={() => irA("envio")} />}
          {paso === "envio" && <PasoEnvio onSiguiente={() => irA("pago")} onAtras={() => irA("datos")} />}
          {paso === "pago" && <PasoPago onSiguiente={() => irA("revision")} onAtras={() => irA("envio")} />}
          {paso === "revision" && <PasoRevision onIr={irA} />}
        </div>

        <aside className="tienda-transaccion__lateral tienda-transaccion__lateral--fijo">
          <h2 className="tienda-lateral__titulo">Tu bolsa ({t.unidades})</h2>
          {resumen}
        </aside>
      </div>
    </>
  );
}
