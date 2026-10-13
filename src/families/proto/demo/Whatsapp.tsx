import { useState, type ReactNode } from "react";
import ProtoAvatar from "../ProtoAvatar/ProtoAvatar";
import ProtoAviso from "../ProtoAviso/ProtoAviso";
import ProtoBoton from "../ProtoBoton/ProtoBoton";
import ProtoInsignia from "../ProtoInsignia/ProtoInsignia";
import ProtoMensaje from "../ProtoMensaje/ProtoMensaje";
import ProtoPanel from "../ProtoPanel/ProtoPanel";
import { IconoCheck, IconoHuella, IconoMensaje, IconoPersona } from "../iconos";
import { EQUIPO } from "./datos";
import Ficticio from "./Ficticio";
import "./demo.scss";

/**
 * Un teléfono para MAQUETAR la conversación. No es parte de la familia: el
 * cliente ve su propio WhatsApp; de aquí salen los TEXTOS y el TONO, que es
 * lo que la clínica tiene que aprobar (el protocolo de trato).
 */
export function Telefono({ hilo, etiqueta }: { hilo: ReactNode; etiqueta: string }) {
  return (
    <section className="demo-telefono" aria-label={etiqueta}>
      <div className="demo-telefono__estado" aria-hidden="true"><span>9:41</span><span>4G · 82%</span></div>
      <div className="demo-chat__cabeza">
        <span className="proto-avatar" style={{ background: "var(--proto-gente)", color: "#fff" }} aria-hidden="true">
          <IconoHuella tamano={20} />
        </span>
        <span className="demo-chat__quien">
          <span className="demo-chat__nombre">Veterinaria San Bruno</span>
          <span className="demo-chat__estado">Cuenta de empresa · asistente con IA</span>
        </span>
      </div>
      <div className="demo-chat__hilo" role="log" aria-live="polite" aria-label="Mensajes" tabIndex={0}>{hilo}</div>
    </section>
  );
}

type Respuesta = "confirmo" | "cambiar" | "cancelar";

/**
 * El recordatorio del día antes. Interactivo: se puede elegir la respuesta
 * en el teléfono y ver qué pasa al otro lado, en el panel de recepción.
 */
export function Recordatorio({ inicial }: { inicial?: Respuesta }) {
  const [resp, setResp] = useState<Respuesta | undefined>(inicial);

  const hilo = (
    <>
      <ProtoMensaje de="sistema">Lunes 13 de octubre</ProtoMensaje>
      <ProtoMensaje
        de="asistente"
        firma="Asistente San Bruno"
        hora="10:00"
        respuestas={[
          { id: "confirmo", texto: "Sí, ahí estaremos" },
          { id: "cambiar", texto: "Necesito otra hora" },
          { id: "cancelar", texto: "No podremos ir" },
        ]}
        elegida={resp}
        onResponder={(id) => setResp(id as Respuesta)}
      >
        <p>¡Hola, Andrea! Te recordamos que <strong>Rocky</strong> tiene su vacuna mañana, <strong>martes 14 a las 10:30</strong>, con la Dra. Valentina Rojas.</p>
        <p>¿Nos confirmas?</p>
      </ProtoMensaje>

      {resp === "confirmo" && (
        <>
          <ProtoMensaje de="cliente" hora="10:04">Sí, ahí estaremos</ProtoMensaje>
          <ProtoMensaje de="asistente" firma="Asistente San Bruno" hora="10:04">
            <p>¡Perfecto! Los esperamos mañana. Si Rocky se pone nervioso en el auto, tráelo con su mantita: ayuda mucho.</p>
          </ProtoMensaje>
        </>
      )}

      {resp === "cambiar" && (
        <>
          <ProtoMensaje de="cliente" hora="10:04">Necesito otra hora</ProtoMensaje>
          <ProtoMensaje
            de="asistente"
            firma="Asistente San Bruno"
            hora="10:04"
            respuestas={[
              { id: "a", texto: "Miércoles 15 · 11:00" },
              { id: "b", texto: "Jueves 16 · 16:30" },
              { id: "c", texto: "Ver más horas" },
            ]}
          >
            <p>¡Claro! Estas son las horas más cercanas para su vacuna:</p>
          </ProtoMensaje>
        </>
      )}

      {resp === "cancelar" && (
        <>
          <ProtoMensaje de="cliente" hora="10:04">No podremos ir</ProtoMensaje>
          <ProtoMensaje
            de="asistente"
            firma="Asistente San Bruno"
            hora="10:04"
            respuestas={[
              { id: "otra", texto: "Sí, buscar otra hora" },
              { id: "despues", texto: "Más adelante" },
            ]}
          >
            <p>Gracias por avisarnos con tiempo, Andrea: así otra mascota que estaba esperando puede usar esa hora.</p>
            <p>Su vacuna anual vence el 30 de octubre. ¿Te busco otra hora antes de esa fecha?</p>
          </ProtoMensaje>
        </>
      )}
    </>
  );

  return (
    <div className="proto-scope">
      <Ficticio />
      <div className="demo-mesa">
        <Telefono hilo={hilo} etiqueta="Conversación de WhatsApp con Andrea" />
        <div className="demo-lado">
          <ProtoPanel titulo="Lo que ve recepción" sub="Panel de la clínica · en vivo">
            <ul className="demo-bitacora">
              <li><time>10:00</time><span>Recordatorio enviado a Andrea (Rocky · vacuna · mar 14, 10:30).</span></li>
              {!resp && <li><time>—</time><span><ProtoInsignia estado="espera">Esperando respuesta</ProtoInsignia></span></li>}
              {resp === "confirmo" && <li><time>10:04</time><span><ProtoInsignia estado="bien">Confirmada</ProtoInsignia> Nadie tuvo que llamar.</span></li>}
              {resp === "cambiar" && <li><time>10:04</time><span><ProtoInsignia estado="espera">Reagendando</ProtoInsignia> El asistente ofrece horas donde cabe una vacuna.</span></li>}
              {resp === "cancelar" && (
                <>
                  <li><time>10:04</time><span><ProtoInsignia estado="neutra">Cancelada</ProtoInsignia> La hora de las 10:30 quedó libre.</span></li>
                  <li><time>10:04</time><span>Ofrecida a la lista de espera: <strong>Marcela</strong> (Luna · vacuna).</span></li>
                  <li><time>10:09</time><span><ProtoInsignia estado="bien">Recuperada</ProtoInsignia> Marcela aceptó. La agenda sigue llena.</span></li>
                </>
              )}
            </ul>
          </ProtoPanel>
          {resp === "cancelar" && (
            <ProtoAviso tono="bien" icono={<IconoCheck />} titulo="Una hora que no se perdió">
              Sin el recordatorio, Rocky simplemente no habría llegado y la hora se habría perdido.
            </ProtoAviso>
          )}
          {!resp && (
            <ProtoAviso tono="info" icono={<IconoMensaje />} titulo="Pruébalo">
              Elige una respuesta en el teléfono y mira qué pasa en la clínica.
            </ProtoAviso>
          )}
          {resp && <ProtoBoton tono="fantasma" onClick={() => setResp(undefined)}>Volver a empezar</ProtoBoton>}
        </div>
      </div>
    </div>
  );
}

/**
 * El protocolo de trato en acción: un cliente molesto. El asistente valida
 * primero, explica el límite sin culpar a nadie, ofrece salidas y deriva a
 * una persona. Nunca discute, nunca promete lo que no sabe.
 */
export function ClienteMolesto({ tomada: tomadaInicial = false }: { tomada?: boolean }) {
  const [tomada, setTomada] = useState(tomadaInicial);

  const hilo = (
    <>
      <ProtoMensaje de="sistema">Martes 14 de octubre</ProtoMensaje>
      <ProtoMensaje de="cliente" hora="11:42">
        Llevo 40 minutos esperando con mi gata en la sala y nadie me dice nada. Es una falta de respeto.
      </ProtoMensaje>
      <ProtoMensaje de="asistente" firma="Asistente San Bruno" hora="11:42">
        <p>Tienes toda la razón en sentirte así, Javiera: 40 minutos con Mía en la sala es mucho, y además sin saber qué pasa. Perdónanos.</p>
        <p>Lo que ocurre es que llegó una urgencia y el equipo está con ella en este momento. Los atrasos son lo último que queremos, pero cuando un animal llega grave, lo atendemos primero; si fuera Mía, haríamos lo mismo por ella.</p>
        <p>Le aviso ahora mismo a {EQUIPO.recepcion.split(" ")[0]}, de recepción, para que te diga cuánto falta. Si prefieres no esperar más, te guardo una hora hoy en la tarde sin costo extra.</p>
      </ProtoMensaje>
      <ProtoMensaje de="sistema">Conversación derivada a recepción</ProtoMensaje>
      {tomada && (
        <ProtoMensaje de="equipo" firma={`${EQUIPO.recepcion.split(" ")[0]} · recepción`} hora="11:44">
          <p>Hola Javiera, soy Camila, estoy en el mesón. Mía es la siguiente: unos 10 minutos. Si quieres, pasa a la salita del fondo, que es más tranquila para gatitos.</p>
        </ProtoMensaje>
      )}
    </>
  );

  return (
    <div className="proto-scope">
      <Ficticio />
      <div className="demo-mesa">
        <Telefono hilo={hilo} etiqueta="Conversación de WhatsApp con Javiera" />
        <div className="demo-lado">
          <ProtoPanel titulo="Bandeja de recepción" sub="La IA derivó la conversación: necesita una persona">
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <ProtoAvatar nombre="Javiera Lagos" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700 }}>Javiera Lagos · Mía (gata)</p>
                <p style={{ fontSize: "0.875rem", color: "var(--proto-tenue)" }}>Molesta por la espera · en la sala desde las 11:02</p>
              </div>
              {tomada ? <ProtoInsignia estado="persona" punto>La atiende Camila</ProtoInsignia> : <ProtoInsignia estado="espera">Sin tomar</ProtoInsignia>}
            </div>
            <ProtoAviso tono="info" titulo="Por qué se derivó">
              Reclamo por espera. El protocolo pide que un reclamo siempre lo cierre una persona.
            </ProtoAviso>
            {!tomada && (
              <ProtoBoton tono="calido" bloque icono={<IconoPersona />} onClick={() => setTomada(true)}>
                Tomar la conversación
              </ProtoBoton>
            )}
          </ProtoPanel>
          <ProtoPanel titulo="El protocolo, en esta respuesta" variante="pozo" nivel={3}>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "grid", gap: "0.375rem", fontSize: "0.875rem" }}>
              <li><strong>Valida primero:</strong> «tienes toda la razón en sentirte así».</li>
              <li><strong>Explica el límite sin culpar:</strong> hay una urgencia; nadie está «flojeando».</li>
              <li><strong>Defiende al equipo con empatía:</strong> «si fuera Mía, haríamos lo mismo».</li>
              <li><strong>Ofrece salidas:</strong> saber cuánto falta, u otra hora sin costo (sólo si la clínica lo fija como política: la IA no inventa beneficios).</li>
              <li><strong>Una persona cierra:</strong> los reclamos nunca los termina la IA.</li>
            </ul>
          </ProtoPanel>
        </div>
      </div>
    </div>
  );
}
