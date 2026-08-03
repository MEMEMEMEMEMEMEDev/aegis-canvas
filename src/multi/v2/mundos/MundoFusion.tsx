// =============================================================================
// MULTI V2 — Sector 電気-OS (adaptado de V1): Domo × Denki, NieR expresivo.
// Los componentes DOMO leen la paleta DENKI vía overrides del contrato
// (.mv2-fusion). Mismo markup, otra sangre.
// =============================================================================

import DenkiBurst from "../../../families/denki/DenkiBurst/DenkiBurst";
import DenkiCombo from "../../../families/denki/DenkiCombo/DenkiCombo";
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
    <div className="denki-scope domo-scope mv2-fusion">
      <header className="mv2-fusion__hud">
        <DenkiTag tone="red">Sector 電気-OS</DenkiTag>
        <DenkiCombo label="acceso" sequence={["←", "↓", "→", "◆"]} speed={520} />
      </header>

      <section
        style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}
      >
        <DenkiTitle latin="Unidad Creativa" kana="クリエイティブ" sub="Domo × Denki — build 02" crown />
        <h2 className="mv2-fusion__grito">
          <DomoGlitch text="Expresión / Sistema" />
        </h2>
        <DomoType
          speed={12}
          text="Mismos instrumentos, otra sangre: este mundo entero es el contrato --domo-* retematizado con la paleta DENKI. NieR sin miedo a gritar."
        />
      </section>

      <section className="mv2-fusion__grid">
        <DomoCut cut="blade" title="Sincronía" status="98%">
          <div className="mv2-fusion__fila">
            <DomoGauge value={98} label="sincronía" size={72} />
            <DomoReadout label="Vínculo" value="Estable" />
          </div>
          <DomoStatus busy>Tokens compartidos entre familias</DomoStatus>
        </DomoCut>
        <DomoCut cut="notch" title="Arsenal" status="equipado">
          <DomoReadout label="Cortes" value="03" />
          <DenkiCombo label="Combo firma" sequence={["↓", "↘", "→", "GLSL"]} />
        </DomoCut>
        <DomoCut cut="chamfer" tone="ink" title="Memoria" status="expresiva">
          <DomoReadout label="Glitch" value="ON" size="lg" />
          <DomoStatus>El sistema también siente ◆</DomoStatus>
        </DomoCut>
      </section>

      <div className="mv2-fusion__fila" style={{ justifyContent: "space-between" }}>
        <DenkiBurst tone="red" size={130}>
          Más allá
        </DenkiBurst>
        <DomoButton size="lg">Iniciar protocolo →</DomoButton>
      </div>

      <DenkiRail items={["電気", "Domo OS", "Glitch", "Semitono", "クリエイティブ"]} tone="red" />
    </div>
  );
}
