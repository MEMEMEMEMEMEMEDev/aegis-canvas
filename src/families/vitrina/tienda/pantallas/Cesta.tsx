import { useState } from "react";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaEntrada from "../../VitrinaEntrada/VitrinaEntrada";
import VitrinaLinea from "../../VitrinaLinea/VitrinaLinea";
import VitrinaSello from "../../VitrinaSello/VitrinaSello";
import VitrinaTitular from "../../VitrinaTitular/VitrinaTitular";
import VitrinaTotales from "../../VitrinaTotales/VitrinaTotales";
import VitrinaVacio from "../../VitrinaVacio/VitrinaVacio";
import { useAvisos } from "../avisos";
import { CUPONES, VENDEDOR } from "../datos";
import { laminaDe } from "../partes/utiles";
import { useRuta } from "../ruta";
import { ENVIO_GRATIS_DESDE, lineasCesta, lineasGuardadas, totales, useTienda } from "../state";
import type { LineaResuelta } from "../state";
import { clp } from "../formato";

export default function Cesta() {
  const { state, dispatch } = useTienda();
  const { ir } = useRuta();
  const { avisar } = useAvisos();
  const [codigo, setCodigo] = useState("");
  const [errorCupon, setErrorCupon] = useState<string | null>(null);
  const lineas = lineasCesta(state);
  const guardados = lineasGuardadas(state);
  const t = totales(state);

  const aLinea = ({ linea, producto, variante, nombreVariante }: LineaResuelta) => ({
    id: linea.id,
    nombre: producto.nombre,
    variante: nombreVariante,
    vendedor: VENDEDOR[producto.vendedor].nombre,
    precioUnitario: producto.precio,
    cantidad: linea.cantidad,
    lamina: laminaDe(producto, variante?.color),
    max: variante?.stock,
    agotado: (variante?.stock ?? 0) === 0,
  });

  const aplicarCupon = () => {
    const c = CUPONES[codigo.trim().toUpperCase()];
    if (!c) {
      setErrorCupon("Ese cupón no existe o ya venció");
      return;
    }
    dispatch({ type: "cupon", codigo: c.codigo });
    setErrorCupon(null);
    setCodigo("");
    avisar("ok", `Cupón ${c.codigo} aplicado: ${c.porcentaje} % de descuento${c.soloCategoria ? " en ferretería" : ""}`);
  };

  if (lineas.length === 0 && guardados.length === 0) {
    return (
      <>
        <VitrinaTitular tamano="gigante" sobre="Tu compra">
          Cesta
        </VitrinaTitular>
        <VitrinaVacio picto="bolsa" alto="pantalla" titulo="Tu cesta está vacía" texto="Lo que añadas se queda aquí aunque cierres la pestaña. Empieza por las ofertas." accion={{ label: "Ver ofertas", onClick: () => ir({ v: "catalogo", filtros: { soloOferta: true } }) }} secundaria={{ label: "Ir al inicio", onClick: () => ir({ v: "inicio" }) }} />
      </>
    );
  }

  return (
    <>
      <VitrinaTitular tamano="gigante" sobre={`${t.unidades} ${t.unidades === 1 ? "artículo" : "artículos"}`}>
        Cesta
      </VitrinaTitular>

      <div className="tienda-transaccion">
        <div className="tienda-transaccion__principal">
          {t.subtotal > 0 && t.subtotal < ENVIO_GRATIS_DESDE && (
            <p className="tienda-nota">
              Te faltan <strong>{clp(ENVIO_GRATIS_DESDE - t.subtotal)}</strong> para el envío gratis.
            </p>
          )}
          {t.subtotal >= ENVIO_GRATIS_DESDE && (
            <p className="tienda-nota">
              <VitrinaSello tono="ok">Envío gratis</VitrinaSello> Tu pedido supera los {clp(ENVIO_GRATIS_DESDE)}.
            </p>
          )}

          <div className="tienda-lineas">
            {lineas.map((l) => (
              <VitrinaLinea key={l.linea.id} linea={aLinea(l)} onCantidad={(id, n) => dispatch({ type: "cantidad", id, cantidad: n })} onQuitar={(id) => dispatch({ type: "quitar", id })} onGuardar={(id) => dispatch({ type: "guardar", id })} onAbrir={() => ir({ v: "producto", id: l.producto.id })} />
            ))}
          </div>

          {guardados.length > 0 && (
            <section className="tienda-seccion tienda-guardados">
              <VitrinaTitular tamano="seccion" sobre="Para más adelante">
                Guardados ({guardados.length})
              </VitrinaTitular>
              <div className="tienda-lineas">
                {guardados.map((l) => (
                  <VitrinaLinea key={l.linea.id} linea={aLinea(l)} onGuardar={(id) => dispatch({ type: "mover-a-cesta", id })} guardarLabel="Mover a la cesta" onQuitar={(id) => dispatch({ type: "quitar-guardado", id })} onAbrir={() => ir({ v: "producto", id: l.producto.id })} />
                ))}
              </div>
            </section>
          )}
        </div>

        {lineas.length > 0 && (
          <aside className="tienda-transaccion__lateral">
            <VitrinaTotales
              subtotal={t.subtotal}
              descuento={t.descuento}
              descuentoLabel={state.cupon ? `Cupón ${state.cupon.codigo}` : "Descuento"}
              envio={t.envio}
              total={t.total}
              nota="IVA incluido. El envío exacto se calcula con tu dirección."
              cupon={
                state.cupon ? (
                  <div className="tienda-cupon tienda-cupon--aplicado">
                    <VitrinaSello tono="ok">{state.cupon.codigo}</VitrinaSello>
                    <button type="button" className="tienda-enlace" onClick={() => dispatch({ type: "quitar-cupon" })}>
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form
                    className="tienda-cupon"
                    onSubmit={(e) => {
                      e.preventDefault();
                      aplicarCupon();
                    }}
                  >
                    <VitrinaEntrada modo="linea" value={codigo} onChange={(e) => { setCodigo(e.target.value.toUpperCase()); setErrorCupon(null); }} placeholder="Cupón de descuento" aria-label="Cupón de descuento" invalid={Boolean(errorCupon)} />
                    <VitrinaBoton variant="outline" size="sm" type="submit" disabled={!codigo.trim()}>
                      Aplicar
                    </VitrinaBoton>
                    {errorCupon && (
                      <span className="tienda-cupon__error" role="alert">
                        {errorCupon}
                      </span>
                    )}
                  </form>
                )
              }
            />
            <VitrinaBoton tono="bloque" onClick={() => ir({ v: "checkout", paso: "datos" })}>
              Ir a pagar
            </VitrinaBoton>
            <VitrinaBoton variant="ghost" ancho onClick={() => ir({ v: "catalogo" })}>
              Seguir comprando
            </VitrinaBoton>
            <p className="tienda-chica">Prueba los cupones BIENVENIDO10 y FERRETERIA15.</p>
          </aside>
        )}
      </div>
    </>
  );
}
