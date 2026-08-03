import { useState } from "react";
import ObsiAnillo from "../../families/obsidiana/ObsiAnillo/ObsiAnillo";
import ObsiBoton from "../../families/obsidiana/ObsiBoton/ObsiBoton";
import ObsiDato from "../../families/obsidiana/ObsiDato/ObsiDato";
import ObsiMuro, { ObsiEsquirla } from "../../families/obsidiana/ObsiMuro/ObsiMuro";
import ObsiNav from "../../families/obsidiana/ObsiNav/ObsiNav";
import ObsiPlaca from "../../families/obsidiana/ObsiPlaca/ObsiPlaca";
import { CASOS, PERFIL, PIELES } from "./content";
import type { CasoId } from "./content";

/**
 * MULTI V4 — el multiverso curado. Esqueleto UX convencional (nav siempre
 * visible, hero que responde quién/qué/cómo en un vistazo, scroll natural,
 * contacto a un clic); la creatividad vive en la piel OBSIDIANA y en los
 * widgets firma. Los casos de estudio son proyectos reales.
 */
export default function MultiV4() {
  const [casoActivo, setCasoActivo] = useState<CasoId>("foundation");
  const caso = CASOS.find((c) => c.id === casoActivo) ?? CASOS[0]!;

  const irA = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="obsidiana-scope multi-v4">
      <ObsiNav
        brand="MARCELO·H"
        links={[
          { label: "Proyectos", href: "#proyectos" },
          { label: "Pieles", href: "#pieles" },
          { label: "Sobre mí", href: "#sobre-mi" },
        ]}
        action={
          <ObsiBoton size="sm" onClick={() => irA("#contacto")}>
            Contacto
          </ObsiBoton>
        }
        onNavigate={irA}
      />

      {/* Hero: quién soy, qué hago y qué mirar — sin scroll ni adivinanzas. */}
      <header className="multi-v4__hero">
        <p className="multi-v4__rol">{PERFIL.rol}</p>
        <h1 className="multi-v4__claim">{PERFIL.claim}</h1>
        <p className="multi-v4__bio">{PERFIL.bio}</p>
        <div className="multi-v4__cta">
          <ObsiBoton onClick={() => irA("#proyectos")}>Ver proyectos</ObsiBoton>
          <ObsiBoton variant="outline" onClick={() => irA("#contacto")}>
            Hablemos
          </ObsiBoton>
        </div>
        <div className="multi-v4__datos">
          <ObsiDato value="9" label="familias visuales" accent />
          <ObsiDato value="31/36" label="componentes sin JS" />
          <ObsiDato value="0" label="kubectl a mano" />
        </div>
      </header>

      {/* Proyectos: el muro elige, la ficha profundiza (disclosure progresiva). */}
      <section id="proyectos" className="multi-v4__seccion">
        <ObsiPlaca eyebrow="casos de estudio" title="Tres proyectos, una cadena">
          Del design system al deploy firmado: cada caso cuenta problema, proceso
          y resultado. Elige una esquirla.
        </ObsiPlaca>

        <ObsiMuro>
          {CASOS.map((c) => (
            <ObsiEsquirla
              key={c.id}
              eyebrow={c.eyebrow}
              title={c.titulo}
              art={c.arte}
              active={c.id === casoActivo}
              onSelect={() => setCasoActivo(c.id)}
            />
          ))}
        </ObsiMuro>

        <article className="multi-v4__ficha" aria-live="polite">
          <header className="multi-v4__ficha-head">
            <p className="multi-v4__ficha-proyecto">{caso.proyecto}</p>
            <ul className="multi-v4__stack">
              {caso.stack.map((s) => (
                <li key={s}>
                  <span data-obsi-recto>{s}</span>
                </li>
              ))}
            </ul>
          </header>

          <div className="multi-v4__ficha-cols">
            <div>
              <h3 className="multi-v4__ficha-titulo">Problema</h3>
              <p>{caso.problema}</p>
            </div>
            <div>
              <h3 className="multi-v4__ficha-titulo">Proceso</h3>
              <ol>
                {caso.proceso.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="multi-v4__ficha-titulo">Resultado</h3>
              <ul>
                {caso.resultado.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <footer className="multi-v4__ficha-metricas">
            {caso.metricas.map((m) => (
              <ObsiDato key={m.label} value={m.valor} label={m.label} accent />
            ))}
          </footer>
        </article>
      </section>

      {/* Pieles: el multiverso, ahora como sala de exhibición del sistema. */}
      <section id="pieles" className="multi-v4__seccion">
        <ObsiPlaca eyebrow="el sistema vivo" title="Un contrato, nueve pieles">
          Todas estas familias visten los mismos primitivos headless y hablan el
          mismo contrato de tokens. Los mundos-demo (Radio Cinta, Koi Matsuri, la
          Gaceta) pasan a ser exhibiciones dentro de cada caso — no la navegación.
        </ObsiPlaca>
        <ul className="multi-v4__pieles">
          {PIELES.map((p) => (
            <li
              key={p.nombre}
              className="multi-v4__piel"
              style={{ background: p.color, color: p.tinta }}
            >
              <span data-obsi-recto>
                <strong>{p.nombre}</strong> {p.concepto}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sobre mí + contacto: a un clic desde cualquier punto. */}
      <section id="sobre-mi" className="multi-v4__seccion multi-v4__cierre">
        <ObsiAnillo label={PERFIL.nombre} sublabel={PERFIL.rol} initials="MH" active arc={0.82} />
        <ObsiPlaca eyebrow="sobre mí" title={PERFIL.nombre}>
          {PERFIL.bio}
        </ObsiPlaca>
        <div id="contacto" className="multi-v4__contacto">
          <ObsiBoton onClick={() => (window.location.href = `mailto:${PERFIL.email}`)}>
            {PERFIL.email}
          </ObsiBoton>
          <ObsiBoton variant="ghost" onClick={() => window.open(PERFIL.github, "_blank")}>
            GitHub
          </ObsiBoton>
          <ObsiBoton variant="ghost" onClick={() => window.open(PERFIL.linkedin, "_blank")}>
            LinkedIn
          </ObsiBoton>
        </div>
      </section>

      <footer className="multi-v4__pie">
        <span data-obsi-recto>
          hecho con @ahroi/foundation · desplegado por aegis v2 · {PERFIL.sitio}
        </span>
      </footer>
    </div>
  );
}
