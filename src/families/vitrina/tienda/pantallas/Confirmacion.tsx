import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaLinea from "../../VitrinaLinea/VitrinaLinea";
import VitrinaTitular from "../../VitrinaTitular/VitrinaTitular";
import VitrinaTotales from "../../VitrinaTotales/VitrinaTotales";
import VitrinaVacio from "../../VitrinaVacio/VitrinaVacio";
import { CATEGORIA } from "../datos";
import { fechaLarga } from "../formato";
import { useRuta } from "../ruta";
import { ENVIO_LABEL, useTienda } from "../state";

export default function Confirmacion({ pedidoId }: { pedidoId: string }) {
  const { state } = useTienda();
  const { ir } = useRuta();
  const pedido = state.pedidos.find((p) => p.id === pedidoId);

  if (!pedido) return <VitrinaVacio tono="404" alto="pantalla" titulo="No encontramos ese pedido" accion={{ label: "Ir al inicio", onClick: () => ir({ v: "inicio" }) }} />;

  return (
    <div className="tienda-confirmacion">
      <span className="tienda-confirmacion__check" aria-hidden="true">
        <svg viewBox="0 0 96 96" width="96" height="96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="48" cy="48" r="42" pathLength="100" className="tienda-confirmacion__circulo" />
          <path d="M30 49l12 12 24-26" pathLength="100" className="tienda-confirmacion__tick" />
        </svg>
      </span>

      <VitrinaTitular tamano="gigante" sobre={`Pedido ${pedido.numero}`} tono="tinta">
        ¡Listo!
      </VitrinaTitular>
      <p className="tienda-confirmacion__texto">
        Te mandamos la confirmación a <strong>{state.sesion?.email ?? (state.checkout.email || "tu correo")}</strong>. {pedido.envio === "retiro" ? "Te avisamos cuando esté listo para retirar." : <>Llega el <strong>{fechaLarga(pedido.entregaEstimada)}</strong> con {ENVIO_LABEL[pedido.envio].toLowerCase()}.</>}
      </p>

      <div className="tienda-confirmacion__acciones">
        {state.sesion ? (
          <VitrinaBoton tono="coral" onClick={() => ir({ v: "pedido", id: pedido.id })}>
            Seguir mi pedido
          </VitrinaBoton>
        ) : (
          <VitrinaBoton tono="coral" onClick={() => ir({ v: "acceso", modo: "registro", despues: { v: "pedido", id: pedido.id } })}>
            Crear cuenta para seguirlo
          </VitrinaBoton>
        )}
        <VitrinaBoton variant="outline" onClick={() => ir({ v: "inicio" })}>
          Seguir comprando
        </VitrinaBoton>
      </div>

      <div className="tienda-confirmacion__resumen">
        <div className="tienda-lineas tienda-lineas--compactas">
          {pedido.lineas.map((l) => (
            <VitrinaLinea key={l.id} modo="lectura" linea={{ id: l.id, nombre: l.nombre, variante: l.variante, vendedor: l.vendedor, precioUnitario: l.precioUnitario, cantidad: l.cantidad, lamina: { picto: CATEGORIA[l.categoria].picto, matiz: CATEGORIA[l.categoria].matiz } }} />
          ))}
        </div>
        <VitrinaTotales subtotal={pedido.subtotal} descuento={pedido.descuento} descuentoLabel={pedido.cupon ? `Cupón ${pedido.cupon}` : "Descuento"} envio={pedido.costoEnvio === 0 ? "gratis" : pedido.costoEnvio} total={pedido.total} nota={`Pagado con ${pedido.pago.etiqueta}.`} />
      </div>
    </div>
  );
}
