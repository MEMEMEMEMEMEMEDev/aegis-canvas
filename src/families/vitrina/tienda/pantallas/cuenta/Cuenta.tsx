import VitrinaPicto from "../../../VitrinaPicto/VitrinaPicto";
import type { PictoUiName } from "../../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../../VitrinaSello/VitrinaSello";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import { ESTADO_LABEL, ESTADO_TONO } from "../../datos";
import { hace } from "../../formato";
import { useRuta } from "../../ruta";
import type { SeccionCuenta } from "../../ruta";
import { useTienda } from "../../state";
import Compras from "./Compras";
import Direcciones from "./Direcciones";
import Favoritos from "./Favoritos";
import Pagos from "./Pagos";
import Perfil from "./Perfil";
import Preferencias from "./Preferencias";

export const SECCIONES: Array<{ id: SeccionCuenta; label: string; icono: PictoUiName; texto: string }> = [
  { id: "resumen", label: "Resumen", icono: "usuario", texto: "Lo último de tu cuenta" },
  { id: "compras", label: "Mis compras", icono: "paquete", texto: "Pedidos y seguimiento" },
  { id: "favoritos", label: "Favoritos", icono: "corazon", texto: "Lo que guardaste" },
  { id: "perfil", label: "Mis datos", icono: "editar", texto: "Nombre, correo, teléfono" },
  { id: "direcciones", label: "Direcciones", icono: "ubicacion", texto: "Dónde te llegan las cosas" },
  { id: "pagos", label: "Medios de pago", icono: "tarjeta", texto: "Tarjetas guardadas" },
  { id: "preferencias", label: "Preferencias", icono: "ajustes", texto: "Avisos, tema y sesión" },
];

function Resumen() {
  const { state } = useTienda();
  const { ir } = useRuta();
  const ultimo = state.pedidos[0];
  const enCurso = state.pedidos.filter((p) => p.estado !== "entregado" && p.estado !== "cancelado").length;

  return (
    <div className="tienda-resumen">
      <VitrinaTitular tamano="pagina" sobre={`Cliente desde ${new Date(state.sesion?.desde ?? Date.now()).getFullYear()}`}>
        Hola, {state.sesion?.nombre}
      </VitrinaTitular>

      <div className="tienda-resumen__cifras">
        <button type="button" className="tienda-cifra" onClick={() => ir({ v: "cuenta", seccion: "compras" })}>
          <span className="tienda-cifra__num">{state.pedidos.length}</span>
          <span className="tienda-cifra__label">pedidos</span>
        </button>
        <button type="button" className="tienda-cifra" onClick={() => ir({ v: "cuenta", seccion: "compras" })}>
          <span className="tienda-cifra__num">{enCurso}</span>
          <span className="tienda-cifra__label">en curso</span>
        </button>
        <button type="button" className="tienda-cifra" onClick={() => ir({ v: "cuenta", seccion: "favoritos" })}>
          <span className="tienda-cifra__num">{state.favoritos.length}</span>
          <span className="tienda-cifra__label">favoritos</span>
        </button>
      </div>

      {ultimo && (
        <button type="button" className="tienda-card tienda-card--ultimo" onClick={() => ir({ v: "pedido", id: ultimo.id })}>
          <span className="tienda-card__sobre">Último pedido · {hace(ultimo.creadoEn)}</span>
          <span className="tienda-card__titulo">{ultimo.numero}</span>
          <span className="tienda-card__texto">
            {ultimo.lineas.map((l) => l.nombre).join(", ")}
          </span>
          <span className="tienda-card__pie">
            <VitrinaSello tono={ESTADO_TONO[ultimo.estado]} pequeno>
              {ESTADO_LABEL[ultimo.estado]}
            </VitrinaSello>
            <VitrinaPicto name="flecha-der" size={18} />
          </span>
        </button>
      )}

      <div className="tienda-resumen__rejilla">
        {SECCIONES.filter((s) => s.id !== "resumen").map((s) => (
          <button key={s.id} type="button" className="tienda-card" onClick={() => ir({ v: "cuenta", seccion: s.id })}>
            <span className="tienda-card__picto">
              <VitrinaPicto name={s.icono} />
            </span>
            <span className="tienda-card__titulo">{s.label}</span>
            <span className="tienda-card__texto">{s.texto}</span>
            <VitrinaPicto name="chevron-der" size={18} className="tienda-card__flecha" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Cuenta({ seccion }: { seccion: SeccionCuenta }) {
  const { ir } = useRuta();
  const actual = SECCIONES.find((s) => s.id === seccion) ?? SECCIONES[0]!;

  return (
    <div className={`tienda-cuenta${seccion === "resumen" ? " tienda-cuenta--resumen" : ""}`}>
      <nav className="tienda-cuenta__nav" aria-label="Tu cuenta">
        {SECCIONES.map((s) => (
          <button key={s.id} type="button" className={`tienda-cuenta__item${s.id === seccion ? " is-activo" : ""}`} aria-current={s.id === seccion ? "page" : undefined} onClick={() => ir({ v: "cuenta", seccion: s.id })}>
            <VitrinaPicto name={s.icono} size={20} />
            {s.label}
          </button>
        ))}
      </nav>

      <div className="tienda-cuenta__contenido">
        {seccion !== "resumen" && (
          <button type="button" className="tienda-cuenta__volver" onClick={() => ir({ v: "cuenta", seccion: "resumen" })}>
            <VitrinaPicto name="chevron-izq" size={18} /> Mi cuenta
          </button>
        )}
        {seccion !== "resumen" && (
          <VitrinaTitular tamano="pagina" sobre={actual.texto}>
            {actual.label}
          </VitrinaTitular>
        )}
        {seccion === "resumen" && <Resumen />}
        {seccion === "compras" && <Compras />}
        {seccion === "favoritos" && <Favoritos />}
        {seccion === "perfil" && <Perfil />}
        {seccion === "direcciones" && <Direcciones />}
        {seccion === "pagos" && <Pagos />}
        {seccion === "preferencias" && <Preferencias />}
      </div>
    </div>
  );
}
