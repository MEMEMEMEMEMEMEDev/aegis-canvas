import VitrinaPestanas from "../../VitrinaPestanas/VitrinaPestanas";
import { useRuta } from "../ruta";
import type { Ruta } from "../ruta";
import { cantidadCesta, useTienda } from "../state";

function pestanaDe(r: Ruta): string {
  switch (r.v) {
    case "inicio":
      return "inicio";
    case "catalogo":
      return "buscar";
    case "cesta":
    case "checkout":
    case "confirmacion":
      return "cesta";
    case "cuenta":
      return r.seccion === "favoritos" ? "favoritos" : "cuenta";
    case "pedido":
    case "acceso":
      return "cuenta";
    default:
      return "";
  }
}

/** La barra de abajo del teléfono, cableada a la ruta. */
export default function Pestanas() {
  const { ruta, ir } = useRuta();
  const { state } = useTienda();

  return (
    <VitrinaPestanas
      label="Secciones de la tienda"
      value={pestanaDe(ruta)}
      onChange={(id) => {
        if (id === "inicio") ir({ v: "inicio" });
        else if (id === "buscar") ir({ v: "catalogo" });
        else if (id === "cesta") ir({ v: "cesta" });
        else if (id === "favoritos") ir({ v: "cuenta", seccion: "favoritos" });
        else ir({ v: "cuenta", seccion: "resumen" });
      }}
      items={[
        { id: "inicio", label: "Inicio", icono: "casa" },
        { id: "buscar", label: "Buscar", icono: "lupa" },
        { id: "cesta", label: "Cesta", icono: "carrito", badge: cantidadCesta(state) },
        { id: "favoritos", label: "Favoritos", icono: "corazon" },
        { id: "cuenta", label: "Cuenta", icono: "usuario" },
      ]}
    />
  );
}
