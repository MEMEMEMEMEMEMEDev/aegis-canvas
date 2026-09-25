import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import qrcode from "qrcode-generator";
import PliegoCartel from "./PliegoCartel/PliegoCartel";
import PliegoEnVivo from "./PliegoEnVivo/PliegoEnVivo";
import PliegoEtiqueta from "./PliegoEtiqueta/PliegoEtiqueta";
import PliegoOnda from "./PliegoOnda/PliegoOnda";
import PliegoPregunta from "./PliegoPregunta/PliegoPregunta";
import PliegoQR from "./PliegoQR/PliegoQR";
import PliegoReacciones from "./PliegoReacciones/PliegoReacciones";
import type { PliegoReaccionFlotante } from "./PliegoReacciones/PliegoReacciones";
import PliegoSubtitulos from "./PliegoSubtitulos/PliegoSubtitulos";
import PliegoTicker from "./PliegoTicker/PliegoTicker";
import PliegoBoton from "./PliegoBoton/PliegoBoton";

// La sala viva de conf: lo que se mueve sin que nadie toque nada, y lo que la
// audiencia toca. Cada animación se apaga con prefers-reduced-motion.

const meta: Meta = {
  title: "Families/Pliego/Sala",
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

function matriz(texto: string): boolean[][] {
  const q = qrcode(0, "M");
  q.addData(texto);
  q.make();
  const n = q.getModuleCount();
  return Array.from({ length: n }, (_, y) => Array.from({ length: n }, (_, x) => q.isDark(y, x)));
}

// Un nivel de voz que sube y baja como una persona hablando, con pausas.
function useVozSimulada() {
  const [db, setDb] = useState(-70);
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 1;
      const pausa = t % 40 > 32;
      setDb(pausa ? -68 : -32 + Math.sin(t / 2.3) * 9 + Math.random() * 6);
    }, 120);
    return () => clearInterval(id);
  }, []);
  return db;
}

export const EnVivoYOnda: StoryObj = {
  render: function Render() {
    const db = useVozSimulada();
    return (
      <div className="pliego-scope" style={lamina}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <PliegoEnVivo estado="vivo" />
          <PliegoEnVivo estado="vivo" grabado />
          <PliegoEnVivo estado="quieto" />
          <PliegoEnVivo estado="sinver" />
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <PliegoOnda nivel={db} label={`Nivel de la sala: ${Math.round(db)} dBFS`} />
          <PliegoOnda nivel={db} tone="rosa" barras={24} />
          <PliegoOnda nivel={-80} />
        </div>
      </div>
    );
  },
};

export const Cartel: StoryObj = {
  render: () => (
    <div className="pliego-scope">
      <PliegoCartel
        sobre="sala 2 · auditorio"
        titulo="Programming is dead"
        idiomas="español → english"
        estado={<PliegoEnVivo estado="vivo" />}
        url="conf.aaroidev.com/s/demo-b"
        qr={<PliegoQR matriz={matriz("https://conf.aaroidev.com/sala/?s=demo-b&l=en")} label="QR a los subtítulos de la sala" lado={200} />}
        subtitulo={
          <PliegoSubtitulos label="Subtítulos en inglés" idioma="en" escala="enorme" maxLineas={1}
            lineas={[{ id: "a", texto: "I don't know how he does it, but he survives." }]} />
        }
      />
    </div>
  ),
};

export const Ticker: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={lamina}>
      <PliegoTicker
        label="Estado de las salas"
        items={[
          { id: "a", contenido: <>auditorio <PliegoEtiqueta tone="rosa" size="sm">en vivo</PliegoEtiqueta> english → español</> },
          { id: "b", contenido: <>sala 2 <PliegoEtiqueta tone="linea" size="sm">sin audio</PliegoEtiqueta></> },
          { id: "c", contenido: <>demo · midudev <PliegoEtiqueta tone="tinta" size="sm">grabado</PliegoEtiqueta> español → english</> },
          { id: "d", contenido: <>32 salas medidas en una rtx 5070</> },
        ]}
      />
    </div>
  ),
};

const OPCIONES = [
  { id: "aplauso", glifo: "👏", label: "aplauso" },
  { id: "fuego", glifo: "🔥", label: "fuego" },
  { id: "duda", glifo: "?", label: "tengo una duda" },
  { id: "noseentiende", glifo: "!", label: "no se entiende" },
];

export const Reacciones: StoryObj = {
  render: function Render() {
    const [flotando, setFlotando] = useState<PliegoReaccionFlotante[]>([]);
    const [conteos, setConteos] = useState<Record<string, number>>({ aplauso: 12 });
    const n = useRef(0);
    const reaccionar = (id: string) => {
      const o = OPCIONES.find((x) => x.id === id);
      if (!o) return;
      const key = `r${n.current++}`;
      setFlotando((f) => [...f, { key, glifo: o.glifo, x: Math.random() }]);
      setConteos((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
      setTimeout(() => setFlotando((f) => f.filter((x) => x.key !== key)), 1900);
    };
    return (
      <div className="pliego-scope" style={{ ...lamina, alignContent: "end", minHeight: "70vh" }}>
        <PliegoReacciones opciones={OPCIONES} onReaccionar={reaccionar} conteos={conteos} flotando={flotando} />
      </div>
    );
  },
};

export const Preguntas: StoryObj = {
  render: function Render() {
    const [votos, setVotos] = useState(7);
    const [votada, setVotada] = useState(false);
    return (
      <div className="pliego-scope" style={{ ...lamina, maxWidth: 640, gap: 0 }}>
        <PliegoPregunta texto="¿El modelo corre también en una GPU más chica, tipo una 3060?" votos={votos} votada={votada}
          onVotar={() => { setVotada(!votada); setVotos((v) => v + (votada ? -1 : 1)); }} cuando="hace 2 min" />
        <PliegoPregunta texto="¿Cómo manejan los nombres propios en la traducción?" votos={3} onVotar={() => {}} cuando="hace 5 min" />
        <PliegoPregunta texto="¿Qué pasa si se corta la luz?" votos={11} estado="respondida" />
        <PliegoPregunta texto="Una pregunta recién llegada que el panel todavía no aprobó." votos={0} estado="pendiente"
          cuando="ahora"
          acciones={<>
            <PliegoBoton size="sm" tone="rosa">publicar</PliegoBoton>
            <PliegoBoton size="sm" variant="outline">descartar</PliegoBoton>
          </>} />
      </div>
    );
  },
};

export const QR: StoryObj = {
  render: () => (
    <div className="pliego-scope" style={lamina}>
      <PliegoQR matriz={matriz("https://conf.aaroidev.com/sala/?s=demo-a&l=es")} label="QR a los subtítulos de la sala demo" />
    </div>
  ),
};
