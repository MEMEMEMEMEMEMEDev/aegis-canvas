// =============================================================================
// Los modelos de la tienda. Todo mock, todo en memoria; nada de esto habla
// con un servidor. Los precios son CLP enteros.
// =============================================================================

import type { PictoCategoriaName } from "../../VitrinaPicto/VitrinaPicto";

export type CategoriaId = "tecnologia" | "hogar" | "ferreteria" | "deporte" | "moda" | "belleza" | "juguetes" | "libreria";
export type VendedorId = "tecnoaustral" | "casa-lumbre" | "ferreteria-lautaro" | "andes-outdoor" | "tienda-cauquen" | "papelera-bosque";
export type ColorId = "negro" | "blanco" | "gris" | "rojo" | "azul" | "verde" | "arena" | "coral" | "madera";
export type Talla = "XS" | "S" | "M" | "L" | "XL" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "unica";
export type SelloProducto = "nuevo" | "oferta" | "flash" | "mas-vendido";

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  /** El color de la placa de sus láminas. */
  matiz: string;
  picto: PictoCategoriaName;
}

export interface Vendedor {
  id: VendedorId;
  nombre: string;
  ciudad: string;
  valoracion: number;
  ventas: number;
  desde: number;
  destacado?: boolean;
}

export interface Variante {
  id: string;
  color?: ColorId;
  talla?: Talla;
  stock: number;
}

export interface Opinion {
  autor: string;
  valor: number;
  fecha: string;
  texto: string;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaId;
  vendedor: VendedorId;
  precio: number;
  precioAntes?: number;
  valoracion: number;
  resenas: number;
  sellos: SelloProducto[];
  variantes: Variante[];
  descripcion: string;
  especificaciones: Array<[string, string]>;
  envio: { gratis: boolean; dias: [number, number] };
  /** ISO. Solo los de venta flash. */
  flashHasta?: string;
  opiniones: Opinion[];
}

export interface LineaCesta {
  /** `${productoId}:${varianteId}` */
  id: string;
  productoId: string;
  varianteId: string;
  cantidad: number;
  agregadoEn: string;
}

export type EstadoPedido = "recibido" | "pagado" | "preparando" | "despachado" | "en-camino" | "entregado" | "cancelado";

export interface HitoPedido {
  estado: EstadoPedido;
  fecha: string;
  nota?: string;
}

export type MetodoEnvio = "estandar" | "express" | "retiro";
export type MetodoPagoTipo = "tarjeta" | "transferencia" | "billetera";

export interface Direccion {
  id: string;
  alias: string;
  nombre: string;
  calle: string;
  numero: string;
  depto?: string;
  comuna: string;
  region: string;
  telefono: string;
  predeterminada: boolean;
}

export interface Tarjeta {
  id: string;
  marca: "visa" | "mastercard" | "amex";
  ultimos4: string;
  titular: string;
  /** MM/AA */
  vence: string;
  predeterminada: boolean;
}

/** Una línea congelada dentro de un pedido: lo que se compró, a qué precio. */
export interface LineaPedido {
  id: string;
  productoId: string;
  varianteId: string;
  nombre: string;
  variante?: string;
  categoria: CategoriaId;
  vendedor: string;
  precioUnitario: number;
  cantidad: number;
}

export interface Pedido {
  id: string;
  numero: string;
  creadoEn: string;
  estado: EstadoPedido;
  timeline: HitoPedido[];
  lineas: LineaPedido[];
  direccion: Direccion;
  envio: MetodoEnvio;
  pago: { tipo: MetodoPagoTipo; etiqueta: string };
  subtotal: number;
  descuento: number;
  costoEnvio: number;
  total: number;
  cupon?: string;
  entregaEstimada: string;
}

export interface Sesion {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  desde: string;
}

export interface Preferencias {
  notificaciones: { ofertas: boolean; pedidos: boolean; novedades: boolean };
  tema: "claro" | "oscuro" | "sistema";
}

export type Orden = "relevancia" | "precio-asc" | "precio-desc" | "valoracion" | "nuevo";

export interface Filtros {
  categorias: CategoriaId[];
  vendedores: VendedorId[];
  precioMax?: number;
  soloOferta: boolean;
  envioGratis: boolean;
  valoracionMin?: number;
}

export type PasoCheckout = "datos" | "envio" | "pago" | "revision";

export interface BorradorCheckout {
  paso: PasoCheckout;
  email: string;
  direccionId?: string;
  envio?: MetodoEnvio;
  pago?: { tipo: MetodoPagoTipo; tarjetaId?: string };
  aceptaTerminos: boolean;
}

export interface Cupon {
  codigo: string;
  porcentaje: number;
  /** Solo descuenta las líneas de esta categoría. */
  soloCategoria?: CategoriaId;
}
