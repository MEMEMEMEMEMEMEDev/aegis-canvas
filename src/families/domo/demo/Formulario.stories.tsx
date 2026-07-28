import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import DomoButton from "../DomoButton/DomoButton";
import DomoField from "../DomoField/DomoField";
import DomoGauge from "../DomoGauge/DomoGauge";
import DomoInput from "../DomoInput/DomoInput";
import DomoPanel from "../DomoPanel/DomoPanel";
import DomoReadout from "../DomoReadout/DomoReadout";
import { DomoRow, DomoRows } from "../DomoRow/DomoRow";
import DomoSegmented from "../DomoSegmented/DomoSegmented";
import DomoSheet from "../DomoSheet/DomoSheet";
import DomoStatus from "../DomoStatus/DomoStatus";
import DomoStepper from "../DomoStepper/DomoStepper";
import DomoToggle from "../DomoToggle/DomoToggle";
import "../domo.scss";
import "./formulario.scss";

const meta: Meta = {
  title: "Families/Domo/Formulario",
  parameters: { layout: "fullscreen" },
};
export default meta;

const SERVICIOS = [
  { id: "webgl", label: "3D / WebGL", precio: 1200 },
  { id: "shaders", label: "Shaders", precio: 800 },
  { id: "motion", label: "Motion UI", precio: 600 },
  { id: "ai", label: "AI Chat", precio: 1500 },
];

const EXTRAS = ["NDA", "Mantenimiento", "Deploy", "Analytics"];

const emailValido = (s: string) => /\S+@\S+\.\S+/.test(s);

/**
 * Brief de proyecto en UNA sola vista: sin scroll, lo secundario vive en el
 * sheet y el "sistema" narra por la línea de estado — la UX pensada para un
 * portafolio interactivo con AI (todo control es operable desde fuera).
 */
function Brief() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  // "" = sin elegir (controlado; undefined pondría el control en modo libre).
  const [tipo, setTipo] = useState("");
  const [plazo, setPlazo] = useState("");
  const [presupuesto, setPresupuesto] = useState(3000);
  const [servicios, setServicios] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [sheetAbierto, setSheetAbierto] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const alterna = (lista: string[], id: string) =>
    lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id];

  const estimado = servicios.reduce(
    (suma, id) => suma + (SERVICIOS.find((s) => s.id === id)?.precio ?? 0),
    1500, // base
  );

  // Progreso del brief: cada dato completo suma su tramo del gauge.
  const nombreOk = nombre.trim().length > 1;
  const emailOk = emailValido(email);
  const pasos: Array<[boolean, string]> = [
    [nombreOk, "Falta tu nombre"],
    [emailOk, "Falta un email válido"],
    [tipo !== "", "Elige el tipo de proyecto"],
    [plazo !== "", "Elige un plazo"],
    [servicios.length > 0, "Enciende al menos un servicio"],
  ];
  const completos = pasos.filter(([ok]) => ok).length;
  const progreso = Math.round((completos / pasos.length) * 100);
  const pendiente = pasos.find(([ok]) => !ok)?.[1];

  const mensaje = enviado
    ? "Enviado. Hablamos pronto ✳"
    : pendiente ?? "Todo listo para enviar";

  return (
    <div className="domo-scope df">
      <div className="df__device">
        <div className="df__bar">
          <span>Portafolio / Brief</span>
          <span className="df__ai">AI online</span>
        </div>

        <h1 className="df__title">Hablemos.</h1>

        <div className="df__hero">
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
          <DomoStatus className="df__hero-status" busy={!enviado && progreso < 100}>
            {mensaje}
          </DomoStatus>
          <DomoGauge value={enviado ? 100 : progreso} label="brief completo" />
        </div>

        <div className="df__grid">
          <DomoPanel title="Contacto" status={nombreOk && emailOk ? "Completo" : "Requerido"}>
            <DomoField label="Nombre" required>
              <DomoInput
                placeholder="Ada Lovelace"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={enviado}
              />
            </DomoField>
            <DomoField
              label="Email"
              required
              error={email && !emailValido(email) ? "Formato inválido" : null}
            >
              <DomoInput
                type="email"
                placeholder="ada@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={enviado}
              />
            </DomoField>
          </DomoPanel>

          <DomoPanel title="Proyecto" status={tipo && plazo ? "Completo" : "Ajustable"}>
            <div className="df__choices">
              <DomoSegmented
                label="tipo de proyecto"
                options={["WEB", "3D", "AMBOS"]}
                value={tipo}
                onChange={setTipo}
              />
              <DomoSegmented
                label="plazo"
                options={["2–4 SEM", "1–3 MESES", "FLEXIBLE"]}
                value={plazo}
                onChange={setPlazo}
              />
            </div>
            <DomoReadout
              label="Estimado"
              value={`$${(estimado / 1000).toFixed(1)}`}
              unit="k"
              size="lg"
            />
          </DomoPanel>
        </div>

        <DomoPanel title="Servicios" status={`${servicios.length}/${SERVICIOS.length} activos`}>
          <DomoRows template="8.5rem 1fr">
            {SERVICIOS.map((s) => (
              <DomoRow
                key={s.id}
                cells={[s.label, `+$${(s.precio / 1000).toFixed(1)}k`]}
                active={servicios.includes(s.id)}
                control={
                  <DomoToggle
                    label={s.label}
                    checked={servicios.includes(s.id)}
                    onChange={() => setServicios((prev) => alterna(prev, s.id))}
                    disabled={enviado}
                  />
                }
              />
            ))}
          </DomoRows>
        </DomoPanel>

        <div className="df__actions">
          <DomoButton variant="ghost" onClick={() => setSheetAbierto(true)} disabled={enviado}>
            + Extras ({extras.length})
          </DomoButton>
          <DomoButton
            size="lg"
            disabled={enviado || progreso < 100}
            onClick={() => setEnviado(true)}
          >
            {enviado ? "Enviado ✓" : "Enviar →"}
          </DomoButton>
        </div>
      </div>

      <DomoSheet
        open={sheetAbierto}
        onClose={() => setSheetAbierto(false)}
        title="Extras del proyecto"
        footer={
          <DomoStatus>
            {extras.length
              ? `${extras.length} extra${extras.length > 1 ? "s" : ""}: ${extras.join(", ")}`
              : "Sin extras por ahora"}
          </DomoStatus>
        }
      >
        <DomoRows template="1fr">
          {EXTRAS.map((extra) => (
            <DomoRow
              key={extra}
              cells={[extra]}
              active={extras.includes(extra)}
              control={
                <DomoToggle
                  label={extra}
                  checked={extras.includes(extra)}
                  onChange={() => setExtras((prev) => alterna(prev, extra))}
                />
              }
            />
          ))}
        </DomoRows>
      </DomoSheet>
    </div>
  );
}

export const Completo: StoryObj = {
  render: () => <Brief />,
};
