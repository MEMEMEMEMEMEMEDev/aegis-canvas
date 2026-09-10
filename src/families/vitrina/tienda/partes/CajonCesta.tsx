import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCajon from "../../VitrinaCajon/VitrinaCajon";
import VitrinaLinea from "../../VitrinaLinea/VitrinaLinea";
import VitrinaPrecio from "../../VitrinaPrecio/VitrinaPrecio";
import VitrinaVacio from "../../VitrinaVacio/VitrinaVacio";
import { VENDEDOR } from "../datos";
import { useRuta } from "../ruta";
import { ENVIO_GRATIS_DESDE, lineasCesta, totales, useTienda } from "../state";
import { clp } from "../formato";
import { useUi } from "../ui";
import { laminaDe } from "./utiles";

/** El cajón de la cesta: lo que se abre al añadir algo o al tocar el carrito. */
export default function CajonCesta() {
  const { state, dispatch } = useTienda();
  const { ir } = useRuta();
  const ui = useUi();
  const lineas = lineasCesta(state);
  const t = totales(state);
  const falta = ENVIO_GRATIS_DESDE - t.subtotal;

  const vete = (a: () => void) => {
    ui.cerrarCesta();
    a();
  };

  return (
    <VitrinaCajon
      abierto={ui.cestaAbierta}
      onCerrar={ui.cerrarCesta}
      titulo={`Tu cesta${t.unidades ? ` (${t.unidades})` : ""}`}
      id="tienda-cajon-cesta"
      pie={
        lineas.length > 0 ? (
          <div className="tienda-cajon-cesta__pie">
            <div className="tienda-cajon-cesta__total">
              <span>Subtotal</span>
              <VitrinaPrecio valor={t.subtotal} tamano="lg" />
            </div>
            <VitrinaBoton tono="bloque" onClick={() => vete(() => ir({ v: "checkout", paso: "datos" }))}>
              Ir a pagar
            </VitrinaBoton>
            <VitrinaBoton variant="ghost" ancho onClick={() => vete(() => ir({ v: "cesta" }))}>
              Ver la cesta completa
            </VitrinaBoton>
          </div>
        ) : undefined
      }
    >
      {lineas.length === 0 ? (
        <VitrinaVacio picto="bolsa" titulo="Tu cesta está vacía" texto="Lo que añadas se queda aquí aunque cierres la pestaña." accion={{ label: "Ver novedades", onClick: () => vete(() => ir({ v: "catalogo", orden: "nuevo" })) }} />
      ) : (
        <>
          {falta > 0 && (
            <p className="tienda-cajon-cesta__nota">
              Te faltan <strong>{clp(falta)}</strong> para el envío gratis.
            </p>
          )}
          {lineas.map(({ linea, producto, variante, nombreVariante }) => (
            <VitrinaLinea
              key={linea.id}
              linea={{ id: linea.id, nombre: producto.nombre, variante: nombreVariante, vendedor: VENDEDOR[producto.vendedor].nombre, precioUnitario: producto.precio, cantidad: linea.cantidad, lamina: laminaDe(producto, variante?.color), max: variante?.stock, agotado: (variante?.stock ?? 0) === 0 }}
              onCantidad={(id, n) => dispatch({ type: "cantidad", id, cantidad: n })}
              onQuitar={(id) => dispatch({ type: "quitar", id })}
              onAbrir={() => vete(() => ir({ v: "producto", id: producto.id }))}
            />
          ))}
        </>
      )}
    </VitrinaCajon>
  );
}
