// =============================================================================
// MULTI V3 — La Gaceta Estelar: periódico interestelar de página larga.
//
// El sello de precio deriva lento en el masthead, las columnas entran con
// el scroll y la ERRATA histórica sigue viva: tocar «SEIS» en el cuerpo la
// confirma (hallazgo «errata», con hanko de verificación incluido).
// =============================================================================

import DenkiBarcode from "../../../families/denki/DenkiBarcode/DenkiBarcode";
import DenkiBurst from "../../../families/denki/DenkiBurst/DenkiBurst";
import DenkiTag from "../../../families/denki/DenkiTag/DenkiTag";
import KoiHanko from "../../../families/koi/KoiHanko/KoiHanko";
import TebeoHeadline from "../../../families/tebeo/TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "../../../families/tebeo/TebeoMarquee/TebeoMarquee";
import TebeoTag from "../../../families/tebeo/TebeoTag/TebeoTag";
import TelarPanel from "../../../families/telar/TelarPanel/TelarPanel";
import TelarStripe from "../../../families/telar/TelarStripe/TelarStripe";
import TelarTag from "../../../families/telar/TelarTag/TelarTag";
import TelarTicker from "../../../families/telar/TelarTicker/TelarTicker";
import TelarType from "../../../families/telar/TelarType/TelarType";
import { useHallazgos } from "../state";

export default function MundoGaceta() {
  const hallazgos = useHallazgos();
  const confirmada = hallazgos.tiene("errata");

  return (
    <div className="tebeo-scope mv3g">
      <div className="mv3g-cabecera">
        <span>Edición 503 — Sistema Aegis</span>
        <span>Jul 2026</span>
        <span>Clima estelar: despejado ✦</span>
      </div>

      <div className="mv3g-masthead">
        <TebeoHeadline as="h1" size="hero">
          La Gaceta Estelar<em>.</em>
        </TebeoHeadline>
        <span className="mv3-lento" aria-hidden="true">
          <DenkiBurst size={110} tilt={7}>
            5¢
          </DenkiBurst>
        </span>
      </div>

      <TebeoMarquee
        items={["Última hora", "El multiverso estrena serif", "La errata sigue sin corregirse", "Séptima familia: se buscan referencias"]}
      />

      {/* ---- ARTÍCULO PRINCIPAL ---- */}
      <div className="mv3g-cuerpo">
        <article className="mv3g-articulo mv3-reveal">
          <TebeoHeadline as="h2" size="section">
            Tercera órbita: ahora con física de papel<em>!</em>
          </TebeoHeadline>
          <div className="mv3g-chips">
            <TebeoTag tone="sun">Exclusiva</TebeoTag>
            <TebeoTag>Corresponsalía en órbita</TebeoTag>
            {confirmada && <TebeoTag tone="ink">Errata confirmada</TebeoTag>}
          </div>
          <div className="mv3g-cols">
            <p>
              SISTEMA AEGIS — La tercera órbita del multiverso abandona los saltos
              bruscos: ahora los mundos son páginas largas donde el fondo se queda
              atrás y los titulares entran empujando. "Es parallax", explicó la AI
              de ruta. "Es brujería", replicó nuestro linotipista.
            </p>
            <p>
              Esta redacción mantiene, por tradición y terquedad, que{" "}
              <button
                type="button"
                className="mv3g-errata"
                disabled={confirmada}
                onClick={() => hallazgos.marcar("errata")}
              >
                SEIS
              </button>{" "}
              familias sostienen el sistema. Los archivos insisten en que son siete.
              La Gaceta no corrige: la Gaceta reedita.
            </p>
            <p>
              En otras noticias: el hub estrena una serif con eje de torcedura, la
              radio del sector CINTA suma un ecualizador que baila solo, y el
              festival KOI levantó un torii nuevo que —juran los testigos— se mueve
              más lento que el cielo.
            </p>
          </div>
          {confirmada && (
            <span className="koi-scope mv3g-verificado">
              <KoiHanko char="正" size={62} label="errata verificada" />
              <span className="mv3g-verificado__texto">✦ hallazgo anotado</span>
            </span>
          )}
        </article>

        {/* ---- LATERAL TELAR ---- */}
        <aside className="mv3g-lateral mv3-reveal mv3-reveal--2">
          <div className="telar-scope mv3g-aviso">
            <TelarPanel title="Teletipo andino" tone="fucsia" weave>
              <TelarType words={["tejiendo titulares…", "7 mundos… no, 5", "señal estable ◆"]} />
              <div className="mv3g-aviso__tags">
                <TelarTag>En vivo</TelarTag>
                <TelarTag tone="verde">Señal SCL</TelarTag>
              </div>
            </TelarPanel>
            <TelarStripe animated height={8} />
            <TelarTicker
              items={["Aviso: se buscan proyectos con ganas de ser mundos", "El telar no para"]}
            />
          </div>
        </aside>
      </div>

      <footer className="mv3g-pie">
        <span className="denki-scope mv3g-sello">
          <DenkiBarcode code="4 202600 000503" />
          <DenkiTag>Distribución interplanetaria</DenkiTag>
        </span>
        <TebeoTag tone="ink">Imprenta: @ahroi/foundation</TebeoTag>
      </footer>
    </div>
  );
}
