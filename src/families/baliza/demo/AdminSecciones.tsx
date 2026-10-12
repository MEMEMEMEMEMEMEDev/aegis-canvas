import { useState } from "react";
import BalizaAviso from "../BalizaAviso/BalizaAviso";
import BalizaBoton from "../BalizaBoton/BalizaBoton";
import BalizaCampo from "../BalizaCampo/BalizaCampo";
import BalizaDialogo from "../BalizaDialogo/BalizaDialogo";
import BalizaInsignia from "../BalizaInsignia/BalizaInsignia";
import BalizaInterruptor from "../BalizaInterruptor/BalizaInterruptor";
import BalizaPanel from "../BalizaPanel/BalizaPanel";
import BalizaTabla from "../BalizaTabla/BalizaTabla";
import { IconoEscudo, IconoMas, IconoQr } from "../iconos";
import { CONTACTOS, QrMuestra, TRABAJADORES, type Trabajador } from "./datos";
import "./demo.scss";

// ── Bases, flota y contactos ────────────────────────────────────────────

const BASES = [
  { id: "pa", nombre: "Puente Alto", direccion: "Av. Concha y Toro 3000 (ficticia)", jefe: CONTACTOS.jefe.nombre, segundo: CONTACTOS.prevencion.nombre, personas: 2, camiones: 1 },
  { id: "qc", nombre: "Quilicura", direccion: "Av. Lo Marcoleta 500 (ficticia)", jefe: "Paula Vergara", segundo: "Andrés Cid", personas: 2, camiones: 1 },
];

interface Camion { patente: string; numero: string; base: string; conductor: string; estado: "enRuta" | "enBase" | "taller" }
const FLOTA: Camion[] = [
  { patente: "XX-DE-27", numero: "N° 27", base: "Puente Alto", conductor: "Tomás Fuentes Rojas", estado: "enRuta" },
  { patente: "XX-DE-31", numero: "N° 31", base: "Quilicura", conductor: "Ignacio Mora Díaz", estado: "enBase" },
  { patente: "XX-DE-12", numero: "N° 12", base: "Quilicura", conductor: "Sin asignar", estado: "taller" },
];

const ESTADO_CAMION = {
  enRuta: <BalizaInsignia estado="activa">En ruta · viaje vigilado</BalizaInsignia>,
  enBase: <BalizaInsignia estado="neutro">En base</BalizaInsignia>,
  taller: <BalizaInsignia estado="reservado">En taller</BalizaInsignia>,
};

export function SeccionBases() {
  return (
    <div className="demo-seccion">
      <div className="demo-bases">
        {BASES.map((b) => (
          <BalizaPanel key={b.id} titulo={`Base ${b.nombre}`} sub={b.direccion} nivel={3} acciones={<BalizaBoton tamano="chico">Editar</BalizaBoton>}>
            <dl className="demo-bases__datos">
              <div><dt>Jefe de base</dt><dd>{b.jefe}</dd></div>
              <div><dt>Segundo contacto</dt><dd>{b.segundo}</dd></div>
              <div><dt>Trabajadores</dt><dd>{b.personas}</dd></div>
              <div><dt>Camiones</dt><dd>{b.camiones}</dd></div>
            </dl>
          </BalizaPanel>
        ))}
        <button type="button" className="demo-nueva">
          <IconoMas /> Nueva base
        </button>
      </div>
      <BalizaPanel titulo="Flota" nivel={3} sinRelleno acciones={<BalizaBoton tono="suave" tamano="chico" icono={<IconoMas tamano={16} />}>Agregar camión</BalizaBoton>}>
        <BalizaTabla<Camion>
          titulo="Flota"
          filas={FLOTA}
          clave={(c) => c.patente}
          columnas={[
            { id: "p", titulo: "Patente", celda: (c) => c.patente },
            { id: "n", titulo: "Camión", celda: (c) => c.numero },
            { id: "b", titulo: "Base", celda: (c) => c.base },
            { id: "c", titulo: "Conductor asignado", celda: (c) => c.conductor },
            { id: "e", titulo: "Estado", celda: (c) => ESTADO_CAMION[c.estado] },
          ]}
        />
      </BalizaPanel>
    </div>
  );
}

// ── Usuarios y roles ────────────────────────────────────────────────────

interface Usuario { nombre: string; correo: string; rol: "admin" | "jefe_base" | "operador"; alcance: string; acceso: string }
const USUARIOS: Usuario[] = [
  { nombre: "Rodrigo Lagos", correo: "rlagos@transportesdemo.cl", rol: "admin", alcance: "Todas las bases", acceso: "hoy 09:12" },
  { nombre: "Marcelo Ibarra", correo: "mibarra@transportesdemo.cl", rol: "jefe_base", alcance: "Puente Alto", acceso: "hoy 13:31" },
  { nombre: "Paula Vergara", correo: "pvergara@transportesdemo.cl", rol: "jefe_base", alcance: "Quilicura", acceso: "ayer 18:40" },
  { nombre: "Central nocturna", correo: "central@transportesdemo.cl", rol: "operador", alcance: "Todas las bases", acceso: "hoy 07:00" },
];

const ROL = {
  admin: { nombre: "Administrador", hace: "Todo: bases, usuarios, fichas clínicas y módulos." },
  jefe_base: { nombre: "Jefe de base", hace: "Atiende casos y gestiona personas, tarjetas y flota de SU base." },
  operador: { nombre: "Operador", hace: "Atiende casos y libera fichas en un caso abierto. No edita personas." },
};

export function SeccionUsuarios() {
  return (
    <div className="demo-seccion">
      <BalizaPanel titulo="Usuarios del panel y la consola" nivel={3} sinRelleno acciones={<BalizaBoton tono="suave" tamano="chico" icono={<IconoMas tamano={16} />}>Invitar</BalizaBoton>}>
        <BalizaTabla<Usuario>
          titulo="Usuarios"
          filas={USUARIOS}
          clave={(u) => u.correo}
          columnas={[
            { id: "n", titulo: "Nombre", celda: (u) => u.nombre },
            { id: "c", titulo: "Correo", celda: (u) => u.correo },
            { id: "r", titulo: "Rol", celda: (u) => <BalizaInsignia estado={u.rol === "admin" ? "reservado" : "neutro"}>{ROL[u.rol].nombre}</BalizaInsignia> },
            { id: "a", titulo: "Alcance", celda: (u) => u.alcance },
            { id: "u", titulo: "Último acceso", celda: (u) => u.acceso },
          ]}
        />
      </BalizaPanel>
      <BalizaPanel titulo="Qué puede hacer cada rol" nivel={3}>
        <dl className="demo-roles">
          {Object.entries(ROL).map(([id, r]) => (
            <div key={id}><dt>{r.nombre}</dt><dd>{r.hace}</dd></div>
          ))}
          <div><dt>Trabajador</dt><dd>Sólo la app: su SOS, sus viajes y su propia ficha. No entra al panel.</dd></div>
        </dl>
        <BalizaAviso icono={<IconoEscudo />} titulo="Los datos clínicos no los abre un rol, los abre un caso">
          Nadie ve condiciones ni medicamentos fuera de un caso abierto, y cada apertura queda registrada.
        </BalizaAviso>
      </BalizaPanel>
    </div>
  );
}

// ── Módulos ─────────────────────────────────────────────────────────────

export function SeccionModulos() {
  const [sos, setSos] = useState(true);
  const [viajes, setViajes] = useState(true);
  return (
    <div className="demo-seccion">
      <BalizaPanel titulo="Módulos" sub="Se activan por empresa. Apagar uno no borra sus datos." nivel={3}>
        <div>
          <BalizaInterruptor
            etiqueta="Tarjeta QR y ficha de emergencia"
            descripcion="La base del sistema: credencial, ficha al escanear y alerta en el panel."
            activo
            deshabilitado
            onCambio={() => undefined}
            extra={<BalizaInsignia estado="neutro">Siempre activo</BalizaInsignia>}
          />
          <BalizaInterruptor
            etiqueta="SOS desde la app del trabajador"
            descripcion="El botón que se mantiene apretado 2 segundos. Requiere la app instalada y vinculada."
            activo={sos}
            onCambio={setSos}
          />
          <BalizaInterruptor
            etiqueta="Viajes con hora de llegada"
            descripcion="Para quien va solo: si no confirma la llegada, la base recibe un aviso con la última ubicación."
            activo={viajes}
            onCambio={setViajes}
          />
          {viajes && (
            <div className="demo-modulo-ajustes">
              <BalizaCampo etiqueta="Tolerancia antes de avisar" defaultValue="10 minutos" />
              <BalizaCampo etiqueta="Pasar a SOS si nadie atiende el aviso" defaultValue="10 minutos" />
            </div>
          )}
          <BalizaInterruptor
            etiqueta="Detección automática de caídas y choques"
            descripcion="Usa los sensores del teléfono aunque la pantalla esté apagada."
            activo={false}
            deshabilitado
            onCambio={() => undefined}
            extra={<BalizaInsignia estado="reservado">Próximamente · app nativa</BalizaInsignia>}
          />
          <BalizaInterruptor
            etiqueta="Avisos por SMS y WhatsApp al jefe de base"
            descripcion="Además de la consola, con escalamiento si nadie toma el caso."
            activo={false}
            deshabilitado
            onCambio={() => undefined}
            extra={<BalizaInsignia estado="reservado">Próximamente</BalizaInsignia>}
          />
        </div>
      </BalizaPanel>
    </div>
  );
}

// ── Vincular el teléfono de un trabajador ───────────────────────────────

export function DialogoVincular({ t, abierto, onCerrar }: { t: Trabajador; abierto: boolean; onCerrar: () => void }) {
  return (
    <BalizaDialogo
      abierto={abierto}
      onCerrar={onCerrar}
      titulo={`Vincular el teléfono de ${t.nombre.split(" ")[0]}`}
      sub="Abre la app SOS Ruta en su teléfono y escanea este código, o díctale los números."
      acciones={<BalizaBoton tono="accion" onClick={onCerrar}>Listo</BalizaBoton>}
    >
      <div className="demo-vincular">
        <div className="demo-vincular__qr"><QrMuestra /></div>
        <div>
          <p className="demo-ficha__tenue">Código</p>
          <p className="demo-vincular__codigo">731 054</p>
          <p className="demo-ficha__tenue">Vence en 9:42 · un solo uso</p>
        </div>
      </div>
      <BalizaAviso tono="cuidado" titulo="Un teléfono por trabajador">
        Si ya tenía otro vinculado, ese deja de funcionar al vincular este.
      </BalizaAviso>
    </BalizaDialogo>
  );
}

export function BotonVincular({ t }: { t: Trabajador }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <BalizaBoton icono={<IconoQr tamano={18} />} onClick={() => setAbierto(true)}>Vincular teléfono</BalizaBoton>
      <DialogoVincular t={t} abierto={abierto} onCerrar={() => setAbierto(false)} />
    </>
  );
}

// ── Login ───────────────────────────────────────────────────────────────

export function PantallaLogin() {
  return (
    <div className="baliza-scope demo-login">
      <main className="demo-login__caja">
        <div className="demo-app__marca"><IconoEscudo tamano={32} /></div>
        <h1>SOS Ruta</h1>
        <p className="demo-ficha__tenue">Panel y consola de la base</p>
        <form className="demo-login__form" onSubmit={(e) => e.preventDefault()}>
          <BalizaCampo etiqueta="Correo" type="email" autoComplete="username" placeholder="nombre@empresa.cl" />
          <BalizaCampo etiqueta="Contraseña" type="password" autoComplete="current-password" />
          <BalizaBoton tono="accion" tamano="grande" bloque type="submit">Entrar</BalizaBoton>
          <a className="demo-enlace demo-login__olvido" href="#recuperar">Olvidé mi contraseña</a>
        </form>
        <p className="demo-ficha__tenue demo-app__letra-chica">
          ¿Encontraste a alguien herido? No necesitas entrar: escanea su tarjeta o llama al 131.
        </p>
      </main>
    </div>
  );
}

export { TRABAJADORES };
