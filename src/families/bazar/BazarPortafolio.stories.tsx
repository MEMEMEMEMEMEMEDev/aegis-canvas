import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import BazarAgente from "./BazarAgente/BazarAgente";
import BazarBarcode from "./BazarBarcode/BazarBarcode";
import BazarDossier from "./BazarDossier/BazarDossier";
import BazarFondo from "./BazarFondo/BazarFondo";
import BazarInventario from "./BazarInventario/BazarInventario";
import BazarMedidor from "./BazarMedidor/BazarMedidor";
import BazarResalte from "./BazarResalte/BazarResalte";
import BazarRoster from "./BazarRoster/BazarRoster";
import BazarSticker from "./BazarSticker/BazarSticker";

// =============================================================================
// BAZAR · Portafolio → Completo.
//
// La vista real de la familia: la pantalla de selección de agente que viste
// el mundo SOBRE MÍ del portafolio. Es la mitad "pantalla" de BAZAR —
// deliberadamente SIN BazarChrome, porque el navegador ficticio es lo que
// hacía que una pantalla de juego se sintiera una página web.
//
// El contenido de muestra es el real del portafolio: si una descripción de
// cargo rompe el dossier o un nombre largo desborda el mazo, tiene que
// verse acá y no en producción.
// =============================================================================

const meta: Meta = {
  title: "Families/Bazar/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

const AGENTES = [
  {
    id: "independiente",
    kana: "独立",
    nombre: "Independiente",
    meta: "MAY 2025 · HOY",
    rol: "Desarrollador Fullstack · clientes propios",
    firma: "SOLO",
    texto: (
      <p>
        Desarrollo y operación <BazarResalte>end-to-end</BazarResalte> para clientes pyme:
        sitios, apps y ecommerce en producción sobre{" "}
        <BazarResalte>Cloudflare Workers/Pages</BazarResalte> e infraestructura GitOps
        propia.
      </p>
    ),
  },
  {
    id: "orbis",
    kana: "軌道",
    nombre: "Orbis Data",
    meta: "MAR · MAY 2025",
    rol: "Consultor de Infraestructura y CI/CD",
    firma: "ORBIS",
    texto: (
      <p>
        Consultoría en infraestructura y pipelines CI/CD.{" "}
        <BazarResalte>La plataforma abrió la puerta antes que el CV.</BazarResalte>
      </p>
    ),
  },
  {
    id: "scotiabank",
    kana: "銀行",
    nombre: "Scotiabank Chile",
    meta: "ABR 2022 · MAR 2025",
    rol: "Fullstack Developer · vía Mobdev",
    firma: "BANCO",
    texto: (
      <p>
        Migración de la web principal del banco a{" "}
        <BazarResalte>microfrontends (Module Federation)</BazarResalte>, a producción sin
        incidentes mayores. Backend en Java sobre BFFs.
      </p>
    ),
  },
];

/** La pantalla completa: mazo, carta en vitrina, dossier, HUD e inventario. */
export const Completo: StoryObj = {
  render: function Pantalla() {
    const [elegido, setElegido] = useState(AGENTES[0]!.id);
    const agente = AGENTES.find((a) => a.id === elegido) ?? AGENTES[0]!;
    const indice = AGENTES.findIndex((a) => a.id === agente.id);

    return (
      <div
        className="bazar-scope"
        style={{ position: "relative", minHeight: "100vh", padding: "clamp(1rem, 4vw, 2.5rem)" }}
      >
        <BazarFondo kana="経歴" palabra="AGENTE" />

        <div
          style={{
            position: "relative",
            display: "grid",
            gap: "1.6rem",
            maxWidth: "68rem",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <BazarSticker tone="rosa">Self-hosted · en producción</BazarSticker>
            <BazarBarcode code="ABR 2022" angle={3} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.7fr)",
              gap: "1.6rem",
              alignItems: "start",
            }}
          >
            <BazarRoster
              label="Paradas de la trayectoria"
              items={AGENTES}
              value={elegido}
              onChange={setElegido}
              panelId="bazar-demo"
            />

            <div
              style={{ display: "grid", gap: "1rem" }}
              id={`bazar-demo-${agente.id}`}
              role="tabpanel"
              aria-labelledby={`bazar-demo-tab-${agente.id}`}
            >
              <BazarAgente
                kana={agente.kana}
                nombre={agente.nombre}
                as="h2"
                rol={agente.rol}
                indice={indice + 1}
                total={AGENTES.length}
                aviso="LEER EL MANUAL CON ATENCIÓN"
                micro={agente.meta}
                firma={agente.firma}
                tilt
                activo
              >
                <BazarDossier nombre={agente.nombre} kana={agente.kana} meta={agente.meta}>
                  {agente.texto}
                </BazarDossier>
              </BazarAgente>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(9rem, 1fr))",
              gap: "0.6rem",
            }}
          >
            <BazarMedidor valor="4" label="años de experiencia" />
            <BazarMedidor valor="146" label="gates de validación" tone="morado" />
            <BazarMedidor valor="100" sufijo="%" label="despliegues firmados" ratio={1} />
            <BazarMedidor valor="4" label="clientes en producción" tone="morado" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
              gap: "1.2rem",
            }}
          >
            <BazarInventario
              titulo="Frontend"
              as="h3"
              kana="フロント"
              sub="Lo que toca el usuario"
              items={["React", "TypeScript", "Astro", "Next", "Module Federation", "CSS avanzado"]}
              rotate={-1}
            />
            <BazarInventario
              titulo="Infra & DevOps"
              as="h3"
              kana="土台"
              sub="Donde corre todo"
              tone="morado"
              items={["Kubernetes (K3s)", "ArgoCD", "Jenkins", "Ansible", "GCP"]}
              casillas={6}
              rotate={1}
            />
          </div>
        </div>
      </div>
    );
  },
};
