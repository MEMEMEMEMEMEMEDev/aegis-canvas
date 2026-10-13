import { useState } from "react";
import ProtoAgenda, { type ProtoAgendaBloque } from "../ProtoAgenda/ProtoAgenda";
import ProtoAvatar from "../ProtoAvatar/ProtoAvatar";
import ProtoAviso from "../ProtoAviso/ProtoAviso";
import ProtoBoton from "../ProtoBoton/ProtoBoton";
import ProtoCampo from "../ProtoCampo/ProtoCampo";
import ProtoInsignia from "../ProtoInsignia/ProtoInsignia";
import ProtoLineaTiempo from "../ProtoLineaTiempo/ProtoLineaTiempo";
import ProtoNota from "../ProtoNota/ProtoNota";
import ProtoPanel from "../ProtoPanel/ProtoPanel";
import ProtoSegmento from "../ProtoSegmento/ProtoSegmento";
import { IconoCandado, IconoCheck, IconoMicrofono, IconoNota, IconoOjo } from "../iconos";
import { EQUIPO } from "./datos";
import { Armazon } from "./Panel";
import "./demo.scss";

// ── 5 · La agenda de todo el equipo ──────────────────────────────────────

const COLUMNAS = [
  { id: "valentina", nombre: "Dra. Valentina", detalle: "Veterinaria" },
  { id: "tomas", nombre: "Dr. Tomás", detalle: "Veterinario" },
  { id: "javier", nombre: "Javier", detalle: "Técnico" },
  { id: "pabellon", nombre: "Pabellón", detalle: "Sala" },
  { id: "camila", nombre: "Camila", detalle: "Recepción" },
];

const BLOQUES: ProtoAgendaBloque[] = [
  { id: "v1", columna: "valentina", inicio: "09:00", minutos: 30, titulo: "Mía · consulta", detalle: "Javiera Lagos" },
  { id: "v2", columna: "valentina", inicio: "09:30", minutos: 20, titulo: "Rocky · vacuna" },
  { id: "v3", columna: "valentina", inicio: "10:00", minutos: 30, titulo: "Luna · consulta", detalle: "Marcela Díaz" },
  { id: "v4", columna: "valentina", inicio: "10:30", minutos: 20, titulo: "Canela · control" },
  { id: "v5", columna: "valentina", inicio: "11:00", minutos: 120, titulo: "Simón · limpieza dental", detalle: "Cirugía · con Javier" },
  { id: "v6", columna: "valentina", inicio: "13:00", minutos: 60, titulo: "Colación", tono: "interno" },
  { id: "v7", columna: "valentina", inicio: "15:00", minutos: 30, titulo: "Pelusa · consulta", detalle: "Sin confirmar", tono: "porConfirmar" },
  { id: "t1", columna: "tomas", inicio: "09:00", minutos: 60, titulo: "Reunión de equipo", detalle: "Todos los martes", tono: "interno" },
  { id: "t2", columna: "tomas", inicio: "10:00", minutos: 30, titulo: "Max · consulta", detalle: "Cojea de la pata trasera" },
  { id: "t3", columna: "tomas", inicio: "10:30", minutos: 30, titulo: "Kira · consulta" },
  { id: "t4", columna: "tomas", inicio: "11:45", minutos: 45, titulo: "Toby · urgencia", detalle: "Atropello leve", tono: "urgencia" },
  { id: "t5", columna: "tomas", inicio: "14:00", minutos: 60, titulo: "Colación", tono: "interno" },
  { id: "t6", columna: "tomas", inicio: "15:00", minutos: 20, titulo: "Nala · vacuna" },
  { id: "t7", columna: "tomas", inicio: "15:30", minutos: 30, titulo: "Coco · control", tono: "porConfirmar" },
  { id: "j1", columna: "javier", inicio: "09:00", minutos: 30, titulo: "Ronda de hospitalizados", tono: "interno" },
  { id: "j2", columna: "javier", inicio: "10:30", minutos: 30, titulo: "Preparar pabellón", tono: "interno" },
  { id: "j3", columna: "javier", inicio: "11:00", minutos: 120, titulo: "Apoyo cirugía Simón" },
  { id: "j4", columna: "javier", inicio: "14:00", minutos: 30, titulo: "Ronda de hospitalizados", tono: "interno" },
  { id: "p1", columna: "pabellon", inicio: "11:00", minutos: 120, titulo: "Simón · limpieza dental", detalle: "Dra. Valentina + Javier" },
  { id: "p2", columna: "pabellon", inicio: "16:00", minutos: 90, titulo: "Reservado: esterilización", detalle: "Falta confirmar ayuno", tono: "porConfirmar" },
  { id: "c1", columna: "camila", inicio: "12:30", minutos: 60, titulo: "Colación", tono: "interno" },
  { id: "c2", columna: "camila", inicio: "17:00", minutos: 30, titulo: "Cierre de caja", tono: "interno" },
];

export function AgendaEquipo() {
  const [vista, setVista] = useState("hoy");
  const [elegido, setElegido] = useState<string | null>("t4");
  const b = BLOQUES.find((x) => x.id === elegido);
  const col = COLUMNAS.find((c) => c.id === b?.columna);

  return (
    <Armazon rol="veterinario" activo="equipo" persona={EQUIPO.vet1}>
      <header className="demo-trabajo__cabeza">
        <div>
          <h1>La agenda del equipo</h1>
          <p>Martes 14 de octubre · quién está con quién, y dónde hay espacio</p>
        </div>
        <ProtoSegmento leyenda="Vista" valor={vista} onCambio={setVista} opciones={[{ id: "hoy", texto: "Hoy" }, { id: "semana", texto: "Semana" }]} />
      </header>

      <div className="demo-leyenda" aria-label="Qué significa cada color">
        <span><i className="demo-leyenda__cita" /> Paciente</span>
        <span><i className="demo-leyenda__confirmar" /> Por confirmar</span>
        <span><i className="demo-leyenda__urgencia" /> Urgencia</span>
        <span><i className="demo-leyenda__interno" /> Tiempo del equipo</span>
      </div>

      <div className="demo-columnas demo-columnas--agenda">
        <ProtoAgenda titulo="Agenda de todo el equipo, hoy" columnas={COLUMNAS} bloques={BLOQUES} ahora="11:42" elegido={elegido} onElegir={setElegido} />

        <ProtoPanel titulo={b ? b.titulo : "Elige un bloque"} sub={b && col ? `${b.inicio} · ${b.minutos} min · ${col.nombre}` : "Toca cualquier bloque para ver el detalle."}>
          {b?.tono === "urgencia" && (
            <ProtoAviso tono="urgencia" titulo="Urgencia agregada por recepción">
              La recibe el Dr. Tomás. A quienes esperan en sala se les avisó del atraso por WhatsApp.
            </ProtoAviso>
          )}
          {b?.detalle && <p>{b.detalle}</p>}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <ProtoBoton tono="accion" tamano="chico">Abrir ficha</ProtoBoton>
            <ProtoBoton tamano="chico" icono={<IconoNota />}>Dejar una nota</ProtoBoton>
          </div>
          <ProtoAviso titulo="Huecos libres hoy">
            Dra. Valentina 10:50 · Dr. Tomás 11:00–11:45 y 16:00–19:00. Recepción los ofrece primero a la lista de espera.
          </ProtoAviso>
        </ProtoPanel>
      </div>
    </Armazon>
  );
}

// ── 6 · Notas del equipo ─────────────────────────────────────────────────

const PARA = [
  { id: "todos", texto: "Todo el equipo" },
  { id: "Técnicos", texto: "Técnicos" },
  { id: "Dr. Tomás", texto: "Tomás" },
  { id: "yo", texto: <><IconoCandado tamano={14} /> Sólo yo</> },
];

export function NotasEquipo() {
  const [para, setPara] = useState("todos");
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [visto, setVisto] = useState(false);

  return (
    <Armazon rol="veterinario" activo="notas" persona={EQUIPO.vet1}>
      <header className="demo-trabajo__cabeza">
        <div>
          <h1>Notas</h1>
          <p>Lo que el equipo tiene que saber, sin perderse en un grupo de WhatsApp</p>
        </div>
        <ProtoSegmento leyenda="Mostrar" valor={filtro} onCambio={setFiltro}
          opciones={[{ id: "todas", texto: "Todas" }, { id: "mias", texto: "Para mí" }, { id: "privadas", texto: "Mis privadas" }]} />
      </header>

      <div className="demo-columnas">
        <div style={{ display: "grid", gap: "1.25rem", minWidth: 0 }}>
          <ProtoPanel titulo="Entrega de turno" sub="La dejó el Dr. Tomás anoche, a las 20:10">
            <ul className="demo-entrega">
              <li><strong>Bruno</strong> (jaula 2): comió poco. Revisar la vía del suero a las 12:00.</li>
              <li><strong>Llamar a</strong> la dueña de Kira: llegaron los exámenes, todo normal.</li>
              <li><strong>Pendiente:</strong> el laboratorio no ha mandado el hemograma de Canela.</li>
            </ul>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--proto-tenue)" }}>
                <IconoOjo tamano={15} /> {visto ? "La leíste tú y Javier" : "La leyó Javier"}
              </span>
              {visto ? (
                <ProtoInsignia estado="bien">Recibida</ProtoInsignia>
              ) : (
                <ProtoBoton tono="accion" tamano="chico" icono={<IconoCheck />} onClick={() => setVisto(true)}>Recibí el turno</ProtoBoton>
              )}
            </div>
          </ProtoPanel>

          <div className="demo-lista">
            <ProtoNota autor={EQUIPO.directora} rol="Directora" hora="lun 18:30" para="todos" fijada vistos={{ n: 4, de: 6 }}>
              <p>El jueves llega el pedido de vacunas a las 9:00. Quien abra, por favor guárdelas altiro en el refri del fondo.</p>
            </ProtoNota>
            <ProtoNota autor={EQUIPO.tecnico} rol="Técnico" hora="11:20" para="Dra. Valentina" paciente="Simón" vistos={{ n: 0, de: 1 }}
              accion={<ProtoBoton tamano="chico">Responder</ProtoBoton>}>
              <p>Simón ya está en ayuno y pesado: 5,2 kg. El pabellón queda listo 10:50.</p>
            </ProtoNota>
            <ProtoNota autor={EQUIPO.recepcion} rol="Recepción" hora="10:05" para="todos" vistos={{ n: 6, de: 6 }}>
              <p>Hoy viene la señora de Kira a buscar la receta. Ya está pagada, sólo entregar.</p>
            </ProtoNota>
            <ProtoNota autor={EQUIPO.vet1} hora="08:40" para="yo">
              <p>Preguntarle a Tomás por la dosis de gabapentina que usó con el gato de los Herrera.</p>
            </ProtoNota>
          </div>
        </div>

        <ProtoPanel titulo="Nueva nota">
          <ProtoSegmento leyenda="Para quién" leyendaVisible valor={para} onCambio={setPara} opciones={PARA} />
          <ProtoCampo etiqueta="Nota" multilinea valor={texto} onCambio={setTexto}
            placeholder={para === "yo" ? "Algo para acordarte…" : "Lo que el equipo tiene que saber…"}
            ayuda={para === "yo" ? "Sólo tú la ves." : "Se avisa a quien va dirigida y queda quién la leyó."} />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "space-between" }}>
            <ProtoBoton tono="fantasma" icono={<IconoMicrofono />} disabled title="Próximamente: dictar con la IA de la clínica">
              Dictar · pronto
            </ProtoBoton>
            <ProtoBoton tono="accion" disabled={texto.trim() === ""}>Publicar</ProtoBoton>
          </div>
          <ProtoAviso titulo="Escribe como si el dueño la fuera a leer">
            Con la Ley 21.719 un cliente puede pedir ver lo que guardamos sobre él. Hechos, no juicios: «llegó molesto por la espera»,
            nunca «cliente pesado».
          </ProtoAviso>
        </ProtoPanel>
      </div>
    </Armazon>
  );
}

// ── 7 · La ficha compartida del paciente ─────────────────────────────────

export function FichaCompartida() {
  const [nota, setNota] = useState("");
  const [interna, setInterna] = useState("clinica");

  return (
    <Armazon rol="veterinario" activo="fichas" persona={EQUIPO.vet1}>
      <header className="demo-trabajo__cabeza">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <ProtoAvatar nombre="Canela" tipo="mascota" tamano="grande" />
          <div>
            <h1>Canela</h1>
            <p>Perra · mestiza · 12 años · 14,8 kg · de Jorge Reyes</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <ProtoInsignia estado="espera">Hemograma pendiente</ProtoInsignia>
          <ProtoInsignia estado="persona">Paciente renal</ProtoInsignia>
        </div>
      </header>

      <div className="demo-columnas">
        <ProtoPanel titulo="Su historia" sub="La ve todo el equipo clínico. Cada línea dice quién la escribió.">
          <ProtoLineaTiempo
            hitos={[
              { id: "h1", fecha: "hoy 10:30", tipo: "consulta", autor: "Dra. Valentina", titulo: "Control renal",
                cuerpo: "Más animada. Toma bien el alimento renal. Creatinina pendiente: se repite el examen." },
              { id: "h2", fecha: "hoy 10:41", tipo: "nota", autor: "Javier", interna: true, titulo: "Para el próximo control",
                cuerpo: "Se estresa en la mesa de metal: atenderla sobre la manta, en el suelo." },
              { id: "h3", fecha: "2 oct", tipo: "examen", autor: "Dr. Tomás", titulo: "Perfil bioquímico",
                cuerpo: "Creatinina 2,1 mg/dL (alta). Se inicia dieta renal." },
              { id: "h4", fecha: "28 sep", tipo: "consulta", autor: "Dr. Tomás", titulo: "Consulta: toma mucha agua",
                cuerpo: "Polidipsia hace 3 semanas. Se piden exámenes." },
              { id: "h5", fecha: "15 mar", tipo: "vacuna", autor: "Dra. Valentina", titulo: "Antirrábica anual" },
            ]}
          />
        </ProtoPanel>

        <div style={{ display: "grid", gap: "1.25rem", minWidth: 0 }}>
          <ProtoPanel titulo="Agregar a su historia">
            <ProtoSegmento leyenda="Tipo de registro" valor={interna} onCambio={setInterna}
              opciones={[{ id: "clinica", texto: "Nota clínica" }, { id: "interna", texto: "Nota interna del equipo" }]} />
            <ProtoCampo etiqueta={interna === "clinica" ? "Nota clínica" : "Nota interna"} multilinea valor={nota} onCambio={setNota}
              ayuda={interna === "clinica" ? "Va al informe que se le entrega al dueño." : "Para el equipo: no va en el informe, pero el dueño puede pedirla."} />
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "space-between" }}>
              <ProtoBoton tono="fantasma" icono={<IconoMicrofono />} disabled title="Próximamente: dictar con la IA de la clínica">
                Dictar · pronto
              </ProtoBoton>
              <ProtoBoton tono="accion" disabled={nota.trim() === ""}>Guardar</ProtoBoton>
            </div>
          </ProtoPanel>

          <ProtoPanel titulo="Quién la vio" sub="Bitácora de accesos · Ley 21.719" variante="pozo" nivel={3}>
            <ul className="demo-bitacora">
              <li><time>10:41</time><span>Javier agregó una nota interna</span></li>
              <li><time>10:30</time><span>Dra. Valentina abrió la ficha</span></li>
              <li><time>10:02</time><span>Camila (recepción) vio los datos de contacto</span></li>
            </ul>
          </ProtoPanel>
        </div>
      </div>
    </Armazon>
  );
}
