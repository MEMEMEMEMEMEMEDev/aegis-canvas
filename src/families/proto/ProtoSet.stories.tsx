import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ReactNode } from "react";
import ProtoAviso from "./ProtoAviso/ProtoAviso";
import ProtoAvatar from "./ProtoAvatar/ProtoAvatar";
import ProtoBarra from "./ProtoBarra/ProtoBarra";
import ProtoBoton from "./ProtoBoton/ProtoBoton";
import ProtoCampo from "./ProtoCampo/ProtoCampo";
import ProtoCasilla from "./ProtoCasilla/ProtoCasilla";
import ProtoCita from "./ProtoCita/ProtoCita";
import ProtoHorario from "./ProtoHorario/ProtoHorario";
import ProtoHuellitas from "./ProtoHuellitas/ProtoHuellitas";
import ProtoInsignia from "./ProtoInsignia/ProtoInsignia";
import ProtoMensaje from "./ProtoMensaje/ProtoMensaje";
import ProtoMetrica from "./ProtoMetrica/ProtoMetrica";
import ProtoOpciones from "./ProtoOpcion/ProtoOpcion";
import ProtoPanel from "./ProtoPanel/ProtoPanel";
import ProtoPasos from "./ProtoPasos/ProtoPasos";
import { IconoAlerta, IconoCaja, IconoCheck, IconoHuella, IconoJeringa, IconoMensaje, IconoPersona } from "./iconos";
import { bloquesDel, pesos } from "./demo/datos";

const meta: Meta = {
  title: "Families/Proto HUELLA/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

const Hoja = ({ children }: { children: ReactNode }) => (
  <div className="proto-scope" style={{ minHeight: "100vh" }}>
    <ProtoBarra fin={<ProtoInsignia estado="espera">Familia en incubación · HUELLA</ProtoInsignia>} />
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 20px 48px", display: "grid", gap: "20px" }}>
      <h1 className="proto-oculto">HUELLA, catálogo de componentes</h1>
      {children}
    </main>
  </div>
);

const Fila = ({ children }: { children: ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>{children}</div>
);

const Muestra = ({ nombre, token, texto = false }: { nombre: string; token: string; texto?: boolean }) => (
  <div style={{ display: "grid", gap: "6px", width: "9.5rem" }}>
    <span
      style={{
        height: "56px", borderRadius: "12px", background: `var(${token})`,
        border: "1px solid var(--proto-borde)", display: "grid", placeItems: "center",
        color: texto ? "#fff" : "var(--proto-tinta)", fontWeight: 700,
      }}
      aria-hidden="true"
    >
      Aa
    </span>
    <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{nombre}</span>
    <code style={{ fontSize: "0.75rem", color: "var(--proto-tenue)" }}>{token}</code>
  </div>
);

function Catalogo() {
  const [servicio, setServicio] = useState<string | null>("vacuna");
  const [hora, setHora] = useState<string | null>("10:30");
  const [nombre, setNombre] = useState("Andrea Vidal");
  const [tel, setTel] = useState("+56 9 12");
  const [acepta, setAcepta] = useState(false);
  const [resp, setResp] = useState<string | undefined>();

  return (
    <Hoja>
      <ProtoPanel
        titulo="La ley de la familia"
        sub="Rojo = urgencia y nada más. Morado = lo que se toca. Celeste = las personas y las mascotas. Verde = está bien. Miel = espera una respuesta. Lavanda = sólo decora."
      >
        <Fila>
          <Muestra nombre="Papel" token="--proto-papel" />
          <Muestra nombre="Arena" token="--proto-arena" />
          <Muestra nombre="Morado · se toca" token="--proto-toca" texto />
          <Muestra nombre="Celeste · personas" token="--proto-gente" texto />
          <Muestra nombre="Celeste inocente" token="--proto-gente-pozo" />
          <Muestra nombre="Verde · está bien" token="--proto-bien" texto />
          <Muestra nombre="Lavanda · decora" token="--proto-lavanda" />
          <Muestra nombre="Miel · espera" token="--proto-miel" texto />
          <Muestra nombre="Urgencia · sólo eso" token="--proto-urgencia" texto />
        </Fila>
        <p style={{ fontFamily: "var(--proto-font-titulo)", fontSize: "2rem", lineHeight: 1.1 }}>
          Fraunces: la voz de la clínica. <em style={{ fontWeight: 400, color: "var(--proto-gente)" }}>Cálida.</em>
        </p>
        <ProtoHuellitas pasos={7} />
        <p>Onest: todo lo que se lee y se opera, con cifras tabulares — 09:30 · 10:30 · {pesos(18000)}.</p>
      </ProtoPanel>

      <ProtoPanel titulo="Botones">
        <Fila>
          <ProtoBoton tono="accion" icono={<IconoCheck />}>Reservar la hora</ProtoBoton>
          <ProtoBoton>Ver la semana</ProtoBoton>
          <ProtoBoton tono="calido" icono={<IconoPersona />}>Tomar la conversación</ProtoBoton>
          <ProtoBoton tono="fantasma">Volver</ProtoBoton>
          <ProtoBoton tono="peligro">Anular la cita</ProtoBoton>
          <ProtoBoton disabled>Deshabilitado</ProtoBoton>
        </Fila>
        <Fila>
          <ProtoBoton tono="urgencia" icono={<IconoAlerta />}>Recibir la urgencia</ProtoBoton>
          <ProtoBoton tono="accion" tamano="grande">Agendar una hora</ProtoBoton>
          <ProtoBoton tamano="chico">Marcar</ProtoBoton>
        </Fila>
      </ProtoPanel>

      <ProtoPanel titulo="Estados, avatares y métricas">
        <Fila>
          <ProtoInsignia estado="bien">Confirmada</ProtoInsignia>
          <ProtoInsignia estado="espera">Por confirmar</ProtoInsignia>
          <ProtoInsignia estado="persona" punto>En sala de espera</ProtoInsignia>
          <ProtoInsignia estado="urgencia" punto>Urgencia</ProtoInsignia>
          <ProtoInsignia>Cancelada</ProtoInsignia>
        </Fila>
        <Fila>
          <ProtoAvatar nombre="Andrea Vidal" />
          <ProtoAvatar nombre="Rocky" tipo="mascota" />
          <ProtoAvatar nombre="Luna" tipo="mascota" tamano="grande" />
          <ProtoAvatar nombre="Camila Pérez" tamano="chico" />
        </Fila>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))", gap: "1rem" }}>
          <ProtoMetrica icono={<IconoCaja />} rotulo="Ingresos de hoy" valor={pesos(412000)} tendencia={{ texto: "+8 %", sentido: "buena" }} nota="vs. martes pasado" />
          <ProtoMetrica icono={<IconoMensaje />} rotulo="WhatsApp hoy" valor="37" nota="29 los resolvió el asistente" />
        </div>
      </ProtoPanel>

      <ProtoPanel titulo="Avisos">
        <ProtoAviso tono="urgencia" icono={<IconoAlerta />} titulo="Urgencia en camino: Toby" accion={<ProtoBoton tono="urgencia" tamano="chico">Recibirla</ProtoBoton>}>
          Atropello leve, llega en ~10 min.
        </ProtoAviso>
        <ProtoAviso tono="bien" icono={<IconoCheck />} titulo="Rocky tiene hora">Te escribiremos el día antes para confirmar.</ProtoAviso>
        <ProtoAviso tono="espera" titulo="3 citas de mañana sin confirmar">Se les recordó a las 10:00.</ProtoAviso>
        <ProtoAviso titulo="Por qué se derivó">Reclamo por espera: lo cierra una persona.</ProtoAviso>
      </ProtoPanel>

      <ProtoPanel titulo="Agendar: opciones, pasos, horario">
        <ProtoPasos pasos={["Qué necesita", "Día y hora", "Tus datos", "Listo"]} actual={1} />
        <ProtoOpciones
          leyenda="Tipo de atención"
          leyendaVisible
          valor={servicio}
          onCambio={setServicio}
          opciones={[
            { id: "consulta", titulo: "Consulta general", detalle: "Para cuando algo no anda bien", extra: "30 min", icono: <IconoHuella /> },
            { id: "vacuna", titulo: "Vacunación", detalle: "Incluye revisión", extra: "20 min", icono: <IconoJeringa /> },
            { id: "cirugia", titulo: "Cirugía programada", detalle: "Primero una evaluación", extra: "Con evaluación", deshabilitada: true },
          ]}
        />
        <ProtoHorario dia="Martes 14 de octubre" bloques={bloquesDel("mar14")} valor={hora} onCambio={setHora} />
      </ProtoPanel>

      <ProtoPanel titulo="Campos y consentimiento">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "1rem" }}>
          <ProtoCampo etiqueta="Tu nombre" valor={nombre} onCambio={setNombre} requerido />
          <ProtoCampo etiqueta="Tu WhatsApp" tipo="tel" valor={tel} onCambio={setTel} error="Revisa el número: le faltan dígitos." />
        </div>
        <ProtoCasilla marcada={acepta} onCambio={setAcepta} detalle="Los usamos sólo para atenderte. Puedes pedir verlos, corregirlos o borrarlos.">
          Acepto que la clínica guarde mis datos para esta atención
        </ProtoCasilla>
      </ProtoPanel>

      <ProtoPanel titulo="Citas">
        <ProtoCita hora="09:30" duracion={20} mascota="Rocky" especie="Perro · 7 años" dueno="Andrea Vidal" servicio="Vacuna anual" estado="enAtencion"
          nota="Se pone nervioso al pesarlo." accion={<ProtoBoton tono="accion" tamano="chico">Abrir ficha</ProtoBoton>} />
        <ProtoCita hora="10:00" duracion={30} mascota="Toby" especie="Perro · 4 años" dueno="Ignacio Mora" servicio="Urgencia: atropello leve" estado="enSala" urgente />
        <ProtoCita hora="15:00" duracion={30} mascota="Pelusa" especie="Coneja · 2 años" dueno="Diego Soto" servicio="Consulta general" estado="cancelada" />
      </ProtoPanel>

      <ProtoPanel titulo="Mensajes (WhatsApp)">
        <div style={{ display: "grid", gap: "0.75rem", maxWidth: "26rem", padding: "1rem", background: "var(--proto-papel)", borderRadius: "16px" }}>
          <ProtoMensaje de="sistema">Lunes 13 de octubre</ProtoMensaje>
          <ProtoMensaje de="asistente" firma="Asistente San Bruno" hora="10:00"
            respuestas={[{ id: "si", texto: "Sí, ahí estaremos" }, { id: "no", texto: "No podremos ir" }]}
            elegida={resp} onResponder={setResp}>
            ¡Hola, Andrea! Rocky tiene su vacuna mañana a las 10:30. ¿Nos confirmas?
          </ProtoMensaje>
          <ProtoMensaje de="cliente" hora="10:04">Sí, ahí estaremos</ProtoMensaje>
          <ProtoMensaje de="equipo" firma="Camila · recepción" hora="10:05">¡Gracias, Andrea! Nos vemos mañana.</ProtoMensaje>
        </div>
      </ProtoPanel>
    </Hoja>
  );
}

export const Overview: StoryObj = {
  name: "Overview",
  render: () => <Catalogo />,
};
