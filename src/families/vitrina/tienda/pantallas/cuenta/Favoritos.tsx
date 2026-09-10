import VitrinaVacio from "../../../VitrinaVacio/VitrinaVacio";
import { PRODUCTO } from "../../datos";
import TarjetaProducto from "../../partes/TarjetaProducto";
import { useRuta } from "../../ruta";
import { useTienda } from "../../state";

export default function Favoritos() {
  const { state } = useTienda();
  const { ir } = useRuta();
  const lista = state.favoritos.map((id) => PRODUCTO[id]).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (lista.length === 0) {
    return <VitrinaVacio picto="corazon" titulo="Todavía no guardas nada" texto="Toca el corazón de cualquier producto y aparece aquí." accion={{ label: "Ver novedades", onClick: () => ir({ v: "catalogo", orden: "nuevo" }) }} />;
  }

  return (
    <div className="tienda-rejilla">
      <h2 className="tienda-sr">Productos guardados</h2>
      {lista.map((p, i) => (
        <TarjetaProducto key={p.id} producto={p} indice={i} />
      ))}
    </div>
  );
}
