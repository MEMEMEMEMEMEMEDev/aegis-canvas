// El formato de precio de la familia, mínimo y sin dependencias: pesos
// chilenos enteros, punto de miles. La app trae el suyo completo en
// tienda/formato.ts; este existe para que VitrinaPrecio funcione solo.
const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export const clp = (n: number): string => CLP.format(Math.round(n));
export const clpTexto = (n: number): string => `${Math.round(n).toLocaleString("es-CL")} pesos`;
export const descuento = (precio: number, antes: number): number =>
  Math.max(0, Math.round((1 - precio / antes) * 100));
