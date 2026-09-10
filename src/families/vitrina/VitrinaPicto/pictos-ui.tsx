// Rejilla 24×24, trazo de línea, currentColor. Dibujo propio: ningún set de
// iconos de terceros. Cada picto es solo paths — el <svg> lo pone VitrinaPicto.

export type PictoUiName =
  | "carrito"
  | "bolsa"
  | "corazon"
  | "corazon-lleno"
  | "lupa"
  | "usuario"
  | "cerrar"
  | "menu"
  | "chevron-der"
  | "chevron-izq"
  | "chevron-abajo"
  | "chevron-arriba"
  | "flecha-der"
  | "flecha-izq"
  | "estrella"
  | "mas"
  | "menos"
  | "check"
  | "papelera"
  | "ubicacion"
  | "tarjeta"
  | "ojo"
  | "ojo-cerrado"
  | "filtro"
  | "orden"
  | "campana"
  | "salir"
  | "editar"
  | "casa"
  | "rayo"
  | "info"
  | "alerta"
  | "paquete"
  | "reloj"
  | "rejilla"
  | "lista"
  | "camion"
  | "devolucion"
  | "escudo"
  | "auricular"
  | "ajustes";

const c = (cx: number, cy: number, r: number, k: string) => <circle key={k} cx={cx} cy={cy} r={r} />;
const p = (d: string, k: string) => <path key={k} d={d} />;

export const PICTOS_UI: Record<PictoUiName, React.ReactNode> = {
  carrito: [p("M3 4h2l2.4 11h11.2L21 8H7", "a"), c(9.5, 20, 1.2, "b"), c(17.5, 20, 1.2, "c")],
  bolsa: [p("M6 8h12l1 13H5L6 8z", "a"), p("M9 8V6a3 3 0 0 1 6 0v2", "b")],
  corazon: p("M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z", "a"),
  "corazon-lleno": (
    <path
      d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"
      fill="currentColor"
    />
  ),
  lupa: [c(11, 11, 6, "a"), p("M20 20l-4.2-4.2", "b")],
  usuario: [c(12, 8, 4, "a"), p("M4 21a8 8 0 0 1 16 0", "b")],
  cerrar: p("M6 6l12 12M18 6L6 18", "a"),
  menu: p("M4 7h16M4 12h16M4 17h16", "a"),
  "chevron-der": p("M9 5l7 7-7 7", "a"),
  "chevron-izq": p("M15 5l-7 7 7 7", "a"),
  "chevron-abajo": p("M5 9l7 7 7-7", "a"),
  "chevron-arriba": p("M5 15l7-7 7 7", "a"),
  "flecha-der": p("M4 12h16M13 5l7 7-7 7", "a"),
  "flecha-izq": p("M20 12H4M11 5l-7 7 7 7", "a"),
  estrella: p("M12 3l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 17.3 6.2 20.5l1.4-6.4L2.7 9.7l6.5-.7z", "a"),
  mas: p("M12 5v14M5 12h14", "a"),
  menos: p("M5 12h14", "a"),
  check: p("M5 12l4.5 4.5L19 7", "a"),
  papelera: p("M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6", "a"),
  ubicacion: [p("M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z", "a"), c(12, 10, 2, "b")],
  tarjeta: [<rect key="a" x="3" y="6" width="18" height="13" rx="2" />, p("M3 10h18M7 15h4", "b")],
  ojo: [p("M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z", "a"), c(12, 12, 3, "b")],
  "ojo-cerrado": [
    p("M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z", "a"),
    c(12, 12, 3, "b"),
    p("M4 4l16 16", "c"),
  ],
  filtro: p("M4 6h16M7 12h10M10 18h4", "a"),
  orden: p("M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3", "a"),
  campana: p("M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15L6 16zM10 21h4", "a"),
  salir: p("M10 4H5v16h5M14 8l5 4-5 4M19 12H9", "a"),
  editar: p("M4 20h4L18.5 9.5l-4-4L4 16v4zM13 7l4 4", "a"),
  casa: p("M4 11l8-7 8 7v9h-5v-6h-6v6H4z", "a"),
  rayo: p("M13 3L5 14h6l-1 7 8-11h-6l1-7z", "a"),
  info: [c(12, 12, 9, "a"), p("M12 11v5M12 8h.01", "b")],
  alerta: p("M12 3l10 18H2L12 3zM12 10v4M12 17h.01", "a"),
  paquete: p("M3 8l9-4 9 4v9l-9 4-9-4zM3 8l9 4 9-4M12 12v9", "a"),
  reloj: [c(12, 12, 9, "a"), p("M12 7v5l3 2", "b")],
  rejilla: p("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z", "a"),
  lista: p("M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01", "a"),
  camion: [p("M2 7h11v9H2zM13 10h4l3 3v3h-7z", "a"), c(6, 18, 1.5, "b"), c(17, 18, 1.5, "c")],
  devolucion: p("M3 12a9 9 0 1 0 3-6.7M3 3v5h5", "a"),
  escudo: p("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4", "a"),
  auricular: p("M4 13a8 8 0 0 1 16 0M4 13v5h3v-6H4M20 13v5h-3v-6h3M17 18v1a2 2 0 0 1-2 2h-3", "a"),
  ajustes: [c(12, 12, 3, "a"), p("M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1", "b")],
};
