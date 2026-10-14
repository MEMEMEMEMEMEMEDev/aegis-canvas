// EL BLOG DE LA CLÍNICA: consejos, noticias, campañas e historias que escribe
// la directora desde el panel y que la web muestra. Dos pantallas: la
// pública (lo que lee un vecino de Ñuñoa) y la del panel (donde se escribe).
// Los textos son ficticios y no diagnostican: cuentan cuándo consultar.
import { useState } from "react";
import ProtoBarra from "../ProtoBarra/ProtoBarra";
import ProtoBoton from "../ProtoBoton/ProtoBoton";
import ProtoCampo from "../ProtoCampo/ProtoCampo";
import ProtoInsignia from "../ProtoInsignia/ProtoInsignia";
import ProtoPanel from "../ProtoPanel/ProtoPanel";
import ProtoSegmento from "../ProtoSegmento/ProtoSegmento";
import ProtoHuellitas from "../ProtoHuellitas/ProtoHuellitas";
import { IconoAlerta, IconoCalendario, IconoCheck, IconoHuella, IconoJeringa, IconoLibro, IconoOjo, IconoVolver } from "../iconos";
import { EQUIPO } from "./datos";
import Ficticio from "./Ficticio";
import { Armazon } from "./Panel";
import "./demo.scss";

export type TipoEntrada = "consejo" | "noticia" | "campana" | "historia";

export const TIPO: Record<TipoEntrada, { texto: string; icono: React.ReactNode }> = {
  consejo: { texto: "Consejo", icono: <IconoHuella /> },
  noticia: { texto: "Noticia", icono: <IconoCalendario /> },
  campana: { texto: "Campaña", icono: <IconoJeringa /> },
  historia: { texto: "Historia", icono: <IconoLibro /> },
};

export interface Entrada {
  slug: string;
  tipo: TipoEntrada;
  titulo: string;
  bajada: string;
  fecha: string;
  minutos: number;
  cuerpo: string[];
  publicada: boolean;
}

export const ENTRADAS: Entrada[] = [
  {
    slug: "calor-en-nunoa", tipo: "consejo", titulo: "Cuando aprieta el calor: cómo ayudar a tu perro en Ñuñoa", bajada: "Paseos temprano o al atardecer, agua siempre a mano y la prueba de la mano en el pavimento.", fecha: "12 de octubre", minutos: 3, publicada: true,
    cuerpo: [
      "En Ñuñoa las tardes de verano pasan los 30 grados, y los perros no sudan como nosotros: se enfrían jadeando. Por eso los paseos largos van temprano en la mañana o después de las 19:00, cuando la vereda ya se enfrió.",
      "## La prueba de la mano",
      "Pon el dorso de la mano en el pavimento cinco segundos. Si no aguantas, sus almohadillas tampoco. Las plazas con pasto (Juan XXIII, la Plaza Ñuñoa) son mejor idea que la vereda.",
      "- Agua fresca en cada paseo, no sólo en casa.",
      "- Nunca en el auto estacionado, ni «cinco minutitos».",
      "- Si lo ves jadear sin parar, con las encías muy rojas o tambaleándose, es una urgencia: mójalo con agua a temperatura ambiente y ven de inmediato.",
      "Si tienes dudas sobre tu perro en particular, escríbenos por WhatsApp: te decimos si conviene que lo veamos.",
    ],
  },
  {
    slug: "mi-gato-no-come", tipo: "consejo", titulo: "Mi gato dejó de comer: cuándo preocuparse", bajada: "Un gato que no come en un día entero ya es motivo de consulta. No es capricho.", fecha: "6 de octubre", minutos: 2, publicada: true,
    cuerpo: [
      "Los gatos esconden que están mal. Que deje de comer suele ser la primera señal visible de algo, y su hígado lo pasa peor que el nuestro cuando ayuna.",
      "## Lo que puedes mirar en casa",
      "- ¿Toma agua? ¿Va al arenero como siempre?",
      "- ¿Está escondido, o más quieto de lo normal?",
      "- ¿Cambió algo: comida nueva, un gato nuevo en el edificio, obras?",
      "Si lleva 24 horas sin comer, agenda un control. No le des remedios de personas: el paracetamol, por ejemplo, es tóxico para ellos.",
    ],
  },
  {
    slug: "mes-de-la-esterilizacion", tipo: "campana", titulo: "Octubre: mes de la esterilización", bajada: "Durante octubre, la esterilización de perros y gatos tiene un valor especial. Cupos limitados.", fecha: "1 de octubre", minutos: 2, publicada: true,
    cuerpo: [
      "Esterilizar evita camadas no deseadas, baja el riesgo de algunos tumores y, en los machos, de que se escapen detrás de una hembra en celo.",
      "## Cómo funciona",
      "- Escríbenos por WhatsApp y te damos una hora de evaluación.",
      "- La cirugía se programa con ayuno desde la noche anterior.",
      "- Se va a la casa el mismo día, con sus indicaciones por escrito.",
      "La campaña es con la Municipalidad de Ñuñoa: pregunta por los cupos.",
    ],
  },
  {
    slug: "sabados-hasta-las-14", tipo: "noticia", titulo: "Ahora atendemos los sábados hasta las 14:00", bajada: "Para que no tengas que pedir permiso en el trabajo por un control.", fecha: "28 de septiembre", minutos: 1, publicada: true,
    cuerpo: ["Desde este mes, los sábados abrimos de 10:00 a 14:00. Consultas, vacunas y controles; las cirugías siguen de lunes a viernes.", "Puedes agendar en línea como siempre."],
  },
  {
    slug: "bruno-volvio-a-casa", tipo: "historia", titulo: "Bruno volvió a casa", bajada: "Dos días hospitalizado después de una cirugía, y el jueves ya pedía pelota.", fecha: "22 de septiembre", minutos: 2, publicada: true,
    cuerpo: ["Bruno llegó con un tumor en la piel que había crecido rápido. Lo operamos un martes, se quedó dos noches con nosotros (Javier, nuestro técnico, le hizo todas las rondas) y el jueves se fue caminando solo.", "Su dueña nos mandó un video el fin de semana: pelota en la Plaza Ñuñoa. Gracias por confiarnos a Bruno."],
  },
  {
    slug: "vacunas-calendario", tipo: "consejo", titulo: "Vacunas: el calendario que no se olvida", bajada: "Cachorros, gatitos y adultos: cuáles y cuándo. Y nosotros te recordamos.", fecha: "borrador", minutos: 3, publicada: false,
    cuerpo: ["Las vacunas protegen a tu mascota y a las del barrio. Aquí va el calendario que usamos en la clínica."],
  },
];

const FILTROS: { id: TipoEntrada | "todo"; texto: string }[] = [
  { id: "todo", texto: "Todo" }, { id: "consejo", texto: "Consejos" }, { id: "noticia", texto: "Noticias" }, { id: "campana", texto: "Campañas" }, { id: "historia", texto: "Historias" },
];

function Cuerpo({ parrafos }: { parrafos: string[] }) {
  // Un formato mínimo que la directora puede escribir sin aprender nada:
  // «## » es un subtítulo, «- » una lista, una línea en blanco un párrafo.
  const bloques: React.ReactNode[] = [];
  let lista: string[] = [];
  const cerrar = () => { if (lista.length) { bloques.push(<ul key={`l${bloques.length}`}>{lista.map((x, i) => <li key={i}>{x}</li>)}</ul>); lista = []; } };
  parrafos.forEach((p, i) => {
    if (p.startsWith("- ")) { lista.push(p.slice(2)); return; }
    cerrar();
    if (p.startsWith("## ")) bloques.push(<h2 key={i}>{p.slice(3)}</h2>);
    else bloques.push(<p key={i}>{p}</p>);
  });
  cerrar();
  return <div className="demo-articulo__cuerpo">{bloques}</div>;
}

function Portada({ tipo, grande = false }: { tipo: TipoEntrada; grande?: boolean }) {
  return <div className={`demo-blog__portada demo-blog__portada--${tipo}${grande ? " demo-blog__portada--grande" : ""}`} aria-hidden="true">{TIPO[tipo].icono}</div>;
}

function Tarjeta({ e, onAbrir }: { e: Entrada; onAbrir: () => void }) {
  return (
    <article className="demo-blog__tarjeta">
      <Portada tipo={e.tipo} />
      <div className="demo-blog__texto">
        <p className="demo-blog__meta"><span className="demo-blog__tipo">{TIPO[e.tipo].texto}</span> · {e.fecha} · {e.minutos} min</p>
        <h3 className="demo-blog__titulo"><a href={`#${e.slug}`} onClick={(ev) => { ev.preventDefault(); onAbrir(); }}>{e.titulo}</a></h3>
        <p className="demo-blog__bajada">{e.bajada}</p>
      </div>
    </article>
  );
}

/** La web: la portada del blog y un artículo abierto. */
export function BlogPublico({ abierta }: { abierta?: string }) {
  const [filtro, setFiltro] = useState<TipoEntrada | "todo">("todo");
  const [slug, setSlug] = useState<string | null>(abierta ?? null);
  const publicadas = ENTRADAS.filter((e) => e.publicada);
  const lista = filtro === "todo" ? publicadas : publicadas.filter((e) => e.tipo === filtro);
  const actual = publicadas.find((e) => e.slug === slug);
  return (
    <div className="proto-scope demo-pagina">
      <Ficticio texto="Maqueta de la web · datos ficticios" />
      <ProtoBarra
        centro={<nav aria-label="Principal" className="demo-nav"><a href="#servicios">Servicios</a><a href="#agendar">Agendar</a><a href="#blog" aria-current="page">Consejos</a><a href="#reserva">Mi reserva</a></nav>}
        fin={<ProtoBoton tono="accion" tamano="chico">Agendar</ProtoBoton>}
      />
      <main className="demo-contenedor">
        {actual ? (
          <article className="demo-articulo">
            <a href="#blog" className="demo-articulo__volver" onClick={(ev) => { ev.preventDefault(); setSlug(null); }}><IconoVolver /> Todos los consejos</a>
            <p className="demo-blog__meta"><span className="demo-blog__tipo">{TIPO[actual.tipo].texto}</span> · {actual.fecha} · {actual.minutos} min de lectura</p>
            <h1 className="demo-articulo__titulo">{actual.titulo}</h1>
            <p className="demo-articulo__bajada">{actual.bajada}</p>
            <Portada tipo={actual.tipo} grande />
            <Cuerpo parrafos={actual.cuerpo} />
            <aside className="demo-articulo__pie">
              <p><strong>¿Te quedó una duda sobre tu mascota?</strong> Escríbenos por WhatsApp o agenda una hora: preferimos verla antes que adivinar.</p>
              <ProtoBoton tono="accion">Agendar una hora</ProtoBoton>
            </aside>
          </article>
        ) : (
          <>
            <header className="demo-blog__cabeza">
              <div>
                <h1>Consejos para cuidarlos</h1>
                <p>Lo que le contamos a los vecinos en el mesón, escrito con calma. Por la Dra. Paula Soto y el equipo.</p>
              </div>
              <ProtoHuellitas pasos={4} />
            </header>
            <ProtoSegmento leyenda="Qué quieres leer" opciones={FILTROS} valor={filtro} onCambio={(v) => setFiltro(v as TipoEntrada | "todo")} className="demo-blog__filtro" />
            <div className="demo-blog__grilla">
              {lista.map((e) => <Tarjeta key={e.slug} e={e} onAbrir={() => setSlug(e.slug)} />)}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/** El panel: la directora escribe y publica. */
export function BlogDirectora({ editando = "vacunas-calendario" }: { editando?: string | null }) {
  const [entradas, setEntradas] = useState(ENTRADAS);
  const [slug, setSlug] = useState<string | null>(editando);
  const e = entradas.find((x) => x.slug === slug);
  const [titulo, setTitulo] = useState(e?.titulo ?? "");
  const [tipo, setTipo] = useState<TipoEntrada>(e?.tipo ?? "consejo");
  const [bajada, setBajada] = useState(e?.bajada ?? "");
  const [cuerpo, setCuerpo] = useState(e?.cuerpo.join("\n\n") ?? "");
  const [vista, setVista] = useState(false);
  const publicar = (s: string, v: boolean) => setEntradas((xs) => xs.map((x) => (x.slug === s ? { ...x, publicada: v, fecha: v ? "hoy" : "borrador" } : x)));

  return (
    <Armazon rol="jefa" activo="blog" persona={EQUIPO.directora}>
      <header className="demo-trabajo__cabeza">
        <div>
          <h1>Blog y consejos</h1>
          <p>Lo que escribes aquí sale en la web, en «Consejos». Los borradores sólo los ves tú.</p>
        </div>
        <ProtoBoton tono="accion" onClick={() => { setSlug(null); setTitulo(""); setBajada(""); setCuerpo(""); setTipo("consejo"); }}>Escribir uno nuevo</ProtoBoton>
      </header>
      <div className="demo-columnas demo-columnas--invertida">
        <ProtoPanel titulo={e ? "Editando" : "Nueva entrada"} sub={e ? (e.publicada ? "Publicada: los cambios salen al guardar." : "Borrador: nadie lo ve todavía.") : "Se guarda como borrador hasta que la publiques."}
          accion={<ProtoBoton tono="fantasma" tamano="chico" icono={<IconoOjo />} aria-pressed={vista} onClick={() => setVista((v) => !v)}>{vista ? "Seguir editando" : "Ver cómo queda"}</ProtoBoton>}>
          {vista ? (
            <article className="demo-articulo demo-articulo--vista">
              <p className="demo-blog__meta"><span className="demo-blog__tipo">{TIPO[tipo].texto}</span> · hoy</p>
              <h2 className="demo-articulo__titulo">{titulo || "Sin título"}</h2>
              <p className="demo-articulo__bajada">{bajada}</p>
              <Cuerpo parrafos={cuerpo.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean)} />
            </article>
          ) : (
            <div className="demo-formulario">
              <ProtoSegmento leyenda="Tipo" leyendaVisible opciones={(Object.keys(TIPO) as TipoEntrada[]).map((k) => ({ id: k, texto: TIPO[k].texto }))} valor={tipo} onCambio={(v) => setTipo(v as TipoEntrada)} />
              <ProtoCampo etiqueta="Título" valor={titulo} onCambio={setTitulo} requerido placeholder="Cuando aprieta el calor: cómo ayudar a tu perro" />
              <ProtoCampo etiqueta="Bajada" valor={bajada} onCambio={setBajada} ayuda="Una o dos frases: es lo que se ve en la lista." />
              <ProtoCampo etiqueta="Texto" valor={cuerpo} onCambio={setCuerpo} multilinea requerido
                ayuda={<>Escribe como hablas. Una línea en blanco separa párrafos. Si una línea parte con <code>## </code> es un subtítulo; con <code>- </code>, una lista.</>} />
              <div className="demo-formulario__pie">
                <ProtoBoton tono="suave" icono={<IconoCheck />}>Guardar borrador</ProtoBoton>
                <ProtoBoton tono="accion" onClick={() => slug && publicar(slug, true)}>{e?.publicada ? "Guardar y publicar" : "Publicar en la web"}</ProtoBoton>
              </div>
              <p className="demo-formulario__nota"><IconoAlerta tamano={16} /> Un consejo cuenta cuándo consultar; no diagnostica ni da dosis. Si lo que escribes parece una receta, mejor como «ven a verlo».</p>
            </div>
          )}
        </ProtoPanel>
        <ProtoPanel titulo="Tus entradas" sub={`${entradas.filter((x) => x.publicada).length} publicadas · ${entradas.filter((x) => !x.publicada).length} borrador`}>
          <ul className="demo-blog__lista">
            {entradas.map((x) => (
              <li key={x.slug} className={x.slug === slug ? "demo-blog__fila demo-blog__fila--activa" : "demo-blog__fila"}>
                <button type="button" className="demo-blog__abrir" onClick={() => { setSlug(x.slug); setTitulo(x.titulo); setTipo(x.tipo); setBajada(x.bajada); setCuerpo(x.cuerpo.join("\n\n")); setVista(false); }}>
                  <span className="demo-blog__fila-titulo">{x.titulo}</span>
                  <span className="demo-blog__meta">{TIPO[x.tipo].texto} · {x.fecha}</span>
                </button>
                <ProtoInsignia estado={x.publicada ? "bien" : "espera"}>{x.publicada ? "Publicada" : "Borrador"}</ProtoInsignia>
              </li>
            ))}
          </ul>
        </ProtoPanel>
      </div>
    </Armazon>
  );
}
