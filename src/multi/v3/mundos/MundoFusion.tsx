// =============================================================================
// MULTI V3 — Sector 電気-OS: la fusión Domo × Denki de página larga.
// El contrato --domo-* se retematiza con la paleta DENKI (.mv3f) y las
// máquinas entran escalonadas con el scroll. NieR sin miedo a gritar.
// =============================================================================

import DenkiBurst from "../../../families/denki/DenkiBurst/DenkiBurst";
import DenkiCombo from "../../../families/denki/DenkiCombo/DenkiCombo";
import DenkiFrame from "../../../families/denki/DenkiFrame/DenkiFrame";
import DenkiRail from "../../../families/denki/DenkiRail/DenkiRail";
import DenkiTag from "../../../families/denki/DenkiTag/DenkiTag";
import DenkiTitle from "../../../families/denki/DenkiTitle/DenkiTitle";
import DomoButton from "../../../families/domo/DomoButton/DomoButton";
import DomoCut from "../../../families/domo/DomoCut/DomoCut";
import DomoGauge from "../../../families/domo/DomoGauge/DomoGauge";
import DomoGlitch from "../../../families/domo/DomoGlitch/DomoGlitch";
import DomoReadout from "../../../families/domo/DomoReadout/DomoReadout";
import DomoStatus from "../../../families/domo/DomoStatus/DomoStatus";
import DomoType from "../../../families/domo/DomoType/DomoType";

export default function MundoFusion() {
  return (
    <div className="denki-scope domo-scope mv3f">
      {/* ---- HERO ---- */}
      <section className="mv3f-hero">
        <header className="mv3f-hud">
          <DenkiTag tone="red">Sector 電気-OS</DenkiTag>
          <DenkiCombo label="acceso" sequence={["←", "↓", "→", "◆"]} speed={520} />
        </header>
        <DenkiTitle latin="Unidad Creativa" kana="クリエイティブ" sub="Domo × Denki — build 03" crown />
        <h1 className="mv3f-grito">
          <DomoGlitch text="Expresión / Sistema" />
        </h1>
        <DomoType
          speed={12}
          text="Mismos instrumentos, otra sangre: este mundo entero es el contrato --domo-* leyendo la paleta DENKI. Baja — las máquinas despiertan de a una."
        />
      </section>

      {/* ---- MÁQUINAS: entran con el scroll ---- */}
      <section className="mv3f-grid">
        <div className="mv3-reveal">
          <DomoCut cut="blade" title="Sincronía" status="98%">
            <div className="mv3f-fila">
              <DomoGauge value={98} label="sincronía" size={72} />
              <DomoReadout label="Vínculo" value="Estable" />
            </div>
            <DomoStatus busy>Tokens compartidos entre familias</DomoStatus>
          </DomoCut>
        </div>
        <div className="mv3-reveal mv3-reveal--2">
          <DomoCut cut="notch" title="Arsenal" status="equipado">
            <DomoReadout label="Cortes" value="03" />
            <DenkiCombo label="Combo firma" sequence={["↓", "↘", "→", "GLSL"]} />
          </DomoCut>
        </div>
        <div className="mv3-reveal mv3-reveal--3">
          <DomoCut cut="chamfer" tone="ink" title="Memoria" status="expresiva">
            <DomoReadout label="Glitch" value="ON" size="lg" />
            <DomoStatus>El sistema también siente ◆</DomoStatus>
          </DomoCut>
        </div>
      </section>

      {/* ---- CATÁLOGO: la viñeta con tachado ---- */}
      <section className="mv3f-catalogo">
        <div className="mv3-reveal mv3f-catalogo__frame">
          <DenkiFrame caption="Fig. 03 — fusión no autorizada (autorizada)" strike ratio="4 / 3">
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #d13a1e55 0%, transparent 55%), linear-gradient(315deg, #f2e4c633 0%, transparent 60%)",
              }}
            />
          </DenkiFrame>
        </div>
        <div className="mv3-reveal mv3-reveal--2 mv3f-catalogo__col">
          <h2 className="mv3f-subtitulo">Edición de catálogo</h2>
          <p className="mv3f-parrafo">
            Cada proyecto es un producto: ficha técnica, precio de estallido y comandos
            que se pulsan solos. El semitono hace el resto.
          </p>
          <div className="mv3f-fila">
            <DenkiBurst tone="red" size={120}>
              Más allá
            </DenkiBurst>
            <DomoButton size="lg">Iniciar protocolo →</DomoButton>
          </div>
        </div>
      </section>

      <DenkiRail items={["電気", "Domo OS", "Glitch", "Semitono", "クリエイティブ"]} tone="red" />
    </div>
  );
}
