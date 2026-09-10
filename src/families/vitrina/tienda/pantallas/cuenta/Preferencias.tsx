import { useState } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaDialogo from "../../../VitrinaDialogo/VitrinaDialogo";
import VitrinaOpcion, { VitrinaOpcionGrupo } from "../../../VitrinaOpcion/VitrinaOpcion";
import VitrinaPicto from "../../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../../VitrinaSello/VitrinaSello";
import VitrinaTitular from "../../../VitrinaTitular/VitrinaTitular";
import { useAvisos } from "../../avisos";
import { borrar } from "../../persistence";
import { useRuta } from "../../ruta";
import { useTienda } from "../../state";

export default function Preferencias() {
  const { state, dispatch } = useTienda();
  const { ir } = useRuta();
  const { avisar } = useAvisos();
  const [dialogo, setDialogo] = useState<"salir" | "reiniciar" | null>(null);
  const n = state.preferencias.notificaciones;
  const pon = (parcial: Partial<typeof n>) => dispatch({ type: "preferencias", parcial: { notificaciones: { ...n, ...parcial } } });

  return (
    <div className="tienda-preferencias">
      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion">Notificaciones</VitrinaTitular>
        <VitrinaOpcionGrupo leyenda="Qué te avisamos" pegadas={false}>
          <VitrinaOpcion tipo="interruptor" marco={false} checked={n.pedidos} onChange={(v) => pon({ pedidos: v })} label="Estado de mis pedidos" detalle="Pago, despacho y entrega" />
          <VitrinaOpcion tipo="interruptor" marco={false} checked={n.ofertas} onChange={(v) => pon({ ofertas: v })} label="Ofertas y ventas flash" detalle="Cuando algo de tus favoritos baja de precio" />
          <VitrinaOpcion tipo="interruptor" marco={false} checked={n.novedades} onChange={(v) => pon({ novedades: v })} label="Novedades" detalle="Un correo a la semana, máximo" />
        </VitrinaOpcionGrupo>
      </section>

      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion">Apariencia</VitrinaTitular>
        <VitrinaOpcionGrupo leyenda="Tema" hint="El tema oscuro llega pronto; por ahora se guarda la preferencia.">
          <VitrinaOpcion tipo="radio" name="tema" checked={state.preferencias.tema === "claro"} onChange={() => dispatch({ type: "preferencias", parcial: { tema: "claro" } })} label="Claro" />
          <VitrinaOpcion tipo="radio" name="tema" checked={state.preferencias.tema === "oscuro"} onChange={() => dispatch({ type: "preferencias", parcial: { tema: "oscuro" } })} label="Oscuro" derecha={<VitrinaSello pequeno>Pronto</VitrinaSello>} />
          <VitrinaOpcion tipo="radio" name="tema" checked={state.preferencias.tema === "sistema"} onChange={() => dispatch({ type: "preferencias", parcial: { tema: "sistema" } })} label="Como el sistema" />
        </VitrinaOpcionGrupo>
      </section>

      <section className="tienda-paso__bloque">
        <VitrinaTitular tamano="seccion">Sesión y demo</VitrinaTitular>
        <div className="tienda-fila">
          <VitrinaBoton variant="outline" icono={<VitrinaPicto name="salir" />} onClick={() => setDialogo("salir")}>
            Cerrar sesión
          </VitrinaBoton>
          <VitrinaBoton variant="ghost" icono={<VitrinaPicto name="devolucion" />} onClick={() => setDialogo("reiniciar")}>
            Reiniciar la demo
          </VitrinaBoton>
        </div>
        <p className="tienda-chica">Reiniciar borra la cesta, los favoritos, los pedidos creados y la sesión de este navegador.</p>
      </section>

      <VitrinaDialogo abierto={dialogo === "salir"} id="tienda-salir" titulo="¿Cerrar sesión?" detalle="Tu cesta y tus favoritos se quedan en este navegador." confirmar="Cerrar sesión" onConfirmar={() => { dispatch({ type: "salir" }); setDialogo(null); avisar("neutro", "Sesión cerrada"); ir({ v: "inicio" }); }} onCancelar={() => setDialogo(null)} />
      <VitrinaDialogo abierto={dialogo === "reiniciar"} id="tienda-reiniciar" titulo="¿Reiniciar la demo?" detalle="Se borra todo lo guardado en este navegador y la tienda vuelve al estado inicial." confirmar="Reiniciar" peligro onConfirmar={() => { borrar(); dispatch({ type: "reset" }); setDialogo(null); ir({ v: "inicio" }); }} onCancelar={() => setDialogo(null)} />
    </div>
  );
}
