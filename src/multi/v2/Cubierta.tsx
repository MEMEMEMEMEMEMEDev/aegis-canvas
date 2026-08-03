// =============================================================================
// MULTI V2 — la Cubierta de registros: blog / expediente / comunicaciones.
//
// La parte "normal para recruiters" de la nave — legible, escaneable, con
// links de verdad (un mailto se puede copiar; un DomoButton no). Nunca está
// bloqueada por el juego: se llega por el atajo «Canal directo ▸» del HUD,
// por la puerta del puente o pidiéndoselo a la AI. Solo estas dos últimas
// dan el logro — esa es la gracia.
// =============================================================================

import DomoButton from "../../families/domo/DomoButton/DomoButton";
import DomoReadout from "../../families/domo/DomoReadout/DomoReadout";
import DomoStatus from "../../families/domo/DomoStatus/DomoStatus";
import DomoType from "../../families/domo/DomoType/DomoType";
import { DomoRow, DomoRows } from "../../families/domo/DomoRow/DomoRow";
import KoiHanko from "../../families/koi/KoiHanko/KoiHanko";
import { BITACORA, CONTACTO, EXPEDIENTE } from "./content";

export default function Cubierta({ onVolver }: { onVolver: () => void }) {
  return (
    <div className="domo-scope mv2-dark mv2-espacio mv2-cubierta">
      <span className="mv2-estrellas" aria-hidden="true" />

      <header className="mv2-hud">
        <span>Nave AEGIS ◆ Cubierta de registros</span>
        <DomoButton size="sm" variant="outline" onClick={onVolver}>
          ← Volver
        </DomoButton>
      </header>

      <section className="mv2-hero mv2-cubierta__intro">
        <div className="mv2-hero__col">
          <span className="mv2-kicker">◇ La cubierta tranquila</span>
          <h1 className="mv2-titulo">Registros.</h1>
          <DomoType
            speed={14}
            text="Aquí no hay combos ni señales cifradas: bitácora de lo construido, expediente del tripulante humano y un canal de comunicaciones que responde en menos de un salto orbital."
          />
        </div>
      </section>

      <div className="mv2-cubierta__grid">
        <section className="mv2-glass mv2-cubierta__panel" aria-label="bitácora">
          <h2 className="mv2-seccion__titulo">Bitácora de vuelo</h2>
          {BITACORA.map((e) => (
            <article className="mv2-cubierta__entrada" key={e.titulo}>
              <span className="mv2-kicker">{e.fecha}</span>
              <h3 className="mv2-cubierta__entrada-titulo">{e.titulo}</h3>
              <p className="mv2-cubierta__texto">{e.resumen}</p>
            </article>
          ))}
        </section>

        <section className="mv2-glass mv2-cubierta__panel" aria-label="expediente">
          <h2 className="mv2-seccion__titulo">Expediente del tripulante</h2>
          <div className="mv2-cubierta__ficha">
            <DomoReadout label="Nombre" value={EXPEDIENTE.nombre} />
            <DomoReadout label="Rol" value={EXPEDIENTE.rol} />
          </div>
          <p className="mv2-cubierta__texto">{EXPEDIENTE.bio}</p>
          <DomoRows template="1fr auto">
            {EXPEDIENTE.stack.map(([tech, ver]) => (
              <DomoRow key={tech} cells={[tech, ver]} />
            ))}
          </DomoRows>
          <span className="koi-scope mv2-cubierta__sello">
            <KoiHanko char="航" size={58} tone="gold" label="sello del tripulante" />
          </span>
        </section>

        <section className="mv2-glass mv2-cubierta__panel" aria-label="comunicaciones">
          <h2 className="mv2-seccion__titulo">Comunicaciones</h2>
          <DomoStatus busy>Canal abierto — se responde en horario terrestre</DomoStatus>
          <div className="mv2-cubierta__links">
            <a className="mv2-cubierta__link" href={`mailto:${CONTACTO.email}`}>
              ✉ {CONTACTO.email}
            </a>
            <a
              className="mv2-cubierta__link"
              href={CONTACTO.github}
              target="_blank"
              rel="noreferrer"
            >
              ◆ GitHub
            </a>
            <a
              className="mv2-cubierta__link"
              href={CONTACTO.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              ◆ LinkedIn
            </a>
          </div>
          <p className="mv2-cubierta__texto mv2-cubierta__nota">
            Si llegaste hasta aquí por el atajo: bien hecho, era para ti. Si llegaste
            jugando: el registro de la consola ya lo sabe.
          </p>
        </section>
      </div>
    </div>
  );
}
