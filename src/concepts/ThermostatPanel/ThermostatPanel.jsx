import { useState } from "react";
import { cx } from "../../utils/cx";
import Stat from "../../components/Stat/Stat";
import Toggle from "../../components/Toggle/Toggle";
import ProgressRing from "../../components/ProgressRing/ProgressRing";
import "./ThermostatPanel.scss";

// --- Domain model -----------------------------------------------------------
const FLOOR = 12;
const TARGET = 21;
const STEP = 0.5;
const MIN = 5;
const MAX = 30;

const INITIAL_SCHEDULE = [
  { id: "weekdays", label: "WEEKDAYS", temp: "18°C", time: "6AM–10AM · 5PM–11:30PM", on: false },
  { id: "dayoff", label: "DAY OFF", temp: "19°C", time: "9AM–1PM · 5PM–11:30PM", on: true },
  { id: "sunday", label: "SUNDAY", temp: "19°C", time: "10AM–12PM · 5PM–11:30PM", on: false },
  { id: "holiday", label: "HOLIDAY", temp: "OFF", time: "DEHUMIDIFIER ON", on: true },
];

const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);

/**
 * Smart-home climate panel — a faithful, *functional* reconstruction of the
 * "Aeonik Fono" inspiration (resources/2-idea-concepto.png), rebuilt entirely
 * on the foundation contract. Mobile-first: a single fluid column that the
 * paired cards collapse within on narrow screens.
 *
 * Everything is live: ± sets the setpoint (and drives the heating ring),
 * the radiator timer and every schedule row are real toggles.
 */
export default function ThermostatPanel({ className = "", ...rest }) {
  const [temp, setTemp] = useState(19);
  const [timerOn, setTimerOn] = useState(true);
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [activeId] = useState("dayoff");

  const progress = clamp(
    Math.round(((temp - FLOOR) / (TARGET - FLOOR)) * 100),
    0,
    100,
  );
  const reached = temp >= TARGET;

  const nudge = (dir) => setTemp((t) => clamp(+(t + dir * STEP).toFixed(1), MIN, MAX));
  const toggleRow = (id) =>
    setSchedule((rows) =>
      rows.map((r) => (r.id === id ? { ...r, on: !r.on } : r)),
    );

  return (
    <section className={cx("ds-thermo", className)} aria-label="Climate control" {...rest}>
      {/* Status chrome — decorative device frame */}
      <div className="ds-thermo__chrome" aria-hidden="true">
        <span className="ds-thermo__time">14:41</span>
        <span className="ds-thermo__signal">
          <i /><i /><i /><i />
        </span>
      </div>

      {/* Header */}
      <header className="ds-thermo__head">
        <h2 className="ds-thermo__title">Aeonik Fono</h2>
        <button type="button" className="ds-thermo__menu" aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      {/* Climate setpoint */}
      <div className="ds-thermo__climate">
        <div className="ds-thermo__setpoint">
          <button
            type="button"
            className="ds-thermo__step"
            aria-label="Lower temperature"
            onClick={() => nudge(-1)}
          >
            −
          </button>
          <span className="ds-thermo__temp">
            {temp.toFixed(1)}
            <span className="ds-thermo__temp-unit">°C</span>
          </span>
          <button
            type="button"
            className="ds-thermo__step"
            aria-label="Raise temperature"
            onClick={() => nudge(1)}
          >
            +
          </button>
        </div>

        <p className="ds-thermo__climate-msg">
          {reached ? "At desired temperature" : "Heating up to desired temperature…"}
        </p>

        <ProgressRing
          className="ds-thermo__ring"
          value={progress}
          size={52}
          stroke={3}
        />
      </div>

      {/* Paired metric cards */}
      <div className="ds-thermo__cards">
        {/* Radiators */}
        <article className="ds-thermo__card">
          <div className="ds-thermo__card-head">
            <span className="ds-thermo__card-title">Radiators</span>
            <button type="button" className="ds-thermo__card-action">Edit</button>
          </div>
          <div className="ds-thermo__card-body">
            <div className="ds-thermo__radiator" aria-hidden="true">
              <i /><i /><i /><i /><i /><i />
            </div>
            <div className="ds-thermo__readouts">
              <Stat size="sm" label="Water" value="67" unit="°C" />
              <Stat size="sm" label="Pressure" value="1.7" unit="bar" />
              <div className="ds-thermo__timer">
                <span className="ds-stat__label">Timer</span>
                <Toggle
                  size="sm"
                  checked={timerOn}
                  onChange={setTimerOn}
                  label="Radiator timer"
                />
              </div>
            </div>
          </div>
        </article>

        {/* Panels */}
        <article className="ds-thermo__card">
          <div className="ds-thermo__card-head">
            <span className="ds-thermo__card-title">Panels</span>
            <span className="ds-thermo__card-status">Active</span>
          </div>
          <div className="ds-thermo__card-body">
            <div className="ds-thermo__solar" aria-hidden="true">
              <div className="ds-thermo__solar-grid"><span /><span /><span /><span /></div>
              <div className="ds-thermo__solar-grid"><span /><span /><span /><span /></div>
              <div className="ds-thermo__solar-legend">
                <span>W 67%</span><span>E 72%</span>
              </div>
            </div>
            <div className="ds-thermo__readouts">
              <Stat size="sm" label="Capacity" value="320" unit="kWh" />
              <Stat size="sm" label="Weekly" value="+1.6" unit="%" />
              <Stat size="sm" label="Total yield" value="190" unit="kWh" />
            </div>
          </div>
        </article>
      </div>

      {/* Add divider */}
      <button type="button" className="ds-thermo__add">
        <span aria-hidden="true">+</span> ADD
      </button>

      {/* Schedule */}
      <ul className="ds-thermo__schedule">
        {schedule.map((row) => (
          <li
            key={row.id}
            className={cx(
              "ds-thermo__row",
              row.id === activeId && "ds-thermo__row--active",
            )}
          >
            <span className="ds-thermo__row-label">{row.label}</span>
            <span className="ds-thermo__row-temp">{row.temp}</span>
            <span className="ds-thermo__row-time">{row.time}</span>
            <Toggle
              size="sm"
              checked={row.on}
              onChange={() => toggleRow(row.id)}
              label={`${row.label} schedule`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
