import { useEffect, useState } from "react";
import BalizaAviso from "../BalizaAviso/BalizaAviso";
import BalizaBoton from "../BalizaBoton/BalizaBoton";
import BalizaBotonSOS from "../BalizaBotonSOS/BalizaBotonSOS";
import BalizaCampo from "../BalizaCampo/BalizaCampo";
import BalizaCodigo from "../BalizaCodigo/BalizaCodigo";
import BalizaDato from "../BalizaDato/BalizaDato";
import BalizaDialogo from "../BalizaDialogo/BalizaDialogo";
import BalizaInsignia from "../BalizaInsignia/BalizaInsignia";
import BalizaLineaTiempo from "../BalizaLineaTiempo/BalizaLineaTiempo";
import BalizaNavInferior from "../BalizaNavInferior/BalizaNavInferior";
import BalizaVital from "../BalizaVital/BalizaVital";
import BalizaViaje from "../BalizaViaje/BalizaViaje";
import {
  IconoCamion, IconoCheck, IconoEscudo, IconoFicha, IconoInicio, IconoQr, IconoRuta, IconoSinSenal, IconoTelefono, IconoUbicacion,
} from "../iconos";
import Telefono from "./Telefono";
import { CONTACTOS, TRABAJADORES } from "./datos";
import "./demo.scss";

const t = TRABAJADORES[0]!;
const nombrePila = t.nombre.split(" ")[0];

export type Seccion = "inicio" | "viaje" | "ficha";
export type EstadoViaje = "ninguno" | "enCurso" | "porVencer" | "vencido";

function Nav({ activa, onCambio, avisoViaje }: { activa: Seccion; onCambio: (s: Seccion) => void; avisoViaje?: boolean }) {
  return (
    <BalizaNavInferior
      activo={activa}
      onCambio={(id) => onCambio(id as Seccion)}
      destinos={[
        { id: "inicio", nombre: "Inicio", icono: <IconoInicio /> },
        { id: "viaje", nombre: "Mi viaje", icono: <IconoRuta />, aviso: avisoViaje },
        { id: "ficha", nombre: "Mi ficha", icono: <IconoFicha /> },
      ]}
    />
  );
}

function Saludo({ sub }: { sub: string }) {
  return (
    <header className="demo-app__saludo">
      <div>
        <p className="demo-app__hola">Hola, {nombrePila}</p>
        <p className="demo-ficha__tenue">{sub}</p>
      </div>
      <BalizaInsignia estado="activa">Tarjeta activa</BalizaInsignia>
    </header>
  );
}

// ── Pantallas sueltas (cada una es también una historia) ────────────────

/** Primera vez: vincular este teléfono con la base. Sin contraseña que olvidar. */
export function PantallaEnrolar({ onListo }: { onListo?: () => void }) {
  const [codigo, setCodigo] = useState("");
  return (
    <div className="demo-app__pagina demo-app__pagina--centro">
      <div className="demo-app__marca"><IconoEscudo tamano={36} /></div>
      <h1 className="demo-app__titulo">Vincula tu teléfono</h1>
      <p className="demo-ficha__tenue demo-app__bajada">
        Una sola vez. Tu jefe de base te muestra un código QR en el panel, o te dicta los 6 números.
      </p>
      <BalizaBoton tono="accion" tamano="grande" bloque icono={<IconoQr />}>Escanear código de la base</BalizaBoton>
      <div className="demo-app__o"><span>o escríbelo</span></div>
      <BalizaCodigo etiqueta="Código de vinculación" valor={codigo} onCambio={setCodigo} ayuda="Vence a los 10 minutos de generado." />
      <BalizaBoton tono="suave" bloque disabled={codigo.length < 6} onClick={onListo}>Vincular</BalizaBoton>
      <p className="demo-ficha__tenue demo-app__letra-chica">
        Este teléfono quedará asociado a tu tarjeta {t.id}. Si lo cambias, pide un código nuevo.
      </p>
    </div>
  );
}

export interface PantallaInicioProps {
  sos?: "listo" | "enviando" | "enviado";
  viaje?: EstadoViaje;
  sinSenal?: boolean;
  onSOS?: () => void;
  onIrViaje?: () => void;
}

/** Inicio: el SOS al centro, al alcance del pulgar. Nada más compite con él. */
export function PantallaInicio({ sos = "listo", viaje = "ninguno", sinSenal = false, onSOS, onIrViaje }: PantallaInicioProps) {
  return (
    <div className="demo-app__pagina">
      <Saludo sub={`Base ${t.base} · Camión ${t.camion}`} />
      {sinSenal && (
        <BalizaAviso tono="cuidado" icono={<IconoSinSenal />} titulo="Sin señal" vivo>
          Tu viaje sigue vigilado: si no confirmas la llegada, la base recibe el aviso igual.
        </BalizaAviso>
      )}
      <div className="demo-app__sos">
        <BalizaBotonSOS estado={sos} onActivar={() => onSOS?.()} />
      </div>
      {viaje === "ninguno" ? (
        <button type="button" className="demo-app__tarjeta" onClick={onIrViaje}>
          <IconoRuta tamano={24} />
          <span>
            <b>¿Sales a ruta?</b>
            <span className="demo-ficha__tenue">Inicia un viaje y avisamos a tu base si no llegas a la hora.</span>
          </span>
        </button>
      ) : (
        <button type="button" className="demo-app__tarjeta" onClick={onIrViaje}>
          <IconoCamion tamano={24} />
          <span>
            <b>En viaje a Planta Lo Espejo</b>
            <span className="demo-ficha__tenue">Llegada 14:00 · {viaje === "porVencer" ? "quedan 12 min" : "quedan 29 min"}</span>
          </span>
        </button>
      )}
    </div>
  );
}

/** Después del SOS: qué pasó, quién lo tiene y qué hacer mientras tanto. */
export function PantallaAyudaEnCamino({ onError }: { onError?: () => void }) {
  const [confirmar, setConfirmar] = useState(false);
  return (
    <div className="demo-app__pagina">
      <div className="demo-app__ayuda">
        <span className="demo-app__ayuda-icono"><IconoCheck tamano={34} /></span>
        <h1 className="demo-app__titulo">Ayuda en camino</h1>
        <p className="demo-ficha__tenue">Tu base recibió la alerta. No cierres la app.</p>
      </div>
      <BalizaLineaTiempo
        etiqueta="Estado de tu alerta"
        hitos={[
          { id: "1", hora: "13:31:06", texto: "Alerta enviada", tipo: "sos" },
          { id: "2", hora: "13:31:07", texto: "Ubicación compartida (±12 m)", tipo: "clave" },
          { id: "3", hora: "13:31:13", texto: "Marcelo Ibarra tomó tu caso", quien: "Jefe de base · Puente Alto", tipo: "cierre" },
        ]}
      />
      <div className="demo-app__acciones">
        <a className="baliza-boton baliza-boton--sos baliza-boton--grande baliza-boton--bloque" href="tel:131">
          <IconoTelefono /> Llamar al 131 · SAMU
        </a>
        <a className="baliza-boton baliza-boton--suave baliza-boton--bloque" href={`tel:${CONTACTOS.jefe.telefono}`}>
          <IconoTelefono /> Llamar a {CONTACTOS.jefe.nombre}
        </a>
        <BalizaBoton tono="fantasma" bloque onClick={() => setConfirmar(true)}>Fue un error, estoy bien</BalizaBoton>
      </div>
      <BalizaDialogo
        abierto={confirmar}
        onCerrar={() => setConfirmar(false)}
        titulo="¿Cancelar la alerta?"
        sub="La base verá que la cancelaste tú. Igual puede llamarte para confirmar."
        acciones={
          <>
            <BalizaBoton tono="fantasma" onClick={() => setConfirmar(false)}>No, mantener</BalizaBoton>
            <BalizaBoton tono="accion" onClick={() => { setConfirmar(false); onError?.(); }}>Sí, estoy bien</BalizaBoton>
          </>
        }
      >
        <p className="demo-ficha__tenue">Cancelar no borra la alerta: queda en el historial como «cancelada por el trabajador».</p>
      </BalizaDialogo>
    </div>
  );
}

/** Nuevo viaje: tres datos y listo. Origen ya viene puesto. */
export function PantallaNuevoViaje({ onIniciar }: { onIniciar?: () => void }) {
  return (
    <div className="demo-app__pagina">
      <h1 className="demo-app__titulo">Nuevo viaje</h1>
      <BalizaCampo etiqueta="Desde" defaultValue={`Base ${t.base}`} />
      <BalizaCampo etiqueta="Hacia" placeholder="Ej: Planta Lo Espejo" defaultValue="Planta Lo Espejo" />
      <div className="demo-rejilla demo-rejilla--2">
        <BalizaCampo etiqueta="Llegada estimada" type="time" defaultValue="14:00" />
        <BalizaCampo etiqueta="Preguntar cada" defaultValue="1 hora" ayuda="«¿Todo bien?»" />
      </div>
      <BalizaAviso icono={<IconoEscudo />} titulo="Viaje vigilado">
        Si a las 14:00 no confirmas la llegada, avisamos a tu base con tu última ubicación. Funciona aunque te quedes sin señal.
      </BalizaAviso>
      <BalizaBoton tono="accion" tamano="grande" bloque onClick={onIniciar}>Iniciar viaje</BalizaBoton>
    </div>
  );
}

/** El viaje en curso: cuánto queda, "llegué" a un toque. */
export function PantallaViaje({ estado = "enCurso", onLlegue, onSOS }: { estado?: Exclude<EstadoViaje, "ninguno">; onLlegue?: () => void; onSOS?: () => void }) {
  const datos = {
    enCurso: { resta: "29 min", avance: 0.68 },
    porVencer: { resta: "12 min", avance: 0.87 },
    vencido: { resta: "−18 min", avance: 1 },
  }[estado];
  return (
    <div className="demo-app__pagina">
      <h1 className="demo-app__titulo">Mi viaje</h1>
      {estado === "vencido" && (
        <BalizaAviso tono="grave" icono={<IconoTelefono />} titulo="Tu base fue avisada" vivo>
          No confirmaste la llegada a las 14:00. Si estás bien, confírmalo para que no te busquen.
        </BalizaAviso>
      )}
      <BalizaViaje
        origen={`Base ${t.base}`}
        destino="Planta Lo Espejo"
        llegada="14:00"
        resta={datos.resta}
        avance={datos.avance}
        estado={estado}
        acciones={
          <>
            <BalizaBoton tono="accion" onClick={onLlegue}>{estado === "vencido" ? "Estoy bien, llegué" : "Llegué"}</BalizaBoton>
            <BalizaBoton>+30 min</BalizaBoton>
          </>
        }
      />
      <BalizaDato rotulo="Última ubicación enviada">
        <span className="demo-app__linea"><IconoUbicacion tamano={16} /> Av. Lo Espejo 1200 · hace 4 min</span>
      </BalizaDato>
      <BalizaBoton tono="peligro" bloque onClick={onSOS}>Tengo un problema · ir al SOS</BalizaBoton>
    </div>
  );
}

/** "¿Todo bien?": la pregunta periódica del viaje. Dos respuestas, ambas enormes. */
export function PantallaTodoBien({ onBien, onAyuda }: { onBien?: () => void; onAyuda?: () => void }) {
  const [quedan, setQuedan] = useState(272);
  useEffect(() => {
    const id = setInterval(() => setQuedan((q) => Math.max(0, q - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const mmss = `${Math.floor(quedan / 60)}:${String(quedan % 60).padStart(2, "0")}`;
  return (
    <div className="demo-app__pagina demo-app__pagina--centro demo-app__pregunta" role="alertdialog" aria-labelledby="todo-bien-t" aria-describedby="todo-bien-d">
      <h1 id="todo-bien-t" className="demo-app__pregunta-titulo">¿Todo bien, {nombrePila}?</h1>
      <p id="todo-bien-d" className="demo-ficha__tenue">
        Si no respondes en <b className="demo-app__cuenta">{mmss}</b>, avisaremos a tu base con tu ubicación.
      </p>
      <BalizaBoton tono="accion" tamano="grande" bloque onClick={onBien}>Estoy bien</BalizaBoton>
      <BalizaBoton tono="sos" tamano="grande" bloque onClick={onAyuda}>Necesito ayuda</BalizaBoton>
    </div>
  );
}

/** Mi ficha: lo que ve quien escanea mi tarjeta, y el control sobre eso. */
export function PantallaMiFicha() {
  const [bloquear, setBloquear] = useState(false);
  return (
    <div className="demo-app__pagina">
      <h1 className="demo-app__titulo">Mi ficha</h1>
      <p className="demo-ficha__tenue">Así te ve quien escanea tu tarjeta en una emergencia.</p>
      <BalizaVital sangre={t.sangre} alergias={t.alergias} peso={t.peso} />
      <BalizaDato rotulo="Bajo llave (solo personal de salud)">
        {t.condiciones} · {t.medicamentos}
      </BalizaDato>
      <div className="demo-ficha__contactos">
        <BalizaDato rotulo="Jefe de base">{CONTACTOS.jefe.nombre}</BalizaDato>
        <BalizaDato rotulo="Prevencionista">{CONTACTOS.prevencion.nombre}</BalizaDato>
      </div>
      <BalizaAviso tono="bien" icono={<IconoCheck />} titulo="Consentimiento firmado el 1/09/2026">
        Cada vez que alguien abre tus datos médicos queda registrado, y puedes verlo aquí.
      </BalizaAviso>
      <BalizaBoton bloque>¿Algo está mal? Pedir corrección</BalizaBoton>
      <BalizaBoton tono="peligro" bloque onClick={() => setBloquear(true)}>Perdí mi tarjeta · bloquearla</BalizaBoton>
      <BalizaDialogo
        abierto={bloquear}
        onCerrar={() => setBloquear(false)}
        titulo="¿Bloquear tu tarjeta?"
        sub="Quien la escanee verá «tarjeta bloqueada» y ningún dato tuyo."
        acciones={
          <>
            <BalizaBoton tono="fantasma" onClick={() => setBloquear(false)}>Cancelar</BalizaBoton>
            <BalizaBoton tono="peligro" onClick={() => setBloquear(false)}>Bloquear</BalizaBoton>
          </>
        }
      >
        <p className="demo-ficha__tenue">Tu base recibe el aviso para imprimirte una nueva. Mientras tanto, el SOS de esta app sigue funcionando.</p>
      </BalizaDialogo>
    </div>
  );
}

// ── El flujo completo, navegable ───────────────────────────────────────

/** La app entera: navega, mantén el SOS, inicia y cierra un viaje. */
export default function AppTrabajador({ inicial = "inicio" }: { inicial?: Seccion }) {
  const [seccion, setSeccion] = useState<Seccion>(inicial);
  const [sos, setSos] = useState<"listo" | "enviando" | "enviado">("listo");
  const [viaje, setViaje] = useState<EstadoViaje>("ninguno");

  useEffect(() => {
    if (sos !== "enviando") return;
    const id = setTimeout(() => setSos("enviado"), 1500);
    return () => clearTimeout(id);
  }, [sos]);

  let pantalla;
  if (sos === "enviado") pantalla = <PantallaAyudaEnCamino onError={() => setSos("listo")} />;
  else if (seccion === "inicio") pantalla = <PantallaInicio sos={sos} viaje={viaje} onSOS={() => setSos("enviando")} onIrViaje={() => setSeccion("viaje")} />;
  else if (seccion === "viaje")
    pantalla = viaje === "ninguno"
      ? <PantallaNuevoViaje onIniciar={() => setViaje("enCurso")} />
      : <PantallaViaje estado={viaje} onLlegue={() => { setViaje("ninguno"); setSeccion("inicio"); }} onSOS={() => setSeccion("inicio")} />;
  else pantalla = <PantallaMiFicha />;

  return (
    <Telefono pie={sos === "enviado" ? undefined : <Nav activa={seccion} onCambio={setSeccion} avisoViaje={viaje !== "ninguno"} />}>
      {pantalla}
    </Telefono>
  );
}

export { Nav as NavApp };
