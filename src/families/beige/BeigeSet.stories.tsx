import type { Meta, StoryObj } from "@storybook/react-vite";
import BeigeBarraTareas from "./BeigeBarraTareas/BeigeBarraTareas";
import BeigeBoton from "./BeigeBoton/BeigeBoton";
import BeigeCampo from "./BeigeCampo/BeigeCampo";
import BeigeClip from "./BeigeClip/BeigeClip";
import BeigeDialogo from "./BeigeDialogo/BeigeDialogo";
import BeigeEscritorio from "./BeigeEscritorio/BeigeEscritorio";
import BeigeIcono from "./BeigeIcono/BeigeIcono";
import BeigeNota from "./BeigeNota/BeigeNota";
import BeigePicto, { type BeigePictoName } from "./BeigePicto/BeigePicto";
import BeigeProgreso from "./BeigeProgreso/BeigeProgreso";
import BeigeVentana from "./BeigeVentana/BeigeVentana";

const meta: Meta = {
  title: "Families/Beige/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

// Contenido de muestra deliberadamente parecido al destino real: el
// laboratorio de demos de IA. Un título de programa largo o una
// transcripción ancha rompen aquí, no en producción.
const Pantalla = ({ children }: { children: React.ReactNode }) => (
  <div className="beige-scope" style={{ minHeight: "100vh" }}>
    <BeigeEscritorio>
      <div style={{ padding: "24px", display: "grid", gap: "24px", paddingBottom: "70px" }}>
        {children}
      </div>
      <BeigeBarraTareas
        fija
        inicioPicto="bandera"
        tareas={[
          { label: "voz.exe", picto: "altavoz", activa: true },
          { label: "traduce.exe", picto: "mundo" },
        ]}
        reloj="16:20"
      />
    </BeigeEscritorio>
  </div>
);

/** La vista que resume la familia: escritorio, ventana, consola y el clip. */
export const Overview: StoryObj = {
  render: () => (
    <Pantalla>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <BeigeIcono picto="altavoz" label="voz.exe" href="#" />
        <BeigeIcono picto="micro" label="oido.exe" href="#" />
        <BeigeIcono picto="mundo" label="traduce.exe" href="#" />
        <BeigeIcono picto="camara" label="vision.exe" href="#" />
        <BeigeIcono picto="nota" label="LEEME.TXT" href="#" />
      </div>

      <div style={{ display: "grid", gap: "22px", gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))", alignItems: "start" }}>
        <BeigeVentana
          title="voz.exe — Texto a voz"
          picto="altavoz"
          cerrable
          minimizable
          menu={["Archivo", "Voz", "Ayuda"]}
          estado={["Listo", "es-CL", "22 kHz"]}
        >
          <div style={{ display: "grid", gap: "10px" }}>
            <BeigeCampo label="Entrada:">«El multiverso carga en 4.2 segundos.»</BeigeCampo>
            <BeigeProgreso value={62} label="Sintetizando voz" />
            <div style={{ display: "flex", gap: "8px" }}>
              <BeigeBoton principal>Reproducir</BeigeBoton>
              <BeigeBoton>Guardar .wav</BeigeBoton>
            </div>
          </div>
        </BeigeVentana>

        <BeigeVentana
          title="oido.exe — Transcripción"
          picto="micro"
          inactiva
          estado={["mic_01", "en vivo"]}
        >
          <BeigeCampo terminal label="Transcript:">
            C:\LAB&gt; escuchando…
            <br />
            …y esto que lees es la transcripción.█
          </BeigeCampo>
        </BeigeVentana>
      </div>

      <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", alignItems: "end" }}>
        <BeigeDialogo title="Sistema" tone="advertencia" acciones={["Aceptar", "Cancelar"]}>
          <p>La GPU se enciende por un acto humano, nunca por una visita.</p>
        </BeigeDialogo>
        <BeigeClip>
          <p>
            ¿Parece que estás contratando un fullstack? <a href="#">Puedo ayudarte con eso.</a>
          </p>
        </BeigeClip>
      </div>
    </Pantalla>
  ),
};

/** Ventanas: activa, inactiva, con pozo, y el cuadro de mensaje en 3 tonos. */
export const Ventanas: StoryObj = {
  render: () => (
    <Pantalla>
      <div style={{ display: "grid", gap: "22px", gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))", alignItems: "start" }}>
        <BeigeVentana title="Activa" picto="carpeta" menu={["Archivo", "Edición", "Ver"]}>
          <p style={{ margin: 0 }}>El cuerpo plata por defecto.</p>
        </BeigeVentana>
        <BeigeVentana title="Inactiva — sin el foco" inactiva>
          <p style={{ margin: 0 }}>La barra gris de la ventana de atrás.</p>
        </BeigeVentana>
        <BeigeVentana title="Documento" picto="nota" pozo estado={["12 líneas"]}>
          <p style={{ margin: 0 }}>El pozo blanco: listas y documentos.</p>
        </BeigeVentana>
      </div>
      <div style={{ display: "flex", gap: "22px", flexWrap: "wrap" }}>
        <BeigeDialogo title="Información" tone="info">
          <p>Operación completada.</p>
        </BeigeDialogo>
        <BeigeDialogo title="Sistema" tone="advertencia" acciones={["Aceptar", "Detalles >>"]}>
          <p>Quedan 4 demos por visitar.</p>
        </BeigeDialogo>
        <BeigeDialogo title="Error" tone="error" acciones={["Aceptar", "Reintentar"]}>
          <p>El siglo XXI no responde. ¿Desea continuar esperando?</p>
        </BeigeDialogo>
      </div>
    </Pantalla>
  ),
};

/** La lámina completa de pictogramas propios. */
export const Pictos: StoryObj = {
  render: () => (
    <Pantalla>
      <BeigeVentana title="lamina.exe — 14 pictogramas" picto="carpeta" pozo>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          {(
            [
              "bandera",
              "pc",
              "carpeta",
              "chip",
              "altavoz",
              "micro",
              "camara",
              "mundo",
              "nota",
              "consola",
              "engranaje",
              "info",
              "advertencia",
              "error",
            ] as BeigePictoName[]
          ).map((name) => (
            <span key={name} style={{ display: "grid", justifyItems: "center", gap: "6px", fontSize: "15px" }}>
              <BeigePicto name={name} size={48} />
              {name}
            </span>
          ))}
        </div>
      </BeigeVentana>
    </Pantalla>
  ),
};

/** El monitor solo: la misma pantalla con y sin tubo, para calibrarlo. */
export const Tubo: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
      <Pantalla>
        <BeigeNota titulo="BeigeCrt">
          <p>
            Esta historia lleva el tubo encima: líneas de barrido, máscara RGB, viñeta,
            parpadeo y la banda que rueda. Con reduced-motion queda solo la textura.
          </p>
        </BeigeNota>
        <BeigeProgreso infinito label="Copiando SIGLO20.ZIP" />
      </Pantalla>
    </div>
  ),
};
