import { useEffect, useState } from "react";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCajon from "../../VitrinaCajon/VitrinaCajon";
import VitrinaCarga from "../../VitrinaCarga/VitrinaCarga";
import VitrinaChip, { VitrinaChipFila } from "../../VitrinaChip/VitrinaChip";
import { VitrinaSelect } from "../../VitrinaEntrada/VitrinaEntrada";
import VitrinaPicto from "../../VitrinaPicto/VitrinaPicto";
import VitrinaTitular from "../../VitrinaTitular/VitrinaTitular";
import VitrinaVacio from "../../VitrinaVacio/VitrinaVacio";
import { buscar, espera, useCarga } from "../api";
import { CATEGORIA, VENDEDOR } from "../datos";
import type { Filtros, Orden } from "../datos";
import { EsqueletoCatalogo } from "../partes/Esqueletos";
import TarjetaProducto from "../partes/TarjetaProducto";
import { useRuta } from "../ruta";
import type { Ruta } from "../ruta";
import CatalogoFiltros, { FILTROS_VACIOS, hayFiltros } from "./CatalogoFiltros";

type RutaCatalogo = Extract<Ruta, { v: "catalogo" }>;

const ORDEN_LABEL: Record<Orden, string> = { relevancia: "Relevancia", "precio-asc": "Precio: menor a mayor", "precio-desc": "Precio: mayor a menor", valoracion: "Mejor valorados", nuevo: "Novedades" };
const PAGINA = 12;

export default function Catalogo({ ruta }: { ruta: RutaCatalogo }) {
  const { ir, reemplazar } = useRuta();
  const filtros: Filtros = { ...FILTROS_VACIOS, ...(ruta.filtros ?? {}), categorias: [...(ruta.filtros?.categorias ?? []), ...(ruta.categoria ? [ruta.categoria] : [])].filter((c, i, a) => a.indexOf(c) === i) };
  const orden = ruta.orden ?? "relevancia";
  const [visibles, setVisibles] = useState(PAGINA);
  const [cajon, setCajon] = useState(false);
  const [masCargando, setMasCargando] = useState(false);
  const clave = JSON.stringify({ q: ruta.q, filtros, orden });

  const { datos, cargando } = useCarga(async () => {
    await espera();
    return buscar({ q: ruta.q, filtros, orden });
  }, clave);

  useEffect(() => setVisibles(PAGINA), [clave]);

  const cambia = (parcial: Partial<RutaCatalogo>) => reemplazar({ ...ruta, ...parcial });
  const ponFiltros = (f: Filtros) => cambia({ categoria: undefined, filtros: f });
  const limpiar = () => reemplazar({ v: "catalogo", q: ruta.q, orden });

  const titulo = ruta.q ? `Resultados para «${ruta.q}»` : ruta.categoria && filtros.categorias.length === 1 ? CATEGORIA[ruta.categoria].nombre : filtros.soloOferta && !hayFiltrosMenos(filtros) ? "Ofertas" : "Todos los productos";
  const lista = datos ?? [];

  return (
    <>
      {cargando && <VitrinaCarga modo="barra" texto="Buscando" />}

      <div className="tienda-catalogo__cabecera">
        <VitrinaTitular tamano="pagina" sobre={datos ? `${lista.length} ${lista.length === 1 ? "producto" : "productos"}` : "Buscando…"}>
          {titulo}
        </VitrinaTitular>
        <div className="tienda-catalogo__orden">
          <VitrinaBoton variant="outline" className="tienda-catalogo__filtros-boton" icono={<VitrinaPicto name="filtro" />} onClick={() => setCajon(true)}>
            Filtros{hayFiltros(filtros) ? ` (${filtros.categorias.length + filtros.vendedores.length + Number(Boolean(filtros.precioMax)) + Number(filtros.soloOferta) + Number(filtros.envioGratis) + Number(Boolean(filtros.valoracionMin))})` : ""}
          </VitrinaBoton>
          <VitrinaSelect aria-label="Ordenar por" value={orden} onChange={(e) => cambia({ orden: e.target.value as Orden })} icono={<VitrinaPicto name="orden" />}>
            {(Object.keys(ORDEN_LABEL) as Orden[]).map((o) => (
              <option key={o} value={o}>
                {ORDEN_LABEL[o]}
              </option>
            ))}
          </VitrinaSelect>
        </div>
      </div>

      {(ruta.q || hayFiltros(filtros)) && (
        <VitrinaChipFila label="Filtros activos">
          {ruta.q && (
            <VitrinaChip icono={<VitrinaPicto name="lupa" />} onQuitar={() => cambia({ q: undefined })}>
              {ruta.q}
            </VitrinaChip>
          )}
          {filtros.categorias.map((c) => (
            <VitrinaChip key={c} onQuitar={() => ponFiltros({ ...filtros, categorias: filtros.categorias.filter((x) => x !== c) })}>
              {CATEGORIA[c].nombre}
            </VitrinaChip>
          ))}
          {filtros.vendedores.map((v) => (
            <VitrinaChip key={v} onQuitar={() => ponFiltros({ ...filtros, vendedores: filtros.vendedores.filter((x) => x !== v) })}>
              {VENDEDOR[v].nombre}
            </VitrinaChip>
          ))}
          {filtros.precioMax !== undefined && <VitrinaChip onQuitar={() => ponFiltros({ ...filtros, precioMax: undefined })}>Hasta ${filtros.precioMax.toLocaleString("es-CL")}</VitrinaChip>}
          {filtros.valoracionMin !== undefined && <VitrinaChip onQuitar={() => ponFiltros({ ...filtros, valoracionMin: undefined })}>{filtros.valoracionMin}★ o más</VitrinaChip>}
          {filtros.soloOferta && <VitrinaChip onQuitar={() => ponFiltros({ ...filtros, soloOferta: false })}>Solo ofertas</VitrinaChip>}
          {filtros.envioGratis && <VitrinaChip onQuitar={() => ponFiltros({ ...filtros, envioGratis: false })}>Envío gratis</VitrinaChip>}
          {hayFiltros(filtros) && (
            <VitrinaChip onClick={limpiar} icono={<VitrinaPicto name="cerrar" />}>
              Quitar todo
            </VitrinaChip>
          )}
        </VitrinaChipFila>
      )}

      <div className="tienda-catalogo">
        <aside className="tienda-catalogo__lateral" aria-label="Filtros">
          <CatalogoFiltros filtros={filtros} onChange={ponFiltros} onLimpiar={limpiar} />
        </aside>

        <div className="tienda-catalogo__resultados">
          {cargando || !datos ? (
            <EsqueletoCatalogo />
          ) : lista.length === 0 ? (
            <VitrinaVacio picto="lupa" titulo={ruta.q ? `Nada para «${ruta.q}»` : "Nada con esos filtros"} texto="Prueba con menos palabras, otra ortografía o quita algún filtro." accion={{ label: "Quitar filtros", onClick: () => ir({ v: "catalogo" }) }} secundaria={{ label: "Ver ofertas", onClick: () => ir({ v: "catalogo", filtros: { soloOferta: true } }) }} />
          ) : (
            <>
              <h2 className="tienda-sr">Resultados</h2>
              <div className="tienda-rejilla">
                {lista.slice(0, visibles).map((p, i) => (
                  <TarjetaProducto key={p.id} producto={p} indice={i % PAGINA} />
                ))}
              </div>
              {visibles < lista.length && (
                <div className="tienda-catalogo__mas">
                  <span className="tienda-catalogo__cuenta">
                    {Math.min(visibles, lista.length)} de {lista.length}
                  </span>
                  <VitrinaBoton
                    variant="outline"
                    loading={masCargando}
                    onClick={async () => {
                      setMasCargando(true);
                      await espera();
                      setVisibles((v) => v + PAGINA);
                      setMasCargando(false);
                    }}
                  >
                    Cargar más
                  </VitrinaBoton>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <VitrinaCajon abierto={cajon} onCerrar={() => setCajon(false)} titulo="Filtros" lado="abajo" id="tienda-filtros" pie={<VitrinaBoton tono="bloque" onClick={() => setCajon(false)}>{datos ? `Ver ${lista.length} ${lista.length === 1 ? "producto" : "productos"}` : "Ver resultados"}</VitrinaBoton>}>
        <CatalogoFiltros filtros={filtros} onChange={ponFiltros} onLimpiar={limpiar} />
      </VitrinaCajon>
    </>
  );
}

const hayFiltrosMenos = (f: Filtros) => f.categorias.length > 0 || f.vendedores.length > 0 || f.precioMax !== undefined || f.envioGratis || f.valoracionMin !== undefined;
