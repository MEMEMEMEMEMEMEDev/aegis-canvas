import { useState, type ReactNode } from "react";
import ProtoAvatar from "../ProtoAvatar/ProtoAvatar";
import ProtoAviso from "../ProtoAviso/ProtoAviso";
import ProtoBarra from "../ProtoBarra/ProtoBarra";
import ProtoBoton from "../ProtoBoton/ProtoBoton";
import ProtoCita from "../ProtoCita/ProtoCita";
import ProtoInsignia from "../ProtoInsignia/ProtoInsignia";
import ProtoMetrica from "../ProtoMetrica/ProtoMetrica";
import ProtoPanel from "../ProtoPanel/ProtoPanel";
import {
  IconoAlerta, IconoBolsa, IconoCalendario, IconoCaja, IconoCama, IconoCandado, IconoCheck, IconoGrafico,
  IconoEquipo, IconoHuella, IconoMensaje, IconoMicrofono, IconoNota, IconoPersona,
} from "../iconos";
import { EQUIPO, pesos } from "./datos";
import Ficticio from "./Ficticio";
import "./demo.scss";

export type Rol = "veterinario" | "jefa" | "recepcion" | "tecnico";

const CARGO: Record<Rol, string> = {
  veterinario: "Médica veterinaria",
  jefa: "Directora",
  recepcion: "Recepción",
  tecnico: "Técnico veterinario",
};

const SECCION: Record<Rol, string> = { veterinario: "Clínica", jefa: "Dirección", recepcion: "Recepción", tecnico: "Clínica" };

const MENU: Record<Rol, { id: string; texto: string; icono: ReactNode }[]> = {
  veterinario: [
    { id: "dia", texto: "Mi día", icono: <IconoCalendario /> },
    { id: "equipo", texto: "Agenda del equipo", icono: <IconoEquipo /> },
    { id: "notas", texto: "Notas", icono: <IconoNota /> },
    { id: "hosp", texto: "Hospitalizados", icono: <IconoCama /> },
    { id: "fichas", texto: "Fichas", icono: <IconoHuella /> },
    { id: "mensajes", texto: "Mensajes", icono: <IconoMensaje /> },
  ],
  jefa: [
    { id: "resumen", texto: "Resumen", icono: <IconoGrafico /> },
    { id: "caja", texto: "Caja y pagos", icono: <IconoCaja /> },
    { id: "agenda", texto: "Agenda", icono: <IconoCalendario /> },
    { id: "stock", texto: "Stock", icono: <IconoBolsa /> },
    { id: "equipo", texto: "Equipo", icono: <IconoPersona /> },
  ],
  recepcion: [
    { id: "meson", texto: "El mesón", icono: <IconoCaja /> },
    { id: "equipo", texto: "Agenda del equipo", icono: <IconoEquipo /> },
    { id: "mensajes", texto: "Mensajes", icono: <IconoMensaje /> },
    { id: "notas", texto: "Notas", icono: <IconoNota /> },
    { id: "tienda", texto: "Tienda", icono: <IconoBolsa /> },
  ],
  tecnico: [
    { id: "rondas", texto: "Rondas", icono: <IconoCama /> },
    { id: "equipo", texto: "Agenda del equipo", icono: <IconoEquipo /> },
    { id: "notas", texto: "Notas", icono: <IconoNota /> },
    { id: "stock", texto: "Stock", icono: <IconoBolsa /> },
  ],
};

/** El armazón del panel (React + Vite en la app real): barra, menú por rol y trabajo. */
export function Armazon({ rol, activo, persona, children }: { rol: Rol; activo: string; persona: string; children: ReactNode }) {
  return (
    <div className="proto-scope demo-pagina">
      <Ficticio texto="Maqueta del panel de la clínica · datos ficticios" />
      <ProtoBarra
        fin={
          <span style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <span style={{ display: "grid", textAlign: "right", lineHeight: 1.25 }}>
              <strong style={{ fontSize: "0.875rem" }}>{persona}</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--proto-tenue)" }}>{CARGO[rol]}</span>
            </span>
            <ProtoAvatar nombre={persona.replace(/^Dra?\.\s*/, "")} tamano="chico" />
          </span>
        }
      />
      <div className="demo-panel-app">
        <nav className="demo-menu" aria-label="Secciones">
          <p className="demo-menu__rol">{SECCION[rol]}</p>
          {MENU[rol].map((m) => (
            <a key={m.id} href={`#${m.id}`} className="demo-menu__item" aria-current={m.id === activo ? "page" : undefined}>
              {m.icono}{m.texto}
            </a>
          ))}
        </nav>
        <main className="demo-trabajo">{children}</main>
      </div>
    </div>
  );
}

// ── 3 · Mi día (veterinaria) ─────────────────────────────────────────────

const DOSIS = [
  { hora: "08:00", que: "Meloxicam 0,1 mg/kg", quien: "Javier", hecha: true },
  { hora: "12:00", que: "Suero: revisar vía", quien: "", hecha: false },
  { hora: "14:00", que: "Amoxicilina 250 mg", quien: "", hecha: false },
];

export function MiDia() {
  const [dosis, setDosis] = useState(DOSIS);
  const [dictando, setDictando] = useState(false);

  return (
    <Armazon rol="veterinario" activo="dia" persona={EQUIPO.vet1}>
      <header className="demo-trabajo__cabeza">
        <div>
          <h1>Buenos días, Valentina</h1>
          <p>Martes 14 de octubre · 9 atenciones · 1 cirugía · 2 hospitalizados</p>
        </div>
        <ProtoBoton tono="suave" icono={<IconoCalendario />}>Ver la semana</ProtoBoton>
      </header>

      <ProtoAviso
        tono="urgencia"
        icono={<IconoAlerta />}
        titulo="Urgencia en camino: Toby, perro, 4 años"
        accion={<ProtoBoton tono="urgencia" tamano="chico">Recibirla</ProtoBoton>}
      >
        Atropello leve, llega en ~10 min. Recepción ya avisó a las 11:30 que hay atraso.
      </ProtoAviso>

      <div className="demo-columnas">
        <ProtoPanel titulo="Tu agenda" sub="La altura de cada bloque es su duración">
          <div className="demo-lista">
            <ProtoCita forma="bloque" hora="09:00" duracion={30} mascota="Mía" especie="Gata · 3 años" dueno="Javiera Lagos" servicio="Consulta general" estado="atendida" />
            <ProtoCita forma="bloque" hora="09:30" duracion={20} mascota="Rocky" especie="Perro · Labrador · 7 años" dueno="Andrea Vidal" servicio="Vacuna anual" estado="enAtencion"
              nota="Se pone nervioso al pesarlo: mejor en el suelo." accion={<ProtoBoton tono="accion" tamano="chico">Abrir ficha</ProtoBoton>} />
            <ProtoCita forma="bloque" hora="10:00" duracion={30} mascota="Luna" especie="Gata · 1 año" dueno="Marcela Díaz" servicio="Consulta general" estado="enSala" />
            <ProtoCita forma="bloque" hora="10:30" duracion={20} mascota="Canela" especie="Perra · 12 años" dueno="Jorge Reyes" servicio="Control renal" estado="confirmada" />
            <div className="demo-hueco"><IconoCheck /> 10:50–11:00 · libre</div>
            <ProtoCita forma="bloque" hora="11:00" duracion={120} mascota="Simón" especie="Gato · 5 años" dueno="Paula Herrera" servicio="Cirugía: limpieza dental" estado="confirmada"
              nota="Ayuno desde las 23:00 · confirmado por WhatsApp." />
            <ProtoCita forma="bloque" hora="15:00" duracion={30} mascota="Pelusa" especie="Coneja · 2 años" dueno="Diego Soto" servicio="Consulta general" estado="porConfirmar" />
          </div>
        </ProtoPanel>

        <div style={{ display: "grid", gap: "1.25rem", minWidth: 0 }}>
          <ProtoPanel titulo="Ahora: Rocky" sub="Vacuna anual · 09:30">
            <div className="demo-ficha">
              <div className="demo-ficha__quien">
                <ProtoAvatar nombre="Rocky" tipo="mascota" tamano="grande" />
                <div>
                  <p style={{ fontFamily: "var(--proto-font-titulo)", fontSize: "1.375rem", fontWeight: 600 }}>Rocky</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--proto-tenue)" }}>Labrador · 7 años · 31,4 kg</p>
                </div>
              </div>
              <dl className="demo-ficha__datos">
                <div><dt>Última visita</dt><dd>12 de agosto · otitis</dd></div>
                <div><dt>Alergias</dt><dd>Ninguna conocida</dd></div>
                <div><dt>Dueña</dt><dd>Andrea Vidal</dd></div>
                <div>
                  <dt>Contacto</dt>
                  <dd style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <IconoCandado tamano={16} /> Protegido
                  </dd>
                </div>
              </dl>
              <ProtoBoton
                tono={dictando ? "calido" : "accion"}
                bloque
                icono={<IconoMicrofono />}
                aria-pressed={dictando}
                onClick={() => setDictando(!dictando)}
              >
                {dictando ? "Dictando… toca para terminar" : "Dictar la nota de la consulta"}
              </ProtoBoton>
              <p style={{ fontSize: "0.8125rem", color: "var(--proto-tenue)" }}>
                La IA de la clínica la transcribe y la ordena en la ficha. Tú la revisas antes de guardarla.
              </p>
            </div>
          </ProtoPanel>

          <ProtoPanel titulo="Hospitalizado: Bruno" sub="Perro · post operatorio · jaula 2">
            <ul className="demo-dosis">
              {dosis.map((d, i) => (
                <li key={d.hora}>
                  <time>{d.hora}</time>
                  <span>{d.que}{d.hecha && <span style={{ display: "block", fontSize: "0.75rem", color: "var(--proto-tenue)" }}>Dada por {d.quien || "Valentina"}</span>}</span>
                  {d.hecha ? (
                    <ProtoInsignia estado="bien">Dada</ProtoInsignia>
                  ) : (
                    <ProtoBoton
                      tono="suave"
                      tamano="chico"
                      onClick={() => setDosis(dosis.map((x, j) => (j === i ? { ...x, hecha: true } : x)))}
                    >
                      Marcar
                    </ProtoBoton>
                  )}
                </li>
              ))}
            </ul>
          </ProtoPanel>
        </div>
      </div>
    </Armazon>
  );
}

// ── 4 · Tablero (la directora) ───────────────────────────────────────────

const PAGOS = [
  { hora: "11:20", concepto: "Consulta · Mía", medio: "Débito", monto: 18000 },
  { hora: "11:05", concepto: "Alimento renal 2 kg", medio: "Efectivo", monto: 24990 },
  { hora: "10:48", concepto: "Vacuna · Rocky", medio: "Transferencia", monto: 12000 },
  { hora: "10:31", concepto: "Arena + snacks", medio: "Débito", monto: 15480 },
  { hora: "10:02", concepto: "Control · Canela", medio: "Débito", monto: 10000 },
];

const STOCK = [
  { que: "Vacuna óctuple canina", nota: "Lote 2291 · vence en 12 días", estado: "espera" as const, texto: "Vence pronto" },
  { que: "Alimento renal felino 2 kg", nota: "Quedan 3 · se venden ~6 por semana", estado: "espera" as const, texto: "Pedir" },
  { que: "Amoxicilina 250 mg", nota: "Lote 8812 · vence en 40 días", estado: "neutra" as const, texto: "Revisar" },
];

export function Tablero() {
  return (
    <Armazon rol="jefa" activo="resumen" persona={EQUIPO.directora}>
      <header className="demo-trabajo__cabeza">
        <div>
          <h1>Así va la clínica hoy</h1>
          <p>Martes 14 de octubre · actualizado 11:42</p>
        </div>
        <ProtoBoton tono="suave" icono={<IconoGrafico />}>Ver el mes</ProtoBoton>
      </header>

      <div className="demo-metricas">
        <ProtoMetrica icono={<IconoCaja />} rotulo="Ingresos de hoy" valor={pesos(412000)} nota={`consultas ${pesos(286000)} · tienda ${pesos(126000)}`} />
        <ProtoMetrica icono={<IconoGrafico />} rotulo="Mes a la fecha" valor={pesos(6840000)} tendencia={{ texto: "+8 %", sentido: "buena" }} nota="vs. septiembre a esta fecha" />
        <ProtoMetrica icono={<IconoCalendario />} rotulo="Agenda ocupada" valor="82 %" nota="esta semana" />
        <ProtoMetrica icono={<IconoCheck />} rotulo="Horas recuperadas" valor="3 de 9" nota="cancelaciones que tomó la lista de espera" />
        <ProtoMetrica icono={<IconoMensaje />} rotulo="WhatsApp hoy" valor="37" nota="29 los resolvió el asistente · 8 una persona" />
      </div>

      <div className="demo-columnas">
        <ProtoPanel titulo="Últimos pagos" accion={<ProtoBoton tono="fantasma" tamano="chico">Ver caja</ProtoBoton>}>
          <div className="demo-tabla-envoltura" role="region" aria-label="Últimos pagos" tabIndex={0}>
            <table className="demo-tabla">
              <caption className="proto-oculto">Últimos pagos de hoy</caption>
              <thead><tr><th scope="col">Hora</th><th scope="col">Concepto</th><th scope="col">Medio</th><th scope="col">Monto</th></tr></thead>
              <tbody>
                {PAGOS.map((p) => (
                  <tr key={p.hora}><td>{p.hora}</td><td>{p.concepto}</td><td>{p.medio}</td><td>{pesos(p.monto)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </ProtoPanel>

        <div style={{ display: "grid", gap: "1.25rem", minWidth: 0 }}>
          <ProtoPanel titulo="Quién atendió hoy" nivel={2}>
            <ul className="demo-barras">
              {[
                { quien: "Dra. Valentina Rojas", n: 6, de: 9 },
                { quien: "Dr. Tomás Fuentes", n: 4, de: 8 },
              ].map((x) => (
                <li key={x.quien}>
                  <span className="demo-barras__fila"><span>{x.quien}</span><span>{x.n} de {x.de}</span></span>
                  <span className="demo-barras__pista" aria-hidden="true"><span className="demo-barras__relleno" style={{ width: `${(x.n / x.de) * 100}%`, display: "block" }} /></span>
                </li>
              ))}
              <li>
                <span className="demo-barras__fila"><span>Tienda (alimentos y accesorios)</span><span>{pesos(126000)}</span></span>
                <span className="demo-barras__pista" aria-hidden="true"><span className="demo-barras__relleno demo-barras__relleno--tienda" style={{ width: "31%", display: "block" }} /></span>
              </li>
            </ul>
          </ProtoPanel>

          <ProtoPanel titulo="Stock que pide atención">
            <div className="demo-lista">
              {STOCK.map((s) => (
                <div key={s.que} style={{ display: "flex", gap: "0.75rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 600 }}>{s.que}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--proto-tenue)" }}>{s.nota}</p>
                  </div>
                  <ProtoInsignia estado={s.estado}>{s.texto}</ProtoInsignia>
                </div>
              ))}
            </div>
          </ProtoPanel>
        </div>
      </div>
    </Armazon>
  );
}
