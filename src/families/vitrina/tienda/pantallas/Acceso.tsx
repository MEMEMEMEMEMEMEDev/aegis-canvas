import { useState } from "react";
import type { FormEvent } from "react";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCampo from "../../VitrinaCampo/VitrinaCampo";
import VitrinaEntrada from "../../VitrinaEntrada/VitrinaEntrada";
import VitrinaOpcion from "../../VitrinaOpcion/VitrinaOpcion";
import VitrinaPicto from "../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../VitrinaSello/VitrinaSello";
import VitrinaTitular from "../../VitrinaTitular/VitrinaTitular";
import { espera } from "../api";
import { useAvisos } from "../avisos";
import { useRuta } from "../ruta";
import type { ModoAcceso, Ruta } from "../ruta";
import { useTienda } from "../state";

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

export default function Acceso({ modo, despues }: { modo: ModoAcceso; despues?: Ruta }) {
  const { dispatch } = useTienda();
  const { ir, reemplazar } = useRuta();
  const { avisar } = useAvisos();
  const [cargando, setCargando] = useState(false);
  const [ver, setVer] = useState(false);
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [pasoRec, setPasoRec] = useState<1 | 2 | 3>(1);
  const [err, setErr] = useState<Record<string, string>>({});

  const cambiaModo = (m: ModoAcceso) => {
    setErr({});
    setPasoRec(1);
    reemplazar({ v: "acceso", modo: m, despues });
  };
  const alDestino = () => reemplazar(despues ?? { v: "cuenta", seccion: "resumen" });
  const desdeCheckout = despues?.v === "checkout";

  async function entrar(e: FormEvent) {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!emailOk(email)) x.email = "Escribe un correo válido";
    if (clave.length < 6) x.clave = "Mínimo 6 caracteres";
    setErr(x);
    if (Object.keys(x).length) return;
    setCargando(true);
    await espera(700);
    dispatch({ type: "entrar", email: email.trim() });
    setCargando(false);
    avisar("ok", "Bienvenida de vuelta, Camila");
    alDestino();
  }

  async function registrar(e: FormEvent) {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!nombre.trim()) x.nombre = "¿Cómo te llamas?";
    if (!apellido.trim()) x.apellido = "Falta el apellido";
    if (!emailOk(email)) x.email = "Escribe un correo válido";
    if (clave.length < 8) x.clave = "Mínimo 8 caracteres";
    if (!acepta) x.acepta = "Necesitamos que aceptes los términos";
    setErr(x);
    if (Object.keys(x).length) return;
    setCargando(true);
    await espera(900);
    dispatch({ type: "registrar", nombre: nombre.trim(), apellido: apellido.trim(), email: email.trim() });
    setCargando(false);
    avisar("ok", `Cuenta creada. Hola, ${nombre.trim()}`);
    alDestino();
  }

  async function recuperar(e: FormEvent) {
    e.preventDefault();
    if (pasoRec === 1) {
      if (!emailOk(email)) return setErr({ email: "Escribe el correo de tu cuenta" });
      setErr({});
      setCargando(true);
      await espera(700);
      setCargando(false);
      setPasoRec(2);
      avisar("neutro", `Código enviado a ${email.trim()} (en la demo, cualquier 6 dígitos sirve)`);
    } else if (pasoRec === 2) {
      if (!/^\d{6}$/.test(codigo)) return setErr({ codigo: "Son 6 dígitos" });
      setErr({});
      setPasoRec(3);
    } else {
      if (clave.length < 8) return setErr({ clave: "Mínimo 8 caracteres" });
      setErr({});
      setCargando(true);
      await espera(700);
      setCargando(false);
      avisar("ok", "Contraseña cambiada. Ya puedes entrar");
      setClave("");
      cambiaModo("entrar");
    }
  }

  const ojo = { icono: <VitrinaPicto name={ver ? "ojo-cerrado" : "ojo"} />, label: ver ? "Ocultar contraseña" : "Mostrar contraseña", onClick: () => setVer(!ver) };

  return (
    <div className="tienda-acceso">
      <VitrinaTitular tamano="gigante" sobre={desdeCheckout ? "Antes de pagar" : "Tu cuenta"}>
        {modo === "entrar" ? "Entrar" : modo === "registro" ? "Crear cuenta" : "Recuperar"}
      </VitrinaTitular>

      <div className="tienda-acceso__caja">
        {modo === "entrar" && (
          <form className="tienda-form" onSubmit={entrar} noValidate>
            <p className="tienda-chica">
              <VitrinaSello tono="neutro" pequeno>Demo</VitrinaSello> Cualquier correo con una contraseña de 6+ caracteres entra como Camila, con historial y todo.
            </p>
            <VitrinaCampo modo="linea" label="Correo" required error={err.email}>
              <VitrinaEntrada modo="linea" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.cl" autoComplete="email" />
            </VitrinaCampo>
            <VitrinaCampo modo="linea" label="Contraseña" required error={err.clave}>
              <VitrinaEntrada modo="linea" type={ver ? "text" : "password"} value={clave} onChange={(e) => setClave(e.target.value)} placeholder="••••••••" autoComplete="current-password" accion={ojo} />
            </VitrinaCampo>
            <button type="button" className="tienda-enlace tienda-acceso__olvide" onClick={() => cambiaModo("recuperar")}>
              ¿Olvidaste tu contraseña?
            </button>
            <VitrinaBoton tono="bloque" type="submit" loading={cargando}>
              Entrar
            </VitrinaBoton>
            {desdeCheckout && (
              <VitrinaBoton variant="outline" ancho type="button" onClick={() => { dispatch({ type: "continuar-invitado" }); alDestino(); }}>
                Continuar como invitado
              </VitrinaBoton>
            )}
            <p className="tienda-acceso__pie">
              ¿Primera vez?{" "}
              <button type="button" className="tienda-enlace" onClick={() => cambiaModo("registro")}>
                Crea tu cuenta
              </button>
            </p>
          </form>
        )}

        {modo === "registro" && (
          <form className="tienda-form" onSubmit={registrar} noValidate>
            <div className="tienda-form__rejilla">
              <VitrinaCampo modo="linea" label="Nombre" required error={err.nombre}>
                <VitrinaEntrada modo="linea" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Camila" autoComplete="given-name" />
              </VitrinaCampo>
              <VitrinaCampo modo="linea" label="Apellido" required error={err.apellido}>
                <VitrinaEntrada modo="linea" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Riquelme" autoComplete="family-name" />
              </VitrinaCampo>
              <VitrinaCampo modo="linea" label="Correo" required error={err.email} className="tienda-form__ancho">
                <VitrinaEntrada modo="linea" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.cl" autoComplete="email" />
              </VitrinaCampo>
              <VitrinaCampo modo="linea" label="Contraseña" required error={err.clave} hint="Mínimo 8 caracteres" className="tienda-form__ancho">
                <VitrinaEntrada modo="linea" type={ver ? "text" : "password"} value={clave} onChange={(e) => setClave(e.target.value)} placeholder="••••••••" autoComplete="new-password" accion={ojo} />
              </VitrinaCampo>
            </div>
            <VitrinaOpcion tipo="casilla" marco={false} checked={acepta} onChange={setAcepta} label="Acepto los términos y el tratamiento de mis datos" />
            {err.acepta && (
              <p className="tienda-error" role="alert">
                {err.acepta}
              </p>
            )}
            <VitrinaBoton tono="bloque" type="submit" loading={cargando}>
              Crear cuenta
            </VitrinaBoton>
            <p className="tienda-acceso__pie">
              ¿Ya tienes cuenta?{" "}
              <button type="button" className="tienda-enlace" onClick={() => cambiaModo("entrar")}>
                Entra
              </button>
            </p>
          </form>
        )}

        {modo === "recuperar" && (
          <form className="tienda-form" onSubmit={recuperar} noValidate>
            <p className="tienda-chica">Paso {pasoRec} de 3 · {pasoRec === 1 ? "Te mandamos un código al correo" : pasoRec === 2 ? "Escribe el código que te llegó" : "Elige una contraseña nueva"}</p>
            {pasoRec === 1 && (
              <VitrinaCampo modo="linea" label="Correo de tu cuenta" required error={err.email}>
                <VitrinaEntrada modo="linea" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.cl" autoComplete="email" />
              </VitrinaCampo>
            )}
            {pasoRec === 2 && (
              <VitrinaCampo modo="linea" label="Código de 6 dígitos" required error={err.codigo} hint={`Enviado a ${email.trim()}`}>
                <VitrinaEntrada modo="linea" value={codigo} onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="123456" inputMode="numeric" autoComplete="one-time-code" className="tienda-acceso__codigo" />
              </VitrinaCampo>
            )}
            {pasoRec === 3 && (
              <VitrinaCampo modo="linea" label="Nueva contraseña" required error={err.clave} hint="Mínimo 8 caracteres">
                <VitrinaEntrada modo="linea" type={ver ? "text" : "password"} value={clave} onChange={(e) => setClave(e.target.value)} placeholder="••••••••" autoComplete="new-password" accion={ojo} />
              </VitrinaCampo>
            )}
            <VitrinaBoton tono="bloque" type="submit" loading={cargando}>
              {pasoRec === 1 ? "Enviar código" : pasoRec === 2 ? "Verificar" : "Guardar contraseña"}
            </VitrinaBoton>
            <p className="tienda-acceso__pie">
              <button type="button" className="tienda-enlace" onClick={() => cambiaModo("entrar")}>
                ← Volver a entrar
              </button>
            </p>
          </form>
        )}
      </div>

      <button type="button" className="tienda-enlace tienda-acceso__salir" onClick={() => ir({ v: "inicio" })}>
        Seguir mirando sin cuenta
      </button>
    </div>
  );
}
