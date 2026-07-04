import { cx } from "../../utils/cx";
import ShaderSurface from "../../primitives/ShaderSurface/ShaderSurface";
import { PLATE_SCAN } from "../../shaders/effects";
import "./LaborPlate.scss";

/**
 * Industrial spec-plate (from resources/3-idea-concepto.png, "劳动者-12"). The
 * whole point is the seam: two panels — a light one top-left, a dark one
 * bottom-right — interlock along a stepped clip-path cut and assemble on entry
 * with staggered keyframes that the dark panel's shader fade coordinates with.
 * Monochrome (theme ink/paper only).
 */
export default function LaborPlate({ className = "", ...rest }) {
  return (
    <article className={cx("ds-plate", className)} {...rest}>
      {/* Light panel — top-left */}
      <div className="ds-plate__light">
        <div className="ds-plate__id">
          <h3 className="ds-plate__title">
            <span className="ds-plate__jp" lang="zh">劳动者</span>-12
          </h3>
          <p className="ds-plate__sub">
            <span className="ds-plate__jp" lang="zh">劳动记录模块</span>
            <span className="ds-plate__jp" lang="ja">労務記録モジュール</span>
          </p>
        </div>

        <div className="ds-plate__field">
          <div className="ds-plate__field-row">
            <span className="ds-plate__field-key" lang="zh">姓名</span>
            <span className="ds-plate__field-val" lang="zh">钱定海</span>
          </div>
          <div className="ds-plate__field-row">
            <span className="ds-plate__field-key" lang="zh">编号</span>
            <span className="ds-plate__field-val">CN/JP2049330003751</span>
          </div>
        </div>

        <div className="ds-plate__badge" aria-hidden="true">
          <span className="ds-plate__jp" lang="zh">电筹</span>
          <span className="ds-plate__badge-sub">NIAS</span>
        </div>
      </div>

      {/* Dark panel — bottom-right, with a faint scan texture */}
      <div className="ds-plate__dark">
        <ShaderSurface className="ds-plate__fx" frag={PLATE_SCAN} />

        <div className="ds-plate__corner" aria-hidden="true">
          <span className="ds-plate__ce">CE</span>
          <span className="ds-plate__code">ZG°716</span>
        </div>

        <div className="ds-plate__finger">
          <span className="ds-plate__jp" lang="zh">指纹录入</span>
          <span>·</span>
          <span className="ds-plate__jp" lang="ja">指紋入力</span>
          <span className="ds-plate__finger-mark" aria-hidden="true">▾</span>
        </div>

        <div className="ds-plate__brand">
          <span className="ds-plate__brand-name">
            <span className="ds-plate__jp" lang="zh">江南电科</span> JIANGNAN&nbsp;ET
          </span>
          <ul className="ds-plate__list">
            <li>Donghua Electronics · Sunset Heavy Industry</li>
            <li>Chunyu Industry · Joint Design and R&D</li>
            <li>Jiangnan ET — Ningbo Super Factory</li>
          </ul>
        </div>

        <div className="ds-plate__rcep" aria-hidden="true">
          <span>RCEP</span>
          <span className="ds-plate__rcep-dot" />
        </div>
      </div>
    </article>
  );
}
