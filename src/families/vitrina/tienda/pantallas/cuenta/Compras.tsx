import { useState } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaChip, { VitrinaChipFila } from "../../../VitrinaChip/VitrinaChip";
import VitrinaLamina from "../../../VitrinaLamina/VitrinaLamina";
import VitrinaPrecio from "../../../VitrinaPrecio/VitrinaPrecio";
import VitrinaSello from "../../../VitrinaSello/VitrinaSello";
import VitrinaVacio from "../../../VitrinaVacio/VitrinaVacio";
import { espera, useCarga } from "../../api";
import { CATEGORIA, ESTADO_LABEL, ESTADO_TONO } from "../../datos";
import type { Pedido } from "../../datos";
import { fecha, plural } from "../../formato";
import { EsqueletoLineas } from "../../partes/Esqueletos";
import { useRuta } from "../../ruta";
import { useTienda } from "../../state";

type Filtro = "todos" | "curso" | "entregados" | "cancelados";
const FILTROS: Array<[Filtro, string]> = [["todos", "Todos"], ["curso", "En curso"], ["entregados", "Entregados"], ["cancelados", "Cancelados"]];

const pasa = (p: Pedido, f: Filtro) => f === "todos" || (f === "curso" && p.estado !== "entregado" && p.estado !== "cancelado") || (f === "entregados" && p.estado === "entregado") || (f === "cancelados" && p.estado === "cancelado");

export default function Compras() {
  const { state } = useTienda();
  const { ir } = useRuta();
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [anio, setAnio] = useState<number | undefined>(undefined);
  const { cargando } = useCarga(() => espera(), "compras");

  const anios = Array.from(new Set(state.pedidos.map((p) => new Date(p.creadoEn).getFullYear()))).sort((a, b) => b - a);
  const lista = state.pedidos.filter((p) => pasa(p, filtro) && (anio === undefined || new Date(p.creadoEn).getFullYear() === anio));

  if (cargando) return <EsqueletoLineas n={3} />;

  return (
    <div className="tienda-compras">
      <VitrinaChipFila label="Filtrar pedidos">
        {FILTROS.map(([f, label]) => (
          <VitrinaChip key={f} activo={filtro === f} onClick={() => setFiltro(f)} contador={f === "todos" ? state.pedidos.length : state.pedidos.filter((p) => pasa(p, f)).length}>
            {label}
          </VitrinaChip>
        ))}
        {anios.length > 1 &&
          anios.map((a) => (
            <VitrinaChip key={a} activo={anio === a} onClick={() => setAnio(anio === a ? undefined : a)}>
              {a}
            </VitrinaChip>
          ))}
      </VitrinaChipFila>

      {lista.length === 0 ? (
        <VitrinaVacio picto="paquete" titulo={state.pedidos.length ? "Nada con ese filtro" : "Todavía no has comprado"} texto={state.pedidos.length ? "Prueba con otro estado o año." : "Tu primer pedido aparecerá aquí con su seguimiento."} accion={state.pedidos.length ? { label: "Ver todos", onClick: () => { setFiltro("todos"); setAnio(undefined); } } : { label: "Ver ofertas", onClick: () => ir({ v: "catalogo", filtros: { soloOferta: true } }) }} />
      ) : (
        <ul className="tienda-pedidos">
          {lista.map((p) => (
            <li key={p.id} className="tienda-pedido-item">
              <div className="tienda-pedido-item__cab">
                <div>
                  <span className="tienda-pedido-item__numero">{p.numero}</span>
                  <span className="tienda-pedido-item__fecha">{fecha(p.creadoEn)}</span>
                </div>
                <VitrinaSello tono={ESTADO_TONO[p.estado]}>{ESTADO_LABEL[p.estado]}</VitrinaSello>
              </div>
              <div className="tienda-pedido-item__laminas" aria-hidden="true">
                {p.lineas.slice(0, 4).map((l) => (
                  <VitrinaLamina key={l.id} picto={CATEGORIA[l.categoria].picto} matiz={CATEGORIA[l.categoria].matiz} tamano="mini" />
                ))}
              </div>
              <div className="tienda-pedido-item__pie">
                <span className="tienda-pedido-item__resumen">
                  {plural(p.lineas.reduce((n, l) => n + l.cantidad, 0), "artículo", "artículos")} · <VitrinaPrecio valor={p.total} tamano="sm" />
                </span>
                <VitrinaBoton size="sm" variant="outline" onClick={() => ir({ v: "pedido", id: p.id })}>
                  Ver detalle
                </VitrinaBoton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
