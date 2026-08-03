// =============================================================================
// MULTI V2 — La Gaceta Estelar (adaptada de V1): Tebeo × Telar + sello Denki.
// Edición 502: ahora la redacción SABE que el lector llegó descifrando su
// propia errata, y presume de ello en portada.
// =============================================================================

import DenkiBarcode from "../../../families/denki/DenkiBarcode/DenkiBarcode";
import DenkiTag from "../../../families/denki/DenkiTag/DenkiTag";
import DenkiBurst from "../../../families/denki/DenkiBurst/DenkiBurst";
import TebeoButton from "../../../families/tebeo/TebeoButton/TebeoButton";
import TebeoHeadline from "../../../families/tebeo/TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "../../../families/tebeo/TebeoMarquee/TebeoMarquee";
import TebeoSticker from "../../../families/tebeo/TebeoSticker/TebeoSticker";
import TebeoTag from "../../../families/tebeo/TebeoTag/TebeoTag";
import TelarPanel from "../../../families/telar/TelarPanel/TelarPanel";
import TelarTag from "../../../families/telar/TelarTag/TelarTag";
import TelarTicker from "../../../families/telar/TelarTicker/TelarTicker";
import TelarType from "../../../families/telar/TelarType/TelarType";

export default function MundoGaceta() {
  return (
    <div className="tebeo-scope mv2-gaceta">
      <div className="mv2-gaceta__cabecera">
        <span>Edición 502 — Sistema Aegis</span>
        <span>Jul 2026</span>
        <span>Clima estelar: despejado ✦</span>
      </div>

      <div className="mv2-gaceta__masthead">
        <TebeoHeadline as="h1" size="hero">
          La Gaceta Estelar<em>.</em>
        </TebeoHeadline>
        <DenkiBurst size={110} tilt={7}>
          5¢
        </DenkiBurst>
      </div>

      <TebeoMarquee
        items={[
          "Última hora",
          "Lector descifra nuestra errata",
          "Siete familias vivas",
          "El multiverso ahora se juega",
        ]}
      />

      <div className="mv2-gaceta__cuerpo">
        <article className="mv2-gaceta__articulo">
          <TebeoHeadline as="h2" size="section">
            Lector encuentra la errata y abre el portal<em>!</em>
          </TebeoHeadline>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <TebeoTag tone="sun">Exclusiva</TebeoTag>
            <TebeoTag>Corresponsalía en órbita</TebeoTag>
          </div>
          <div className="mv2-gaceta__cols">
            <p>
              SISTEMA AEGIS — Esta redacción confirma, con una mezcla de orgullo y
              vergüenza, que su propio código de salto viajaba escondido en una
              errata de portada. "No son seis familias, son siete; siempre lo
              supimos", declaró el editor, que no lo sabía.
            </p>
            <p>
              La nave AEGIS habría estrenado además un protocolo de a bordo
              donde nada se entrega gratis: sistemas que se encienden a mano,
              señales que se sintonizan y códigos que se ejecutan con los dedos.
              Los expertos lo llaman "jugar"; la AI de vuelo lo llama "martes".
            </p>
            <p>
              Fuentes cercanas al hangar aseguran que la radio del sector CINTA
              ya emite pistas compuestas por una AI, y que en la Cubierta de
              registros vive un humano contratable. Seguiremos informando.
            </p>
          </div>
          <TebeoButton>Seguir leyendo en el puente →</TebeoButton>
        </article>

        <aside className="mv2-gaceta__lateral">
          <div className="telar-scope mv2-gaceta__aviso">
            <TelarPanel title="Teletipo andino" tone="fucsia" weave>
              <TelarType
                words={["tejiendo titulares…", "7 familias en órbita", "señal estable ◆"]}
              />
              <div
                style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.6rem" }}
              >
                <TelarTag>En vivo</TelarTag>
                <TelarTag tone="verde">Señal SCL</TelarTag>
              </div>
            </TelarPanel>
            <TelarTicker
              items={["Aviso: se buscan proyectos con ganas de ser mundos", "El telar no para"]}
            />
          </div>
          <TebeoSticker ring="GACETA ESTELAR • EDICIÓN 502 • " size={140}>
            ¡SÍ!
          </TebeoSticker>
        </aside>
      </div>

      <footer className="mv2-gaceta__pie">
        <span className="denki-scope mv2-gaceta__sello">
          <DenkiBarcode code="4 202600 000502" />
          <DenkiTag>Distribución interplanetaria</DenkiTag>
        </span>
        <TebeoTag tone="ink">Imprenta: @ahroi/foundation</TebeoTag>
      </footer>
    </div>
  );
}
