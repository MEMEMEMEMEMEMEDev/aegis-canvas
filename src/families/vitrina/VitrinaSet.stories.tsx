import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import VitrinaBoton from "./VitrinaBoton/VitrinaBoton";
import VitrinaAviso, { VitrinaAvisoPila } from "./VitrinaAviso/VitrinaAviso";
import VitrinaCabecera from "./VitrinaCabecera/VitrinaCabecera";
import VitrinaCarga from "./VitrinaCarga/VitrinaCarga";
import VitrinaCronologia from "./VitrinaCronologia/VitrinaCronologia";
import VitrinaDialogo from "./VitrinaDialogo/VitrinaDialogo";
import VitrinaHueso, { VitrinaHuesoGrupo, VitrinaHuesoLinea, VitrinaHuesoTarjeta } from "./VitrinaHueso/VitrinaHueso";
import VitrinaLinea from "./VitrinaLinea/VitrinaLinea";
import VitrinaPasos from "./VitrinaPasos/VitrinaPasos";
import VitrinaTotales from "./VitrinaTotales/VitrinaTotales";
import { useVueloAlCarrito } from "./useVueloAlCarrito";
import VitrinaCampo from "./VitrinaCampo/VitrinaCampo";
import VitrinaCantidad from "./VitrinaCantidad/VitrinaCantidad";
import VitrinaEntrada, { VitrinaArea, VitrinaSelect } from "./VitrinaEntrada/VitrinaEntrada";
import VitrinaOpcion, { VitrinaOpcionGrupo } from "./VitrinaOpcion/VitrinaOpcion";
import VitrinaSelector from "./VitrinaSelector/VitrinaSelector";
import VitrinaCajon from "./VitrinaCajon/VitrinaCajon";
import VitrinaMarco from "./VitrinaMarco/VitrinaMarco";
import VitrinaPestanas from "./VitrinaPestanas/VitrinaPestanas";
import VitrinaPie from "./VitrinaPie/VitrinaPie";
import VitrinaVacio from "./VitrinaVacio/VitrinaVacio";
import VitrinaCarrusel from "./VitrinaCarrusel/VitrinaCarrusel";
import VitrinaCartel, { VitrinaCartelFranja } from "./VitrinaCartel/VitrinaCartel";
import VitrinaChip, { VitrinaChipFila } from "./VitrinaChip/VitrinaChip";
import VitrinaCuenta from "./VitrinaCuenta/VitrinaCuenta";
import VitrinaEstrellas from "./VitrinaEstrellas/VitrinaEstrellas";
import VitrinaLamina from "./VitrinaLamina/VitrinaLamina";
import VitrinaLoseta from "./VitrinaLoseta/VitrinaLoseta";
import VitrinaPicto from "./VitrinaPicto/VitrinaPicto";
import type { VitrinaPictoName } from "./VitrinaPicto/VitrinaPicto";
import { PICTOS_CATEGORIA } from "./VitrinaPicto/pictos-categoria";
import { PICTOS_UI } from "./VitrinaPicto/pictos-ui";
import VitrinaPrecio from "./VitrinaPrecio/VitrinaPrecio";
import VitrinaSello from "./VitrinaSello/VitrinaSello";
import VitrinaTarjeta from "./VitrinaTarjeta/VitrinaTarjeta";
import type { VitrinaTarjetaProducto } from "./VitrinaTarjeta/VitrinaTarjeta";
import VitrinaTitular from "./VitrinaTitular/VitrinaTitular";

const meta: Meta = {
  title: "Families/Vitrina/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

const lamina = {
  minHeight: "100vh",
  padding: "clamp(1.25rem, 4vw, 3rem)",
  display: "grid",
  gap: "var(--ds-space-2xl)",
  alignContent: "start" as const,
};

const fila = { display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap" as const, alignItems: "center" };

// -----------------------------------------------------------------------------
// Contraste medido EN VIVO desde las variables del scope: la tabla es la
// prueba de que la regla de la cabecera de vitrina.scss se cumple en el
// navegador y no solo en el comentario.
// -----------------------------------------------------------------------------

const PARES: Array<[string, string, string]> = [
  ["tinta", "fondo", "texto normal"],
  ["tinta-suave", "fondo", "letra chica"],
  ["tinta-suave", "superficie", "letra chica"],
  ["tinta-suave", "campo", "letra chica"],
  ["coral-tinta", "fondo", "precio en oferta"],
  ["coral-tinta", "superficie", "precio en oferta"],
  ["tinta", "coral", "CTA coral"],
  ["bloque-texto", "coral-hondo", "CTA coral pulsado"],
  ["bloque-texto", "bloque", "footer"],
  ["bloque-suave", "bloque", "letra chica del footer"],
  ["bloque-coral", "bloque", "coral en el bloque"],
  ["ok", "fondo", "estado ok"],
  ["aviso", "fondo", "estado aviso"],
  ["error", "fondo", "estado error"],
  ["bloque-texto", "error", "botón peligro"],
];

function luminancia(hex: string): number {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const lin = (c: number | undefined) => {
    const v = c ?? 0;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

const ratio = (a: string, b: string) => {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return ((l1 ?? 0) + 0.05) / ((l2 ?? 0) + 0.05);
};

function Contraste() {
  const ref = useRef<HTMLDivElement>(null);
  const [filas, setFilas] = useState<Array<[string, string, string, number, string, string]>>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const v = (n: string) => cs.getPropertyValue(`--vitrina-${n}`).trim();
    setFilas(PARES.map(([t, f, uso]) => [t, f, uso, ratio(v(t), v(f)), v(t), v(f)]));
  }, []);

  return (
    <div ref={ref}>
      <VitrinaTitular tamano="seccion" sobre="Medido en el navegador">
        Contraste AA
      </VitrinaTitular>
      <table style={{ borderCollapse: "collapse", marginTop: "1rem", width: "100%", maxWidth: "44rem", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--vitrina-tinta-suave)" }}>
            <th style={{ padding: "0.4rem 0" }}>Par</th>
            <th>Uso</th>
            <th>Muestra</th>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody>
          {filas.map(([t, f, uso, r, ct, cf]) => (
            <tr key={`${t}-${f}`} style={{ borderTop: "1px solid var(--vitrina-filete)" }}>
              <td style={{ padding: "0.4rem 0" }}>
                {t} / {f}
              </td>
              <td>{uso}</td>
              <td>
                <span style={{ background: cf, color: ct, padding: "0.15rem 0.5rem", borderRadius: 6, fontWeight: 600 }}>
                  Aa 12.990
                </span>
              </td>
              <td style={{ fontVariantNumeric: "tabular-nums", color: r >= 4.5 ? "var(--vitrina-ok)" : "var(--vitrina-error)", fontWeight: 700 }}>
                {r.toFixed(2)}:1 {r >= 4.5 ? "✓" : "✗"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// -----------------------------------------------------------------------------
// Muestra de catálogo: ocho productos de mentira con la pinta de los reales.
// -----------------------------------------------------------------------------

const MATIZ = {
  tecnologia: "#dbe7f5",
  hogar: "#f3e8d8",
  ferreteria: "#ffe1d1",
  deporte: "#dcefe0",
  moda: "#efe1ea",
  belleza: "#fbe6e0",
  juguetes: "#fff1c9",
  libreria: "#e6e6f5",
} as const;

const MUESTRA: VitrinaTarjetaProducto[] = [
  { id: "1", nombre: "Audífonos inalámbricos con cancelación de ruido", precio: 59990, precioAntes: 79990, valoracion: 4.6, resenas: 156, vendedor: "TecnoAustral", resumen: "Cancelación de ruido líder y 30 h de batería.", sellos: [{ tono: "flash", texto: "-25%" }], lamina: { picto: "tecnologia", matiz: MATIZ.tecnologia } },
  { id: "2", nombre: "Taladro percutor inalámbrico 20V con 2 baterías", precio: 89990, precioAntes: 109990, valoracion: 4.8, resenas: 312, vendedor: "Ferretería Lautaro", resumen: "El que usan los maestros. Dos baterías y maletín.", sellos: [{ tono: "oferta", texto: "-18%" }, { tono: "vendido", texto: "Más vendido" }], lamina: { picto: "ferreteria", matiz: MATIZ.ferreteria } },
  { id: "3", nombre: "Zapatillas de trail Andes 2", precio: 64990, valoracion: 4.4, resenas: 87, vendedor: "Andes Outdoor", resumen: "Suela de agarre para barro y piedra.", sellos: [{ tono: "nuevo", texto: "Nuevo" }], lamina: { picto: "deporte", matiz: MATIZ.deporte } },
  { id: "4", nombre: "Hervidor eléctrico 1,7 L acero", precio: 22990, valoracion: 4.2, resenas: 44, vendedor: "Casa Lumbre", lamina: { picto: "hogar", matiz: MATIZ.hogar } },
  { id: "5", nombre: "Polera térmica manga larga", precio: 14990, precioAntes: 19990, valoracion: 4.1, resenas: 23, vendedor: "Tienda Cauquén", sellos: [{ tono: "oferta", texto: "-25%" }], lamina: { picto: "moda", matiz: MATIZ.moda } },
  { id: "6", nombre: "Crema hidratante facial 50 ml", precio: 9990, valoracion: 4.7, resenas: 210, vendedor: "Tienda Cauquén", lamina: { picto: "belleza", matiz: MATIZ.belleza } },
  { id: "7", nombre: "Set de bloques 250 piezas", precio: 29990, valoracion: 4.9, resenas: 98, vendedor: "Papelera Bosque", sellos: [{ tono: "nuevo", texto: "Nuevo" }], lamina: { picto: "juguetes", matiz: MATIZ.juguetes } },
  { id: "8", nombre: "Cuaderno punteado A5 tapa dura", precio: 4990, valoracion: 4.3, resenas: 61, vendedor: "Papelera Bosque", agotado: true, lamina: { picto: "libreria", matiz: MATIZ.libreria } },
];

const manana = new Date(Date.now() + 1000 * 60 * 60 * 27 + 1000 * 60 * 14).toISOString();

function Catalogo() {
  const [favs, setFavs] = useState<string[]>(["3"]);
  const [chips, setChips] = useState<string[]>(["Ofertas"]);
  const toggle = (arr: string[], x: string) => (arr.includes(x) ? arr.filter((y) => y !== x) : [...arr, x]);
  const acc = { label: "Comprar ahora", onClick: () => {} };

  return (
    <>
      <VitrinaCartel
        alto="hero"
        sobre="Trending ahora"
        titulo="Descubre lo que vas a querer"
        texto="Lo último de tecnología, hogar, ferretería y moda, de seis tiendas chilenas en un solo carrito."
        accion={acc}
        secundaria={{ label: "Explorar colección", onClick: () => {} }}
        pie="Más de 50.000 clientes en todo Chile"
        flotantes={MUESTRA.slice(0, 4).map((p) => (
          <div key={p.id} style={{ display: "grid", gap: 6, width: "8.5rem" }}>
            <VitrinaLamina picto={p.lamina.picto} matiz={p.lamina.matiz} tamano="mini" ratio="3/2" />
            <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{p.nombre.split(" ").slice(0, 2).join(" ")}</span>
            <VitrinaPrecio valor={p.precio} tamano="sm" />
          </div>
        ))}
      />

      <VitrinaCartelFranja
        items={[
          { picto: "envio", titulo: "Envío gratis", texto: "En compras sobre $39.990" },
          { picto: "seguro", titulo: "Pago seguro", texto: "Checkout 100 % protegido" },
          { picto: "devoluciones", titulo: "Devolución fácil", texto: "30 días para cambiar de idea" },
          { picto: "soporte", titulo: "Soporte 24/7", texto: "Siempre hay alguien" },
        ]}
      />

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion" accion={{ label: "Ver todas", onClick: () => {} }}>
          Compra por categoría
        </VitrinaTitular>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))", gap: "var(--ds-space-sm)" }}>
          {(Object.keys(MATIZ) as Array<keyof typeof MATIZ>).map((k) => (
            <VitrinaLoseta key={k} nombre={k[0]!.toUpperCase() + k.slice(1)} picto={k} matiz={MATIZ[k]} sub="Ver todo" onClick={() => {}} />
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion" sobre="Chips y sellos">
          Filtros
        </VitrinaTitular>
        <VitrinaChipFila label="Filtros rápidos">
          {["Ofertas", "Envío gratis", "Nuevo", "4★ o más", "Ferretería Lautaro"].map((c) => (
            <VitrinaChip key={c} activo={chips.includes(c)} onClick={() => setChips(toggle(chips, c))}>
              {c}
            </VitrinaChip>
          ))}
          <VitrinaChip onQuitar={() => {}} icono={<VitrinaPicto name="filtro" />}>
            Tecnología
          </VitrinaChip>
          <VitrinaChip contador={12} activo={false} onClick={() => {}}>
            Hogar
          </VitrinaChip>
        </VitrinaChipFila>
        <div style={fila}>
          <VitrinaSello tono="nuevo">Nuevo</VitrinaSello>
          <VitrinaSello tono="oferta">-20%</VitrinaSello>
          <VitrinaSello tono="flash" icono={<VitrinaPicto name="rayo" />}>Flash</VitrinaSello>
          <VitrinaSello tono="vendido">Más vendido</VitrinaSello>
          <VitrinaSello tono="agotado">Agotado</VitrinaSello>
          <VitrinaSello tono="ok" icono={<VitrinaPicto name="check" />}>Entregado</VitrinaSello>
          <VitrinaSello tono="aviso">En camino</VitrinaSello>
          <VitrinaSello tono="error">Cancelado</VitrinaSello>
          <VitrinaSello>Neutro</VitrinaSello>
          <VitrinaEstrellas valor={4.3} cantidad={120} />
          <VitrinaEstrellas valor={3} interactivo onChange={() => {}} />
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion" accion={{ label: "Ver novedades", onClick: () => {} }}>
          Novedades
        </VitrinaTitular>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr))", gap: "var(--ds-space-sm)" }}>
          {MUESTRA.map((p, i) => (
            <VitrinaTarjeta key={p.id} producto={p} indice={i} favorito={favs.includes(p.id)} onFavorito={(id) => setFavs(toggle(favs, id))} onAgregar={() => {}} onAbrir={() => {}} />
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion" accion={{ label: "Ver todos", onClick: () => {} }}>
          Más vendidos
        </VitrinaTitular>
        <VitrinaCarrusel label="Más vendidos" ancho="min(84vw, 22rem)" puntos>
          {MUESTRA.slice(0, 5).map((p) => (
            <VitrinaTarjeta key={p.id} producto={p} variante="horizontal" favorito={favs.includes(p.id)} onFavorito={(id) => setFavs(toggle(favs, id))} onAgregar={() => {}} onAbrir={() => {}} />
          ))}
        </VitrinaCarrusel>
      </section>

      <div style={{ display: "grid", gap: "var(--ds-space-md)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))" }}>
        <VitrinaCartel
          tono="coral"
          sobre="Venta flash"
          titulo="Hasta 70 % dcto."
          texto="Solo hasta que se acabe el reloj o el stock, lo que pase primero."
          accion={{ label: "Ver ofertas", onClick: () => {} }}
          derecha={<VitrinaCuenta hasta={manana} label="Termina la venta flash" />}
        />
        <VitrinaCartel
          tono="bloque"
          sobre="Nueva colección"
          titulo="Primavera 2026"
          texto="Lo nuevo de moda y deporte, con envío gratis toda la semana."
          accion={{ label: "Ver colección", onClick: () => {} }}
          derecha={<VitrinaLamina picto="moda" matiz="#efe1ea" tamano="galeria" ratio="4/5" className="set-lamina-banner" />}
        />
      </div>
    </>
  );
}

// -----------------------------------------------------------------------------

export const Overview: StoryObj = {
  render: () => (
    <main className="vitrina-scope" style={lamina}>
      <VitrinaTitular tamano="pagina" sobre="Familia · Vitrina">
        Marketplace de barrio grande
      </VitrinaTitular>

      <section style={{ display: "grid", gap: "var(--ds-space-lg)" }}>
        <VitrinaTitular tamano="seccion" sobre="Onest 100–900 · Instrument Sans wdth 75–100" accion={{ label: "Ver todo", onClick: () => {} }}>
          Las tres voces del titular
        </VitrinaTitular>
        <div className="vitrina-scope vitrina-scope--transaccion" style={{ padding: "clamp(1rem, 4vw, 2.5rem)", borderRadius: "var(--vitrina-radio-lg)" }}>
          <VitrinaTitular tamano="gigante" sobre="Paso 3 de 4 · Pago">
            Checkout
          </VitrinaTitular>
        </div>
        <div style={{ background: "var(--vitrina-bloque)", padding: "clamp(1rem, 4vw, 2.5rem)", borderRadius: "var(--vitrina-radio-lg)" }}>
          <VitrinaTitular tamano="gigante" tono="bloque" sobre="El footer">
            Tu casa, con todo
          </VitrinaTitular>
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion">Botones</VitrinaTitular>
        <div style={fila}>
          <VitrinaBoton tono="coral" icono={<VitrinaPicto name="carrito" />}>
            Añadir a la cesta
          </VitrinaBoton>
          <VitrinaBoton>Comprar ahora</VitrinaBoton>
          <VitrinaBoton variant="outline">Ver detalle</VitrinaBoton>
          <VitrinaBoton variant="ghost" icono={<VitrinaPicto name="corazon" />}>
            Guardar
          </VitrinaBoton>
          <VitrinaBoton tono="coral" variant="outline" size="sm">
            Añadir rápido
          </VitrinaBoton>
          <VitrinaBoton variant="danger" size="sm" icono={<VitrinaPicto name="papelera" />}>
            Quitar
          </VitrinaBoton>
          <VitrinaBoton iconOnly aria-label="Buscar" variant="ghost" icono={<VitrinaPicto name="lupa" />} />
          <VitrinaBoton loading>Procesando</VitrinaBoton>
          <VitrinaBoton disabled>Agotado</VitrinaBoton>
        </div>
        <div style={{ maxWidth: "28rem" }}>
          <VitrinaBoton tono="bloque">Pagar y confirmar pedido</VitrinaBoton>
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion" sobre="Rejilla 24 · interfaz">
          Pictogramas
        </VitrinaTitular>
        <div style={{ ...fila, gap: "var(--ds-space-md)" }}>
          {(Object.keys(PICTOS_UI) as VitrinaPictoName[]).map((n) => (
            <span key={n} title={n} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4, width: 64, fontSize: "0.7rem", color: "var(--vitrina-tinta-suave)" }}>
              <VitrinaPicto name={n} />
              {n}
            </span>
          ))}
        </div>
        <VitrinaTitular tamano="seccion" sobre="Rejilla 48 · carteles de sección">
          Categorías y confianza
        </VitrinaTitular>
        <div style={{ ...fila, gap: "var(--ds-space-md)" }}>
          {(Object.keys(PICTOS_CATEGORIA) as VitrinaPictoName[]).map((n) => (
            <span key={n} title={n} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, width: 92, padding: "0.75rem 0", background: "var(--vitrina-superficie)", borderRadius: "var(--vitrina-radio)", fontSize: "0.7rem", color: "var(--vitrina-tinta-suave)" }}>
              <VitrinaPicto name={n} />
              {n}
            </span>
          ))}
        </div>
      </section>

      <Catalogo />

      <Contraste />
    </main>
  ),
};

// -----------------------------------------------------------------------------
// El mueble: marco + cabecera + pestañas + pie, con un cajón que se abre.
// -----------------------------------------------------------------------------

function Mueble() {
  const [pestana, setPestana] = useState("inicio");
  const [q, setQ] = useState("");
  const [cajon, setCajon] = useState(false);
  const [favs] = useState(["3"]);

  return (
    <VitrinaMarco
      cabecera={
        <VitrinaCabecera
          marca={<>vitrina<em>.</em></>}
          promo={["Envío gratis sobre $39.990", "Venta flash: hasta 70 % dcto.", "Devoluciones en 30 días"]}
          enlaces={[
            { id: "tecnologia", label: "Tecnología" },
            { id: "hogar", label: "Hogar" },
            { id: "ferreteria", label: "Ferretería" },
            { id: "moda", label: "Moda" },
            { id: "ofertas", label: "Ofertas" },
          ]}
          busqueda={{ valor: q, onCambio: setQ, onBuscar: () => {} }}
          favoritos={favs.length}
          cesta={3}
          usuario="Camila"
          onIr={(d) => {
            if (d === "cesta") setCajon(true);
          }}
        />
      }
      pestanas={
        <VitrinaPestanas
          label="Secciones"
          value={pestana}
          onChange={(id) => {
            setPestana(id);
            if (id === "cesta") setCajon(true);
          }}
          items={[
            { id: "inicio", label: "Inicio", icono: "casa" },
            { id: "buscar", label: "Buscar", icono: "lupa" },
            { id: "cesta", label: "Cesta", icono: "carrito", badge: 3 },
            { id: "favoritos", label: "Favoritos", icono: "corazon" },
            { id: "cuenta", label: "Cuenta", icono: "usuario" },
          ]}
        />
      }
      pie={
        <VitrinaPie
          marca={<>vitrina<em>.</em></>}
          sobre="Un carrito, seis tiendas"
          titular="Tu casa, con todo"
          columnas={[
            { titulo: "Tienda", enlaces: [{ id: "a", label: "Novedades" }, { id: "b", label: "Ofertas" }, { id: "c", label: "Categorías" }, { id: "d", label: "Vendedores" }] },
            { titulo: "Ayuda", enlaces: [{ id: "e", label: "Mi cuenta" }, { id: "f", label: "Envíos y plazos" }, { id: "g", label: "Devoluciones" }, { id: "h", label: "Contacto" }] },
            { titulo: "Legal", enlaces: [{ id: "i", label: "Términos" }, { id: "j", label: "Privacidad" }] },
          ]}
          onSuscribir={() => {}}
          legal="© 2026 Vitrina. Hecho en Chile. Precios en pesos chilenos, IVA incluido."
          extras={<><VitrinaPicto name="tarjeta" /><VitrinaPicto name="escudo" /></>}
        />
      }
    >
      <Catalogo />
      <VitrinaVacio picto="lupa" titulo="Sin resultados para «taladro rosado»" texto="Prueba con menos palabras o quita algún filtro." accion={{ label: "Quitar filtros", onClick: () => {} }} secundaria={{ label: "Ver ofertas", onClick: () => {} }} />

      <VitrinaCajon
        abierto={cajon}
        onCerrar={() => setCajon(false)}
        titulo="Tu cesta (3)"
        id="set-cajon"
        pie={
          <div style={{ display: "grid", gap: "0.6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 600 }}>Total</span>
              <VitrinaPrecio valor={172970} tamano="lg" />
            </div>
            <VitrinaBoton tono="bloque">Ir a pagar</VitrinaBoton>
          </div>
        }
      >
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {MUESTRA.slice(0, 3).map((p) => (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "4.5rem 1fr", gap: "0.75rem", alignItems: "center" }}>
              <VitrinaLamina picto={p.lamina.picto} matiz={p.lamina.matiz} tamano="mini" />
              <div style={{ display: "grid", gap: 4 }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{p.nombre}</span>
                <VitrinaPrecio valor={p.precio} tamano="sm" />
              </div>
            </div>
          ))}
        </div>
      </VitrinaCajon>
    </VitrinaMarco>
  );
}

export const MuebleCompleto: StoryObj = {
  name: "Mueble",
  render: () => <Mueble />,
};

export const NoEncontrado: StoryObj = {
  render: () => (
    <VitrinaMarco>
      <VitrinaVacio tono="404" alto="pantalla" titulo="Esta página no está en la vitrina" texto="Puede que el enlace esté roto o que el producto ya no exista." accion={{ label: "Volver al inicio", onClick: () => {} }} />
    </VitrinaMarco>
  ),
};

// -----------------------------------------------------------------------------
// El formulario: un mini-checkout estático en modo transacción, al lado de
// los mismos controles en modo caja (la tienda).
// -----------------------------------------------------------------------------

function Formulario() {
  const [envio, setEnvio] = useState("estandar");
  const [pago, setPago] = useState("tarjeta");
  const [acepta, setAcepta] = useState(false);
  const [ofertas, setOfertas] = useState(true);
  const [talla, setTalla] = useState<string | undefined>("M");
  const [color, setColor] = useState<string | undefined>("negro");
  const [qty, setQty] = useState(1);
  const [ver, setVer] = useState(false);

  return (
    <div className="vitrina-scope vitrina-scope--transaccion" style={{ ...lamina, gap: "var(--ds-space-xl)" }}>
      <VitrinaTitular tamano="gigante" sobre="Paso 1 de 4 · Datos">
        Checkout
      </VitrinaTitular>

      <div style={{ display: "grid", gap: "var(--ds-space-xl)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))", alignItems: "start" }}>
        <form style={{ display: "grid", gap: "var(--ds-space-lg)" }} onSubmit={(e) => e.preventDefault()}>
          <VitrinaTitular tamano="seccion">Información</VitrinaTitular>
          <div style={{ display: "grid", gap: "var(--ds-space-md)", gridTemplateColumns: "1fr 1fr" }}>
            <VitrinaCampo modo="linea" label="Nombre" required>
              <VitrinaEntrada modo="linea" placeholder="Camila" autoComplete="given-name" />
            </VitrinaCampo>
            <VitrinaCampo modo="linea" label="Apellido" required>
              <VitrinaEntrada modo="linea" placeholder="Riquelme" autoComplete="family-name" />
            </VitrinaCampo>
            <VitrinaCampo modo="linea" label="Correo" error="Escribe un correo válido">
              <VitrinaEntrada modo="linea" type="email" placeholder="tu@correo.cl" defaultValue="camila@" />
            </VitrinaCampo>
            <VitrinaCampo modo="linea" label="Teléfono" hint="Para avisarte del reparto">
              <VitrinaEntrada modo="linea" type="tel" placeholder="+56 9 1234 5678" />
            </VitrinaCampo>
            <VitrinaCampo modo="linea" label="Contraseña" className="set-span-2">
              <VitrinaEntrada modo="linea" type={ver ? "text" : "password"} placeholder="Mínimo 8 caracteres" accion={{ icono: <VitrinaPicto name={ver ? "ojo-cerrado" : "ojo"} />, label: ver ? "Ocultar contraseña" : "Mostrar contraseña", onClick: () => setVer(!ver) }} />
            </VitrinaCampo>
          </div>

          <VitrinaOpcionGrupo leyenda="Envío">
            <VitrinaOpcion tipo="radio" name="envio" value="estandar" checked={envio === "estandar"} onChange={() => setEnvio("estandar")} label="Envío estándar" detalle="Llega en 3 a 5 días hábiles" derecha={<span style={{ color: "var(--vitrina-ok)" }}>Gratis</span>} />
            <VitrinaOpcion tipo="radio" name="envio" value="express" checked={envio === "express"} onChange={() => setEnvio("express")} label="Envío express" detalle="Llega mañana si compras antes de las 14:00" derecha={<VitrinaPrecio valor={4990} tamano="sm" />} />
            <VitrinaOpcion tipo="radio" name="envio" value="retiro" checked={envio === "retiro"} onChange={() => setEnvio("retiro")} label="Retiro en tienda" detalle="Ferretería Lautaro · Temuco" derecha={<span style={{ color: "var(--vitrina-ok)" }}>Gratis</span>} />
          </VitrinaOpcionGrupo>

          <VitrinaOpcionGrupo leyenda="Pago" error={pago === "billetera" ? "Billetera no disponible en esta demo" : null}>
            <VitrinaOpcion tipo="radio" name="pago" value="tarjeta" checked={pago === "tarjeta"} onChange={() => setPago("tarjeta")} icono={<VitrinaPicto name="tarjeta" />} label="Tarjeta de crédito o débito" derecha={<VitrinaSello pequeno>Visa · MC</VitrinaSello>} />
            <VitrinaOpcion tipo="radio" name="pago" value="transferencia" checked={pago === "transferencia"} onChange={() => setPago("transferencia")} icono={<VitrinaPicto name="casa" />} label="Transferencia bancaria" detalle="Confirmamos en menos de 1 hora" />
            <VitrinaOpcion tipo="radio" name="pago" value="billetera" checked={pago === "billetera"} onChange={() => setPago("billetera")} icono={<VitrinaPicto name="rayo" />} label="Billetera digital" />
          </VitrinaOpcionGrupo>

          <VitrinaOpcion tipo="casilla" marco={false} checked={acepta} onChange={setAcepta} label="Acepto los términos y el tratamiento de mis datos" />

          <VitrinaBoton tono="bloque" disabled={!acepta}>
            Pagar y confirmar pedido
          </VitrinaBoton>
        </form>

        <div style={{ display: "grid", gap: "var(--ds-space-lg)", background: "var(--vitrina-fondo)", padding: "1.5rem", borderRadius: "var(--vitrina-radio-lg)" }}>
          <VitrinaTitular tamano="seccion" sobre="Modo caja · la tienda">
            Ficha y ajustes
          </VitrinaTitular>
          <VitrinaCampo label="Buscar en la ficha">
            <VitrinaEntrada icono={<VitrinaPicto name="lupa" />} placeholder="Buscar…" />
          </VitrinaCampo>
          <VitrinaCampo label="Ordenar por">
            <VitrinaSelect defaultValue="relevancia">
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="valoracion">Mejor valorados</option>
            </VitrinaSelect>
          </VitrinaCampo>
          <VitrinaSelector label="Talla" value={talla} onChange={setTalla} accion={{ label: "Guía de tallas", onClick: () => {} }} opciones={["XS", "S", "M", "L", "XL"].map((t) => ({ id: t, label: t, agotada: t === "XL" }))} />
          <VitrinaSelector tipo="color" label="Color" value={color} onChange={setColor} opciones={[{ id: "negro", label: "Negro", color: "#2b2b2b" }, { id: "arena", label: "Arena", color: "#d9c8a9" }, { id: "coral", label: "Coral", color: "#ff7a52" }, { id: "azul", label: "Azul", color: "#4a6fa5", agotada: true }]} />
          <div style={fila}>
            <VitrinaCantidad label="Cantidad" value={qty} onChange={setQty} max={5} />
            <VitrinaCantidad label="Cantidad pequeña" tamano="sm" defaultValue={2} />
            <span style={{ fontSize: "0.85rem", color: "var(--vitrina-tinta-suave)" }}>máx. 5 en stock</span>
          </div>
          <VitrinaCampo label="Nota para el vendedor" hint="Opcional">
            <VitrinaArea placeholder="Dejar en conserjería, por favor." />
          </VitrinaCampo>
          <VitrinaOpcionGrupo leyenda="Notificaciones" pegadas={false}>
            <VitrinaOpcion tipo="interruptor" marco={false} checked={ofertas} onChange={setOfertas} label="Ofertas y novedades" detalle="Un correo a la semana, máximo" />
            <VitrinaOpcion tipo="interruptor" marco={false} defaultChecked label="Estado de mis pedidos" />
            <VitrinaOpcion tipo="interruptor" marco={false} disabled label="SMS" detalle="Pronto" />
          </VitrinaOpcionGrupo>
        </div>
      </div>
    </div>
  );
}

export const FormularioCompleto: StoryObj = {
  name: "Formulario",
  render: () => <Formulario />,
};

// -----------------------------------------------------------------------------
// Carga y avisos: el vuelo al carrito, los toasts, el diálogo, los huesos al
// lado de su versión real, y las piezas de transacción.
// -----------------------------------------------------------------------------

function CargaYAvisos() {
  const volar = useVueloAlCarrito();
  const [avisos, setAvisos] = useState<Array<{ id: number; tono: "ok" | "aviso" | "error" | "neutro"; texto: string }>>([]);
  const [dialogo, setDialogo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [cesta, setCesta] = useState(2);
  const [progreso, setProgreso] = useState(35);
  const [lineas, setLineas] = useState(MUESTRA.slice(0, 3).map((p) => ({ id: p.id, nombre: p.nombre, variante: "Talla M · Negro", vendedor: p.vendedor, precioUnitario: p.precio, cantidad: 1, lamina: p.lamina, max: 5 })));

  const avisar = (tono: "ok" | "aviso" | "error" | "neutro", texto: string) => setAvisos((a) => [...a, { id: Date.now() + Math.random(), tono, texto }]);
  const quitar = (id: number) => setAvisos((a) => a.filter((x) => x.id !== id));

  const subtotal = lineas.reduce((s, l) => s + l.precioUnitario * l.cantidad, 0);

  return (
    <div className="vitrina-scope" style={lamina}>
      <VitrinaCabecera marca={<>vitrina<em>.</em></>} cesta={cesta} onIr={() => {}} />

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion" sobre="Pulsa el carrito de una tarjeta: la lámina vuela hasta la cabecera">
          El vuelo al carrito
        </VitrinaTitular>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr))", gap: "var(--ds-space-sm)" }}>
          {MUESTRA.slice(0, 4).map((p) => (
            <VitrinaTarjeta
              key={p.id}
              producto={p}
              onAgregar={(_, el) => {
                volar(el);
                setCesta((c) => c + 1);
                avisar("ok", `${p.nombre.split(" ").slice(0, 3).join(" ")} añadido a la cesta`);
              }}
              onAbrir={() => {}}
            />
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion">Cargas</VitrinaTitular>
        <div style={{ ...fila, gap: "var(--ds-space-xl)", alignItems: "flex-start" }}>
          <VitrinaCarga modo="bolsa" tamano="sm" texto="pequeña" />
          <VitrinaCarga modo="bolsa" texto="Cargando la ficha…" />
          <VitrinaCarga modo="bolsa" tamano="lg" progreso={progreso} texto={`Determinada: ${progreso} %`} />
          <div style={fila}>
            <VitrinaBoton size="sm" variant="outline" onClick={() => setProgreso((p) => (p + 20) % 120)}>+20 %</VitrinaBoton>
            <VitrinaBoton size="sm" variant="outline" onClick={() => { setCargando(true); window.setTimeout(() => setCargando(false), 2200); }}>Barra 2 s</VitrinaBoton>
            <VitrinaBoton size="sm" tono="coral" loading={cargando}>Botón cargando</VitrinaBoton>
          </div>
        </div>
        {cargando && <VitrinaCarga modo="barra" texto="Cargando página" />}
        <div style={{ background: "var(--vitrina-superficie)", borderRadius: "var(--vitrina-radio-lg)" }}>
          <VitrinaCarga modo="pagina" texto="Preparando tu pedido…" />
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion" sobre="Los huesos al lado de lo real">
          Esqueletos
        </VitrinaTitular>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr))", gap: "var(--ds-space-sm)" }}>
          <VitrinaHuesoGrupo label="Cargando productos">
            <VitrinaHuesoTarjeta />
            <VitrinaHuesoTarjeta />
          </VitrinaHuesoGrupo>
          <VitrinaTarjeta producto={MUESTRA[0]!} onAbrir={() => {}} />
        </div>
        <div style={{ maxWidth: "28rem" }}>
          <VitrinaHuesoTarjeta horizontal />
        </div>
        <div style={{ maxWidth: "34rem" }}>
          <VitrinaHuesoLinea />
          <VitrinaHueso forma="linea" lineas={3} />
          <div style={{ ...fila, marginTop: "0.75rem" }}>
            <VitrinaHueso forma="circulo" />
            <VitrinaHueso forma="bloque" ancho="9rem" />
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--ds-space-md)" }}>
        <VitrinaTitular tamano="seccion">Avisos y diálogo</VitrinaTitular>
        <div style={fila}>
          <VitrinaBoton size="sm" onClick={() => avisar("ok", "Dirección guardada")}>ok</VitrinaBoton>
          <VitrinaBoton size="sm" onClick={() => avisar("aviso", "Solo quedan 2 unidades")}>aviso</VitrinaBoton>
          <VitrinaBoton size="sm" onClick={() => avisar("error", "El cupón no es válido")}>error</VitrinaBoton>
          <VitrinaBoton size="sm" onClick={() => avisar("neutro", "Tu pedido está en camino")}>neutro</VitrinaBoton>
          <VitrinaBoton size="sm" variant="danger" onClick={() => setDialogo(true)}>Cancelar pedido…</VitrinaBoton>
        </div>
      </section>

      <div className="vitrina-scope vitrina-scope--transaccion" style={{ padding: "clamp(1rem, 4vw, 2rem)", borderRadius: "var(--vitrina-radio-lg)", display: "grid", gap: "var(--ds-space-xl)" }}>
        <VitrinaPasos pasos={[{ id: "datos", label: "Datos" }, { id: "envio", label: "Envío" }, { id: "pago", label: "Pago" }, { id: "revision", label: "Revisión" }]} actual="pago" onIr={() => {}} />
        <div style={{ display: "grid", gap: "var(--ds-space-xl)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", alignItems: "start" }}>
          <div>
            <VitrinaTitular tamano="seccion">Tu cesta ({lineas.length})</VitrinaTitular>
            {lineas.map((l) => (
              <VitrinaLinea key={l.id} linea={l} onCantidad={(id, n) => setLineas((ls) => ls.map((x) => (x.id === id ? { ...x, cantidad: n } : x)))} onQuitar={(id) => setLineas((ls) => ls.filter((x) => x.id !== id))} onGuardar={() => avisar("neutro", "Guardado para después")} onAbrir={() => {}} />
            ))}
            <VitrinaTitular tamano="seccion" className="set-mt">Compacta</VitrinaTitular>
            {lineas.slice(0, 2).map((l) => (
              <VitrinaLinea key={l.id} linea={l} modo="compacta" />
            ))}
          </div>
          <div style={{ display: "grid", gap: "var(--ds-space-lg)" }}>
            <VitrinaTotales
              subtotal={subtotal}
              descuento={Math.round(subtotal * 0.1)}
              descuentoLabel="Cupón BIENVENIDO10"
              envio={subtotal >= 39990 ? "gratis" : 2990}
              total={subtotal - Math.round(subtotal * 0.1) + (subtotal >= 39990 ? 0 : 2990)}
              nota="IVA incluido. El envío se confirma con la dirección."
              cupon={
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <VitrinaEntrada modo="linea" placeholder="Cupón de descuento" aria-label="Cupón" />
                  <VitrinaBoton variant="outline" size="sm">Aplicar</VitrinaBoton>
                </div>
              }
            />
            <VitrinaCronologia
              hitos={[
                { id: "1", label: "Pedido recibido", fecha: "8 sep, 10:32", estado: "hecho" },
                { id: "2", label: "Pago confirmado", fecha: "8 sep, 10:33", estado: "hecho" },
                { id: "3", label: "En preparación", fecha: "9 sep", nota: "Ferretería Lautaro está armando tu pedido", estado: "actual" },
                { id: "4", label: "Despachado", estado: "pendiente" },
                { id: "5", label: "Entregado", estado: "pendiente" },
              ]}
            />
          </div>
        </div>
      </div>

      <VitrinaAvisoPila>
        {avisos.map((a) => (
          <VitrinaAviso key={a.id} tono={a.tono} texto={a.texto} onCerrar={() => quitar(a.id)} accion={a.tono === "ok" ? { label: "Ver cesta", onClick: () => quitar(a.id) } : undefined} />
        ))}
      </VitrinaAvisoPila>

      <VitrinaDialogo abierto={dialogo} id="set-dialogo" titulo="¿Cancelar el pedido VT-2026-000162?" detalle="Se devolverá el pago al mismo medio en 3 a 5 días hábiles. Esta acción no se puede deshacer." confirmar="Sí, cancelar" cancelar="Volver" peligro onConfirmar={() => { setDialogo(false); avisar("ok", "Pedido cancelado"); }} onCancelar={() => setDialogo(false)} />
    </div>
  );
}

export const CargaAvisos: StoryObj = {
  name: "Carga y avisos",
  render: () => <CargaYAvisos />,
};
