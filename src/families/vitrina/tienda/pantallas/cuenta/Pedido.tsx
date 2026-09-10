import { useState } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaCronologia from "../../../VitrinaCronologia/VitrinaCronologia";
import VitrinaDialogo from "../../../VitrinaDialogo/VitrinaDialogo";
import VitrinaLinea from "../../../VitrinaLinea/VitrinaLinea";
import VitrinaPicto from "../../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../../VitrinaSello/VitrinaSello";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import VitrinaTotales from "../../../VitrinaTotales/VitrinaTotales";
import VitrinaVacio from "../../../VitrinaVacio/VitrinaVacio";
import { espera, useCarga } from "../../api";
import { useAvisos } from "../../avisos";
import { CAMINO, CATEGORIA, ESTADO_LABEL, ESTADO_TONO, cancelable } from "../../datos";
import { fechaHora, fechaLarga } from "../../formato";
import { EsqueletoPedido } from "../../partes/Esqueletos";
import { useRuta } from "../../ruta";
import { ENVIO_LABEL, useTienda } from "../../state";
import { useUi } from "../../ui";

export default function Pedido({ id }: { id: string }) {
  const { state, dispatch } = useTienda();
  const { ir } = useRuta();
  const { avisar } = useAvisos();
  const { abrirCesta } = useUi();
  const [dialogo, setDialogo] = useState(false);
  const { cargando } = useCarga(() => espera(), `pedido-${id}`);
  const p = state.pedidos.find((x) => x.id === id);

  if (cargando) return <EsqueletoPedido />;
  if (!p) return <VitrinaVacio tono="404" alto="pantalla" titulo="No encontramos ese pedido" accion={{ label: "Ver mis compras", onClick: () => ir({ v: "cuenta", seccion: "compras" }) }} />;

  const hechos = new Set(p.timeline.map((h) => h.estado));
  const camino = p.estado === "cancelado" ? p.timeline.map((h) => h.estado) : CAMINO;
  const hitos = camino.map((e) => {
    const h = p.timeline.find((x) => x.estado === e);
    const esActual = e === p.estado;
    return { id: e, label: ESTADO_LABEL[e], fecha: h ? fechaHora(h.fecha) : undefined, nota: h?.nota, estado: esActual ? ("actual" as const) : hechos.has(e) ? ("hecho" as const) : ("pendiente" as const) };
  });
  const d = p.direccion;

  return (
    <div className="tienda-pedido">
      <button type="button" className="tienda-cuenta__volver" onClick={() => ir({ v: "cuenta", seccion: "compras" })}>
        <VitrinaPicto name="chevron-izq" size={18} /> Mis compras
      </button>
      <div className="tienda-pedido__cab">
        <VitrinaTitular tamano="pagina" sobre={`Pedido del ${fechaLarga(p.creadoEn)}`}>
          {p.numero}
        </VitrinaTitular>
        <VitrinaSello tono={ESTADO_TONO[p.estado]}>{ESTADO_LABEL[p.estado]}</VitrinaSello>
      </div>

      <div className="tienda-pedido__grid">
        <section className="tienda-pedido__bloque">
          <h2 className="tienda-lateral__titulo">Seguimiento</h2>
          <VitrinaCronologia hitos={hitos} cancelado={p.estado === "cancelado"} />
          {p.estado !== "entregado" && p.estado !== "cancelado" && (
            <p className="tienda-chica">
              Entrega estimada: <strong>{fechaLarga(p.entregaEstimada)}</strong>
            </p>
          )}
          <div className="tienda-pedido__acciones">
            {p.estado !== "entregado" && p.estado !== "cancelado" && (
              <VitrinaBoton size="sm" variant="outline" icono={<VitrinaPicto name="rayo" />} onClick={() => { dispatch({ type: "avanzar-pedido", id: p.id }); avisar("neutro", "Demo: el pedido avanzó un paso"); }}>
                Simular avance
              </VitrinaBoton>
            )}
            {cancelable(p.estado) && (
              <VitrinaBoton size="sm" variant="ghost" onClick={() => setDialogo(true)}>
                Cancelar pedido
              </VitrinaBoton>
            )}
          </div>
        </section>

        <section className="tienda-pedido__bloque">
          <h2 className="tienda-lateral__titulo">Artículos</h2>
          <div className="tienda-lineas">
            {p.lineas.map((l) => (
              <VitrinaLinea key={l.id} modo="lectura" linea={{ id: l.id, nombre: l.nombre, variante: l.variante, vendedor: l.vendedor, precioUnitario: l.precioUnitario, cantidad: l.cantidad, lamina: { picto: CATEGORIA[l.categoria].picto, matiz: CATEGORIA[l.categoria].matiz } }} onAbrir={() => ir({ v: "producto", id: l.productoId })} />
            ))}
          </div>
          <VitrinaTotales subtotal={p.subtotal} descuento={p.descuento} descuentoLabel={p.cupon ? `Cupón ${p.cupon}` : "Descuento"} envio={p.costoEnvio === 0 ? "gratis" : p.costoEnvio} total={p.total} />

          <dl className="tienda-datos">
            <div>
              <dt>Entrega</dt>
              <dd>
                {d.nombre}
                <br />
                {d.calle} {d.numero}
                {d.depto ? `, ${d.depto}` : ""}, {d.comuna}
                <br />
                <span className="tienda-chica">{ENVIO_LABEL[p.envio]}</span>
              </dd>
            </div>
            <div>
              <dt>Pago</dt>
              <dd>{p.pago.etiqueta}</dd>
            </div>
          </dl>

          <div className="tienda-pedido__acciones">
            <VitrinaBoton tono="coral" size="sm" icono={<VitrinaPicto name="carrito" />} onClick={() => { dispatch({ type: "repetir-pedido", id: p.id }); avisar("ok", "Artículos añadidos a la cesta", { label: "Ver cesta", onClick: abrirCesta }); }}>
              Comprar de nuevo
            </VitrinaBoton>
            <VitrinaBoton size="sm" variant="outline" onClick={() => avisar("neutro", "La boleta es decorativa en esta demo")}>
              Descargar boleta
            </VitrinaBoton>
          </div>
        </section>
      </div>

      <VitrinaDialogo abierto={dialogo} id="tienda-cancelar" titulo={`¿Cancelar el pedido ${p.numero}?`} detalle="Se devolverá el pago al mismo medio en 3 a 5 días hábiles. Esta acción no se puede deshacer." confirmar="Sí, cancelar" cancelar="Volver" peligro onConfirmar={() => { dispatch({ type: "cancelar-pedido", id: p.id }); setDialogo(false); avisar("ok", "Pedido cancelado"); }} onCancelar={() => setDialogo(false)} />
    </div>
  );
}
