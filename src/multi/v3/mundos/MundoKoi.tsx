// =============================================================================
// MULTI V3 — Koi Matsuri: el festival nocturno, ahora de página larga.
//
// Parallax de verdad: el torii (componente NUEVO de la familia) y el sol
// derivan más lento que el scroll (.mv3-lento), las tarjetas de la noche
// entran escalonadas (.mv3-reveal) y el programa es un slider scroll-snap.
// Secreto: el hanko del cierre se puede estampar.
// =============================================================================

import KoiBrush from "../../../families/koi/KoiBrush/KoiBrush";
import KoiButton from "../../../families/koi/KoiButton/KoiButton";
import KoiDate from "../../../families/koi/KoiDate/KoiDate";
import KoiHanko from "../../../families/koi/KoiHanko/KoiHanko";
import KoiPill from "../../../families/koi/KoiPill/KoiPill";
import KoiStream from "../../../families/koi/KoiStream/KoiStream";
import KoiSun from "../../../families/koi/KoiSun/KoiSun";
import KoiTorii from "../../../families/koi/KoiTorii/KoiTorii";
import { useHallazgos } from "../state";

const NOCHES = [
  ["🏮", "Primera noche", "Encendido de linternas: mil luces suben el río mientras abre la feria."],
  ["🥁", "Segunda noche", "Taiko al aire libre — el pulso del festival se siente en el vidrio."],
  ["🎆", "Tercera noche", "Hanabi sobre el agua: el cielo del índigo se llena de crisantemos."],
  ["⛩", "Cierre", "Procesión al torii grande y deseos atados con cordel rojo."],
] as const;

export default function MundoKoi() {
  const hallazgos = useHallazgos();

  return (
    <div className="koi-scope koi-scene mv3k">
      {/* ---- HERO con capas de parallax ---- */}
      <section className="mv3k-hero">
        <KoiStream count={9} />
        <span className="mv3k-hero__sol mv3-lento" aria-hidden="true">
          <KoiSun size={240} />
        </span>
        <span className="mv3k-hero__torii mv3-lento" aria-hidden="true">
          <KoiTorii size={340} tone="ink" />
        </span>
        <div className="mv3k-hero__contenido">
          <KoiPill icon="🏮" tone="gold">
            Festival nocturno · 19:00
          </KoiPill>
          <KoiBrush as="h1" size="hero">
            Matsuri
          </KoiBrush>
          <p className="mv3k-sub">
            Estás en otra web — misma app, otra familia. Baja: la noche es larga y el
            torii se queda atrás mientras tú avanzas.
          </p>
          <KoiButton tone="sun">Explorar el festival</KoiButton>
        </div>
      </section>

      {/* ---- PROGRAMA: slider scroll-snap ---- */}
      <section className="mv3k-seccion mv3-reveal">
        <KoiBrush as="h2" size="title">
          Cuatro noches
        </KoiBrush>
        <div className="mv3-snap mv3k-noches">
          {NOCHES.map(([icono, titulo, desc], i) => (
            <article className="mv3-snap__item mv3k-noche" key={titulo}>
              <span className="mv3k-noche__icono" aria-hidden="true">
                {icono}
              </span>
              <KoiPill tone={i % 2 ? "gold" : "sun"}>{titulo}</KoiPill>
              <p className="mv3k-noche__desc">{desc}</p>
            </article>
          ))}
        </div>
        <p className="mv3k-hint" aria-hidden="true">
          → desliza
        </p>
      </section>

      {/* ---- CIERRE con fecha y sello ---- */}
      <section className="mv3k-seccion mv3k-cierre">
        <div className="mv3-reveal">
          <KoiDate lines={["Noche", "del", "Multiverso"]} over="Jul, 2026" big="03" />
        </div>
        <div className="mv3-reveal mv3-reveal--2 mv3k-cierre__sello">
          <p className="mv3k-sub">El festival sella tu visita — si tú quieres.</p>
          <button
            type="button"
            className="mv3k-sello"
            onClick={() => hallazgos.marcar("sello-koi")}
            aria-pressed={hallazgos.tiene("sello-koi")}
          >
            <KoiHanko
              char={hallazgos.tiene("sello-koi") ? "祭" : "空"}
              size={84}
              tone={hallazgos.tiene("sello-koi") ? "sun" : "gold"}
              label={hallazgos.tiene("sello-koi") ? "sello estampado" : "estampar sello"}
            />
          </button>
          <p className="mv3k-hint">
            {hallazgos.tiene("sello-koi") ? "✦ hallazgo anotado" : "(toca el sello)"}
          </p>
        </div>
        <KoiStream variant="petals" count={7} />
      </section>
    </div>
  );
}
