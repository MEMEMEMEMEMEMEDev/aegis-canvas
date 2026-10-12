import { useState } from "react";
import BalizaAvatar from "../BalizaAvatar/BalizaAvatar";
import BalizaAviso from "../BalizaAviso/BalizaAviso";
import BalizaBoton from "../BalizaBoton/BalizaBoton";
import BalizaCodigo from "../BalizaCodigo/BalizaCodigo";
import BalizaContacto from "../BalizaContacto/BalizaContacto";
import BalizaDato from "../BalizaDato/BalizaDato";
import BalizaInsignia from "../BalizaInsignia/BalizaInsignia";
import BalizaReservado from "../BalizaReservado/BalizaReservado";
import BalizaVital from "../BalizaVital/BalizaVital";
import { IconoCandado, IconoCheck, IconoTelefono, IconoUbicacion } from "../iconos";
import { CONTACTOS, type Trabajador } from "./datos";
import "./demo.scss";

export type PasoFicha = "publica" | "llave" | "liberada";

export interface FichaEmergenciaProps {
  t: Trabajador;
  /** `publica` (SOS), `llave` (pidiendo el código), `liberada` (SOS2). */
  paso?: PasoFicha;
  /** Qué pasó con el GPS al escanear. */
  ubicacion?: "enviada" | "denegada";
  /** Quien escaneó dijo "no es una emergencia". */
  descartada?: boolean;
  onPaso?: (p: PasoFicha) => void;
  onDescartar?: () => void;
}

const Llamar131 = () => (
  <a className="baliza-boton baliza-boton--sos baliza-boton--grande baliza-boton--bloque" href="tel:131">
    <IconoTelefono /> Llamar al 131 · SAMU
  </a>
);

/**
 * Lo que ve quien escanea el QR (frames SOS y SOS2 del Figma, con mejoras).
 * Web móvil, sin instalar nada. Orden de la pantalla = orden de lo que
 * necesita quien llega: pedir ayuda, saber quién es, lo vital, la base.
 */
export default function FichaEmergencia({ t, paso = "publica", ubicacion = "enviada", descartada = false, onPaso, onDescartar }: FichaEmergenciaProps) {
  const [codigo, setCodigo] = useState("");
  return (
    <div className="baliza-scope demo-movil">
      <header className="demo-ficha__cabeza">
        <p>{descartada ? "Escaneo registrado · no es emergencia" : "Emergencia · la base fue avisada"}</p>
        <h1>Perfil SOS del trabajador</h1>
      </header>
      <main className="demo-ficha__cuerpo">
        {!descartada && <Llamar131 />}

        {ubicacion === "enviada" ? (
          <BalizaAviso tono="bien" icono={<IconoCheck />} titulo="Ubicación enviada a la base" vivo>
            Solo en este momento. No hay rastreo continuo.
          </BalizaAviso>
        ) : (
          <BalizaAviso tono="cuidado" icono={<IconoUbicacion />} titulo="No pudimos obtener tu ubicación" vivo>
            Cuando llames a la base, diles dónde están.
          </BalizaAviso>
        )}

        <div className="demo-ficha__quien">
          <BalizaAvatar nombre={t.nombre} forma="ficha" tamano="grande" />
          <div>
            <p className="demo-ficha__nombre">{t.nombre}</p>
            <p>{t.cargo} · {t.empresa}</p>
            <BalizaInsignia estado="activa">Cobertura ACHS vigente</BalizaInsignia>
          </div>
        </div>

        <BalizaVital sangre={t.sangre} alergias={t.alergias} peso={t.peso} />

        {paso === "liberada" && (
          <>
            <BalizaAviso icono={<IconoCandado />} titulo="Datos liberados por la base" vivo>
              Para este caso, por 30 minutos. El acceso quedó registrado.
            </BalizaAviso>
            <BalizaDato rotulo="Condiciones críticas">{t.condiciones}</BalizaDato>
            <BalizaDato rotulo="Medicamentos relevantes">{t.medicamentos}</BalizaDato>
            <BalizaDato rotulo="Indicaciones para el rescatista">{t.indicaciones}</BalizaDato>
          </>
        )}

        {paso === "publica" && (
          <BalizaReservado
            accion={
              <BalizaBoton tono="suave" tamano="chico" forma="pastilla" onClick={() => onPaso?.("llave")}>
                Soy personal de salud – verificar →
              </BalizaBoton>
            }
          >
            Condiciones, medicamentos e indicaciones solo para personal autorizado.
          </BalizaReservado>
        )}

        {paso === "llave" && (
          <BalizaReservado titulo="Pide el código a la base">
            <ol className="demo-pasos">
              <li>Llama a la base y di quién eres y dónde trabajas.</li>
              <li>Te dictarán un código de 6 números.</li>
            </ol>
            <div className="demo-pasos__accion">
              <BalizaContacto {...CONTACTOS.jefe} tamano="chico" />
            </div>
            <BalizaCodigo etiqueta="Código de la base" valor={codigo} onCambio={setCodigo} ayuda="Sirve una vez, para este caso." />
            <div className="demo-pasos__botones">
              <BalizaBoton tono="fantasma" tamano="chico" onClick={() => onPaso?.("publica")}>Volver</BalizaBoton>
              <BalizaBoton tono="accion" tamano="chico" disabled={codigo.length < 6} onClick={() => onPaso?.("liberada")}>Ver datos médicos</BalizaBoton>
            </div>
          </BalizaReservado>
        )}

        <div className="demo-ficha__contactos">
          <BalizaContacto {...CONTACTOS.jefe} />
          <BalizaContacto {...CONTACTOS.prevencion} />
        </div>

        <BalizaDato rotulo="Vehículo y base">
          <p className="demo-ficha__vehiculo">Camión {t.camion} · Patente <b>{t.patente}</b></p>
          <p className="demo-ficha__tenue">Base {t.base}</p>
        </BalizaDato>

        {!descartada && (
          <BalizaBoton tono="fantasma" bloque onClick={onDescartar}>
            No es una emergencia, solo estaba mirando
          </BalizaBoton>
        )}
      </main>
    </div>
  );
}

/** La ficha con su pequeño flujo: verificar → código → datos liberados. */
export function FichaInteractiva({ t, ubicacion }: { t: Trabajador; ubicacion?: "enviada" | "denegada" }) {
  const [paso, setPaso] = useState<PasoFicha>("publica");
  const [descartada, setDescartada] = useState(false);
  return <FichaEmergencia t={t} paso={paso} onPaso={setPaso} ubicacion={ubicacion} descartada={descartada} onDescartar={() => setDescartada(true)} />;
}

/** Tarjeta bloqueada (perdida o dada de baja): ningún dato, sólo cómo pedir ayuda. */
export function FichaBloqueada() {
  return (
    <div className="baliza-scope demo-movil">
      <header className="demo-ficha__cabeza demo-ficha__cabeza--neutra">
        <p>Tarjeta SOS</p>
        <h1>Esta tarjeta está bloqueada</h1>
      </header>
      <main className="demo-ficha__cuerpo">
        <p className="demo-ficha__tenue">
          Fue reportada como perdida o ya no está en uso, así que no mostramos datos de nadie.
        </p>
        <p><b>Si encontraste a una persona herida, llama ahora:</b></p>
        <Llamar131 />
        <a className="baliza-boton baliza-boton--suave baliza-boton--bloque" href="tel:133">
          <IconoTelefono /> Carabineros · 133
        </a>
      </main>
    </div>
  );
}
