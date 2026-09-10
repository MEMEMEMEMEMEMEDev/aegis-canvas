import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import AtalayaBarra from "./AtalayaBarra/AtalayaBarra";
import AtalayaBoton from "./AtalayaBoton/AtalayaBoton";
import AtalayaCampo from "./AtalayaCampo/AtalayaCampo";
import AtalayaChispa from "./AtalayaChispa/AtalayaChispa";
import AtalayaEstado from "./AtalayaEstado/AtalayaEstado";
import AtalayaFila from "./AtalayaFila/AtalayaFila";
import AtalayaMetrica from "./AtalayaMetrica/AtalayaMetrica";
import AtalayaPanel from "./AtalayaPanel/AtalayaPanel";
import AtalayaPestanas from "./AtalayaPestanas/AtalayaPestanas";
import AtalayaVacio from "./AtalayaVacio/AtalayaVacio";

const meta: Meta = {
  title: "Families/Atalaya/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

// Contenido de muestra deliberadamente parecido al destino real: la consola
// de aegis. Nombres de organización inventados, cifras con la forma de las
// que salen de vmsingle. Un dominio largo o una explicación de tres líneas
// rompen acá, no en producción.
const Hoja = ({ children, oscuro }: { children: React.ReactNode; oscuro?: boolean }) => (
  <div
    className={oscuro ? "atalaya-scope atalaya-scope--oscuro" : "atalaya-scope"}
    style={{ minHeight: "100vh", padding: "24px" }}
  >
    <div style={{ maxWidth: "980px", margin: "0 auto", display: "grid", gap: "16px" }}>
      {children}
    </div>
  </div>
);

const SERIE = [12, 18, 15, 22, 28, 24, 31, 29, 35, 33, 41, 38];

function Catalogo() {
  const [pestana, setPestana] = useState("resumen");
  const [nombre, setNombre] = useState("panaderia-luz");
  const malNombre = !/^[a-z][a-z0-9-]{2,29}$/.test(nombre);

  return (
    <>
      <AtalayaPanel
        titulo="Los cuatro estados"
        sub="La razón de ser de la familia: el cuarto no tiene color, tiene trama"
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px" }}>
          <AtalayaEstado estado="bien">hecho, o ya estaba así</AtalayaEstado>
          <AtalayaEstado estado="mal">mal, o falta</AtalayaEstado>
          <AtalayaEstado estado="sinver">no pude mirar</AtalayaEstado>
          <AtalayaEstado estado="aviso">vale saberlo</AtalayaEstado>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
          <AtalayaEstado estado="bien" forma="pastilla">activa</AtalayaEstado>
          <AtalayaEstado estado="mal" forma="pastilla">respaldo vencido</AtalayaEstado>
          <AtalayaEstado estado="sinver" forma="pastilla">sin medir</AtalayaEstado>
        </div>
      </AtalayaPanel>

      <AtalayaPanel
        titulo="Organizaciones"
        sub="3 en esta instancia"
        acciones={<AtalayaBoton tono="firme">Nueva organización</AtalayaBoton>}
        sinRelleno
      >
        <AtalayaFila
          marca={<AtalayaEstado estado="bien" />}
          titulo="panaderia-luz"
          sub="panaderia-luz.ejemplo.cl · mediana"
          fin="3.190 pet. · 24 h"
          onClick={() => undefined}
        />
        <AtalayaFila
          marca={<AtalayaEstado estado="mal" />}
          titulo="taller-mecha"
          sub="taller-mecha.ejemplo.cl · pequena"
          fin="232 pet. · 24 h"
          porque="Su base de datos no tiene respaldo desde hace 31 horas, y el límite son 24."
          onClick={() => undefined}
        />
        <AtalayaFila
          marca={<AtalayaEstado estado="sinver" />}
          titulo="club-remo"
          sub="club-remo.ejemplo.cl · pequena"
          fin="sin medir"
          porque="La sonda no llegó al borde en esta ronda. No es que esté bien: es una medida que falta."
          onClick={() => undefined}
        />
      </AtalayaPanel>

      <AtalayaPanel titulo="panaderia-luz" sub="panaderia-luz.ejemplo.cl" sinRelleno>
        <AtalayaPestanas
          etiqueta="Secciones de la organización"
          activa={pestana}
          onCambio={setPestana}
          pestanas={[
            { id: "resumen", nombre: "Resumen" },
            { id: "trafico", nombre: "Tráfico" },
            { id: "servicios", nombre: "Servicios", cuenta: 4 },
            { id: "respaldos", nombre: "Respaldos", alerta: "mal" },
            { id: "dominios", nombre: "Dominios", alerta: "sinver" },
          ]}
        />
        <div
          id={`panel-${pestana}`}
          role="tabpanel"
          aria-labelledby={`pestana-${pestana}`}
          style={{
            padding: "16px",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          }}
        >
          <AtalayaMetrica
            rotulo="Peticiones · 24 h"
            valor="3.190"
            delta={{ valor: "+12% vs ayer", sentido: "mejor" }}
            chispa={<AtalayaChispa datos={SERIE} etiqueta="peticiones por hora" />}
          />
          <AtalayaMetrica
            rotulo="Errores 5xx · 24 h"
            valor="7"
            delta={{ valor: "+7 vs ayer", sentido: "peor" }}
            chispa={<AtalayaChispa datos={[0, 0, 1, 0, 2, 0, 0, 3, 1, 0, 0, 0]} etiqueta="errores por hora" tono="mal" />}
          />
          <AtalayaMetrica rotulo="Latencia p95" valor="95" unidad="ms" />
          <AtalayaMetrica rotulo="Días de certificado" valor="—" sinMedir />
        </div>
        <div
          style={{
            padding: "0 16px 16px",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <AtalayaBarra rotulo="CPU del plan" usado={1.85} techo={4} formato={(v) => `${v} CPU`} />
          <AtalayaBarra rotulo="Memoria del plan" usado={5.4} techo={6} formato={(v) => `${v} GiB`} />
          <AtalayaBarra rotulo="Disco del plan" usado={62} techo={50} formato={(v) => `${v} GiB`} />
        </div>
      </AtalayaPanel>

      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <AtalayaPanel titulo="Nueva organización">
          <AtalayaCampo
            etiqueta="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sufijo=".ejemplo.cl"
            ayuda="Minúsculas, de 3 a 30 caracteres. No se puede cambiar después: otro nombre es otra organización."
            error={malNombre ? "Empieza con letra, después minúsculas, dígitos o guiones, 3 a 30 en total." : undefined}
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
            <AtalayaBoton tono="firme">Previsualizar cambios</AtalayaBoton>
            <AtalayaBoton>Cancelar</AtalayaBoton>
            <AtalayaBoton tono="peligro">Dar de baja</AtalayaBoton>
          </div>
        </AtalayaPanel>

        <AtalayaPanel titulo="Despliegues" sinRelleno>
          <AtalayaVacio motivo="sinver" titulo="No se pudo leer el historial">
            Jenkins no contestó en esta ronda. Esto no es «no hay despliegues»: es una lista que no se
            pudo mirar, y las dos cosas se ven igual en casi todos los tableros.
            <br />
          </AtalayaVacio>
        </AtalayaPanel>
      </div>
    </>
  );
}

export const Overview: StoryObj = {
  render: () => (
    <Hoja>
      <Catalogo />
    </Hoja>
  ),
};

export const Oscuro: StoryObj = {
  render: () => (
    <Hoja oscuro>
      <Catalogo />
    </Hoja>
  ),
};
