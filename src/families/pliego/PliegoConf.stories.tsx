import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import PliegoCampo from "./PliegoCampo/PliegoCampo";
import PliegoEstado from "./PliegoEstado/PliegoEstado";
import PliegoEtiqueta from "./PliegoEtiqueta/PliegoEtiqueta";
import PliegoSubtitulos from "./PliegoSubtitulos/PliegoSubtitulos";
import type { PliegoSubtituloLinea } from "./PliegoSubtitulos/PliegoSubtitulos";
import PliegoTabla from "./PliegoTabla/PliegoTabla";

// Las piezas de conf (subtítulos y traducción en vivo para conferencias).
// Los textos son de una charla real de Nerdearla 2025 (midudev), tal como
// los devolvió el motor: con sus errores, que también son parte de lo que
// esta vista tiene que aguantar.

const meta: Meta = {
  title: "Families/Pliego/Conf",
  parameters: { layout: "fullscreen" },
};
export default meta;

const lamina = {
  minHeight: "100vh",
  padding: "clamp(1rem, 4vw, 3rem)",
  display: "grid",
  gap: "2rem",
  alignContent: "start" as const,
};

const CHARLA = [
  "Bueno, este soy yo, pero vengo a hablaros de un montón de cosas.",
  "No sé cómo lo hace, pero sobrevive.",
  "Soy Miguel Ángel Durán, más de 15 años de experiencia desarrollando software.",
  "Tengo una comunidad de más de 3 millones de maravillosas personas.",
  "Muchas, muchas, muchas gracias. Gracias de corazón, de verdad.",
];

function lineas(n: number): PliegoSubtituloLinea[] {
  return CHARLA.slice(0, n).map((texto, i) => ({ id: `l${i}`, texto }));
}

export const Subtitulos: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={lamina}>
      <PliegoSubtitulos label="Subtítulos en español" idioma="es" lineas={lineas(3)}
        provisional="Tengo una comunidad de más de" />
      <PliegoSubtitulos label="Subtítulos en español" idioma="es" tono="tinta" escala="enorme" lineas={lineas(4)} maxLineas={2} />
      <PliegoSubtitulos label="Subtítulos en español" idioma="es" lineas={[]}
        vacio="Esperando la primera frase de la sala" />
    </div>
  ),
};

// El overlay de OBS/vMix: fondo transparente sobre cualquier video. El
// damero hace de "video" para ver que se lee sobre claro y sobre oscuro.
export const OverlayOBS: StoryObj = {
  render: () => (
    <div
      className="pliego-scope"
      style={{
        ...lamina,
        alignContent: "end",
        background: "repeating-conic-gradient(#222 0 25%, #ddd 0 50%) 0 0 / 80px 80px",
      }}
    >
      <PliegoSubtitulos label="Subtítulos en inglés" idioma="en" tono="transparente" escala="enorme" maxLineas={2}
        lineas={[{ id: "a", texto: "I don't know how he does it, but he survives." },
                 { id: "b", texto: "I am Miguel Ángel Durán, more than 15 years developing software." }]} />
    </div>
  ),
};

// Una sala que va hablando: una línea nueva cada 2,5 s, con su provisional.
function SalaEnVivo() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setN((x) => (x % CHARLA.length) + 1), 2500);
    return () => clearInterval(t);
  }, []);
  const siguiente = CHARLA[n % CHARLA.length] ?? "";
  return (
    <PliegoSubtitulos label="Subtítulos en español" idioma="es" lineas={lineas(n)}
      provisional={siguiente.split(" ").slice(0, 4).join(" ")} />
  );
}

export const EnVivo: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={lamina}>
      <SalaEnVivo />
    </div>
  ),
};

export const Campo: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={{ ...lamina, maxWidth: 520 }}>
      <PliegoCampo etiqueta="Nombre de la sala" placeholder="Auditorio principal" ayuda="Lo ve la audiencia al elegir sala." />
      <PliegoCampo etiqueta="Clave del operador" type="password" defaultValue="xxxx" error="Usuario o clave incorrectos." />
    </div>
  ),
};

export const Estados: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={{ ...lamina, gap: "1rem" }}>
      <PliegoEstado estado="bien">motor en GPU</PliegoEstado>
      <PliegoEstado estado="aviso">motor degradado: se está desplegando</PliegoEstado>
      <PliegoEstado estado="mal">GPU caída: salas en Gemini</PliegoEstado>
      <PliegoEstado estado="sinver">sin latido del motor</PliegoEstado>
    </div>
  ),
};

export const TablaDelPanel: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={lamina}>
      <PliegoTabla
        titulo="Salas"
        columnas={[
          { clave: "sala", titulo: "Sala" },
          { clave: "estado", titulo: "Estado" },
          { clave: "motor", titulo: "Motor" },
          { clave: "p50", titulo: "Latencia p50", alinear: "der" },
          { clave: "p95", titulo: "p95", alinear: "der" },
          { clave: "saltados", titulo: "Saltados", alinear: "der" },
        ]}
        filas={[
          { id: "a", celdas: { sala: "Auditorio", estado: <PliegoEstado estado="bien">en vivo</PliegoEstado>,
            motor: <PliegoEtiqueta tone="linea" size="sm">gpu</PliegoEtiqueta>, p50: "0,4 s", p95: "0,6 s", saltados: 0 } },
          { id: "b", marcada: true, celdas: { sala: "Sala 2", estado: <PliegoEstado estado="mal">sin audio hace 40 s</PliegoEstado>,
            motor: <PliegoEtiqueta tone="linea" size="sm">gpu</PliegoEtiqueta>, p50: "0,5 s", p95: "0,9 s", saltados: 3 } },
          { id: "c", celdas: { sala: "Demo · midudev", estado: <PliegoEstado estado="sinver">nadie mirando</PliegoEstado>,
            motor: <PliegoEtiqueta tone="rosa" size="sm">demo</PliegoEtiqueta>, p50: "—", p95: "—", saltados: 0 } },
        ]}
      />
      <PliegoTabla titulo="Salas (sin ninguna)" columnas={[{ clave: "sala", titulo: "Sala" }]} filas={[]}
        vacio="Todavía no hay salas. Creá la primera arriba." />
    </div>
  ),
};
