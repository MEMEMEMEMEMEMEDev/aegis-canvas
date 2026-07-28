import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import DomoButton from "../DomoButton/DomoButton";
import DomoDeck, { DomoSlide } from "../DomoDeck/DomoDeck";
import DomoField from "../DomoField/DomoField";
import DomoGauge from "../DomoGauge/DomoGauge";
import DomoInput from "../DomoInput/DomoInput";
import DomoPrompt from "../DomoPrompt/DomoPrompt";
import DomoReadout from "../DomoReadout/DomoReadout";
import DomoSheet from "../DomoSheet/DomoSheet";
import DomoStatus from "../DomoStatus/DomoStatus";
import DomoStepper from "../DomoStepper/DomoStepper";
import DomoType from "../DomoType/DomoType";
import "../domo.scss";
import "./entrada.scss";

const meta: Meta = {
  title: "Families/Domo/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

const SALUDO =
  "Hola. Soy la AI de este portafolio. Marcelo construye webs 3D, shaders e interfaces vivas — te muestro su trabajo un slide a la vez. También puedes preguntarme lo que quieras.";

// Respuestas enlatadas del demo: rotan con cada pregunta (aquí iría el
// modelo de verdad en el portafolio final).
const RESPUESTAS = [
  "Buena pregunta. La versión corta: sí, sabe hacerlo — la larga está en los proyectos →",
  "Eso lo resolvió en el proyecto 02. Te llevo con la flecha de abajo →",
  "Anotado. Se lo paso a Marcelo apenas envíes el brief del último slide.",
];

const PROYECTOS = [
  {
    indice: "01",
    nombre: "Reactor",
    desc: "Escena three.js en tiempo real: shaders GLSL propios, post-proceso y 60fps hasta en un teléfono con miedo.",
    anio: "2026",
    rol: "Dev + Art",
    stack: "three.js",
    carga: 92,
    arte: ["#aeb9a4", "#79836f"],
  },
  {
    indice: "02",
    nombre: "Telar OS",
    desc: "Portafolio-sistema operativo de una sola pantalla: ventanas, reloj vivo y tipografía tejida en SCSS puro.",
    anio: "2026",
    rol: "Diseño + Dev",
    stack: "React",
    carga: 87,
    arte: ["#c9c4ae", "#8d8672"],
  },
  {
    indice: "03",
    nombre: "Domo Brief",
    desc: "Formulario-instrumento operable por AI: cada control es controlable desde fuera, cero scroll, un solo panel.",
    anio: "2026",
    rol: "UX + Dev",
    stack: "React + AI",
    carga: 95,
    arte: ["#b7c2b9", "#6f7d74"],
  },
];

function Entrada() {
  const [slide, setSlide] = useState(0);
  const [voz, setVoz] = useState(SALUDO);
  const [nPregunta, setNPregunta] = useState(0);
  const [briefAbierto, setBriefAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [presupuesto, setPresupuesto] = useState(3000);
  const [enviado, setEnviado] = useState(false);

  const pregunta = (t: string) => {
    void t; // demo: la pregunta real iría al modelo
    setVoz(RESPUESTAS[nPregunta % RESPUESTAS.length] ?? SALUDO);
    setNPregunta((n) => n + 1);
  };

  const puedeEnviar = nombre.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="domo-scope de">
      <header className="de__hud">
        <span>
          Domo OS<span className="de__hud-sep">◆</span>Portafolio
        </span>
        <span className="de__ai">AI online</span>
      </header>

      <DomoDeck label="portafolio" index={slide} onIndexChange={setSlide}>
        <DomoSlide title="Entrada">
          <div className="de-hero">
            <span className="de-hero__kicker">◇ Sistema de bienvenida</span>
            <h1 className="de-hero__title">Hola, humano.</h1>
            <DomoType className="de-hero__voice" text={voz} speed={18} />
            <div className="de-hero__actions">
              <DomoButton onClick={() => setSlide(1)}>Ver proyectos →</DomoButton>
              <DomoButton variant="outline" onClick={() => setSlide(PROYECTOS.length + 1)}>
                Brief directo
              </DomoButton>
            </div>
            <DomoPrompt label="preguntar a la AI" onSubmit={pregunta} />
          </div>
        </DomoSlide>

        {PROYECTOS.map((p) => (
          <DomoSlide key={p.indice} title={p.nombre}>
            <div className="de-proy">
              <div className="de-proy__info">
                <span className="de-proy__index">{p.indice}</span>
                <h2 className="de-proy__nombre">{p.nombre}</h2>
                <p className="de-proy__desc">{p.desc}</p>
                <div className="de-proy__datos">
                  <DomoReadout label="Año" value={p.anio} />
                  <DomoReadout label="Rol" value={p.rol} />
                  <DomoReadout label="Stack" value={p.stack} />
                </div>
                <div className="de-hero__actions">
                  <DomoButton variant="outline">Ver caso ↗</DomoButton>
                </div>
              </div>
              <figure className="de-proy__art" style={{ margin: 0 }}>
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    background: `radial-gradient(ellipse 80% 70% at 70% 25%, ${p.arte[0]} 0%, transparent 70%),
                      linear-gradient(160deg, ${p.arte[0]} 0%, ${p.arte[1]} 100%)`,
                  }}
                >
                  <DomoGauge value={p.carga} label={`performance ${p.nombre}`} size={84} />
                </div>
              </figure>
            </div>
          </DomoSlide>
        ))}

        <DomoSlide title="Contacto">
          <div className="de-fin">
            <span className="de-hero__kicker">◇ Último slide</span>
            <h2 className="de-hero__title">¿Proyecto en mente?</h2>
            <DomoType
              className="de-hero__voice"
              text={
                enviado
                  ? "Brief recibido. Marcelo te escribe en menos de 24h. Fin de la transmisión ◆"
                  : "Ajusta el presupuesto y abre el brief — son dos campos, prometido. Yo me encargo del resto."
              }
              speed={18}
            />
            <DomoStepper
              label="presupuesto"
              size="lg"
              value={presupuesto}
              onChange={setPresupuesto}
              step={500}
              min={1000}
              max={20000}
              format={(n) => `$${(n / 1000).toFixed(1)}k`}
              disabled={enviado}
            />
            <div className="de-hero__actions">
              <DomoButton size="lg" disabled={enviado} onClick={() => setBriefAbierto(true)}>
                {enviado ? "Enviado ✓" : "Abrir brief →"}
              </DomoButton>
              <DomoButton variant="ghost" onClick={() => setSlide(0)}>
                ← Volver al inicio
              </DomoButton>
            </div>
          </div>
        </DomoSlide>
      </DomoDeck>

      <DomoSheet
        open={briefAbierto}
        onClose={() => setBriefAbierto(false)}
        title="Brief exprés"
        footer={
          <DomoStatus busy={!puedeEnviar}>
            {puedeEnviar
              ? `Listo: $${(presupuesto / 1000).toFixed(1)}k de presupuesto`
              : "Faltan nombre y email"}
          </DomoStatus>
        }
      >
        <DomoField label="Nombre" required>
          <DomoInput
            placeholder="Ada Lovelace"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </DomoField>
        <DomoField label="Email" required>
          <DomoInput
            type="email"
            placeholder="ada@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DomoField>
        <DomoButton
          disabled={!puedeEnviar}
          onClick={() => {
            setEnviado(true);
            setBriefAbierto(false);
          }}
        >
          Enviar →
        </DomoButton>
      </DomoSheet>
    </div>
  );
}

export const Entrada_: StoryObj = {
  name: "Entrada",
  render: () => <Entrada />,
};
