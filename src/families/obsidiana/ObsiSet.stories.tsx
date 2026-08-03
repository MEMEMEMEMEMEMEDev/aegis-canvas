import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ObsiAnillo from "./ObsiAnillo/ObsiAnillo";
import ObsiBoton from "./ObsiBoton/ObsiBoton";
import ObsiDato from "./ObsiDato/ObsiDato";
import ObsiMuro, { ObsiEsquirla } from "./ObsiMuro/ObsiMuro";
import ObsiNav from "./ObsiNav/ObsiNav";
import ObsiPlaca from "./ObsiPlaca/ObsiPlaca";

// Arte de muestra: gradientes propios (nada de imágenes de terceros).
const MUESTRAS = [
  {
    art: "radial-gradient(120% 90% at 20% 10%, #35b6ff 0%, #14406b 45%, #10141b 100%)",
    eyebrow: "design system",
    title: "Ocho pieles, un contrato",
  },
  {
    art: "radial-gradient(120% 90% at 80% 20%, #7ae2c3 0%, #1c5a52 50%, #10141b 100%)",
    eyebrow: "astro + seo",
    title: "El sitio que Google sí ve",
  },
  {
    art: "radial-gradient(120% 90% at 40% 80%, #e0316e 0%, #5a1c3c 50%, #10141b 100%)",
    eyebrow: "gitops",
    title: "Push a main y a producción",
  },
  {
    art: "radial-gradient(120% 90% at 60% 30%, #f5b52e 0%, #6b4a14 50%, #10141b 100%)",
    eyebrow: "experimento",
    title: "Sala de demos",
  },
];

const meta: Meta = {
  title: "Families/Obsidiana/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

function Overview_() {
  const [activa, setActiva] = useState(0);
  return (
    <div
      className="obsidiana-scope"
      style={{ minHeight: "100vh", display: "grid", gap: "var(--ds-space-2xl)", alignContent: "start", paddingBottom: "3rem" }}
    >
      <ObsiNav
        brand="AEGIS//OBSIDIANA"
        links={[
          { label: "Galería", href: "#", active: true },
          { label: "Sistema", href: "#" },
          { label: "Contacto", href: "#" },
        ]}
        action={<ObsiBoton size="sm">Contratar</ObsiBoton>}
        sticky={false}
      />

      <div style={{ padding: "0 2.5rem", display: "grid", gap: "var(--ds-space-2xl)" }}>
        <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap" }}>
          <ObsiBoton>Ver proyectos</ObsiBoton>
          <ObsiBoton variant="outline">Caso de estudio</ObsiBoton>
          <ObsiBoton variant="ghost">Descartar</ObsiBoton>
          <ObsiBoton disabled>Off</ObsiBoton>
        </div>

        <ObsiMuro height="320px">
          {MUESTRAS.map((m, i) => (
            <ObsiEsquirla
              key={m.title}
              art={m.art}
              eyebrow={m.eyebrow}
              title={m.title}
              active={activa === i}
              onSelect={() => setActiva(i)}
            />
          ))}
        </ObsiMuro>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--ds-space-lg)", alignItems: "start" }}>
          <ObsiPlaca eyebrow="sección 02" title="La placa estándar">
            Eyebrow mono, título display y base sesgada. Es el encabezado de toda
            sección y ficha de la galería.
          </ObsiPlaca>
          <ObsiPlaca raised eyebrow="ficha" title="Sobre panel tallado">
            La variante `raised` la monta sobre carbón con bisel — para fichas
            que conviven con el muro.
          </ObsiPlaca>
        </div>

        <div style={{ display: "flex", gap: "var(--ds-space-2xl)", flexWrap: "wrap", alignItems: "flex-end" }}>
          <ObsiDato value="9" label="familias" accent />
          <ObsiDato value="31/36" label="sin JS al navegador" />
          <ObsiDato value="0" label="kubectl a mano" />
        </div>

        <div style={{ display: "flex", gap: "var(--ds-space-xl)", flexWrap: "wrap" }}>
          <ObsiAnillo label="Marcelo H." sublabel="design systems" initials="MH" active />
          <ObsiAnillo label="AEGIS" sublabel="plataforma" initials="AE" arc={0.5} />
          <ObsiAnillo label="Foundation" sublabel="canvas" initials="FD" arc={0.9} />
        </div>
      </div>
    </div>
  );
}

export const Overview: StoryObj = { render: () => <Overview_ /> };
