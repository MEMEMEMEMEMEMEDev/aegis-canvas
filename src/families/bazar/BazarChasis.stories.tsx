import type { Meta, StoryObj } from "@storybook/react-vite";
import BazarFondo from "./BazarFondo/BazarFondo";
import BazarMarco from "./BazarMarco/BazarMarco";
import BazarNivel from "./BazarNivel/BazarNivel";
import BazarRadar from "./BazarRadar/BazarRadar";
import BazarTira from "./BazarTira/BazarTira";

const meta: Meta = {
  title: "Families/Bazar/Chasis",
  parameters: { layout: "fullscreen" },
};
export default meta;

const TELEMETRIA = [
  "SESIÓN ABIERTA",
  "SCL · GMT-3",
  "BUILD 2026.04",
  "GITOPS · KUBERNETES",
  "DESPLIEGUES FIRMADOS",
  "SIN INCIDENTES",
];

/**
 * El mueble de la consola, junto: marco, tira, radar y nivel sobre el telón
 * en modo `reloj` — el que se mueve solo porque la pantalla no scrollea.
 */
export const Chasis: StoryObj = {
  render: () => (
    <div
      className="bazar-scope"
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(1rem, 3vw, 2.5rem)",
        display: "grid",
        gridTemplateRows: "auto minmax(0, 1fr) auto",
        gap: "1rem",
      }}
    >
      <BazarFondo kana="経歴" palabra="EXPEDIENTE" motor="reloj" />

      <BazarTira items={TELEMETRIA} />

      <BazarMarco rotulo="Pantalla 01 · Agente" pie="経歴 / 04">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "2rem",
            alignItems: "center",
            padding: "clamp(1rem, 3vw, 2rem)",
            flex: 1,
          }}
        >
          <div style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
            <BazarNivel valor={4} unidad="años en producción" rango="Fullstack · DevOps" kana="経歴" />
            <BazarNivel
              valor={146}
              unidad="gates de validación en la plataforma"
              rango="Aegis"
              tone="morado"
            />
          </div>

          <div style={{ display: "grid", gap: "1.5rem", justifyItems: "center" }}>
            <BazarRadar label="Operando" readout="SCL" ecos={3} size={9} />
            <BazarRadar label="Canal" readout="24/7" ecos={2} size={6} tone="morado" />
          </div>
        </div>
      </BazarMarco>

      <BazarTira items={TELEMETRIA} sentido="der" tone="rosa" duracion={56} />
    </div>
  ),
};
