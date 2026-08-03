// =============================================================================
// MULTI V3 — Tebeo Press: la imprenta neo-retro, de página larga.
//
// El sticker deriva lento (.mv3-lento) mientras los titulares y las cards
// entran empujando (.mv3-reveal escalonado). Al final, el teléfono con la
// edición móvil — el guiño a la estética mobile que amamos.
// =============================================================================

import TebeoButton from "../../../families/tebeo/TebeoButton/TebeoButton";
import TebeoCard from "../../../families/tebeo/TebeoCard/TebeoCard";
import TebeoHeadline from "../../../families/tebeo/TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "../../../families/tebeo/TebeoMarquee/TebeoMarquee";
import TebeoPhone from "../../../families/tebeo/TebeoPhone/TebeoPhone";
import TebeoRotator from "../../../families/tebeo/TebeoRotator/TebeoRotator";
import TebeoSticker from "../../../families/tebeo/TebeoSticker/TebeoSticker";
import TebeoTag from "../../../families/tebeo/TebeoTag/TebeoTag";

export default function MundoTebeo() {
  return (
    <div className="tebeo-scope mv3t">
      {/* ---- HERO ---- */}
      <section className="mv3t-hero">
        <div className="mv3t-hero__col">
          <div className="mv3t-chips">
            <TebeoTag tone="sun">¡Extra!</TebeoTag>
            <TebeoTag>Edición V3</TebeoTag>
          </div>
          <TebeoHeadline as="h1" size="hero">
            Los titulares <TebeoRotator words={["cambian", "giran", "gritan"]} tone="sun" />
            <em>!</em>
          </TebeoHeadline>
          <p className="mv3t-parrafo">
            Otra web, otra tinta: papel crema, bordes gordos y stickers con opinión.
            Baja — la imprenta no para.
          </p>
          <TebeoButton tone="sun">Suscribirse gratis</TebeoButton>
        </div>
        <span className="mv3t-hero__sticker mv3-lento" aria-hidden="true">
          <TebeoSticker ring="TEBEO PRESS • OTRO MUNDO • TEBEO PRESS • " size={170}>
            GO!
          </TebeoSticker>
        </span>
      </section>

      <TebeoMarquee items={["Última hora", "La tinta llegó al multiverso", "Stickers en huelga: piden girar más lento", "Bordes cada vez más gordos"]} />

      {/* ---- PORTADAS: cards escalonadas ---- */}
      <section className="mv3t-seccion">
        <TebeoHeadline as="h2" size="section">
          En este número<em>.</em>
        </TebeoHeadline>
        <div className="mv3t-grid">
          <div className="mv3-reveal">
            <TebeoCard
              title="El deck que viaja"
              footer={<TebeoTag tone="sun">Reportaje</TebeoTag>}
            >
              Un OS salvia teletransporta lectores a cinco mundos. Nuestro corresponsal
              volvió con acento serif.
            </TebeoCard>
          </div>
          <div className="mv3-reveal mv3-reveal--2">
            <TebeoCard
              title="Parallax: ¿moda o física?"
              footer={<TebeoTag>Opinión</TebeoTag>}
            >
              El fondo se mueve más lento que el frente y nadie llama a la policía.
              Investigamos con scroll propio.
            </TebeoCard>
          </div>
          <div className="mv3-reveal mv3-reveal--3">
            <TebeoCard
              title="Se busca: séptima familia"
              footer={<TebeoTag tone="ink">Avisos</TebeoTag>}
            >
              La incubadora proto/ está vacía otra vez. Interesados dejar referencias
              en la carpeta refs/ del sistema.
            </TebeoCard>
          </div>
        </div>
      </section>

      {/* ---- EDICIÓN MÓVIL ---- */}
      <section className="mv3t-seccion mv3t-movil">
        <div className="mv3-reveal mv3t-movil__texto">
          <TebeoHeadline as="h2" size="section">
            También en tu bolsillo<em>!</em>
          </TebeoHeadline>
          <p className="mv3t-parrafo">
            La edición móvil sale cada mañana con los mismos bordes gordos. El papel
            no se moja; la pantalla tampoco.
          </p>
          <TebeoButton>Descargar ↓</TebeoButton>
        </div>
        <div className="mv3-reveal mv3-reveal--2">
          <TebeoPhone tilt={-4} width={230}>
            <div className="mv3t-phone">
              <TebeoTag tone="sun">Portada</TebeoTag>
              <TebeoHeadline as="h3" size="section">
                ¡Extra móvil<em>!</em>
              </TebeoHeadline>
              <p className="mv3t-parrafo">Cinco mundos caben en una mano.</p>
            </div>
          </TebeoPhone>
        </div>
      </section>
    </div>
  );
}
