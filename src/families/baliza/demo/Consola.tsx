import { useState } from "react";
import BalizaAlerta from "../BalizaAlerta/BalizaAlerta";
import BalizaAvatar from "../BalizaAvatar/BalizaAvatar";
import BalizaAviso from "../BalizaAviso/BalizaAviso";
import BalizaBarra from "../BalizaBarra/BalizaBarra";
import BalizaBoton from "../BalizaBoton/BalizaBoton";
import BalizaCampo from "../BalizaCampo/BalizaCampo";
import BalizaContacto from "../BalizaContacto/BalizaContacto";
import BalizaDato from "../BalizaDato/BalizaDato";
import BalizaDialogo from "../BalizaDialogo/BalizaDialogo";
import BalizaFila from "../BalizaFila/BalizaFila";
import BalizaInsignia from "../BalizaInsignia/BalizaInsignia";
import BalizaLineaTiempo, { type BalizaHito } from "../BalizaLineaTiempo/BalizaLineaTiempo";
import BalizaPanel from "../BalizaPanel/BalizaPanel";
import BalizaVital from "../BalizaVital/BalizaVital";
import { IconoCandado, IconoConexion, IconoEscudo, IconoSinSenal, IconoTelefono } from "../iconos";
import { AlertaSOS } from "./PanelBase";
import { ACTIVACIONES, CONTACTOS, TRABAJADORES } from "./datos";
import "./demo.scss";

const t = TRABAJADORES[0]!;
const otro = TRABAJADORES[2]!;

export type EstadoConsola = "espera" | "alerta" | "caso" | "sinConexion" | "avisoLlegada";

function Conexion({ ok }: { ok: boolean }) {
  return ok ? (
    <BalizaInsignia estado="activa">Conectada · latido hace 2 s</BalizaInsignia>
  ) : (
    <BalizaInsignia estado="sinAtender">Sin conexión</BalizaInsignia>
  );
}

function Cascaron({ ok = true, children }: { ok?: boolean; children: React.ReactNode }) {
  return (
    <div className="baliza-scope demo-escritorio">
      <BalizaBarra
        sub="Consola de la base · Puente Alto"
        fin={
          <>
            <Conexion ok={ok} />
            <span className="demo-ficha__tenue">Turno: {CONTACTOS.jefe.nombre}</span>
            <span className="demo-demo">Datos ficticios · demo</span>
          </>
        }
      />
      <main className="demo-panel">{children}</main>
    </div>
  );
}

/** Lo que pasó hoy: el operador ve que la consola sí está viva. */
function Recientes() {
  return (
    <BalizaPanel titulo="Últimas 24 horas" nivel={2}>
      <div className="demo-lista">
        {ACTIVACIONES.map((a) => (
          <BalizaFila
            key={a.id}
            titulo={a.trabajador}
            sub={`${a.fecha} · ${a.origen} · ${a.base}`}
            fin={a.respuesta.atendida
              ? <BalizaInsignia estado="atendida">Atendida en {a.respuesta.en}</BalizaInsignia>
              : <BalizaInsignia estado="sinAtender">Sin atender</BalizaInsignia>}
          />
        ))}
      </div>
    </BalizaPanel>
  );
}

/** Sin alertas: tranquilo, pero demostrando que escucha. */
export function ConsolaEspera({ onSimular }: { onSimular?: () => void }) {
  return (
    <Cascaron>
      <div className="demo-dos demo-dos--consola">
        <section className="demo-calma" aria-labelledby="calma-t">
          <span className="demo-calma__icono"><IconoEscudo tamano={40} /></span>
          <h1 id="calma-t">Sin alertas activas</h1>
          <p className="demo-ficha__tenue">
            Esta consola está escuchando. Si llega un SOS, suena una alarma y la ventana pasa al frente aunque esté minimizada.
          </p>
          <div className="demo-calma__acciones">
            <BalizaBoton>Probar alarma</BalizaBoton>
            {onSimular && <BalizaBoton tono="fantasma" onClick={onSimular}>Simular un SOS (demo)</BalizaBoton>}
          </div>
          <BalizaAviso icono={<IconoConexion />} titulo="Al empezar el turno, prueba la alarma">
            Así sabes que el volumen y los parlantes de este computador funcionan.
          </BalizaAviso>
        </section>
        <Recientes />
      </div>
    </Cascaron>
  );
}

/** Entra un SOS: la alerta manda, todo lo demás baja. */
export function ConsolaAlerta({ onTomar }: { onTomar?: () => void }) {
  return (
    <Cascaron>
      <AlertaSOS t={t} onTomar={onTomar} />
      <BalizaAlerta tipo="aviso" titulo="Sin confirmar llegada" persona={otro.nombre} cuando="Debía llegar 14:00 a Planta Quilicura" hace="+18 min">
        <AvisoLlegadaCuerpo />
      </BalizaAlerta>
    </Cascaron>
  );
}

function AvisoLlegadaCuerpo() {
  return (
    <div className="demo-aviso-llegada">
      <p className="demo-ficha__tenue">
        Última ubicación: Av. Américo Vespucio 4400, hace 26 min. No respondió el «¿todo bien?» de las 13:45.
        Si nadie lo resuelve en 10 min, pasa a SOS.
      </p>
      <div className="demo-aviso-llegada__acciones">
        <BalizaBoton tono="suave" icono={<IconoTelefono />}>Llamar a {otro.nombre.split(" ")[0]}</BalizaBoton>
        <BalizaBoton>Está bien, cerrar aviso</BalizaBoton>
        <BalizaBoton tono="peligro">Escalar a SOS ahora</BalizaBoton>
      </div>
    </div>
  );
}

/** Sólo el aviso de llegada, sin SOS: el caso del trabajador solo. */
export function ConsolaAvisoLlegada() {
  return (
    <Cascaron>
      <BalizaAlerta tipo="aviso" titulo="Sin confirmar llegada" persona={otro.nombre} cuando="Debía llegar 14:00 a Planta Quilicura" hace="+18 min">
        <AvisoLlegadaCuerpo />
      </BalizaAlerta>
      <Recientes />
    </Cascaron>
  );
}

const HITOS: BalizaHito[] = [
  { id: "1", hora: "13:31:06", texto: "SOS por escaneo del QR", quien: "Desde un teléfono desconocido", tipo: "sos" },
  { id: "2", hora: "13:31:07", texto: "Ubicación recibida · ±12 m", tipo: "clave" },
  { id: "3", hora: "13:31:13", texto: "Caso tomado", quien: CONTACTOS.jefe.nombre, tipo: "clave" },
  { id: "4", hora: "13:32:40", texto: "Llamada al 131 (SAMU) registrada", quien: CONTACTOS.jefe.nombre },
];

/** El caso tomado: la ficha a la izquierda, la bitácora a la derecha. */
export function ConsolaCaso({ onCerrar }: { onCerrar?: () => void }) {
  const [hitos, setHitos] = useState(HITOS);
  const [nota, setNota] = useState("");
  const [liberar, setLiberar] = useState(false);
  const [paso, setPaso] = useState<"datos" | "codigo">("datos");
  const [cerrar, setCerrar] = useState(false);

  const agregar = (texto: string, tipo: BalizaHito["tipo"] = "nota") =>
    setHitos((h) => [...h, { id: String(h.length + 1), hora: "13:3" + (4 + h.length) + ":00", texto, quien: CONTACTOS.jefe.nombre, tipo }]);

  return (
    <Cascaron>
      <BalizaAlerta tipo="tomada" titulo="Caso en curso" persona={t.nombre} cuando={`Tomado por ${CONTACTOS.jefe.nombre}`} hace="hace 4:12">
        <div className="demo-caso">
          <div className="demo-caso__ficha">
            <div className="demo-alerta__quien">
              <BalizaAvatar nombre={t.nombre} forma="ficha" tamano="grande" />
              <div>
                <p className="demo-ficha__nombre">{t.nombre}</p>
                <p className="demo-ficha__tenue">{t.cargo} · Camión {t.camion} · {t.patente}</p>
              </div>
            </div>
            <BalizaVital sangre={t.sangre} alergias={t.alergias} peso={t.peso} tamano="compacta" />
            <BalizaDato rotulo="Ubicación al escanear">
              −33.6118, −70.5756 · ±12 m · <a className="demo-enlace" href="#mapa">Abrir en el mapa</a>
            </BalizaDato>
            <div className="demo-ficha__contactos">
              <BalizaContacto rol="Llamar al trabajador" nombre={t.nombre} telefono="+56900000010" tamano="chico" />
              <BalizaContacto rol="Llamar a quien escaneó" nombre="Teléfono del escaneo" telefono="+56900000011" tamano="chico" />
            </div>
            <BalizaBoton tono="suave" icono={<IconoCandado />} onClick={() => { setPaso("datos"); setLiberar(true); }}>
              Liberar ficha clínica a personal de salud
            </BalizaBoton>
          </div>
          <div className="demo-caso__bitacora">
            <h3 className="demo-caso__subtitulo">Bitácora del caso</h3>
            <BalizaLineaTiempo etiqueta="Bitácora del caso" hitos={hitos} />
            <form
              className="demo-caso__nota"
              onSubmit={(e) => { e.preventDefault(); if (nota.trim()) { agregar(nota.trim()); setNota(""); } }}
            >
              <BalizaCampo etiqueta="Agregar a la bitácora" placeholder="Ej: ambulancia en camino, 8 min" value={nota} onChange={(e) => setNota(e.target.value)} />
              <BalizaBoton type="submit" tono="hondo">Agregar</BalizaBoton>
            </form>
            <BalizaBoton tono="accion" bloque onClick={() => setCerrar(true)}>Cerrar caso</BalizaBoton>
          </div>
        </div>
      </BalizaAlerta>

      <BalizaDialogo
        abierto={liberar}
        onCerrar={() => setLiberar(false)}
        tono="sos"
        titulo={paso === "datos" ? "Liberar ficha clínica" : "Díctale este código"}
        sub={paso === "datos"
          ? "Sólo a personal de salud que esté con el trabajador. Queda registrado quién la pidió y quién la liberó."
          : "Quien está con el trabajador lo escribe en la ficha del QR. Sirve una vez, para este caso."}
        acciones={paso === "datos" ? (
          <>
            <BalizaBoton tono="fantasma" onClick={() => setLiberar(false)}>Cancelar</BalizaBoton>
            <BalizaBoton tono="accion" onClick={() => { setPaso("codigo"); agregar("Ficha clínica liberada a SAMU (paramédica Ana Torres)", "clave"); }}>Generar código</BalizaBoton>
          </>
        ) : (
          <BalizaBoton tono="accion" onClick={() => setLiberar(false)}>Listo, ya se lo dicté</BalizaBoton>
        )}
      >
        {paso === "datos" ? (
          <>
            <BalizaCampo etiqueta="Nombre de quien la pide" defaultValue="Ana Torres" />
            <BalizaCampo etiqueta="Institución" defaultValue="SAMU" ayuda="SAMU, Bomberos, mutualidad, centro de salud…" />
          </>
        ) : (
          <div className="demo-codigo-grande" aria-label="Código 4 8 2 9 1 3">
            <span>482</span><span>913</span>
            <p className="demo-ficha__tenue">Vence en 10:00 · un solo uso</p>
          </div>
        )}
      </BalizaDialogo>

      <BalizaDialogo
        abierto={cerrar}
        onCerrar={() => setCerrar(false)}
        titulo="Cerrar caso"
        sub="El cierre queda en el historial y cuenta para el tiempo de respuesta."
        acciones={
          <>
            <BalizaBoton tono="fantasma" onClick={() => setCerrar(false)}>Volver</BalizaBoton>
            <BalizaBoton tono="accion" onClick={() => { setCerrar(false); onCerrar?.(); }}>Cerrar caso</BalizaBoton>
          </>
        }
      >
        <BalizaCampo etiqueta="¿Cómo terminó?" defaultValue="Trasladado a urgencias por SAMU" />
      </BalizaDialogo>
    </Cascaron>
  );
}

/** Sin conexión: lo más peligroso de una consola es callar sin avisar. */
export function ConsolaSinConexion() {
  return (
    <Cascaron ok={false}>
      <BalizaAviso
        tono="grave"
        vivo
        icono={<IconoSinSenal tamano={24} />}
        titulo="Sin conexión desde las 13:40:12. Las alertas NO están llegando a esta consola."
        accion={<BalizaBoton tono="sos" tamano="chico">Reintentar ahora</BalizaBoton>}
      >
        Reintentando cada 5 s. Revisa el cable o el wifi. Mientras tanto, avisa al jefe de base por teléfono.
      </BalizaAviso>
      <div className="demo-dos demo-dos--consola">
        <section className="demo-calma" aria-labelledby="sin-conexion-t">
          <span className="demo-calma__icono demo-calma__icono--cuidado"><IconoSinSenal tamano={40} /></span>
          <h1 id="sin-conexion-t">No sabemos si hay alertas</h1>
          <p className="demo-ficha__tenue">
            Mientras no vuelva la conexión, esta pantalla no puede decir «sin alertas». Lo de la derecha es lo último que llegó.
          </p>
        </section>
        <div className="demo-seccion">
          <BalizaInsignia estado="reservado">Información de las 13:40:12</BalizaInsignia>
          <Recientes />
        </div>
      </div>
    </Cascaron>
  );
}

/** La consola entera, navegable: simula un SOS y atiéndelo de punta a punta. */
export default function Consola({ inicial = "espera" }: { inicial?: EstadoConsola }) {
  const [estado, setEstado] = useState<EstadoConsola>(inicial);
  if (estado === "alerta") return <ConsolaAlerta onTomar={() => setEstado("caso")} />;
  if (estado === "caso") return <ConsolaCaso onCerrar={() => setEstado("espera")} />;
  if (estado === "sinConexion") return <ConsolaSinConexion />;
  if (estado === "avisoLlegada") return <ConsolaAvisoLlegada />;
  return <ConsolaEspera onSimular={() => setEstado("alerta")} />;
}
