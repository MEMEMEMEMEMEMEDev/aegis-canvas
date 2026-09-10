import type { CategoriaId, ColorId, Opinion, Producto, SelloProducto, Talla, Variante, VendedorId } from "./tipos";

// =============================================================================
// El catálogo: 36 productos, 4–5 por categoría, con precios creíbles en CLP.
// Una factory compacta para que el archivo se lea como una lista y no como
// un JSON de 2.000 líneas. El stock sale de una función determinista —
// mismo producto, mismo stock en cada carga— con unos cuantos ceros a
// propósito para lucir "agotado".
// =============================================================================

interface Extras {
  antes?: number;
  val?: number;
  res?: number;
  sellos?: SelloProducto[];
  colores?: ColorId[];
  tallas?: Talla[];
  desc?: string;
  specs?: Array<[string, string]>;
  gratis?: boolean;
  dias?: [number, number];
  flash?: boolean;
}

const enHoras = (h: number) => new Date(Date.now() + h * 3600 * 1000).toISOString();

// Stock determinista: 0 en algunas variantes (agotadas), 1–3 en otras (para
// que el "solo quedan 2" aparezca), y el resto holgado.
function stock(semilla: string): number {
  let h = 0;
  for (const c of semilla) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = h % 17;
  if (r === 0) return 0;
  if (r < 4) return r;
  return 6 + (h % 20);
}

function variantes(id: string, colores?: ColorId[], tallas?: Talla[]): Variante[] {
  const cs = colores ?? [];
  const ts = tallas ?? [];
  if (cs.length && ts.length) return cs.flatMap((c) => ts.map((t) => ({ id: `${c}-${t}`, color: c, talla: t, stock: stock(`${id}-${c}-${t}`) })));
  if (cs.length) return cs.map((c) => ({ id: c, color: c, stock: stock(`${id}-${c}`) }));
  if (ts.length) return ts.map((t) => ({ id: t, talla: t, stock: stock(`${id}-${t}`) }));
  return [{ id: "unica", stock: Math.max(1, stock(id)) }];
}

const AUTORES = ["Camila Riquelme", "Matías Soto", "Fernanda Paredes", "Ignacio Huenchumil", "Valentina Ortiz", "Rodrigo Manríquez", "Josefa Aguilera", "Tomás Cárcamo"];
const TEXTOS = [
  "Llegó antes de lo que decía y tal cual la descripción. Repetiría.",
  "Buena relación precio-calidad. El embalaje podría ser mejor.",
  "Lo uso a diario desde hace un mes y cero problemas.",
  "Cumple, sin más. Para lo que cuesta está bien.",
  "Me sorprendió la terminación. Se nota que no es lo más barato del mercado.",
  "El vendedor respondió rápido cuando pregunté por la talla.",
];

function opiniones(id: string, val: number, n: number): Opinion[] {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return Array.from({ length: Math.min(3, Math.max(1, Math.round(n / 40))) }, (_, i) => {
    const k = (h + i * 7) % AUTORES.length;
    const dias = 3 + ((h + i * 11) % 60);
    return {
      autor: AUTORES[k] ?? "Cliente",
      valor: Math.max(3, Math.min(5, Math.round(val + (i === 1 ? -1 : 0)))),
      fecha: new Date(Date.now() - dias * 86400 * 1000).toISOString(),
      texto: TEXTOS[(h + i * 5) % TEXTOS.length] ?? "",
    };
  });
}

function p(id: string, nombre: string, categoria: CategoriaId, vendedor: VendedorId, precio: number, x: Extras = {}): Producto {
  const val = x.val ?? 4.4;
  const res = x.res ?? 40;
  return {
    id,
    nombre,
    categoria,
    vendedor,
    precio,
    precioAntes: x.antes,
    valoracion: val,
    resenas: res,
    sellos: x.sellos ?? [],
    variantes: variantes(id, x.colores, x.tallas),
    descripcion: x.desc ?? `${nombre}: la opción segura de su categoría. Garantía de 12 meses y cambio sin preguntas dentro de los 30 días.`,
    especificaciones: x.specs ?? [["Garantía", "12 meses"], ["Origen", "Importado"]],
    envio: { gratis: x.gratis ?? precio >= 39990, dias: x.dias ?? [3, 5] },
    flashHasta: x.flash ? enHoras(30 + (id.length % 3) * 9) : undefined,
    opiniones: opiniones(id, val, res),
  };
}

export const PRODUCTOS: Producto[] = [
  // --- Tecnología ---
  p("audifonos-anc", "Audífonos inalámbricos con cancelación de ruido", "tecnologia", "tecnoaustral", 59990, { antes: 79990, val: 4.6, res: 156, sellos: ["flash"], flash: true, colores: ["negro", "blanco"], desc: "Cancelación de ruido activa, 30 horas de batería y estuche de carga rápida. Se emparejan con dos aparatos a la vez.", specs: [["Batería", "30 h con estuche"], ["Conexión", "Bluetooth 5.3"], ["Cancelación", "Activa, 3 niveles"], ["Peso", "248 g"]] }),
  p("cargador-gan-65", "Cargador GaN 65 W con 3 puertos", "tecnologia", "tecnoaustral", 24990, { val: 4.8, res: 203, sellos: ["mas-vendido"], desc: "Carga un notebook, un teléfono y unos audífonos a la vez. Del tamaño de una caja de fósforos.", specs: [["Potencia", "65 W"], ["Puertos", "2× USB-C, 1× USB-A"], ["Tecnología", "GaN III"]] }),
  p("smartwatch-s9", "Reloj inteligente Serie 9", "tecnologia", "tecnoaustral", 199990, { antes: 229990, val: 4.5, res: 87, sellos: ["oferta"], colores: ["negro", "arena"], specs: [["Pantalla", "1,9\" AMOLED"], ["Batería", "7 días"], ["Resistencia", "5 ATM"]] }),
  p("parlante-bt", "Parlante Bluetooth resistente al agua", "tecnologia", "tecnoaustral", 34990, { val: 4.3, res: 61, sellos: ["nuevo"], colores: ["negro", "azul", "coral"] }),
  p("teclado-mec", "Teclado mecánico compacto 65 %", "tecnologia", "tecnoaustral", 54990, { val: 4.7, res: 44, colores: ["negro", "blanco"], specs: [["Switches", "Rojos lineales"], ["Conexión", "USB-C y Bluetooth"]] }),
  // --- Hogar y cocina ---
  p("hervidor-17", "Hervidor eléctrico 1,7 L de acero", "hogar", "casa-lumbre", 22990, { val: 4.2, res: 44, colores: ["gris", "negro"] }),
  p("sarten-28", "Sartén antiadherente 28 cm", "hogar", "casa-lumbre", 18990, { antes: 24990, val: 4.5, res: 119, sellos: ["oferta"], specs: [["Diámetro", "28 cm"], ["Apto", "Inducción"]] }),
  p("set-ollas", "Set de 5 ollas de acero inoxidable", "hogar", "casa-lumbre", 79990, { val: 4.6, res: 73, sellos: ["mas-vendido"], gratis: true }),
  p("lampara-mesa", "Lámpara de mesa con brazo articulado", "hogar", "casa-lumbre", 29990, { val: 4.4, res: 38, sellos: ["nuevo"], colores: ["negro", "blanco", "madera"] }),
  p("cafetera-italiana", "Cafetera italiana 6 tazas", "hogar", "casa-lumbre", 15990, { val: 4.7, res: 92, colores: ["gris", "rojo"] }),
  // --- Ferretería ---
  p("taladro-20v", "Taladro percutor inalámbrico 20 V con 2 baterías", "ferreteria", "ferreteria-lautaro", 89990, { antes: 109990, val: 4.8, res: 312, sellos: ["oferta", "mas-vendido"], colores: ["rojo", "negro"], desc: "El que usan los maestros: 20 V, dos baterías de 2 Ah, maletín y 13 accesorios. Percutor para concreto y torque ajustable en 20 posiciones.", specs: [["Voltaje", "20 V"], ["Baterías", "2× 2,0 Ah"], ["Torque", "45 Nm"], ["Mandril", "13 mm"], ["Garantía", "24 meses"]], gratis: true, dias: [2, 4] }),
  p("set-brocas-42", "Set de 42 brocas y puntas", "ferreteria", "ferreteria-lautaro", 12490, { val: 4.5, res: 188, sellos: ["mas-vendido"] }),
  p("escalera-5", "Escalera de aluminio 5 peldaños", "ferreteria", "ferreteria-lautaro", 54990, { val: 4.6, res: 57, gratis: true, dias: [4, 7], specs: [["Altura", "1,55 m"], ["Carga máx.", "150 kg"]] }),
  p("caja-herramientas", "Caja de herramientas 19\" con bandeja", "ferreteria", "ferreteria-lautaro", 19990, { val: 4.3, res: 66, colores: ["rojo", "negro"] }),
  p("sierra-circular", "Sierra circular 1.400 W disco 7 1/4\"", "ferreteria", "ferreteria-lautaro", 69990, { antes: 84990, val: 4.7, res: 41, sellos: ["flash"], flash: true, gratis: true }),
  // --- Deporte y outdoor ---
  p("zapatillas-trail", "Zapatillas de trail Andes 2", "deporte", "andes-outdoor", 64990, { val: 4.4, res: 87, sellos: ["nuevo"], colores: ["negro", "verde", "coral"], tallas: ["38", "39", "40", "41", "42", "43", "44"], desc: "Suela de agarre para barro y piedra, malla que respira y refuerzo en la puntera. Pensadas para los cerros de acá.", specs: [["Drop", "6 mm"], ["Peso", "290 g (42)"], ["Suela", "Goma de alto agarre"]], gratis: true }),
  p("mochila-30", "Mochila de trekking 30 L", "deporte", "andes-outdoor", 39990, { val: 4.6, res: 124, sellos: ["mas-vendido"], colores: ["azul", "verde", "negro"], gratis: true }),
  p("polera-termica", "Polera térmica manga larga", "deporte", "andes-outdoor", 14990, { antes: 19990, val: 4.1, res: 23, sellos: ["oferta"], colores: ["negro", "azul"], tallas: ["XS", "S", "M", "L", "XL"] }),
  p("botella-aislante", "Botella de acero aislante 750 ml", "deporte", "andes-outdoor", 17990, { val: 4.8, res: 231, colores: ["negro", "coral", "verde", "azul"] }),
  p("bastones-trek", "Par de bastones de trekking plegables", "deporte", "andes-outdoor", 32990, { val: 4.5, res: 35 }),
  // --- Moda ---
  p("poleron-esencial", "Polerón esencial con capucha", "moda", "tienda-cauquen", 24990, { val: 4.6, res: 120, sellos: ["mas-vendido"], colores: ["arena", "negro", "gris"], tallas: ["XS", "S", "M", "L", "XL"], desc: "Algodón peinado de 320 g, corte relajado y bolsillo canguro. El básico que se usa hasta que se rompe.", specs: [["Material", "80 % algodón, 20 % poliéster"], ["Gramaje", "320 g/m²"]] }),
  p("jeans-recto", "Jeans corte recto", "moda", "tienda-cauquen", 34990, { val: 4.3, res: 58, colores: ["azul", "negro"], tallas: ["36", "38", "40", "42", "44"] }),
  p("chaqueta-lluvia", "Chaqueta impermeable liviana", "moda", "tienda-cauquen", 49990, { antes: 64990, val: 4.5, res: 46, sellos: ["oferta"], colores: ["negro", "verde", "coral"], tallas: ["S", "M", "L", "XL"], gratis: true }),
  p("zapatillas-urbanas", "Zapatillas urbanas de lona", "moda", "tienda-cauquen", 29990, { val: 4.2, res: 77, sellos: ["nuevo"], colores: ["blanco", "negro"], tallas: ["36", "37", "38", "39", "40", "41", "42", "43"] }),
  p("gorro-lana", "Gorro de lana tejido", "moda", "tienda-cauquen", 9990, { val: 4.7, res: 33, colores: ["arena", "gris", "coral", "verde"] }),
  // --- Belleza y cuidado ---
  p("crema-hidratante", "Crema hidratante facial 50 ml", "belleza", "tienda-cauquen", 9990, { val: 4.7, res: 210, sellos: ["mas-vendido"] }),
  p("serum-vitc", "Sérum de vitamina C 30 ml", "belleza", "tienda-cauquen", 14990, { antes: 18990, val: 4.4, res: 96, sellos: ["oferta"] }),
  p("bloqueador-50", "Bloqueador solar FPS 50 toque seco", "belleza", "tienda-cauquen", 12990, { val: 4.6, res: 143 }),
  p("set-brochas", "Set de 8 brochas de maquillaje", "belleza", "tienda-cauquen", 16990, { val: 4.3, res: 29, sellos: ["nuevo"], colores: ["negro", "coral"] }),
  // --- Juguetes ---
  p("bloques-250", "Set de bloques de construcción 250 piezas", "juguetes", "papelera-bosque", 29990, { val: 4.9, res: 98, sellos: ["nuevo"], desc: "250 piezas compatibles con las de siempre, en 12 colores, con caja para guardarlas. De 4 años en adelante." }),
  p("puzzle-1000", "Puzzle de 1.000 piezas — Cordillera", "juguetes", "papelera-bosque", 12990, { val: 4.6, res: 54 }),
  p("robot-arma", "Robot para armar con motor solar", "juguetes", "papelera-bosque", 19990, { val: 4.4, res: 37, sellos: ["flash"], flash: true, antes: 24990 }),
  p("juego-mesa", "Juego de mesa de estrategia para 2 a 5", "juguetes", "papelera-bosque", 34990, { val: 4.8, res: 71, sellos: ["mas-vendido"] }),
  // --- Librería y oficina ---
  p("cuaderno-a5", "Cuaderno punteado A5 tapa dura", "libreria", "papelera-bosque", 4990, { val: 4.3, res: 61, colores: ["negro", "arena", "verde", "coral"] }),
  p("set-plumones", "Set de 24 plumones de doble punta", "libreria", "papelera-bosque", 14990, { val: 4.7, res: 88, sellos: ["mas-vendido"] }),
  p("silla-escritorio", "Silla de escritorio ergonómica", "libreria", "papelera-bosque", 129990, { antes: 159990, val: 4.5, res: 42, sellos: ["oferta"], colores: ["negro", "gris"], gratis: true, dias: [5, 8], specs: [["Carga máx.", "120 kg"], ["Ajustes", "Altura, respaldo, brazos"]] }),
  p("lampara-escritorio", "Lámpara de escritorio LED con carga inalámbrica", "libreria", "papelera-bosque", 24990, { val: 4.4, res: 26, sellos: ["nuevo"], colores: ["blanco", "negro"] }),
];

export const PRODUCTO = Object.fromEntries(PRODUCTOS.map((x) => [x.id, x])) as Record<string, Producto>;
