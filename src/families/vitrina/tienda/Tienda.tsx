// =============================================================================
// La tienda: el orquestador. Providers (estado, ruta, avisos, ui), el marco
// con cabecera/pestañas/pie, y el switch de pantallas por ruta. Las
// guardias se evalúan EN RENDER con el estado fresco (no al navegar): así,
// al entrar desde el checkout, la misma ruta pasa de "acceso" a "checkout"
// sola, sin carreras entre el dispatch y la navegación.
// =============================================================================

import { useEffect, useMemo, useReducer } from "react";
import VitrinaMarco from "../VitrinaMarco/VitrinaMarco";
import { fijarLatencia } from "./api";
import { AvisosProvider } from "./avisos";
import Cabecera from "./partes/Cabecera";
import CajonCesta from "./partes/CajonCesta";
import Pestanas from "./partes/Pestanas";
import Pie from "./partes/Pie";
import Acceso from "./pantallas/Acceso";
import Catalogo from "./pantallas/Catalogo";
import Cesta from "./pantallas/Cesta";
import Checkout from "./pantallas/checkout/Checkout";
import Confirmacion from "./pantallas/Confirmacion";
import Cuenta from "./pantallas/cuenta/Cuenta";
import Pedido from "./pantallas/cuenta/Pedido";
import Inicio from "./pantallas/Inicio";
import NoEncontrado from "./pantallas/NoEncontrado";
import Producto from "./pantallas/Producto";
import { borrar, cargar, guardar } from "./persistence";
import { reducer } from "./reducer";
import { RutaProvider, resolver, rutaKey, usePila } from "./ruta";
import type { Ruta } from "./ruta";
import { ESTADO_INICIAL, TiendaProvider } from "./state";
import type { EstadoTienda } from "./state";
import { UiProvider } from "./ui";
import "./styles/tienda.scss";

export interface TiendaProps {
  rutaInicial?: Ruta;
  /** Guardar en localStorage (default). Las stories por pantalla lo apagan. */
  persistir?: boolean;
  /** ms de latencia simulada base (default 320; 0 = sin esqueletos; Infinity = carga eterna). */
  latencia?: number;
  /** Estado de partida cuando no se persiste (sesión abierta, cesta llena…). */
  semilla?: Partial<EstadoTienda>;
  /** El anfitrión (Astro) puede sincronizar la URL si quiere. */
  onRuta?: (r: Ruta) => void;
}

const identidad = (r: Ruta) => r;

function Pantalla({ ruta }: { ruta: Ruta }) {
  switch (ruta.v) {
    case "inicio":
      return <Inicio />;
    case "catalogo":
      return <Catalogo ruta={ruta} />;
    case "producto":
      return <Producto id={ruta.id} />;
    case "cesta":
      return <Cesta />;
    case "checkout":
      return <Checkout paso={ruta.paso} />;
    case "confirmacion":
      return <Confirmacion pedidoId={ruta.pedidoId} />;
    case "acceso":
      return <Acceso modo={ruta.modo} despues={ruta.despues} />;
    case "cuenta":
      return <Cuenta seccion={ruta.seccion} />;
    case "pedido":
      return <Pedido id={ruta.id} />;
    case "no-encontrado":
      return <NoEncontrado intento={ruta.intento} />;
    default: {
      const _agotado: never = ruta;
      return _agotado;
    }
  }
}

const TRANSACCION = new Set<Ruta["v"]>(["cesta", "checkout", "confirmacion", "acceso"]);
const ESTRECHO = new Set<Ruta["v"]>(["acceso", "confirmacion"]);

/**
 * La tienda completa: montable como isla React. Sin router, sin `window`
 * en render, todo mock en memoria + localStorage.
 */
export default function Tienda({ rutaInicial, persistir = true, latencia = 320, semilla, onRuta }: TiendaProps) {
  useMemo(() => fijarLatencia(latencia), [latencia]);
  const [state, dispatch] = useReducer(reducer, undefined, () => (persistir ? cargar() : { ...ESTADO_INICIAL, ...(semilla ?? {}) }));
  const pila = usePila(rutaInicial ?? { v: "inicio" }, identidad, onRuta);

  useEffect(() => {
    if (persistir) guardar(state);
  }, [state, persistir]);

  // La guardia, con el estado de este render.
  const ruta = resolver(pila.ruta, state);
  const key = rutaKey(ruta);
  const api = useMemo(() => ({ ...pila, ruta }), [pila, ruta]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [key]);

  const modo = TRANSACCION.has(ruta.v) ? "transaccion" : "navegar";

  return (
    <TiendaProvider value={{ state, dispatch }}>
      <RutaProvider value={api}>
        <UiProvider>
          <AvisosProvider>
            <VitrinaMarco modo={modo} ancho={ESTRECHO.has(ruta.v) ? "estrecho" : "normal"} cabecera={<Cabecera />} pestanas={<Pestanas />} pie={ruta.v === "checkout" ? undefined : <Pie />} className="tienda">
              <main key={key} className="tienda-pantalla vitrina-entra">
                <Pantalla ruta={ruta} />
              </main>
            </VitrinaMarco>
            <CajonCesta />
          </AvisosProvider>
        </UiProvider>
      </RutaProvider>
    </TiendaProvider>
  );
}

export { borrar as borrarTienda };
