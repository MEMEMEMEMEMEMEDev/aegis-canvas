import { useState } from "react";
import BalizaAlerta from "../BalizaAlerta/BalizaAlerta";
import BalizaAvatar from "../BalizaAvatar/BalizaAvatar";
import BalizaBarra from "../BalizaBarra/BalizaBarra";
import BalizaBoton from "../BalizaBoton/BalizaBoton";
import BalizaCampo from "../BalizaCampo/BalizaCampo";
import BalizaContacto from "../BalizaContacto/BalizaContacto";
import BalizaDato from "../BalizaDato/BalizaDato";
import BalizaFila from "../BalizaFila/BalizaFila";
import BalizaInsignia from "../BalizaInsignia/BalizaInsignia";
import BalizaMetrica from "../BalizaMetrica/BalizaMetrica";
import BalizaPanel from "../BalizaPanel/BalizaPanel";
import BalizaPestanas, { idsPestana } from "../BalizaPestanas/BalizaPestanas";
import BalizaTabla from "../BalizaTabla/BalizaTabla";
import BalizaVital from "../BalizaVital/BalizaVital";
import { ACTIVACIONES, CONTACTOS, TRABAJADORES, type Activacion, type Trabajador } from "./datos";
import { BotonVincular, SeccionBases, SeccionModulos, SeccionUsuarios } from "./AdminSecciones";
import "./demo.scss";

const Lupa = () => (
  <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M7 2a5 5 0 0 1 3.96 8.05l3 3-1.06 1.06-3-3A5 5 0 1 1 7 2Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /></svg>
);

/** La alerta SOS completa, tal como entra arriba del panel (SOSACTIVADO-V2). */
export function AlertaSOS({ t, onTomar }: { t: Trabajador; onTomar?: () => void }) {
  return (
    <BalizaAlerta titulo="SOS activado" persona={t.nombre} cuando="4/10, 13:31:06" hace="hace 0:02">
      <div className="demo-alerta">
        <div className="demo-alerta__quien">
          <BalizaAvatar nombre={t.nombre} forma="ficha" tamano="grande" />
          <div>
            <p className="demo-ficha__nombre">{t.nombre}</p>
            <p className="demo-ficha__tenue">RUT {t.rut} · {t.cargo}</p>
            <p className="demo-ficha__tenue">Tarjeta {t.id} · Base {t.base}</p>
            <p className="demo-ficha__tenue">Camión {t.camion} · {t.patente}</p>
          </div>
        </div>
        <BalizaVital sangre={t.sangre} alergias={t.alergias} peso={t.peso} tamano="compacta" />
        <BalizaDato rotulo="Condiciones y medicamentos">
          {t.condiciones}. {t.medicamentos}.
          <br />
          <span className="demo-ficha__tenue">{t.indicaciones}</span>
        </BalizaDato>
        <BalizaDato rotulo="Ubicación al escanear">
          −33.6118, −70.5756 · ±12 m
          <br />
          <a className="demo-enlace" href="#mapa">Abrir en el mapa</a>
          <br />
          <span className="demo-ficha__tenue">Capturada solo al escanear. Sin rastreo continuo.</span>
        </BalizaDato>
        <div className="demo-alerta__acciones">
          <div className="demo-ficha__contactos">
            <BalizaContacto {...CONTACTOS.jefe} tamano="chico" />
            <BalizaContacto {...CONTACTOS.prevencion} tamano="chico" />
          </div>
          <BalizaBoton tono="sos" tamano="grande" bloque onClick={onTomar}>Tomar caso</BalizaBoton>
        </div>
      </div>
    </BalizaAlerta>
  );
}

function FormularioTrabajador({ t }: { t: Trabajador }) {
  const campo = (etiqueta: string, valor: string) => (
    <BalizaCampo etiqueta={etiqueta} defaultValue={valor} key={`${t.id}-${etiqueta}`} />
  );
  return (
    <BalizaPanel
      titulo="Formulario de trabajador"
      className="demo-formulario"
    >
      <div className="demo-formulario__quien">
        <span className="demo-ficha__nombre">{t.nombre}</span>
        <BalizaInsignia estado={t.estado === "activa" ? "activa" : "bloqueada"}>
          {t.estado === "activa" ? "Tarjeta activa" : "Tarjeta bloqueada"}
        </BalizaInsignia>
      </div>
      <fieldset className="demo-grupo">
        <legend>Datos del trabajador</legend>
        <div className="demo-rejilla demo-rejilla--3">
          {campo("ID de la tarjeta", t.id)}
          {campo("Nombre completo", t.nombre)}
          {campo("RUT", t.rut)}
          {campo("Cargo", t.cargo)}
          {campo("Empresa", t.empresa)}
          {campo("Base", t.base)}
        </div>
      </fieldset>
      <fieldset className="demo-grupo">
        <legend>Camión asignado</legend>
        {campo("Camión y patente", `${t.camion} · ${t.patente}`)}
      </fieldset>
      <fieldset className="demo-grupo">
        <legend>Ficha clínica</legend>
        <div className="demo-rejilla demo-rejilla--2">
          {campo("Grupo sanguíneo", t.sangre)}
          {campo("Peso (kg)", String(t.peso))}
        </div>
        {campo("Alergias", t.alergias)}
        {campo("Condiciones clínicas", t.condiciones)}
        {campo("Medicamentos relevantes", t.medicamentos)}
      </fieldset>
      <fieldset className="demo-grupo">
        <legend>Indicaciones y cobertura</legend>
        {campo("Indicaciones para el rescatista", t.indicaciones)}
        <div className="demo-rejilla demo-rejilla--cobertura">
          {campo("Cobertura", "ACHS")}
          {campo("Estado", "Vigente")}
        </div>
        {campo("Consentimiento de datos médicos", "Firmado el 1/09/2026")}
      </fieldset>
      <div className="demo-formulario__acciones">
        <BalizaBoton tono="hondo">Guardar cambios</BalizaBoton>
        <BalizaBoton>Ver tarjeta</BalizaBoton>
        <BotonVincular t={t} />
        <BalizaBoton>{t.estado === "activa" ? "Bloquear tarjeta" : "Activar tarjeta"}</BalizaBoton>
        <BalizaBoton tono="peligro">Eliminar trabajador</BalizaBoton>
      </div>
      <p className="demo-ficha__tenue demo-formulario__pie">Última actualización de la ficha: 1/09/2026</p>
    </BalizaPanel>
  );
}

function Historial() {
  return (
    <BalizaPanel titulo="Historial de activaciones" nivel={3} sinRelleno>
      <BalizaTabla<Activacion>
        titulo="Historial de activaciones"
        filas={ACTIVACIONES}
        clave={(a) => a.id}
        columnas={[
          { id: "f", titulo: "Fecha", celda: (a) => a.fecha },
          { id: "t", titulo: "Trabajador", celda: (a) => a.trabajador },
          { id: "k", titulo: "Tarjeta", celda: (a) => a.tarjeta },
          { id: "b", titulo: "Base", celda: (a) => a.base },
          { id: "p", titulo: "Camión", celda: (a) => a.patente },
          { id: "o", titulo: "Origen", celda: (a) => a.origen },
          { id: "m", titulo: "Datos médicos vistos", celda: (a) => (a.medicosVistos ? "Sí" : "No") },
          {
            id: "r", titulo: "Respuesta", celda: (a) =>
              a.respuesta.atendida
                ? <BalizaInsignia estado="atendida">Atendida en {a.respuesta.en}</BalizaInsignia>
                : <BalizaInsignia estado="sinAtender">Sin atender</BalizaInsignia>,
          },
        ]}
      />
    </BalizaPanel>
  );
}

export interface PanelBaseProps {
  /** Con una alerta SOS entrando arriba. */
  conAlerta?: boolean;
  pestanaInicial?: "personas" | "activaciones" | "bases" | "usuarios" | "modulos";
}

/** El panel de la base (PanelADMI-V1, SOSACTIVADO-V2, Activaciones SOS). */
export default function PanelBase({ conAlerta = false, pestanaInicial = "personas" }: PanelBaseProps) {
  const [pestana, setPestana] = useState<string>(pestanaInicial);
  const [elegido, setElegido] = useState(TRABAJADORES[0]!.id);
  const [busca, setBusca] = useState("");
  const t = TRABAJADORES.find((x) => x.id === elegido) ?? TRABAJADORES[0]!;
  const lista = TRABAJADORES.filter((x) =>
    `${x.nombre} ${x.rut} ${x.id}`.toLowerCase().includes(busca.toLowerCase()),
  );
  const activas = TRABAJADORES.filter((x) => x.estado === "activa").length;

  return (
    <div className="baliza-scope demo-escritorio">
      <BalizaBarra fin={<span className="demo-demo">Datos ficticios · demo</span>} />
      <main className="demo-panel">
        <div className="demo-metricas">
          <BalizaMetrica valor={conAlerta ? 1 : 0} rotulo="Alertas sin atender" alerta={conAlerta} />
          <BalizaMetrica valor={`${activas}/${TRABAJADORES.length}`} rotulo="Tarjetas activas" />
          <BalizaMetrica valor="3/4" rotulo="Fichas clínicas completas" />
          <BalizaMetrica valor="2:10" rotulo="Respuesta promedio (min)" />
        </div>

        {conAlerta && <AlertaSOS t={TRABAJADORES[0]!} />}

        <BalizaPestanas
          etiqueta="Secciones del panel"
          prefijo="panel"
          activa={pestana}
          onCambio={setPestana}
          pestanas={[
            { id: "personas", nombre: "Trabajadores y tarjetas" },
            { id: "activaciones", nombre: "Activaciones SOS", cuenta: conAlerta ? 1 : undefined, urgente: conAlerta },
            { id: "bases", nombre: "Bases, flota y contactos" },
            { id: "usuarios", nombre: "Usuarios y roles" },
            { id: "modulos", nombre: "Módulos" },
          ]}
        />

        <div role="tabpanel" id={idsPestana(pestana, "panel").panel} aria-labelledby={idsPestana(pestana, "panel").pestana}>
          {pestana === "personas" && (
            <div className="demo-dos">
              <BalizaPanel
                titulo="Tarjetas"
                sub="Agregar, bloquear o buscar trabajador"
                nivel={3}
                acciones={<BalizaBoton tono="suave" tamano="chico" icono="+">Nuevo</BalizaBoton>}
              >
                <BalizaCampo
                  etiqueta="Buscar trabajador"
                  etiquetaOculta
                  placeholder="Buscar nombre, RUT o ID"
                  icono={<Lupa />}
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <div className="demo-lista">
                  {lista.map((x) => (
                    <BalizaFila
                      key={x.id}
                      titulo={x.nombre}
                      sub={`${x.id} · ${x.base}`}
                      elegida={x.id === elegido}
                      onClick={() => setElegido(x.id)}
                      fin={<BalizaInsignia estado={x.estado === "activa" ? "activa" : "bloqueada"}>{x.estado === "activa" ? "activa" : "bloq."}</BalizaInsignia>}
                    />
                  ))}
                </div>
              </BalizaPanel>
              <FormularioTrabajador t={t} />
            </div>
          )}
          {pestana === "activaciones" && <Historial />}
          {pestana === "bases" && <SeccionBases />}
          {pestana === "usuarios" && <SeccionUsuarios />}
          {pestana === "modulos" && <SeccionModulos />}
        </div>
      </main>
    </div>
  );
}
