import type { CSSProperties, ReactElement } from "react";
import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CalcoBarra from "./CalcoBarra/CalcoBarra";
import CalcoBoton from "./CalcoBoton/CalcoBoton";
import CalcoCabecera from "./CalcoCabecera/CalcoCabecera";
import CalcoCarrete from "./CalcoCarrete/CalcoCarrete";
import CalcoChapa from "./CalcoChapa/CalcoChapa";
import CalcoContador from "./CalcoContador/CalcoContador";
import CalcoDock from "./CalcoDock/CalcoDock";
import CalcoGlobo from "./CalcoGlobo/CalcoGlobo";
import CalcoHoja from "./CalcoHoja/CalcoHoja";
import CalcoLienzo from "./CalcoLienzo/CalcoLienzo";
import type { CalcoTono } from "./CalcoLienzo/CalcoLienzo";
import CalcoLoseta from "./CalcoLoseta/CalcoLoseta";
import CalcoMarco from "./CalcoMarco/CalcoMarco";
import CalcoPegatina from "./CalcoPegatina/CalcoPegatina";
import CalcoSemaforo from "./CalcoSemaforo/CalcoSemaforo";
import CalcoTitular from "./CalcoTitular/CalcoTitular";
import CalcoVentana from "./CalcoVentana/CalcoVentana";

// =============================================================================
// CALCO · Portafolio → Completo.
//
// La vista real de la familia: SOBRE MÍ como la pantalla de inicio de una
// consola. Sin scroll de página. Cuatro losetas, una ventana que enseña la
// elegida, un dock abajo, y una pegatina que abre —a propósito medio
// escondida— la hoja de lo personal.
//
// En escritorio la ventana vive a la derecha de las losetas. En un
// teléfono las losetas llenan la pantalla y la sección se abre en una hoja
// que sube: el mismo contenido, el gesto de una app.
//
// El contenido es el real del portafolio (data/perfil.ts): si un cargo
// largo rompe una tarjeta del carrete, tiene que verse acá.
// =============================================================================

const meta: Meta = {
  title: "Families/Calco/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

// --- Los datos (perfil.ts, verbatim) ------------------------------------------

type SeccionId = "expediente" | "metodo" | "equipo" | "canal";

const SECCIONES: { id: SeccionId; titulo: string; kana: string; meta: string; tono: CalcoTono; icono: string }[] = [
  { id: "expediente", titulo: "expediente", kana: "経歴", meta: "quién opera · 4 fichas", tono: "rosa", icono: "≡" },
  { id: "metodo", titulo: "método", kana: "方式", meta: "cómo es trabajar conmigo", tono: "cielo", icono: "✦" },
  { id: "equipo", titulo: "equipo", kana: "装備", meta: "stack técnico · 6 bolsas", tono: "sol", icono: "⚙" },
  { id: "canal", titulo: "canal", kana: "通信", meta: "por dónde se me habla", tono: "naranja", icono: "✉" },
];

const TRAYECTORIA = [
  {
    kana: "独立",
    periodo: "MAY 2025 · HOY",
    cargo: "Desarrollador Fullstack · independiente",
    texto:
      "Desarrollo y operación end-to-end para clientes pyme: sitios, apps y ecommerce en producción sobre Cloudflare Workers/Pages e infraestructura GitOps propia (Aegis). Integraciones de IA: chats, RAG y text-to-speech.",
    tono: "rosa" as CalcoTono,
  },
  {
    kana: "軌道",
    periodo: "MAR · MAY 2025",
    cargo: "Consultor de Infraestructura y CI/CD · Orbis Data",
    texto:
      "Consultoría en infraestructura y pipelines CI/CD. Me contrataron a raíz de la primera versión de Aegis: la plataforma abrió la puerta antes que el CV.",
    tono: "cielo" as CalcoTono,
  },
  {
    kana: "銀行",
    periodo: "ABR 2022 · MAR 2025",
    cargo: "Fullstack Developer · Scotiabank Chile (vía Mobdev)",
    texto:
      "Migración de la web principal del banco de un monolito legacy a microfrontends (Module Federation), a producción sin incidentes mayores. Único frontend de la célula «PAC en 1 click». Backend en Java sobre BFFs.",
    tono: "sol" as CalcoTono,
  },
  {
    kana: "独学",
    periodo: "BASE",
    cargo: "Ingeniería Civil Informática · U. San Sebastián",
    texto:
      "Dos años cursados y ~2 años de formación autodidacta intensiva desde un homelab propio: redes, Kubernetes, GitOps y LLMs locales. Inglés técnico: lectura C1, general B2 (EF SET).",
    tono: "lima" as CalcoTono,
  },
];

const METODO = [
  ["実演", "Prefiero enseñar antes que explicar", "La propuesta llega con una pantalla que puedes abrir y recorrer, no con un documento de veinte páginas."],
  ["範囲", "El alcance queda por escrito", "Qué entra y qué no, escrito antes de empezar. Después trabajamos un par de iteraciones con eso a la vista."],
  ["段階", "Avanzamos por hitos", "Ves resultados antes de pagar. Cada hito es algo que puedes abrir y tocar."],
  ["土台", "La infraestructura la entiendes tú", "Te entrego el proyecto montado, con su costo y sus límites documentados. Puede correr sobre Aegis o sobre tu propia cuenta."],
  ["保守", "La mantención es opcional", "Si la quieres, hay mantención mensual. Si no, el proyecto es tuyo igual y queda documentado."],
] as const;

const STACK: { titulo: string; kana?: string; tono: CalcoTono; items: string[] }[] = [
  { titulo: "Frontend", kana: "フロント", tono: "rosa", items: ["React", "TypeScript", "Astro", "Next", "Module Federation", "Design systems", "CSS avanzado"] },
  { titulo: "Backend", kana: "バック", tono: "cielo", items: ["Node / Express", "Java (BFFs)", "Go", "Python", "APIs REST"] },
  { titulo: "Infra & Platform", kana: "土台", tono: "sol", items: ["Kubernetes (K3s)", "ArgoCD", "Jenkins", "OpenTofu", "Ansible", "Docker / Buildah", "GCP", "Cloudflare"] },
  { titulo: "Cadena de suministro", kana: "セキュリティ", tono: "coral", items: ["cosign", "Kyverno", "Trivy", "SOPS / age"] },
  { titulo: "IA aplicada", tono: "lima", items: ["LLMs", "RAG (pgvector)", "MCP", "vLLM", "Text-to-speech", "Claude Code"] },
  { titulo: "Datos", kana: "貯蔵", tono: "naranja", items: ["PostgreSQL / pgvector", "MySQL", "MongoDB", "Redis"] },
];

const OCIO = [
  ["登山", "Trekking de ruta larga", "De los de planificar la caminata entera y después pelear con el peso de la mochila.", "rosa"],
  ["下り", "Descenso en DH", "Bajar es la parte fácil. Elegir la línea, no.", "cielo"],
  ["サーフ", "Surf", "Voy por la paz que deja. Un par de veces pensé que no volvía, y también es parte.", "lima"],
  ["弦", "Guitarra", "En casa, sin público y sin plan. Le pongo bonito y ya.", "sol"],
] as const;

// --- Un hook chico: ¿cabe la ventana al lado de las losetas? -------------------

function useAncho(query = "(min-width: 1024px)") {
  const [cabe, setCabe] = useState(() => (typeof window === "undefined" ? true : window.matchMedia(query).matches));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const al = (e: MediaQueryListEvent) => setCabe(e.matches);
    mq.addEventListener("change", al);
    return () => mq.removeEventListener("change", al);
  }, [query]);
  return cabe;
}

// --- El contenido de cada sección ----------------------------------------------

function Expediente() {
  return (
    <div className="calco-demo-pila">
      <CalcoGlobo cola="abajo-izq" giro={-1} tono="crema">
        AAROI·DEV es la marca con la que firmo. Detrás estoy yo, y me gusta que la cadena sea corta: hablas con quien
        escribe el código y con quien lo despliega.
      </CalcoGlobo>

      <CalcoCarrete label="Trayectoria" ancho="min(78vw, 18rem)">
        {TRAYECTORIA.map((t) => (
          <CalcoVentana key={t.kana} titulo={t.periodo} kana={t.kana} tono={t.tono}>
            <p className="calco-demo-cargo">{t.cargo}</p>
            <p className="calco-demo-texto">{t.texto}</p>
          </CalcoVentana>
        ))}
      </CalcoCarrete>

      <div className="calco-demo-cifras">
        <CalcoContador valor="4" etiqueta="años de experiencia" tono="sol" size="sm" giro={-1.5} />
        <CalcoContador valor="146" etiqueta="gates de validación" tono="rosa" size="sm" giro={1} />
        <CalcoContador valor="100" sufijo="%" etiqueta="despliegues firmados" tono="lima" size="sm" giro={-1} />
        <CalcoContador valor="4" etiqueta="proyectos en producción" tono="cielo" size="sm" giro={1.5} />
      </div>

      <CalcoBarra value={100} label="Despliegues firmados y verificados" readout="100 %" tono="lima" segmentos={14} animada />

      <p className="calco-demo-nota">
        De los proyectos de clientes no publico cuáles son. Son negocios de otra gente, y el detalle lo cuento en
        conversación.
      </p>
    </div>
  );
}

function Metodo() {
  return (
    <div className="calco-demo-pila">
      <ol className="calco-demo-pasos">
        {METODO.map(([kana, titulo, texto], i) => (
          <li key={kana} className="calco-demo-paso calco-entra" style={{ "--calco-i": i } as CSSProperties}>
            <CalcoChapa tono="tinta">{String(i + 1).padStart(2, "0")}</CalcoChapa>
            <div>
              <p className="calco-demo-cargo">{titulo}</p>
              <p className="calco-demo-texto">{texto}</p>
            </div>
            <span className="calco-demo-kana" aria-hidden="true">
              {kana}
            </span>
          </li>
        ))}
      </ol>
      <CalcoGlobo cola="arriba-izq" tono="cielo" giro={1}>
        Ninguno de estos pasos es negociable de mi lado. Todos son verificables del tuyo.
      </CalcoGlobo>
    </div>
  );
}

function Equipo() {
  return (
    <div className="calco-demo-pila">
      <p className="calco-demo-nota" style={{ marginTop: 0 }}>
        Esto viene de dos sitios: lo que uso hoy en mis proyectos y lo que traigo de tres años de banca. Lo que probé
        una vez y no volví a tocar, no está en la lista.
      </p>
      <div className="calco-demo-bolsas">
        {STACK.map((b, i) => (
          <section key={b.titulo} className="calco-demo-bolsa calco-entra" style={{ "--calco-i": i } as CSSProperties}>
            <h3 className="calco-demo-bolsa-titulo">
              <CalcoPegatina forma="pildora" tono={b.tono} giro={i % 2 ? 2 : -2} size="sm">
                {b.titulo}
              </CalcoPegatina>
              {b.kana && (
                <span className="calco-demo-kana" aria-hidden="true">
                  {b.kana}
                </span>
              )}
            </h3>
            <ul className="calco-demo-chapas">
              {b.items.map((it) => (
                <CalcoChapa key={it} as="li" tono="crema" size="sm">
                  {it}
                </CalcoChapa>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function Canal() {
  return (
    <div className="calco-demo-pila">
      <CalcoGlobo cola="abajo-izq" tono="sol" giro={-1}>
        En esta página no hay ningún correo escrito. El mensaje se arma en tres pasos y sale por donde tú prefieras.
      </CalcoGlobo>
      <div className="calco-demo-salidas">
        <CalcoBoton tono="tinta" size="lg" icono="✉" ancho>
          Escríbeme
        </CalcoBoton>
        <CalcoBoton tono="crema" icono="⌥" ancho>
          GitHub
        </CalcoBoton>
        <CalcoBoton tono="crema" icono="▤" ancho>
          Bitácora
        </CalcoBoton>
      </div>
      <div className="calco-demo-cifras" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <CalcoContador valor="4" etiqueta="proyectos de clientes en producción" tono="naranja" size="sm" giro={-1} />
        <CalcoSemaforo estado="listo" label="Recibiendo mensajes" texto="al aire" />
      </div>
    </div>
  );
}

const CONTENIDO: Record<SeccionId, () => ReactElement> = {
  expediente: Expediente,
  metodo: Metodo,
  equipo: Equipo,
  canal: Canal,
};

// --- La pantalla ---------------------------------------------------------------

function SobreMi() {
  const [activa, setActiva] = useState<SeccionId>("expediente");
  const [hoja, setHoja] = useState<SeccionId | null>(null);
  const [ocio, setOcio] = useState(false);
  const cabe = useAncho();

  const seccion = SECCIONES.find((s) => s.id === activa) ?? SECCIONES[0]!;
  const Contenido = CONTENIDO[activa];
  const hojaSeccion = hoja ? SECCIONES.find((s) => s.id === hoja) : null;
  const HojaContenido = hoja ? CONTENIDO[hoja] : null;

  // Elegir una sección: en escritorio cambia la ventana; en teléfono abre
  // la hoja. Es el mismo estado — la hoja solo existe donde no cabe la
  // ventana.
  function elegir(id: SeccionId) {
    setActiva(id);
    if (!cabe) setHoja(id);
  }

  // Los atajos de consola: 1–4 van directo, Escape lo cierra un <dialog>.
  useEffect(() => {
    function teclas(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const n = Number(e.key);
      const s = SECCIONES[n - 1];
      if (n >= 1 && s) elegir(s.id);
    }
    document.addEventListener("keydown", teclas);
    return () => document.removeEventListener("keydown", teclas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cabe]);

  return (
    <div className="calco-scope">
      <CalcoLienzo
        tono="lima"
        semitono
        chispas
        fijo
        cabecera={
          <CalcoCabecera
            marca={<CalcoChapa tono="tinta">AAROI·DEV</CalcoChapa>}
            titulo="sobre mí"
            kana="経歴"
            derecha={
              <>
                <CalcoChapa tono="crema" size="sm">
                  SCL · remoto
                </CalcoChapa>
                <CalcoSemaforo estado="listo" label="Estado" texto="self-hosted" size="sm" />
              </>
            }
          />
        }
        pie={
          <CalcoDock
            label="Pantallas de la ficha"
            value={activa}
            onChange={(id) => elegir(id as SeccionId)}
            panelId="sobremi"
            items={SECCIONES.map((s) => ({ id: s.id, label: s.titulo, icono: s.icono, kana: s.kana }))}
            extra={
              <CalcoPegatina forma="estrella" tono="sol" as="button" size="sm" giro={-12} onClick={() => setOcio(true)} aria-label="Fuera de servicio">
                psst
              </CalcoPegatina>
            }
          />
        }
      >
        <div className={cabe ? "calco-demo-escena calco-demo-escena--ancha" : "calco-demo-escena"}>
          <div className="calco-demo-izquierda">
            {/* "El agente" y no el nombre: el nombre completo aparece UNA vez en
                el sitio, en la portada, y esta pantalla nombra su ficha. */}
            <CalcoTitular as="h1" size="seccion" sobre="Ficha de agente · est. abr 2022" kana="貼" tono="crema" giro={-1}>
              El agente
            </CalcoTitular>

            <div className="calco-demo-losetas" role={cabe ? "tablist" : undefined} aria-label="Secciones">
              {SECCIONES.map((s, i) => (
                <CalcoLoseta
                  key={s.id}
                  titulo={s.titulo}
                  kana={s.kana}
                  meta={s.meta}
                  tono={s.tono}
                  indice={String(i + 1).padStart(2, "0")}
                  activa={activa === s.id}
                  controla={cabe ? `sobremi-${s.id}` : undefined}
                  onClick={() => elegir(s.id)}
                  turno={i}
                />
              ))}
            </div>
          </div>

          {cabe && (
            <CalcoVentana
              key={activa}
              id={`sobremi-${activa}`}
              titulo={seccion.titulo}
              kana={seccion.kana}
              tono={seccion.tono}
              className="calco-entra calco-demo-ventana"
              acciones={
                <CalcoChapa tono="crema" size="sm">
                  {SECCIONES.indexOf(seccion) + 1} / {SECCIONES.length}
                </CalcoChapa>
              }
            >
              <Contenido />
            </CalcoVentana>
          )}
        </div>
      </CalcoLienzo>

      {/* La hoja de la sección (solo donde no cabe la ventana). */}
      <CalcoHoja
        abierta={Boolean(hoja) && !cabe}
        onCerrar={() => setHoja(null)}
        titulo={hojaSeccion?.titulo ?? ""}
        kana={hojaSeccion?.kana}
        tono={hojaSeccion?.tono ?? "crema"}
        alto="alto"
        id="sobremi-hoja"
      >
        {HojaContenido && <HojaContenido />}
      </CalcoHoja>

      {/* La contraportada: lo personal, detrás de la pegatina. */}
      <CalcoHoja abierta={ocio} onCerrar={() => setOcio(false)} titulo="fuera de servicio" kana="趣味" tono="sol" id="sobremi-ocio">
        <p className="calco-demo-texto" style={{ marginTop: 0 }}>
          Esta parte no vende nada. Es lo que hago cuando cierro el portátil, y está acá porque las dos cosas se
          parecen más de lo que parece: planificar una ruta larga y planificar un despliegue se hacen con la misma
          cabeza.
        </p>
        <div className="calco-demo-ocio">
          {OCIO.map(([kana, nombre, linea, tono], i) => (
            <CalcoVentana key={kana} titulo={nombre} kana={kana} tono={tono} className="calco-entra" >
              <p className="calco-demo-texto" style={{ margin: 0, "--calco-i": i } as CSSProperties}>
                {linea}
              </p>
            </CalcoVentana>
          ))}
          <CalcoMarco pie="quaver · 4K · reel pendiente" tono="rosa" giro={-2} ratio="16 / 10" />
          <CalcoGlobo cola="arriba-izq" tono="lima" giro={1}>
            Y a los videojuegos: con un grupo de amigos el juego es la parte que menos importa... aunque a veces sí
            importa, y mucho.
          </CalcoGlobo>
        </div>
      </CalcoHoja>

      <style>{`
        .calco-demo-escena { display: grid; grid-template-rows: minmax(0, 1fr); min-height: 0; min-width: 0; }
        .calco-demo-escena--ancha { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: var(--ds-space-lg); }
        .calco-demo-izquierda { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: var(--ds-space-md); min-height: 0; }
        .calco-demo-losetas { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); gap: var(--ds-space-sm); min-height: 0; padding: 4px 8px 8px 4px; }
        @media (min-width: 768px) { .calco-demo-losetas { gap: var(--ds-space-md); } }
        .calco-demo-ventana { min-height: 0; }
        .calco-demo-pila { display: grid; gap: var(--ds-space-lg); }
        .calco-demo-cargo { margin: 0 0 .35em; font-family: var(--calco-font-display); font-weight: 800; font-size: .95rem; line-height: 1.2; }
        .calco-demo-texto { margin: 0; font-size: var(--ds-font-size-sm); color: var(--calco-tinta-suave); }
        .calco-demo-nota { margin: 0; font-size: var(--ds-font-size-sm); color: var(--calco-tinta-suave); }
        .calco-demo-cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr)); gap: var(--ds-space-md); padding: .5rem .5rem 0 0; }
        .calco-demo-pasos { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--ds-space-sm); }
        .calco-demo-paso { position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ds-space-sm); align-items: start; padding: var(--ds-space-sm); border: 2px solid var(--calco-tinta); border-radius: var(--calco-radio); background: var(--calco-blanco); overflow: hidden; }
        .calco-demo-kana { position: absolute; right: .3rem; top: 50%; translate: 0 -50%; font-family: var(--calco-font-kana); font-weight: 900; font-size: 2.2rem; opacity: .1; pointer-events: none; }
        .calco-demo-bolsas { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: var(--ds-space-md); }
        .calco-demo-bolsa { position: relative; display: grid; gap: var(--ds-space-xs); padding: var(--ds-space-sm); border: 2px solid var(--calco-tinta); border-radius: var(--calco-radio); background: var(--calco-blanco); overflow: hidden; }
        .calco-demo-bolsa-titulo { margin: 0; display: flex; align-items: center; gap: var(--ds-space-sm); font-size: 1rem; }
        .calco-demo-chapas { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .35rem; }
        .calco-demo-salidas { display: grid; gap: var(--ds-space-sm); max-width: 24rem; padding: .25rem .5rem .5rem 0; }
        .calco-demo-ocio { display: grid; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); gap: var(--ds-space-md); padding: .5rem .5rem .5rem 0; align-items: start; }
      `}</style>
    </div>
  );
}

/** La pantalla completa en escritorio: losetas + ventana + dock, sin scroll. */
export const Completo: StoryObj = {
  render: () => <SobreMi />,
};

/** La misma pantalla en un teléfono: losetas a pantalla completa y la sección en una hoja. */
export const Movil: StoryObj = {
  render: () => <SobreMi />,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
