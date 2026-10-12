import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import BalizaAlerta from "./BalizaAlerta/BalizaAlerta";
import BalizaAvatar from "./BalizaAvatar/BalizaAvatar";
import BalizaBarra from "./BalizaBarra/BalizaBarra";
import BalizaBoton from "./BalizaBoton/BalizaBoton";
import BalizaCampo from "./BalizaCampo/BalizaCampo";
import BalizaContacto from "./BalizaContacto/BalizaContacto";
import BalizaCredencial from "./BalizaCredencial/BalizaCredencial";
import BalizaDato from "./BalizaDato/BalizaDato";
import BalizaFila from "./BalizaFila/BalizaFila";
import BalizaInsignia from "./BalizaInsignia/BalizaInsignia";
import BalizaMetrica from "./BalizaMetrica/BalizaMetrica";
import BalizaPanel from "./BalizaPanel/BalizaPanel";
import BalizaPestanas, { idsPestana } from "./BalizaPestanas/BalizaPestanas";
import BalizaReservado from "./BalizaReservado/BalizaReservado";
import BalizaVital from "./BalizaVital/BalizaVital";
import BalizaAviso from "./BalizaAviso/BalizaAviso";
import BalizaBotonSOS from "./BalizaBotonSOS/BalizaBotonSOS";
import BalizaCodigo from "./BalizaCodigo/BalizaCodigo";
import BalizaDialogo from "./BalizaDialogo/BalizaDialogo";
import BalizaInterruptor from "./BalizaInterruptor/BalizaInterruptor";
import BalizaLineaTiempo from "./BalizaLineaTiempo/BalizaLineaTiempo";
import BalizaNavInferior from "./BalizaNavInferior/BalizaNavInferior";
import BalizaViaje from "./BalizaViaje/BalizaViaje";
import { IconoCheck, IconoFicha, IconoInicio, IconoRuta, IconoSinSenal } from "./iconos";
import { CONTACTOS, QrMuestra, TRABAJADORES } from "./demo/datos";

const meta: Meta = {
  title: "Families/Baliza/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

const t = TRABAJADORES[0]!;

const Hoja = ({ children }: { children: React.ReactNode }) => (
  <div className="baliza-scope" style={{ minHeight: "100vh" }}>
    <BalizaBarra fin={<BalizaInsignia estado="reservado">Familia provisional · SOS Ruta</BalizaInsignia>} />
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 20px 48px", display: "grid", gap: "20px" }}>
      {children}
    </div>
  </div>
);

const Fila = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>{children}</div>
);

function Catalogo() {
  const [pestana, setPestana] = useState("personas");
  const [elegida, setElegida] = useState(t.id);
  const [rut, setRut] = useState("11.111.111");
  const [sos, setSos] = useState<"listo" | "enviando" | "enviado">("listo");
  const [codigo, setCodigo] = useState("48");
  const [modulo, setModulo] = useState(true);
  const [destino, setDestino] = useState("inicio");
  const [dialogo, setDialogo] = useState(false);

  return (
    <Hoja>
      <BalizaPanel titulo="La ley del rojo" sub="Rojo = alguien necesita ayuda. Azul = se toca. Ámbar = bajo llave. Verde = está bien.">
        <Fila>
          <BalizaBoton tono="accion">Acción principal</BalizaBoton>
          <BalizaBoton tono="hondo">Guardar cambios</BalizaBoton>
          <BalizaBoton tono="suave" icono="+">Nuevo</BalizaBoton>
          <BalizaBoton>Ver tarjeta</BalizaBoton>
          <BalizaBoton tono="peligro">Eliminar trabajador</BalizaBoton>
          <BalizaBoton tono="fantasma">Cancelar</BalizaBoton>
        </Fila>
        <Fila>
          <BalizaBoton tono="sos" tamano="grande">Tomar caso</BalizaBoton>
          <BalizaBoton tono="sos" forma="pastilla">Ver alerta en vivo</BalizaBoton>
          <BalizaBoton forma="pastilla" tamano="chico">Explorar el producto</BalizaBoton>
          <BalizaBoton disabled>Deshabilitado</BalizaBoton>
        </Fila>
        <Fila>
          <BalizaInsignia estado="activa">Tarjeta activa</BalizaInsignia>
          <BalizaInsignia estado="bloqueada">Bloqueada</BalizaInsignia>
          <BalizaInsignia estado="sinAtender">Sin atender</BalizaInsignia>
          <BalizaInsignia estado="atendida">Atendida en 0:07</BalizaInsignia>
          <BalizaInsignia estado="reservado">Datos reservados</BalizaInsignia>
          <BalizaInsignia estado="neutro">Sin camión</BalizaInsignia>
        </Fila>
      </BalizaPanel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <BalizaMetrica valor={1} rotulo="Alertas sin atender" alerta />
        <BalizaMetrica valor="3/4" rotulo="Tarjetas activas" />
        <BalizaMetrica valor="3/4" rotulo="Fichas clínicas completas" />
        <BalizaMetrica valor="–" rotulo="Respuesta promedio (min)" />
      </div>

      <BalizaPestanas
        etiqueta="Secciones del panel"
        activa={pestana}
        onCambio={setPestana}
        pestanas={[
          { id: "personas", nombre: "Trabajadores y tarjetas" },
          { id: "activaciones", nombre: "Activaciones SOS", cuenta: 1, urgente: true },
          { id: "bases", nombre: "Bases, flota y contactos" },
        ]}
      />
      <div role="tabpanel" id={idsPestana(pestana).panel} aria-labelledby={idsPestana(pestana).pestana} tabIndex={0}
        style={{ padding: "12px 16px", border: "1px dashed var(--baliza-borde-campo)", borderRadius: "10px", color: "var(--baliza-tenue)" }}>
        Panel de la pestaña «{pestana}». Flechas ← → para moverse, Inicio y Fin.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", alignItems: "start" }}>
        <BalizaPanel titulo="Tarjetas" sub="Filas, avatar e insignias" nivel={3} acciones={<BalizaBoton tono="suave" tamano="chico" icono="+">Nuevo</BalizaBoton>}>
          {TRABAJADORES.map((x) => (
            <BalizaFila
              key={x.id}
              titulo={x.nombre}
              sub={`${x.id} · ${x.base}`}
              elegida={x.id === elegida}
              onClick={() => setElegida(x.id)}
              fin={<BalizaInsignia estado={x.estado === "activa" ? "activa" : "bloqueada"}>{x.estado === "activa" ? "activa" : "bloq."}</BalizaInsignia>}
            />
          ))}
        </BalizaPanel>
        <BalizaPanel titulo="Campos" nivel={3}>
          <BalizaCampo etiqueta="RUT" value={rut} onChange={(e) => setRut(e.target.value)} error={/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(rut) ? undefined : "Falta el dígito verificador: 11.111.111-1"} />
          <BalizaCampo etiqueta="Alergias" defaultValue="Penicilina" ayuda="Visible para cualquiera que escanee el QR." />
          <BalizaCampo etiqueta="Medicamentos" defaultValue="Metformina 850 mg" ayuda="Bajo llave: sólo personal de salud autorizado." />
        </BalizaPanel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", alignItems: "start" }}>
        <BalizaPanel titulo="Lo vital y lo reservado" nivel={3}>
          <BalizaVital sangre="O+" alergias="Penicilina" peso={82} />
          <BalizaReservado accion={<BalizaBoton tono="suave" tamano="chico" forma="pastilla">Soy personal de salud – verificar →</BalizaBoton>}>
            Condiciones, medicamentos e indicaciones solo para personal autorizado.
          </BalizaReservado>
          <BalizaDato rotulo="Vehículo y base">Camión N° 27 · Patente <b>XX-DE-27</b></BalizaDato>
        </BalizaPanel>
        <BalizaPanel titulo="Personas y contactos" nivel={3}>
          <Fila>
            <BalizaAvatar nombre={t.nombre} tamano="chico" />
            <BalizaAvatar nombre={t.nombre} />
            <BalizaAvatar nombre={t.nombre} tamano="grande" />
            <BalizaAvatar nombre={t.nombre} forma="ficha" tamano="grande" />
          </Fila>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <BalizaContacto {...CONTACTOS.jefe} />
            <BalizaContacto {...CONTACTOS.prevencion} />
          </div>
        </BalizaPanel>
      </div>

      <BalizaAlerta titulo="SOS activado" persona={t.nombre} cuando="4/10, 13:31:06" hace="hace 0:02">
        Entra por escaneo del QR o por el botón del trabajador. Late hasta que alguien la toma.
      </BalizaAlerta>
      <BalizaAlerta tipo="aviso" titulo="Sin confirmar llegada" persona="Ignacio Mora Díaz" cuando="Debía llegar 14:00" hace="+18 min">
        Pantalla nueva (viajes): no llegó la confirmación. Si nadie la resuelve, el servidor la escala a SOS.
      </BalizaAlerta>
      <BalizaAlerta tipo="tomada" titulo="Caso tomado" persona={t.nombre} cuando="Marcelo Ibarra · 13:31:13" hace="respuesta en 0:07">
        Ya hay alguien a cargo: deja de latir y pasa a azul.
      </BalizaAlerta>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", alignItems: "start" }}>
        <BalizaPanel titulo="SOS del trabajador" sub="Mantén apretado 2 s (o Espacio). El anillo muestra cuánto falta." nivel={3}>
          <BalizaBotonSOS estado={sos} onActivar={() => { setSos("enviando"); setTimeout(() => setSos("enviado"), 1500); }} />
          {sos !== "listo" && <BalizaBoton tono="fantasma" tamano="chico" onClick={() => setSos("listo")}>Reiniciar</BalizaBoton>}
        </BalizaPanel>
        <BalizaPanel titulo="Viaje con hora de llegada" nivel={3}>
          <BalizaViaje origen="Base Puente Alto" destino="Planta Lo Espejo" llegada="14:00" resta="29 min" avance={0.68} estado="enCurso"
            acciones={<><BalizaBoton tono="accion">Llegué</BalizaBoton><BalizaBoton>+30 min</BalizaBoton></>} />
          <BalizaViaje origen="Base Quilicura" destino="Planta Quilicura" llegada="14:00" resta="−18 min" avance={1} estado="vencido" />
        </BalizaPanel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", alignItems: "start" }}>
        <BalizaPanel titulo="Avisos" nivel={3}>
          <BalizaAviso tono="bien" icono={<IconoCheck />} titulo="Ubicación enviada a la base">Solo en este momento.</BalizaAviso>
          <BalizaAviso tono="info" titulo="Viaje vigilado">Funciona aunque te quedes sin señal.</BalizaAviso>
          <BalizaAviso tono="cuidado" icono={<IconoSinSenal />} titulo="Sin señal">Tu viaje sigue vigilado.</BalizaAviso>
          <BalizaAviso tono="grave" titulo="Las alertas NO están llegando" accion={<BalizaBoton tono="sos" tamano="chico">Reintentar</BalizaBoton>}>Sin conexión desde 13:40.</BalizaAviso>
        </BalizaPanel>
        <BalizaPanel titulo="Bitácora del caso" nivel={3}>
          <BalizaLineaTiempo etiqueta="Bitácora de ejemplo" hitos={[
            { id: "1", hora: "13:31:06", texto: "SOS por escaneo del QR", tipo: "sos" },
            { id: "2", hora: "13:31:13", texto: "Caso tomado", quien: "Marcelo Ibarra", tipo: "clave" },
            { id: "3", hora: "13:32:40", texto: "Llamada al 131 registrada", quien: "Marcelo Ibarra" },
            { id: "4", hora: "13:58:02", texto: "Caso cerrado: trasladado por SAMU", quien: "Marcelo Ibarra", tipo: "cierre" },
          ]} />
        </BalizaPanel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", alignItems: "start" }}>
        <BalizaPanel titulo="Código, interruptor y diálogo" nivel={3}>
          <BalizaCodigo etiqueta="Código de la base" valor={codigo} onCambio={setCodigo} ayuda="Un solo input: se puede pegar o autocompletar." />
          <BalizaInterruptor etiqueta="Viajes con hora de llegada" descripcion="Avisa a la base si el trabajador no confirma la llegada." activo={modulo} onCambio={setModulo} />
          <BalizaBoton onClick={() => setDialogo(true)}>Abrir diálogo</BalizaBoton>
          <BalizaDialogo abierto={dialogo} onCerrar={() => setDialogo(false)} titulo="¿Cancelar la alerta?" sub="Foco atrapado, Escape cierra."
            acciones={<><BalizaBoton tono="fantasma" onClick={() => setDialogo(false)}>No</BalizaBoton><BalizaBoton tono="accion" onClick={() => setDialogo(false)}>Sí</BalizaBoton></>}>
            <p style={{ margin: 0 }}>Queda en el historial como «cancelada por el trabajador».</p>
          </BalizaDialogo>
        </BalizaPanel>
        <BalizaPanel titulo="Navegación de la app" nivel={3}>
          <BalizaNavInferior activo={destino} onCambio={setDestino} etiqueta="Navegación de ejemplo" destinos={[
            { id: "inicio", nombre: "Inicio", icono: <IconoInicio /> },
            { id: "viaje", nombre: "Mi viaje", icono: <IconoRuta />, aviso: true },
            { id: "ficha", nombre: "Mi ficha", icono: <IconoFicha /> },
          ]} />
        </BalizaPanel>
      </div>

      <BalizaPanel titulo="Credencial impresa" sub="Retema papel, proporción CR80 (85,6 × 54 mm)" nivel={3}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <BalizaCredencial cara="frente" empresa="Transportes Demo" numero="N° 04521" nombre={t.nombre} cargo={t.cargo} rut={t.rut} />
          <BalizaCredencial cara="reverso" empresa="Transportes Demo" dominio="transportesdemo.cl" qr={<QrMuestra />} seguro="Seguro N° 000000" telefonoEmergencia="Emergencias: 600 000 0000" />
        </div>
      </BalizaPanel>
    </Hoja>
  );
}

export const Overview: StoryObj = { render: () => <Catalogo /> };
