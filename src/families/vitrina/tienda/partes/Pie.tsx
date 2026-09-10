import VitrinaPicto from "../../VitrinaPicto/VitrinaPicto";
import VitrinaPie from "../../VitrinaPie/VitrinaPie";
import { useAvisos } from "../avisos";
import { useRuta } from "../ruta";
import { MARCA } from "./Cabecera";

/** El pie cableado: los enlaces navegan, el newsletter avisa. */
export default function Pie() {
  const { ir } = useRuta();
  const { avisar } = useAvisos();

  return (
    <VitrinaPie
      marca={MARCA}
      sobre="Un carrito, seis tiendas"
      titular="Tu casa, con todo"
      columnas={[
        { titulo: "Tienda", enlaces: [{ id: "novedades", label: "Novedades" }, { id: "ofertas", label: "Ofertas" }, { id: "categorias", label: "Categorías" }] },
        { titulo: "Tu cuenta", enlaces: [{ id: "compras", label: "Mis compras" }, { id: "favoritos", label: "Favoritos" }, { id: "direcciones", label: "Direcciones" }] },
        { titulo: "Ayuda", enlaces: [{ id: "envios", label: "Envíos y plazos" }, { id: "devoluciones", label: "Devoluciones" }, { id: "contacto", label: "Contacto" }] },
      ]}
      onIr={(id) => {
        if (id === "novedades") ir({ v: "catalogo", orden: "nuevo" });
        else if (id === "ofertas") ir({ v: "catalogo", filtros: { soloOferta: true } });
        else if (id === "categorias") ir({ v: "catalogo" });
        else if (id === "compras") ir({ v: "cuenta", seccion: "compras" });
        else if (id === "favoritos") ir({ v: "cuenta", seccion: "favoritos" });
        else if (id === "direcciones") ir({ v: "cuenta", seccion: "direcciones" });
        else avisar("neutro", "Esta sección es decorativa en la demo");
      }}
      onSuscribir={() => avisar("ok", "Listo: te escribimos poco y bien")}
      legal="© 2026 Vitrina · Demo de portafolio. Precios en pesos chilenos, IVA incluido. Ningún pedido es real."
      extras={
        <>
          <VitrinaPicto name="tarjeta" />
          <VitrinaPicto name="escudo" />
        </>
      }
    />
  );
}
