import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { CSSProperties } from "react";
import DomoButton from "./DomoButton/DomoButton";
import DomoCut from "./DomoCut/DomoCut";
import DomoDeck, { DomoSlide } from "./DomoDeck/DomoDeck";
import DomoField from "./DomoField/DomoField";
import DomoGlitch from "./DomoGlitch/DomoGlitch";
import DomoPrompt from "./DomoPrompt/DomoPrompt";
import DomoType from "./DomoType/DomoType";
import DomoGauge from "./DomoGauge/DomoGauge";
import DomoInput from "./DomoInput/DomoInput";
import DomoLog from "./DomoLog/DomoLog";
import DomoPanel from "./DomoPanel/DomoPanel";
import DomoReadout from "./DomoReadout/DomoReadout";
import { DomoRow, DomoRows } from "./DomoRow/DomoRow";
import DomoSegmented from "./DomoSegmented/DomoSegmented";
import DomoSheet from "./DomoSheet/DomoSheet";
import DomoStatus from "./DomoStatus/DomoStatus";
import DomoStepper from "./DomoStepper/DomoStepper";
import DomoToggle from "./DomoToggle/DomoToggle";

const meta: Meta = {
  title: "Families/Domo/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

const block: CSSProperties = { display: "grid", gap: "var(--ds-space-sm)", justifyItems: "start" };

function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DomoButton variant="outline" onClick={() => setOpen(true)}>
        + Añadir extras
      </DomoButton>
      <DomoSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Extras"
        footer={<DomoButton onClick={() => setOpen(false)}>Listo</DomoButton>}
      >
        <DomoRows template="1fr">
          <DomoRow cells={["NDA"]} control={<DomoToggle label="NDA" />} />
          <DomoRow cells={["Mantenimiento"]} control={<DomoToggle label="Mantenimiento" defaultChecked />} />
          <DomoRow cells={["Deploy"]} control={<DomoToggle label="Deploy" />} />
        </DomoRows>
      </DomoSheet>
    </>
  );
}

export const Overview: StoryObj = {
  render: () => (
    <div
      className="domo-scope"
      style={{
        minHeight: "100vh",
        padding: "3rem",
        display: "grid",
        gap: "var(--ds-space-2xl)",
        alignContent: "start",
      }}
    >
      <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
        <DomoButton>Enviar</DomoButton>
        <DomoButton variant="outline">Revisar</DomoButton>
        <DomoButton variant="ghost">Cancelar</DomoButton>
        <DomoButton variant="danger">Borrar</DomoButton>
        <DomoButton size="sm">sm</DomoButton>
        <DomoButton size="lg">lg</DomoButton>
        <DomoButton disabled>Bloqueado</DomoButton>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-xl)", flexWrap: "wrap", alignItems: "center" }}>
        <DomoStepper label="temperatura" defaultValue={19} step={0.5} min={5} max={30} format={(n) => `${n.toFixed(1)}°C`} size="lg" />
        <DomoStepper label="cantidad" defaultValue={2} min={0} max={9} />
        <DomoToggle label="radiadores" defaultChecked />
        <DomoToggle label="paneles" />
        <DomoSegmented label="zona" options={["WEST", "EAST", "SUR"]} defaultValue="EAST" />
        <DomoGauge value={68} label="carga" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "var(--ds-space-lg)" }}>
        <DomoPanel title="Radiators" status="Editar">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--ds-space-md)" }}>
            <DomoReadout label="Water" value="67" unit="°C" />
            <DomoReadout label="Pressure" value="1.7" unit="bar" />
            <DomoReadout label="Weekly" value="+1.6" unit="%" />
            <DomoReadout label="Yield" value="190" unit="kWh" size="lg" />
          </div>
        </DomoPanel>

        <DomoPanel
          title="Contacto"
          status="Requerido"
          footer={<DomoStatus busy>Validando datos</DomoStatus>}
        >
          <DomoField label="Nombre" required>
            <DomoInput placeholder="Ada Lovelace" />
          </DomoField>
          <DomoField label="Email" error="Formato inválido">
            <DomoInput placeholder="ada@mail.com" defaultValue="ada@" />
          </DomoField>
        </DomoPanel>
      </div>

      <DomoPanel title="Horario" status="+Add">
        <DomoRows template="7rem 4rem 1fr">
          <DomoRow cells={["Weekdays", "18°C", "6AM–10AM"]} control={<DomoToggle label="weekdays" />} />
          <DomoRow cells={["Day off", "19°C", "9AM–1PM"]} active control={<DomoToggle label="day off" defaultChecked />} />
          <DomoRow cells={["Sunday", "19°C", "10AM–12PM"]} control={<DomoToggle label="sunday" />} />
        </DomoRows>
      </DomoPanel>

      <div style={block}>
        <SheetDemo />
      </div>

      <div style={{ ...block, maxWidth: "28rem" }}>
        <DomoType text="Soy la voz de la AI del portafolio: tecleo lo que el sistema piensa…" />
        <DomoPrompt label="preguntar a la AI" onSubmit={() => {}} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "var(--ds-space-lg)" }}>
        <DomoCut cut="chamfer" title="Chamfer" status="v2">
          <DomoType text="Tarjetas cortadas a cuchillo — clip-path, borde fingido." />
        </DomoCut>
        <DomoCut cut="blade" title="Blade" status="v2">
          <DomoReadout label="Corte" value="34px" />
        </DomoCut>
        <DomoCut cut="notch" tone="ink" title="Notch" status="v2">
          <DomoGlitch text="Interferencia ◆" />
        </DomoCut>
        <DomoCut cut="blade" title="Bitácora" status="v3">
          <DomoLog
            label="transferencia de ejemplo"
            paso={2}
            items={[
              { texto: "Resolviendo ruta", detalle: "koi-matsuri.jp" },
              { texto: "Montando mini-contrato", detalle: "--koi-* × 6" },
              { texto: "Cargando tipografía", detalle: "woff2 local" },
              { texto: "Handshake de piel" },
            ]}
          />
        </DomoCut>
      </div>

      <DomoPanel title="Deck" status="← → con teclado">
        <div style={{ height: "11rem", display: "flex" }}>
          <DomoDeck label="demo deck">
            <DomoSlide title="Uno">
              <DomoReadout label="Slide" value="Uno" size="lg" />
            </DomoSlide>
            <DomoSlide title="Dos">
              <DomoReadout label="Slide" value="Dos" size="lg" />
            </DomoSlide>
            <DomoSlide title="Tres">
              <DomoReadout label="Slide" value="Tres" size="lg" />
            </DomoSlide>
          </DomoDeck>
        </div>
      </DomoPanel>
    </div>
  ),
};
