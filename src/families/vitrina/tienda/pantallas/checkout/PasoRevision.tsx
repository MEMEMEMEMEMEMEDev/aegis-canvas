import { useState } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaCarga from "../../../VitrinaCarga/VitrinaCarga";
import VitrinaOpcion from "../../../VitrinaOpcion/VitrinaOpcion";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import { espera } from "../../api";
import { VENDEDOR, nombreVariante, timelinePara } from "../../datos";
import type { PasoCheckout, Pedido } from "../../datos";
import { entregaEstimada, numeroPedido, tarjetaTexto } from "../../formato";
import { useRuta } from "../../ruta";
import { ENVIO_DIAS, ENVIO_LABEL, lineasCesta, totales, useTienda } from "../../state";

export default function PasoRevision({ onIr }: { onIr: (p: PasoCheckout) => void }) {
  const { state, dispatch } = useTienda();
  const { reemplazar } = useRuta();
  const [acepta, setAcepta] = useState(state.checkout.aceptaTerminos);
  const [confirmando, setConfirmando] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const b = state.checkout;
  const direccion = state.direcciones.find((d) => d.id === b.direccionId);
  const tarjeta = state.tarjetas.find((t) => t.id === b.pago?.tarjetaId);
  const envio = b.envio ?? "estandar";
  const t = totales(state, envio);

  const etiquetaPago = b.pago?.tipo === "tarjeta" && tarjeta ? tarjetaTexto(tarjeta.marca, tarjeta.ultimos4) : b.pago?.tipo === "transferencia" ? "Transferencia bancaria" : "Billetera digital";

  async function confirmar() {
    if (!acepta) return setErr("Acepta los términos para confirmar");
    if (!direccion || !b.pago) return setErr("Falta la dirección o el pago");
    setErr(null);
    setConfirmando(true);
    dispatch({ type: "checkout", parcial: { aceptaTerminos: true } });
    await espera(1100);

    const ahora = new Date().toISOString();
    const pedido: Pedido = {
      id: `p-${Date.now()}`,
      numero: numeroPedido(state.secuencia),
      creadoEn: ahora,
      estado: "pagado",
      timeline: timelinePara("pagado", ahora),
      lineas: lineasCesta(state).map(({ linea, producto, variante }) => ({ id: linea.id, productoId: producto.id, varianteId: linea.varianteId, nombre: producto.nombre, variante: nombreVariante(variante), categoria: producto.categoria, vendedor: VENDEDOR[producto.vendedor].nombre, precioUnitario: producto.precio, cantidad: linea.cantidad })),
      direccion,
      envio,
      pago: { tipo: b.pago.tipo, etiqueta: etiquetaPago },
      subtotal: t.subtotal,
      descuento: t.descuento,
      costoEnvio: t.costoEnvio,
      total: t.total,
      cupon: state.cupon?.codigo,
      entregaEstimada: new Date(Date.now() + ENVIO_DIAS[envio][1] * 86400 * 1000).toISOString(),
    };
    dispatch({ type: "confirmar-pedido", pedido });
    reemplazar({ v: "confirmacion", pedidoId: pedido.id });
  }

  if (confirmando) {
    return (
      <div className="tienda-paso">
        <VitrinaCarga modo="pagina" texto="Confirmando tu pedido con el vendedor…" />
      </div>
    );
  }

  return (
    <div className="tienda-paso">
      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion" accion={{ label: "Cambiar", onClick: () => onIr("datos") }}>
          Entrega
        </VitrinaTitular>
        {direccion && (
          <p className="tienda-nota">
            <strong>{direccion.nombre}</strong>
            <br />
            {direccion.calle} {direccion.numero}
            {direccion.depto ? `, ${direccion.depto}` : ""}, {direccion.comuna}, {direccion.region}
            <br />
            {direccion.telefono}
          </p>
        )}
      </section>

      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion" accion={{ label: "Cambiar", onClick: () => onIr("envio") }}>
          Envío
        </VitrinaTitular>
        <p className="tienda-nota">
          <strong>{ENVIO_LABEL[envio]}</strong> · {envio === "retiro" ? "Retiras en tienda" : entregaEstimada(ENVIO_DIAS[envio])}
        </p>
      </section>

      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion" accion={{ label: "Cambiar", onClick: () => onIr("pago") }}>
          Pago
        </VitrinaTitular>
        <p className="tienda-nota">
          <strong>{etiquetaPago}</strong>
          {tarjeta ? ` · ${tarjeta.titular}` : ""}
        </p>
      </section>

      <VitrinaOpcion tipo="casilla" marco={false} checked={acepta} onChange={setAcepta} label="Acepto los términos de compra y la política de devoluciones" />
      {err && (
        <p className="tienda-error" role="alert">
          {err}
        </p>
      )}
      <VitrinaBoton tono="bloque" onClick={confirmar} disabled={!acepta}>
        Pagar y confirmar pedido
      </VitrinaBoton>
      <p className="tienda-chica">Es una demo: no se cobra nada, pero el pedido aparece en Mis compras con su seguimiento.</p>
    </div>
  );
}
