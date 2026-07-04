import { useMemo, useState } from "react";
import { cx } from "../../utils/cx";
import Button from "../../primitives/Button/Button";
import Stat from "../../primitives/Stat/Stat";
import Toggle from "../../primitives/Toggle/Toggle";
import ProgressRing from "../../primitives/ProgressRing/ProgressRing";
import MetaTag from "../../families/hud/MetaTag/MetaTag";
import ShaderSurface from "../../primitives/ShaderSurface/ShaderSurface";
import { CHART_AREA, CHART_BARS, SPARKLINE } from "../../shaders/effects";
import "./AdminConsole.scss";

// --- Deterministic mock data -------------------------------------------------
const CAP = 64;
function series(n, seed, base, amp) {
  return Array.from({ length: n }, (_, i) => {
    const x = i / n;
    return (
      base +
      Math.sin(x * 6.28 * 1.5 + seed) * amp * 0.5 +
      Math.sin(x * 6.28 * 4.0 + seed * 2.0) * amp * 0.2 +
      Math.sin(x * 22.0 + seed) * amp * 0.08
    );
  });
}
// Normalise any series into a fixed-size 0..1 uniform array for the shader.
function toUniform(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const arr = new Float32Array(CAP);
  for (let i = 0; i < values.length; i++) {
    arr[i] = 0.08 + 0.84 * ((values[i] - min) / span);
  }
  return { u_data: arr, u_count: values.length };
}

const AREA_SERIES = {
  "24H": series(40, 1.0, 0.5, 0.7),
  "7D": series(40, 2.3, 0.55, 0.85),
  "30D": series(40, 4.1, 0.45, 0.95),
};
const RANGES = ["24H", "7D", "30D"];

const KPIS = [
  { key: "req", label: "Requests", value: "2.84M", delta: "+12.4%", up: true, spark: series(24, 1.1, 0.5, 0.6) },
  { key: "lat", label: "p95 Latency", value: "148ms", delta: "−6.1%", up: true, spark: series(24, 3.4, 0.5, 0.5) },
  { key: "err", label: "Error rate", value: "0.21%", delta: "+0.3%", up: false, spark: series(24, 5.7, 0.5, 0.7) },
];

const REGIONS = [0.92, 0.64, 0.78, 0.41, 0.3, 0.55];
const REGION_LABELS = ["APAC", "EU", "NA", "SA", "AF", "ME"];

const EVENTS = [
  { t: "14:41:09", node: "node-07", msg: "Deploy completed", status: "OK" },
  { t: "14:38:22", node: "node-03", msg: "High memory pressure", status: "WARN" },
  { t: "14:35:50", node: "node-11", msg: "Autoscale +2 replicas", status: "INFO" },
  { t: "14:31:13", node: "node-02", msg: "Health check failed", status: "ERR" },
  { t: "14:27:48", node: "node-09", msg: "Cache flushed", status: "OK" },
  { t: "14:20:05", node: "node-05", msg: "Certificate renewed", status: "OK" },
];

const NAV = [
  { id: "overview", label: "Overview", jp: "总览", icon: "◧" },
  { id: "events", label: "Events", jp: "事件", icon: "≣" },
  { id: "settings", label: "Settings", jp: "设置", icon: "⚙" },
];

// Monochrome: status is shape-coded, not colour-coded.
const STATUS_MARK = { OK: "◼", WARN: "▲", INFO: "▸", ERR: "✕" };
function StatusTag({ status }) {
  return (
    <MetaTag variant={status === "OK" ? "solid" : "outline"} className="ds-admin__status">
      <span className="ds-admin__status-mark" aria-hidden="true">{STATUS_MARK[status]}</span>
      {status}
    </MetaTag>
  );
}

export default function AdminConsole({ className = "", ...rest }) {
  const [view, setView] = useState("overview");
  const [range, setRange] = useState("7D");
  const [settings, setSettings] = useState({ telemetry: true, autodeploy: false, scanlines: true });

  const areaU = useMemo(() => toUniform(AREA_SERIES[range]), [range]);
  const barsU = useMemo(() => ({ u_data: Float32Array.from(REGIONS.concat(Array(CAP - REGIONS.length).fill(0))), u_count: REGIONS.length }), []);
  const sparks = useMemo(() => KPIS.map((k) => toUniform(k.spark)), []);

  return (
    <section className={cx("ds-admin", className)} aria-label="Admin console" {...rest}>
      {/* Sidebar */}
      <aside className="ds-admin__side">
        <div className="ds-admin__brand">
          <span className="ds-admin__brand-mark" aria-hidden="true">江</span>
          <span className="ds-admin__brand-text">
            <span className="ds-admin__jp" lang="zh">管制台</span>
            <small>CONSOLE</small>
          </span>
        </div>

        <nav className="ds-admin__nav">
          <span className="ds-admin__nav-label">MAIN</span>
          {NAV.slice(0, 2).map((n) => (
            <button
              key={n.id}
              type="button"
              className={cx("ds-admin__nav-item", view === n.id && "is-active")}
              onClick={() => setView(n.id)}
            >
              <span className="ds-admin__nav-icon" aria-hidden="true">{n.icon}</span>
              <span>{n.label}</span>
              <span className="ds-admin__jp" lang="zh">{n.jp}</span>
            </button>
          ))}

          <span className="ds-admin__nav-label">SYSTEM</span>
          <button
            type="button"
            className={cx("ds-admin__nav-item", view === "settings" && "is-active")}
            onClick={() => setView("settings")}
          >
            <span className="ds-admin__nav-icon" aria-hidden="true">⚙</span>
            <span>Settings</span>
            <span className="ds-admin__jp" lang="zh">设置</span>
          </button>
          {["Nodes 节点", "Logs 日志"].map((l) => (
            <button key={l} type="button" className="ds-admin__nav-item" disabled>
              <span className="ds-admin__nav-icon" aria-hidden="true">◇</span>
              <span>{l.split(" ")[0]}</span>
              <span className="ds-admin__nav-lock" aria-hidden="true">⌁</span>
            </button>
          ))}
        </nav>

        <div className="ds-admin__user">
          <span className="ds-admin__avatar" aria-hidden="true">钱</span>
          <span className="ds-admin__user-text">
            <strong>Qián Dìnghǎi</strong>
            <small>root · ops</small>
          </span>
        </div>
      </aside>

      {/* Main */}
      <div className="ds-admin__main">
        <header className="ds-admin__topbar">
          <div className="ds-admin__crumbs">
            <span className="ds-admin__jp" lang="zh">江南电科</span>
            <span className="ds-admin__crumb-sep">/</span>
            <span>{NAV.find((n) => n.id === view)?.label ?? "Settings"}</span>
          </div>
          <div className="ds-admin__top-actions">
            <label className="ds-admin__search">
              <span aria-hidden="true">⌕</span>
              <input type="text" placeholder="Search…" aria-label="Search" />
            </label>
            <MetaTag variant="outline" className="ds-admin__live">
              <span className="ds-admin__live-dot" /> LIVE
            </MetaTag>
            <Button size="sm">Deploy</Button>
          </div>
        </header>

        <div key={view} className="ds-admin__view">
          {view === "overview" && (
            <>
              <div className="ds-admin__kpis">
                {KPIS.map((k, i) => (
                  <article key={k.key} className="ds-admin__kpi">
                    <div className="ds-admin__kpi-head">
                      <span className="ds-admin__kpi-label">{k.label}</span>
                      <MetaTag variant={k.up ? "solid" : "outline"} className="ds-admin__delta">
                        {k.delta}
                      </MetaTag>
                    </div>
                    <span className="ds-admin__kpi-value">{k.value}</span>
                    <div className="ds-admin__spark">
                      <ShaderSurface frag={SPARKLINE} uniforms={sparks[i]} />
                    </div>
                  </article>
                ))}
              </div>

              <div className="ds-admin__grid">
                <article className="ds-admin__panel ds-admin__panel--wide">
                  <header className="ds-admin__panel-head">
                    <div>
                      <span className="ds-admin__panel-title">Throughput</span>
                      <span className="ds-admin__panel-sub" lang="zh">吞吐量 · req/s</span>
                    </div>
                    <div className="ds-admin__seg" role="group" aria-label="Range">
                      {RANGES.map((r) => (
                        <button
                          key={r}
                          type="button"
                          className={cx("ds-admin__seg-btn", r === range && "is-active")}
                          onClick={() => setRange(r)}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </header>
                  <div className="ds-admin__chart">
                    <ShaderSurface key={range} frag={CHART_AREA} uniforms={areaU} />
                  </div>
                </article>

                <article className="ds-admin__panel ds-admin__panel--gauge">
                  <span className="ds-admin__panel-title">CPU Load</span>
                  <ProgressRing className="ds-admin__ring" value={72} size={120} stroke={6} />
                  <span className="ds-admin__gauge-sub" lang="zh">8 节点 · nominal</span>
                </article>

                <article className="ds-admin__panel ds-admin__panel--bars">
                  <header className="ds-admin__panel-head">
                    <span className="ds-admin__panel-title">By region</span>
                    <span className="ds-admin__panel-sub" lang="zh">区域</span>
                  </header>
                  <div className="ds-admin__chart ds-admin__chart--bars">
                    <ShaderSurface frag={CHART_BARS} uniforms={barsU} />
                  </div>
                  <div className="ds-admin__bar-labels">
                    {REGION_LABELS.map((l) => <span key={l}>{l}</span>)}
                  </div>
                </article>

                <article className="ds-admin__panel ds-admin__panel--events">
                  <header className="ds-admin__panel-head">
                    <span className="ds-admin__panel-title">Recent events</span>
                    <button type="button" className="ds-admin__link" onClick={() => setView("events")}>
                      View all →
                    </button>
                  </header>
                  <ul className="ds-admin__events ds-admin__events--mini">
                    {EVENTS.slice(0, 4).map((e) => (
                      <li key={e.t} className="ds-admin__event">
                        <span className="ds-admin__event-time">{e.t}</span>
                        <span className="ds-admin__event-msg">{e.msg}</span>
                        <StatusTag status={e.status} />
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </>
          )}

          {view === "events" && (
            <article className="ds-admin__panel">
              <header className="ds-admin__panel-head">
                <div>
                  <span className="ds-admin__panel-title">Event log</span>
                  <span className="ds-admin__panel-sub" lang="zh">事件记录</span>
                </div>
                <Button size="sm" variant="outline">Export</Button>
              </header>
              <table className="ds-admin__table">
                <thead>
                  <tr><th>Time</th><th>Node</th><th>Event</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {EVENTS.map((e) => (
                    <tr key={e.t}>
                      <td className="ds-admin__mono">{e.t}</td>
                      <td className="ds-admin__mono">{e.node}</td>
                      <td>{e.msg}</td>
                      <td><StatusTag status={e.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          )}

          {view === "settings" && (
            <article className="ds-admin__panel ds-admin__panel--settings">
              <header className="ds-admin__panel-head">
                <div>
                  <span className="ds-admin__panel-title">Settings</span>
                  <span className="ds-admin__panel-sub" lang="zh">设置</span>
                </div>
              </header>
              <div className="ds-admin__settings">
                {[
                  { k: "telemetry", label: "Telemetry", jp: "遥测", desc: "Stream node metrics to the console." },
                  { k: "autodeploy", label: "Auto-deploy", jp: "自动部署", desc: "Ship on green pipeline." },
                  { k: "scanlines", label: "Scanline texture", jp: "扫描线", desc: "Shader overlay on dark panels." },
                ].map((s) => (
                  <div key={s.k} className="ds-admin__set-row">
                    <div>
                      <span className="ds-admin__set-label">
                        {s.label} <span className="ds-admin__jp" lang="zh">{s.jp}</span>
                      </span>
                      <span className="ds-admin__set-desc">{s.desc}</span>
                    </div>
                    <Toggle
                      checked={settings[s.k]}
                      onChange={(v) => setSettings((p) => ({ ...p, [s.k]: v }))}
                      label={s.label}
                    />
                  </div>
                ))}
              </div>
              <footer className="ds-admin__set-actions">
                <Button variant="ghost" size="sm">Reset</Button>
                <Button size="sm">Save changes</Button>
              </footer>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
