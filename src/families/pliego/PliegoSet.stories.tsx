import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import PliegoAviso from "./PliegoAviso/PliegoAviso";
import PliegoBarra from "./PliegoBarra/PliegoBarra";
import PliegoBloque from "./PliegoBloque/PliegoBloque";
import PliegoBoton from "./PliegoBoton/PliegoBoton";
import PliegoCanto from "./PliegoCanto/PliegoCanto";
import PliegoCarga from "./PliegoCarga/PliegoCarga";
import PliegoCorchete from "./PliegoCorchete/PliegoCorchete";
import PliegoEtiqueta from "./PliegoEtiqueta/PliegoEtiqueta";
import PliegoFicha from "./PliegoFicha/PliegoFicha";
import PliegoFilete from "./PliegoFilete/PliegoFilete";
import PliegoMenu from "./PliegoMenu/PliegoMenu";
import type { PliegoMenuItem } from "./PliegoMenu/PliegoMenu";
import PliegoNumero from "./PliegoNumero/PliegoNumero";
import PliegoPantalla from "./PliegoPantalla/PliegoPantalla";
import type { PliegoPantallaLayout } from "./PliegoPantalla/PliegoPantalla";
import PliegoRuido from "./PliegoRuido/PliegoRuido";
import PliegoSello from "./PliegoSello/PliegoSello";
import PliegoTitulo from "./PliegoTitulo/PliegoTitulo";

const meta: Meta = {
  title: "Families/Pliego/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

const lamina = {
  minHeight: "100vh",
  padding: "clamp(1.5rem, 4vw, 3.5rem)",
  display: "grid",
  gap: "var(--ds-space-2xl)",
  alignContent: "start" as const,
};

// -----------------------------------------------------------------------------

export const Overview: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={lamina}>
      <PliegoTitulo as="h1" sobre="Familia · Pliego" kana="展示" bang>
        demos
      </PliegoTitulo>

      <PliegoFilete label="Tipografía" readout="Inter Tight · 100–900" marcas />

      <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
        <PliegoEtiqueta>e-commerce</PliegoEtiqueta>
        <PliegoEtiqueta tone="rosa">abierto</PliegoEtiqueta>
        <PliegoEtiqueta tone="tinta">en montaje</PliegoEtiqueta>
        <PliegoEtiqueta tone="corchete">recorrido</PliegoEtiqueta>
        <PliegoEtiqueta tone="linea" size="md">
          3 a 4 semanas
        </PliegoEtiqueta>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-lg)", flexWrap: "wrap", alignItems: "center" }}>
        <PliegoNumero value={1} total={5} size="hero" />
        <PliegoNumero value={3} total={5} tone="rosa" size="md" />
        <PliegoNumero value={5} tone="tinta" size="sm" />
        <PliegoSello glifo="展" titulo="Aaroi Dev" sub="Vitrina" />
        <PliegoSello glifo="✳" titulo="Rev 2026" tone="rosa" />
        <PliegoSello glifo="商" titulo="Demo" sub="Cara A" tone="tinta" />
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
        <PliegoBoton>Abrir demo</PliegoBoton>
        <PliegoBoton tone="rosa" cursor>
          Empezar
        </PliegoBoton>
        <PliegoBoton variant="outline" cursor>
          Ver recorrido
        </PliegoBoton>
        <PliegoBoton variant="ghost">Detalle</PliegoBoton>
        <PliegoBoton size="sm">sm</PliegoBoton>
        <PliegoBoton size="lg">lg</PliegoBoton>
        <PliegoBoton disabled>En montaje</PliegoBoton>
      </div>

      <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: "34rem" }}>
        <PliegoBarra value={4} max={5} label="Paradas del recorrido" readout="04 / 05" />
        <PliegoBarra value={68} label="Cobertura del alcance" readout="68 %" tone="tinta" size="sm" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
          gap: "var(--ds-space-md)",
        }}
      >
        {(["tienda", "panel", "agenda", "landing", "chat"] as PliegoPantallaLayout[]).map((l) => (
          <PliegoPantalla key={l} layout={l} label={`Maqueta de ${l}`} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "var(--ds-space-md)" }}>
        <PliegoFicha titulo="El problema" indice="01" kana="問">
          <p>
            Vender por mensajes funciona hasta que funciona demasiado. Se pierden pedidos entre
            conversaciones y nadie sabe qué stock queda de verdad.
          </p>
        </PliegoFicha>

        <PliegoFicha titulo="Qué incluye" indice="02" tone="tinta" kana="含">
          <ul>
            <li>Catálogo con buscador y fichas de producto</li>
            <li>Carrito y pago con confirmación automática</li>
            <li>Panel de pedidos con estados</li>
          </ul>
        </PliegoFicha>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "var(--ds-space-md)" }}>
        <PliegoBloque ratio="4 / 3" pie="[ pliego ]" />
        <PliegoBloque tone="tinta" ratio="4 / 3" pie="[ tinta ]" />
        <PliegoBloque tone="hoja" ratio="4 / 3" pie="[ hoja ]">
          <PliegoPantalla layout="panel" label="Maqueta de panel dentro del bloque" />
        </PliegoBloque>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "var(--ds-space-lg)" }}>
        <PliegoCarga
          title="tienda online"
          lines={[
            "montando catálogo · 128 productos de prueba",
            "conectando la pasarela en modo test",
            "sembrando pedidos, clientes y cupones",
            "listo · se abre en otra pestaña",
          ]}
          readout="100 %"
        />

        <PliegoAviso
          pregunta="¿Abrimos la tienda con datos de prueba?"
          detalle={<p>Se abre en otra pestaña. Nada de lo que toques ahí afecta a nada real.</p>}
          confirmar="Sí, ábrela"
          cancelar="Aquí me quedo"
        />
      </div>

      {/* El alto lo pone la maqueta por su proporción, no un valor fijo: con
          `height: 100%` sobre una fila de 18rem, la pantalla de dentro salía
          aplastada a la mitad de lo que pide su 16/10. */}
      <div style={{ display: "flex", gap: "var(--ds-space-xl)", alignItems: "stretch" }}>
        <PliegoCanto lineas={["Aaroi Dev — portafolio", "Familia Pliego · 2026"]} />
        <PliegoCorchete activo className="pliego-demo-crece">
          <PliegoBloque tone="hoja" pie="[ encuadrado ]">
            <PliegoPantalla layout="chat" label="Maqueta de chat encuadrada" />
          </PliegoBloque>
        </PliegoCorchete>
        <PliegoCanto lado="der" lineas={["✳ ✳ ✳", "hecho a mano"]} />
      </div>

      <style>{`.pliego-demo-crece { flex: 1 1 auto; min-width: 0; }`}</style>
    </div>
  ),
};

// -----------------------------------------------------------------------------

const DEMOS: (PliegoMenuItem & { layout: PliegoPantallaLayout; frase: string })[] = [
  {
    id: "tienda",
    label: "tienda online",
    kana: "商店",
    meta: "E-commerce · 3 a 4 semanas",
    layout: "tienda",
    frase: "Catálogo, carrito, pago real y un panel donde ves los pedidos entrar.",
  },
  {
    id: "panel",
    label: "panel de negocio",
    kana: "管理",
    meta: "Operaciones · 2 a 3 semanas",
    layout: "panel",
    frase: "Tus planillas dejan de ser planillas: una pantalla que dice cómo va el mes.",
  },
  {
    id: "agenda",
    label: "agenda de citas",
    kana: "予約",
    meta: "Reservas · 2 semanas",
    layout: "agenda",
    frase: "El cliente reserva solo, tú ves el hueco ocupado y nadie escribe a nadie.",
  },
  {
    id: "landing",
    label: "landing de campaña",
    kana: "宣伝",
    meta: "Marketing · 1 semana",
    layout: "landing",
    frase: "Una página que carga en un parpadeo y cuenta cuánta gente hizo qué.",
  },
  {
    id: "chat",
    label: "chat con documentos",
    kana: "対話",
    meta: "IA aplicada · 3 semanas",
    layout: "chat",
    frase: "Preguntas en tu idioma; responde con lo que dicen TUS documentos.",
    disabled: true,
  },
];

function CargadorDemo() {
  const [id, setId] = useState(DEMOS[0]!.id);
  const actual = DEMOS.find((d) => d.id === id) ?? DEMOS[0]!;

  return (
    <div className="pliego-scope" style={{ ...lamina, position: "relative", alignContent: "center" }}>
      <PliegoRuido reticula barrido />

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 5fr) minmax(0, 6fr)",
          gap: "clamp(1.5rem, 4vw, 4rem)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "grid", gap: "var(--ds-space-lg)" }}>
          <PliegoTitulo as="h1" sobre="Cargador de demos" kana="展示" bang>
            demos
          </PliegoTitulo>
          <PliegoFilete label="Elige uno" readout={`${DEMOS.length} discos`} marcas />
          <PliegoMenu
            items={DEMOS}
            label="Demos disponibles"
            value={id}
            onChange={setId}
            onSelect={(item) => window.alert(`Abrir ${item.label}`)}
          />
        </div>

        <div style={{ display: "grid", gap: "var(--ds-space-md)" }}>
          <PliegoCorchete activo tone="rosa">
            <PliegoBloque tone="hoja" ratio="16 / 10" pie={`[ ${actual.id} ]`}>
              <PliegoPantalla layout={actual.layout} label={`Maqueta de ${actual.label}`} />
            </PliegoBloque>
          </PliegoCorchete>

          <PliegoFicha titulo={actual.label} indice={actual.kana} kana={actual.kana}>
            <p>{actual.frase}</p>
          </PliegoFicha>

          <PliegoBarra
            value={DEMOS.indexOf(actual) + 1}
            max={DEMOS.length}
            label="Disco en el cargador"
            readout={`${String(DEMOS.indexOf(actual) + 1).padStart(2, "0")} / ${String(DEMOS.length).padStart(2, "0")}`}
          />
        </div>
      </div>
    </div>
  );
}

/** El montaje real: el menú manda sobre la pantalla, como un cargador de discos. */
export const Cargador: StoryObj = {
  render: () => <CargadorDemo />,
};
