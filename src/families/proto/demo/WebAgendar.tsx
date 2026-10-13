import { useState, type ReactNode } from "react";
import ProtoAviso from "../ProtoAviso/ProtoAviso";
import ProtoBarra from "../ProtoBarra/ProtoBarra";
import ProtoBoton from "../ProtoBoton/ProtoBoton";
import ProtoCampo from "../ProtoCampo/ProtoCampo";
import ProtoCasilla from "../ProtoCasilla/ProtoCasilla";
import ProtoHorario from "../ProtoHorario/ProtoHorario";
import ProtoHuellitas from "../ProtoHuellitas/ProtoHuellitas";
import ProtoOpciones from "../ProtoOpcion/ProtoOpcion";
import ProtoPanel from "../ProtoPanel/ProtoPanel";
import ProtoPasos from "../ProtoPasos/ProtoPasos";
import {
  IconoCalendario, IconoCheck, IconoFlecha, IconoHuella, IconoJeringa, IconoMensaje, IconoReloj, IconoUbicacion, IconoVolver,
} from "../iconos";
import { DIAS, SERVICIOS, bloquesDel, pesos } from "./datos";
import Ficticio from "./Ficticio";
import "./demo.scss";

const PASOS = ["Qué necesita", "Día y hora", "Tus datos", "Listo"];

const ICONO_SERVICIO: Record<string, ReactNode> = {
  consulta: <IconoHuella />,
  vacuna: <IconoJeringa />,
  control: <IconoCalendario />,
  cirugia: <IconoReloj />,
};

export interface Reserva {
  servicio: string | null;
  dia: string;
  hora: string | null;
  nombre: string;
  telefono: string;
  mascota: string;
  motivo: string;
  aceptaDatos: boolean;
  aceptaRecordatorios: boolean;
}

export const RESERVA_VACIA: Reserva = {
  servicio: null, dia: "mar14", hora: null, nombre: "", telefono: "", mascota: "", motivo: "",
  aceptaDatos: false, aceptaRecordatorios: false,
};

/**
 * El flujo de agendar de la web pública (Astro: esto sería UNA isla React
 * dentro de una página estática). Controlado: `paso` y `reserva` pueden
 * venir de afuera para fijar cada estado en una historia.
 */
export function Agendar({ pasoInicial = 0, reservaInicial = RESERVA_VACIA }: { pasoInicial?: number; reservaInicial?: Reserva }) {
  const [paso, setPaso] = useState(pasoInicial);
  const [r, setR] = useState<Reserva>(reservaInicial);
  const [intento, setIntento] = useState(false);
  const pon = <K extends keyof Reserva>(k: K, v: Reserva[K]) => setR((x) => ({ ...x, [k]: v }));

  const servicio = SERVICIOS.find((s) => s.id === r.servicio);
  const dia = DIAS.find((d) => d.id === r.dia) ?? DIAS[0]!;
  const faltan = {
    nombre: r.nombre.trim() === "",
    telefono: r.telefono.replace(/\D/g, "").length < 8,
    mascota: r.mascota.trim() === "",
    datos: !r.aceptaDatos,
  };
  const datosListos = !Object.values(faltan).some(Boolean);

  const titulo = ["¿Qué necesita tu mascota?", "Elige el día y la hora", "¿Quiénes vienen?", "¡Listo, los esperamos!"][paso];

  return (
    <ProtoPanel titulo={titulo} className="demo-agendar">
      <ProtoPasos pasos={PASOS} actual={paso} />

      {paso === 0 && (
        <ProtoOpciones
          leyenda="Tipo de atención"
          valor={r.servicio}
          onCambio={(id) => pon("servicio", id)}
          opciones={SERVICIOS.map((s) => ({
            id: s.id,
            titulo: s.nombre,
            detalle: s.conEvaluacion ? `${s.detalle}. Escríbenos por WhatsApp.` : s.detalle,
            extra: s.conEvaluacion ? "Con evaluación" : <>{s.minutos} min<br />{pesos(s.precio)}</>,
            icono: ICONO_SERVICIO[s.id],
            deshabilitada: s.conEvaluacion,
          }))}
        />
      )}

      {paso === 1 && (
        <>
          <div className="demo-dias" role="group" aria-label="Día">
            {DIAS.map((d) => (
              <button
                key={d.id}
                type="button"
                className="demo-dia"
                aria-pressed={r.dia === d.id}
                onClick={() => { pon("dia", d.id); pon("hora", null); }}
              >
                {d.corto}
              </button>
            ))}
          </div>
          <ProtoHorario dia={dia.largo} bloques={bloquesDel(r.dia)} valor={r.hora} onCambio={(h) => pon("hora", h)} />
          <p style={{ fontSize: "0.875rem", color: "var(--proto-tenue)" }}>
            Sólo te mostramos las horas donde cabe {servicio ? `una ${servicio.nombre.toLowerCase()} (${servicio.minutos} min)` : "la atención"}.
          </p>
        </>
      )}

      {paso === 2 && (
        <form
          className="demo-agendar"
          noValidate
          onSubmit={(e) => { e.preventDefault(); setIntento(true); if (datosListos) setPaso(3); }}
          id="demo-datos"
        >
          <ProtoCampo etiqueta="Tu nombre" valor={r.nombre} onCambio={(v) => pon("nombre", v)} requerido autoComplete="name"
            error={intento && faltan.nombre ? "Cuéntanos cómo te llamas." : undefined} />
          <ProtoCampo etiqueta="Tu WhatsApp" tipo="tel" valor={r.telefono} onCambio={(v) => pon("telefono", v)} requerido autoComplete="tel"
            placeholder="+56 9 1234 5678" ayuda="Por aquí te confirmamos la hora."
            error={intento && faltan.telefono ? "Revisa el número: le faltan dígitos." : undefined} />
          <ProtoCampo etiqueta="¿Cómo se llama tu mascota?" valor={r.mascota} onCambio={(v) => pon("mascota", v)} requerido
            error={intento && faltan.mascota ? "Queremos saludarla por su nombre." : undefined} />
          <ProtoCampo etiqueta="¿Qué le pasa? (opcional)" multilinea valor={r.motivo} onCambio={(v) => pon("motivo", v)}
            ayuda="Si es una urgencia, no agendes: llámanos al +56 2 2345 6789." />
          <ProtoCasilla marcada={r.aceptaDatos} onCambio={(v) => pon("aceptaDatos", v)} requerida
            detalle={<>Los usamos sólo para atenderte. Puedes pedir verlos, corregirlos o borrarlos cuando quieras. <a href="#privacidad">Cómo cuidamos tus datos</a>.</>}>
            Acepto que la clínica guarde mis datos y los de mi mascota para esta atención
          </ProtoCasilla>
          {intento && faltan.datos && (
            <p style={{ color: "var(--proto-urgencia)", fontWeight: 600, fontSize: "0.875rem" }}>
              Necesitamos tu permiso para guardar los datos de la cita.
            </p>
          )}
          <ProtoCasilla marcada={r.aceptaRecordatorios} onCambio={(v) => pon("aceptaRecordatorios", v)}
            detalle="Opcional. Te escribimos el día antes y cuando le toque su próxima vacuna. Lo puedes apagar respondiendo «no más avisos».">
            Quiero recordatorios por WhatsApp
          </ProtoCasilla>
        </form>
      )}

      {paso === 3 && (
        <>
          <ProtoAviso tono="bien" icono={<IconoCheck />} titulo={`${r.mascota || "Tu mascota"} tiene hora`}>
            {r.aceptaRecordatorios
              ? "Te escribiremos por WhatsApp el día antes para confirmar. Si no puedes venir, respóndenos ahí mismo: tu hora se le ofrece a otra mascota que espera."
              : "Guarda este resumen. Si no puedes venir, avísanos por WhatsApp: tu hora se le ofrece a otra mascota que espera."}
          </ProtoAviso>
          <dl className="demo-resumen">
            <div><dt>Atención</dt><dd>{servicio?.nombre ?? "—"}</dd></div>
            <div><dt>Cuándo</dt><dd>{dia.largo}, {r.hora ?? "—"}</dd></div>
            <div><dt>Dura</dt><dd>{servicio ? `${servicio.minutos} min` : "—"}</dd></div>
            <div><dt>Valor</dt><dd>{servicio ? pesos(servicio.precio) : "—"}</dd></div>
            <div><dt>Dónde</dt><dd>Av. San Bruno 1234</dd></div>
          </dl>
        </>
      )}

      {paso < 3 && (
        <div className="demo-agendar__pie">
          {paso > 0 ? (
            <ProtoBoton tono="fantasma" icono={<IconoVolver />} onClick={() => setPaso(paso - 1)}>Volver</ProtoBoton>
          ) : <span />}
          {paso === 2 ? (
            <ProtoBoton tono="accion" type="submit" form="demo-datos" icono={<IconoCheck />}>Reservar la hora</ProtoBoton>
          ) : (
            <ProtoBoton
              tono="accion"
              disabled={(paso === 0 && !r.servicio) || (paso === 1 && !r.hora)}
              onClick={() => setPaso(paso + 1)}
            >
              Continuar <IconoFlecha />
            </ProtoBoton>
          )}
        </div>
      )}
    </ProtoPanel>
  );
}

/** La página pública completa: lo que verá quien busca "veterinaria" en Google. */
export default function WebAgendar(props: { pasoInicial?: number; reservaInicial?: Reserva }) {
  return (
    <div className="proto-scope demo-pagina">
      <Ficticio />
      <ProtoBarra
        centro={
          <nav aria-label="Principal" className="demo-nav">
            <a href="#servicios">Servicios</a>
            <a href="#equipo">Equipo</a>
            <a href="#tienda">Tienda</a>
            <a href="#como-llegar">Cómo llegar</a>
          </nav>
        }
        fin={<ProtoBoton tono="calido" tamano="chico" icono={<IconoMensaje />}>WhatsApp</ProtoBoton>}
      />
      <main className="demo-contenedor">
        <section className="demo-heroe" aria-labelledby="demo-heroe-titulo">
          <div>
            <h1 id="demo-heroe-titulo" className="demo-heroe__titulo">
              Los cuidamos como si fueran <em>nuestros</em>.
            </h1>
            <p className="demo-heroe__bajada">
              Consultas, vacunas, controles y cirugías en San Bruno. Agenda en un minuto: te confirmamos por WhatsApp
              y te recordamos el día antes.
            </p>
            <ul className="demo-heroe__datos">
              <li><IconoReloj /> Lunes a viernes 9:00–19:00 · sábado 10:00–14:00</li>
              <li><IconoUbicacion /> Av. San Bruno 1234</li>
              <li><IconoMensaje /> Te respondemos por WhatsApp a cualquier hora; una persona del equipo, en horario de atención</li>
            </ul>
            <ProtoHuellitas pasos={6} className="demo-heroe__huellitas" />
          </div>
          <Agendar {...props} />
        </section>

        <section id="servicios" aria-labelledby="demo-servicios" style={{ display: "grid", gap: "1rem" }}>
          <h2 id="demo-servicios" style={{ fontSize: "1.75rem" }}>Lo que hacemos</h2>
          <div className="demo-servicios">
            {SERVICIOS.map((s) => (
              <ProtoPanel key={s.id} titulo={s.nombre} nivel={3} className="demo-servicio">
                <p style={{ color: "var(--proto-tenue)" }}>{s.detalle}</p>
                <p className="demo-servicio__precio">{s.conEvaluacion ? "Valor según evaluación" : `Desde ${pesos(s.precio)}`}</p>
              </ProtoPanel>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
