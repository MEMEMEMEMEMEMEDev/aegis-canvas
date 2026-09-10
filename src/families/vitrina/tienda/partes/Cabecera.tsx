import { useEffect, useState } from "react";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCabecera from "../../VitrinaCabecera/VitrinaCabecera";
import VitrinaCajon from "../../VitrinaCajon/VitrinaCajon";
import VitrinaLoseta from "../../VitrinaLoseta/VitrinaLoseta";
import VitrinaPicto from "../../VitrinaPicto/VitrinaPicto";
import { CATEGORIA, CATEGORIAS } from "../datos";
import type { CategoriaId } from "../datos";
import { useRuta } from "../ruta";
import { cantidadCesta, useTienda } from "../state";
import { useUi } from "../ui";

const PROMO = ["Envío gratis en compras sobre $39.990", "Venta flash: hasta 70 % de descuento, solo hoy", "30 días para devolver, sin preguntas"];
const ENLACES = ["tecnologia", "hogar", "ferreteria", "moda", "deporte"] as const;

export const MARCA = (
  <>
    vitrina<em>.</em>
  </>
);

/** La cabecera cableada a la ruta, la cesta y el menú del teléfono. */
export default function Cabecera() {
  const { state } = useTienda();
  const { ruta, ir } = useRuta();
  const ui = useUi();
  const [q, setQ] = useState(ruta.v === "catalogo" ? (ruta.q ?? "") : "");

  useEffect(() => {
    if (ruta.v === "catalogo") setQ(ruta.q ?? "");
  }, [ruta]);

  return (
    <>
      <VitrinaCabecera
        marca={MARCA}
        promo={PROMO}
        enlaces={[...ENLACES.map((id) => ({ id, label: CATEGORIA[id].nombre.split(" ")[0] ?? id })), { id: "ofertas", label: "Ofertas" }]}
        busqueda={{ valor: q, onCambio: setQ, onBuscar: (v) => ir({ v: "catalogo", q: v || undefined }) }}
        favoritos={state.favoritos.length}
        cesta={cantidadCesta(state)}
        usuario={state.sesion?.nombre ?? null}
        onIr={(d) => {
          if (d === "inicio") ir({ v: "inicio" });
          else if (d === "favoritos") ir({ v: "cuenta", seccion: "favoritos" });
          else if (d === "cuenta") ir({ v: "cuenta", seccion: "resumen" });
          else if (d === "cesta") ui.abrirCesta();
          else if (d === "menu") ui.abrirMenu();
          else if (d === "ofertas") ir({ v: "catalogo", filtros: { soloOferta: true } });
          else if (d in CATEGORIA) ir({ v: "catalogo", categoria: d as CategoriaId });
        }}
      />

      <VitrinaCajon abierto={ui.menuAbierto} onCerrar={ui.cerrarMenu} titulo="Menú" lado="abajo" id="tienda-menu">
        <div className="tienda-menu">
          <div className="tienda-menu__losetas">
            {CATEGORIAS.map((c) => (
              <VitrinaLoseta
                key={c.id}
                nombre={c.nombre}
                picto={c.picto}
                matiz={c.matiz}
                compacta
                onClick={() => {
                  ui.cerrarMenu();
                  ir({ v: "catalogo", categoria: c.id });
                }}
              />
            ))}
          </div>
          <div className="tienda-menu__acciones">
            <VitrinaBoton tono="coral" ancho icono={<VitrinaPicto name="rayo" />} onClick={() => { ui.cerrarMenu(); ir({ v: "catalogo", filtros: { soloOferta: true } }); }}>
              Ver ofertas
            </VitrinaBoton>
            <VitrinaBoton variant="outline" ancho icono={<VitrinaPicto name="usuario" />} onClick={() => { ui.cerrarMenu(); ir({ v: "cuenta", seccion: "resumen" }); }}>
              {state.sesion ? `Hola, ${state.sesion.nombre}` : "Entrar o crear cuenta"}
            </VitrinaBoton>
          </div>
        </div>
      </VitrinaCajon>
    </>
  );
}
