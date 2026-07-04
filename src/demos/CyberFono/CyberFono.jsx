import { useState } from "react";
import { cx } from "../../utils/cx";
import Stat from "../../primitives/Stat/Stat";
import Toggle from "../../primitives/Toggle/Toggle";
import ProgressRing from "../../primitives/ProgressRing/ProgressRing";
import ShaderSurface from "../../primitives/ShaderSurface/ShaderSurface";
import { GLYPH_RAIN, SCAN_BAR, CIRCUIT } from "../../shaders/effects";
import "./CyberFono.scss";

const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);

const INITIAL = [
  { id: "weekdays", label: "WEEKDAYS", temp: "18°C", on: false },
  { id: "dayoff", label: "DAY OFF", temp: "19°C", on: true },
  { id: "holiday", label: "HOLIDAY", temp: "OFF", on: true },
];

/**
 * The "fono" smart-home panel, re-skinned cyberpunk-asian — entirely monochrome
 * (theme ink/paper only). Shaders are used as in-UI texture layers, not just a
 * backdrop: glyph rain behind the title plate, a sweeping HUD scan inside the
 * climate readout, and live circuit traces inside the energy card. Functional:
 * ± drives the heating ring, every toggle is real.
 */
export default function CyberFono({ className = "", ...rest }) {
  const [temp, setTemp] = useState(19);
  const [timer, setTimer] = useState(true);
  const [rows, setRows] = useState(INITIAL);

  const progress = clamp(Math.round(((temp - 12) / (21 - 12)) * 100), 0, 100);
  const nudge = (d) => setTemp((t) => clamp(+(t + d * 0.5).toFixed(1), 5, 30));
  const toggleRow = (id) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, on: !r.on } : r)));

  return (
    <section className={cx("ds-cyber", className)} aria-label="Climate control" {...rest}>
      {/* Title plate — glyph rain behind the heading */}
      <header className="ds-cyber__head">
        <ShaderSurface className="ds-cyber__rain" frag={GLYPH_RAIN} />
        <div className="ds-cyber__head-text">
          <span className="ds-cyber__sys">
            <span className="ds-cyber__jp" lang="ja">系統</span> · SYS.ONLINE
          </span>
          <h2 className="ds-cyber__title">Aeonik Fono</h2>
        </div>
        <button type="button" className="ds-cyber__menu" aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      {/* Climate readout — HUD scan texture */}
      <div className="ds-cyber__climate">
        <ShaderSurface className="ds-cyber__fx" frag={SCAN_BAR} />
        <div className="ds-cyber__climate-inner">
          <div className="ds-cyber__setpoint">
            <button type="button" className="ds-cyber__step" aria-label="Lower temperature" onClick={() => nudge(-1)}>−</button>
            <span className="ds-cyber__temp">
              {temp.toFixed(1)}<i>°C</i>
            </span>
            <button type="button" className="ds-cyber__step" aria-label="Raise temperature" onClick={() => nudge(1)}>+</button>
          </div>
          <p className="ds-cyber__msg">
            <span className="ds-cyber__jp" lang="ja">加熱中</span> · heating to target…
          </p>
          <ProgressRing className="ds-cyber__ring" value={progress} size={48} stroke={3} />
        </div>
      </div>

      {/* Metric cards */}
      <div className="ds-cyber__cards">
        <article className="ds-cyber__card">
          <span className="ds-cyber__card-title">
            <span className="ds-cyber__jp" lang="ja">輻射</span> · RADIATORS
          </span>
          <Stat size="sm" label="Water" value="67" unit="°C" />
          <Stat size="sm" label="Pressure" value="1.7" unit="bar" />
          <div className="ds-cyber__timer">
            <span className="ds-stat__label">Timer</span>
            <Toggle size="sm" checked={timer} onChange={setTimer} label="Radiator timer" />
          </div>
        </article>

        <article className="ds-cyber__card ds-cyber__card--fx">
          <ShaderSurface className="ds-cyber__fx" frag={CIRCUIT} />
          <div className="ds-cyber__card-inner">
            <span className="ds-cyber__card-title">
              <span className="ds-cyber__jp" lang="ja">電力</span> · PANELS
            </span>
            <Stat size="sm" label="Capacity" value="320" unit="kWh" />
            <Stat size="sm" label="Weekly" value="+1.6" unit="%" />
            <Stat size="sm" label="Total yield" value="190" unit="kWh" />
          </div>
        </article>
      </div>

      {/* Schedule */}
      <ul className="ds-cyber__schedule">
        {rows.map((r) => (
          <li key={r.id} className={cx("ds-cyber__row", r.on && "ds-cyber__row--on")}>
            <span className="ds-cyber__row-label">{r.label}</span>
            <span className="ds-cyber__row-temp">{r.temp}</span>
            <Toggle size="sm" checked={r.on} onChange={() => toggleRow(r.id)} label={`${r.label} schedule`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
