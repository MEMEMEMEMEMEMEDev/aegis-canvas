import type { Meta, StoryObj } from "@storybook/react-vite";
import Tienda from "./tienda/Tienda";
import { DIRECCIONES_SEMILLA, TARJETAS_SEMILLA, USUARIO_DEMO, pedidosSemilla } from "./tienda/datos";
import type { EstadoTienda } from "./tienda/state";

// =============================================================================
// VITRINA · Pantallas: cada pantalla por separado, sin persistir y sin
// latencia, para revisarlas rápido. La sesión y la cesta van en la semilla.
// =============================================================================

const meta: Meta = {
  title: "Families/Vitrina/Pantallas",
  parameters: { layout: "fullscreen" },
};
export default meta;

const ahora = new Date().toISOString();

const CON_SESION: Partial<EstadoTienda> = {
  sesion: USUARIO_DEMO,
  pedidos: pedidosSemilla(),
  direcciones: DIRECCIONES_SEMILLA,
  tarjetas: TARJETAS_SEMILLA,
  favoritos: ["zapatillas-trail", "audifonos-anc", "cafetera-italiana"],
};

const CON_CESTA: Partial<EstadoTienda> = {
  ...CON_SESION,
  cesta: [
    { id: "taladro-20v:rojo", productoId: "taladro-20v", varianteId: "rojo", cantidad: 1, agregadoEn: ahora },
    { id: "set-brocas-42:unica", productoId: "set-brocas-42", varianteId: "unica", cantidad: 2, agregadoEn: ahora },
    { id: "poleron-esencial:arena-M", productoId: "poleron-esencial", varianteId: "arena-M", cantidad: 1, agregadoEn: ahora },
  ],
  guardados: [{ id: "botella-aislante:coral", productoId: "botella-aislante", varianteId: "coral", cantidad: 1, agregadoEn: ahora }],
};

const CHECKOUT: Partial<EstadoTienda> = {
  ...CON_CESTA,
  checkout: { paso: "pago", email: USUARIO_DEMO.email, direccionId: "d-casa", envio: "express", aceptaTerminos: false },
};

const sin = { persistir: false, latencia: 0 } as const;

export const Inicio: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "inicio" }} /> };
export const Catalogo: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "catalogo", categoria: "ferreteria" }} /> };
export const Busqueda: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "catalogo", q: "taladro" }} /> };
export const CatalogoVacio: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "catalogo", q: "taladro rosado con purpurina" }} /> };
export const Producto: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "producto", id: "zapatillas-trail" }} /> };
export const ProductoSimple: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "producto", id: "cargador-gan-65" }} /> };
export const Cesta: StoryObj = { render: () => <Tienda {...sin} semilla={CON_CESTA} rutaInicial={{ v: "cesta" }} /> };
export const CestaVacia: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "cesta" }} /> };
export const CheckoutDatos: StoryObj = { render: () => <Tienda {...sin} semilla={CON_CESTA} rutaInicial={{ v: "checkout", paso: "datos" }} /> };
export const CheckoutPago: StoryObj = { render: () => <Tienda {...sin} semilla={CHECKOUT} rutaInicial={{ v: "checkout", paso: "pago" }} /> };
export const CheckoutInvitado: StoryObj = { render: () => <Tienda {...sin} semilla={{ cesta: CON_CESTA.cesta }} rutaInicial={{ v: "checkout", paso: "datos" }} /> };
export const Confirmacion: StoryObj = {
  render: () => {
    const pedidos = pedidosSemilla();
    return <Tienda {...sin} semilla={{ ...CON_SESION, ultimoPedidoId: pedidos[0]?.id ?? null }} rutaInicial={{ v: "confirmacion", pedidoId: pedidos[0]?.id ?? "" }} />;
  },
};
export const Entrar: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "acceso", modo: "entrar" }} /> };
export const Registro: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "acceso", modo: "registro" }} /> };
export const Recuperar: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "acceso", modo: "recuperar" }} /> };
export const Cuenta: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "cuenta", seccion: "resumen" }} /> };
export const MisCompras: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "cuenta", seccion: "compras" }} /> };
export const Pedido: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "pedido", id: "p-158" }} /> };
export const PedidoCancelado: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "pedido", id: "p-097" }} /> };
export const Perfil: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "cuenta", seccion: "perfil" }} /> };
export const Direcciones: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "cuenta", seccion: "direcciones" }} /> };
export const MediosDePago: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "cuenta", seccion: "pagos" }} /> };
export const Favoritos: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "cuenta", seccion: "favoritos" }} /> };
export const Preferencias: StoryObj = { render: () => <Tienda {...sin} semilla={CON_SESION} rutaInicial={{ v: "cuenta", seccion: "preferencias" }} /> };
export const NoEncontrado: StoryObj = { render: () => <Tienda {...sin} rutaInicial={{ v: "producto", id: "no-existe" }} /> };
export const Cargando: StoryObj = {
  name: "Cargando (esqueletos)",
  render: () => <Tienda persistir={false} latencia={Number.POSITIVE_INFINITY} rutaInicial={{ v: "inicio" }} />,
};
