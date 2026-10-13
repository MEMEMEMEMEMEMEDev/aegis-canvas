import { useState } from "react";
import ProtoAviso from "../ProtoAviso/ProtoAviso";
import ProtoBoton from "../ProtoBoton/ProtoBoton";
import ProtoCampo from "../ProtoCampo/ProtoCampo";
import ProtoCasilla from "../ProtoCasilla/ProtoCasilla";
import ProtoCita, { type ProtoCitaEstado } from "../ProtoCita/ProtoCita";
import ProtoInsignia from "../ProtoInsignia/ProtoInsignia";
import ProtoPanel from "../ProtoPanel/ProtoPanel";
import ProtoSegmento from "../ProtoSegmento/ProtoSegmento";
import { IconoCerrar, IconoCheck, IconoMensaje, IconoNota, IconoReloj } from "../iconos";
import { EQUIPO, pesos } from "./datos";
import { Armazon } from "./Panel";
import "./demo.scss";

// ── 8 · Recepción: el mesón y la caja ────────────────────────────────────

interface Llegada {
  id: string;
  hora: string;
  minutos: number;
  mascota: string;
  especie: string;
  dueno: string;
  servicio: string;
  vet: string;
  estado: ProtoCitaEstado;
  /** Desde cuándo espera en sala (sólo si estado = enSala). */
  esperando?: number;
}

const LLEGADAS: Llegada[] = [
  { id: "l1", hora: "09:30", minutos: 20, mascota: "Rocky", especie: "Perro", dueno: "Andrea Vidal", servicio: "Vacuna anual", vet: "Dra. Valentina", estado: "atendida" },
  { id: "l2", hora: "10:00", minutos: 30, mascota: "Luna", especie: "Gata", dueno: "Marcela Díaz", servicio: "Consulta general", vet: "Dra. Valentina", estado: "enAtencion" },
  { id: "l3", hora: "11:00", minutos: 30, mascota: "Mía", especie: "Gata", dueno: "Javiera Lagos", servicio: "Consulta general", vet: "Dr. Tomás", estado: "enSala", esperando: 40 },
  { id: "l4", hora: "11:45", minutos: 45, mascota: "Toby", especie: "Perro", dueno: "Ignacio Mora", servicio: "Urgencia: atropello leve", vet: "Dr. Tomás", estado: "enSala", esperando: 3 },
  { id: "l5", hora: "12:30", minutos: 30, mascota: "Kira", especie: "Perra", dueno: "Sofía Rivas", servicio: "Retira receta", vet: "Dr. Tomás", estado: "confirmada" },
  { id: "l6", hora: "15:00", minutos: 30, mascota: "Pelusa", especie: "Coneja", dueno: "Diego Soto", servicio: "Consulta general", vet: "Dra. Valentina", estado: "porConfirmar" },
];

const PRODUCTOS = [
  { id: "renal", nombre: "Alimento renal 2 kg", precio: 24990 },
  { id: "snack", nombre: "Snacks dentales", precio: 4990 },
  { id: "pipeta", nombre: "Pipeta antipulgas", precio: 9990 },
];

interface Linea { id: string; nombre: string; precio: number; deCita?: boolean }

export function Meson() {
  const [llegadas, setLlegadas] = useState(LLEGADAS);
  const [lineas, setLineas] = useState<Linea[]>([{ id: "cita", nombre: "Vacuna anual · Rocky", precio: 12000, deCita: true }]);
  const [medio, setMedio] = useState("debito");
  const [recibido, setRecibido] = useState("");
  const [pagado, setPagado] = useState(false);

  const total = lineas.reduce((s, l) => s + l.precio, 0);
  const recibidoNum = Number(recibido.replace(/\D/g, "")) || 0;
  const vuelto = recibidoNum - total;
  const sala = llegadas.filter((l) => l.estado === "enSala");
  const largaEspera = sala.find((l) => (l.esperando ?? 0) >= 30);
  const medioTexto = { efectivo: "Efectivo", debito: "Débito", credito: "Crédito", transferencia: "Transferencia" }[medio] ?? medio;

  const marcarLlegada = (id: string) =>
    setLlegadas(llegadas.map((l) => (l.id === id ? { ...l, estado: "enSala", esperando: 0 } : l)));

  return (
    <Armazon rol="recepcion" activo="meson" persona={EQUIPO.recepcion}>
      <header className="demo-trabajo__cabeza">
        <div>
          <h1>Hola, Camila</h1>
          <p>Martes 14 de octubre · {sala.length} en sala de espera · {llegadas.filter((l) => l.estado === "confirmada" || l.estado === "porConfirmar").length} por llegar</p>
        </div>
        <ProtoBoton tono="suave" icono={<IconoMensaje />}>Mensajes · 3 sin leer</ProtoBoton>
      </header>

      {largaEspera && (
        <ProtoAviso
          tono="espera"
          icono={<IconoReloj />}
          titulo={`${largaEspera.dueno.split(" ")[0]} lleva ${largaEspera.esperando} min en sala con ${largaEspera.mascota}`}
          accion={<ProtoBoton tono="calido" tamano="chico" icono={<IconoMensaje />}>Contarle cuánto falta</ProtoBoton>}
        >
          El Dr. Tomás está con una urgencia. Avisarle antes de que pregunte cambia toda la conversación.
        </ProtoAviso>
      )}

      <div className="demo-columnas">
        <ProtoPanel titulo="Llegadas de hoy" sub="Marca cuando llegan: el veterinario ve al instante quién está en sala">
          <div className="demo-lista">
            {llegadas.map((l) => (
              <ProtoCita
                key={l.id}
                hora={l.hora}
                duracion={l.minutos}
                mascota={l.mascota}
                especie={`${l.especie} · ${l.vet}`}
                dueno={l.dueno}
                servicio={l.servicio}
                estado={l.estado}
                urgente={l.servicio.startsWith("Urgencia")}
                nota={l.estado === "enSala" && l.esperando !== undefined && l.esperando > 0 ? `Esperando hace ${l.esperando} min` : undefined}
                accion={
                  l.estado === "confirmada" ? (
                    <ProtoBoton tono="accion" tamano="chico" icono={<IconoCheck />} onClick={() => marcarLlegada(l.id)}>Llegó</ProtoBoton>
                  ) : l.estado === "porConfirmar" ? (
                    <ProtoBoton tamano="chico" icono={<IconoMensaje />}>Recordar</ProtoBoton>
                  ) : undefined
                }
              />
            ))}
          </div>
        </ProtoPanel>

        <div style={{ display: "grid", gap: "1.25rem", minWidth: 0 }}>
          <ProtoPanel titulo="Cobrar" sub="Andrea Vidal · Rocky">
            {pagado ? (
              <>
                <ProtoAviso tono="bien" icono={<IconoCheck />} titulo={`Pago registrado · ${pesos(total)} · ${medioTexto}`}>
                  Queda en la caja de hoy y en la ficha de Rocky.
                </ProtoAviso>
                <ProtoBoton tono="fantasma" onClick={() => { setPagado(false); setLineas([{ id: "cita", nombre: "Vacuna anual · Rocky", precio: 12000, deCita: true }]); setRecibido(""); }}>
                  Siguiente cliente
                </ProtoBoton>
              </>
            ) : (
              <>
                <ul className="demo-cobro">
                  {lineas.map((l) => (
                    <li key={l.id}>
                      <span>{l.nombre}{l.deCita && <span className="demo-cobro__de"> · de la cita</span>}</span>
                      <span className="demo-cobro__monto">{pesos(l.precio)}</span>
                      {!l.deCita && (
                        <button type="button" className="demo-cobro__quitar" aria-label={`Quitar ${l.nombre}`}
                          onClick={() => setLineas(lineas.filter((x) => x.id !== l.id))}>
                          <IconoCerrar tamano={16} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <div>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--proto-tenue)", marginBottom: "0.375rem" }}>Agregar de la tienda</p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {PRODUCTOS.map((p) => (
                      <ProtoBoton key={p.id} tamano="chico" disabled={lineas.some((l) => l.id === p.id)}
                        onClick={() => setLineas([...lineas, { id: p.id, nombre: p.nombre, precio: p.precio }])}>
                        + {p.nombre}
                      </ProtoBoton>
                    ))}
                  </div>
                </div>
                <div className="demo-cobro__total"><span>Total</span><strong>{pesos(total)}</strong></div>
                <ProtoSegmento leyenda="Medio de pago" leyendaVisible valor={medio} onCambio={setMedio}
                  opciones={[{ id: "efectivo", texto: "Efectivo" }, { id: "debito", texto: "Débito" }, { id: "credito", texto: "Crédito" }, { id: "transferencia", texto: "Transferencia" }]} />
                {medio === "efectivo" && (
                  <ProtoCampo etiqueta="Recibido" valor={recibido} onCambio={setRecibido} placeholder="$20.000"
                    ayuda={recibidoNum > 0 ? (vuelto >= 0 ? `Vuelto: ${pesos(vuelto)}` : `Faltan ${pesos(-vuelto)}`) : "Escribe cuánto te pasaron y te calculo el vuelto."} />
                )}
                <ProtoBoton tono="accion" bloque icono={<IconoCheck />}
                  disabled={medio === "efectivo" && vuelto < 0}
                  onClick={() => setPagado(true)}>
                  Registrar pago de {pesos(total)}
                </ProtoBoton>
                <p style={{ fontSize: "0.8125rem", color: "var(--proto-tenue)" }}>
                  La boleta se sigue emitiendo como hoy. Cuando el sistema la emita (SII), aparecerá aquí.
                </p>
              </>
            )}
          </ProtoPanel>

          <ProtoPanel titulo="Caja de hoy" variante="pozo" nivel={3}
            accion={<ProtoBoton tamano="chico">Cerrar caja</ProtoBoton>}>
            <dl className="demo-resumen" style={{ background: "var(--proto-hoja)" }}>
              <div><dt>Efectivo</dt><dd>{pesos(64980)}</dd></div>
              <div><dt>Débito y crédito</dt><dd>{pesos(301020 + (pagado && medio !== "efectivo" && medio !== "transferencia" ? total : 0))}</dd></div>
              <div><dt>Transferencias</dt><dd>{pesos(46000)}</dd></div>
            </dl>
          </ProtoPanel>
        </div>
      </div>
    </Armazon>
  );
}

// ── 9 · Técnico: las rondas ──────────────────────────────────────────────

type DosisEstado = "dada" | "proxima" | "atrasada" | "luego";

interface Dosis { hora: string; que: string; estado: DosisEstado; quien?: string }

interface Internado {
  id: string;
  nombre: string;
  detalle: string;
  jaula: string;
  aCargo: string;
  motivo: string;
  dosis: Dosis[];
  ultimoControl: string;
}

const INTERNADOS: Internado[] = [
  {
    id: "michi", nombre: "Michi", detalle: "Gato · 9 años", jaula: "Jaula 4", aCargo: "Dr. Tomás", motivo: "Deshidratación · vómitos",
    ultimoControl: "08:05 · 38,9 °C · no comió",
    dosis: [
      { hora: "08:00", que: "Suero subcutáneo 150 ml", estado: "dada", quien: "Javier" },
      { hora: "11:30", que: "Ondansetrón 0,5 mg/kg", estado: "atrasada" },
      { hora: "16:00", que: "Suero subcutáneo 150 ml", estado: "luego" },
    ],
  },
  {
    id: "bruno", nombre: "Bruno", detalle: "Perro · 6 años", jaula: "Jaula 2", aCargo: "Dra. Valentina", motivo: "Post operatorio · tumor en piel",
    ultimoControl: "08:10 · 38,4 °C · comió poco",
    dosis: [
      { hora: "08:00", que: "Meloxicam 0,1 mg/kg", estado: "dada", quien: "Javier" },
      { hora: "12:00", que: "Suero: revisar la vía", estado: "proxima" },
      { hora: "14:00", que: "Amoxicilina 250 mg", estado: "luego" },
    ],
  },
];

const ESTADO_DOSIS: Record<DosisEstado, { texto: string; insignia: "bien" | "espera" | "neutra" }> = {
  dada: { texto: "Dada", insignia: "bien" },
  proxima: { texto: "En 18 min", insignia: "neutra" },
  atrasada: { texto: "Atrasada 12 min", insignia: "espera" },
  luego: { texto: "Más tarde", insignia: "neutra" },
};

function TarjetaInternado({ i }: { i: Internado }) {
  const [dosis, setDosis] = useState(i.dosis);
  const [temp, setTemp] = useState("");
  const [comio, setComio] = useState("poco");
  const [guardado, setGuardado] = useState(false);

  return (
    <ProtoPanel titulo={`${i.nombre} · ${i.jaula}`} sub={`${i.detalle} · ${i.motivo} · a cargo: ${i.aCargo}`}>
      <ul className="demo-dosis">
        {dosis.map((d, k) => (
          <li key={d.hora}>
            <time>{d.hora}</time>
            <span>
              {d.que}
              {d.estado === "dada" && <span style={{ display: "block", fontSize: "0.75rem", color: "var(--proto-tenue)" }}>Dada por {d.quien ?? "Javier"}</span>}
            </span>
            {d.estado === "dada" ? (
              <ProtoInsignia estado="bien">Dada</ProtoInsignia>
            ) : d.estado === "luego" ? (
              <ProtoInsignia>{ESTADO_DOSIS.luego.texto}</ProtoInsignia>
            ) : (
              <span style={{ display: "flex", gap: "0.375rem", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                <ProtoInsignia estado={ESTADO_DOSIS[d.estado].insignia}>{ESTADO_DOSIS[d.estado].texto}</ProtoInsignia>
                <ProtoBoton tamano="chico" tono={d.estado === "atrasada" ? "accion" : "suave"}
                  onClick={() => setDosis(dosis.map((x, j) => (j === k ? { ...x, estado: "dada", quien: "Javier" } : x)))}>
                  Marcar dada
                </ProtoBoton>
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="demo-control">
        <p className="demo-control__titulo">Control de ahora <span>· el último: {i.ultimoControl}</span></p>
        {guardado ? (
          <ProtoAviso tono="bien" icono={<IconoCheck />} titulo="Control guardado a las 11:42">
            Lo ve {i.aCargo} en la ficha de {i.nombre}.
          </ProtoAviso>
        ) : (
          <>
            <div className="demo-control__fila">
              <ProtoCampo etiqueta="Temperatura (°C)" valor={temp} onCambio={setTemp} placeholder="38,5" />
              <ProtoSegmento leyenda="¿Comió?" leyendaVisible valor={comio} onCambio={setComio}
                opciones={[{ id: "todo", texto: "Todo" }, { id: "poco", texto: "Poco" }, { id: "nada", texto: "Nada" }]} />
            </div>
            <ProtoBoton tono="accion" tamano="chico" disabled={temp.trim() === ""} onClick={() => setGuardado(true)} className="demo-control__guardar">Guardar control</ProtoBoton>
          </>
        )}
      </div>
    </ProtoPanel>
  );
}

export function Rondas() {
  const [tareas, setTareas] = useState({ pabellon: false, instrumental: true, jeringas: false, jaula: false });
  const [avisado, setAvisado] = useState(false);
  const [pedida, setPedida] = useState(false);
  const marca = (k: keyof typeof tareas) => (v: boolean) => setTareas({ ...tareas, [k]: v });
  const hechas = Object.values(tareas).filter(Boolean).length;

  return (
    <Armazon rol="tecnico" activo="rondas" persona={EQUIPO.tecnico}>
      <header className="demo-trabajo__cabeza">
        <div>
          <h1>Rondas de hoy, Javier</h1>
          <p>2 hospitalizados · 1 dosis atrasada · ahora estás en la cirugía de Simón (hasta las 13:00)</p>
        </div>
      </header>

      <ProtoAviso
        tono="espera"
        icono={<IconoNota />}
        titulo="Michi no ha comido desde ayer"
        accion={avisado ? <ProtoInsignia estado="bien">Avisado</ProtoInsignia> : (
          <ProtoBoton tono="calido" tamano="chico" onClick={() => setAvisado(true)}>Avisar al Dr. Tomás</ProtoBoton>
        )}
      >
        Dos controles seguidos sin comer. El aviso le llega como nota, pegada a la ficha de Michi.
      </ProtoAviso>

      <ProtoAviso
        tono="espera"
        icono={<IconoReloj />}
        titulo="El ondansetrón de Michi está atrasado: estás en pabellón"
        accion={pedida ? <ProtoInsignia estado="bien">Se la pediste a Camila</ProtoInsignia> : (
          <ProtoBoton tono="calido" tamano="chico" onClick={() => setPedida(true)}>Pedírsela a quien esté libre</ProtoBoton>
        )}
      >
        El sistema sabe quién no tiene paciente ahora mismo según la agenda del equipo.
      </ProtoAviso>

      <div className="demo-columnas">
        <div style={{ display: "grid", gap: "1.25rem", minWidth: 0 }}>
          {INTERNADOS.map((i) => <TarjetaInternado key={i.id} i={i} />)}
        </div>

        <div style={{ display: "grid", gap: "1.25rem", minWidth: 0 }}>
          <ProtoPanel titulo="Tareas del día" sub={`${hechas} de 4 hechas`}>
            <div style={{ display: "grid", gap: "0.875rem" }}>
              <ProtoCasilla marcada={tareas.pabellon} onCambio={marca("pabellon")} detalle="Antes de las 15:50 · esterilización de las 16:00">
                Preparar el pabellón
              </ProtoCasilla>
              <ProtoCasilla marcada={tareas.instrumental} onCambio={marca("instrumental")} detalle="Hecho a las 09:40">
                Esterilizar el instrumental
              </ProtoCasilla>
              <ProtoCasilla marcada={tareas.jeringas} onCambio={marca("jeringas")} detalle="Quedan 6 de 3 ml en el box 1">
                Reponer jeringas
              </ProtoCasilla>
              <ProtoCasilla marcada={tareas.jaula} onCambio={marca("jaula")} detalle="Se fue de alta Pancho">
                Limpiar y desinfectar la jaula 3
              </ProtoCasilla>
            </div>
          </ProtoPanel>

          <ProtoPanel titulo="Lo que usaste" sub="Se descuenta del stock y queda en la ficha" variante="pozo" nivel={3}>
            <ul className="demo-bitacora">
              <li><time>08:00</time><span>Suero fisiológico 500 ml × 1 · Michi</span></li>
              <li><time>08:00</time><span>Meloxicam inyectable 1 ml · Bruno</span></li>
            </ul>
            <ProtoBoton tamano="chico">+ Registrar uso</ProtoBoton>
          </ProtoPanel>
        </div>
      </div>
    </Armazon>
  );
}
