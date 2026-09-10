// Formato de la tienda: pesos chilenos enteros, fechas en español de Chile.
// Los formatters se crean una vez (son caros) y se memorizan a nivel de módulo.

const CLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const FECHA = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "short", year: "numeric" });
const FECHA_HORA = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const FECHA_LARGA = new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long" });
const DIA_MES = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long" });

export const clp = (n: number): string => CLP.format(Math.round(n));
export const clpTexto = (n: number): string => `${Math.round(n).toLocaleString("es-CL")} pesos`;
export const fecha = (iso: string): string => FECHA.format(new Date(iso));
export const fechaHora = (iso: string): string => FECHA_HORA.format(new Date(iso));
export const fechaLarga = (iso: string): string => FECHA_LARGA.format(new Date(iso));
export const descuento = (precio: number, antes: number): number => Math.max(0, Math.round((1 - precio / antes) * 100));
export const plural = (n: number, uno: string, varios: string): string => `${n} ${n === 1 ? uno : varios}`;

/** "Llega entre el 12 y el 14 de septiembre". */
export function entregaEstimada(dias: [number, number], desde: Date = new Date()): string {
  const a = new Date(desde.getTime() + dias[0] * 86400 * 1000);
  const b = new Date(desde.getTime() + dias[1] * 86400 * 1000);
  if (dias[0] === dias[1]) return `Llega el ${DIA_MES.format(a)}`;
  const mismoMes = a.getMonth() === b.getMonth();
  return mismoMes ? `Llega entre el ${a.getDate()} y el ${DIA_MES.format(b)}` : `Llega entre el ${DIA_MES.format(a)} y el ${DIA_MES.format(b)}`;
}

export const numeroPedido = (seq: number, anio: number = new Date().getFullYear()): string => `VT-${anio}-${String(seq).padStart(6, "0")}`;

/** "Hace 3 días", "Ayer", "Hoy". */
export function hace(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d <= 0) return "Hoy";
  if (d === 1) return "Ayer";
  if (d < 30) return `Hace ${d} días`;
  return fecha(iso);
}

/** Enmascara una tarjeta: "Visa ···· 4242". */
export const tarjetaTexto = (marca: string, ultimos4: string): string => `${marca === "mastercard" ? "Mastercard" : marca === "amex" ? "Amex" : "Visa"} ···· ${ultimos4}`;
