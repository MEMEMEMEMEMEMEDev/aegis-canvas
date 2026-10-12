// La landing de SOS Ruta (frame SOSruta del Figma, corregido y ampliado).
//
// Pensada para Astro: cada sección es un componente SIN estado, que Astro
// renderiza a HTML estático sin JavaScript. Sólo dos son islas que se
// hidratan (`client:visible`): DemoEnVivo y ProductoPestanas.
//
// Las capturas de pantalla NO son imágenes: son las pantallas reales de la
// familia, escaladas e inertes. Si una pantalla cambia, la landing también.
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import BalizaAlerta from "../BalizaAlerta/BalizaAlerta";
import BalizaBoton from "../BalizaBoton/BalizaBoton";
import BalizaPestanas, { idsPestana } from "../BalizaPestanas/BalizaPestanas";
import {
  IconoAlerta, IconoCamion, IconoCandado, IconoCheck, IconoConexion, IconoEscudo, IconoPersonas, IconoQr, IconoRuta, IconoTelefono, IconoUbicacion,
} from "../iconos";
import { PantallaInicio } from "./AppTrabajador";
import FichaEmergencia from "./FichaEmergencia";
import PanelBase from "./PanelBase";
import Telefono from "./Telefono";
import { TRABAJADORES } from "./datos";
import "./demo.scss";
import "./landing.scss";

const t = TRABAJADORES[0]!;

// ── Piezas ──────────────────────────────────────────────────────────────

/** Una pantalla real, escalada y dormida: se ve, no se toca ni se enfoca. */
export function Captura({ ancho, alto, escala, escalaMovil, children, className }: {
  ancho: number; alto: number; escala: number; escalaMovil?: number; children: ReactNode; className?: string;
}) {
  const vars = { "--ancho": `${ancho}px`, "--alto": `${alto}px`, "--escala": escala, "--escala-movil": escalaMovil ?? escala } as CSSProperties;
  return (
    <div className={`lp-captura ${className ?? ""}`} style={vars} aria-hidden="true" inert>
      <div className="lp-captura__lienzo">{children}</div>
    </div>
  );
}

function Encabezado({ ceja, titulo, bajada, id }: { ceja: string; titulo: ReactNode; bajada?: ReactNode; id: string }) {
  return (
    <header className="lp-encabezado">
      <p className="lp-ceja">{ceja}</p>
      <h2 id={id} className="lp-titulo">{titulo}</h2>
      {bajada && <p className="lp-bajada">{bajada}</p>}
    </header>
  );
}

// ── Secciones ───────────────────────────────────────────────────────────

const ENLACES = [
  { href: "#problema", texto: "El problema" },
  { href: "#como-funciona", texto: "Cómo funciona" },
  { href: "#producto", texto: "Producto" },
  { href: "#funciones", texto: "Funciones" },
  { href: "#seguridad", texto: "Seguridad" },
  { href: "#hoja-de-ruta", texto: "Hoja de ruta" },
];

export function Navegacion() {
  return (
    <header className="lp-nav">
      <a className="lp-saltar" href="#contenido">Saltar al contenido</a>
      <a className="lp-marca" href="#inicio"><IconoEscudo tamano={22} /> SOS Ruta</a>
      <nav aria-label="Secciones">
        <ul className="lp-nav__enlaces">
          {ENLACES.map((e) => <li key={e.href}><a href={e.href}>{e.texto}</a></li>)}
        </ul>
      </nav>
      <a className="baliza-boton baliza-boton--sos baliza-boton--chico baliza-boton--pastilla" href="#como-funciona">Probar demo</a>
    </header>
  );
}

export function Hero() {
  return (
    <section className="lp-hero" id="inicio" aria-labelledby="hero-t">
      <div className="lp-hero__texto">
        <p className="lp-pildora"><span aria-hidden="true" /> Prototipo funcional · Seguridad para trabajadores en terreno</p>
        <h1 id="hero-t" className="lp-hero__titulo">
          Cuando algo pasa en ruta, la ayuda llega <em>sabiendo quién es</em>
        </h1>
        <p className="lp-hero__bajada">
          Una credencial con QR, un perfil médico de emergencia, una app para quien va solo y un panel en vivo para la base.
          Conecta al trabajador, su camión, su base y sus contactos en un solo sistema.
        </p>
        <div className="lp-hero__acciones">
          <a className="baliza-boton baliza-boton--sos baliza-boton--pastilla" href="#como-funciona">Ver alerta en vivo</a>
          <a className="baliza-boton baliza-boton--suave baliza-boton--pastilla lp-boton-vidrio" href="#producto">Explorar el producto</a>
        </div>
      </div>
      <div className="lp-hero__visual">
        <Captura className="lp-hero__panel" ancho={1280} alto={760} escala={0.56} escalaMovil={0.27}>
          <PanelBase conAlerta />
        </Captura>
        <Captura className="lp-hero__telefono" ancho={390} alto={844} escala={0.44} escalaMovil={0.3}>
          <Telefono sinMesa><FichaEmergencia t={t} /></Telefono>
        </Captura>
        <div className="lp-hero__aviso" aria-hidden="true">
          <span className="lp-hero__aviso-punto" />
          <div>
            <b>SOS activado</b>
            <span>{t.nombre} · Camión {t.camion}</span>
            <span className="lp-hero__aviso-ok"><IconoCheck tamano={14} /> Ubicación recibida</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Rubros() {
  return (
    <section className="lp-rubros" aria-label="Rubros">
      <p>Pensado para operaciones en terreno:</p>
      <ul>
        {["Transporte", "Minería", "Construcción", "Logística", "Forestal"].map((r) => <li key={r}>{r}</li>)}
      </ul>
    </section>
  );
}

const SIN = [
  { titulo: "Nadie sabe quién es", texto: "Quien llega primero desconoce nombre, empresa y a quién avisar." },
  { titulo: "Datos médicos fuera de alcance", texto: "Alergias o anticoagulantes viven en una carpeta de la oficina." },
  { titulo: "La base se entera tarde", texto: "Llamadas cruzadas, sin ubicación ni registro de lo ocurrido." },
];
const CON = [
  { titulo: "Saben quién es al instante", texto: "Un escaneo con la cámara muestra nombre, empresa y a quién llamar." },
  { titulo: "Lo vital, a la vista", texto: "Sangre, alergias y peso visibles; lo sensible, bajo llave." },
  { titulo: "La base reacciona de inmediato", texto: "Alerta en vivo con ubicación y un registro completo del caso." },
];

export function Problema() {
  return (
    <section className="lp-seccion" id="problema" aria-labelledby="problema-t">
      <Encabezado
        id="problema-t"
        ceja="El problema"
        titulo="Hoy una emergencia en ruta empieza con preguntas, no con respuestas"
        bajada="La diferencia entre perder minutos y actuar de inmediato es tener la información correcta en el lugar correcto."
      />
      <div className="lp-comparar">
        <div className="lp-comparar__col">
          <h3>Sin SOS Ruta</h3>
          <ul>
            {SIN.map((s) => (
              <li key={s.titulo}><span className="lp-icono-mal" aria-hidden="true">×</span><div><b>{s.titulo}</b><span>{s.texto}</span></div></li>
            ))}
          </ul>
        </div>
        <div className="lp-comparar__col lp-comparar__col--con">
          <h3>Con SOS Ruta</h3>
          <ul>
            {CON.map((s) => (
              <li key={s.titulo}><span className="lp-icono-bien" aria-hidden="true"><IconoCheck tamano={14} /></span><div><b>{s.titulo}</b><span>{s.texto}</span></div></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const PASOS = [
  { n: "01", titulo: "Escanear", texto: "Cualquier persona escanea el QR de la tarjeta con la cámara del celular." },
  { n: "02", titulo: "Perfil SOS", texto: "Se abre una vista pensada para la urgencia, con lo vital primero." },
  { n: "03", titulo: "Alerta", texto: "El panel de la base recibe la ficha y la ubicación al momento del escaneo." },
  { n: "04", titulo: "Respuesta", texto: "La base toma el caso, coordina la ayuda y queda el tiempo de respuesta." },
];

/** Isla: simula el escaneo y lo muestra llegando a la base. */
export function DemoEnVivo() {
  const [estado, setEstado] = useState<"espera" | "escaneado" | "tomado">("espera");
  return (
    <div className="lp-demo">
      <section className="lp-demo__lado" aria-labelledby="demo-cel-t">
        <h3 id="demo-cel-t" className="lp-demo__titulo">Celular de quien encuentra al trabajador</h3>
        {estado === "espera" ? (
          <div className="lp-demo__vacio">
            <IconoQr tamano={40} />
            <p>Escanea la tarjeta de {t.nombre.split(" ")[0]} para simular la emergencia.</p>
            <BalizaBoton tono="sos" forma="pastilla" icono={<IconoQr tamano={18} />} onClick={() => setEstado("escaneado")}>Escanear tarjeta</BalizaBoton>
          </div>
        ) : (
          <Captura className="lp-demo__ficha" ancho={390} alto={700} escala={0.62} escalaMovil={0.62}>
            <FichaEmergencia t={t} />
          </Captura>
        )}
      </section>
      <section className="lp-demo__lado" aria-labelledby="demo-base-t" aria-live="polite">
        <h3 id="demo-base-t" className="lp-demo__titulo">Panel de la base · en vivo</h3>
        {estado === "espera" && <div className="lp-demo__vacio"><IconoConexion tamano={36} /><p>Sin alertas activas.</p></div>}
        {estado !== "espera" && (
          <div className="lp-demo__alerta">
            <BalizaAlerta
              tipo={estado === "tomado" ? "tomada" : "sos"}
              titulo={estado === "tomado" ? "Caso tomado" : "SOS activado"}
              persona={t.nombre}
              cuando="Ahora"
              hace={estado === "tomado" ? "respuesta en 0:07" : "hace 0:02"}
            >
              <div className="lp-demo__alerta-cuerpo">
                <p><IconoUbicacion tamano={16} /> Ubicación recibida · ±12 m</p>
                <p>Grupo sanguíneo <b>{t.sangre}</b> · Alergia a <b>{t.alergias.toLowerCase()}</b></p>
                {estado === "escaneado"
                  ? <BalizaBoton tono="sos" bloque onClick={() => setEstado("tomado")}>Tomar caso</BalizaBoton>
                  : <p className="lp-demo__ok"><IconoCheck tamano={16} /> Marcelo Ibarra tomó el caso. El trabajador ve que la ayuda va en camino.</p>}
              </div>
            </BalizaAlerta>
            <BalizaBoton tono="fantasma" tamano="chico" onClick={() => setEstado("espera")}>Reiniciar demo</BalizaBoton>
          </div>
        )}
      </section>
    </div>
  );
}

export function ComoFunciona() {
  return (
    <section className="lp-seccion" id="como-funciona" aria-labelledby="como-t">
      <Encabezado id="como-t" ceja="Cómo funciona" titulo="De la ruta a la base en cuatro pasos" bajada="Quien presta ayuda no instala nada. La base recibe todo en su panel." />
      <ol className="lp-pasos">
        {PASOS.map((p) => (
          <li key={p.n}>
            <span className="lp-pasos__n" aria-hidden="true">{p.n}</span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </li>
        ))}
      </ol>
      <DemoEnVivo />
    </section>
  );
}

const PIEZAS = [
  { id: "alerta", nombre: "Alerta e historial", titulo: "La base se entera en segundos", texto: "La alerta entra arriba del panel con la ficha, la ubicación y los contactos. Cada caso queda con su bitácora y su tiempo de respuesta.", puntos: ["Alarma aunque la consola esté minimizada", "Tomar, coordinar y cerrar el caso", "Historial con tiempo de respuesta"] },
  { id: "ficha", nombre: "Ficha del trabajador", titulo: "Una ficha por trabajador", texto: "Datos personales, ficha clínica, cobertura y consentimiento, siempre actualizados.", puntos: ["Crear, editar y bloquear tarjetas", "Asignar camión y base", "Vincular el teléfono del trabajador"] },
  { id: "perfil", nombre: "Perfil SOS móvil", titulo: "Lo que ve quien llega primero", texto: "Sin instalar nada: el 131 a un toque, lo vital a la vista y lo sensible bajo llave.", puntos: ["Sangre, alergias y peso destacados", "Botones para llamar a la base", "Datos médicos solo con código de la base"] },
  { id: "app", nombre: "App del trabajador", titulo: "Para quien va solo", texto: "Si nadie está cerca para escanear, el propio trabajador pide ayuda, o la base se entera si no llega a la hora.", puntos: ["SOS manteniendo apretado 2 segundos", "Viajes con hora de llegada vigilada", "Funciona aunque se pierda la señal"] },
  { id: "bases", nombre: "Bases y flota", titulo: "Bases, flota y contactos", texto: "Camiones, patentes y conductor asignado, con jefe de base y segundo contacto por cada base.", puntos: ["Varias bases en un solo panel", "Roles por base", "Módulos que se activan por empresa"] },
];

function CapturaPieza({ id }: { id: string }) {
  if (id === "perfil")
    return <Captura className="lp-producto__tel" ancho={390} alto={844} escala={0.55} escalaMovil={0.5}><Telefono sinMesa><FichaEmergencia t={t} /></Telefono></Captura>;
  if (id === "app")
    return <Captura className="lp-producto__tel" ancho={390} alto={844} escala={0.55} escalaMovil={0.5}><Telefono sinMesa><PantallaInicio viaje="enCurso" /></Telefono></Captura>;
  return (
    <Captura ancho={1280} alto={820} escala={0.46} escalaMovil={0.27}>
      <PanelBase conAlerta={id === "alerta"} pestanaInicial={id === "alerta" ? "activaciones" : id === "bases" ? "bases" : "personas"} />
    </Captura>
  );
}

/** Isla: las piezas del producto, una a la vez. */
export function ProductoPestanas() {
  const [activa, setActiva] = useState("alerta");
  const p = PIEZAS.find((x) => x.id === activa) ?? PIEZAS[0]!;
  const ids = idsPestana(p.id, "lp");
  return (
    <div className="lp-producto">
      <BalizaPestanas etiqueta="Piezas del producto" prefijo="lp" activa={activa} onCambio={setActiva} pestanas={PIEZAS.map((x) => ({ id: x.id, nombre: x.nombre }))} />
      <div className="lp-producto__panel" role="tabpanel" id={ids.panel} aria-labelledby={ids.pestana}>
        <div className="lp-producto__texto">
          <h3>{p.titulo}</h3>
          <p>{p.texto}</p>
          <ul>{p.puntos.map((x) => <li key={x}><IconoCheck tamano={16} /> {x}</li>)}</ul>
        </div>
        <CapturaPieza id={p.id} />
      </div>
    </div>
  );
}

export function Producto() {
  return (
    <section className="lp-seccion" id="producto" aria-labelledby="producto-t">
      <Encabezado id="producto-t" ceja="El producto" titulo="Una tarjeta, una app y un centro de control" bajada="La tarjeta que porta el trabajador, el perfil que se abre en cualquier celular, la app para quien va solo y el panel de la base." />
      <ProductoPestanas />
    </section>
  );
}

const FUNCIONES = [
  { icono: <IconoQr />, titulo: "Tarjeta SOS profesional", texto: "Foto, nombre, cargo, empresa, ID único, QR y cobertura. Se bloquea en segundos si se pierde." },
  { icono: <IconoAlerta />, titulo: "Alerta en vivo", texto: "Aviso inmediato en el panel y en la consola, sin esperar llamadas." },
  { icono: <IconoUbicacion />, titulo: "Ubicación bajo demanda", texto: "El GPS se pide solo al escanear o al pedir ayuda. Sin rastreo continuo." },
  { icono: <IconoCandado />, titulo: "Privacidad por niveles", texto: "Lo vital, visible; lo sensible, solo para personal de salud con código de la base." },
  { icono: <IconoTelefono />, titulo: "SOS desde la app", texto: "El trabajador pide ayuda manteniendo un botón: sin toques accidentales." },
  { icono: <IconoRuta />, titulo: "Viajes vigilados", texto: "Si no confirma la llegada, la base recibe un aviso con su última ubicación." },
  { icono: <IconoPersonas />, titulo: "Gestión de personas", texto: "Altas, ediciones, tarjetas y teléfonos vinculados, con roles por base." },
  { icono: <IconoCamion />, titulo: "Bases, flota y contactos", texto: "Camiones, patentes y conductor asignado, con jefe de base y segundo contacto." },
  { icono: <IconoConexion />, titulo: "Consola de escritorio", texto: "Suena aunque esté minimizada y avisa si deja de recibir alertas." },
];

export function Funciones() {
  return (
    <section className="lp-seccion" id="funciones" aria-labelledby="funciones-t">
      <Encabezado id="funciones-t" ceja="Funcionalidades" titulo="Todo lo que una base necesita para responder rápido" />
      <ul className="lp-funciones">
        {FUNCIONES.map((f) => (
          <li key={f.titulo}>
            <span className="lp-funciones__icono" aria-hidden="true">{f.icono}</span>
            <h3>{f.titulo}</h3>
            <p>{f.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const GARANTIAS = [
  { titulo: "El QR no contiene datos personales", texto: "Solo un enlace con un identificador aleatorio. Si se pierde la tarjeta, se bloquea." },
  { titulo: "Datos sensibles en dos niveles", texto: "Condiciones y medicamentos solo para personal de salud, con un código que entrega la base." },
  { titulo: "Ubicación solo cuando se activa", texto: "Con permiso del celular y sin seguimiento permanente." },
  { titulo: "Cada acceso queda registrado", texto: "El trabajador ve quién abrió sus datos médicos y cuándo." },
  { titulo: "Diseñado para la Ley 21.719", texto: "Consentimiento expreso, cifrado de datos de salud y evaluación de impacto antes de operar." },
];

const QUIENES = [
  { titulo: "Trabajador", texto: "Lleva su información vital y controla qué se comparte." },
  { titulo: "Jefe de base", texto: "Recibe alerta, ubicación y ficha en segundos." },
  { titulo: "Prevención de riesgos", texto: "Evidencia de respuesta para auditorías y mejora." },
  { titulo: "Gerencia", texto: "Menos riesgo operacional y un compromiso visible con la seguridad." },
];

export function Seguridad() {
  return (
    <section className="lp-seccion" id="seguridad" aria-labelledby="seguridad-t">
      <div className="lp-seguridad">
        <Encabezado
          id="seguridad-t"
          ceja="Seguridad y confianza"
          titulo="Diseñado para proteger al trabajador, no solo para encontrarlo"
          bajada="Un sistema con datos de salud debe ganarse la confianza de la empresa y de cada persona que porta la tarjeta."
        />
        <ul className="lp-garantias">
          {GARANTIAS.map((g) => (
            <li key={g.titulo}><span className="lp-icono-bien" aria-hidden="true"><IconoCheck tamano={14} /></span><div><b>{g.titulo}</b><span>{g.texto}</span></div></li>
          ))}
        </ul>
      </div>
      <ul className="lp-quienes">
        {QUIENES.map((q) => <li key={q.titulo}><h3>{q.titulo}</h3><p>{q.texto}</p></li>)}
      </ul>
    </section>
  );
}

const ETAPAS = [
  { nombre: "Prototipo", hoy: true, texto: "Tarjeta, perfil SOS, app y centro de control navegables, con datos ficticios." },
  { nombre: "Piloto en una base", texto: "Tarjetas reales para medir tiempos de respuesta y fichas completas." },
  { nombre: "Versión de producción", texto: "Nube en Chile, roles con 2FA, datos de salud cifrados y alertas por WhatsApp o SMS con escalamiento." },
  { nombre: "Escala", texto: "Multiempresa, reportes e integración con sistemas de prevención." },
];

export function HojaDeRuta() {
  return (
    <section className="lp-seccion" id="hoja-de-ruta" aria-labelledby="ruta-t">
      <Encabezado id="ruta-t" ceja="Hoja de ruta" titulo="De prototipo a servicio en operación" bajada="Avanzamos por etapas para validar valor real antes de escalar." />
      <ol className="lp-etapas">
        {ETAPAS.map((e) => (
          <li key={e.nombre} className={e.hoy ? "is-hoy" : undefined} aria-current={e.hoy ? "step" : undefined}>
            {e.hoy && <span className="lp-etapas__hoy">Hoy</span>}
            <h3>{e.nombre}</h3>
            <p>{e.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Cierre() {
  return (
    <section className="lp-cierre" aria-labelledby="cierre-t">
      <h2 id="cierre-t">¿Lo probamos en tu base?</h2>
      <p>Un piloto con tarjetas reales, en una base, para medir cuánto se acorta la respuesta.</p>
      <div className="lp-hero__acciones">
        <a className="baliza-boton baliza-boton--sos baliza-boton--pastilla" href="mailto:contacto@ejemplo.cl">Conversemos</a>
        <a className="baliza-boton baliza-boton--suave baliza-boton--pastilla lp-boton-vidrio" href="#como-funciona">Ver la demo</a>
      </div>
    </section>
  );
}

export function Pie() {
  return (
    <footer className="lp-pie">
      <div className="lp-pie__marca">
        <span className="lp-marca"><IconoEscudo tamano={20} /> SOS Ruta</span>
        <p>Seguridad para trabajadores en terreno.</p>
      </div>
      <nav aria-label="Legal y contacto">
        <ul className="lp-pie__enlaces">
          <li><a href="#privacidad">Política de privacidad</a></li>
          <li><a href="#derechos">Tus datos y tus derechos</a></li>
          <li><a href="#terminos">Términos</a></li>
          <li><a href="mailto:contacto@ejemplo.cl">Contacto</a></li>
        </ul>
      </nav>
      <p className="lp-pie__nota">Prototipo con datos ficticios. © 2026 SOS Ruta.</p>
    </footer>
  );
}

/** La landing completa. */
export default function Landing() {
  return (
    <div className="baliza-scope lp">
      <Navegacion />
      <main id="contenido">
        <Hero />
        <Rubros />
        <Problema />
        <ComoFunciona />
        <Producto />
        <Funciones />
        <Seguridad />
        <HojaDeRuta />
        <Cierre />
      </main>
      <Pie />
    </div>
  );
}
