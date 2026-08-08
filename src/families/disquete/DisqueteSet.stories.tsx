import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import DisqBadge from "./DisqBadge/DisqBadge";
import DisqBarcode from "./DisqBarcode/DisqBarcode";
import DisqButton from "./DisqButton/DisqButton";
import DisqDisk from "./DisqDisk/DisqDisk";
import type { DisqColor } from "./DisqDisk/DisqDisk";
import DisqEmblem from "./DisqEmblem/DisqEmblem";
import DisqLabel from "./DisqLabel/DisqLabel";
import DisqRows from "./DisqRows/DisqRows";
import DisqShelf from "./DisqShelf/DisqShelf";
import DisqSleeve from "./DisqSleeve/DisqSleeve";
import DisqStripes from "./DisqStripes/DisqStripes";
import DisqTag from "./DisqTag/DisqTag";
import DisqTitle from "./DisqTitle/DisqTitle";

const meta: Meta = {
  title: "Families/Disquete/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

// Contenido de muestra. Deliberadamente parecido a lo que la familia va a
// llevar de verdad —proyectos con su stack— y no "Lorem ipsum": una etiqueta
// se rompe con nombres largos y tecnologías de más, y eso hay que verlo aquí
// y no en producción.
const DISCOS: Array<{
  color: DisqColor;
  title: string;
  cells: [string, string, string];
  summary: string;
  items: string[];
  code: string;
  side: string;
}> = [
  {
    color: "indigo",
    title: "Aegis Canvas",
    cells: ["DS-01", "CARA A", "2S/HD"],
    summary: "Design system multi-marca headless-first con contrato de theming.",
    items: ["React 19", "TypeScript", "SCSS", "Storybook"],
    code: "0801 4419",
    side: "AEGIS CANVAS · DESIGN SYSTEM",
  },
  {
    color: "shell",
    title: "Aegis Plataforma",
    cells: ["INF-02", "CARA A", "2S/HD"],
    summary: "GitOps sobre Kubernetes bare-metal con cadena de suministro firmada.",
    items: ["Kubernetes", "ArgoCD", "Jenkins", "cosign", "Kyverno"],
    code: "1446 0002",
    side: "AEGIS · GITOPS PLATFORM",
  },
  {
    color: "magenta",
    title: "Portafolio v3",
    cells: ["WEB-03", "CARA B", "2S/HD"],
    summary: "Astro estático con el design system renderizado en build.",
    items: ["Astro", "React 19", "SCSS", "SEO"],
    code: "0003 1900",
    side: "PORTAFOLIO V3 · ASTRO",
  },
  {
    color: "teal",
    title: "MineServer",
    cells: ["LAB-04", "CARA B", "2S/DD"],
    summary: "Mobs con IA: director asíncrono, memoria vectorial y voz.",
    items: ["vLLM", "Redis", "pgvector", "Java"],
    code: "0004 7721",
    side: "MINESERVER · IA APLICADA",
  },
];

const Hoja = ({ children }: { children: React.ReactNode }) => (
  <div className="disquete-scope" style={{ minHeight: "100vh" }}>
    {children}
  </div>
);

/** La vista que resume la familia: el pliego con los cuatro colorways. */
export const Overview: StoryObj = {
  render: () => (
    <Hoja>
      <DisqShelf
        title="DISQUETE · MF2-HD · 8 CARAS"
        mark="globe"
        note="Proporción real 90×94 mm · la compuerta se abre al pasar por encima o con el foco de teclado"
      >
        {DISCOS.map((d) => (
          <DisqDisk key={d.title} color={d.color} href="#" format="MF2-HD">
            <DisqLabel
              title={d.title}
              cells={d.cells}
              summary={d.summary}
              items={d.items}
              code={d.code}
              side={d.side}
              badge={{ mark: "5", lines: ["LA PRODUCCIÓN", "SUPERIOR"] }}
              stripes
            />
          </DisqDisk>
        ))}
      </DisqShelf>
    </Hoja>
  ),
};

/** Los seis colorways del plástico, con la etiqueta reducida al titular. */
export const Colorways: StoryObj = {
  render: () => (
    <Hoja>
      <DisqShelf title="COLORWAYS" min="14rem">
        {(["shell", "indigo", "magenta", "teal", "coral", "ink"] as DisqColor[]).map((color) => (
          <DisqDisk key={color} color={color}>
            <DisqLabel
              title={color}
              cells={["TONO", color.slice(0, 3).toUpperCase(), "—"]}
              code={`00 ${color.length}${color.charCodeAt(0)}`}
              stripes
            />
          </DisqDisk>
        ))}
      </DisqShelf>
    </Hoja>
  ),
};

/** La funda de plástico de la referencia 3, con y sin reflejo. */
export const Fundas: StoryObj = {
  render: () => (
    <Hoja>
      <DisqShelf title="FUNDAS DE PLÁSTICO" min="17rem">
        <DisqSleeve>
          <DisqDisk color="indigo" href="#">
            <DisqLabel
              title="Tracklist"
              cells={["09", "CARA A", "2S/HD"]}
              summary="Con reflejo: la funda apoya su brillo en el color del disco."
              items={["Connections", "Fake true", "Logic lovers", "Korrupted"]}
              code="0009 5512"
              badge={{ mark: "9", lines: ["ORIGINAL", "CONNECTION"] }}
              stripes
            />
          </DisqDisk>
        </DisqSleeve>

        <DisqSleeve matte>
          <DisqDisk color="shell" href="#">
            <DisqLabel
              title="R-284"
              cells={["FIDELITY", "1986", "2S/DD"]}
              summary="Reflejo apagado, para cuando hay muchas fundas juntas."
              code="0284 1986"
              badge={{ mark: "5", lines: ["FIDELITY", "DISQUETTE"] }}
              stripes
            />
          </DisqDisk>
        </DisqSleeve>
      </DisqShelf>
    </Hoja>
  ),
};

function Elegible() {
  const [elegido, setElegido] = useState("Aegis Canvas");
  return (
    <DisqShelf
      title="ELEGIR UN DISQUETE"
      note={`Insertado: ${elegido} · la compuerta del elegido queda abierta`}
      min="15rem"
    >
      {DISCOS.map((d) => (
        <DisqDisk
          key={d.title}
          color={d.color}
          selected={elegido === d.title}
          onClick={() => setElegido(d.title)}
        >
          <DisqLabel title={d.title} cells={d.cells} code={d.code} stripes />
        </DisqDisk>
      ))}
    </DisqShelf>
  );
}

/** Estado controlado: el disquete insertado mantiene la compuerta abierta. */
export const Seleccion: StoryObj = {
  render: () => (
    <Hoja>
      <Elegible />
    </Hoja>
  ),
};

/** Las piezas por separado, para verlas fuera de la etiqueta. */
export const Piezas: StoryObj = {
  render: () => (
    <Hoja>
      <div
        style={{
          display: "grid",
          gap: "2.5rem",
          padding: "clamp(1rem, 4vw, 3rem)",
          alignContent: "start",
        }}
      >
        <section style={{ display: "grid", gap: "0.75rem" }}>
          <DisqTitle as="h2" size="hero" cells={["DISQUETE", "MF2-HD", "OFL 1.1"]} emblem="disc">
            Geist negro
          </DisqTitle>
          <p style={{ color: "var(--disq-label)", opacity: 0.6, maxWidth: "48ch", margin: 0 }}>
            <span style={{ fontFamily: "var(--disq-font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
              Titular con tracking negativo (-0.03em) y micro-texto en el mono de la misma
              superfamilia. El contraste entre los dos tamaños es la voz de DISQUETE.
            </span>
          </p>
        </section>

        {/* Las piezas de etiqueta se ven sobre papel: fuera de él, la tinta
            oscura de la familia sería invisible sobre el pliego. */}
        <section
          style={{
            display: "grid",
            gap: "1.25rem",
            padding: "1.5rem",
            borderRadius: "var(--disq-radius)",
            background: "var(--disq-label)",
          }}
        >
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
            <DisqTag>Kubernetes</DisqTag>
            <DisqTag tone="ink">ArgoCD</DisqTag>
            <DisqTag tone="indigo">cosign</DisqTag>
          </div>

          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "flex-end" }}>
            <DisqBadge mark="5" lines={["LA PRODUCCIÓN", "SUPERIOR"]} />
            <DisqBadge mark="HD" lines={["DOBLE CARA", "ALTA DENSIDAD"]} />
            <DisqBarcode code="1446 0002" />
          </div>

          <DisqRows items={["Connections", "Fake true", "Logic lovers", "Korrupted", "Firestarting"]} />

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <DisqEmblem shape="globe" size={2.6} />
            <DisqEmblem shape="disc" size={2.6} />
            <DisqEmblem shape="hazard" size={2.6} />
          </div>

          <DisqStripes height={2} step />

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <DisqButton variant="solid">Insertar</DisqButton>
            <DisqButton variant="solid" tone="indigo">
              Formatear
            </DisqButton>
            <DisqButton variant="outline">Expulsar</DisqButton>
            <DisqButton variant="solid" disabled>
              Protegido
            </DisqButton>
          </div>
        </section>
      </div>
    </Hoja>
  ),
};
