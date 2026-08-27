import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CalcoBarra from "./CalcoBarra/CalcoBarra";
import CalcoBoton from "./CalcoBoton/CalcoBoton";
import CalcoCabecera from "./CalcoCabecera/CalcoCabecera";
import CalcoCarrete from "./CalcoCarrete/CalcoCarrete";
import CalcoChapa from "./CalcoChapa/CalcoChapa";
import CalcoContador from "./CalcoContador/CalcoContador";
import CalcoDock from "./CalcoDock/CalcoDock";
import CalcoGlobo from "./CalcoGlobo/CalcoGlobo";
import CalcoHoja from "./CalcoHoja/CalcoHoja";
import CalcoLienzo from "./CalcoLienzo/CalcoLienzo";
import type { CalcoTono } from "./CalcoLienzo/CalcoLienzo";
import CalcoLoseta from "./CalcoLoseta/CalcoLoseta";
import CalcoMarco from "./CalcoMarco/CalcoMarco";
import CalcoPegatina from "./CalcoPegatina/CalcoPegatina";
import CalcoSemaforo from "./CalcoSemaforo/CalcoSemaforo";
import CalcoTitular from "./CalcoTitular/CalcoTitular";
import CalcoVentana from "./CalcoVentana/CalcoVentana";

const meta: Meta = {
  title: "Families/Calco/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

const TONOS: CalcoTono[] = ["lima", "sol", "crema", "cielo", "rosa", "naranja", "coral"];

const fila = { display: "flex", gap: "var(--ds-space-md)", flexWrap: "wrap" as const, alignItems: "center" };

function Catalogo() {
  const [dock, setDock] = useState("a");
  const [hoja, setHoja] = useState(false);
  const [loseta, setLoseta] = useState("uno");

  return (
    <div className="calco-scope">
      <CalcoLienzo tono="lima" semitono chispas>
        <div style={{ display: "grid", gap: "var(--ds-space-2xl)", alignContent: "start", padding: "var(--ds-space-md) 0" }}>
          <CalcoTitular as="h1" size="hero" sobre="Familia · Calco" kana="貼" tono="sol" giro={-1.5}>
            Álbum de calcos
          </CalcoTitular>

          <CalcoCabecera
            marca={<CalcoChapa tono="tinta">AAROI·DEV</CalcoChapa>}
            titulo="cabecera"
            kana="経歴"
            derecha={<CalcoSemaforo estado="listo" label="La IA" texto="lista" size="sm" />}
          />

          {/* Pegatinas ------------------------------------------------------- */}
          <div style={fila}>
            <CalcoPegatina forma="estrella" tono="sol" giro={-8} size="lg">
              ¡OMG!
            </CalcoPegatina>
            <CalcoPegatina forma="circulo" tono="rosa" giro={6}>
              have a<br />good day
            </CalcoPegatina>
            <CalcoPegatina forma="pildora" tono="cielo" giro={-4}>
              let's go
            </CalcoPegatina>
            <CalcoPegatina forma="etiqueta" tono="lima" giro={3}>
              nuevo
            </CalcoPegatina>
            <CalcoPegatina forma="estrella" tono="coral" giro={10} as="button" size="sm" aria-label="Pulsable">
              ★
            </CalcoPegatina>
            <CalcoPegatina forma="pildora" tono="naranja" giro={-2} as="button">
              pulsable
            </CalcoPegatina>
          </div>

          {/* Chapas ---------------------------------------------------------- */}
          <div style={fila}>
            {TONOS.map((t) => (
              <CalcoChapa key={t} tono={t}>
                {t}
              </CalcoChapa>
            ))}
            <CalcoChapa tono="tinta">tinta</CalcoChapa>
            <CalcoChapa tono="lima" punto="viva">
              en producción
            </CalcoChapa>
            <CalcoChapa tono="crema" icono="✦" size="sm">
              chica
            </CalcoChapa>
          </div>

          {/* Botones --------------------------------------------------------- */}
          <div style={fila}>
            <CalcoBoton tono="tinta">Escríbeme</CalcoBoton>
            <CalcoBoton tono="sol" icono="▶">
              Abrir
            </CalcoBoton>
            <CalcoBoton tono="rosa">Rosa</CalcoBoton>
            <CalcoBoton variant="outline">Outline</CalcoBoton>
            <CalcoBoton variant="ghost">Ghost</CalcoBoton>
            <CalcoBoton size="sm" tono="cielo">
              sm
            </CalcoBoton>
            <CalcoBoton size="lg" tono="lima">
              lg
            </CalcoBoton>
            <CalcoBoton disabled>Apagado</CalcoBoton>
          </div>

          {/* Globos ---------------------------------------------------------- */}
          <div style={{ ...fila, alignItems: "start" }}>
            <CalcoGlobo cola="abajo-izq" giro={-2}>
              Ninguno de estos pasos es negociable de mi lado. Todos son verificables del tuyo.
            </CalcoGlobo>
            <CalcoGlobo cola="izq" tono="rosa" grito giro={3}>
              ¡OMG!
            </CalcoGlobo>
            <CalcoGlobo cola="arriba-der" tono="cielo">
              Un aviso con el rabo arriba.
            </CalcoGlobo>
            <CalcoGlobo cola="der" tono="lima" grito giro={-4}>
              +1
            </CalcoGlobo>
          </div>

          {/* Instrumentos ---------------------------------------------------- */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))", gap: "var(--ds-space-lg)" }}>
            <CalcoContador valor="146" etiqueta="gates de validación" tono="sol" giro={-1.5} />
            <CalcoContador valor="100" sufijo="%" etiqueta="despliegues firmados" tono="lima" delta="+1" giro={1} />
            <CalcoContador valor="4" etiqueta="proyectos en producción" tono="rosa" size="sm" />
            <CalcoContador valor="~5,5" sufijo="min" etiqueta="del push a producción" tono="cielo" size="lg" giro={-1} />
          </div>

          <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: "36rem" }}>
            <CalcoBarra value={8} max={12} label="Cargando el expediente" readout="08 / 12" animada />
            <CalcoBarra value={100} label="Despliegues firmados" readout="100 %" tono="sol" segmentos={10} />
            <CalcoBarra value={35} label="Cuota del día" readout="35 %" tono="coral" segmentos={20} />
          </div>

          <div style={fila}>
            <CalcoSemaforo estado="listo" label="La IA" texto="lista" />
            <CalcoSemaforo estado="espera" label="La cola" texto="en fila" />
            <CalcoSemaforo estado="dormido" label="La GPU" texto="dormida" />
            <CalcoSemaforo estado="listo" label="Vertical" vertical size="sm" />
          </div>

          {/* Losetas --------------------------------------------------------- */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))", gap: "var(--ds-space-md)", maxWidth: "48rem" }}>
            {(
              [
                ["uno", "expediente", "経歴", "quién opera", "rosa"],
                ["dos", "método", "方式", "cómo trabajo", "cielo"],
                ["tres", "equipo", "装備", "el stack", "sol"],
                ["cuatro", "canal", "通信", "por dónde", "naranja"],
              ] as const
            ).map(([id, titulo, kana, meta, tono], i) => (
              <CalcoLoseta
                key={id}
                titulo={titulo}
                kana={kana}
                meta={meta}
                tono={tono}
                indice={String(i + 1).padStart(2, "0")}
                activa={loseta === id}
                onClick={() => setLoseta(id)}
                turno={i}
                pegatina={i === 2 ? <CalcoChapa tono="crema" size="sm">6</CalcoChapa> : undefined}
              />
            ))}
            <CalcoLoseta titulo="apagada" kana="停" meta="no se abre" disabled />
          </div>

          {/* Ventanas, marcos y carrete -------------------------------------- */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "var(--ds-space-lg)", alignItems: "start" }}>
            <CalcoVentana titulo="ventana.exe" kana="窓" tono="rosa" onCerrar={() => undefined} reja>
              <p style={{ margin: 0 }}>
                La única pieza de la familia que scrollea, y por dentro. Barra de título con tres puntos, contorno
                de tinta y sombra dura.
              </p>
            </CalcoVentana>

            <CalcoVentana
              titulo="con acciones"
              tono="cielo"
              acciones={
                <CalcoChapa tono="lima" size="sm" punto="viva">
                  vivo
                </CalcoChapa>
              }
            >
              <CalcoBoton tono="tinta" ancho onClick={() => setHoja(true)}>
                Abrir una hoja
              </CalcoBoton>
            </CalcoVentana>

            <CalcoMarco pie="reel pendiente" tono="sol" giro={-2} />
            <CalcoMarco pie="cinta rosa" tono="rosa" giro={2} ratio="1" />
          </div>

          <CalcoCarrete label="Trayectoria" ancho="min(78vw, 17rem)">
            {(["rosa", "cielo", "sol", "naranja"] as const).map((t, i) => (
              <CalcoVentana key={t} titulo={`ficha 0${i + 1}`} tono={t}>
                <p style={{ margin: 0 }}>Una tarjeta del carrete. Se desliza de lado y se encaja sola.</p>
              </CalcoVentana>
            ))}
          </CalcoCarrete>

          {/* Dock ------------------------------------------------------------ */}
          <div style={{ maxWidth: "40rem" }}>
            <CalcoDock
              label="Dock de muestra"
              value={dock}
              onChange={setDock}
              items={[
                { id: "a", label: "expediente", icono: "≡", kana: "経歴" },
                { id: "b", label: "método", icono: "✦", kana: "方式" },
                { id: "c", label: "equipo", icono: "⚙", kana: "装備" },
                { id: "d", label: "canal", icono: "✉", kana: "通信" },
              ]}
              extra={
                <CalcoPegatina forma="estrella" tono="sol" as="button" size="sm" giro={-10} onClick={() => setHoja(true)}>
                  psst
                </CalcoPegatina>
              }
            />
          </div>
        </div>
      </CalcoLienzo>

      <CalcoHoja abierta={hoja} onCerrar={() => setHoja(false)} titulo="fuera de servicio" kana="趣味" tono="sol" id="hoja-demo">
        <p style={{ marginTop: 0 }}>
          Esta parte no vende nada. Sube desde el borde de abajo, atrapa el foco y se cierra con Escape, con la X o
          pulsando el telón.
        </p>
        <CalcoBoton tono="tinta" ancho onClick={() => setHoja(false)}>
          Cerrar
        </CalcoBoton>
      </CalcoHoja>
    </div>
  );
}

export const Overview: StoryObj = {
  render: () => <Catalogo />,
};
